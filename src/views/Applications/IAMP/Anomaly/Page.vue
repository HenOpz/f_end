<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h4 style="margin: 5px 0 15px;">High Risk Equipment Inspection & High Risk Anomaly Status</h4>
                <DxDataGrid 
                    id="data-grid-list" 
                    key-expr="fieldData.id" 
                    :data-source="anomalyList"
                    :selection="{ mode: 'single' }" 
                    :hover-state-enabled="true" 
                    :allow-column-reordering="true"
                    :show-borders="true" 
                    :show-row-lines="true" 
                    :row-alternation-enabled="false"
                    :word-wrap-enabled="true" 
                    :column-auto-width="true"
                    @row-updated="ON_UPDATE"
                >
                    <DxEditing 
                        :allow-updating="true" 
                        :allow-deleting="false" 
                        :allow-adding="false" 
                        :use-icons="true"
                        mode="row"
                    />
                    <DxFilterRow :visible="false" />
                    <DxHeaderFilter :visible="false" />
                    <DxSelection mode="single" />
                    <DxColumn 
                        data-field="fieldData.module_name" 
                        caption="Module" 
                        :width="150" 
                        alignment="left"
                        :allow-editing="false"
                        css-class="module-name"
                    />
                    <DxColumn 
                        data-field="fieldData.inspection_plan_status" 
                        cellTemplate="circle-cell-template"
                        caption="Inspection Status"
                        :width="150"
                        alignment="center"
                        :allow-editing="false"
                    />
                    <DxColumn 
                        data-field="fieldData.anomaly_management_status" 
                        cellTemplate="circle-cell-template"
                        caption="Anomaly Repair" 
                        :width="150" 
                        alignment="center" 
                        :allow-editing="false"
                    />
                    <DxColumn 
                        data-field="fieldData.remark" 
                        caption="Note" 
                        :min-width="300" 
                        alignment="left"
                    />


                    <template #circle-cell-template="{ data }">
                        <div class="circle" :style="{ backgroundColor: GET_STATUS_CELL_COLOR(data) }"></div>
                    </template>

                    <DxScrolling mode="standard" />
                    <DxSearchPanel :visible="false" />
                    <DxPaging :page-size="10" :page-index="0" />
                    <DxPager :show-page-size-selector="true" :allowed-page-sizes="[10, 20, 30]"
                        :show-navigation-buttons="true" :show-info="false" info-text="Page {0} of {1} ({2} items)" />
                    <DxExport :enabled="false" />
                </DxDataGrid>
                <div class="circle-wrapper">
                    <div class="circle-row" v-for="(status, index) in statusList" :key="index">
                        <div class="circle" :style="{ backgroundColor: GET_STATUS_COLOR(status) }" />
                        <span>{{ status }}</span>
                    </div>
                </div>

                <h4 style="margin: 25px 0 15px;">Safety Critical Equipment Inspection & Safety Critical Equipment Anomaly Status</h4>
                <DxDataGrid 
                    id="data-grid-list" 
                    key-expr="fieldData.id" 
                    :data-source="anomalyList"
                    :selection="{ mode: 'single' }" 
                    :hover-state-enabled="true" 
                    :allow-column-reordering="true"
                    :show-borders="true" 
                    :show-row-lines="true" 
                    :row-alternation-enabled="false"
                    :word-wrap-enabled="true" 
                    :column-auto-width="true"
                    @row-updated="ON_UPDATE"
                >
                    <DxEditing 
                        :allow-updating="true" 
                        :allow-deleting="false" 
                        :allow-adding="false" 
                        :use-icons="true"
                        mode="row"
                    />
                    <DxFilterRow :visible="false" />
                    <DxHeaderFilter :visible="false" />
                    <DxSelection mode="single" />
                    <DxColumn 
                        data-field="fieldData.module_name" 
                        caption="Module" 
                        :width="150" 
                        alignment="left"
                        :allow-editing="false"
                        css-class="module-name"
                    />
                    <DxColumn 
                        data-field="fieldData.inspection_plan_status" 
                        cellTemplate="circle-cell-template"
                        caption="Inspection Status"
                        :width="150"
                        alignment="center"
                        :allow-editing="false"
                    />
                    <DxColumn 
                        data-field="fieldData.anomaly_management_status" 
                        cellTemplate="circle-cell-template"
                        caption="Anomaly Repair" 
                        :width="150" 
                        alignment="center" 
                        :allow-editing="false"
                    />
                    <DxColumn 
                        data-field="fieldData.remark" 
                        caption="Note" 
                        :min-width="300" 
                        alignment="left"
                    />


                    <template #circle-cell-template="{ data }">
                        <div class="circle" :style="{ backgroundColor: GET_STATUS_CELL_COLOR(data) }"></div>
                    </template>

                    <DxScrolling mode="standard" />
                    <DxSearchPanel :visible="false" />
                    <DxPaging :page-size="10" :page-index="0" />
                    <DxPager :show-page-size-selector="true" :allowed-page-sizes="[10, 20, 30]"
                        :show-navigation-buttons="true" :show-info="false" info-text="Page {0} of {1} ({2} items)" />
                    <DxExport :enabled="false" />
                </DxDataGrid>
                <div class="circle-wrapper">
                    <div class="circle-row" v-for="(status, index) in statusList" :key="index">
                        <div class="circle" :style="{ backgroundColor: GET_STATUS_COLOR(status) }" />
                        <span>{{ status }}</span>
                    </div>
                </div>


            </div>
            <!-- <div class="page-chart" style="display: none;">
                <h4 style="margin: 5px 0;">Management of Very High Risk Equipment & Very High Risk Anomaly</h4>
                <div class="grid-chart">
                    <div v-for="chart in chartOptions" :key="chart.id">
                        <Chart :dataChart="chart" style="grid-column: span 1;"/>
                    </div>
                </div>
                
            </div> -->
        </div>
    </div>
