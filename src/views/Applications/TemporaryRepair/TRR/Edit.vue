<template>
  <div class="page-container">
    <div class="action-bar">
      <button class="back" @click="SET_CURRENT_VIEW(0)">
          <i class="fas fa-chevron-left"></i> BACK
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

      <button @click="UPDATE_RECORD" class="submit">
          <i class="fas fa-save"></i> SUBMIT
      </button>
      <button @click="SET_CURRENT_VIEW(0)" class="delete">
          <i class="fas fa-trash-alt"></i> DELETE
      </button>
      </div>
    </div>
    <div class="page-section">
      <div class="table-wrapper">
        <div span-2 class="input-wrapper">
          <span>Platform</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.platform"
              value-expr="id"
              display-expr="code_name"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div span-2 class="input-wrapper">
          <span>Asset Type</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.assetType"
              value-expr="id"
              display-expr="asset_type"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div span-2 class="input-wrapper">
          <span>Tag Number</span>
          <div class="select">
            <DxSelectBox
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div span-2 class="input-wrapper">
          <span>MOC Number</span>
          <div class="select">
            <DxSelectBox
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div span-2 class="input-wrapper">
          <span>Repair Code</span>
          <div class="select">
            <DxSelectBox
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div span-2 class="input-wrapper">
          <span>Due Date</span>
          <div class="input">
            <DxDateBox
              type="date"
              value="2/15/2024"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div span-2 class="input-wrapper">
          <span>Severity</span>
          <div class="select">
            <DxSelectBox
              :disabled="!btn_state"
            />
          </div>
        </div>
        <div span-2 class="input-wrapper">
          <span>Repair Status</span>
          <div class="select">
            <DxSelectBox
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div span-2 class="input-wrapper">
          <span>MOC File</span>
          <div class="input">
            <DxTextBox
              value="Download FIle"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div span-4 class="input-wrapper">
          <span>Details</span>
          <div class="input">
            <DxTextArea
              :height="120"
              :max-length="200"
              :auto-resize-enabled="true"
              value="-"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div span-2 />

        <br>
      </div>
    </div>
  </div>
</template> 

<script>
//API
import { GET_DATA, PUT_DATA, POST_DATA, DELETE_DATA } from "/axios.js";
import moment from "moment";

//Components
//import VueTabsChrome from "vue-tabs-chrome";
// import trashSvg from "@/components/svg/trash-svg.vue"
//
//DataGrid
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
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
      subpageName: "TTR NUMBER: ",
      subpageInnerName: null,
    });
    this.testList1 = [
        {
          id: 1,
          id_item: 1,
          st_action_detail: 'Change the delay time to 0sec for the transfer in case of MCC fail or MLO low pres',
          action_date: '20 May 2024',
          disc: 'INST',
          status: 'Ongoing',
          remark: '-'
        },
        {
          id: 2,
          id_item: 2,
          st_action_detail: 'Revise the setpoint to higher value for earlier transfer',
          action_date: '1 Jun 2024',
          disc: 'INST',
          status: 'Done',
          remark: '-'
        },
        {
          id: 3,
          id_item: 3,
          st_action_detail: 'Check on the pump performance and oil quality',
          action_date: '1 Jan 2025',
          disc: 'INST',
          status: 'Ongoing',
          remark: '-'
        },
      ];
      this.testList2 = [
        {
          id: 1,
          id_item: 1,
          st_action_detail: 'Conduct study on the MLO pressure profile include check on internal leak',
          action_date: '31 Dec 2028',
          disc: 'INST',
          status: 'Ongoing',
          remark: '-'
        },
        {
          id: 2,
          id_item: 2,
          st_action_detail: 'Upgrade to pressure membrane type level transmitter',
          action_date: '31 Dec 2029',
          disc: 'INST',
          status: 'Done',
          remark: '-'
        },
      ];
    this.FETCH_PLATFORM_LIST();
    this.FETCH_ASSET_TYPE_LIST();
  },
  data() {
    return {
      testList1: [],
      testList2: [],
      inspRecordList: {},
      campaigeList: {},
      dataGridAttributes: {
        class: "data-grid-style"
      },
      btn_state: false,
      formSelect: {
        platform: null,
        assetType: null
      }
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
        this.$store.commit("SET_SHOW_BACK_BUTTON", true);
        if (data !== null) this.$emit('currentView', view, data);
        else this.$emit('currentView', view);
    },
    FETCH_PLATFORM_LIST() {
      GET_DATA(this, '/Md/get-md-platform-list', 'formSelect.platform');
    },
    FETCH_ASSET_TYPE_LIST() {
      GET_DATA(this, '/Md/get-md-asset-type-list', 'formSelect.assetType');
    },
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
      font-size: 16px;
    }
  }
  .picture-wrapper {
    span {
      font-size: 16px;
    }
    img {
      width: 100%;
    }
  }
}
</style>