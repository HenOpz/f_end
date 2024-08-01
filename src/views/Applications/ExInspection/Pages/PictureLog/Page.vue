<template>
  <div
    class="page-container">
      <InspectionRecordPanel @showHidePanel="SHOW_HIDE_PANEL" @viewItem="VIEW_ITEM" />
      <div class="list-page" v-if="this.id_item != ''">
        <div >
          <!-- <div class="page-section"> -->
            <div class="table-wrapper">
              <DxDataGrid 
                id="data-grid-list" 
                key-expr="id" 
                :data-source="testList"
                :selection="{ mode: 'single' }"
                :hover-state-enabled="true" 
                :allow-column-reordering="true" 
                :show-borders="true" 
                :show-row-lines="false"
                :row-alternation-enabled="false" 
                :word-wrap-enabled="true" 
                :column-auto-width="true"
                @row-inserted="ADD_NEW_FILE" 
                @row-removed="DELETE_DOC" 
                @init-new-row="() => {
                    this.file = [];
                    this.isEdit = false;
                }" 
                @editing-start="(e) => {
                    this.file = [];
                    this.isEdit = true;
                    this.dataFileTemp = e;
                }" 
                @row-removing="() => {
                    this.isEdit = false;
                }" 
                @saved="SAVE"
              >
                <DxEditing
                  :allow-updating="true"
                  :allow-deleting="true"
                  :allow-adding="true"
                  :use-icons="true"
                  mode="popup"
                >
                <DxPopup
                      :show-title="true"
                      :width="750"
                      :height="600"
                      title="Attachment"
                  />
                  <DxForm label-location="top">
                      <DxItem :col-count="3" :col-span="2" :row-count="1" item-type="group">
                        <DxItem data-field="id_item" :col-span="1" />
                        <DxItem data-field="checklist_item" :col-span="1" />
                        <DxItem data-field="finding_status" :col-span="1" />
                        <DxItem data-field="overview_img" :col-span="3" />
                        <DxItem data-field="close_up_img" :col-span="3" />
                        <DxItem data-field="findings" :col-span="3" />
                        <DxItem data-field="recommendation" :col-span="3" />
                        <DxItem data-field="deenergize" :col-span="1" />
                        <DxItem data-field="quick_fix" :col-span="1" />
                        <DxItem data-field="interim_measure" :col-span="1" />
                        <DxItem data-field="interim_measure_validity" :col-span="1" />
                        <DxItem data-field="finding_compliance_status" :col-span="1" />
                      </DxItem>
                  </DxForm>
                </DxEditing>
                <DxFilterRow :visible="false" />
                <DxHeaderFilter :visible="false" />
                <DxSelection mode="single" />
                <DxColumn 
                  data-field="file" 
                  :visible="false" 
                  edit-cell-template="insertCellTemplate" 
                />
                <DxColumn 
                  :width="60" 
                  alignment="center" 
                  caption="Item"
                  data-field="id_item" 
                />
                <DxColumn 
                  :width="80" 
                  alignment="center" 
                  caption="Checklist Item"
                  data-field="checklist_item" 
                />
                <DxColumn 
                  :width="180" 
                  alignment="center" 
                  caption="Overview"
                  cell-template="overview-template"
                  edit-cell-template="overview-edit-template"
                  data-field="overview_img" 
                />
                <DxColumn 
                  :width="180" 
                  alignment="center" 
                  caption="Close-up"
                  cell-template="close-up-template"
                  edit-cell-template="close-up-edit-template"
                  data-field="close_up_img" 
                />
                <DxColumn 
                  :width="160" 
                  alignment="center" 
                  caption="Findings"
                  data-field="findings" 
                />
                <DxColumn 
                  :width="160" 
                  alignment="center" 
                  caption="Recommendation"
                  data-field="recommendation" 
                />
                <DxColumn 
                  :width="80" 
                  alignment="center" 
                  caption="Finding Status (Open/Close)"
                  data-field="finding_status" 
                >
                  <DxLookup :data-source="platform" display-expr="code_name" value-expr="id" />
                </DxColumn>
                <DxColumn 
                  :width="80" 
                  alignment="center" 
                  caption="Deenergize"
                  data-field="deenergize" 
                />
                <DxColumn 
                  :width="80" 
                  alignment="center" 
                  caption="Quick Fix"
                  data-field="quick_fix" 
                />
                <DxColumn 
                  :width="80" 
                  alignment="center" 
                  caption="Interim Measure"
                  data-field="interim_measure" 
                />
                <DxColumn 
                  :width="80" 
                  alignment="center" 
                  caption="Interim Measure Validity"
                  data-field="interim_measure_validity" 
                />
                <DxColumn 
                  :width="80" 
                  alignment="center" 
                  caption="Finding Compliance Status"
                  data-field="finding_compliance_status" 
                />

                <template #overview-template="{ data }">
                  <img class="cell-picture" :src="data.data.closeup ? data.data.closeup : '/img/default_image.png'" alt="Picture">
                </template>

                <template #overview-edit-template>
                  <div class="widget-container">
                    <DxFileUploader 
                        id="file-uploader" 
                        :multiple="false" 
                        upload-mode="useForm"
                        @value-changed="VALUE_CHANGE" 
                        :visible="true" 
                    />
                  </div>
                </template>

                <template #close-up-template="{ data }">
                  <img class="cell-picture" :src="data.data.closeup ? data.data.closeup : '/img/default_image.png'" alt="Picture">
                </template>

                <template #close-up-edit-template>
                  <div class="widget-container">
                    <DxFileUploader 
                        id="file-uploader" 
                        :multiple="false" 
                        upload-mode="useForm"
                        @value-changed="VALUE_CHANGE" 
                        :visible="true" 
                    />
                  </div>
                </template>

                <template #insertCellTemplate>
                  <div class="widget-container">
                      <DxFileUploader 
                          id="file-uploader" 
                          :multiple="false" 
                          upload-mode="useForm"
                          @value-changed="VALUE_CHANGE" 
                          :visible="true" 
                      />
                  </div>
                </template>

                

                <!-- Configuration goes here -->
                <!-- <DxFilterRow :visible="true" /> -->
                <DxScrolling mode="standard" />
                <!-- <DxSearchPanel :visible="true" /> -->
                <DxPaging :page-size="10" :page-index="0" />
                <DxPager :show-page-size-selector="true" :allowed-page-sizes="[10, 20, 30]"
                  :show-navigation-buttons="true" :show-info="false" info-text="Page {0} of {1} ({2} items)" />
                <DxExport :enabled="false" />
              </DxDataGrid>
            </div>
          <!-- </div> -->
        </div>
      </div>
    <SelectInspRecord v-if="this.id_item == ''"/>
  </div>