</template>

<script>
// import Chart from '@/views/Applications/IAMP/Anomaly/Chart.vue'

import { axiosFileMaker } from "/axios.js";
import "devextreme/dist/css/dx.light.css";
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

//Structures

export default {
    name: "executive-summary",
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
        // Chart
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "EXECUTIVE SUMMARY",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.FETCH_FILE_MAKER_RECORD();
            this.FETCH_CHART();
            this.statusList = ['Not due', 'On due', 'Overdue'];
        }
    },
    data() {
        return {
            statusList: null,
            anomalyList: {},
            dataGridAttributes: {
                class: "data-grid-style"
            },
            chartData: {},
            chartOptions : [],
        };
    },
    computed: {},
    methods: {
        GENERATE_SESSION(action, data) {
            axiosFileMaker({
                method: "POST",
                url: "/CPOC_AIMS/sessions",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic dmlzaXRvcjpBaW1zMjAyMg=="
                },
                data: {}
            })
                .then(res => {
                    localStorage.setItem("cpoc_aims_token", JSON.stringify(res.data.response.token));
                    if (action == 'fetch_file') {
                        this.FETCH_FILE_MAKER_RECORD();
                    } else if (action == 'on_update') {
                        this.ON_UPDATE(data);
                    } else if (action == 'fetch_chart') {
                        this.FETCH_CHART();
                    }
                })
                .catch(error => {
                    console.log("api", error);
                })
        },
        FETCH_FILE_MAKER_RECORD() {
            axiosFileMaker({
                method: "GET",
                url: "/CPOC_AIMS/layouts/executive_summary_table/records?_limit=10",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("cpoc_aims_token")),
                },
            })
                .then(res => {
                    this.anomalyList = res.data.response.data;
                    console.log('executive_summary_table', this.anomalyList);
                })
                .catch(error => {
                    console.log("api", error);
                    this.GENERATE_SESSION('fetch_file', '');
                })
        },
        ON_UPDATE(e) {
            console.log(e);
            const param = e.data.fieldData.id + '||' + e.data.fieldData.remark;
            console.log('param', param);
            axiosFileMaker({
                method: "GET",
                url: "/CPOC_AIMS/layouts/executive_summary_table/script/api_update_executive_remark?script.param=" + param,
                headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("cpoc_aims_token")),
                },
            })
                .then(res => {
                    console.log(res);
                    this.FETCH_FILE_MAKER_RECORD();
                })
                .catch(error => {
                    console.log("api", error);
                    //this.GENERATE_SESSION('on_update', e);
                })
        },
        FETCH_CHART() {
            axiosFileMaker({
                method: "GET",
                url: "/CPOC_AIMS/layouts/executive_summary_chart/records?_limit=1",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("cpoc_aims_token")),
                },
            })
                .then(res => {
                    console.log('FETCH_CHART', res);
                    this.chartData = res.data;
                    // console.log('chart data ',this.chartData);
                    this.chartOptions = [
                        { 
                            id: 'chart1', 
                            name : 'Piping Inspection Plan',
                            ondue: this.chartData.response.data[0].fieldData.piping_insp_not_due,
                            overdue: this.chartData.response.data[0].fieldData.piping_insp_on_due,
                            notdue: this.chartData.response.data[0].fieldData.piping_insp_overdue,
                            note: '-'
                        },
                        { 
                            id: 'chart2', 
                            name : 'Piping Anomaly Management',
                            ondue: this.chartData.response.data[0].fieldData.piping_anom_not_due,
                            overdue: this.chartData.response.data[0].fieldData.piping_anom_on_due,
                            notdue: this.chartData.response.data[0].fieldData.piping_anom_overdue,
                            note: this.chartData.response.data[0].fieldData.piping_anom_note
                        },
                        { 
                            id: 'chart3', 
                            name : 'Pressure Vessel Inspection Plan',
                            ondue: this.chartData.response.data[0].fieldData.vessel_insp_not_du,
                            overdue: this.chartData.response.data[0].fieldData.vessel_insp_on_due,
                            notdue: this.chartData.response.data[0].fieldData.vessel_insp_overdue,
                            note: '-'
                        },
                        { 
                            id: 'chart4', 
                            name : 'Pressure Vessel Anomaly Management',
                            ondue: this.chartData.response.data[0].fieldData.vessel_anom_not_due,
                            overdue: this.chartData.response.data[0].fieldData.vessel_anom_on_due,
                            notdue: this.chartData.response.data[0].fieldData.vessel_anom_overdue,
                            note: this.chartData.response.data[0].fieldData.vessel_anom_note
                        },
                        { 
                            id: 'chart5', 
                            name : 'Flowline Inspection Plan',
                            ondue: this.chartData.response.data[0].fieldData.flowline_insp_not_due,
                            overdue: this.chartData.response.data[0].fieldData.flowline_insp_on_due,
                            notdue: this.chartData.response.data[0].fieldData.flowline_insp_overdue,
                            note: this.chartData.response.data[0].fieldData.flowline_inspection_plan_note
                        },
                        { 
                            id: 'chart6', 
                            name : 'Flowline Anomaly Management',
                            ondue: this.chartData.response.data[0].fieldData.flowline_anom_not_due,
                            overdue: this.chartData.response.data[0].fieldData.flowline_anom_on_due,
                            notdue: this.chartData.response.data[0].fieldData.flowline_anom_overdue,
                            note: this.chartData.response.data[0].fieldData.flowline_anom_note
                        },
                        { 
                            id: 'chart7', 
                            name : 'Pipeline Inspection Plan',
                            ondue: this.chartData.response.data[0].fieldData.pipeline_insp_not_due,
                            overdue: this.chartData.response.data[0].fieldData.pipeline_insp_on_due,
                            notdue: this.chartData.response.data[0].fieldData.pipeline_insp_overdue,
                            note: this.chartData.response.data[0].fieldData.pipeline_inspection_plan_note
                        },
                        { 
                            id: 'chart8', 
                            name : 'Pipeline Anomaly Management',
                            ondue: this.chartData.response.data[0].fieldData.pipeline_anom_not_due,
                            overdue: this.chartData.response.data[0].fieldData.pipeline_anom_on_due,
                            notdue: this.chartData.response.data[0].fieldData.pipeline_anom_overdue,
                            note: this.chartData.response.data[0].fieldData.pipeline_anom_note
                        },
                        { 
                            id: 'chart9', 
                            name : 'Topside Riser Inspection Plan',
                            ondue: this.chartData.response.data[0].fieldData.topside_riser_insp_not_due,
                            overdue: this.chartData.response.data[0].fieldData.topside_riser_insp_on_due,
                            notdue: this.chartData.response.data[0].fieldData.topside_riser_insp_overdue,
                            note: this.chartData.response.data[0].fieldData.topside_riser_inspection_plan_note
                        },
                        { 
                            id: 'chart10', 
                            name : 'Topside Riser Anomaly Management',
                            ondue: this.chartData.response.data[0].fieldData.topside_riser_anom_not_due,
                            overdue: this.chartData.response.data[0].fieldData.topside_riser_anom_on_due,
                            notdue: this.chartData.response.data[0].fieldData.topside_riser_anom_overdue,
                            note: this.chartData.response.data[0].fieldData.topside_riser_anom_note
                        },
                        { 
                            id: 'chart11', 
                            name : 'Subsea Riser Inspection Plan',
                            ondue: this.chartData.response.data[0].fieldData.subsea_riser_insp_not_due,
                            overdue: this.chartData.response.data[0].fieldData.subsea_riser_insp_on_due,
                            notdue: this.chartData.response.data[0].fieldData.subsea_riser_insp_overdue,
                            note: this.chartData.response.data[0].fieldData.subsea_riser_inspection_plan_note
                        },
                        { 
                            id: 'chart12', 
                            name : 'Subsea Riser Anomaly Management',
                            ondue: this.chartData.response.data[0].fieldData.subsea_riser_anom_not_due,
                            overdue: this.chartData.response.data[0].fieldData.subsea_riser_anom_on_due,
                            notdue: this.chartData.response.data[0].fieldData.subsea_riser_anom_overdue,
                            note: this.chartData.response.data[0].fieldData.subsea_riser_anom_note
                        },
                        { 
                            id: 'chart13', 
                            name : 'Structure Inspection Plan',
                            ondue: this.chartData.response.data[0].fieldData.structure_insp_not_due,
                            overdue: this.chartData.response.data[0].fieldData.structure_insp_on_due,
                            notdue: this.chartData.response.data[0].fieldData.structure_insp_overdue,
                            note: this.chartData.response.data[0].fieldData.structure_inspection_plan_note
                        },
                        { 
                            id: 'chart14', 
                            name : 'Structure Anomaly Management',
                            ondue: this.chartData.response.data[0].fieldData.structure_anom_not_due,
                            overdue: this.chartData.response.data[0].fieldData.structure_anom_on_due,
                            notdue: this.chartData.response.data[0].fieldData.structure_anom_overdue,
                            note: this.chartData.response.data[0].fieldData.structure_anom_note
                        },
                    ];
                })
                .catch(error => {
                    console.log("api", error);
                    this.GENERATE_SESSION('fetch_chart', '');
                })
        },
        GET_STATUS_CELL_COLOR(value) {
            if (value.rowType === "data" && value.column.dataField === "fieldData.inspection_plan_status") {
                switch (value.data.fieldData.inspection_plan_status) {
                    case 'overdue': return '#C00000';
                    case 'not due': return '#43A047';
                    case 'on due': return '#FFFF00';

                    default: return '#000';
                }
            }
            else if (value.rowType === "data" && value.column.dataField === "fieldData.anomaly_management_status") {
                switch (value.data.fieldData.anomaly_management_status) {
                    case 'overdue': return '#C00000';
                    case 'not due': return '#43A047';
                    case 'on due': return '#FFFF00';

                    default: return '#000';
                }
            }
        },
        GET_STATUS_COLOR(value) {
            const status = value.toLowerCase();
            switch (status) {
                case 'overdue': return '#C00000';
                case 'not due': return '#43A047';
                case 'on due': return '#FFFF00';

                default: return '#000';
            }
        },
        
    }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.circle-wrapper {
    margin-top: 10px;
    display: flex;
    gap: 20px;

    .circle-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;

        .circle {
            display: block !important;
            margin: 0;
        }

        span {
            font-size: 12px;
        }
    }
}

.circle {
    display: flex;
    margin: 0 auto;
    width: 22px;
    height: 22px;
    border-radius: 50%;
}

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

.grid-chart{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 15px;
    margin-bottom: 180px;
    margin-top: -10px;
}
.page-chart{
    margin-top: 1.5rem;
}

.table-wrapper {
    margin-bottom: 200px;
}
</style>