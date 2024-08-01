<template>
  <div class="page-container">
    <div class="page-section">
      <div class="table-wrapper">
        <h3 style="grid-column: span 2; margin-bottom: 0; margin-top: 0;">New Highlight Activity</h3>

        <div class="input-wrapper">
          <div class="title-wrapper">
            <span>Report Date</span>
            <span>*</span>
          </div>
          <div class="select">
            <DxDateBox
              type="date"
              v-model="highlightActivitiesList.report_date"
              placeholder="Select Report Date"
              display-format="dd MMM yyyy"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <div class="title-wrapper">
            <span>Platform</span>
            <span>*</span>
          </div>
          <div class="select">
            <DxSelectBox
              :items="formSelect.platform"
              value-expr="id"
              display-expr="code_name"
              placeholder="Select Platform"
              v-model="highlightActivitiesList.id_platform"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <div class="title-wrapper">
            <span>Asset Type</span>
            <span>*</span>
          </div>
          <div class="select">
            <DxSelectBox
              :items="formSelect.asset"
              value-expr="id"
              display-expr="asset_type"
              placeholder="Select Asset Type"
              v-model="highlightActivitiesList.id_asset"
            />
          </div>
        </div>

        <!-- <div class="input-wrapper">
          <div class="title-wrapper">
            <span>Tag Number</span>
            <span>*</span>
          </div>
          <div class="select">
            <DxSelectBox
              :items="testList"
              value-expr="id"
              display-expr="code"
              placeholder="Select Tag Number"
              v-model="highlightActivitiesList.id_tag"
            />
          </div>
        </div> -->

        <div class="input-wrapper">
          <span>Tag Number</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Tag Number"
              v-model="highlightActivitiesList.tag_number"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Contractor</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Contractor"
              v-model="highlightActivitiesList.contractor"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>PIC</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter PIC"
              v-model="highlightActivitiesList.person_in_charge"
            />
          </div>
        </div>

        <div class="input-wrapper" fill>
          <span>Activities</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Activities"
              v-model="highlightActivitiesList.activities"
            />
          </div>
        </div>

        <div class="input-wrapper" fill>
          <span>Details</span>
          <div fill class="html-editor">
            <DxHtmlEditor height="600" v-model="highlightActivitiesList.details">
              <DxMediaResizing :enabled="true" />
              <DxToolbar :multiline="true">
                <DxItem name="undo" />
                <DxItem name="redo" />
                <DxItem
                  name="header"
                  :accepted-values="headerValues"
                  :options="headerOptions"
                />
                <DxItem name="bold" />
                <DxItem name="italic" />
                <DxItem name="underline" />
                <DxItem name="strike" />
                <DxItem name="bulletList" />
                <DxItem name="orderedList" />
                <DxItem name="alignLeft" />
                <DxItem name="alignCenter" />
                <DxItem name="alignRight" />
                <DxItem name="alignJustify" />
              </DxToolbar>
            </DxHtmlEditor>
          </div>
        </div>

        <div>
          picture
        </div>
        <div>
          picture
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
import { GET_DATA, POST_DATA } from "/axios.js";
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
// import DxTextArea from 'devextreme-vue/text-area';
// import DxAddRowButton from "devextreme-vue/button";
// import { DxItem } from "devextreme-vue/form";
import {
  DxHtmlEditor,
  DxToolbar,
  DxMediaResizing,
  //DxImageUpload,
  DxItem
} from "devextreme-vue/html-editor";

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
    // DxTextArea,
    DxHtmlEditor,
    DxToolbar,
    DxMediaResizing,
    DxItem
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "HIGHLIGHT ACTIVITY",
      subpageInnerName: null,
    });
    this.FETCH_DROPDOWN_ASSET();
    this.FETCH_DROPDOWN_PLATFORM();
  },
  data() {
    return {
      highlightActivitiesList: {
        activities: null,
        details: null,
        id: 0,
        id_asset: null,
        id_platform: null,
        id_tag: 1,
        report_date: null,
        is_active: true,
        tag_number: null,
      },
      editorValue: null,
      formSelect: {
        asset: [],
        platform: [],
      },
      headerValues: [false, 1, 2, 3, 4, 5],
      headerOptions: { inputAttr: { 'aria-label': 'Header' } },
    };
  },
  computed: {},
  methods: {
    FETCH_INSP_RECORD() {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      GET_DATA(this, `/PipingInspectionRecord/get-piping-ir-by-id-line?id_line=${id_tag}`, 'inspRecordList');
    },
    CREATE_RECORD() {
      if (this.highlightActivitiesList.id_platform === null || 
          this.highlightActivitiesList.id_asset === null || 
          this.highlightActivitiesList.id_tag === null || 
          this.highlightActivitiesList.report_date === null) 
          return;
      this.highlightActivitiesList.report_date = moment(this.highlightActivitiesList.report_date).format("L");
      POST_DATA('/HighlightActivities', this.highlightActivitiesList, () => { this.SET_CURRENT_VIEW(0); });
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
  }
}
</style>