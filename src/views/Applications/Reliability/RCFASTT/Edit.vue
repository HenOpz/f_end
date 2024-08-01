<template>
  <div class="page-container">
    <div class="action-bar">
      <button class="back" @click="SET_CURRENT_VIEW(0)">
          <i class="fas fa-chevron-left"></i>  BACK
      </button>
      <div class="wrapper">
        <div class="switch">
        <div>
          <v-ons-switch
            style="padding: 0 !important; border: 0;"
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
          <i class="fas fa-save"></i> SUBMIT</button>
      <button @click="SET_CURRENT_VIEW(0)" class="delete">
          <i class="fas fa-trash-alt"></i>  DELETE
      </button>
      </div>
    </div>
    <div class="page-section">
      <div class="table-wrapper">
        <div class="input-wrapper">
          <span>Failure Report Number</span>
          <div class="select">
            <DxTextBox
              placeholder="Enter Failure Report Number"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Action Date</span>
          <div class="input">
            <DxDateBox
              type="date"
              :disabled="!btn_state"
              v-model="shortTermRecordList.action_date"
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
              v-model="shortTermRecordList.id_discipline"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Status</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.status"
              value-expr="id"
              display-expr="status"
              placeholder="Select Status"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure_action_status"
            />
          </div>
        </div>

        <div class="input-wrapper" fill>
          <span>Action Detail</span>
          <div class="input">
            <DxTextArea
              :height="120"
              :max-length="200"
              :auto-resize-enabled="true"
              placeholder="Enter Action Detail"
              :disabled="!btn_state"
              v-model="shortTermRecordList.action_details"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>WO Order No.</span>
          <div class="select">
            <DxTextBox
              placeholder="Enter WO Order No."
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>WO Type</span>
          <div class="select">
            <DxTextBox
              placeholder="Enter WO Type"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Description</span>
          <div class="select">
            <DxTextBox
              placeholder="Enter Description"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Functional Location</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.functionalLocation"
              value-expr="id"
              display-expr="functional_location"
              placeholder="Select Functional Location"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure_action_status"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Equipment No.</span>
          <div class="select">
            <DxTextBox
              placeholder="Enter Equipment No."
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Planner Grp</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.plannerGrp"
              value-expr="id"
              display-expr="code"
              placeholder="Select Planner Grp"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure_action_status"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Planner Grp Planning Plant</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.plannerGrpPlanning"
              value-expr="id"
              display-expr="code"
              placeholder="Select Planner Grp Planning Plant"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure_action_status"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Main WorkCtr</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.mainWorkCtr"
              value-expr="id"
              display-expr="code"
              placeholder="Select Main WorkCtr"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure_action_status"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Object Part Code</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.objectpartCode"
              value-expr="id"
              display-expr="object_part_code"
              placeholder="Select Object Part Code"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure_action_status"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Code Grp Damage</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.codegrpDamage"
              value-expr="id"
              display-expr="cause_code"
              placeholder="Select Code Grp Damage"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure_action_status"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Damage Code</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.damageCode"
              value-expr="id"
              display-expr="damage_code"
              placeholder="Select Damage Code"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure_action_status"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Damage Free text</span>
          <div class="select">
            <DxTextBox
              placeholder="Enter Damage Free text"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Code grp Cause</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.codegrpCause"
              value-expr="id"
              display-expr="cause_code"
              placeholder="Select Code grp Cause"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure_action_status"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Cause Code</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.causeCode"
              value-expr="id"
              display-expr="cause_code"
              placeholder="Select Cause Code"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure_action_status"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Cause grp</span>
          <div class="select">
            <DxTextBox
              placeholder="Enter Cause grp"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Addtional Data</span>
          <div class="select">
            <DxTextBox
              placeholder="Enter Addtional Data"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Accessibility</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.accessibility"
              value-expr="id"
              display-expr="code"
              placeholder="Select Accessibility"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure_action_status"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Scaffolding Requirement</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.scaffoldingReq"
              value-expr="id"
              display-expr="code"
              placeholder="Select Scaffolding Requirement"
              :disabled="!btn_state"
              v-model="shortTermRecordList.id_failure_action_status"
            />
          </div>
        </div>
        <br>
      </div>
    </div>
  </div>
</template> 

<script>
//API
import { GET_DATA, PUT_DATA, DELETE_DATA } from "/axios.js";
import moment from "moment";

//Components
//import VueTabsChrome from "vue-tabs-chrome";
// import trashSvg from "@/components/svg/trash-svg.vue"

//DataGrid
import "devextreme/dist/css/dx.light.css";
// import { Workbook } from "exceljs";
// import saveAs from "file-saver";
// import { exportDataGrid } from "devextreme/excel_exporter";
import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';
import DxDateBox from 'devextreme-vue/date-box';
import DxTextArea from 'devextreme-vue/text-area';
// import DxAddRowButton from "devextreme-vue/button";
// import { DxItem } from "devextreme-vue/form";
import {
  // DxDataGrid,
  // DxSearchPanel,
  // DxPaging,
  // DxPager,
  // DxScrolling,
  // DxColumn,
  // DxExport,
  // DxToolbar,
  // DxHeaderFilter,
  // DxSelection,
  // DxEditing,
  // DxFilterRow,
  // DxButton,
  // DxLookup,
  // DxRequiredRule,
  // DxFormItem,
  // DxForm
} from "devextreme-vue/data-grid";

