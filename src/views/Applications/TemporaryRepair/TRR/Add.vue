<template>
  <div class="page-container">
    <div class="page-section">
      <div class="table-wrapper">
        <h3 style="grid-column: span 2">New Temporary Repair</h3>

        <div class="input-wrapper">
          <span>Platform</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.platform"
              value-expr="id"
              display-expr="code_name"
              placeholder="Select Platform"
              v-model="trrRecordList.platform"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Asset Type</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.assetType"
              value-expr="id"
              display-expr="asset_type"
              placeholder="Select Asset Type"
              v-model="trrRecordList.asset_type"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Tag Number</span>
          <div class="select">
            <DxSelectBox
              :items="testList"
              value-expr="id"
              display-expr="code_name"
              placeholder="Select Tag Number"
              v-model="trrRecordList.tag_number"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>MOC Number</span>
          <div class="select">
            <DxSelectBox
              :items="testList"
              value-expr="id"
              display-expr="code_name"
              placeholder="Select MOC Number"
              v-model="trrRecordList.moc_number"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Repair Code</span>
          <div class="input">
            <DxSelectBox
              :items="testList"
              value-expr="id"
              display-expr="code_name"
              placeholder="Select Repair Code"
              v-model="trrRecordList.repair_code"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Due Date</span>
          <div class="select">
            <DxDateBox
              type="date"
              placeholder="Select Due Date"
              v-model="trrRecordList.due_date"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Severity</span>
          <div class="input">
            <DxSelectBox
              :items="testList"
              value-expr="id"
              display-expr="code_name"
              placeholder="Select Severity"
              v-model="trrRecordList.severity"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Repair Status</span>
          <div class="input">
            <DxSelectBox
              :items="testList"
              value-expr="id"
              display-expr="code_name"
              placeholder="Select Repair Status"
              v-model="trrRecordList.repair_status"
            />
          </div>
        </div>

        <div class="input-wrapper" fill>
          <span>Details</span>
          <div class="input">
            <DxTextArea
              :height="60"
              :max-length="200"
              :auto-resize-enabled="true"
              placeholder="Enter Details"
              v-model="trrRecordList.details"
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
// import DxTextBox from 'devextreme-vue/text-box';
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
    DxDateBox,
    DxTextArea
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "TRR NUMBER: ",
      subpageInnerName: null,
    });
    this.FETCH_PLATFORM_LIST();
    this.FETCH_ASSET_TYPE_LIST();
  },
  data() {
    return {
      testList: [],
      trrRecordList: {
        platform: null,
        asset_type: null,
        tag_number: null,
        moc_number: null,
        repair_code: null,
        due_date: null,
        severity: null,
        repair_status: null,
        details: null,
      },
      campaigeList: {},
      dataGridAttributes: {
        class: "data-grid-style"
      },
      formSelect: {
        platform: null,
        assetType: null
      }
    };
  },
  computed: {},
  methods: {
    CREATE_RECORD(e) {
      e.data.id_line = this.$route.params.id_tag;
      e.data.id = 0;
      e.data.is_active = true;
      e.data.inspection_date = moment(e.data.inspection_date).format("L");
      console.log(e.data);
      axios({
        method: "post",
        url: "/PipingInspectionRecord",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          if (res.status == 201) {
            console.log("create success");
            this.FETCH_INSP_RECORD();
          }
        })
        .catch(error => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
    SET_CURRENT_VIEW(view, data = null) {
        this.$store.commit("SET_SHOW_BACK_BUTTON", true);
        if (data !== null) this.$emit('currentView', view, data);
        else this.$emit('currentView', view);
    },
    FETCH_PLATFORM_LIST() {
      this.isLoading = true;
      axios({
        method: "get",
        url:
          "/Md/get-md-platform-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
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
    FETCH_ASSET_TYPE_LIST() {
      this.isLoading = true;
      axios({
        method: "get",
        url:
          "/Md/get-md-asset-type-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.assetType = res.data;
            console.log("assetType", this.formSelect.assetType);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
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

  .picture-wrapper {
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

      button {
        width: 100%;
        padding: 10px 0;
        color: white;
      }
      .select {
        background-color: $dexon-primary-green;
      }
      .delete {
        background-color: $dexon-primary-red;
      }
    }
  }
}
</style>