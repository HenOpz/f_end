<template>
  <div class="page-container">
    <div class="page-section">
      <div class="table-wrapper">
        <h3 style="grid-column: span 2">New Inspection Task</h3>

        <div class="input-wrapper">
          <span>Tag Number</span>
          <div class="input">
            <DxTextBox
              placeholder="0.5-AI-B2-5092"
              disabled="true"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Inspection Type</span>
          <div class="input">
            <DxTextBox
              placeholder="NDE"
              disabled="true"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Due Inspection Date</span>
          <div class="input">
            <DxTextBox
              placeholder="2024"
              disabled="true"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <div class="title-wrapper">
            <span>Inspection Date</span>
            <span>*</span>
          </div>
          <div class="select">
            <DxDateBox
              type="date"
              placeholder="Select Inspection Date"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <div class="title-wrapper">
            <span>Plan Manhours</span>
            <span>*</span>
          </div>
          <div class="input">
            <DxTextBox
              placeholder="Enter Manhours"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Note</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Note"
            />
          </div>
        </div>
        
        <button class="create" @click="SET_CURRENT_VIEW(0)">Create</button>
        <button @click="SET_CURRENT_VIEW(0)">Cancel</button>

        <br>
      </div>
    </div>
  </div>
</template> 

<script>
//API
import { GET_DATA, POST_DATA, PUT_DATA, DELETE_DATA } from "/axios.js";
import moment from "moment";

//Components
//import VueTabsChrome from "vue-tabs-chrome";

//DataGrid
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
// import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';
import DxDateBox from 'devextreme-vue/date-box';
// import DxTextArea from 'devextreme-vue/text-area';
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
    // DxSelectBox,
    DxTextBox,
    DxDateBox,
    // DxTextArea
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "FAILURE REPORT",
      subpageInnerName: null,
    });
  },
  data() {
    return {
      testList: [],
      inspRecordList: {},
      campaigeList: {},
      dataGridAttributes: {
        class: "data-grid-style"
      },
      inspDateInputOptions: { placeholder: "Select date" },
      projectNoInputOptions: { placeholder: "Enter project no" },
      reportNoInputOptions: { placeholder: "Enter report no" },
      remarkInputOptions: { placeholder: "Enter remark" }
    };
  },
  computed: {},
  methods: {
    EXPORT_DATA(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Projects");
      exportDataGrid({
        worksheet: worksheet,
        component: e.component
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "inspection_record.xlsx"
          );
        });
      });
      e.cancel = true;
    },
    FETCH_INSP_RECORD() {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      GET_DATA(this, `/PipingInspectionRecord/get-piping-ir-by-id-line?id_line=${id_tag}`, 'inspRecordList');
    },
    CREATE_RECORD(e) {
      e.data.id_line = this.$route.params.id_tag;
      e.data.id = 0;
      e.data.is_active = true;
      e.data.inspection_date = moment(e.data.inspection_date).format("L");
      console.log(e.data);
      POST_DATA('/PipingInspectionRecord', e.data, () => { this.FETCH_INSP_RECORD(); });
    },
    UPDATE_RECORD(e) {
      e.data.inspection_date = moment(e.data.inspection_date).format("L");
      console.log(e.data);
      PUT_DATA(`/PipingInspectionRecord/${e.key}`, e.data, () => { this.FETCH_INSP_RECORD(); });
    },
    DELETE_RECORD(e) {
      DELETE_DATA(`/PipingInspectionRecord/${e.key}`, () => { this.FETCH_INSP_RECORD(); });
    },
    SET_CURRENT_VIEW(view, data = null) {
        this.$store.commit("SET_SHOW_BACK_BUTTON", false);
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
      font-size: 16px;
    }
    .title-wrapper {
      display: flex;
      align-items: center;
      gap: 5px;

      span:last-child {
        color: red;
      }
    }
  }
  button {
    padding: 20px 0;
    background-color: white;
    border: solid 1px gray;
    border-radius: 10px;
    font-weight: 800;
    font-size: 16px;
    transition: 1s;
    cursor: pointer;
  }
  .create {
    color: white;
    background-color: $web-theme-color-secondary;
  }
}
</style>