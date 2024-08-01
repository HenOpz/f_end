<template>
    <div>
        <div class="page-container">
            <div class="page-section">
                <div class="table-wrapper">
                    <div span-5 class="table-tabs-buttons">
                        <button 
                            v-for="(tab, index) in tabs" 
                            :key="index" 
                            :class="active_tab === tab ? 'active' : ''"
                            @click="active_tab = tab"
                        >
                            {{ tab }}
                        </button>
                    </div>
                    <div style="justify-self: end;">
                        <DxSelectBox
                            style="width: 130px; height: 45px; font-weight: 600;"
                            :items="yearList"
                            value-expr="code_name"
                            display-expr="code_name"
                            placeholder="Select Year"
                            v-model="yearSelected"
                        />
                    </div>
                    <div fill v-if="active_tab === tabs[1]" >
                        <div style="display: none;">
                            <div class="box" style="background-color: #66FF33">
                                <div class="text-p">
                                Created
                                    <div class="text-p-sub">Green</div>
                                </div>
                                <div class="text-v">
                                2,321
                                </div>
                            </div>
                            <div class="box" style="background-color: #FFFF00">
                                <div class="text-p">
                                Pending
                                    <div class="text-p-sub">Yellow</div>
                                </div>
                                <div class="text-v">
                                388
                                </div>
                            </div>
                            <div class="box" style="background-color: #FF0000">
                                <div class="text-p">
                                Overdue
                                    <div class="text-p-sub">Red</div>
                                </div>
                                <div class="text-v">
                                1,095
                                </div>
                            </div>
                        </div>
                        <div class="table-chart" style="border: 1px solid #ddd; display: none;">
                            <div class="chart-container pie-chart-wrapper">
                                <highcharts :options="charPipingDueOptions" />
                            </div>
                            <div class="chart-container pie-chart-wrapper">
                                <highcharts :options="charFlowlineDueOptions" />
                            </div>
                            <div class="chart-container pie-chart-wrapper">
                                <highcharts :options="charPressureVesselDueOptions" />
                            </div>
                            <div class="chart-container pie-chart-wrapper">
                                <highcharts :options="charPipelineDueOptions" />
                            </div>
                            <div class="chart-container pie-chart-wrapper">
                                <highcharts :options="charOurRiserDueOptions" />
                            </div>
                            <div class="chart-container pie-chart-wrapper">
                                <highcharts :options="charInRiserDueOptions" />
                            </div>
                            <div class="chart-container pie-chart-wrapper">
                                <highcharts :options="charCylinderDueOptions" />
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                            <div style="grid-column: span 2" class="chart-wrapper">
                                <div style="display: grid; grid-template-columns: auto;">
                                    <h4 style="text-align: center; margin-top: 8px;">Pending To Create Inspection Task</h4>
                                </div>
                                <div style="display: flex; margin-bottom: 15px;">
                                    <div class="box">
                                        <div class="text-v">
                                            3,804
                                        </div>
                                        <div class="text-p total">
                                            Total
                                        </div>
                                    </div>
                                    <div class="box">
                                        <div class="text-v">
                                            1,438
                                        </div>
                                        <div class="text-p pending">
                                            Pending
                                        </div>
                                    </div>
                                </div>
                                <div id="month-data" style="display: grid; grid-template-columns: 100px repeat(12, 1fr); font-weight: 600; gap: 5px; margin-bottom: 5px; font-size: 12px;">
                                    <span style="display: flex; align-items: center; justify-content: center;">
                                        
                                    </span>
                                    <span v-for="(month, index) in monthList" :key="'month-' + index" style="display: flex; align-items: center; justify-content: center;">
                                        {{ month.month_code }}
                                    </span>

                                </div>

                                <div style="display: grid; grid-template-columns: 100px repeat(12, 1fr); font-weight: 600; gap: 5px; margin-bottom: 5px; font-size: 12px;">
                                    <span style="display: flex; align-items: center; justify-content: center; background-color: #0e6efd; padding: 5px; color: #fff;">Total</span>
                                    <span v-for="(due, index) in dueList" :key="'total-' + index" style="display: flex; align-items: center; justify-content: center; background-color: #eee;">
                                        {{ due }}
                                    </span>

                                </div>

                                <div style="display: grid; grid-template-columns: 100px repeat(12, 1fr); font-weight: 600; gap: 5px; margin-bottom: 5px; font-size: 12px;">
                                    <span style="display: flex; align-items: center; justify-content: center; background-color: #ffff00; padding: 5px;">Pending</span>
                                    <span v-for="(due, index) in dueList" :key="'due-' + index" style="display: flex; align-items: center; justify-content: center; background-color: #eee;">
                                        {{ due }}
                                    </span>

                                </div>

                                <highcharts class="chart-wrapper" :options="chartInspDueOptions" :key="chartInspDueOptions" />
                            

                            </div>
                            <highcharts class="chart-wrapper" :options="chartInspDueStatusOptions" />
                            <highcharts class="chart-wrapper" :options="chartInspDueByEquipOptions" />
                        </div>
                    </div>
                    <div fill v-if="active_tab === tabs[2]">
                        <div style="display: flex;">
                            <div class="box" style="background-color: #66FF33">
                                <div class="text-p">
                                Inspected
                                    <div class="text-p-sub">Green</div>
                                </div>
                                <div class="text-v">
                                1,144
                                </div>
                            </div>
                            <div class="box" style="background-color: #FFFF00">
                                <div class="text-p">
                                Pending
                                    <div class="text-p-sub">Yellow</div>
                                </div>
                                <div class="text-v">
                                1,046
                                </div>
                            </div>
                            <div class="box" style="background-color: #FF0000">
                                <div class="text-p">
                                Overdue
                                    <div class="text-p-sub">Red</div>
                                </div>
                                <div class="text-v">
                                122
                                </div>
                            </div>
                        </div>
                        <div class="table-chart" style="border: 1px solid #ddd;">
                            <div class="chart-container pie-chart-wrapper">
                                <highcharts :options="charPipingTaskOptions" />
                            </div>
                            <div class="chart-container pie-chart-wrapper">
                                <highcharts :options="charFlowlineTaskOptions" />
                            </div>
                            <div class="chart-container pie-chart-wrapper">
                                <highcharts :options="charPressureVesselTaskOptions" />
                            </div>
                            <div class="chart-container pie-chart-wrapper">
                                <highcharts :options="charPipelineTaskOptions" />
                            </div>
                            <div class="chart-container pie-chart-wrapper">
                                <highcharts :options="charOurRiserTaskOptions" />
                            </div>
                            <div class="chart-container pie-chart-wrapper">
                                <highcharts :options="charInRiserTaskOptions" />
                            </div>
                            <div class="chart-container pie-chart-wrapper">
                                <highcharts :options="charCylinderTaskOptions" />
                            </div>
                        </div>
                    </div>
                    <div fill v-if="active_tab === tabs[0]">
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                            <div style="grid-column: span 2" class="chart-wrapper">
                                <div style="display: grid; grid-template-columns: auto">
                                    <h4 style="text-align: center; margin-top: 8px;">Inspection Task Summary</h4>
                                </div>
                                <div style="display: flex; margin-bottom: 15px;">
                                    <div class="box">
                                        <div class="text-v">
                                            2,405
                                        </div>
                                        <div class="text-p pending">
                                            Plan
                                        </div>
                                    </div>
                                    <div class="box">
                                        <div class="text-v">
                                            1,403
                                        </div>
                                        <div class="text-p inspected">
                                            Inspected
                                        </div>
                                    </div>
                                    <div class="box">
                                        <div class="text-v">
                                            1,002
                                        </div>
                                        <div class="text-p overdue">
                                            Overdue
                                        </div>
                                    </div>
                                </div>
                                <div id="month-data" style="display: grid; grid-template-columns: 100px repeat(12, 1fr); font-weight: 600; gap: 5px; margin-bottom: 5px; font-size: 12px;">
                                    <span style="display: flex; align-items: center; justify-content: center;">
                                        
                                    </span>
                                    <span v-for="(month, index) in monthList" :key="'month-' + index" style="display: flex; align-items: center; justify-content: center;">
                                        {{ month.month_code }}
                                    </span>
                                </div>

                                <div style="display: grid; grid-template-columns: 100px repeat(12, 1fr); font-weight: 600; gap: 5px; margin-bottom: 5px; font-size: 12px;">
                                    <span style="display: flex; align-items: center; justify-content: center; background-color: #ffff00; padding: 5px;">Plan</span>
                                    <span v-for="(due, index) in dueList" :key="'due-' + index" style="display: flex; align-items: center; justify-content: center; background-color: #eee;">
                                        {{ due }}
                                    </span>
                                </div>

                                <div style="display: grid; grid-template-columns: 100px repeat(12, 1fr); font-weight: 600; gap: 5px; margin-bottom: 35px; font-size: 12px;">
                                    <span style="display: flex; align-items: center; justify-content: center; background-color: #66FF33; padding: 5px;">Inspected</span>
                                    <span v-for="(closed, index) in closedList" :key="'closed-' + index" style="display: flex; align-items: center; justify-content: center; background-color: #eee;">
                                        {{ closed }}
                                    </span>
                                </div>
                                

                                <highcharts style="grid-column: span 2;"  :options="chartInspTaskOptions" />
                            

                            </div>
                            <highcharts class="chart-wrapper" :options="chartInspTaskRankingOptions" />
                            <highcharts class="chart-wrapper" :options="chartInspTaskByEquipOptions" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GET_DATA } from "/axios.js";
