<template>
  <div class="page-container">
    <div class="page-section">
      <div class="table-wrapper">
        <DxDataGrid
          id="data-grid-list"
          key-expr="id"
          :data-source="failureRecordList"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          :column-auto-width="true"
          @init-new-row="SET_CURRENT_VIEW(1)"
        >
          <DxEditing
            :allow-updating="false"
            :allow-deleting="false"
            :allow-adding="user.failure_seq === 1"
            :use-icons="true"
            mode="popup"
          />
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />
          <DxSelection mode="single" />
          <DxColumn data-field="fl_number" caption="FR No." :width="90" alignment="center" />
          <DxColumn data-field="findings_date" caption="Finding Date" :width="100" alignment="center" data-type="date" format="dd MMM yyyy" />
          <DxColumn data-field="tag_no" caption="Tag No." :width="150" alignment="center" />
          <DxColumn data-field="id_platform" caption="Platform" :width="120" alignment="center">
            <DxLookup :data-source="platform" display-expr="code_name" value-expr="id" />
          </DxColumn>
          <DxColumn data-field="unit" caption="Unit" :min-width="150" alignment="center" />
          <DxColumn data-field="equipment_type" caption="Equipment Type" :min-width="150" alignment="center" />
          <DxColumn data-field="id_discipline" caption="Discipline" :width="100" alignment="center">
            <DxLookup :data-source="disc" display-expr="discipline" value-expr="id" />
          </DxColumn>
          <!-- <DxColumn data-field="rca_status" caption="RCA Status" :width="80" alignment="center" />
          <DxColumn data-field="rca_action_status" caption="RCA Action Status" :width="80" alignment="center" /> -->
          <DxColumn :width="user.failure_seq === 1 ? 120 : 80" alignment="center" cell-template="action-cell-template" />
          <DxMasterDetail
            :enabled="true"
            template="masterDetailTemplate"
          />
          <template #masterDetailTemplate="{ data }">
            <div>
              FR Number: {{ data.data.fl_number }}<br>
              Details:
              <textarea readonly :value="data.data.details" style="width: 100%; min-height: 100px; border: none; font-size: 10px; padding: 5px; margin-top: 5px;"></textarea>
              Findings:
              <textarea readonly :value="data.data.findings" style="width: 100%; min-height: 100px; border: none; font-size: 10px; padding: 5px; margin-top: 5px;"></textarea>
              Mitigation:
              <textarea readonly :value="data.data.mitigation" style="width: 100%; min-height: 100px; border: none; font-size: 10px; padding: 5px; margin-top: 5px;"></textarea>
            </div>
          </template>

          <template #action-cell-template="{ data }">
            <div class="action-wrapper">
              <div @click="SET_CURRENT_VIEW(3,data.data)">
                <img src="/img/svg/pdf-file-svg.svg" class="pdfSvg" />
              </div>
              <div @click="SET_CURRENT_VIEW(2, data.data)">
              <img src="/img/svg/pen-svg.svg" class="penSvg" />
            </div>
            <div v-if="user.failure_seq === 1" @click="DELETE_RECORD(data)">
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
import { GET_DATA, DELETE_DATA } from "/axios.js";
// import moment from "moment";

//Components
// //import VueTabsChrome from "vue-tabs-chrome";
// import pdfSvg from "@/components/svg/pdf-file-svg.vue"
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
  DxLookup,
  // DxRequiredRule,
  // DxFormItem,
  // DxForm,
  DxMasterDetail,
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
    // DxAddRowButton,
    DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    // pdfSvg,
    // penSvg,
    // trashSvg,
    DxMasterDetail,

  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "RCFA REPORT",
      subpageInnerName: null,
    });
    if (this.$store.state.status.server == true) {
      this.FETCH_DROPDOWN_PLATFORM();
      this.FETCH_DROPDOWN_DISC();
      this.FETCH_FAILURE_RECORD();
      this.user = JSON.parse(localStorage.getItem("user"));
      this.user.failure_seq = 1;
    }
  },
  data() {
    return {
      failureRecordList: {},
      dataGridAttributes: {
        class: "data-grid-style"
      },
      platform: [],
      disc: [],
      user: null,
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
    FETCH_FAILURE_RECORD() {
      GET_DATA(this, '/FailureRecord/get-failure-record-list-is-rcfa', 'failureRecordList');
    },
    DELETE_RECORD(e) {
      this.$ons.notification.confirm("Confirm Delete This Row?").then((res) => {
          if (res == 1) {
            DELETE_DATA(`/FailureRecord/delete-failure-record?id=${e.key}`, () => { this.FETCH_FAILURE_RECORD(); });
          }
      })
    },
    FETCH_DROPDOWN_PLATFORM() {
      GET_DATA(this, '/Md/get-md-platform-list', 'platform');
    },
    FETCH_DROPDOWN_DISC() {
      GET_DATA(this, '/Md/get-md-failure-discipline-list', 'disc');
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