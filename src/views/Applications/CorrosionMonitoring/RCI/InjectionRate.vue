<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <div style="display: flex; flex-direction: row; gap: 100px; grid-column: span 2;">
                    <h3 fill style="margin-bottom: 0; margin-top: 0;">Platform: MDB</h3>
                    <h3 fill style="margin-bottom: 0; margin-top: 0;">Tag Number: 18-MDB-MDPP</h3>
                </div>
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
                            @row-inserted="CREATE_RECORD"
                            @row-updated="UPDATE_RECORD"
                            @row-removed="DELETE_RECORD"
                            >
                            <DxEditing 
                                :allow-updating="true" 
                                :allow-deleting="true" 
                                :allow-adding="true" 
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
                                data-field="id_month" 
                                caption="Month" 
                                :width="100" 
                                alignment="center" 
                            >
                                <DxLookup :data-source="monthList" display-expr="month_code" value-expr="id" />
                            </DxColumn>
                            <DxColumn 
                                data-field="ci_injection_rate" 
                                caption="CI Injection Rate" 
                                :width="100" 
                                alignment="center"
                            />
                            <DxColumn 
                                data-field="rci_val" 
                                caption="R-CI (ppm)" 
                                :width="100" 
                                alignment="center"
                            />
                        </DxDataGrid>
                    </div>
                    <div class="chart-container">
                        <highcharts :options="chartOptions" key="chartData" />
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
import { GET_DATA, PUT_DATA, POST_DATA, DELETE_DATA } from "/axios.js";
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
    DxLookup,
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
        DxLookup,
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
        if (this.$store.state.status.server == true) {
            this.chartOptions = {
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Trending Results Chart',
                    align: 'center'
                },
                xAxis: {
                    categories: []
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Trend',
                    data: []
                }]
            }
            
            GET_DATA(this, `/CMRCIRecord/get-cm-rci-record-by-id-info?id=${this.id_record}`, 'atpList', () => {
                if (this.atpList.length > 0) {
                    let chartCategories = [];
                    let chartSeries = [];
                    this.atpList.forEach(item => {
                        chartCategories.push(item.year)
                        chartSeries.push(item.rci_val)
                    });
                    this.chartOptions.xAxis.categories = chartCategories;
                    this.chartOptions.series[0].data = chartSeries;
                }
            });
            GET_DATA(this, '/Md/get-md-month-list', 'monthList');
            const years = []
            for (let index = 0; index < 11; index++) {
                years.push({ id: index, year: 2020 + index })
            }
            this.yearList = years;
        }
    },
    data() {
        return {
            atpList: [],
            formSelect: {},
            yearList: [],
            monthList: [],
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
        CREATE_RECORD(e) {
            e.data.id = 0;
            e.data.id_tag = this.id_record;
            POST_DATA('/CMRCIRecord', e.data, () => { GET_DATA(this, `/CMRCIRecord/get-cm-rci-record-by-id-info?id=${this.id_record}`, 'atpList', () => {
                if (this.atpList.length > 0) {
                    let chartCategories = [];
                    let chartSeries = [];
                    this.atpList.forEach(item => {
                        chartCategories.push(item.year)
                        chartSeries.push(item.rci_val)
                    });
                    this.chartOptions.xAxis.categories = chartCategories;
                    this.chartOptions.series[0].data = chartSeries;
                }
            }); });
        },
        UPDATE_RECORD(e) {
            PUT_DATA(`/CMRCIRecord/${e.key}`, e.data, () => { GET_DATA(this, `/CMRCIRecord/get-cm-rci-record-by-id-info?id=${this.id_record}`, 'atpList', () => {
                if (this.atpList.length > 0) {
                    let chartCategories = [];
                    let chartSeries = [];
                    this.atpList.forEach(item => {
                        chartCategories.push(item.year)
                        chartSeries.push(item.rci_val)
                    });
                    this.chartOptions.xAxis.categories = chartCategories;
                    this.chartOptions.series[0].data = chartSeries;
                }
            }); });
        },
        DELETE_RECORD(e) {
            DELETE_DATA(`/CMRCIRecord/delete-cm-rci-record?id=${e.key}`, () => { GET_DATA(this, `/CMRCIRecord/get-cm-rci-record-by-id-info?id=${this.id_record}`, 'atpList', () => {
                if (this.atpList.length > 0) {
                    let chartCategories = [];
                    let chartSeries = [];
                    this.atpList.forEach(item => {
                        chartCategories.push(item.year)
                        chartSeries.push(item.rci_val)
                    });
                    this.chartOptions.xAxis.categories = chartCategories;
                    this.chartOptions.series[0].data = chartSeries;
                }
            }); });
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