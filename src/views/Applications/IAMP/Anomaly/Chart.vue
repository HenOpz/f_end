<template>
    <div class="page-chart">
        <div class="chart-title">
            {{ dataChart.name }}
        </div>
        <div class="chart">
            <highcharts :options="chartOption"  />
        </div>
        <div class="note">
            {{ dataChart.note }}
        </div>
    </div>
</template>

<script>
import exportingInit from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
exportingInit(Highcharts);
offlineExporting(Highcharts);

//DataGrid
import "devextreme/dist/css/dx.light.css";
// import { chart } from "highcharts";

export default {
    name: "inspection-record",
    props: {
        dataChart: Object,
    },
    components: {
        highcharts: Chart
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "CM WO MANAGEMENT",
            subpageInnerName: null,
        });
    },
    data() {
        return {
            chartOption: {
                chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: '',
                    align: 'left'
                },
                tooltip: {
                    headerFormat: '<b>{point.key}</b><br>',
                    pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Total: <b>{point.y}</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        borderRadius: 5,
                        size: '80%',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true

                    }
                },
                colors: ["#43A047","#FFFF00","#C00000"],
                series: [{
                    name: 'Percent',
                    colorByPoint: true,
                    data: [{
                        name: 'not due',
                        y: this.dataChart.ondue,
                    },  {
                        name: 'on due',
                        y: this.dataChart.overdue,
                    },  {
                        name: 'Overdue',
                        y: this.dataChart.notdue,
                    }]
                }]
            },
        }
    },
    computed: {},
    methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.page-chart {
    .chart-title {
        font-size: 12px;
        font-weight: 600;
        color: white;
        // grid-column: span 1;
        margin-bottom: 0;
        margin-top: 0; 
        margin-right: 17px;
        padding: 10px; 
        background-color: #291F85;
        display: flex;
        justify-content: center;
    }

    .chart{
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        margin-right: 17px;
    }

    .note{
        padding: 10px;
        font-size: 12px;
        font-weight: 400;
        border: 1px solid #ddd;
        margin-right: 17px;
        min-height: 50px;
    }
}

</style>