// import { axios } from "/axios.js";
// import moment from "moment";
import DxSelectBox from 'devextreme-vue/select-box';
import "devextreme/dist/css/dx.light.css";
export default {
    name: "iamp-dashboard",
    components: {
        DxSelectBox
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "DASHBOARD",
            subpageInnerName: null,
        });
        GET_DATA(this, '/Md/get-md-month-list', 'monthList');
        const years = []
        for (let index = 0; index < 11; index++) {
            years.push({ id: index, code_name: 2020 + index })
        }
        this.yearList = years;
        this.charPipingDueOptions = {
            title: {
                text: 'Piping',
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
                    y: 1024,
                    y_number: 1024,
                    color: "#FF0000",
                }, {
                    name: 'Pending',
                    y: 309,
                    y_number: 309,
                    color: "#FFFF00",
                }, {
                    name: 'Created',
                    y: 1403,
                    y_number: 1403,
                    color: "#66FF33",
                }]
            }],
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Number: <b>{point.y_number}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}:</b><br>{point.y_number}',
                        distance: -70,
                        filter: {
                            property: 'y_number',
                            operator: '>',
                            value: 0
                        }
                    }
                },        
            },
        };
        this.charFlowlineDueOptions = {
            title: {
                text: 'Flowline',
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
                    y: 12,
                    y_number: 12,
                    color: "#FF0000",
                }, {
                    name: 'Pending',
                    y: 44,
                    y_number: 44,
                    color: "#FFFF00",
                }, {
                    name: 'Created',
                    y: 389,
                    y_number: 389,
                    color: "#66FF33",
                }]
            }],
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Number: <b>{point.y_number}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}:</b><br>{point.y_number}',
                        distance: -80,
                    }
                }
            },
        };
        this.charPressureVesselDueOptions = {
            title: {
                text: 'Pressure Vessel',
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
                    y: 52,
                    y_number: 52,
                    color: "#FF0000",
                }, {
                    name: 'Pending',
                    y: 31,
                    y_number: 31,
                    color: "#FFFF00",
                }, {
                    name: 'Created',
                    y: 105,
                    y_number: 105,
                    color: "#66FF33",
                }]
            }],
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Number: <b>{point.y_number}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}:</b><br>{point.y_number}',
                        distance: -80,
                        filter: {
                            property: 'y_number',
                            operator: '>',
                            value: 0
                        }
                    }
                }
            },
        };
        this.charPipelineDueOptions = {
            title: {
                text: 'Pipeline',
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
                    y: 7,
                    y_number: 7,
                    color: "#FF0000",
                }, {
                    name: 'Pending',
                    y: 4,
                    y_number: 4,
                    color: "#FFFF00",
                }, {
                    name: 'Created',
                    y: 2,
                    y_number: 2,
                    color: "#66FF33",
                }]
            }],
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Number: <b>{point.y_number}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}:</b><br>{point.y_number}',
                        distance: -80,
                        filter: {
                            property: 'y_number',
                            operator: '>',
                            value: 0
                        }
                    }
                }
            },
        };
        this.charOurRiserDueOptions = {
            title: {
                text: 'Outgoing Riser',
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
                    y: 0,
                    y_number: 0,
                    color: "#FF0000",
                }, {
                    name: 'Pending',
                    y: 0,
                    y_number: 0,
                    color: "#FFFF00",
                }, {
                    name: 'Created',
                    y: 18,
                    y_number: 18,
                    color: "#66FF33",
                }]
            }],
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Number: <b>{point.y_number}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}:</b><br>{point.y_number}',
                        distance: -80,
                        filter: {
                            property: 'y_number',
                            operator: '>',
                            value: 0
                        }
                    }
                }
            },
        };
        this.charInRiserDueOptions = {
            title: {
                text: 'Incoming Riser',
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
                    y: 0,
                    y_number: 0,
                    color: "#FF0000",
                }, {
                    name: 'Pending',
                    y: 0,
                    y_number: 0,
                    color: "#FFFF00",
                }, {
                    name: 'Created',
                    y: 17,
                    y_number: 17,
                    color: "#66FF33",
                }]
            }],
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Number: <b>{point.y_number}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}:</b><br>{point.y_number}',
                        distance: -80,
                        filter: {
                            property: 'y_number',
                            operator: '>',
                            value: 0
                        }
                    }
                }
            },
        };
        this.charCylinderDueOptions = {
            title: {
                text: 'Cylinder',
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
                    y: 0,
                    y_number: 0,
                    color: "#FF0000",
                }, {
                    name: 'Pending',
                    y: 0,
                    y_number: 0,
                    color: "#FFFF00",
                }, {
                    name: 'Created',
                    y: 378,
                    y_number: 378,
                    color: "#66FF33",
                }]
            }],
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Number: <b>{point.y_number}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}:</b><br>{point.y_number}',
                        distance: -80,
                        filter: {
                            property: 'y_number',
                            operator: '>',
                            value: 0
                        }
                    }
                }
            },
        };
        this.charPipingTaskOptions = {
            title: {
                text: 'Piping',
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
                    y: 103,
                    y_number: 103,
                    color: "#FF0000",
                }, {
                    name: 'Pending',
                    y: 900,
                    y_number: 900,
                    color: "#FFFF00",
                }, {
                    name: 'Inspected',
                    y: 400,
                    y_number: 400,
                    color: "#66FF33",
                }]
            }],
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Number: <b>{point.y_number}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}:</b><br>{point.y_number}',
                        distance: -70,
                        filter: {
                            property: 'y_number',
                            operator: '>',
                            value: 0
                        }
                    }
                },        
            },
        };
        this.charFlowlineTaskOptions = {
            title: {
                text: 'Flowline',
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
                    y: 9,
                    y_number: 9,
                    color: "#FF0000",
                }, {
                    name: 'Pending',
                    y: 100,
                    y_number: 100,
                    color: "#FFFF00",
                }, {
                    name: 'Inspected',
                    y: 280,
                    y_number: 280,
                    color: "#66FF33",
                }]
            }],
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Number: <b>{point.y_number}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}:</b><br>{point.y_number}',
                        distance: -80,
                    }
                }
            },
        };
        this.charPressureVesselTaskOptions = {
            title: {
                text: 'Pressure Vessel',
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
                    y: 10,
                    y_number: 10,
                    color: "#FF0000",
                }, {
                    name: 'Pending',
                    y: 45,
                    y_number: 45,
                    color: "#FFFF00",
                }, {
                    name: 'Inspected',
                    y: 50,
                    y_number: 50,
                    color: "#66FF33",
                }]
            }],
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Number: <b>{point.y_number}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}:</b><br>{point.y_number}',
                        distance: -80,
                        filter: {
                            property: 'y_number',
                            operator: '>',
                            value: 0
                        }
                    }
                }
            },
        };
        this.charPipelineTaskOptions = {
            title: {
                text: 'Pipeline',
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
                    y: 0,
                    y_number: 0,
                    color: "#FF0000",
                }, {
                    name: 'Pending',
                    y: 1,
                    y_number: 1,
                    color: "#FFFF00",
                }, {
                    name: 'Inspected',
                    y: 1,
                    y_number: 1,
                    color: "#66FF33",
                }]
            }],
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Number: <b>{point.y_number}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}:</b><br>{point.y_number}',
                        distance: -80,
                        filter: {
                            property: 'y_number',
                            operator: '>',
                            value: 0
                        }
                    }
                }
            },
        };
        this.charOurRiserTaskOptions = {
            title: {
                text: 'Outgoing Riser',
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
                    y: 0,
                    y_number: 0,
                    color: "#FF0000",
                }, {
                    name: 'Pending',
                    y: 0,
                    y_number: 0,
                    color: "#FFFF00",
                }, {
                    name: 'Inspected',
                    y: 18,
                    y_number: 18,
                    color: "#66FF33",
                }]
            }],
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Number: <b>{point.y_number}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}:</b><br>{point.y_number}',
                        distance: -80,
                        filter: {
                            property: 'y_number',
                            operator: '>',
                            value: 0
                        }
                    }
                }
            },
        };
        this.charInRiserTaskOptions = {
            title: {
                text: 'Incoming Riser',
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
                    y: 0,
                    y_number: 0,
                    color: "#FF0000",
                }, {
                    name: 'Pending',
                    y: 0,
                    y_number: 0,
                    color: "#FFFF00",
                }, {
                    name: 'Inspected',
                    y: 17,
                    y_number: 17,
                    color: "#66FF33",
                }]
            }],
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Number: <b>{point.y_number}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}:</b><br>{point.y_number}',
                        distance: -80,
                        filter: {
                            property: 'y_number',
                            operator: '>',
                            value: 0
                        }
                    }
                }
            },
        };
        this.charCylinderTaskOptions = {
            title: {
                text: 'Cylinder',
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
                    y: 0,
                    y_number: 0,
                    color: "#FF0000",
                }, {
                    name: 'Pending',
                    y: 0,
                    y_number: 0,
                    color: "#FFFF00",
                }, {
                    name: 'Inspected',
                    y: 378,
                    y_number: 378,
                    color: "#66FF33",
                }]
            }],
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Number: <b>{point.y_number}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}:</b><br>{point.y_number}',
                        distance: -80,
                        filter: {
                            property: 'y_number',
                            operator: '>',
                            value: 0
                        }
                    }
                }
            },
        };
        this.chartInspTaskOptions = {
            credits: {
                enabled: false
            },
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: '',
                style: {
                    fontSize: '16px',
                    fontWeight: '600',
                }
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                title: {
                    enabled: true,
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
                crosshair: true,
            },
            yAxis: {
                title: {
                    text: 'Total',
                },
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: '9px'
                        }
                    },
                    enableMouseTracking: true
                },
                column: {
                dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: '9px'
                        }
                    },
                    enableMouseTracking: true
                }
            },
            series: [
                {
                    name: 'Plan',
                    type: 'column',
                    data: [2,3,4,5,6,7,1,1,1,1,1,1],
                    color: '#ffff00',
                },
                {
                    name: 'Inspected',
                    type: 'line',
                    data: [1,2,3,4,5,6,1,1,1,1,1,1],
                    color: '#66FF33'
                }, 
            ]
        };
        this.chartInspTaskRankingOptions = {
            title: {
                text: 'Inspection Task By Risk Ranking',
                align: 'center',
                style: {
                    fontSize: '16px',
                    fontWeight: '600',
                }
            },
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
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
                    name: 'Very High',
                    y: 144,
                    y_number: 3,
                    color: "#FF0000",
                }, {
                    name: 'High',
                    y: 320,
                    y_number: 12,
                    color: "#FD9A00",
                }, {
                    name: 'Medium',
                    y: 241,
                    y_number: 241,
                    color: "#ffff00",
                }, {
                    name: 'Low',
                    y: 378,
                    y_number: 378,
                    color: "#66FF33",
                }]
            }],
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Number: <b>{point.y_number}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    borderWidth: 2,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}:</b><br>{point.y}',
                        distance: 20
                    }
                },
            },
        };
        this.chartInspTaskByEquipOptions = {
            credits: {
                enabled: false
            },
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Inspection Task By Equipment',
                style: {
                    fontSize: '16px',
                    fontWeight: '600',
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: '9px'
                        }
                    },
                    groupPadding: 0.1
                }
            },
            xAxis: {
                categories: ['Piping', 'Flowline', 'Pressure Vessel', 'Pipeline', 'Outgoing Riser', 'Incoming Riser', 'Cylinder'],
                crosshair: true,
                accessibility: {
                    description: 'Months'
                }
            },
            series: [
                {
                    name: 'Plan',
                    color: '#ffff00',
                    data: [3, 9, 16, 4, 7, 5, 6]
                },
                {
                    name: 'Inspected',
                    color: '#66FF33',
                    data: [3, 5, 12, 4, 7, 4, 6]
                }
            ]
        };
        this.chartInspDueStatusOptions = {
            credits: {
                enabled: false
            },
            chart: {
                type: 'pie',
                custom: {},
                events: {
                    render() {
                        const chart = this,
                            series = chart.series[0];
                        let customLabel = chart.options.chart.custom.label;

                        if (!customLabel) {
                            customLabel = chart.options.chart.custom.label =
                                chart.renderer.label(
                                    'Total<br/>' +
                                    '<strong>3,804</strong>'
                                )
                                    .css({
                                        color: '#000',
                                        textAnchor: 'middle',
                                    })
                                    .add();
                        }
                        const x = series.center[0] + chart.plotLeft,
                            y = series.center[1] + chart.plotTop -
                            (customLabel.attr('height') / 2);

                        customLabel.attr({
                            x,
                            y
                        });
                        // Set font size based on chart diameter
                        customLabel.css({
                            fontSize: `${series.center[2] / 12}px`
                        });
                    }
                }
            },
            title: {
                text: 'Inspection Due Status Summary Chart',
                align: 'center',
                style: {
                    fontSize: '16px',
                    fontWeight: '600',
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    borderWidth: 2,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}:</b><br>{point.y}',
                        distance: 20
                    }
                },
            },
            series: [{
                name: 'Total',
                colorByPoint: true,
                innerSize: '75%',
                data: [{
                    name: 'Created',
                    y: 2321,
                    color: "#66FF33",
                }, {
                    name: 'Pending',
                    y: 388,
                    color: '#ffff00'
                }, {
                    name: 'Overdue',
                    y: 1095,
                    color: '#ff0000'
                }]
            }],
        };
        this.chartInspDueByEquipOptions = {
            credits: {
                enabled: false
            },
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Inspection Due By Equipment',
                align: 'center',
                style: {
                    fontSize: '16px',
                    fontWeight: '600',
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: '9px'
                        }
                    },
                    groupPadding: 0.1
                }
            },
            yAxis: {
                title: {
                    text: 'Total',
                },
            },
            xAxis: {
                categories: ['Piping', 'Flowline', 'Pressure Vessel', 'Pipeline', 'Outgoing Riser', 'Incoming Riser', 'Cylinder'],
                crosshair: true,
                accessibility: {
                    description: 'Equipment'
                },
                labels: {
                    style: {
                        fontSize: '10px',
                    }
                },
            },
            series: [
                {
                    name: 'Created',
                    data: [1403, 389, 105, 2, 18, 17, 378],
                    color: "#66FF33",
                },
                {
                    name: 'Pending',
                    data: [329, 44, 31, 4, 0, 0, 0],
                    color: '#ffff00'
                },
                {
                    name: 'Overdue',
                    data: [1024, 12, 52, 7, 0, 0, 0],
                    color: '#ff0000'
                }, 
            ], 
        };
        this.chartInspDueOptions = {
            credits: {
                enabled: false
            },
            chart: {
                type: 'column'
            },
            title: {
                text: '',
                style: {
                    fontSize: '16px',
                    fontWeight: '600',
                }
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: '9px'
                        }
                    },
                    groupPadding: 0.1
                }
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                crosshair: true,
            },
            series: [
                {
                    name: 'Total',
                    color: '#0e6efd',
                    data: [3, 9, 16, 4, 7, 5, 6]
                },
                {
                    name: 'Pending',
                    color: '#ffff00',
                    data: [3, 5, 12, 4, 7, 4, 6]
                }
            ]
        };
    },
    data() {
        return {
            tabs: ['Overview', 'Inspection Due'],
            active_tab: 'Overview',
            yearList: {},
            yearSelected: 2024,
            charPipingDueOptions: {},
            charFlowlineDueOptions: {},
            charPressureVesselDueOptions: {},
            charPipelineDueOptions: {},
            charOurRiserDueOptions: {},
            charInRiserDueOptions: {},
            charCylinderDueOptions: {},
            charPipingTaskOptions: {},
            charFlowlineTaskOptions: {},
            charPressureVesselTaskOptions: {},
            charPipelineTaskOptions: {},
            charOurRiserTaskOptions: {},
            charInRiserTaskOptions: {},
            charCylinderTaskOptions: {},
            chartInspTaskOptions: {},
            chartInspTaskRankingOptions: {},
            chartInspTaskByEquipOptions: {},
            chartInspDueOptions: {},
            chartInspDueStatusOptions: {},
            chartInspDueByEquipOptions: {},
            monthList: [],
            dueList: [2,2,2,2,2,2,1,1,1,1,1,1],
            closedList: [2,2,2,2,2,2,1,1,1,1,1,1],
        };
    },
    computed: {},
    methods: {
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
}

