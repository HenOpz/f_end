<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <div style="display: flex; gap: 30px;">
                    <h5 style="margin: 0;">Platform: {{ platform }}</h5>
                    <h5 style="margin: 0;">Pipeline: {{ tagNo }}</h5>
                </div>

                <DxDataGrid
                    id="data-grid-list"
                    key-expr="id"
                    :ref="gridRefName"
                    :data-source="ciList"
                    :hover-state-enabled="true"
                    :allow-column-reordering="true"
                    :show-borders="true"
                    :show-row-lines="true"
                    :row-alternation-enabled="false"
                    :column-hiding-enabled="false"
                    :word-wrap-enabled="true"
                    :column-auto-width="true"
                    @cell-prepared="onCellPrepared"
                >
                <DxEditing
                    :allow-updating="false"
                    :allow-deleting="false"
                    :allow-adding="false"
                    :use-icons="true"
                    mode="form"
                >
                    
                </DxEditing>
                <DxFilterRow :visible="false" />
                <DxHeaderFilter :visible="true" />

                <DxColumn
                    data-field="record_date"
                    caption="Date" 
                    alignment="center"
                    :min-width="100"
                    dataType="date" 
                    format="dd MMM yyyy" 
                />

                <DxColumn
                    data-field="gas_flow_rate_mmscfd"
                    caption="Gas Flow Rate (MMscfd)" 
                    alignment="center"
                    :width="120"
                    :format="formatDecimal2"
                />
                <DxColumn 
                    data-field="req_ci_injection_rate_liters_mmscfd" 
                    caption="Required C/I Injection Rate (liters/MMscfd)" 
                    alignment="center"  
                    :width="130"
                    :format="formatDecimal3"
                />
                <DxColumn 
                    data-field="req_ci_rate_liters_day" 
                    caption="Required C/I Rate Liters/day)" 
                    alignment="center"
                    :width="120"
                    :format="formatDecimal3"
                />
                <DxColumn
                    data-field="yesterday_ci_tank_level_percent"
                    caption="Yesterdays (06.00hrs) CI Tank Level (%)" 
                    alignment="center"
                    :width="120"
                    :format="formatDecimal3"
                />
                <DxColumn
                    data-field="today_ci_tank_level_percent"
                    caption="Todays (06.00hrs) CI Tank Level (%)" 
                    alignment="center"
                    :width="120"
                    :format="formatDecimal3"
                />
                <DxColumn
                    data-field="actual_ci_injection_liters_day"
                    caption="Actual C/I Injection (liters/day)" 
                    alignment="center"
                    :width="120"
                    :format="formatDecimal3"
                />
                <DxColumn
                    data-field="id_status"
                    caption="Result" 
                    alignment="center"
                    :width="120"
                >
                    <DxLookup :data-source="statusList" display-expr="severity_level" value-expr="id" />
                </DxColumn>
    
                <DxToolbar>
                    <DxItem
                        location="before"
                        template="monthFilterTemplate"
                    />
                    <DxItem
                        location="before"
                        template="yearFilterTemplate"
                    />
                    <DxItem
                        location="after"
                        name="searchPanel"
                    />
                </DxToolbar>

                <template #monthFilterTemplate>
                    <DxSelectBox 
                        :items="monthList" 
                        value-expr="id" 
                        display-expr="month_code"
                        placeholder="Select Month" 
                        v-model="date.month"
                        style="width: 100px;"
                    />
                </template>

                <template #yearFilterTemplate>
                    <DxSelectBox 
                        :items="yearList" 
                        value-expr="id" 
                        display-expr="year_code"
                        placeholder="Select Year" 
                        v-model="date.year"
                        style="width: 100px;"
                    />
                </template>
                
                <!-- <DxFilterRow :visible="true" /> -->
                <DxScrolling mode="standard" />
                <DxSearchPanel :visible="false" />
                <DxPaging :page-size="10" :page-index="0" />
                <DxPager 
                    :show-page-size-selector="true" 
                    :allowed-page-sizes="[10, 15, 31]" 
                    :show-navigation-buttons="true"
                    :show-info="true" 
                    info-text="Page {0} of {1} ({2} items)" 
                />
                <DxExport :enabled="false" />
                </DxDataGrid>

                <div class="chart-container">
                    <highcharts :options="chartOptions"  />
                </div>
            </div>
            <div style="text-align: center;">
                <button @click="$emit('popup')">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import { GET_DATA } from "/axios.js";
import moment from "moment";
import clone from "just-clone";
import "devextreme/dist/css/dx.light.css";
import { DxItem } from "devextreme-vue/form";
import DxSelectBox from 'devextreme-vue/select-box';
// import DxSelectBox from 'devextreme-vue/select-box';
// import { Workbook } from "exceljs";
// import saveAs from "file-saver";
// import { exportDataGrid } from "devextreme/excel_exporter";

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
    DxEditing,
    DxToolbar,
    DxLookup,
    DxFilterRow,
} from "devextreme-vue/data-grid";