//Structures

export default {
  name: "inspection-record",
  props: {
    id_record: Number,
  },
  components: {
    // DxDataGrid,
    // DxSearchPanel,
    // DxPaging,
    // DxPager,
    // DxScrolling,
    // DxColumn,
    // DxExport,
    // DxToolbar,
    // DxHeaderFilter,
    // DxSelection,
    // DxForm,
    // DxItem,
    // DxEditing,
    // DxFilterRow,
    // DxButton,
    // DxAddRowButton,
    // DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    DxSelectBox,
    DxTextBox,
    DxDateBox,
    DxTextArea,
    // trashSvg
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "STT NUMBER: " + this.id_record,
      subpageInnerName: null,
    });
    if (this.$store.state.status.server == true) {
      this.FETCH_SHORT_TERM_RECORD();
    }
    this.FETCH_DISCIPLINE();
    this.FETCH_STATUS();
    this.FETCH_FUNC_LOCATION();
    this.FETCH_PLANNER_GRP();
    this.FETCH_PLANNER_GRP_PLANNING_PLANT();
    this.FETCH_MAIN_WORK_CTR();
    this.FETCH_OBJECT_PART_CODE();
    this.FETCH_CODE_GRP_DAMAGE();
    this.FETCH_DAMAGE_CODE();
    this.FETCH_CODE_GRP_CAUSE();
    this.FETCH_CAUSE_CODE();
    this.FETCH_ACCESSIBILITY();
    this.FETCH_SCAFFOLDING_REQ();
  },
  data() {
    return {
      // testList: [{id: 1, code: 'test'}],
      shortTermRecordList: {},
      dataGridAttributes: {
        class: "data-grid-style"
      },
      btn_state: false,
      formSelect: [
        {
          discipline: {},
          status: {},
          functionalLocation: {},
          plannerGrp: {},
          plannerGrpPlanning: {},
          mainWorkCtr: {},
          objectpartCode: {},
          codegrpDamage: {},
          damageCode: {},
          codegrpCause: {},
          causeCode: {},
          causeGrp: {},
          accessibility: {},
          scaffoldingReq: {},
        }
      ]
    };
  },
  computed: {},
  methods: {
    FETCH_SHORT_TERM_RECORD() {
      GET_DATA(this, `/RCFAActionRecord/${this.id_record}`, 'shortTermRecordList');
    },
    UPDATE_RECORD() {
      if (this.shortTermRecordList.action_date)
        this.shortTermRecordList.action_date = moment(this.shortTermRecordList.action_date).format("L");
      PUT_DATA(`/RCFAActionRecord/${this.shortTermRecordList.id}`, this.shortTermRecordList, () => { this.SET_CURRENT_VIEW(0); });
    },
    DELETE_RECORD() {
      DELETE_DATA(`/RCFAActionRecord/delete-rcfa-action-record?id=${this.shortTermRecordList.id}`, () => { this.SET_CURRENT_VIEW(0); });
    },
    FETCH_DISCIPLINE() {
      GET_DATA(this, '/Md/get-md-failure-discipline-list', 'formSelect.discipline');
    },
    FETCH_STATUS() {
      GET_DATA(this, '/Md/get-md-failure-action-status-list', 'formSelect.status');
    },
    FETCH_FUNC_LOCATION() {
      GET_DATA(this, '/Md/get-md-sap-functional-location-list', 'formSelect.functionalLocation');
    },
    FETCH_PLANNER_GRP() {
      GET_DATA(this, '/Md/get-md-sap-planner-grp-list', 'formSelect.plannerGrp');
    },
    FETCH_PLANNER_GRP_PLANNING_PLANT() {
      GET_DATA(this, '/Md/get-md-sap-planner-grp-planning-plant-list', 'formSelect.plannerGrpPlanning');
    },
    FETCH_MAIN_WORK_CTR() {
      GET_DATA(this, '/Md/get-md-sap-main-work-ctr-list', 'formSelect.mainWorkCtr');
    },
    FETCH_OBJECT_PART_CODE() {
      GET_DATA(this, '/Md/get-md-sap-code-grp-object-part-list', 'formSelect.objectpartCode');
    },
    FETCH_CODE_GRP_DAMAGE() {
      GET_DATA(this, '/Md/get-md-sap-code-grp-cause-list', 'formSelect.codegrpDamage');
    },
    FETCH_DAMAGE_CODE() {
      GET_DATA(this, '/Md/get-md-sap-damage-code-list', 'formSelect.damageCode');
    },
    FETCH_CODE_GRP_CAUSE() {
      GET_DATA(this, '/Md/get-md-sap-code-grp-cause-list', 'formSelect.codegrpCause');
    },
    FETCH_CAUSE_CODE() {
      GET_DATA(this, '/Md/get-md-sap-cause-code-list', 'formSelect.causeCode');
    },
    FETCH_ACCESSIBILITY() {
      GET_DATA(this, '/Md/get-md-sap-accessibility-list', 'formSelect.accessibility');
    },
    FETCH_SCAFFOLDING_REQ() {
      GET_DATA(this, '/Md/get-md-sap-scaffolding-list', 'formSelect.scaffoldingReq');
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
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
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
      font-size: 16px;
    }
  }
}
</style>