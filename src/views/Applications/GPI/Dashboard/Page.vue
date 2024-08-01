<template>
    <div class="page-container">
        <div class="page-section">
            <highcharts class="chart-wrapper" :options="chartInspTaskRankingOptions" />
            <highcharts class="chart-wrapper" :options="chartInspTaskRankingOptions" />
        </div>
    </div>
</template>

<script>
// import { GET_DATA } from "/axios.js";
// import moment from "moment";
// import DxSelectBox from "devextreme-vue/select-box";
import "devextreme/dist/css/dx.light.css";
export default {
    name: "gpi-dashboard",
    components: {
        // DxSelectBox,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "DASHBOARD",
            subpageInnerName: null,
        });
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
    },
    data() {
        return {
            chartInspTaskRankingOptions: {},
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
    overflow-y: auto;
}

.page-section {
    overflow-y: auto;
    padding: 20px;
    height: calc(100vh - 245px);
    background-color: #eee;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.page-section:last-child {
    padding-bottom: 20px;
}

.chart-wrapper {
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: #fff;
    padding: 10px;
}
</style>
