<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h3 fill style="margin-bottom: 0; margin-top: 0;">Tag Number: MDC-Inlet</h3>
                <div fill class="table-chart">
                    <div>
                        <DxDataGrid 
                            id="data-grid-list-rci" 
                            key-expr="id" 
                            :element-attr="dataGridAttributes"
                            :data-source="atpList"
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
                                :allow-updating="true" 
                                :allow-deleting="true" 
                                :allow-adding="false" 
                                :use-icons="true"
                                mode="row" 
                            />
                            <DxColumn 
                                data-field="year" 
                                caption="Year" 
                                :width="100" 
                                alignment="center"
                            />
                            <DxColumn
                                data-field="month" 
                                caption="Month" 
                                :width="100" 
                                alignment="center" 
                            />
                            <DxColumn 
                                data-field="rci" 
                                caption="R-CI ppm" 
                                :width="100" 
                                alignment="center"
                            />
                            <DxToolbar>
                                <DxItem
                                    location="after"
                                    template="filterSelect"
                                />
                                <DxItem
                                    location="after"
                                    template="addButton"
                                />
                            </DxToolbar>
                            <template #addButton>
                                <DxButton
                                icon="las la-plus"
                                hint="Add"
                                />
                            </template>
                            <template #filterSelect>
                                <DxSelectBox
                                    :items="yearList"
                                    value-expr="id"
                                    display-expr="year"
                                    placeholder="Filter Year"
                                    
                                />
                            </template>
                        </DxDataGrid>
                    </div>
                    <div class="chart-container">
                        <highcharts :options="chartOptions"  />
                    </div>
                </div>

                <button fill @click="$emit('popup')">Close</button>
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
// import trashSvg from "@/components/svg/trash-svg.vue"

//DataGrid
import "devextreme/dist/css/dx.light.css";
// import { Workbook } from "exceljs";
// import saveAs from "file-saver";
// import { exportDataGrid } from "devextreme/excel_exporter";
import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';
import DxDateBox from 'devextreme-vue/date-box';
import { DxCheckBox } from 'devextreme-vue/check-box';
// import DxTextArea from 'devextreme-vue/text-area';
import { DxItem } from "devextreme-vue/form";
import DxButton from "devextreme-vue/button";

import exportingInit from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
exportingInit(Highcharts);
offlineExporting(Highcharts);

