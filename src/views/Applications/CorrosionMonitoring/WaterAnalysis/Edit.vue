<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h5 fill style="margin-bottom: 0; margin-top: 0;">Tag Number: {{ dataInfo.tag_no }}</h5>
                <div fill class="table-tabs-buttons">
                    <button 
                        v-for="(tab, index) in tabs" 
                        :key="index" 
                        :class="active_tab === tab ? 'active' : ''"
                        @click="active_tab = tab"
                    >
                        {{ tab }}
                    </button>
                </div>
                <div fill v-if="active_tab === tabs[0]" class="table-chart">
                    <div>
                        <DxDataGrid 
                            id="data-grid-dashboard" 
                            key-expr="id" 
                            :element-attr="dataGridAttributesPh"
                            :data-source="pHList"
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
                                :allow-adding="false" 
                                :use-icons="true"
                                mode="row" 
                            />
                            <DxFilterRow :visible="false" />
                            <DxHeaderFilter :visible="true" />
                            <DxPaging :page-size="8" :page-index="0" />
                            <DxPager 
                                :show-page-size-selector="true" 
                                :allowed-page-sizes="[8, 16, 24]" 
                                :show-navigation-buttons="true"
                                :show-info="true" 
                                info-text="Page {0} of {1} ({2} items)" 
                            />
                            <DxColumn 
                                data-field="year" 
                                caption="Year" 
                                :width="dxColumnWidth[0]" 
                                alignment="center"
                                :editor-options="{ placeholder: 'Select' }"
                                sort-order="desc"
                            >
                                <DxLookup :data-source="yearList" />
                                <DxRequiredRule />
                            </DxColumn>
                            <DxColumn
                                data-field="period" 
                                caption="Period" 
                                :width="dxColumnWidth[1]" 
                                alignment="center" 
                                :editor-options="{ placeholder: 'Select' }"
                                sort-order="desc"
                            >
                                <DxLookup :data-source="periodList" />
                                <DxRequiredRule />
                            </DxColumn>
                            <DxColumn 
                                data-field="ph_val" 
                                caption="pH" 
                                :width="dxColumnWidth[2]" 
                                alignment="center"
                                :editor-options="{ placeholder: 'pH' }"
                                :format="formatDecimal2"
                            />
                        </DxDataGrid>
                    </div>
                    <div class="chart-container">
                        <highcharts :options="chartPhOptions" :key="'chart-ph-' + chartPhOptions.id"  />
                    </div>
                </div>

                <div fill v-if="active_tab === tabs[1]" class="table-chart">
                    <div>
                        <DxDataGrid 
                            id="data-grid-dashboard" 
                            key-expr="id" 
                            :element-attr="dataGridAttributesCO2"
                            :data-source="co2List"
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
                            :onCellPrepared="onCellPrepared"
                        >
                            <DxEditing 
                                :allow-updating="true" 
                                :allow-deleting="true" 
                                :allow-adding="false" 
                                :use-icons="true"
                                mode="row" 
                            />
                            <DxFilterRow :visible="false" />
                            <DxHeaderFilter :visible="true" />
                            <DxPaging :page-size="8" :page-index="0" />
                            <DxPager 
                                :show-page-size-selector="true" 
                                :allowed-page-sizes="[8, 16, 24]" 
                                :show-navigation-buttons="true"
                                :show-info="true" 
                                info-text="Page {0} of {1} ({2} items)" 
                            />
                            <DxColumn 
                                data-field="year" 
                                caption="Year" 
                                :width="dxColumnWidth[0]" 
                                alignment="center"
                                :editor-options="{ placeholder: 'Select' }"
                                sort-order="desc"
                            >
                                <DxLookup :data-source="yearList" />
                                <DxRequiredRule />
                            </DxColumn>
                            <DxColumn
                                data-field="period" 
                                caption="Period" 
                                :width="dxColumnWidth[1]" 
                                alignment="center" 
                                :editor-options="{ placeholder: 'Select' }"
                                sort-order="desc"
                            >
                                <DxLookup :data-source="periodList" />
                                <DxRequiredRule />
                            </DxColumn>
                            <DxColumn 
                                data-field="co2_val" 
                                caption="CO2 (%)" 
                                :width="dxColumnWidth[2]" 
                                alignment="center"
                                :editor-options="{ placeholder: 'CO2' }"
                                :format="formatDecimal2"
                            />
                        </DxDataGrid>
                    </div>
                    <div class="chart-container">
                        <highcharts :options="chartCO2Options" :key="'chart-co2-' + chartCO2Options.id"  />
                    </div>
                </div>

                <div fill v-if="active_tab === tabs[2]" class="table-chart">
                    <div>
                        <DxDataGrid 
                            id="data-grid-dashboard" 
                            key-expr="id" 
                            :element-attr="dataGridAttributesDissolved"
                            :data-source="dissolvedList"
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
                            :onCellPrepared="onCellPrepared"
                        >
                            <DxEditing 
                                :allow-updating="true" 
                                :allow-deleting="true" 
                                :allow-adding="false" 
                                :use-icons="true"
                                mode="row" 
                            />
                            <DxFilterRow :visible="false" />
                            <DxHeaderFilter :visible="true" />
                            <DxPaging :page-size="8" :page-index="0" />
                            <DxPager 
                                :show-page-size-selector="true" 
                                :allowed-page-sizes="[8, 16, 24]" 
                                :show-navigation-buttons="true"
                                :show-info="true" 
                                info-text="Page {0} of {1} ({2} items)" 
                            />
                            <DxColumn 
                                data-field="year" 
                                caption="Year" 
                                :width="dxColumnWidth[0]" 
                                alignment="center"
                                :editor-options="{ placeholder: 'Select' }"
                                sort-order="desc"
                            >
                                <DxLookup :data-source="yearList" />
                                <DxRequiredRule />
                            </DxColumn>
                            <DxColumn
                                data-field="period" 
                                caption="Period" 
                                :width="dxColumnWidth[1]" 
                                alignment="center" 
                                :editor-options="{ placeholder: 'Select' }"
                                sort-order="desc"
                            >
                                <DxLookup :data-source="periodList" />
                                <DxRequiredRule />
                            </DxColumn>
                            <DxColumn 
                                data-field="dissolved_o2_val" 
                                caption="Dissolved O2 (ppb)" 
                                :width="dxColumnWidth[2]" 
                                alignment="center"
                                :editor-options="{ placeholder: 'Dissolved O2' }"
                                :format="formatDecimal2"
                            />
                        </DxDataGrid>
                    </div>
                    <div class="chart-container">
                        <highcharts :options="chartDissolveO2Options" :key="'chart-dissolved-' + chartDissolveO2Options.id"  />
                    </div>
                </div>

                <div fill v-if="active_tab === tabs[3]" class="table-chart">
                    <div>
                        <DxDataGrid 
                            id="data-grid-dashboard" 
                            key-expr="id" 
                            :element-attr="dataGridAttributesIon"
                            :data-source="ionCountList"
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
                                :allow-adding="false" 
                                :use-icons="true"
                                mode="row" 
                            />
                            <DxFilterRow :visible="false" />
                            <DxHeaderFilter :visible="true" />
                            <DxPaging :page-size="8" :page-index="0" />
                            <DxPager 
                                :show-page-size-selector="true" 
                                :allowed-page-sizes="[8, 16, 24]" 
                                :show-navigation-buttons="true"
                                :show-info="true" 
                                info-text="Page {0} of {1} ({2} items)" 
                            />
                            <DxColumn 
                                data-field="year" 
                                caption="Year" 
                                :width="dxColumnWidth[0]" 
                                alignment="center"
                                :editor-options="{ placeholder: 'Select' }"
                                sort-order="desc"
                            >
                                <DxLookup :data-source="yearList" />
                                <DxRequiredRule />
                            </DxColumn>
                            <DxColumn
                                data-field="period" 
                                caption="Period" 
                                :width="dxColumnWidth[1]" 
                                alignment="center" 
                                :editor-options="{ placeholder: 'Select' }"
                                sort-order="desc"
                            >
                                <DxLookup :data-source="periodList" />
                                <DxRequiredRule />
                            </DxColumn>
                            <DxColumn 
                                data-field="ion_count" 
                                caption="Ion Count" 
                                :width="dxColumnWidth[2]" 
                                alignment="center"
                                :editor-options="{ placeholder: 'Ion Count' }"
                                :format="formatDecimal2"
                            />
                        </DxDataGrid>
                    </div>
                    <div class="chart-container">
                        <highcharts :options="chartIonOptions" :key="'chart-ion-' + chartIonOptions.id"  />
                    </div>
                </div>

                <div fill v-if="active_tab === tabs[4]" class="table-chart">
                    <div fill>
                        <DxDataGrid 
                            id="data-grid-list" 
                            key-expr="id" 
                            :element-attr="dataGridAttributesHydro"
                            :data-source="hydroList"
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
                            <DxPaging :page-size="8" :page-index="0" />
                            <DxPager 
                                :show-page-size-selector="true" 
                                :allowed-page-sizes="[8, 16, 24]" 
                                :show-navigation-buttons="true"
                                :show-info="true" 
                                info-text="Page {0} of {1} ({2} items)" 
                            />
                            <DxColumn 
                                data-field="record_date" 
                                caption="Date" 
                                :width="dxColumnWidth[0]" 
                                alignment="center"
                                sort-order="desc"
                                dataType="date"
                                format="dd MMM yyyy"
                            >
                            </DxColumn>
                            <DxColumn 
                                data-field="cr_90_per_mm_yr" 
                                caption="CR 90% (mm/yr)" 
                                :width="dxColumnWidth[2]" 
                                alignment="center"
                                :editor-options="{ placeholder: 'CR 90%' }"
                                :format="formatDecimal2"
                            />
                            <DxColumn 
                                data-field="cr_95_per_mm_yr" 
                                caption="CR 95% (mm/yr)" 
                                :width="dxColumnWidth[2]" 
                                alignment="center"
                                :format="formatDecimal2"
                            />
                            <DxColumn 
                                data-field="cr_99_per_mm_yr" 
                                caption="CR 99% (mm/yr)" 
                                :width="dxColumnWidth[2]" 
                                alignment="center"
                                :format="formatDecimal2"
                            />
                            <DxColumn 
                                data-field="cr_not_injected_mm_yr" 
                                caption="CR Not Injected (mm/yr)" 
                                :width="dxColumnWidth[2]" 
                                alignment="center"
                                :format="formatDecimal2"
                            />
                        </DxDataGrid>
                    </div>
                    <div class="chart-container" fill>
                        <highcharts :options="chartHydroOptions" :key="'chart-hydro-' + chartHydroOptions.id"  />
                    </div>
                </div>

                <button fill @click="$emit('popup')">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import { GET_DATA, PUT_DATA, POST_DATA, DELETE_DATA } from "/axios.js";