export default {
    name: "chemical-injection-detail",
    props: {
        infoData: Object,
        selectedYear: Number,
        selectedMonth: Number
    },
    components: {
        DxDataGrid,
        DxSearchPanel,
        DxPaging,
        DxPager,
        DxScrolling,
        DxColumn,
        DxExport,
        DxHeaderFilter,
        DxEditing,
        highcharts: Chart,
        DxItem,
        DxToolbar,
        DxSelectBox,
        DxLookup,
        DxFilterRow
    },
    created() {
        if (this.$store.state.status.server == true) {
            this.tagInfo = clone(this.infoData);
            
            const years = []
            for (let index = 0; index < 11; index++) {
                years.push({ id: 2020 + index, year_code: 2020 + index })
            }
            this.yearList = years;
            this.date.month = this.selectedMonth;
            this.date.year = this.selectedYear;

            GET_DATA(this, '/Md/get-md-cm-chem-inj-status-list', 'statusList');
            GET_DATA(this, '/CMInfo', 'cmTagList', (data) => {
                this.GET_INFO_DATA(data);
            });
            GET_DATA(this, '/Md/get-md-month-list', 'monthList');
            this.FETCH_CHEM_INJECTION();
        }
    },
    data() {
        return {
            tagNo: null,
            platform: null,
            cmTagList: [],
            platformList: [],
            ciList: [],
            chartOptions: {},
            statusList: [],
            monthList: [],
            yearList: [],
            date: {
                month: null,
                year: null
            },
            gridRefName: "grid",
            formatDecimal2: {
                type: 'fixedPoint',
                precision: 2,
            },
            formatDecimal3: {
                type: 'fixedPoint',
                precision: 3,
            },
        };
    },
    computed: {},
    watch: {
        'date.month': function() {
            this.FETCH_CHEM_INJECTION();
        },
        'date.year': function() {
            this.FETCH_CHEM_INJECTION();
        }
    },
    methods: {
        FETCH_CHEM_INJECTION() {
            GET_DATA(this, `/CMChemInjectionRecord/ByTagMonthYear/${this.infoData.id_tag}/${this.date.month}/${this.date.year}`, 'ciList', () => {
                let categories = [];
                let actualLitersDay = [];
                let reqLitersDay = [];

                this.ciList.forEach(item => {
                    categories.push(moment(item.record_date).format("YYYY MM DD"));
                    actualLitersDay.push(item.actual_ci_injection_liters_day);
                    reqLitersDay.push(item.req_ci_rate_liters_day);
                });
                
                this.chartOptions = {
                    title: {
                        text: 'Trending Results Chart',
                        align: 'center'
                    },
                    xAxis: {
                        categories: categories
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
                        name: 'Actual',
                        data: actualLitersDay
                    },
                    {
                        name: 'Required C/I',
                        data: reqLitersDay
                    }]
                };
            });
        },
        GET_INFO_DATA(data) {
            const info = data.filter(c => c.id == this.tagInfo.id_tag);
            this.tagNo = info[0].tag_no;
            GET_DATA(this, '/Md/get-md-platform-list', 'platformList', (dataP) => {
                const platform = dataP.filter(p => p.id == info[0].id_platform);
                this.platform = platform[0].code_name;
            });
        },
        toggleDate(e) {
            console.log(e);
            GET_DATA(this, '/CMChemInjectionRecord/ByDate/' + moment(e.value).format("YYYY-MM-DD"), 'cmChemInjectionList');
        },
        onCellPrepared(e) {
            if(e.rowType === "data" && e.column.dataField === "id_status") {
                e.cellElement.style.backgroundColor = this.GET_STATUS_COLOR(e.row.data.id_status);
            }
        },
        GET_STATUS_COLOR(value) {
            if(value) {
            const v = this.statusList.filter(i => i.id == value);
            return v[0].color_code;
            } else {
                return '#ffffff';
            }
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
        position: absolute !important;
        z-index: 999;
        top: 0;
        left: 0;
        background-color: #14141484;
    }

    .page-section {
        width: 1000px;
        padding: 20px;
        overflow-y: auto;
        height: 600px;
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
        grid-template-columns: repeat(1, 1fr);
        gap: 15px;

        *[fill] {
            grid-column: span 2;
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
    button {
        padding: 10px 0;
        background-color: white;
        border: solid 1px gray;
        border-radius: 10px;
        font-weight: 600;
        font-size: 14px;
        transition: 1s;
        cursor: pointer;
        width: 100px;
    }
</style>