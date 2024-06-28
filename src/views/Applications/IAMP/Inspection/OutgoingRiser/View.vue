<template>
  <div class="page-container">
    <div class="page-section">
      <div class="table-wrapper">
        <DxDataGrid
          id="data-grid-list"
          key-expr="recordId"
          :data-source="riserList"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          :column-auto-width="true"
          @cell-prepared="onCellPrepared"
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
          <DxColumn data-field="fieldData.platform" caption="Platform" :width="100" alignment="center" />
          <DxColumn data-field="fieldData.pipeline_no" caption="Pipeline No." :min-width="100" alignment="center" />
          <DxColumn data-field="fieldData.riser_no" caption="Riser No." :min-width="100" alignment="center" />
          <DxColumn data-field="fieldData.riser_type" caption="Riser Type" :min-width="100" alignment="center" />
          <DxColumn data-field="fieldData.info::risk_ranking" caption="Risk Ranking" :width="100" alignment="center" />
          <DxColumn caption="Integrity Status" :width="100" alignment="center" cell-template="status-cell-template" />
          <DxColumn 
              data-field="fieldData.inspection_type" 
              caption="Inspection Type" 
              :width="120"
              alignment="center" 
          />
          <DxColumn 
              data-field="fieldData.last_insp_date" 
              caption="Last Inspection Date" 
              :width="100"
              alignment="center" 
              dataType="date" 
              format="yyyy" 
          />
          <DxColumn 
              data-field="fieldData.next_insp_date" 
              caption="Next Inspection Date" 
              :width="100"
              alignment="center" 
          />
          <DxColumn 
              data-field="fieldData.wo_no" 
              caption="Work Order" 
              :width="120" 
              alignment="center"
          />
          <!-- <DxColumn 
              alignment="center" 
              cell-template="action-cell-template"
              :width="60"
          /> -->

          <DxColumn 
              alignment="center" 
              cell-template="action-cell-template"
              :width="60"
          />

          <template #status-cell-template="{ data }">
              <div>
                <span v-if="data.data.fieldData.riser_type == 'Above Splash Zone'">
                  {{ data.data.fieldData["info::outgoing_riser_status_asz"]}}
                </span>
                <span v-if="data.data.fieldData.riser_type == 'Subsea'">
                  {{ data.data.fieldData["info::outgoing_riser_status_visual_bsz"]}}
                </span>
              </div>
          </template>

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
    <contentLoading text="Loading, please wait..." v-if="isLoading == true" color="#fc9b21" />
  </div>
</template> 

<script>
import { axios } from "/axios.js";
import { axiosFileMaker } from "/axios.js";
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import {
  DxDataGrid,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  DxExport,
  DxHeaderFilter,
  DxSelection,
  DxEditing,
  DxFilterRow,
} from "devextreme-vue/data-grid";

export default {
  name: "inspection-record",
  components: {
    contentLoading,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    DxHeaderFilter,
    DxSelection,
    DxEditing,
    DxFilterRow,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "INSPECTION DUE OUTGOING RISER",
      subpageInnerName: null,
    });
    if (this.$store.state.status.server == true) {
      this.FETCH_FILE_MAKER_RECORD();
      this.FETCH_STATUS();
      this.FETCH_RISK_RANKING();
    }
  },
  data() {
    return {
      riserList: {},
      isLoading: false,
      statusList: {},
      riskrankingList: {},
    };
  },
  computed: {},
  methods: {
    GENERATE_SESSION() {
      axiosFileMaker({
        method: "POST",
        url: "/Pipeline/sessions",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic dmlzaXRvcjpBaW1zMjAyMg=="
        },
        data: {}
      })
        .then(res => {
          localStorage.setItem("pipeline_token", JSON.stringify(res.data.response.token));
          this.FETCH_FILE_MAKER_RECORD();
        })
        .catch(error => {
          console.log("api", error);
        })
    },
    FETCH_FILE_MAKER_RECORD() {
      this.isLoading = true;
      axiosFileMaker({
        method: "GET",
        url: "/Pipeline/layouts/info_outgoing_riser_due_inspection/records?_limit=10000",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("pipeline_token")),
        },
      })
        .then(res => {
          this.riserList = res.data.response.data;
          console.log("this.riserList", this.riserList);
          this.isLoading = false;
        })
        .catch(error => {
          console.log("api", error);
          this.GENERATE_SESSION();
        })
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
            "OUTGOING-RISER-INSPECTION-DUE.xlsx"
          );
        });
      });
      e.cancel = true;
    },
    onCellPrepared(e) {
      console.log('data ',e);
            if(e.rowType === "data" && e.column.caption === "Integrity Status") {
                console.log(e.data.fieldData);
                e.cellElement.style.backgroundColor = this.GET_STATUS_COLOR(e.data.fieldData["info::outgoing_riser_status_asz"]);
                e.cellElement.style.color = "#000";
                e.cellElement.style.textTransform = "uppercase";
            }
            if(e.rowType === "data" && e.column.dataField === "fieldData.info::risk_ranking") {
                console.log(e.data.fieldData);
                e.cellElement.style.backgroundColor = this.GET_RISK_COLOR(e.data.fieldData["info::risk_ranking"]);
                e.cellElement.style.color = "#000";
                e.cellElement.style.textTransform = "uppercase";
            }
    },
        GET_STATUS_COLOR(status) {
            if(status) {
                var data = this.statusList.filter(function(s) {
                    return s.status == status;
                });
                return data[0].color_code;
            } else {
                return "#fff";
            }
        },
        GET_RISK_COLOR(risk) {
            if(risk) {
                var data = this.riskrankingList.filter(function(s) {
                    return s.risk_ranking.toUpperCase() == risk;
                });
                return data[0].color_code;
            } else {
                return "#fff";
            }
        },
        FETCH_STATUS() {
            axios({
                method: "get",
                url: "/Md/get-md-integrity-status-list",
                headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                console.log(res);
                if (res.status == 200 && res.data) {
                    this.statusList = res.data;
                }
                })
                .catch(error => {
                console.log(error);
                })
                .finally(() => {
                this.isLoading = false;
                });
        },
        FETCH_RISK_RANKING() {
            axios({
                method: "get",
                url: "/Md/get-md-risk-ranking-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    console.log(res);
                    if (res.status == 200 && res.data) {
                        this.riskrankingList = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        RISER_TYPE(){

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