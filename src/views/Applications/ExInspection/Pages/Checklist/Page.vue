<template>
 <div
    class="page-container"
    :class="[
      pagePanelHiding == false ? 'page-container' : 'page-container-hide',
    ]"
  >
    <InspectionRecordPanel @showHidePanel="SHOW_HIDE_PANEL" @viewItem="VIEW_ITEM" />
    <div id="page-container-view" class="list-page" v-if="this.id_inspection_record">
      <v-ons-list>
        <v-ons-list-header>
          Visual Checklist of
          <b>{{ DATE_FORMAT(current_view.inspection_date) }}</b>
        </v-ons-list-header>
      </v-ons-list>
      <div v-if="isLoading == false">
        <div v-if="this.checklistList_existance.general == true">
          <ExCheck
            :record="id_inspection_record"
          />
        </div>

        <div
          class="center-box-wrapper"
          v-if="
            this.id_inspection_record != '' &&
            this.checklistList_existance.general == false
          "
        >
          <v-ons-toolbar-button v-on:click="CREATE_CHECKLIST()">
            <i class="las la-plus"></i>
            <span>Create New Checklist Form</span>
          </v-ons-toolbar-button>
        </div>
      </div>
      <Loading v-if="isLoading == true" text="Loading" />
    </div>
    <SelectInspRecord v-if="this.id_inspection_record == ''" />
  </div>
</template> 

<script>
//API
import { axios } from "/axios.js";
import moment from "moment";

//Components
import InspectionRecordPanel from "@/views/Applications/ExInspection/Pages/Inspection-record-panel.vue";
import SelectInspRecord from "@/components/select-insp-record.vue";
import ExCheck from "@/views/Applications/ExInspection/Pages/Checklist/ExInpCheckList.vue"
import Loading from "@/components/app-structures/app-loading.vue";
//import VueTabsChrome from "vue-tabs-chrome";

//DataGrid
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
// import { DxItem } from "devextreme-vue/form";
import {
//   DxDataGrid,
//   DxSearchPanel,
//   DxPaging,
//   DxPager,
//   DxScrolling,
//   DxColumn,
//   DxExport,
//   DxToolbar,
//   DxEditing,
//   DxLookup,
//   DxRequiredRule,
//   DxFormItem,
//   DxForm
} from "devextreme-vue/data-grid";

//Structures

