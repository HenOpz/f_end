<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px;">
                    <div class="chart-container pie-chart-wrapper">
                        <highcharts :options="chartLongTermOptions" />
                    </div>
                    <div class="chart-container pie-chart-wrapper">
                        <highcharts :options="chartLongTermDiscOptions" />
                    </div>
                </div>
                <DxDataGrid
                    id="data-grid-list" 
                    key-expr="id" 
                    :data-source="longTermRecordList"
                    :selection="{ mode: 'single' }" 
                    :hover-state-enabled="true" 
                    :allow-column-reordering="true"
                    :show-borders="true" 
                    :show-row-lines="true" 
                    :row-alternation-enabled="false"
                    :word-wrap-enabled="true" 
                    :column-auto-width="true"
                    style="font-size: 12px;"
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
                    <DxColumn data-field="fa_number" caption="Action No." :width="130" alignment="center" />
                    <DxColumn data-field="tag_no" caption="Tag No." :width="120" alignment="center" />
                    <DxColumn data-field="wo_no" caption="SAP WO No." :width="120" alignment="center" />
                    <DxColumn data-field="action_details" caption="Action Detail" :min-width="200" alignment="left" />
                    <DxColumn data-field="action_date" caption="Due Date" :width="120" alignment="center"
                        dataType="date" format="dd MMM yyyy" />
                    <DxColumn data-field="id_discipline" caption="Discipline" :width="100" alignment="center">
                        <DxLookup :data-source="formSelect.discipline" display-expr="discipline" value-expr="id" />
                    </DxColumn>
                    <DxColumn data-field="id_failure_action_status" caption="Status" :width="100" alignment="center">
                        <DxLookup :data-source="formSelect.status" display-expr="status" value-expr="id" />
                    </DxColumn>
                    <!-- <DxColumn :width="80" alignment="center" cell-template="action-cell-template" /> -->

                    <!-- <template #action-cell-template="{ data }">
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
                    <DxPager :show-page-size-selector="true" :allowed-page-sizes="[10, 20, 30]"
                        :show-navigation-buttons="true" :show-info="false" info-text="Page {0} of {1} ({2} items)" />
                    <DxExport :enabled="false" />
                </DxDataGrid>
            </div>
        </div>
    </div>
</template>

<script>
import { GET_DATA, DELETE_DATA } from "/axios.js";
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
    DxLookup,
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
        DxLookup,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "LONG-TERM REPAIR",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.FETCH_DISCIPLINE();
            this.FETCH_STATUS();
            this.FETCH_LONG_TERM_RECORD();
            this.chartLongTermOptions = {
                title: {
                    text: 'Long-Term Repair',
                    align: 'center'
                },
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    height: 300,
                },
                legend: {
                    enabled: true,
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Total',
                    data: [
                    {
                        name: 'Overdue',
                        y: 15,
                        y_number: 15,
                        color: "#FF0000",
                    }, {
                        name: 'Pending',
                        y: 201,
                        y_number: 201,
                        color: "#FFFF00",
                    }, {
                        name: 'Closed',
                        y: 342,
                        y_number: 342,
                        color: "#43A047",
                    }]
                }],
                tooltip: {
                    headerFormat: '<b>{point.key}</b><br>',
                    pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Number: <b>{point.y_number}</b>'
                },
                plotOptions: {
                    pie: {
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}<br><b>Total: {point.y_number}</b>',
                        },
                        showInLegend: false,
                        borderWidth: 1,
                        borderColor: '#eeeeee'
                    },       
                },
            };
            this.chartLongTermDiscOptions = {
                title: {
                    text: 'Discipline',
                    align: 'center'
                },
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    height: 300,
                },
                legend: {
                    enabled: true,
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Failure Impact',
                    data: [
                    {
                        name: 'AUTO',
                        y: 28,
                        y_number: 28,
                    }, {
                        name: 'MECH',
                        y: 56,
                        y_number: 56,

                    }, {
                        name: 'ELEC',
                        y: 27,
                        y_number: 27,
                    }, 
                    {
                        name: 'INSP',
                        y: 0,
                        y_number: 0,
                    }, 
                    {
                        name: 'CONS',
                        y: 26,
                        y_number: 26,
                    }, {
                        name: 'INST',
                        y: 30,
                        y_number: 30,
                    }, {
                        name: 'OPER',
                        y: 25,
                        y_number: 25,
                    }
                    // , {
                    //     name: 'KL-MECH',
                    //     y: 0,
                    //     y_number: 0,
                    // }
                    // , {
                    //     name: 'KL-INSP',
                    //     y: 0,
                    //     y_number: 0,
                    // }
                    // , {
                    //     name: 'KL-ELEC',
                    //     y: 0,
                    //     y_number: 0,
                    // }
                    // , {
                    //     name: 'KL-INST',
                    //     y: 0,
                    //     y_number: 0,
                    // }, {
                    //     name: 'KL-OPER',
                    //     y: 0,
                    //     y_number: 0,
                    // }
                    ]
                }],
                tooltip: {
                    headerFormat: '<b>{point.key}</b><br>',
                    pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Number: <b>{point.y_number}</b>'
                },
                plotOptions: {
                    pie: {
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}<br><b>Total: {point.y_number}</b>',
                        },
                        showInLegend: false,
                        borderWidth: 1,
                        borderColor: '#eeeeee'
                    },       
                },
            };
        }
    },
    data() {
        return {
            testList: null,
            longTermRecordList: {},
            chartLongTermOptions: {},
            chartLongTermDiscOptions: {},
            dataGridAttributes: {
                class: "data-grid-style"
            },
            formSelect: [
                {
                    discipline: {},
                    status: {}
                }
            ]
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
                        "SHORT-TERM-ACTION.xlsx"
                    );
                });
            });
            e.cancel = true;
        },
        FETCH_LONG_TERM_RECORD() {
            GET_DATA(this, '/FailureActionRecord', (data) => {
                const list = [];
                data.forEach(data => {
                    if (data.action_type == 'long-term')
                        list.push(data)
                });
                this.longTermRecordList = list;
            });
        },
        DELETE_RECORD(e) {
            DELETE_DATA(`/FailureActionRecord/delete-failure-action-record?id=${e.key}`, () => { this.FETCH_LONG_TERM_RECORD(); });
        },
        SET_CURRENT_VIEW(view, data = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", false);
            if (data !== null) this.$emit('currentView', view, data);
            else this.$emit('currentView', view);
        },
        FETCH_DISCIPLINE() {
            GET_DATA(this, '/Md/get-md-failure-discipline-list', 'formSelect.discipline');
        },
        FETCH_STATUS() {
            GET_DATA(this, '/Md/get-md-failure-action-status-list', 'formSelect.status');
        },
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