<template>
  <div class="page-container">
    <div class="page-section">
      <div class="table-wrapper">
        <h3 style="grid-column: span 2; margin-bottom: 0; margin-top: 0;">New Corrosion Coupon</h3>

        <div class="input-wrapper">
          <span>Platform</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Platform"
              v-model="mocList.worksite"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Tag Number</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Tag Number"
              v-model="mocList.worksite"
            />
          </div>
        </div>

        <div fill class="input-wrapper">
          <span>Description</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Description"
              v-model="mocList.worksite"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Latest Remove Date</span>
          <div class="select">
            <DxDateBox
              type="date"
              placeholder="Select Latest Remove Date"
              v-model="mocList.start_date"
              display-format="dd MMM yyyy"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Corrosion Rate (mm/y)</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Corrosion Rate"
              v-model="mocList.worksite"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Max Pit Depth (mm)</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Max Pit Depth"
              v-model="mocList.worksite"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Pitting Rate (mm/y)</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Pitting Rate"
              v-model="mocList.worksite"
            />
          </div>
        </div>

        <button class="create" @click="CREATE_RECORD">Create</button>
        <button @click="$emit('popup')">Cancel</button>
      </div>
    </div>
  </div>
</template> 

<script>
//API
import { GET_DATA, POST_DATA } from "/axios.js";
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
// import { DxFileUploader } from 'devextreme-vue/file-uploader';
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
    DxDateBox,
    // DxTextArea,
    DxTextBox,
    // DxFileUploader
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "CORROSION COUPON",
      subpageInnerName: null,
    });
    GET_DATA(this, '/Md/get-md-moc-noc-list', 'formSelect.noc');
    GET_DATA(this, '/Md/get-md-moc-status-list', 'formSelect.status');
    GET_DATA(this, '/Md/get-md-moc-rrl-list', 'formSelect.rrl');
  },
  data() {
    return {
      mocList: {
        id: 0,
        is_active: true,
        moc_number: null,
        title: null,
        id_moc_noc: null,
        worksite: null,
        id_moc_rrl: null,
        start_date: null,
        expiry_date: null,
        id_moc_status: null,
        action: null,
        remark: null,
        initiator: null,
      },
      formSelect: {
        noc: [],
        status: [],
        rrl: [],
      }
    };
  },
  props: {
      system: String,
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
    CREATE_RECORD() {
      console.log("pdf", this.mocList.moc_file_path);
      if (this.mocList.start_date !== null)
        this.mocList.start_date = moment(this.mocList.start_date).format("L");
      if (this.mocList.expiry_date !== null)
        this.mocList.expiry_date = moment(this.mocList.expiry_date).format("L");
      POST_DATA('/ManagementOfChange', this.mocList, () => { this.SET_CURRENT_VIEW(0); });
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
  overflow-y: hidden;
  position: absolute !important;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: #14141484;
}

.page-section {
  width: 900px;
  padding: 20px;
  overflow-y: auto;
  height: auto;
  grid-row: span 2;
  // width: 1;
  position: absolute !important;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff !important;
  border-radius: 10px;
  border: #d9d9d9 1px solid;
}

.table-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
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

  .pdf-wrapper {
    display: grid;
    grid-template-columns: 3;
    gap: 10px;

    *[span-2] {
      grid-column: span 2;
    }
    *[fill] {
      grid-column: span 3;
    }

    span {
      font-size: 16px;
    }
    img {
      width: 100%;
    }
    .button-wrapper {
      display: flex;
      flex-direction: column;
      gap: 10px;

      button, select {
        width: 100%;
        padding: 10px 0;
        color: white;
      }
      .select {
        background-color: $dexon-primary-green !important;
      }
      .delete {
        background-color: $dexon-primary-red;
      }
    }
  }
}
</style>