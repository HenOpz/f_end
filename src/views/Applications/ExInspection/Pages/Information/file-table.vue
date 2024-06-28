<template>
  <div>
    <DxDataGrid 
      id="data-grid-list" 
      key-expr="id" 
      :ref="gridRefName" 
      :data-source="library"
      :hover-state-enabled="true" 
      :allow-column-reordering="true" 
      :show-borders="true"
      :show-row-lines="true" 
      :focused-row-enabled="false" 
      :row-alternation-enabled="false"
      @row-inserted="ADD_NEW_FILE" 
      @row-removed="DELETE_DOC" 
      @init-new-row="() => {
          this.file = [];
          this.isEdit = false;
      }" 
      @editing-start="(e) => {
          this.file = [];
          this.isEdit = true;
          this.dataFileTemp = e;
      }" 
      @row-removing="() => {
          this.isEdit = false;
      }" 
      @saved="SAVE"
      >
      <DxEditing 
          :allow-deleting="true" 
          :allow-adding="true" 
          :allow-updating="true" 
          :use-icons="true"
          :show-borders="true" 
          mode="popup"
      >
          <DxPopup
              :show-title="true"
              :width="650"
              :height="300"
              title="Attachment"
          />
          <DxForm label-location="top">
              <DxItem :col-count="2" :col-span="2" :row-count="1" item-type="group">
                  <DxItem item-type="group">
                      <DxItem data-field="file" :col-span="1" />
                  </DxItem>
                  <DxItem item-type="group">
                      <DxItem data-field="note" :col-span="1" />
                  </DxItem>
              </DxItem>
          </DxForm>
      </DxEditing>

      <DxColumn 
          data-field="file" 
          :visible="false" 
          edit-cell-template="insertCellTemplate" 
      />

      <DxColumn 
          data-field="file_name" 
          :allow-adding="true" 
          :allow-editing="true" 
          caption="File Name"
          :editor-options="fileNameInputOptions" 
          sort-order="desc" 
          :min-width="120" 
      />

      <DxColumn 
          data-field="note" 
          caption="Note" 
          :min-width="120" 
          alignment="left" 
      />

      <DxColumn 
          data-field="file_type" 
          caption="Extension" 
          :width="120" 
          alignment="center" 
      />

      <DxColumn 
          data-field="created_date" 
          caption="Uploaded Date" 
          :width="120" 
          alignment="center"
          format="dd MMM yyyy" 
          data-type="date" 
          header-cell-template="dateHeader"
      />

      <template #dateHeader>
          <div>Uploaded<br />Date</div>
      </template>

      <DxColumn
          data-field="file_path" 
          cell-template="pathCellTemplate" 
          caption="Attachment"
          :width="120" 
          alignment="center" 
      />

      <template #insertCellTemplate>
          <div class="widget-container">
              <DxFileUploader 
                  id="file-uploader" 
                  :multiple="false" 
                  upload-mode="useForm"
                  @value-changed="VALUE_CHANGE" 
                  :visible="true" 
              />
          </div>
      </template>

      <!-- <template #noteCellTemplate="{ data }">
          <div>
              <DxTextArea :height="100" :value="data.data.value" placeholder="Enter Note" />
          </div>
      </template> -->

      <template #pathCellTemplate="{ data }">
          <div>
              <button class="library-btn-download" @click="DOWNLOAD(data.value, data.data.file_name)">
                  <i class="fa-regular fa-circle-down"></i>
                  DOWNLOAD</button>
          </div>
      </template>

      <DxToolbar>
          <DxItem location="after" template="addButton" />
          <DxItem location="after" name="searchPanel" />
      </DxToolbar>
      <template #addButton>
          <DxButton icon="las la-plus" @click="ADD_ROW" hint="Add" />
      </template>

      <DxHeaderFilter :visible="true" />
      <!-- <DxFilterRow :visible="false" /> -->
      <DxScrolling mode="standard" />
      <DxSearchPanel :visible="true" />
      <DxPaging :page-size="10" :page-index="0" />
      <DxPager :visible="false" :show-page-size-selector="true" :allowed-page-sizes="[5, 10, 'all']"
          :show-navigation-buttons="true" :show-info="true" info-text="Page {0} of {1} ({2} items)" />
      <DxExport :enabled="false" />
    </DxDataGrid>
  </div>
</template> 

<script>
//API
import { axios } from "/axios.js";
//import moment from "moment";

//Components

//DataGrid
import "devextreme/dist/css/dx.light.css";
import DxButton from "devextreme-vue/button";
import { DxItem } from "devextreme-vue/form";
import { DxFileUploader } from "devextreme-vue/file-uploader";
import {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    DxToolbar,
    DxHeaderFilter,
    // DxSelection,
    DxEditing,
    // DxFilterRow,
    // DxButton,
    // DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    DxForm,
    // DxItem,
    DxPopup,
} from "devextreme-vue/data-grid";

