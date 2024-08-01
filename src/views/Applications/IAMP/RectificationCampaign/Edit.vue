<template>
  <div class="page-container">
    <div class="action-bar">
      <!-- <div class="switch">
        <DxSwitch :value="false"/>
        <span>EDIT MODE</span>
      </div> -->
      <button class="back" @click="SET_CURRENT_VIEW(0)"> <i class="fas fa-chevron-left"></i> BACK</button>
      <div class="wrapper">
        <div class="switch">
          <div>
            <v-ons-switch style="padding: 0 !important; border: 0;" input-id="switch1" v-model="btn_state" />
          </div>

          <span>EDIT MODE</span>
        </div>
        <button @click="UPDATE_RECORD" class="submit">
           <i class="fas fa-save"></i> SUBMIT</button>
        <button @click="DELETE_RECORD" class="delete">
          <i class="fas fa-trash-alt"></i> DELETE
        </button>
      </div>
    </div>
    <div class="page-section">
      <div class="table-wrapper">
        <div class="input-wrapper" span-3>
          <span>Rectification Issue</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Rectification Issue"
              v-model="rectificationCampaignList.rc_issue"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>PIC</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter PIC"
              v-model="rectificationCampaignList.person_in_charge"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>Contractor</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Contractor"
              v-model="rectificationCampaignList.contactor"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>Target Completion</span>
          <div class="select">
            <DxDateBox
              type="date"
              placeholder="Select Target Completion"
              v-model="rectificationCampaignList.target_completion"
              display-format="dd MMM yyyy"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>Work Package</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.status"
              value-expr="id"
              display-expr="status"
              placeholder="Select Status"
              v-model="rectificationCampaignList.id_status_work_package"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>Manpower</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.status"
              value-expr="id"
              display-expr="status"
              placeholder="Select Status"
              v-model="rectificationCampaignList.id_status_manpower"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>Equipment</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.status"
              value-expr="id"
              display-expr="status"
              placeholder="Select Status"
              v-model="rectificationCampaignList.id_status_equipment"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>POB</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.status"
              value-expr="id"
              display-expr="status"
              placeholder="Select Status"
              v-model="rectificationCampaignList.id_status_pob"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>Execution</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.status"
              value-expr="id"
              display-expr="status"
              placeholder="Select Status"
              v-model="rectificationCampaignList.id_status_execute"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>Comments</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Comments"
              v-model="rectificationCampaignList.comments"
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

        <!-- <button class="create" @click="UPDATE_RECORD" span-3>Create</button>
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
  DxPopup
} from "devextreme-vue/data-grid";

export default {
  name: "inspection-record",
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
      this.FETCH_RECTICATION_CAMPAIGN();
      this.FETCH_LIBRARY();
    }
  },
  data() {
    return {
      rectificationCampaignList: {},
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
    FETCH_RECTICATION_CAMPAIGN() {
      GET_DATA(this, `/RectificationCampaign/${this.id_record}`, (data) => {
        this.rectificationCampaignList = data;
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
          subpageName: "RC NUMBER: " + this.rectificationCampaignList.rc_number,
          subpageInnerName: null,
        });
      });
    },
    UPDATE_RECORD() {
      this.rectificationCampaignList.target_completion = moment(this.rectificationCampaignList.target_completion).format("L");
      PUT_DATA(`/RectificationCampaign/${this.rectificationCampaignList.id}`, this.rectificationCampaignList, () => { this.SET_CURRENT_VIEW(0); });
    },
    DELETE_RECORD() {
      DELETE_DATA(`/RectificationCampaign/delete-rectification-campaign?id=${this.rectificationCampaignList.id}`, () => { this.SET_CURRENT_VIEW(0); });
    },
    FETCH_DROPDOWN_STATUS() {
      GET_DATA(this, '/Md/get-md-rectification-status-list', 'formSelect.status');
    },
    FETCH_LIBRARY() {
      GET_DATA(this, `/RectificationCampaignFile/get-recti-campaign-file-by-id-task?id=${this.id_record}`, 'library');
    },
    ADD_NEW_FILE(e) {
      var formData = new FormData();
      formData.append("id_recti_campaign", this.rectificationCampaignList.id);
      formData.append("file", this.file);
      formData.append("note", e.data.note);
      if (this.file.length == 0)
          return this.$ons.notification.alert("Please select file").then(res => {
              if (res == 0) {
                  this.FETCH_LIBRARY();
              }
          });
      POST_DATA('/RectificationCampaignFile', formData, true, () => { this.FETCH_LIBRARY(); });
    },
    UPDATE_DOC(e) {
      var formData = new FormData();
      formData.append("id", e.data.id);
      formData.append("id_recti_campaign", e.data.id_recti_campaign);
      formData.append("file", this.file ?? "");
      formData.append("note", e.data.note);
      PUT_DATA(`/RectificationCampaignFile/${e.data.id}`, formData, true, () => { this.FETCH_LIBRARY(); });
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
      DELETE_DATA(`/RectificationCampaignFile/${id}`, () => { this.FETCH_LIBRARY(); });
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
}

.dx-state-disabled.dx-widget {
    opacity: 1;
}

.action-wrapper {
  display: flex;
  justify-content: center;
  gap: 5px;
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
</style>