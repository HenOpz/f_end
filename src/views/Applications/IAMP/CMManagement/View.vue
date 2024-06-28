<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <DxDataGrid 
                    id="data-grid-list" 
                    key-expr="id" 
                    :data-source="cmManagementList"
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
                >
                    <DxEditing 
                        :allow-updating="true" 
                        :allow-deleting="true" 
                        :allow-adding="true" 
                        :use-icons="true"
                        mode="row" 
                    />
                    <DxFilterRow :visible="false" />
                    <DxHeaderFilter :visible="true" />
                    <DxSelection mode="single" />
                    <!-- <DxColumn data-field="id" caption="Item" :width="70" alignment="center" /> -->
                    <DxColumn 
                        data-field="record_month" 
                        caption="Date" 
                        :width="150" 
                        alignment="center"
                        dataType="date" 
                        format="MMM yyyy" 
                        :editor-options="{ placeholder: 'Select Date' }"
                    />
                    <DxColumn
                        data-field="cm_opened" 
                        caption="Opened" 
                        :width="150" 
                        alignment="center" 
                        :editor-options="{ placeholder: 'Opened' }"
                    />
                    <DxColumn 
                        data-field="cm_closed" 
                        caption="Closed" 
                        :width="150" 
                        alignment="center"
                        :editor-options="{ placeholder: 'Closed' }"
                    />
                    <DxColumn
                        data-field="cm_total"
                        caption="Total" 
                        :width="150" 
                        alignment="center"
                        :editor-options="{ placeholder: 'Total' }"
                    />
                    <DxColumn 
                        data-field="note" 
                        caption="Note" 
                        :min-width="150" 
                        alignment="center" 
                        :editor-options="{ placeholder: 'Note' }"
                    />
                    <!-- <DxColumn :width="120" alignment="center" cell-template="action-cell-template" />

                    <template #action-cell-template="{ data }">
                        <div class="action-wrapper">
                            <div @click="SET_CURRENT_VIEW(2, data.data.id)">
                                <img src="/img/svg/pen-svg.svg" class="penSvg" />
                            </div>
                            <div @click="DELETE_RECORD(data)">
                                <img src="/img/svg/trash-svg.svg" class="trashSvg" />
                            </div>
                        </div>
                    </template> -->

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
                        info-text="Page {0} of {1} ({2} items)" />
                    <DxExport :enabled="false" />
                </DxDataGrid>
                <div class="chart-container">
                    <highcharts :options="chartOptions"  />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//API
