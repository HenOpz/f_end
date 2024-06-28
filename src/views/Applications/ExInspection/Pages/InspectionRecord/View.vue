<template>
  <div class="page-container">
    <div class="page-section">
      <div class="table-wrapper">
        <DxDataGrid
          id="data-grid-list"
          key-expr="id"
          :data-source="inspRecordList"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          :column-auto-width="true"
          @row-inserted="CREATE_RECORD"
          @row-updated="UPDATE_RECORD"
          @row-removed="DELETE_RECORD"
          @init-new-row="ON_INIT_NEW_ROW"
        >
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />
          <DxFilterRow :visible="false" />
          <DxHeaderFilter :visible="false" />
          <DxSelection mode="single" />
          <DxColumn data-field="inspection_date" caption="Inspection Date" :width="130" alignment="center" dataType="date" format="dd MMM yyyy" sort-order="desc" />
          <DxColumn data-field="project_no" caption="Project No." :width="90" alignment="center" />
          <DxColumn data-field="report_no" caption="Report No." :width="90" alignment="center" />
          <DxColumn data-field="remark" caption="Note" :min-width="150" alignment="center" />
          <DxColumn caption="Grade of Inspection">
            <DxColumn data-field="is_d_type" caption="D" :width="70" alignment="center" dataType="boolean" />
            <DxColumn data-field="is_c_type" caption="C" :width="70" alignment="center" dataType="boolean" />
            <DxColumn data-field="is_v_type" caption="V" :width="70" alignment="center" dataType="boolean" />
          </DxColumn>
          <DxColumn caption="Type of Inspection">
            <DxColumn data-field="is_initial" caption="Initial" :width="70" alignment="center" dataType="boolean" />
            <DxColumn data-field="is_periodic" caption="Periodic" :width="70" alignment="center" dataType="boolean" />
            <DxColumn data-field="is_sample" caption="Sample" :width="70" alignment="center" dataType="boolean" />
          </DxColumn>

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
import { axios } from "/axios.js";
import moment from "moment";

//Components
//import VueTabsChrome from "vue-tabs-chrome";

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
    // DxAddRowButton,
    // DxLookup,
    // DxRequiredRule,
    // DxFormItem
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "INSPECTION RECORD",
      subpageInnerName: null,
    });
    if (this.$store.state.status.server == true) {
      this.FETCH_INSP_RECORD();
    }
  },
  data() {
    return {
      inspRecordList: {},
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
      const id_tag = this.$route.params.id_tag;
      this.isLoading = true;
      axios({
        method: "get",
        url:
          "/ExInspectionRecord/get-ex-insp-record-by-id-info?id=" + id_tag,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.inspRecordList = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_RECORD(e) {
      e.data.id_info = this.$route.params.id_tag;
      e.data.id = 0;
      e.data.is_active = true;
      if (e.data.inspection_date) e.data.inspection_date = moment(e.data.inspection_date).format("L");
      axios({
        method: "post",
        url: "/ExInspectionRecord",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          if (res.status == 201) {
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
    UPDATE_RECORD(e) {
      if (e.data.inspection_date) e.data.inspection_date = moment(e.data.inspection_date).format("L");
      axios({
        method: "put",
        url: "/ExInspectionRecord/" + e.key,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          if (res.status == 204) {
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
    DELETE_RECORD(e) {
      axios({
        method: "delete",
        url: "/ExInspectionRecord/delete-ex-insp-record?id=" + e.key,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          if (res.status == 204) {
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
    ON_INIT_NEW_ROW(e) {
      e.data.is_d_type = false;
      e.data.is_c_type = false;
      e.data.is_v_type = false;
      e.data.is_initial = false;
      e.data.is_periodic = false;
      e.data.is_sample = false;
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