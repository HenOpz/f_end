<template>
  <div class="page-container">
    <div class="button-container">
        <button class="export-btn" 
          v-on:click="SAP"
        >
            APPROVAL
        </button>
    </div>
    <div class="page-section">
      <div class="table-wrapper">
        <DxDataGrid
          id="data-grid-list"
          key-expr="id"
          :data-source="testList"
          :selection="selectionOptions"
          @selectionChanged="onSelectionChanged"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
        >
          <DxEditing
            :allow-updating="false"
            :allow-deleting="false"
            :allow-adding="false"
            :use-icons="true"
            mode="popup"
          />
          <DxFilterRow :visible="false" />
          <DxHeaderFilter :visible="false" />
          <DxSelection mode="multiple" />
          
          <DxColumn data-field="id_item" caption="Item" :width="70" alignment="center" />
          <DxColumn data-field="temporary_number" caption="Temporary Number" :width="90" alignment="center" />
          <DxColumn data-field="platform" caption="Platform" :width="90" alignment="center" />
          <DxColumn data-field="asset_type" caption="Asset Type" :width="90" alignment="center" />
          <DxColumn data-field="tag_number" caption="Tag Number" :width="120" alignment="center" />
          <DxColumn data-field="moc_number" caption="MOC Number" :width="120" alignment="center" />
          <DxColumn data-field="repair_code" caption="Repair Code" :width="120" alignment="center" />
          <DxColumn data-field="due_date" caption="Due Date" :width="100" alignment="center" />
          <DxColumn data-field="repair_status" caption="Repair Status" :width="100" alignment="center" />
          <DxColumn data-field="severity" caption="Severity" :width="80" alignment="center" />
          <DxColumn data-field="description" caption="Description" :min-width="100" alignment="center" />

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
/* eslint-disable */ 
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
// import DxSelectBox from 'devextreme-vue/select-box';
// import { DxCheckBox } from 'devextreme-vue/check-box';
import {
  DxDataGrid,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  DxExport,
  DxToolbar,
  DxHeaderFilter,
  DxSelection,
  DxEditing,
  DxFilterRow,
  DxItem,
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
    DxToolbar,
    DxHeaderFilter,
    DxSelection,
    // DxForm,
    DxItem,
    DxEditing,
    DxFilterRow,
    // DxAddRowButton,
    // DxLookup,
    // DxRequiredRule,
    // DxCheckBox,
    // DxFormItem,

  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "PENDING APPROVAL",
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
      statusList: [
        { id: 1, code: "Fench" },
        { id: 2, code: "Piping" },
        { id: 3, code: "Pressure Vessel" },
        { id: 4, code: "Bridge" },
        { id: 5, code: "Lifting Cane" }
      ],
      dataGridAttributes: {
        class: "data-grid-style"
      },
      ExpDateInputOptions: { placeholder: "Select date" },
      GPIDateInputOptions: { placeholder: "Select date" },
      GPINoInputOptions: { placeholder: "Enter GPI No." },
      MainWorkCtrInputOptions: { placeholder: "Enter main workCtr" },
      SeverityInputOptions: { placeholder: "Enter severity" },
      platformNoInputOptions: { placeholder: "Enter platform" },
      conmmentInputOptions: { placeholder: "Enter remark" },
      tagNoInputOptions: { placeholder: "Enter tag No." },
      actionInputOptions: { placeholder: "Enter action"},
      selected_line: [],
      selectedIds: [],
      selectionOptions: {
        mode: 'multiple',
        onSelectionChanged: this.onSelectionChanged,
      },
    };
  },
  computed: {
  },
  methods: {
    onSelectionChanged(e) {
      this.selectedIds = e.selectedRowsData.map(row => row.id);
      const exportBtn = document.querySelector(".export-btn");
      if (this.selectedIds.length === 0) {
        exportBtn.classList.remove('selected');
      } else {
        exportBtn.classList.add('selected');
      }
    },
    exportData() {
      console.log('Exporting data...');
    },
    SAP(){
      if (this.selectedIds.length === 0) {
        alert("Please select any row")
        return
      }
      console.log("SAP SUBMIT")
    },
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
      axios({
        method: "get",
        url:
          "/PipingInspectionRecord/get-piping-ir-by-id-line?id_line=" + id_tag,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          console.log("insp record:");
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log("success");
            this.inspRecordList = res.data;
            console.log(this.inspRecordList);
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
    UPDATE_RECORD(e) {
      e.data.inspection_date = moment(e.data.inspection_date).format("L");
      console.log(e.data);
      axios({
        method: "put",
        url: "/PipingInspectionRecord/" + e.key,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          if (res.status == 204) {
            console.log("update success");
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
        url: "/PipingInspectionRecord/" + e.key,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          if (res.status == 204) {
            console.log("delete success");
            this.FETCH_INSP_RECORD();
          }
        })
        .catch(error => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.filter-report {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 10px;
  width: 200px;
  border-radius: 10px;
  margin-top: 50px;
  -webkit-box-shadow: 0px 10px 28px -7px rgba(0,0,0,0.3);
  -moz-box-shadow: 0px 10px 28px -7px rgba(0,0,0,0.3);
  box-shadow: 0px 10px 28px -7px rgba(0,0,0,0.3);

  h5 {
    margin: 0;
  }
  .field {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 100%;

    span {
      font-size: 14px;
    }
  }
}

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

.button-container {
  padding: 1rem;
  
  gap: 0.4rem;
  .export-btn {
    transition: background-color 0.3s ease;
    cursor: pointer;
    border: 1px solid lightgray;
    background-color: transparent;
    border-radius: 4px;
    padding: 10px 8px;
    gap: 1rem;
    font-size: 14px;
    width: 163px;
    &:hover {
      cursor: not-allowed;
    }
  }
}

.export-btn.selected {
  background-color: #1D9531;
  color: white;
  &:hover{
    background-color: #71c47f;
    cursor: pointer;
  }
}
</style>