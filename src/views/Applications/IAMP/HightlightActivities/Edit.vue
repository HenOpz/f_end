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
            <span>Report Date</span>
            <span>*</span>
          </div>
          <div class="select">
            <DxDateBox
              type="date"
              v-model="highlightActivitiesList.report_date"
              :disabled="!btn_state"
              display-format="dd MMM yyyy"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
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
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <div class="title-wrapper">
            <span>Asset Type</span>
            <span>*</span>
          </div>
          <div class="select">
            <DxSelectBox
              :items="formSelect.asset"
              value-expr="id"
              display-expr="asset_type"
              placeholder="Asset Type"
              v-model="highlightActivitiesList.id_asset"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>Tag Number</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Tag Number"
              v-model="highlightActivitiesList.tag_number"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>Contractor</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Contractor"
              v-model="highlightActivitiesList.contractor"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-3>
          <span>PIC</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter PIC"
              v-model="highlightActivitiesList.person_in_charge"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-6>
          <span>Activities</span>
          <div class="input">
            <DxTextBox
              v-model="highlightActivitiesList.activities"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper" span-6>
          <span>Details</span>
          <div fill class="html-editor">
            <DxHtmlEditor
              height="600" 
              v-model="highlightActivitiesList.details"
              :read-only="!btn_state"
            >
              <DxMediaResizing :enabled="true" />
              <DxToolbar :multiline="true">
                <DxItem name="undo" />
                <DxItem name="redo" />
                <DxItem
                  name="header"
                  :accepted-values="headerValues"
                  :options="headerOptions"
                />
                <DxItem
                  name="size"
                  :accepted-values="sizeValues"
                  :options="fontSizeOptions"
                />
                <DxItem name="bold" />
                <DxItem name="italic" />
                <DxItem name="underline" />
                <DxItem name="strike" />
                <DxItem name="bulletList" />
                <DxItem name="orderedList" />
                <DxItem name="image" />
                <DxItem name="alignLeft" />
                <DxItem name="alignCenter" />
                <DxItem name="alignRight" />
                <DxItem name="alignJustify" />
                <DxItem name="insertTable" />
                <DxItem name="deleteTable" />
                <DxItem name="insertRowAbove" />
                <DxItem name="insertRowBelow" />
                <DxItem name="deleteRow" />
                <DxItem name="insertColumnLeft" />
                <DxItem name="insertColumnRight" />
                <DxItem name="deleteColumn" />
              </DxToolbar>
            </DxHtmlEditor>
          </div>
        </div>

        <!-- <button class="create" @click="UPDATE_RECORD" span-3>Save</button> -->
        <!-- <button @click="$emit('currentView', 0)" span-3>Cancel</button> -->

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
// import trashSvg from "@/components/svg/trash-svg.vue"
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
    DxSelectBox,
    DxTextBox,
    DxDateBox,
    // DxTextArea,
    DxHtmlEditor,
    DxToolbar,
    DxMediaResizing,
    DxItem,
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
      highlightActivitiesList: {},
      btn_state: false,
      editorValue: `<p>Detect sign of sand erosion on flowline of MDA-05. Nominal thickness: 8.56 mm.</p><ul><li>Reading thickness: 4.79 mm (Accepted)</li><li>Minimum required thickness: 3.53 mm @ design pressure 131 barg</li><li>Recommend to shut-in the well (3.5 mmscfd) and replace with Target Tee to prevent sand erosion.</li></ul><p><br></p><p style="text-align: center;"><img src="/img/banner.png" width="393.953" height="196"></p>`,
      formSelect: {
        asset: [],
        platform: [],
      },
      headerValues: [false, 1, 2, 3, 4, 5],
      headerOptions: { inputAttr: { 'aria-label': 'Header' } },
      fontSizeOptions: { inputAttr: { 'aria-label': 'Font size' } },
      sizeValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
    };
  },
  computed: {},
  methods: {
    FETCH_HIGHLIGHT_RECORD() {
      this.isLoading = true;
      axios({
        method: "get",
        url:
          "/HighlightActivities/" + this.id_record,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.highlightActivitiesList = res.data;
            this.$store.commit("UPDATE_CURRENT_PAGENAME", {
              subpageName: "HA NUMBER : " + this.highlightActivitiesList.ha_number,
              subpageInnerName: null,
            });
            console.log("highlightActivitiesList", this.highlightActivitiesList);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_RECORD() {
      if (this.highlightActivitiesList.id_platform === null || 
          this.highlightActivitiesList.id_asset === null || 
          this.highlightActivitiesList.id_tag === null || 
          this.highlightActivitiesList.report_date === null) 
          return;
      this.highlightActivitiesList.report_date = moment(this.highlightActivitiesList.report_date).format("L");
      axios({
        method: "put",
        url: "/HighlightActivities/" + this.highlightActivitiesList.id,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: this.highlightActivitiesList
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
        .finally(() => {});
    },
    DELETE_RECORD() {
      axios({
        method: "delete",
        url: "/HighlightActivities/delete-highlight-activities?id=" + this.highlightActivitiesList.id,
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
    FETCH_DROPDOWN_ASSET() {
      axios({
        method: "get",
        url: "/Md/get-md-asset-type-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.asset = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_DROPDOWN_PLATFORM() {
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
        .title-wrapper {
          display: flex;
          align-items: center;
          gap: 5px;

          span:last-child {
            color: red;
          }
        }
  }
}

.dx-state-disabled.dx-widget {
    opacity: 1;
}
</style>