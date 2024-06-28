<template>
  <div>
  <div class="page-container">
    <div class="action-bar">
      <button class="back" @click="SET_CURRENT_VIEW(0)">
          <i class="fas fa-chevron-left"></i> BACK
      </button>
      <div class="wrapper">
        <div class="switch">
          <div>
            <v-ons-switch 
              style="padding: 0 !important; 
              border: 0;"
              input-id="switch1"
              v-model="btn_state"
            />
          </div>

          <span>EDIT MODE</span>
        </div>

        <!-- <div class="switch">
        <DxSwitch :value="false"/>
        <span>EDIT MODE</span>
      </div> -->
        <button @click="UPDATE_RECORD" class="submit">
            <i class="fas fa-save"></i> SUBMIT
        </button>
        <button v-if="user.failure_seq === 1" @click="DELETE_RECORD" class="delete">
            <i class="fas fa-trash-alt"></i> DELETE
        </button>
      </div>
    </div>
    <div class="page-section">
      <div class="table-wrapper">
        <div class="input-wrapper">
          <span>Tag Number</span>
          <div class="select">
            <DxTextBox 
              placeholder="Enter Tag Number" 
              :disabled="!btn_state" 
              v-model="failureRecordList.tag_no" 
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Location</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.platform"
              value-expr="id"
              display-expr="code_name"
              placeholder="Enter Location"
              :disabled="!btn_state"
              v-model="failureRecordList.id_platform"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Equipment Type</span>
          <div class="input">
            <DxTextBox 
              placeholder="Enter Equipment Type" 
              :disabled="!btn_state"
              v-model="failureRecordList.equipment_type" 
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Unit</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Unit"
              :disabled="!btn_state"
              v-model="failureRecordList.unit"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Drawing Number</span>
          <div class="input">
            <DxTextBox 
              placeholder="Enter Drawing Number" 
              :disabled="!btn_state"
              v-model="failureRecordList.drawing_no" 
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Failure Impact</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.failureImpact"
              value-expr="id"
              display-expr="status"
              placeholder="Select Failure Impact"
              :disabled="!btn_state"
              v-model="failureRecordList.id_failure_impact" 
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Discipline</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.discipline"
              value-expr="id"
              display-expr="discipline"
              placeholder="Select Discipline"
              :disabled="!btn_state"
              v-model="failureRecordList.id_discipline" 
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Findings Date</span>
          <div class="input">
            <DxDateBox
              type="date"
              placeholder="Enter Production Loss"
              :disabled="!btn_state"
              v-model="failureRecordList.findings_date"
              display-format="dd MMM yyyy"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Health and Safety</span>
          <div class="input">
            <DxTextBox 
              placeholder="Enter Health and Safety" 
              :disabled="!btn_state"
              v-model="failureRecordList.health_and_safety" 
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Production Loss</span>
          <div class="input">
            <DxTextBox 
              placeholder="Enter Production Loss" 
              :disabled="!btn_state"
              v-model="failureRecordList.production_loss" 
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Material Cost</span>
          <div class="input">
            <DxTextBox 
              placeholder="Enter Material Cost" 
              :disabled="!btn_state"
              v-model="failureRecordList.material_cost" 
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Environment Impact</span>
          <div class="input">
            <DxTextBox 
              placeholder="Enter Environment Impact" 
              :disabled="!btn_state"
              v-model="failureRecordList.environment_impact" 
            />
          </div>
        </div>

        <div class="input-wrapper" fill>
          <span>Details</span>
          <div class="input">
            <DxTextArea 
              :height="120" 
              :max-length="1000"          
              placeholder="Enter Details"
              :read-only="!btn_state" 
              v-model="failureRecordList.details" 
              style="font-size: 12px;"
            />
          </div>
        </div>

        <div class="input-wrapper" fill>
          <span>Findings</span>
          <div class="input">
            <DxTextArea 
              :height="120" 
              :max-length="1000"          
              placeholder="Enter Findings"
              :read-only="!btn_state" 
              v-model="failureRecordList.findings" 
              style="font-size: 12px;"
            />
          </div>
        </div>

        <div class="input-wrapper" fill>
          <span>Mitigation</span>
          <div class="input">
            <DxTextArea 
              :height="120" 
              :max-length="1000" 
              placeholder="Enter Mitigation"
              :read-only="!btn_state" 
              v-model="failureRecordList.mitigation" 
              style="font-size: 12px;"
            />
          </div>
        </div>

        <div span-2 />

        <div fill>
          <div class="table-header-toolbar left" style="width: calc(100% - 231px)">
            <label class="hd">Attachment</label>
          </div>
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

              <!-- <DxColumn 
                  data-field="file_name" 
                  :allow-adding="true" 
                  :allow-editing="true" 
                  caption="File Name"
                  :editor-options="fileNameInputOptions" 
                  sort-order="desc" 
                  :min-width="120" 
              /> -->
              <DxColumn
                data-field="file_path"
                caption="Picture"
                cell-template="picture-template"
              />

              <template #picture-template="{ data }">
                <div style="display: flex; justify-content: center;">
                  <!-- <a :href="baseURL + data.value" download="dwg" target="_blank" v-if="data.value != ''">
                    <img :src="baseURL + data.value" width="300" height="200" />
                    <br />
                  </a> -->

                  <img
                    :src="baseURL + data.data.file_path"
                    width="200"
                    height="200"
                  />
                </div>
              </template>


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
                          accept="image/*"
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

        <div fill>
          <div class="table-header-toolbar left" style="width: calc(100% - 231px)">
            <label class="hd">Short-Term Action</label>
          </div>
          <DxDataGrid 
            id="data-grid-list" 
            key-expr="id" 
            :data-source="shortTermRecordList"
            :selection="{ mode: 'single' }" 
            :hover-state-enabled="true" 
            :allow-column-reordering="true"
            :show-borders="true" 
            :show-row-lines="true" 
            :row-alternation-enabled="false" 
            :word-wrap-enabled="true"
            :column-auto-width="true" 
            @init-new-row="() => { $emit('popup', 1); }"
          >
            <DxEditing 
              :allow-updating="false"
              :allow-deleting="false" 
              :allow-adding="true" 
              :use-icons="true"
              mode="form" 
            />
            <DxFilterRow :visible="true" />
            <DxHeaderFilter :visible="true" />
            <DxSelection mode="single" />

            <DxMasterDetail :enabled="true" template="masterShorttermDetailTemplate"/>
            
            <template #masterShorttermDetailTemplate="{ data }">
              <SapSTT :sapData="data"/>
            </template>

            <DxColumn 
              data-field="action_details" 
              caption="Short Term Action Detail" 
              :min-width="150"
              alignment="left" 
            />
            <DxColumn 
              data-field="action_date" 
              caption="Action Date" 
              :width="120" 
              alignment="center" 
              dataType="date"
              format="dd MMM yyyy" 
            />
            <DxColumn 
              data-field="id_discipline" 
              caption="Discipline" 
              :width="120" 
              alignment="center" 
            >
              <DxLookup :data-source="formSelect.discipline" display-expr="discipline" value-expr="id" />
            </DxColumn>
            <DxColumn 
              data-field="id_failure_action_status" 
              caption="Status" 
              :width="120" 
              alignment="center" 
            >
              <DxLookup :data-source="formSelect.actionStatus" display-expr="status" value-expr="id" />
            </DxColumn>
            <DxColumn 
              :width="120" 
              alignment="center" 
              cell-template="action-cell-template" 
            />

            <template #action-cell-template="{ data }">
              <div class="action-wrapper">
                <div @click="() => { isShow = 2; selectedRow = data.data.id;  }">
                  <img src="/img/svg/pen-svg.svg" class="penSvg" />
                </div>
                <div @click="DELETE_FAILURE_ACTION_RECORD(data)">
                  <img src="/img/svg/trash-svg.svg" class="trashSvg" />
                </div>
              </div>
            </template>

            <DxToolbar>
                <DxItem location="before" template="action-add-template" />
                <DxItem 
                  location="after"
                  name="searchPanel"
                />
            </DxToolbar>

            <template #action-add-template="{ }">
              <DxButton icon="plus" @click="() => { isShow = 1; }" />
            </template>


            <!-- Configuration goes here -->
            <!-- <DxFilterRow :visible="true" /> -->
            <DxScrolling mode="standard" />
            <DxSearchPanel :visible="true" />
            <DxPaging 
              :page-size="10" 
              :page-index="0" 
            />
            <DxPager 
              :show-page-size-selector="true" 
              :allowed-page-sizes="[10, 20, 30]" 
              :show-navigation-buttons="true"
              :show-info="false" info-text="Page {0} of {1} ({2} items)" 
            />
            <DxExport :enabled="false" />
          </DxDataGrid>
        </div>
        <div fill>
          <div class="table-header-toolbar left" style="width: calc(100% - 231px)">
            <label class="hd">Long-Term Action</label>
          </div>
          <DxDataGrid 
            id="data-grid-list"
            key-expr="id" 
            :data-source="longTermRecordList"
            :selection="{ mode: 'single' }" 
            :hover-state-enabled="true" 
            :allow-column-reordering="true"
            :show-borders="true" 
            :show-row-lines="true" 
            :row-alternation-enabled="false" 
            :word-wrap-enabled="true"
            :column-auto-width="true" 
            @init-new-row="() => { $emit('popup', 3); }"
          >
            <DxEditing 
              :allow-updating="false" 
              :allow-deleting="false" 
              :allow-adding="true" 
              :use-icons="true"
              mode="form" 
            />
            <DxFilterRow :visible="true" />
            <DxHeaderFilter :visible="true" />
            <DxSelection mode="single" />

            <DxMasterDetail :enabled="true" template="masterLongtermDetailTemplate"/>
            
            <template #masterLongtermDetailTemplate="{ data }">
              <SapLTT :sapData="data"/>
            </template>
            
            <DxColumn 
              data-field="action_details" 
              caption="Long Term Action Detail" 
              :min-width="150" alignment="left" 
            />
            <DxColumn 
              data-field="action_date" 
              caption="Action Date" 
              :width="120" 
              alignment="center" 
              dataType="date"
              format="dd MMM yyyy" 
            />
            <DxColumn 
              data-field="id_discipline" 
              caption="Discipline" 
              :width="120" 
              alignment="center" 
            >
              <DxLookup :data-source="formSelect.discipline" display-expr="discipline" value-expr="id" />
            </DxColumn>
            <DxColumn 
              data-field="id_failure_action_status" 
              caption="Status" 
              :width="120" 
              alignment="center" 
            >
              <DxLookup :data-source="formSelect.actionStatus" display-expr="status" value-expr="id" />
            </DxColumn>
            <DxColumn 
              :width="120" 
              alignment="center" 
              cell-template="action-cell-template" 
            />

            <template #action-cell-template="{ data }">
              <div class="action-wrapper">
                <div @click="() => { isShow = 4; selectedRow = data.data.id; }">
                  <img src="/img/svg/pen-svg.svg" class="penSvg" />
                </div>
                <div @click="DELETE_FAILURE_ACTION_RECORD(data)">
                  <img src="/img/svg/trash-svg.svg" class="trashSvg" />
                </div>
              </div>
            </template>

            <DxToolbar>
                <DxItem location="before" template="action-add-template" />
                <DxItem 
                  location="after"
                  name="searchPanel"
                />
            </DxToolbar>

            <template #action-add-template="{ }">
              <DxButton icon="plus" @click="() => { isShow = 3 }" />
            </template>

            <!-- Configuration goes here -->
            <!-- <DxFilterRow :visible="true" /> -->
            <DxScrolling mode="standard" />
            <DxSearchPanel :visible="true" />
            <DxPaging :page-size="10" :page-index="0" />
            <DxPager 
              :show-page-size-selector="true" 
              :allowed-page-sizes="[10, 20, 30]" 
              :show-navigation-buttons="true"
              :show-info="false" info-text="Page {0} of {1} ({2} items)" 
            />
            <DxExport :enabled="false" />
          </DxDataGrid>
        </div>

        <br>

        <div class="action-wrapper" fill>
            <button class="submit" @click="isShow = 1">APPROVE</button>
            <button v-if="user.failure_seq !== 1" class="delete" @click="rejectFailureRecord = true">REJECT</button>
        </div>
      </div>

    </div>
  </div>

  <div v-if="rejectFailureRecord" class="reject-failure-record">
    <div class="popup">
      <h2>Confirm Rejection</h2>
      <DxTextBox
        placeholder="Enter Remark"
        v-model="rejectFailureRemark"
      />
      <div class="actions">
        <button class="reject" @click="REJECT_FAILURE_RECORD">REJECT</button>
        <button class="cancel" @click="rejectFailureRecord = false">CANCEL</button>
      </div>
    </div>
  </div>

  <AddSTT  :id_record="id_record" :id_platform="failureRecordList.id_platform" :callback="APPROVE_FAILURE_RECORD" v-if="isShow == 1" @popup="FETCH_STT_RECORD"  />
  <EditSTT :id_record="selectedRow" :id_platform="failureRecordList.id_platform" v-if="isShow == 2" @popup="FETCH_STT_RECORD"  />

  <AddLTT :id_record="id_record" :id_platform="failureRecordList.id_platform" v-if="isShow == 3" @popup="FETCH_LTT_RECORD"  />
  <EditLTT :id_record="selectedRow" :id_platform="failureRecordList.id_platform" v-if="isShow == 4" @popup="FETCH_LTT_RECORD" />
  </div>