import { axios } from "/axios.js";
import moment from "moment";
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import exportingInit from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
exportingInit(Highcharts);
offlineExporting(Highcharts);

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
        highcharts: Chart
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "CM WO MANAGEMENT",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.FETCH_CM_WO_MANAGEMENT_RECORD();
            this.FETCH_CM_WO_MANAGEMENT_CHART();
        }
    },
    data() {
        return {
            cmManagementList: {},
            cmwoChart: {},
            platform: [],
            asset: [],
            chartData: {
                xAxis: [],
                total: [],
                opened: [],
                closed: [],
                linear: [],
            },
            chartOptions: {
                credits: {
                    enabled: false
                },
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: 'CM Completion Performance',
                    align: 'center'
                },
                xAxis: {
                    categories: [],
                    title: {
                        enabled: true,
                        text: 'Date',
                        style: {
                            color: '#262261'
                        }
                    },
                    labels: {
                        style: {
                            color: '#262261',
                            fontSize: '10px'
                        }
                    },
                    crosshair: true
                },
                yAxis: [{ 
                    min: 0,
                    max: 50,
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        enabled: false
                    },
                    opposite: true
                }, { 
                    title: {
                        enabled: false
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    
                }],
                tooltip: {
                    shared: true
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: true
                    },
                    column: {
                    dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: true
                    }
                },
                series: [
                    {
                        name: 'CM WO due',
                        type: 'column',
                        yAxis: 1,
                        data: [],
                        color: '#0079FF',
                    }, 
                    {
                        name: 'CM Closed',
                        type: 'line',
                        data: [],
                        color: '#00DFA2'
                    }, 
                    {
                        name: 'Trend',
                        type: 'line',
                        yAxis: 1,
                        data: [],
                        color: '#2CD3E1'
                    }
                    // {
                    //     name: 'Linear',
                    //     type: 'line',
                    //     data: this.GET_TREND_LINE([[0, 416], [1, 389], [2, 383], [3, 364]]),
                    // }
                ]
            }
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
                        "CM-WO-MANAGEMENT.xlsx"
                    );
                });
            });
            e.cancel = true;
        },
        FETCH_CM_WO_MANAGEMENT_RECORD() {
            this.isLoading = true;
            axios({
                method: "get",
                url:
                    "/CMWOManagement",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.cmManagementList = res.data;
                        console.log("cmManagementList", this.cmManagementList);
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
            e.data.id = 0;
            e.data.record_month = moment(e.data.record_month).format("L");
            axios({
                method: "post",
                url: "/CMWOManagement",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: e.data
            })
                .then(res => {
                    if (res.status == 201) {
                        console.log("create success");
                        this.FETCH_CM_WO_MANAGEMENT_RECORD();
                        this.FETCH_CM_WO_MANAGEMENT_CHART();
                    }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => { });
        },
        UPDATE_RECORD(e) {
            e.data.record_month = moment(e.data.record_month).format("L");
            axios({
                method: "put",
                url: "/CMWOManagement/" + e.key,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: e.data
            })
                .then(res => {
                    if (res.status == 204) {
                        console.log("update success");
                        this.FETCH_CM_WO_MANAGEMENT_RECORD();
                        this.FETCH_CM_WO_MANAGEMENT_CHART();
                    }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => { });
        },
        DELETE_RECORD(e) {
            axios({
                method: "delete",
                url: "/CMWOManagement/delete-cm-wo-management?id=" + e.key,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    console.log(res);
                    if (res.status == 204) {
                        console.log("delete success");
                        this.FETCH_CM_WO_MANAGEMENT_RECORD();
                        this.FETCH_CM_WO_MANAGEMENT_CHART();
                    }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => { });
        },
        SET_CURRENT_VIEW(view, data = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", false);
            if (data !== null) this.$emit('currentView', view, data);
            else this.$emit('currentView', view);
        },
        FETCH_CM_WO_MANAGEMENT_CHART(){
            this.isLoading = true;
            axios({
                method: "get",
                url:
                    "/CMWOManagement/get-cm-wo-management-for-chart",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
            .then(res => {
                if (res.status == 200 && res.data) {
                    this.cmwoChart = res.data;
                    for (var i = 0; i < this.cmwoChart.length; i++) {
                        this.chartData.xAxis.push(moment(this.cmwoChart[i].record_month).format("MMM yyyy"));
                        this.chartData.total.push(this.cmwoChart[i].cm_total);
                        this.chartData.opened.push(this.cmwoChart[i].cm_opened);
                        this.chartData.closed.push(this.cmwoChart[i].cm_closed);
                        this.chartData.linear.push([i, this.cmwoChart[i].cm_total]);
                    }
                    console.warn(this.chartData);
                    this.chartOptions.xAxis.categories = this.chartData.xAxis;
                    this.chartOptions.series[0].data = this.chartData.total;
                    this.chartOptions.series[1].data = this.chartData.closed;
                    this.chartOptions.series[2].data = this.GET_TREND_LINE(this.chartData.linear);
                }
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.isLoading = false;
            });
        },
        GET_TREND_LINE(data) {
            const n = data.length;

            let sumX = 0,
                sumY = 0,
                sumXY = 0,
                sumX2 = 0;

            for (let i = 0; i < n; i++) {
                const [x, y] = data[i];
                sumX += x;
                sumY += y;
                sumXY += x * y;
                sumX2 += x ** 2;
            }

            const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);

            const intercept = (sumY - slope * sumX) / n;

            const trendline = []; 

            const minX = Math.min(...data.map(([x]) => x));
            const maxX = Math.max(...data.map(([x]) => x));

            trendline.push([minX, Math.round(minX * slope + intercept)]);
            trendline.push([maxX, Math.round(maxX * slope + intercept)]);

            return trendline;
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

.html-preview-container {
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

    .html-preview {
        width: 900px;
        height: 400px;
        position: absolute !important;
        z-index: 999;
        margin-top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #ffffff !important;
        border-radius: 10px;
        border: #d9d9d9 1px solid;
        padding: 20px;
        overflow-y: scroll;

        .svg-container {
            width: 100%;
            display: flex;
            justify-content: end;
            
            svg {
                cursor: pointer;
            }
        }
    }
}
.chart-container{
    margin-top: 50px;
    width: auto;
    display: flex;
    justify-content: center;
}
</style>