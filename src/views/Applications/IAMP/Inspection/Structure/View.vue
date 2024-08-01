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
        >
          <DxEditing
            :allow-updating="false"
            :allow-deleting="false"
            :allow-adding="false"
            :use-icons="true"
            mode="popup"
          />
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />
          <DxSelection mode="single" />
          <DxColumn data-field="id_item" caption="Item" :min-width="70" alignment="center" />
          <DxColumn data-field="platform" caption="Platform" :min-width="90" alignment="center" />
          <DxColumn data-field="tag_no" caption="Tag No." :min-width="200" alignment="center" />
          <DxColumn data-field="risk_ranking" caption="Risk Ranking" :min-width="80" alignment="center" />
          <DxColumn data-field="integrity_status" caption="Integrity Status" :min-width="90" alignment="center" />
          <DxColumn data-field="inspection_type" caption="Inspection Type" :min-width="90" alignment="center" />
          <DxColumn data-field="last_inspection_date" caption="Last Inspection Date" :min-width="90" alignment="center" />
          <DxColumn data-field="due_inspection_date" caption="Due Inspection Date" :min-width="80" alignment="center" />
          <DxColumn data-field="inspection_work_order" caption="Inspection Work Order" :min-width="80" alignment="center" />
          <DxColumn alignment="center" cell-template="action-cell-template" />

          <template #action-cell-template="{ data }">
              <div class="action-wrapper">
                <div @click="SET_CURRENT_VIEW(1, data.data.fieldData)">
                  <img src="/img/svg/list-check-svg.svg" class="list-check" />
                </div>
              </div>
          </template>
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
// import listCheckSvg from "@/components/svg/list-check-svg.vue"

//DataGrid
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
// import DXButton from "devextreme-vue/button";
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
    // DXButton,
    // DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    // listCheckSvg
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "INSPECTION DUE ROTATING",
      subpageInnerName: null,
    });
    if (this.$store.state.status.server == true) {
      this.testList = [
        {
          id: 1,
          id_item: 1,
          platform: 'MDPP',
          tag_no: '0.5-AI-B2-5092',
          risk_ranking: 'LOW',
          integrity_status: 'P6',
          inspection_type: 'NDE',
          last_inspection_date: '2020',
          due_inspection_date: '2024',
          inspection_work_order: '-'
        },
        {
          id: 2,
          id_item: 2,
          platform: 'MDPP',
          tag_no: '0.5-AI-B2-5092',
          risk_ranking: 'LOW',
          integrity_status: 'P6',
          inspection_type: 'VT',
          last_inspection_date: '2020',
          due_inspection_date: '2024',
          inspection_work_order: '-'
        },
        {
          id: 3,
          id_item: 3,
          platform: 'MDPP',
          tag_no: '0.5-OW-BS1-7892',
          risk_ranking: 'LOW',
          integrity_status: 'P6',
          inspection_type: 'NDE',
          last_inspection_date: '2020',
          due_inspection_date: '2024',
          inspection_work_order: '-'
        },
        {
          id: 4,
          id_item: 4,
          platform: 'MDPP',
          tag_no: '0.5-OW-BS1-7892',
          risk_ranking: 'LOW',
          integrity_status: 'P6',
          inspection_type: 'VT',
          last_inspection_date: '2020',
          due_inspection_date: '2024',
          inspection_work_order: '-'
        },
        {
          id: 5,
          id_item: 5,
          platform: 'MDPP',
          tag_no: '0.5-OW-C4N-7959',
          risk_ranking: 'LOW',
          integrity_status: 'P6',
          inspection_type: 'NDE',
          last_inspection_date: '2020',
          due_inspection_date: '2024',
          inspection_work_order: '-'
        },
        {
          id: 6,
          id_item: 6,
          platform: 'MDPP',
          tag_no: '0.5-OW-C4N-7959',
          risk_ranking: 'LOW',
          integrity_status: 'P6',
          inspection_type: 'VT',
          last_inspection_date: '2020',
          due_inspection_date: '2024',
          inspection_work_order: '-'
        },
        {
          id: 7,
          id_item: 7,
          platform: 'MDPP',
          tag_no: '0.5-OU-A2-5058',
          risk_ranking: 'LOW',
          integrity_status: 'P5',
          inspection_type: 'NDE',
          last_inspection_date: '2020',
          due_inspection_date: '2024',
          inspection_work_order: '-'
        },
        {
          id: 8,
          id_item: 8,
          platform: 'MDPP',
          tag_no: '0.5-OU-A2-5058',
          risk_ranking: 'LOW',
          integrity_status: 'P5',
          inspection_type: 'VT',
          last_inspection_date: '2020',
          due_inspection_date: '2024',
          inspection_work_order: '-'
        },
        {
          id: 9,
          id_item: 9,
          platform: 'MDPP',
          tag_no: '0.5-CR-B2-4306',
          risk_ranking: 'LOW',
          integrity_status: 'P4',
          inspection_type: 'NDE',
          last_inspection_date: '2020',
          due_inspection_date: '2024',
          inspection_work_order: '-'
        },
        {
          id: 10,
          id_item: 10,
          platform: 'MDPP',
          tag_no: '0.5-CR-B2-4306',
          risk_ranking: 'LOW',
          integrity_status: 'P4',
          inspection_type: 'VT',
          last_inspection_date: '2020',
          due_inspection_date: '2024',
          inspection_work_order: '-'
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

.table-wrapper {
    margin-bottom: 200px;
}
</style>