</template>

<script>
//API
import { axios } from "/axios.js";
import moment from "moment";
import AddSTT from "@/views/Applications/Reliability/FailureReport/STT/Add.vue"
import EditSTT from "@/views/Applications/Reliability/FailureReport/STT/Edit.vue"
import AddLTT from "@/views/Applications/Reliability/FailureReport/LTT/Add.vue"
import EditLTT from "@/views/Applications/Reliability/FailureReport/LTT/Edit.vue"
import SapLTT from "@/views/Applications/Reliability/FailureReport/SapLTT.vue"
import SapSTT from "@/views/Applications/Reliability/FailureReport/SapSTT.vue"

//DataGrid
import "devextreme/dist/css/dx.light.css";
// import { Workbook } from "exceljs";
// import saveAs from "file-saver";
// import { exportDataGrid } from "devextreme/excel_exporter";
import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';
import DxDateBox from 'devextreme-vue/date-box';
import DxTextArea from 'devextreme-vue/text-area';
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
  DxSelection,
  DxEditing,
  DxFilterRow,
  // DxButton,
  DxLookup,
  // DxRequiredRule,
  // DxFormItem,
  DxForm,
  DxPopup,
  DxMasterDetail
} from "devextreme-vue/data-grid";

//Structures

export default {
  name: "inspection-record",
  props: {
    data_row: Object,
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
    DxSelection,
    DxForm,
    DxItem,
    DxEditing,
    DxFilterRow,
    DxButton,
    DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    DxSelectBox,
    DxTextBox,
    DxDateBox,
    DxTextArea,
    // penSvg,
    // trashSvg,
    AddSTT,
    EditSTT,
    AddLTT,
    EditLTT,
    DxPopup,
    DxFileUploader,
    DxMasterDetail,
    SapLTT,
    SapSTT
  },
  created() {
    console.log(this.data_row);
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "FR NUMBER: " + this.data_row.fl_number,
      subpageInnerName: null,
    });
    if (this.$store.state.status.server == true) {
      this.FETCH_FAILURE_RECORD();
      this.FETCH_LIBRARY();
      this.FETCH_DROPDOWN_FAILURE_IMPACT();
      this.FETCH_DROPDOWN_DISCIPLINE();
      this.FETCH_DROPDOWN_PLATFORM_LIST();
      this.FETCH_DROPDOWN_ACTION_STATUS();
      this.user = JSON.parse(localStorage.getItem("user"));
      this.user.failure_seq = 2;
    }
    
  },
  data() {
    return {
      formSelect: {
        platform: [],
        failureImpact: [],
        discipline: [],
        actionStatus: [],
      },
      failureRecordList: {},
      shortTermRecordList: {},
      longTermRecordList: {},
      btn_state: false,
      isShow: 0,
      selectedRow: 0,
      library: [],
      file: [],
      gridRefName: "grid-library",
      fileNameInputOptions: { placeholder: "File Name" },
      dataFileTemp: "",
      isEdit: false,
      id_record: this.data_row.id,
      user: null,
      rejectFailureRecord: false,
      rejectFailureRemark: ""
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
    FETCH_FAILURE_RECORD() {
      this.isLoading = true;
      axios({
        method: "get",
        url:
          "/FailureRecord/" + this.id_record,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.failureRecordList = res.data;
            this.FETCH_SHORT_TERM_RECORD();
            this.FETCH_LONG_TERM_RECORD();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_SHORT_TERM_RECORD() {
      this.isLoading = true;
      axios({
        method: "get",
        url:
          "/FailureActionRecord/get-failure-action-record-short-term-by-id?id_failure=" + this.failureRecordList.id,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.shortTermRecordList = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_LONG_TERM_RECORD() {
      this.isLoading = true;
      axios({
        method: "get",
        url:
          "/FailureActionRecord/get-failure-action-record-long-term-by-id?id_failure=" + this.failureRecordList.id,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.longTermRecordList = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_FAILURE_ACTION_RECORD(e) {
      axios({
        method: "delete",
        url: "/FailureActionRecord/delete-failure-action-record?id=" + e.key,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          if (res.status == 204) {
            this.FETCH_SHORT_TERM_RECORD();
            this.FETCH_LONG_TERM_RECORD();
          }
        })
        .catch(error => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => { });
    },
    UPDATE_RECORD() {
      if (this.failureRecordList.findings_date)
        this.failureRecordList.findings_date = moment(this.failureRecordList.findings_date).format("L");
      axios({
        method: "put",
        url: "/FailureRecord/" + this.failureRecordList.id,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: this.failureRecordList
      })
        .then(res => {
          if (res.status == 204) {
            this.SET_CURRENT_VIEW(0);
          }
        })
        .catch(error => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => { });
    },
    DELETE_RECORD() {
      axios({
        method: "delete",
        url: "/FailureRecord/delete-failure-record?id=" + this.failureRecordList.id,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          if (res.status == 204) {
            this.SET_CURRENT_VIEW(0);
          }
        })
        .catch(error => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => { });
    },
    FETCH_STT_RECORD() {
      this.isShow = 0;
      this.FETCH_SHORT_TERM_RECORD();
    },
    FETCH_LTT_RECORD() {
      this.isShow = 0;
      this.FETCH_LONG_TERM_RECORD();
    },
    FETCH_LIBRARY() {
      this.isLoading = true;
      axios({
          method: "get",
          url: "/FailureFile/get-failure-file-by-id?id=" + this.id_record,
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
    FETCH_DROPDOWN_FAILURE_IMPACT() {
      axios({
        method: "get",
        url: "/Md/get-md-failure-impact-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.failureImpact = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_DROPDOWN_DISCIPLINE() {
      axios({
        method: "get",
        url: "/Md/get-md-failure-discipline-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.discipline = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_DROPDOWN_PLATFORM_LIST() {
      axios({
        method: "get",
        url: "/Md/get-md-platform-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.platform = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_DROPDOWN_ACTION_STATUS() {
      axios({
        method: "get",
        url: "/Md/get-md-failure-action-status-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.actionStatus = res.data;
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
      // const user = JSON.parse(localStorage.getItem("user"));
      console.log('e',e);
      var formData = new FormData();
      formData.append("id_failure", this.failureRecordList.id);
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
          url: "/FailureFile",
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
      formData.append("id_failure", e.data.id_failure);
      formData.append("file", this.file ?? "");
      formData.append("note", e.data.note);
      axios({
          method: "put",
          url: "/FailureFile/" + e.data.id,
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
          url: "/FailureFile/" + id,
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
    SET_CURRENT_VIEW(view, data = null) {
        this.$store.commit("SET_SHOW_BACK_BUTTON", true);
        if (data !== null) this.$emit('currentView', view, data);
        else this.$emit('currentView', view);
    },
    APPROVE_FAILURE_RECORD() {
      axios({
        method: "post",
        url: `/FailureRecordTXN/add-submit-txn?id_user=${this.user.id}&id_failure=${this.data_row.id}`,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 201) {
            // this.SET_CURRENT_VIEW(2, res.data);
          }
        })
        .catch(error => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
    REJECT_FAILURE_RECORD() {
      axios({
        method: "post",
        url: `/FailureRecordTXN/add-reject-txn?id_user=${this.user.id}&id_failure=${this.data_row.id}&remark=${this.rejectFailureRemark}`,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 201) {
            // this.SET_CURRENT_VIEW(2, res.data);
          }
        })
        .catch(error => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  z-index: 10;
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

.reject-failure-record {
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  overflow-y: hidden;
  position: absolute !important;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: #14141484;

  .popup {
    width: 400px;
    padding: 20px;
    overflow-y: auto;
    height: auto;
    position: absolute !important;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff !important;
    border-radius: 10px;
    border: #d9d9d9 1px solid;

    h2 {
      display: flex;
      justify-content: center;
    }

    .actions {
      display: flex;
      flex-direction: row;
      gap: 15px;
      margin-top: 10px;
    }

    button {
        color: white;
        border-radius: 5px;
        width: 100%;
        padding: 10px;
        border: solid 1px gray;
        font-weight: 600;
        font-size: 12px;
        transition: 1s;
        cursor: pointer;
    }

    .cancel {
        background-color: $dexon-primary-gray;
        border-color: $dexon-primary-gray;
    }

    .reject {
        background-color: $dexon-primary-red;
        border-color: $dexon-primary-red;
    }
  }
}

.page-ltt-detail-master {
  background-color: #fff;
  border-radius: 10px;
}

.table-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin: 20px;
  *[span-2] {
    grid-column: span 2;
  }

  *[fill] {
    grid-column: span 4;
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

.action-wrapper {
    width: 100%;

    button {
        color: white;
        border-radius: 5px;
        width: 20%;
        padding: 10px;
        border: solid 1px gray;
        font-weight: 600;
        font-size: 12px;
        transition: 1s;
        cursor: pointer;
    }

    .submit {
        background-color: $dexon-primary-green;
        border-color: $dexon-primary-green;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    .delete {
        background-color: $dexon-primary-red;
        border-color: $dexon-primary-red;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
}
.hd {
  line-height: 36px;
  user-select: text;
  cursor: text;
  font-size: 16px;
  font-weight: 600;
  color: $dexon-primary-blue;
}
</style>