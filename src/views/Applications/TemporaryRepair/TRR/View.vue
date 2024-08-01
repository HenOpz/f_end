<template>
  <div class="page-container">
    <div class="page-section">
      <div class="table-wrapper">
        <DxDataGrid
          id="data-grid-list"
          key-expr="id"
          :data-source="testList"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          :column-auto-width="true"
          @init-new-row="SET_CURRENT_VIEW(1)"
          @editing-start="SET_CURRENT_VIEW(2)"
        >
          <DxEditing
            :allow-updating="false"
            :allow-deleting="false"
            :allow-adding="true"
            :use-icons="true"
            mode="popup"
          />
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />
          <DxSelection mode="single" />
          <DxColumn data-field="temporary_number" caption="TTR No." :width="110" alignment="center" />
          <DxColumn data-field="platform" caption="Platform" :width="110" alignment="center" />
          <DxColumn data-field="asset_type" caption="Asset Type" :width="110" alignment="center" />
          <DxColumn data-field="tag_number" caption="Tag Number" :width="120" alignment="center" />
          <DxColumn data-field="moc_number" caption="MOC Number" :width="120" alignment="center" />
          <DxColumn data-field="repair_code" caption="Repair Code" :width="120" alignment="center" />
          <DxColumn data-field="due_date" caption="Due Date" :width="100" alignment="center" />
          <DxColumn data-field="repair_status" caption="Repair Status" :width="100" alignment="center" />
          <DxColumn data-field="severity" caption="Severity" :width="110" alignment="center" />
          <DxColumn data-field="description" caption="Description" :min-width="100" alignment="center" />
          <DxColumn :width="80" alignment="center" cell-template="action-cell-template" />

          <template #action-cell-template="{  }">
            <div class="action-wrapper">
              <div @click="SET_CURRENT_VIEW(2, 1)">
                <img src="/img/svg/pen-svg.svg" class="penSvg" />
              </div>
              <div>
                <img src="/img/svg/trash-svg.svg" class="trashSvg" />
              </div>
            </div>
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
            :show-info="false"
            info-text="Page {0} of {1} ({2} items)"
          />
          <DxExport :enabled="false" />
        </DxDataGrid>
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
// import penSvg from "@/components/svg/pen-svg.vue"
// import trashSvg from "@/components/svg/trash-svg.vue"

//DataGrid
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
// import DxAddRowButton from "devextreme-vue/button";
// import { DxItem } from "devextreme-vue/form";
import {
  DxDataGrid,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  DxExport,
  // DxToolbar,
  DxHeaderFilter,
  DxSelection,
  DxEditing,
  DxFilterRow,
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
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    // DxToolbar,
    DxHeaderFilter,
    DxSelection,
    // DxForm,
    // DxItem,
    DxEditing,
    DxFilterRow,
    // DxButton,
    // DxAddRowButton,
    // DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    // penSvg,
    // trashSvg
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "TEMPORARY REPAIR RECORD",
      subpageInnerName: null,
    });
    if (this.$store.state.status.server == true) {
      this.testList = [
        {
          id: 1,
          id_item: 1,
          temporary_number: 'TEMP-23010',
          platform: 'MDPP',
          asset_type: 'Piping',
          tag_number: '2-GC-J4N-1002',
          moc_number: 'MOC OFF_23-024',
          repair_code: 'Welding Patch',
          due_date: '01 Feb 2024',
          repair_status: 'Pending',
          severity: 'P3',
          description: '-'
        },
        {
          id: 2,
          id_item: 2,
          temporary_number: 'TEMP-23009',
          platform: 'MDPP',
          asset_type: 'Flowline',
          tag_number: 'MDPP-03',
          moc_number: 'MOC OFF_23-023',
          repair_code: 'Other',
          due_date: '01 Jan 2024',
          repair_status: 'Pending',
          severity: 'P4',
          description: '-'
        },
        {
          id: 3,
          id_item: 3,
          temporary_number: 'TEMP-23008',
          platform: 'MDPP',
          asset_type: 'Pressure Vessel',
          tag_number: 'V-01111',
          moc_number: 'MOC OFF_23-018',
          repair_code: 'Other',
          due_date: '01 Dec 2023',
          repair_status: 'Completed',
          severity: 'P3',
          description: '-'
        },
        {
          id: 4,
          id_item: 4,
          temporary_number: 'TEMP-23007',
          platform: 'MDPP',
          asset_type: 'Flare',
          tag_number: '-',
          moc_number: 'MOC OFF_23-027',
          repair_code: 'Other',
          due_date: '01 Jan 2025',
          repair_status: 'Pending',
          severity: 'P3',
          description: '-'
        },
      ];
      // this.FETCH_INSP_RECORD();
    }
  },
  data() {
    return {
      testList: null,
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
  overflow-y: hidden;
}

.page-section {
  padding: 20px;
  overflow-y: auto;
  grid-row: span 2;
}

.page-section:last-child {
  padding-bottom: 20px;
}
</style>