export default {
  name: "file-table",
  components: {
    DxDataGrid,
      DxSearchPanel,
      DxPaging,
      DxPager,
      DxScrolling,
      DxColumn,
      DxExport,
      DxToolbar,
      DxHeaderFilter,
      // DxSelection,
      DxForm,
      DxItem,
      DxEditing,
      // DxFilterRow,
      DxButton,
      // DxAddRowButton,
      // DxLookup,
      // DxRequiredRule,
      // DxFormItem,
      // DxSelectBox,
      // DxTextBox,
      // DxDateBox,
      DxFileUploader,
      // DxTextArea,
      DxPopup,
  },
  created() {
    if (this.$store.state.status.server == true) {
      this.FETCH_LIBRARY();
    }
  },
  data() {
    return {
      library: [],
      file: [],
      gridRefName: "grid-library",
      fileNameInputOptions: { placeholder: "File Name" },
      dataFileTemp: "",
      isEdit: false,
    };
  },
  computed: {
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    },
  },
  methods: {
    FETCH_LIBRARY() {
      var id_tag = this.$route.params.id_tag;
      this.isLoading = true;
      axios({
          method: "get",
          url: "/ExInspectionRegisterInfoFile/get-ex-inspection-register-info-by-id?id=" + id_tag,
          headers: {
              Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
          }
      })
          .then(res => {
              console.log('fetch library', res);
              if (res.status == 200) {
                  this.library = res.data;
                  this.isLoading = false;
              }
          })
          .catch(error => {
              console.log(error);
          })
          .finally(() => {
              this.isLoading = false;
          });
    },
    ADD_NEW_FILE(e) {
      var id_tag = this.$route.params.id_tag;
      // const user = JSON.parse(localStorage.getItem("user"));
      console.log('e',e);
      var formData = new FormData();
      formData.append("id_info", id_tag);
      formData.append("file", this.file);
      formData.append("note", e.data.note);
      if (this.file.length == 0)
          return this.$ons.notification.alert("Please select file").then(res => {
              if (res == 0) {
                  this.FETCH_LIBRARY();
              }
          });
      axios({
          method: "post",
          url: "/ExInspectionRegisterInfoFile",
          headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
          },
          data: formData
      })
          .then(res => {
              console.log(res);
              if (res.status == 201) {
                  this.FETCH_LIBRARY();
              }
          })
          .catch(error => {
              this.isLoading = false;
              this.$ons.notification
                  .alert(error.message, {
                      title: "Add New File failed"
                  })
                  .then(res => {
                      if (res == 0) {
                          this.FETCH_LIBRARY();
                      }
                  });
          })
          .finally(() => {
              this.isLoading = false;
          });
    },
    UPDATE_DOC(e) {
      var formData = new FormData();
      formData.append("id", e.data.id);
      formData.append("id_info", e.data.id_info);
      formData.append("file", this.file ?? "");
      formData.append("note", e.data.note);
      axios({
          method: "put",
          url: "/ExInspectionRegisterInfoFile/" + e.data.id,
          headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
          },
          data: formData
      })
          .then(res => {
              console.log(res);
              if (res.status == 204) {
                  this.FETCH_LIBRARY();
              }
          })
          .catch(error => {
              console.log(error);
              this.isLoading = false;
              this.$ons.notification
                  .alert(error.message, {
                      title: "Update File failed"
                  })
                  .then(res => {
                      if (res == 0) {
                          this.FETCH_LIBRARY();
                      }
                  });
          })
          .finally(() => {
              this.isLoading = false;
          });
    },
    VALUE_CHANGE(e) {
      //console.log("fileReader e data:");
      console.log(e);
      console.log(e.value[0].name);
      let reader = new FileReader();
      reader.readAsDataURL(e.value[0]);
      reader.onload = () => {
          // this function is for showing the image preview on upload
      };
      this.file = e.value[0];
    },
    SAVE(e) {
      console.log(e);
      console.log(this.file);
      if ((e.changes.length > 0 || this.file.size > 0) && this.isEdit) {
          console.log('save');
          this.UPDATE_DOC(this.dataFileTemp);
      }
    },
    DOWNLOAD(p, n) {
      console.log(n);
      const url = this.baseURL + p;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", n);
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
    },
    DELETE_DOC(e) {
      const id = e.data.id;
      axios({
          method: "delete",
          url: "/ExInspectionRegisterInfoFile/" + id,
          headers: {
              Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
          }
      })
          .then(res => {
              if (res.status == 204) {
                  this.FETCH_LIBRARY();
              }
          })
          .catch(error => {
              console.log(error);
              this.isLoading = false;
              this.$ons.notification
                  .alert(error.message, {
                      title: "Delete failed"
                  })
                  .then(res => {
                      if (res == 0) {
                          this.FETCH_LIBRARY();
                      }
                  });
          })
          .finally(() => {
              this.isLoading = false;
          });
    },
    ADD_ROW() {
      var grid = this.$refs[this.gridRefName].instance;
      grid.addRow();
      grid.deselectAll();
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.toolbar-button {
  background-color: $web-theme-color-background;
  padding: 0;
  padding-right: 15px;
  height: 34px;
  border: 0px;
  border: 1px solid $web-font-color-black;

  i {
    font-size: 20px;
    color: $web-font-color-black;
  }
  span {
    font-size: 14px;
    font-weight: 500;
    color: $web-font-color-black;
  }
}
.toolbar-button:hover,
.toolbar-button:active {
  background-color: $dexon-primary-blue;

  i {
    color: $web-font-color-white;
  }
  span {
    color: $web-font-color-white;
  }
}
.action-wrapper {
  display: flex;
  justify-content: center;
  gap: 5px;
}
.penSvg {
  width: 25px; 
  padding: 5px; 
  background-color: orange; 
  fill: white;
  transition: 0.2s;
  border-radius: 5px;
  &:hover {
    transform: scale(1.1);
  }
}
.trashSvg {
  width: 25px; 
  padding: 5px; 
  background-color: red; 
  fill: white;
  transition: 0.2s;
  border-radius: 5px;
  &:hover {
    transform: scale(1.1);
  }
}
.library-btn-download {
    font-size: 12px;
    font-weight: 500;
    border-radius: 20px;
    border: 1px solid gray;
    padding: 8px;
    color: #3c3c3c;
    background: transparent;

    &:hover {
        transition: 0.4s;
        background: #d8d8d8;
    }
}
</style>