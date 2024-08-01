<template>
  <div class="page-container">
    <div class="action-bar">
      <button class="back" @click="SET_CURRENT_VIEW(0)">
          <i class="fas fa-chevron-left"></i>BACK
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
        <button class="submit" @click="UPDATE_RECORD">
            <i class="fas fa-save"></i> SUBMIT
        </button>
        <button class="delete" @click="DELETE_RECORD">
            <i class="fas fa-trash-alt"></i>   DELETE
        </button>
      </div>
    </div>
    <div class="page-section">
      <div class="table-wrapper">
        <!-- <h3 style="grid-column: span 2">Edit Failure Report</h3> -->

        <div class="input-wrapper" span-3>
          <div class="title-wrapper">
            <span>Date</span>
            <span>*</span>
          </div>
          <div class="select">
            <DxDateBox
              type="date"
              v-model="cmManagementList.report_date"
              :disabled="!btn_state"
              placeholder="Select Date"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <div class="title-wrapper">
            <span>Opened</span>
            <span>*</span>
          </div>
          <div class="input">
            <DxTextBox
              placeholder="Enter Opened"
              v-model="cmManagementList.tag_number"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <div class="title-wrapper">
            <span>Closed</span>
            <span>*</span>
          </div>
          <div class="input">
            <DxTextBox
              placeholder="Enter Closed"
              v-model="cmManagementList.tag_number"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <div class="title-wrapper">
            <span>Total</span>
            <span>*</span>
          </div>
          <div class="input">
            <DxTextBox
              placeholder="Enter Total"
              v-model="cmManagementList.tag_number"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-6>
          <span>Note</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Note"
              v-model="cmManagementList.contractor"
              :disabled="!btn_state"
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

//DataGrid
import "devextreme/dist/css/dx.light.css";
// import { Workbook } from "exceljs";
// import saveAs from "file-saver";
// import trashSvg from "@/components/svg/trash-svg.vue"
// import { exportDataGrid } from "devextreme/excel_exporter";
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
    // DxAddRowButton,
    // DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    // DxSelectBox,
    DxTextBox,
    DxDateBox,
    // DxTextArea,
    // DxToolbar,
    // DxItem,
    // trashSvg
  },
  created() {
    if (this.$store.state.status.server == true) {
      this.FETCH_DROPDOWN_ASSET();
      this.FETCH_DROPDOWN_PLATFORM();
      this.FETCH_HIGHLIGHT_RECORD();
    }
  },
  data() {
    return {
      cmManagementList: {},
      btn_state: false,
      formSelect: {
        asset: [],
        platform: [],
      },
    };
  },
  computed: {},
  methods: {
    FETCH_CM_WO_MANAGEMENT_RECORD() {
      GET_DATA(this, `/HighlightActivities/${this.id_record}`, (data) => {
        this.cmManagementList = data;
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
          subpageName: "HA NUMBER : " + this.cmManagementList.ha_number,
          subpageInnerName: null,
        });
      });
    },
    UPDATE_RECORD() {
      if (this.cmManagementList.id_platform === null || 
          this.cmManagementList.id_asset === null || 
          this.cmManagementList.id_tag === null || 
          this.cmManagementList.report_date === null) 
          return;
      this.cmManagementList.report_date = moment(this.cmManagementList.report_date).format("L");
      PUT_DATA(`/HighlightActivities/${this.cmManagementList.id}`, this.cmManagementList, () => { this.SET_CURRENT_VIEW(0); });
    },
    DELETE_RECORD() {
      DELETE_DATA(`/HighlightActivities/delete-highlight-activities?id=${this.cmManagementList.id}`, () => { this.SET_CURRENT_VIEW(0); });
    },
    FETCH_DROPDOWN_ASSET() {
      GET_DATA(this, '/Md/get-md-asset-type-list', 'formSelect.asset');
    },
    FETCH_DROPDOWN_PLATFORM() {
      GET_DATA(this, '/Md/get-md-platform-list', 'formSelect.platform');
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
}

.dx-state-disabled.dx-widget {
    opacity: 1;
}
</style>