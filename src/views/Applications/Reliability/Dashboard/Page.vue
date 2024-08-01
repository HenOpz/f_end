<template>
    <div class="page-container">
        <div class="page-section">

            <div
                style="
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 15px;
                "
            >
                <highcharts
                    class="chart-wrapper"
                    :options="chartStatusOptions"
                />
                <highcharts
                    class="chart-wrapper"
                    :options="chartStatusOptions"
                />
                <highcharts
                    class="chart-wrapper"
                    :options="chartMainWorkCtrOptions"
                />
                <highcharts
                    class="chart-wrapper"
                    :options="chartMainWorkCtrOptions"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { GET_DATA } from "/axios.js";
// import { axios } from "/axios.js";
// import moment from "moment";
// import DxSelectBox from "devextreme-vue/select-box";
import "devextreme/dist/css/dx.light.css";

export default {
    name: "reliability-dashboard",
    components: {
        // DxSelectBox,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "DASHBOARD",
            subpageInnerName: null,
        });
        GET_DATA(this, '/Md/get-md-month-list', 'monthList');
        const years = [];
        for (let index = 0; index < 11; index++) {
            years.push({ id: index, code_name: 2020 + index });
        }
        this.yearList = years;
        this.chartDueOptions = {
            credits: {
                enabled: false
            },
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: '',
                style: {
                    fontSize: '14px',
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
                    name: 'Opened',
                    type: 'column',
                    data: [2,3,4,5,6,7,1,1,1,1,1,1],
                    color: '#ffff00',
                },
                {
                    name: 'Closed',
                    type: 'line',
                    data: [1,2,3,4,5,6,1,1,1,1,1,1],
                    color: '#00DFA2'
                }, 
            ]
        };
        this.chartStatusOptions = {
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
                text: 'Failure Report Status Summary Chart',
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
                    name: 'Closed',
                    y: 2321,
                    color: "#43A047",
                }, {
                    name: 'Opened',
                    y: 388,
                    color: '#ffff00'
                }, {
                    name: 'Overdue',
                    y: 1095,
                    color: '#ff0000'
                }]
            }],
        };
        this.chartMainWorkCtrOptions = {
            credits: {
                enabled: false,
            },
            chart: {
                type: "column",
            },
            title: {
                text: "Failure Report Main WorkCtr Summary Chart",
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
                categories: [
                    "MECH",
                    "ELEC",
                    "INSP",
                    "CONS",
                    "INST",
                    "OPER",
                ],
                crosshair: true,
                accessibility: {
                    description: "Main WorkCtr",
                },
            },
            series: [
                {
                    name: "Overdue",
                    data: [282, 192, 12, 212, 192, 213],
                    color: '#ff0000'
                },
                {
                    name: "Opened",
                    data: [114, 104, 14, 24, 64, 65],
                    color: '#ffff00'
                },
                {
                    name: "Closed",
                    data: [586, 486, 16, 456, 386, 387],
                    color: "#43A047",
                },
            ],
        };
    },
    data() {
        return {
            yearList: {},
            yearSelected: null,
            chartDueOptions: {},
            chartStatusOptions: {},
            chartMainWorkCtrOptions: {},
            monthList: [],
            dueList: [2,2,2,2,2,2,1,1,1,1,1,1],
            closedList: [2,2,2,2,2,2,1,1,1,1,1,1],
        };
    },
    computed: {},
    methods: {},
};
</script>

<style
    lang="scss"
    scoped
>
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
        grid-template-columns: repeat(3, 1fr);
        gap: 5px;
    }

    .pie-chart-wrapper {
        padding: 10px;
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
}

.chart-wrapper {
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: #fff;
    padding: 10px;
}
</style>