</template>

<script>
//API
import { GET_DATA, PUT_DATA, POST_DATA, DELETE_DATA } from "/axios.js";
import moment from "moment";

//Components
//import VueTabsChrome from "vue-tabs-chrome";

//Components
import InspectionRecordPanel from "@/views/Applications/ExInspection/Pages/Inspection-record-panel.vue";
import SelectInspRecord from "@/components/select-insp-record.vue";
//DataGrid
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
// import penSvg from "@/components/svg/pen-svg.vue"
// import trashSvg from "@/components/svg/trash-svg.vue"
// import DxTextArea from "devextreme-vue/text-area";
import { DxItem } from "devextreme-vue/form";
import { DxFileUploader } from 'devextreme-vue/file-uploader';
import {
    DxDataGrid,
  //   DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    DxFilterRow,
    DxHeaderFilter,
    DxSelection,
  //   DxToolbar,
    DxEditing,
    DxPopup,
    DxLookup,
  //   DxRequiredRule,
  //   DxFormItem,
    DxForm
} from "devextreme-vue/data-grid";

//Structures

export default {
  name: "piclog-record",
  components: {
    InspectionRecordPanel,
    SelectInspRecord,
    DxDataGrid,
    DxExport,
    DxPager,
    DxPaging,
    DxScrolling,
    DxColumn,
    DxFilterRow,
    DxHeaderFilter,
    DxSelection,
    DxEditing,
    DxPopup,
    DxForm,
    DxItem,
    DxFileUploader,
    DxLookup
    // penSvg,
    // trashSvg
    // AddFR,
    // EditFR
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "PICTURE LOG",
      subpageInnerName: null,
    });
    if (this.$store.state.status.server == true) {
      this.testList = [
        {
          id: 1,
          id_item: 1,
          inspection_date: '20 Dec 2023',
          campaign: 'Routine Inspection',
          checklist_status: 'P6',
          picture_log_status: 'P6',
          integrity_status: 'P6',
          note: 'Good condition'
        },
      ];
      // // this.FETCH_INSP_RECORD();
    }
  },
  data() {
    return {
      id_item: 0,
      file: [],
      gridRefName: "grid-library",
      fileNameInputOptions: { placeholder: "File Name" },
      dataFileTemp: "",
      isEdit: false,
      pagePanelHiding: false,
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
      }).then(function () {
        workbook.xlsx.writeBuffer().then(function (buffer) {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "inspection_record.xlsx"
          );
        });
      });
      e.cancel = true;
    },
    VIEW_ITEM(item) {
      console.log("parent triggered: ");
      console.log(item);
      this.drawingList = [];
      this.id_item = item.id_item;
      // this.inspection_date = item.inspection_date;
      // axios({
      //   method: "get",
      //   url:
      //     "/FlowlinePictureLog/get-flowline-pic-by-insp-id?id_inspection_record=" +
      //     this.id_inspection_record,
      //   headers: {
      //     Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
      //   },
      //   data: {
      //     id_inspection_record: item.id_inspection_record
      //   }
      // })
      //   .then(res => {
      //     console.log("insp record:");
      //     console.log(res.data);
      //     if (res.status == 200 && res.data) {
      //       this.drawingList = res.data;
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   })
      //   .finally(() => {
      //     this.isLoading = false;
      //   });
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
    SHOW_HIDE_PANEL() {
      this.pagePanelHiding = !this.pagePanelHiding;
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  // padding: 20px;
  display: grid;
  grid-template-columns: 201px calc(100% - 201px);
}

.page-container-hide {
  grid-template-columns: 41px calc(100% - 41px);
}

.page-section {
  // padding: 20px;
  width: 100%;
}

.page-section:last-child {
  padding-bottom: 20px;
}

.display-grid {
  display: grid;
  grid-template-columns: 201px calc(100% - 201px);
}

.list-page {
  position: relative;
  overflow-y: auto;
  .list {
    margin: -20px -20px 20px -20px;
  }
}

.table-wrapper {
    width: 100%;
}

.container {
    display: grid;
    grid-template-columns: 30% 70%;
    gap: 20px;

    .box-field {
        width: 100%;
        .dx-texteditor-input{
            width: 100% !important;
        }
    }
    .dx-datagrid-headers .dx-texteditor-input, .dx-datagrid-rowsview .dx-texteditor-input{
        width: 100% !important;
    }
}

.severity-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: flex-start !important;
      .box{
          background-color: $dexon-primary-green;
          height: auto !important;
          border-radius: 0%;
      }
}

.picture-wrapper {
    span {
        font-size: 16px;
    }
    img {
        width: 100%;
    }
}

.cell-picture {
  width: 100%;
}
</style>