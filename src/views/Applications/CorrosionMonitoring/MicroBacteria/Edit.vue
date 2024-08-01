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
                            :element-attr="dataGridAttributesSrb"
                            :data-source="srbList"
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
                                data-field="srb_val" 
                                caption="SRB (cfu)" 
                                :width="dxColumnWidth[2]" 
                                alignment="center"
                                :editor-options="{ placeholder: 'SRB' }"
                            />
                        </DxDataGrid>
                    </div>
                    <div class="chart-container">
                        <highcharts :options="chartSrbOptions" :key="'chart-srb-' + chartSrbOptions.id" />
                    </div>
                </div>

                <div fill v-if="active_tab === tabs[1]" class="table-chart">
                    <div>
                        <DxDataGrid 
                            id="data-grid-dashboard" 
                            key-expr="id" 
                            :element-attr="dataGridAttributesGhp"
                            :data-source="ghbList"
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
                                data-field="ghb_val" 
                                caption="GHB (Cells/mL)" 
                                :width="dxColumnWidth[2]"
                                alignment="center"
                                :editor-options="{ placeholder: 'GHB' }"
                            />
                        </DxDataGrid>
                    </div>
                    <div class="chart-container">
                        <highcharts :options="chartGhbOptions" :key="'chart-ghb-' + chartGhbOptions.id" />
                    </div>
                </div>

                <div fill v-if="active_tab === tabs[2]" class="table-chart">
                    <div>
                        <DxDataGrid 
                            id="data-grid-dashboard" 
                            key-expr="id" 
                            :element-attr="dataGridAttributesApghb"
                            :data-source="apghbList"
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
                                data-field="apghb_val" 
                                caption="APGHB (Cells/mL)" 
                                :width="dxColumnWidth[2]" 
                                alignment="center"
                                :editor-options="{ placeholder: 'APGHB' }"
                            />
                        </DxDataGrid>
                    </div>
                    <div class="chart-container">
                        <highcharts :options="chartApghbOptions" :key="'chart-apghb-' + chartApghbOptions.id" />
                    </div>
                </div>

                <div fill v-if="active_tab === tabs[3]" class="table-chart">
                    <div>
                        <DxDataGrid 
                            id="data-grid-dashboard" 
                            key-expr="id" 
                            :element-attr="dataGridAttributesAtp"
                            :data-source="atpList"
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
                                data-field="atp_val" 
                                caption="ATP (pgATP/mL)" 
                                :width="dxColumnWidth[2]"
                                alignment="center"
                                :editor-options="{ placeholder: 'ATP' }"
                            />
                        </DxDataGrid>
                    </div>
                    <div class="chart-container">
                        <highcharts :options="chartAtpOptions" :key="'chart-atp-' + chartAtpOptions.id" />
                    </div>
                </div>

                <div fill v-if="active_tab === tabs[4]" class="table-chart">
                    <div>
                        <DxDataGrid 
                            id="data-grid-dashboard" 
                            key-expr="id" 
                            :element-attr="dataGridAttributesSulphide"
                            :data-source="sulphideList"
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
                                data-field="sulphide_val" 
                                caption="Sulphide (mg/L)" 
                                :width="dxColumnWidth[2]" 
                                alignment="center"
                                :editor-options="{ placeholder: 'Sulphide' }"
                            />
                        </DxDataGrid>
                    </div>
                    <div class="chart-container">
                        <highcharts :options="chartSulphideOptions" :key="'chart-sulphide-' + chartSulphideOptions.id" />
                    </div>
                </div>

                <div fill v-if="active_tab === tabs[5]" class="table-chart">
                    <div style="grid-column: span 2;">
                        <DxDataGrid 
                            id="data-grid-dashboard" 
                            key-expr="id" 
                            :data-source="libraryList"
                            :selection="{ mode: 'single' }" 
                            :hover-state-enabled="true" 
                            :allow-column-reordering="true"
                            :show-borders="true" 
                            :show-row-lines="true" 
                            :row-alternation-enabled="false"
                            :word-wrap-enabled="true" 
                            :column-auto-width="true"
                            >
                            <DxEditing 
                                :allow-updating="true" 
                                :allow-deleting="true" 
                                :allow-adding="true" 
                                :use-icons="true"
                                mode="row" 
                            />
                            <DxColumn
                                data-field="file_path" 
                                caption="File" 
                                :min-width="100" 
                                alignment="left" 
                            />
                            <DxColumn
                                data-field="note" 
                                caption="Note" 
                                :min-width="100" 
                                alignment="left" 
                            />
                            <DxColumn
                                data-field="file_type" 
                                caption="Extension" 
                                :width="100" 
                                alignment="center" 
                            />
                            <DxColumn
                                data-field="upload_date" 
                                caption="Upload Date" 
                                :width="100" 
                                alignment="center" 
                            />
                        </DxDataGrid>
                    </div>
                </div>

                <button fill @click="$emit('popup')">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import { GET_DATA, POST_DATA, PUT_DATA, DELETE_DATA } from "/axios.js";
