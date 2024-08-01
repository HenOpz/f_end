<template>
  <div class="page-container">
    <div class="action-bar">
      <button class="back" @click="SET_CURRENT_VIEW(0)">
        <i class="fas fa-chevron-left"></i> BACK
      </button>
      <div class="wrapper">
        <div class="switch">
          <v-ons-switch
            style="padding: 0 !important; border: 0;"
            input-id="switch1"
            v-model="btn_state"
          />
          <span>EDIT MODE</span>
        </div>
        <button class="submit" @click="UPDATE_RECORD">
            <i class="fas fa-save"></i> SUBMIT
        </button>
        <button @click="DELETE_RECORD" class="delete">
            <i class="fas fa-trash-alt"></i>  DELETE
        </button>
      </div>
    </div>
    <div class="page-section">
      <div class="table-wrapper">
        <div class="input-wrapper" span-3>
          <span>Inspection Program</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Inspection Program"
              v-model="inspectionCampaignList.inspection_program"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>Status</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.status"
              value-expr="id"
              display-expr="status"
              placeholder="Select Status"
              v-model="inspectionCampaignList.id_ic_status"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>Start Date</span>
          <div class="select">
            <DxDateBox
              type="date"
              v-model="inspectionCampaignList.start_date"
              placeholder="Select Start Date"
              display-format="dd MMM yyyy"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>End Date</span>
          <div class="select">
            <DxDateBox
              type="date"
              v-model="inspectionCampaignList.end_date"
              placeholder="Select End Date"
              display-format="dd MMM yyyy"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>PIC</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter PIC"
              v-model="inspectionCampaignList.person_in_charge"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>Contractor</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Contractor"
              v-model="inspectionCampaignList.contractor"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>Comments</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Comments"
              v-model="inspectionCampaignList.comments"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div fill>
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
        
        <!-- <button class="create" @click="UPDATE_RECORD" span-3>Save</button>
        <button @click="$emit('currentView', 0)" span-3>Cancel</button> -->
        <br>
      </div>
    </div>
  </div>
</template> 

<script>
import { GET_DATA, PUT_DATA, POST_DATA, DELETE_DATA } from "/axios.js";
import moment from "moment";
import "devextreme/dist/css/dx.light.css";
import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';
import DxDateBox from 'devextreme-vue/date-box';
import { DxFileUploader } from 'devextreme-vue/file-uploader';
import DxButton from "devextreme-vue/button";
import { DxItem } from "devextreme-vue/form";
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
  DxEditing,
  DxForm,
  DxPopup,
} from "devextreme-vue/data-grid";

export default {
  name: "inspection-campaign",
  props: {
    id_record: Number,
  },
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
    DxForm,
    DxItem,
    DxEditing,
    DxButton,
    DxSelectBox,
    DxTextBox,
    DxDateBox,
    DxFileUploader,
    DxPopup
  },
  created() {
    if (this.$store.state.status.server == true) {
      this.FETCH_DROPDOWN_STATUS();
      this.FETCH_INSPECTION_RECORD();
      this.FETCH_LIBRARY();
    }
  },
  data() {
    return {
      inspectionCampaignList: {},
      btn_state: false,
      formSelect: {
        status: [],
      },
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
    FETCH_INSPECTION_RECORD() {
      GET_DATA(this, `/InspectionCampaign/${this.id_record}`, (res) => {
        this.inspectionCampaignList = res;
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
          subpageName: "IC NUMBER: " + this.inspectionCampaignList.ic_number,
          subpageInnerName: null,
        });
      });
    },
    UPDATE_RECORD() {
      if (this.inspectionCampaignList.start_date !== null)
        this.inspectionCampaignList.start_date = moment(this.inspectionCampaignList.start_date).format("L");
      if (this.inspectionCampaignList.end_date !== null)
        this.inspectionCampaignList.end_date = moment(this.inspectionCampaignList.end_date).format("L");
      PUT_DATA(`/InspectionCampaign/${this.inspectionCampaignList.id}`, this.inspectionCampaignList, () => { this.SET_CURRENT_VIEW(0); });
    },
    DELETE_RECORD() {
      this.$ons.notification.confirm("Confirm Delete Inspection Campaign?").then((res) => {
        if (res == 1) {
          DELETE_DATA(`/InspectionCampaign/delete-insp-campaign?id=${this.inspectionCampaignList}`, () => { this.SET_CURRENT_VIEW(0); });
        }
      });
    },
    FETCH_DROPDOWN_STATUS() {
      GET_DATA(this, '/Md/get-md-insp-campaign-status-list', 'formSelect.status');
    },
    FETCH_LIBRARY() {
      GET_DATA(this, `/InspectionCampaignFile/get-insp-campaign-file-by-id-task?id=${this.id_record}`, 'library');
    },
    ADD_NEW_FILE(e) {
      var formData = new FormData();
      formData.append("id_insp_campaign", this.inspectionCampaignList.id);
      formData.append("file", this.file);
      formData.append("note", e.data.note);
      if (this.file.length == 0)
          return this.$ons.notification.alert("Please select file").then(res => {
              if (res == 0) {
                  this.FETCH_LIBRARY();
              }
          });
      POST_DATA('/InspectionCampaignFile', formData, true, () => { this.FETCH_LIBRARY(); });
    },
    UPDATE_DOC(e) {
      console.log("e.data", e.data);
      var formData = new FormData();
      formData.append("id", e.data.id);
      formData.append("id_insp_campaign", e.data.id_insp_campaign);
      formData.append("file", this.file ?? "");
      formData.append("note", e.data.note);
      PUT_DATA(`/InspectionCampaignFile/${e.data.id}`, formData, true, () => { this.FETCH_LIBRARY(); });
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
      if((e.changes.length > 0 || this.file.size > 0) && this.isEdit) {
        console.log('save');
        this.UPDATE_DOC(this.dataFileTemp);
      }
    },
    DOWNLOAD(p,n) {
      console.log(this.baseURL + p);
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
      DELETE_DATA(`/InspectionCampaignFile/${id}`, () => { this.FETCH_LIBRARY(); });
    },
    ADD_ROW() {
      var grid = this.$refs[this.gridRefName].instance;
      grid.addRow();
      grid.deselectAll();
    },
    SET_CURRENT_VIEW(view, data = null) {
        this.$store.commit("SET_SHOW_BACK_BUTTON", true);
        if (data !== null) this.$emit('currentView', view, data);
        else this.$emit('currentView', view);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 51px calc(100vh - 95px);
  transition: all 0.3s;
  // overflow-y: hidden;
}

.page-section {
  padding: 20px;
  overflow-y: auto;
  height: calc(100% - 270px);
  grid-row: span 2;
  margin-top: 60px;
}

.table-wrapper {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
  *[span-2] {
    grid-column: span 2;
  }

  *[span-3] {
        grid-column: span 3;
    }

  *[span-4] {
      grid-column: span 4;
  }

  *[span-5] {
      grid-column: span 5;
  }

  *[span-6] {
      grid-column: span 6;
  }

  *[fill] {
    grid-column: span 6;
  }
  .input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 6px;

        span {
            font-size: 12px;
            font-weight: 600;
        }
    }
    .library-btn-download {
        font-size: 12px;
        font-weight: 500;
        border-radius: 20px;
        border: 1px solid gray;
        padding: 8px !important;
        color: #3c3c3c;
        background: transparent;

        &:hover {
          transition: 0.4s;
          background: #d8d8d8;
        }
    }
}
</style>