import {
    DxDataGrid,
    // DxSearchPanel,
    // DxPaging,
    // DxPager,
    // DxScrolling,
    DxColumn,
    // DxExport,
    DxToolbar,
    // DxHeaderFilter,
    // DxSelection,
    DxEditing,
    // DxFilterRow,
    // DxButton,
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
        moc_no: String,
    },
    components: {
        DxDataGrid,
        // DxSearchPanel,
        // DxPaging,
        // DxPager,
        // DxScrolling,
        DxColumn,
        // DxExport,
        DxToolbar,
        // DxHeaderFilter,
        // DxSelection,
        // DxForm,
        DxItem,
        DxEditing,
        // DxFilterRow,
        DxButton,
        // DxAddRowButton,
        // DxLookup,
        // DxRequiredRule,
        // DxFormItem,
        DxSelectBox,
        DxTextBox,
        DxDateBox,
        DxCheckBox,
        // DxTextArea,
        // trashSvg
        highcharts: Chart
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "MOC Number: " + this.moc_no,
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            // this.FETCH_DROPDOWN_NOC();
            // this.FETCH_DROPDOWN_RRL();
            // this.FETCH_DROPDOWN_STATUS();
            // this.FETCH_MOC_RECORD();
            const years = []
            for (let index = 0; index < 11; index++) {
                years.push({ id: index, year: 2020 + index })
            }
            this.yearList = years;

            this.chartOptions = {
                credits: {
                enabled: false
                },
                title: {
                    text: 'Trending Results Chart',
                    align: 'center'
                },
                xAxis: {
                    categories: ['2020 H1', '2020 H2', '2021 H1', '2021 H2', '2022 H1', '2022 H2', '2023 H1', '2023 H2']
                },
                yAxis: {
                    title: {
                        text: this.active_tab
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Trend',
                    data: [12.3, 9.5, 4, 18.4, 6, 3, 111, 9.5]
                }]
            }
        }
    },
    data() {
        return {
            mocList: {},
            atpList: [
                {
                    id: 1,
                    year: 2023,
                    month: 'Dec',
                    temp: '102',
                    rci: '56'
                },
                {
                    id: 2,
                    year: 2023,
                    month: 'Nov',
                    temp: '60',
                    rci: '26.22'
                },
                {
                    id: 3,
                    year: 2023,
                    month: 'Oct',
                    temp: '34',
                    rci: '3.21'
                },
                {
                    id: 4,
                    year: 2023,
                    month: 'Sep',
                    temp: '22',
                    rci: '7.12'
                },
                {
                    id: 5,
                    year: 2023,
                    month: 'Aug',
                    temp: '45',
                    rci: '10.23'
                }
            ],
            formSelect: {},
            yearList: [],
            chartOptions: {},
            dataGridAttributes: {
                class: "data-grid"
            },
            cellColors: {
                green: '#34eb74',
                yellow: '#FFDB58',
                red: '#eb4034',
            }
        };
    },
    computed: {},
    methods: {
        FETCH_MOC_RECORD() {
            this.isLoading = true;
            axios({
                method: "get",
                url:
                    "/ManagementOfChange/" + this.id_record,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.mocList = res.data;
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
            if (this.mocList.start_date !== null)
                this.mocList.start_date = moment(this.mocList.start_date).format("L");
            if (this.mocList.expiry_date !== null)
                this.mocList.expiry_date = moment(this.mocList.expiry_date).format("L");
            axios({
                method: "put",
                url: "/ManagementOfChange/" + this.mocList.id,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: this.mocList
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
        DELETE_RECORD() {
            axios({
                method: "delete",
                url: "/ManagementOfChange/delete-management-of-change?id=" + this.mocList.id,
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
        FETCH_DROPDOWN_NOC() {
            axios({
                method: "get",
                url: "/Md/get-md-moc-noc-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: {}
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.formSelect.noc = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_DROPDOWN_STATUS() {
            axios({
                method: "get",
                url: "/Md/get-md-moc-status-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: {}
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.formSelect.status = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_DROPDOWN_RRL() {
            axios({
                method: "get",
                url: "/Md/get-md-moc-rrl-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: {}
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.formSelect.rrl = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        GET_STATUS_CELL_COLOR(value) {
            if (value.rowType === "data" && value.column.dataField === "rci") {
                if (value.data.rci && value.data.temp) {
                    let rci = Number(value.data.rci);
                    let temp = Number(value.data.temp);

                    if ((rci <= 30 && temp <= 50) || (rci >= 100 && temp > 50)) return this.cellColors.green;
                    else if (rci >= 25 && rci < 30) return this.cellColors.yellow;
                    else if ((rci < 25 && temp <= 50) || (rci < 100 && temp > 100)) return this.cellColors.red;
                }
            }
        },
        onCellPrepared(e) {
            if(e.rowType === "data" && e.column.dataField === "rci") {
                e.cellElement.style.backgroundColor = this.GET_STATUS_CELL_COLOR(e);
                e.cellElement.style.textTransform = "uppercase";
            }
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
  overflow-y: hidden;
  position: absolute !important;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: #14141484;
}

.page-section {
  width: 900px;
  padding: 20px;
  overflow-y: auto;
  height: auto;
  grid-row: span 2;
  // width: 1;
  position: absolute !important;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff !important;
  border-radius: 10px;
  border: #d9d9d9 1px solid;
}

.table-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;

    *[fill] {
        grid-column: span 2;
    }

    .table-tabs-buttons {
        display: flex;
        flex-direction: row;
        gap: 5px;

        button {
            border-radius: 0;
            padding: 5px;
            width: 120px;
        }
        .active {
            color: white;
             background-color: $web-theme-color-secondary;
        }
    }

    .table-chart {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 5px;
    }

    .input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 6px;

        .checkbox-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
            margin-bottom: 5px;
        }

        span {
            font-size: 12px;
            font-weight: 600;
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
    border: solid 1px $web-theme-color-secondary;
  }
}
</style>