import "devextreme/dist/css/dx.light.css";
import exportingInit from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import moment from "moment";
exportingInit(Highcharts);
offlineExporting(Highcharts);

import {
    DxDataGrid,
    DxPaging,
    DxPager,
    DxColumn,
    DxHeaderFilter,
    DxEditing,
    DxFilterRow,
    DxLookup,
    DxRequiredRule,
} from "devextreme-vue/data-grid";

export default {
    name: "edit-water-analysis-result",
    props: {
        dataInfo: Object,
    },
    components: {
        DxDataGrid,
        DxPaging,
        DxPager,
        DxColumn,
        DxHeaderFilter,
        DxEditing,
        DxFilterRow,
        DxLookup,
        DxRequiredRule,
        highcharts: Chart
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "WATER ANALYSIS",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            console.log('dataInfo', this.dataInfo);
            GET_DATA(this, '/Md/get-md-cm-water-analysis-status-list/', 'dissolvedStatusList');
            this.FETCH_PH();
            this.FETCH_CO2();
            this.FETCH_DISSOLVED_O2();
            this.FETCH_ION();
            this.FETCH_HYDRO();
        }
    },
    data() {
        return {
            pHList: [],
            dissolvedList: [],
            dissolvedStatusList: [],
            ionCountList: [],
            co2List: [],
            hydroList: [],
            libraryList: [],
            tabs: ['pH', 'CO2', 'Dissolved O2', 'Fe Count', 'Hydro Dynamic'],
            active_tab: 'pH',
            chartPhOptions: {},
            chartDissolveO2Options: {},
            chartIonOptions: {},
            chartCO2Options: {},
            chartHydroOptions: {},
            dataGridAttributesPh: {
                class: "data-grid-list-ph"
            },
            dataGridAttributesDissolved: {
                class: "data-grid-list-dissolved"
            },
            dataGridAttributesIon: {
                class: "data-grid-list-ion"
            },
            dataGridAttributesCO2: {
                class: "data-grid-list-co2"
            },
            dataGridAttributesHydro: {
                class: "data-grid-list-hydro"
            },
            yearList: [2022,2023,2024,2025,2026],
            periodList: ['H1','H2'],
            dxColumnWidth: [110, 110, 120],
            formatDecimal2: {
                type: 'fixedPoint',
                precision: 2,
            },
        };
    },
    computed: {},
    methods: {
        FETCH_PH() {
            GET_DATA(this, '/CMWaterAnalysisPH/ByTag/' + this.dataInfo.id_tag, 'pHList', () => {
                let categories = [];
                let value = [];

                this.pHList.forEach(item => {
                    categories.push(item.year + ' ' + item.period);
                    value.push({
                        y: item.ph_val,
                    })
                })

                this.chartPhOptions = {
                    id: this.active_tab,
                    title: {
                        text: 'pH Trending Results',
                        align: 'center'
                    },
                    xAxis: {
                        categories: categories,
                    },
                    yAxis: {
                        title: {
                            text: 'pH'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'pH',
                        data: value,
                        lineColor: '#ccc',
                        color: '#777'
                    }]
                }
            });
        },
        FETCH_CO2() {
            GET_DATA(this, '/CMWaterAnalysisCO2/ByTag/' + this.dataInfo.id_tag, 'co2List', () => {
                let categories = [];
                let value = [];

                this.co2List.forEach(item => {
                    categories.push(item.year + ' ' + item.period);
                    value.push({
                        y: item.co2_val,
                    })
                })

                this.chartCO2Options = {
                    id: this.active_tab,
                    title: {
                        text: 'CO2 Trending Results',
                        align: 'center'
                    },
                    xAxis: {
                        categories: categories,
                    },
                    yAxis: {
                        title: {
                            text: 'CO2 (%)'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'CO2',
                        data: value,
                        lineColor: '#ccc',
                        color: '#777'
                    }]
                }
            });
        },
        FETCH_DISSOLVED_O2() {
            GET_DATA(this, '/CMWaterAnalysisDissolvedO2/ByTag/' + this.dataInfo.id_tag, 'dissolvedList', () => {
                let categories = [];
                let value = [];

                this.dissolvedList.forEach(item => {
                    categories.push(item.year + ' ' + item.period);
                    value.push({
                        y: item.dissolved_o2_val,
                        color: this.GET_COLOR_STATUS(item.id_status)
                    })
                })

                this.chartDissolveO2Options = {
                    id: this.active_tab,
                    title: {
                        text: 'Dissolved O2 Trending Results',
                        align: 'center'
                    },
                    xAxis: {
                        categories: categories,
                    },
                    yAxis: {
                        title: {
                            text: 'Dissolved O2 (ppb)'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Dissolved O2 (ppb)',
                        data: value,
                        lineColor: '#ccc',
                        color: '#ccc'
                    }]
                }
            });
        },
        FETCH_ION() {
            GET_DATA(this, '/CMWaterAnalysisIonCount/ByTag/' + this.dataInfo.id_tag, 'ionCountList', () => {
                let categories = [];
                let value = [];

                this.ionCountList.forEach(item => {
                    categories.push(item.year + ' ' + item.period);
                    value.push({
                        y: item.ion_count,
                    })
                })

                this.chartIonOptions = {
                    id: this.active_tab,
                    title: {
                        text: 'Fe Count Trending Results',
                        align: 'center'
                    },
                    xAxis: {
                        categories: categories,
                    },
                    yAxis: {
                        title: {
                            text: 'FE Count'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'FE Count',
                        data: value,
                        lineColor: '#ccc',
                        color: '#777'
                    }]
                }
            });
        },
        FETCH_HYDRO() {
            GET_DATA(this, '/CMWaterAnalysisHydroDynamic', 'hydroList', () => {
                let categories = [];
                let value1 = [];
                let value2 = [];
                let value3 = [];
                let value4 = [];

                this.hydroList.forEach(item => {
                    categories.push(moment(item.record_date).format("DD MMM YYYY"));
                    value1.push({ y: item.cr_90_per_mm_yr })
                    value2.push({ y: item.cr_95_per_mm_yr })
                    value3.push({ y: item.cr_99_per_mm_yr })
                    value4.push({ y: item.cr_not_injected_mm_yr })
                })

                this.chartHydroOptions = {
                    id: this.active_tab,
                    title: {
                        text: 'Hydro Dynamic Trending Results',
                        align: 'center'
                    },
                    xAxis: {
                        categories: categories,
                    },
                    yAxis: {
                        title: {
                            text: 'Hydro Dynamic'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [
                        {
                            name: 'CR 90%',
                            data: value1,
                            lineColor: '#03fcba',
                            color: '#03fcba'
                        },
                        {
                            name: 'CR 95%',
                            data: value2,
                            lineColor: '#03c2fc',
                            color: '#03c2fc'
                        },
                        {
                            name: 'CR 99%',
                            data: value3,
                            lineColor: '#b603fc',
                            color: '#b603fc'
                        },
                        {
                            name: 'CR Not Injected',
                            data: value4,
                            lineColor: '#fc0390',
                            color: '#fc0390'
                        }
                    ]
                }
            });
        },
        GET_COLOR_STATUS(id) {
            if(id) {
                console.log(id);
                const color = this.dissolvedStatusList.filter(s => s.id == id);
                return color[0].color_code;
            }
            return '#FFFFFF';
        },
        CREATE_RECORD(e) {
            const user = JSON.parse(localStorage.getItem("user"));
            e.data.id = 0;
            e.data.id_tag = this.dataInfo.id;
            e.data.created_by = user.id;
            e.data.updated_by = user.id;
            if(e.component._customClass == 'data-grid-list-ph'){
                POST_DATA('/CMWaterAnalysisPH', e.data, () => {this.FETCH_PH();});
            } else if (e.component._customClass == 'data-grid-list-dissolved') {
                POST_DATA('/CMWaterAnalysisDissolvedO2', e.data, () => {this.FETCH_DISSOLVED_O2();});
            } else if (e.component._customClass == 'data-grid-list-ion') {
                POST_DATA('/CMWaterAnalysisIonCount', e.data, () => {this.FETCH_CO2();});
            } else if (e.component._customClass == 'data-grid-list-hydro') {
                POST_DATA('/CMWaterAnalysisHydroDynamic', e.data, () => {this.FETCH_HYDRO();});
            }
        },
        UPDATE_RECORD(e) {
            const user = JSON.parse(localStorage.getItem("user"));
            e.data.updated_by = user.id;
            if(e.component._customClass == 'data-grid-list-ph'){
                PUT_DATA('/CMWaterAnalysisPH/' + e.data.id, e.data, () => {this.FETCH_PH();});
            } else if (e.component._customClass == 'data-grid-list-dissolved') {
                PUT_DATA('/CMWaterAnalysisDissolvedO2/' + e.data.id, e.data, () => {this.FETCH_DISSOLVED_O2();});
            } else if (e.component._customClass == 'data-grid-list-ion') {
                PUT_DATA('/CMWaterAnalysisIonCount/' + e.data.id, e.data, () => {this.FETCH_CO2();});
            } else if (e.component._customClass == 'data-grid-list-hydro') {
                PUT_DATA('/CMWaterAnalysisHydroDynamic/' + e.data.id, e.data, () => {this.FETCH_HYDRO();});
            }
        },
        DELETE_RECORD(e) {
            if(e.component._customClass == 'data-grid-list-ph'){
                DELETE_DATA('/CMWaterAnalysisPH/' + e.data.id, () => {this.FETCH_PH();});
            } else if (e.component._customClass == 'data-grid-list-dissolved') {
                DELETE_DATA('/CMWaterAnalysisDissolvedO2/' + e.data.id, () => {this.FETCH_DISSOLVED_O2();});
            } else if (e.component._customClass == 'data-grid-list-ion') {
                DELETE_DATA('/CMWaterAnalysisIonCount/' + e.data.id, () => {this.FETCH_CO2();});
            } else if (e.component._customClass == 'data-grid-list-hydro') {
                DELETE_DATA('/CMWaterAnalysisHydroDynamic/' + e.data.id, () => {this.FETCH_HYDRO();});
            }
        },
        onCellPrepared() {
            // if (e.column.dataField === "dissolved_o2_val" && e.rowType === "data") {
            //     if (e.data.id_status == 1) {
            //     e.cellElement.style.backgroundColor = "#FF0000";
            //     } else if (e.data.id_status == 2) {
            //     e.cellElement.style.backgroundColor = "#FFFF00";
            //     } else if(e.data.id_status == 3) {
            //     e.cellElement.style.backgroundColor = "#66FF33";
            //     }
            // }
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
            padding: 10px;
            width: 120px;
        }
        .active {
            color: white;
            background-color: $web-theme-color-secondary;
            border: solid 1px $web-theme-color-secondary;
        }
    }

    .table-chart {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 5px;
        height: 500px;
        overflow-y: scroll;
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