.page-section {
    padding: 20px;
    overflow-y: auto;
    height: calc(100vh - 245px);
    grid-row: span 2;
    background-color: #eee;
}

.table-wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 15px;

    *[span-2] {
        grid-column: span 2;
    }

    *[span-3] {
        grid-column: span 3;
    }

    *[span-4] {
        grid-column: span 4;
    }

    *[span-5] {
        grid-column: span 5;
    }

    *[span-6] {
        grid-column: span 6;
    }

    *[fill] {
        grid-column: span 6;
    }

    .table-tabs-buttons {
        display: flex;
        flex-direction: row;
        gap: 5px;

        button {
            border-radius: 0;
            padding: 10px;
            width: 130px;
        }
        .active {
            color: white;
            background-color: $web-theme-color-secondary;
            border: solid 1px $web-theme-color-secondary;
        }
    }

    .table-chart {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 5px;
    }
    
    .pie-chart-wrapper {
        padding: 10px;
    }

    button {
        padding: 10px 0;
        background-color: white;
        border: solid 1px #ccc;
        border-radius: 10px;
        font-weight: 600;
        font-size: 14px;
        transition: 1s;
        cursor: pointer;
    }
}

.page-section:last-child {
    padding-bottom: 20px;
}

.box {
    display: block;
    width: 120px;
    border-radius: 8px;
    margin-right: 10px;
    grid-template-columns: 60% 40%;
    align-content: center;
    color: #333;
    opacity: 1;
    cursor: pointer;
    border: 1px solid #eee;
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    padding-left: 15px;
    .text-p {
        font-size: 12px;
        width: fit-content;
        padding: 2px 6px;
        border-radius: 4px;
    }
    .text-v {
        align-self: center;
        font-size: 24px;
        font-weight: 600;
    }
    .center {
        align-self: center;
    }
}
.inspected {
    background-color: #66FF33;
}

.pending {
    background-color: #ffff00;
}

.overdue {
    background-color: #ff0000;
    color: #fff;
}

.total {
    background-color: #0e6efd;
    color: #fff;
}

.chart-wrapper {
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    border-radius: 10px;
    background-color: #fff;
    padding: 10px;
}
</style>