export default {
  name: "checklist-record",
  components: {
    InspectionRecordPanel,
    SelectInspRecord,
    ExCheck,
    Loading,
    // DxDataGrid,
    // DxSearchPanel,
    // DxPaging,
    // DxPager,
    // DxScrolling,
    // DxColumn,
    // DxExport,
    // DxToolbar,
    // DxForm,
    // DxItem,
    // DxEditing,
    // DxLookup,
    // DxRequiredRule
    // DxFormItem,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "CHECKLIST",
      subpageInnerName: null,
    });
    if (this.$store.state.status.server == true) {
      this.FETCH_DATA(`/PipingInspectionRecord/get-piping-ir-by-id-line?id_line=${this.$route.params.id_tag}`, 'inspRecordList');
    }
    // if (this.$store.state.status.server == true) {
    //   this.FETCH_INSP_RECORD();
    // }
    // if (this.$store.state.status.server == true) {
    //   this.testList = [
    //     {
    //       id: 1,
    //       id_item: 1,
    //       inspection_date: '20 Dec 2023',
    //       campaign: 'Routine Inspection',
    //       checklist_status: 'P6',
    //       picture_log_status: 'P6',
    //       integrity_status: 'P6',
    //       note: 'Good condition'
    //     },
    //   ];
    //   // // this.FETCH_INSP_RECORD();
    // }
  },
  data() {
    return {
      // id_item: 0,
      current_view: {},
      id_inspection_record: "",
      isLoading: false,
      pagePanelHiding: false,
      // testList: {},
      inspRecordList: {},
      checklistList: {
        generic: []
      },
      checklistList_existance: {
        general: false
      },
      // campaigeList: {},
      // dataGridAttributes: {
      //   class: "data-grid-style"
      // },
      // inspDateInputOptions: { placeholder: "Select date" },
      // projectNoInputOptions: { placeholder: "Enter project no" },
      // reportNoInputOptions: { placeholder: "Enter report no" },
      // remarkInputOptions: { placeholder: "Enter remark" }
    };
  },
  computed: {},
  watch: {
    //triggered whenever the route path changes
    $route() {
      this.CLEAR_CURRENT_VIEW();
      this.id_inspection_record = "";
      this.current_view = {};
    }
  },
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
            this.FETCH_DATA(`/PipingInspectionRecord/get-piping-ir-by-id-line?id_line=${this.$route.params.id_tag}`, 'inspRecordList');
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
            this.FETCH_DATA(`/PipingInspectionRecord/get-piping-ir-by-id-line?id_line=${this.$route.params.id_tag}`, 'inspRecordList');
          }
        })
        .catch(error => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
    // DELETE_RECORD(e) {
    //   axios({
    //     method: "delete",
    //     url: "/PipingInspectionRecord/" + e.key,
    //     headers: {
    //       Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
    //     }
    //   })
    //     .then(res => {
    //       if (res.status == 204) {
    //         console.log("delete success");
    //         this.FETCH_INSP_RECORD();
    //       }
    //     })
    //     .catch(error => {
    //       this.$ons.notification.alert(
    //         error.code + " " + error.response.status + " " + error.message
    //       );
    //     })
    //     .finally(() => {});
    // },
    SHOW_HIDE_PANEL() {
      this.pagePanelHiding = !this.pagePanelHiding;
    },
    VIEW_ITEM(item) {
      this.current_view = {};
      this.current_view = item;
      console.log("VIEW_ITEM: ");
      console.log(item);
      // this.CLEAR_CURRENT_VIEW();
      this.id_inspection_record = item.id_inspection_record;
      console.log("id_ins: ",item.id_inspection_record)

      this.FETCH_DATA(`ExInspectionChecklist/get-ex-insp-chk-list-insp-id?id_insp_record=${item.id_inspection_record}`, null, 
        (data) => {
          if (data[0].result != null) {
            this.checklistList_existance.general = true;
          } else {
            this.checklistList_existance.general = false;
          }
        }
      );
    },
    CLEAR_CURRENT_VIEW() {
      this.checklistList = {
        generic: []
      };
      this.checklistList_existance = {
        general: false
      };
    },
    DATE_FORMAT(d) {
      if (d !== null) {
        return moment(d).format("DD MMM yyyy");
      }
      return "";
    },
    CREATE_CHECKLIST() {
      console.log(
        "==> CREATE NEW CHECKLIST SHEET: id_insp: " + this.id_inspection_record
      );
      this.isLoading = true;
      axios({
        method: "post",
        url:
          "ExInspectionChecklist/add-all-ex-insp-chk-list?id_insp_record=" +
          this.id_inspection_record,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_insp_record: this.id_inspection_record
        }
      })
        .then(res => {
          if (res.status == 201) {
            // this.CREATE_REMARK();
            console.log(res.data);
            console.log("NEW CHECKLIST SHEET CREATED");
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_DATA(url, targetVariable, callback) {
        this.isLoading = true;
        axios({
            method: "get",
            url: url,
            headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        })
            .then(res => {
                if (res.status == 200 && res.data) {
                    if (callback && typeof callback === 'function') {
                        callback(res.data);
                    } else {
                        this.$set(this, targetVariable, res.data);
                    }
                }
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.isLoading = false;
            });
    },
    // CREATE_REMARK() {
    //   this.isLoading = true;
    //   axios({
    //     method: "put",
    //     url: "ExInspectionChecklist/edit-ex-insp-chk-list-result",
    //     headers: {
    //       Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
    //     },
    //     data: {
    //       id_inspection_record: this.id_inspection_record,
    //       id_chk: "",
    //       id_result: "",
    //       comment: ""
    //     }
    //   })
    //     .then(res => {
    //       if (res.status == 201) {
    //         console.log(res.data);
    //         this.FETCH_CHECKLIST_GENERIC(this.id_inspection_record);
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     })
    //     .finally(() => {
    //       this.isLoading = false;
    //     });
    // },
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 201px calc(100% - 201px);
}

.page-container-hide {
  grid-template-columns: 41px calc(100% - 41px);

  .insp-panel-header {
    position: absolute;
    top: 155px;
    left: 12px;
    background: none;
    transform-origin: 0 0;
    transform: rotate(270deg);
    width: 200px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: $web-font-color-black;
    letter-spacing: 1px;
  }
}

.list-page {
  padding: 20px;
  overflow-y: scroll;
  position: relative;
  // height:70vh;
  margin-bottom: 120px;
  min-width: 800px;
  .list {
    margin: -20px -20px 20px -20px;
  }
}

// @media screen and (max-width: 1180px) {
//   .list-page {
//     grid-template-columns: 100%;
//   }
//   .page-container {
//     grid-template-columns: 41px calc(100% - 41px);
//   }
// }

</style>