import "devextreme/dist/css/dx.light.css";
import exportingInit from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
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
    name: "edit-micro-bacteria-result",
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
            subpageName: "MICROBIOLOGICAL BACTERIA",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            console.log('dataInfo', this.dataInfo);
            GET_DATA(this, '/Md/get-md-cm-micro-bact-status-list/', 'statusList');
            this.FETCH_SRB();
            this.FETCH_ATP();
            this.FETCH_GHB();
            this.FETCH_APGHB();
            this.FETCH_SULPHIDE();
        }
    },
    data() {
        return {
            atpList: [],
            ghbList: [],
            apghbList: [],
            sulphideList: [],
            srbList: [],
            libraryList: [],
            tabs: ['SRB', 'GHB', 'APGHB', 'ATP', 'Sulphide', 'Library'],
            active_tab: 'SRB',
            chartSrbOptions: {},
            chartAtpOptions: {},
            chartGhbOptions: {},
            chartApghbOptions: {},
            chartSulphideOptions: {},
            statusList: [],
            dataGridAttributesAtp: {
                class: "data-grid-dashboard-atp"
            },
            dataGridAttributesGhp: {
                class: "data-grid-dashboard-ghb"
            },
            dataGridAttributesApghb: {
                class: "data-grid-dashboard-apghb"
            },
            dataGridAttributesSulphide: {
                class: "data-grid-dashboard-sulphide"
            },
            dataGridAttributesSrb: {
                class: "data-grid-dashboard-srb"
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
        FETCH_SULPHIDE() {
            GET_DATA(this, '/CMMicroBacteriaSulphide/ByTag/' + this.dataInfo.id_tag, 'sulphideList', () => {
                let categories = [];
                let value = [];

                this.sulphideList.forEach(item => {
                    categories.push(item.year + ' ' + item.period);
                    value.push({
                        y: item.sulphide_val,
                    })
                })

                this.chartSulphideOptions = {
                    id: this.active_tab,
                    title: {
                        text: 'Sulphide Trending Results',
                        align: 'center'
                    },
                    xAxis: {
                        categories: categories,
                    },
                    yAxis: {
                        title: {
                            text: 'Sulphide (mg/L)'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Sulphide (mg/L)',
                        data: value,
                        lineColor: '#ccc',
                        color: '#777'
                    }]
                }

            });
        },
        FETCH_SRB() {
            GET_DATA(this, '/CMMicroBacteriaSRB/ByTag/' + this.dataInfo.id_tag, 'srbList', () => {
                let categories = [];
                let value = [];

                this.srbList.forEach(item => {
                    categories.push(item.year + ' ' + item.period);
                    value.push({
                        y: item.srb_val,
                        color: this.GET_COLOR_STATUS(item.id_status)
                    })
                })

                this.chartSrbOptions = {
                    id: this.active_tab,
                    title: {
                        text: 'SRB Trending Results',
                        align: 'center'
                    },
                    xAxis: {
                        categories: categories,
                    },
                    yAxis: {
                        title: {
                            text: 'SRB (cfu)'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'SRB (cfu)',
                        data: value,
                        lineColor: '#ccc',
                        color: '#777'
                    }]
                }

            });
        },
        FETCH_GHB() {
            GET_DATA(this, '/CMMicroBacteriaGHB/ByTag/' + this.dataInfo.id_tag, 'ghbList', () => {
                let categories = [];
                let value = [];

                this.ghbList.forEach(item => {
                    categories.push(item.year + ' ' + item.period);
                    value.push({
                        y: item.ghb_val,
                        color: this.GET_COLOR_STATUS(item.id_status)
                    })
                })

                this.chartGhbOptions = {
                    id: this.active_tab,
                    title: {
                        text: 'GHB Trending Results',
                        align: 'center'
                    },
                    xAxis: {
                        categories: categories,
                    },
                    yAxis: {
                        title: {
                            text: 'GHB (Cells/mL)'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'GHB (Cells/mL)',
                        data: value,
                        lineColor: '#ccc',
                        color: '#777'
                    }]
                }

            });
        },
        FETCH_ATP() {
            GET_DATA(this, '/CMMicroBacteriaATP/ByTag/' + this.dataInfo.id_tag, 'atpList', () => {
                let categories = [];
                let value = [];

                this.atpList.forEach(item => {
                    categories.push(item.year + ' ' + item.period);
                    value.push({
                        y: item.atp_val,
                        color: this.GET_COLOR_STATUS(item.id_status)
                    })
                })

                this.chartAtpOptions = {
                    id: this.active_tab,
                    title: {
                        text: 'ATP Trending Results',
                        align: 'center'
                    },
                    xAxis: {
                        categories: categories,
                    },
                    yAxis: {
                        title: {
                            text: 'ATP (pgATP/mL)'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'ATP (pgATP/mL)',
                        data: value,
                        lineColor: '#ccc',
                        color: '#777'
                    }]
                }

            });
        },
        FETCH_APGHB() {
            GET_DATA(this, '/CMMicroBacteriaAPGHB/ByTag/' + this.dataInfo.id_tag, 'apghbList', () => {
                let categories = [];
                let value = [];

                this.apghbList.forEach(item => {
                    categories.push(item.year + ' ' + item.period);
                    value.push({
                        y: item.apghb_val,
                        color: this.GET_COLOR_STATUS(item.id_status)
                    })
                })

                this.chartApghbOptions = {
                    id: this.active_tab,
                    title: {
                        text: 'APGHB Trending Results',
                        align: 'center'
                    },
                    xAxis: {
                        categories: categories,
                    },
                    yAxis: {
                        title: {
                            text: 'APGHB'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'APGHB',
                        data: value,
                        lineColor: '#ccc',
                        color: '#777'
                    }]
                }

            });
        },
        GET_COLOR_STATUS(id) {
            if(id) {
                console.log(id);
                const color = this.statusList.filter(s => s.id == id);
                return color[0].color_code;
            }
            return '#FFFFFF';
        },
        CREATE_RECORD(e) {
            const user = JSON.parse(localStorage.getItem("user"));
            e.data.id = 0;
            e.data.id_tag = this.dataInfo.id_tag;
            e.data.created_by = user.id;
            e.data.updated_by = user.id;
            if(e.component._customClass == 'data-grid-dashboard-atp'){
                POST_DATA('/CMMicroBacteriaATP', e.data, () => {GET_DATA(this, '/CMMicroBacteriaATP/ByTag/' + this.dataInfo.id_tag, 'atpList')});
            } else if (e.component._customClass == 'data-grid-dashboard-ghb') {
                POST_DATA('/CMMicroBacteriaGHB', e.data, () => {GET_DATA(this, '/CMMicroBacteriaGHB/ByTag/' + this.dataInfo.id_tag, 'ghbList')});
            } else if (e.component._customClass == 'data-grid-dashboard-apghb') {
                POST_DATA('/CMMicroBacteriaAPGHB', e.data, () => {GET_DATA(this, '/CMMicroBacteriaAPGHB/ByTag/' + this.dataInfo.id_tag, 'apghbList')});
            } else if (e.component._customClass == 'data-grid-dashboard-sulphide') {
                POST_DATA('/CMMicroBacteriaSulphide', e.data, () => {GET_DATA(this, '/CMMicroBacteriaSulphide/ByTag/' + this.dataInfo.id_tag, 'sulphideList')});
            } else if (e.component._customClass == 'data-grid-dashboard-srb') {
                POST_DATA('/CMMicroBacteriaSRB', e.data, () => {GET_DATA(this, '/CMMicroBacteriaSRB/ByTag/' + this.dataInfo.id_tag, 'srbList')});
            }
        },
        UPDATE_RECORD(e) {
            const user = JSON.parse(localStorage.getItem("user"));
            e.data.updated_by = user.id;
            if(e.component._customClass == 'data-grid-dashboard-atp'){
                PUT_DATA('/CMMicroBacteriaATP/' + e.data.id, e.data, () => {GET_DATA(this, '/CMMicroBacteriaATP/ByTag/' + this.dataInfo.id_tag, 'atpList')});
            } else if (e.component._customClass == 'data-grid-dashboard-ghb') {
                PUT_DATA('/CMMicroBacteriaGHB/' + e.data.id, e.data, () => {GET_DATA(this, '/CMMicroBacteriaGHB/ByTag/' + this.dataInfo.id_tag, 'ghbList')});
            } else if (e.component._customClass == 'data-grid-dashboard-apghb') {
                PUT_DATA('/CMMicroBacteriaAPGHB/' + e.data.id, e.data, () => {GET_DATA(this, '/CMMicroBacteriaAPGHB/ByTag/' + this.dataInfo.id_tag, 'apghbList')});
            } else if (e.component._customClass == 'data-grid-dashboard-sulphide') {
                PUT_DATA('/CMMicroBacteriaSulphide/' + e.data.id, e.data, () => {GET_DATA(this, '/CMMicroBacteriaSulphide/ByTag/' + this.dataInfo.id_tag, 'sulphideList')});
            } else if (e.component._customClass == 'data-grid-dashboard-srb') {
                PUT_DATA('/CMMicroBacteriaSRB/' + e.data.id, e.data, () => {GET_DATA(this, '/CMMicroBacteriaSRB/ByTag/' + this.dataInfo.id_tag, 'srbList')});
            }
        },
        DELETE_RECORD(e) {
            if(e.component._customClass == 'data-grid-dashboard-atp'){
                DELETE_DATA('/CMMicroBacteriaATP/' + e.data.id, () => {GET_DATA(this, '/CMMicroBacteriaATP/ByTag/' + this.dataInfo.id_tag, 'atpList')});
            } else if (e.component._customClass == 'data-grid-dashboard-ghb') {
                DELETE_DATA('/CMMicroBacteriaGHB/' + e.data.id, () => {GET_DATA(this, '/CMMicroBacteriaGHB/ByTag/' + this.dataInfo.id_tag, 'ghbList')});
            } else if (e.component._customClass == 'data-grid-dashboard-apghb') {
                DELETE_DATA('/CMMicroBacteriaAPGHB/' + e.data.id, () => {GET_DATA(this, '/CMMicroBacteriaAPGHB/ByTag/' + this.dataInfo.id_tag, 'apghbList')});
            } else if (e.component._customClass == 'data-grid-dashboard-sulphide') {
                DELETE_DATA('/CMMicroBacteriaSulphide/' + e.data.id, () => {GET_DATA(this, '/CMMicroBacteriaSulphide/ByTag/' + this.dataInfo.id_tag, 'sulphideList')});
            } else if (e.component._customClass == 'data-grid-dashboard-srb') {
                DELETE_DATA('/CMMicroBacteriaSRB/' + e.data.id, () => {GET_DATA(this, '/CMMicroBacteriaSRB/ByTag/' + this.dataInfo.id_tag, 'srbList')});
            }
        },
        GET_STATUS_CELL_COLOR(value) {
            if (value.rowType === "data" && value.column.dataField === "atp_val") {
                console.log("test" , value)
                if (value.data.atp) {
                    let str = value.data.atp.split(" ");
                    let num = Number(str[str.length - 1]);

                    if (num <= 10) return this.cellColors.green;
                    else if ((num > 10 && num <= 100) || isNaN(num)) return this.cellColors.yellow;
                    else if (num > 100) return this.cellColors.red;
                }
            }
            if (value.rowType === "data" && value.column.dataField === "ghb_val") {
                if (value.data.ghb) {
                    let str = value.data.ghb.split(" ");
                    let num = Number(str[str.length - 1]);

                    if (num <= 0.3) return this.cellColors.green;
                    else if ((0.3 < num && num  <= 100) || isNaN(num)) return this.cellColors.yellow;
                    else if (num > 100) return this.cellColors.red;
                }
            }
            if (value.rowType === "data" && value.column.dataField === "apghb") {
                if (value.data.apghb) {
                    let str = value.data.apghb.split(" ");
                    let num = Number(str[str.length - 1]);

                    if (num <= 0.3) return this.cellColors.green;
                    else if ((0.3 < num && num  <= 100) || isNaN(num)) return this.cellColors.yellow;
                    else if (num > 100) return this.cellColors.red;
                }
            }
            if (value.rowType === "data" && value.column.dataField === "srb") {
                if (value.data.srb) {
                    let str = value.data.srb.split(" ");
                    let num = Number(str[str.length - 1]);

                    if (num <= 100) return this.cellColors.green;
                    else if (isNaN(num)) return this.cellColors.yellow;
                    else if (num > 100) return this.cellColors.red;
                }
            }
        },
        onCellPrepared(e) {
            // console.log("test", e);
            if (e.column.dataField === "atp_val" && e.rowType === "data") {
                console.log(e.data.id_status); 
                if (e.data.id_status == 1) {
                e.cellElement.style.backgroundColor = "#FF0000";
                } else if (e.data.id_status == 2) {
                e.cellElement.style.backgroundColor = "#FFFF00";
                } else if(e.data.id_status == 3) {
                e.cellElement.style.backgroundColor = "#66FF33";
                }
            }
            if (e.column.dataField === "ghb_val" && e.rowType === "data") {
                console.log(e.data.id_status); 
                if (e.data.id_status == 1) {
                e.cellElement.style.backgroundColor = "#FF0000";
                } else if (e.data.id_status == 2) {
                e.cellElement.style.backgroundColor = "#FFFF00";
                } else if(e.data.id_status == 3) {
                e.cellElement.style.backgroundColor = "#66FF33";
                }
            }
            if (e.column.dataField === "apghb_val" && e.rowType === "data") {
                console.log(e.data.id_status); 
                if (e.data.id_status == 1) {
                e.cellElement.style.backgroundColor = "#FF0000";
                } else if (e.data.id_status == 2) {
                e.cellElement.style.backgroundColor = "#FFFF00";
                } else if(e.data.id_status == 3) {
                e.cellElement.style.backgroundColor = "#66FF33";
                }
            }
            if (e.column.dataField === "srb_val" && e.rowType === "data") {
                console.log(e.data.id_status); 
                if (e.data.id_status == 1) {
                e.cellElement.style.backgroundColor = "#FF0000";
                } else if (e.data.id_status == 2) {
                e.cellElement.style.backgroundColor = "#FFFF00";
                } else if(e.data.id_status == 3) {
                e.cellElement.style.backgroundColor = "#66FF33";
                }
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