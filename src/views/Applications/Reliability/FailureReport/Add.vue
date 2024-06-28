<template>
  <div class="page-container">
    <div class="page-section">
      <div class="table-wrapper">
        <h3 style="grid-column: span 2; margin-top: 0; margin-bottom: 0;">New Failure Report</h3>

        <div class="input-wrapper">
          <span>Tag Number</span>
          <div class="select">
            <DxTextBox
              placeholder="Enter Tag Number"
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
              placeholder="Select Location"
              v-model="failureRecordList.id_platform"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Equipment Type</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Equipment Type"
              v-model="failureRecordList.equipment_type"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Unit</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Unit"
              v-model="failureRecordList.unit"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Drawing Number</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Drawing Number"
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
              v-model="failureRecordList.id_discipline"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Findings Date</span>
          <div class="select">
            <DxDateBox
              type="date"
              placeholder="Select Findings Date"
              v-model="failureRecordList.findings_date"
            />
          </div>
        </div>
    
        <div class="input-wrapper" fill>
          <span>Details</span>
          <div class="input">
            <DxTextArea
              :height="150"
              :auto-resize-enabled="true"
              placeholder="Enter Details"
              v-model="failureRecordList.remark"
            />
          </div>
        </div>

        <div class="input-wrapper" fill>
          <span>Findings</span>
          <div class="input">
            <DxTextArea
              :height="150"
              :auto-resize-enabled="true"
              placeholder="Enter Findings"
              v-model="failureRecordList.findings"
            />
          </div>
        </div>

        <div class="input-wrapper" fill>
          <span>Mitigation</span>
          <div class="input">
            <DxTextArea
              :height="150"
              :auto-resize-enabled="true"
              placeholder="Enter Mitigation"
              v-model="failureRecordList.mitigation"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Health and Safety</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Health and Safety"
              v-model="failureRecordList.health_and_safety"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Production Loss</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Production Loss"
              v-model="failureRecordList.production_loss"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Material Cost</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Material Cost"
              v-model="failureRecordList.material_cost"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Environment Impact</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Environment Impact"
              v-model="failureRecordList.environment_impact"
            />
          </div>
        </div>

        <button class="create" @click="CREATE_RECORD">Create</button>
        <button @click="SET_CURRENT_VIEW(0)">Cancel</button>
        <br>
      </div>
    </div>
  </div>
</template> 

<script>
//API
import { axios } from "/axios.js";
import moment from "moment";

//Components
//import VueTabsChrome from "vue-tabs-chrome";

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
  // DxLookup,
  // DxRequiredRule,
  // DxFormItem,
  // DxForm
} from "devextreme-vue/data-grid";

//Structures

export default {
  name: "inspection-record",
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
    // DxAddRowButton,
    // DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    DxSelectBox,
    DxTextBox,
    DxDateBox,
    DxTextArea
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "FAILURE REPORT",
      subpageInnerName: null,
    });
    this.FETCH_DROPDOWN_FAILURE_IMPACT();
    this.FETCH_DROPDOWN_DISCIPLINE();
    this.FETCH_DROPDOWN_PLATFORM_LIST();
  },
  data() {
    return {
      formSelect: {
        platform: [],
        failureImpact: [],
        discipline: [],
      },
      failureRecordList: {
        id: 0,
        is_active: true,
        tag_no: null,
        id_platform: null,
        equipment_type: null,
        unit: null,
        drawing_no: null,
        id_failure_impact: null,
        id_discipline: null,
        findings_date: null,
        health_and_safety: null,
        production_loss: null,
        material_cost: null,
        environment_impact: null,
        remark: null,
        findings: null,
        mitigation: null,
      },
      dataGridAttributes: {
        class: "data-grid-style"
      },
    };
  },
  computed: {},
  methods: {
    CREATE_RECORD(e) {
      if (this.failureRecordList.findings_date)
        this.failureRecordList.findings_date = moment(this.failureRecordList.findings_date).format("L");
      console.log(e.data);
      axios({
        method: "post",
        url: "/FailureRecord",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: this.failureRecordList
      })
        .then(res => {
          if (res.status == 201) {
            this.SET_CURRENT_VIEW(2, res.data);
          }
        })
        .catch(error => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
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
  height: calc(100% - 210px);
  grid-row: span 2;
}

.table-wrapper {
  display: grid;
  grid-template-columns: 48% 48%;
  gap: 15px;
  margin-bottom: 50px !important;
  *[fill] {
    grid-column: span 2;
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
  button {
    padding: 10px 0;
        background-color: white;
        border: solid 1px gray;
        border-radius: 10px;
        font-weight: 600;
        font-size: 14px;
        transition: 1s;
        cursor: pointer;
  }
  .create {
    color: white;
    background-color: $web-theme-color-secondary;
    border: solid 1px $web-theme-color-secondary;
  }
}
</style>