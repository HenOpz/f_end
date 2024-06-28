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
                            id="data-grid-list" 
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
                                :allow-adding="true" 
                                :use-icons="true"
                                mode="row" 
                            />
                            <DxFilterRow :visible="true" />
                            <DxHeaderFilter :visible="true" />
                            <DxColumn 
                                data-field="year" 
                                caption="Year" 
                                :width="100" 
                                alignment="center"
                                :editor-options="{ placeholder: 'Select' }"
                                sort-order="desc"
                            >
                                <DxLookup :data-source="yearList" />
                            </DxColumn>
                            <DxColumn
                                data-field="period" 
                                caption="Period" 
                                :width="100" 
                                alignment="center" 
                                :editor-options="{ placeholder: 'Select' }"
                                sort-order="desc"
                            >
                                <DxLookup :data-source="periodList" />
                            </DxColumn>
                            <DxColumn 
                                data-field="ph_val" 
                                caption="pH" 
                                :width="100" 
                                alignment="center"
                                :editor-options="{ placeholder: 'pH' }"
                            />
                        </DxDataGrid>
                    </div>
                    <div class="chart-container">
                        <highcharts :options="chartOptions"  />
                    </div>
                </div>

                <div fill v-if="active_tab === tabs[1]" class="table-chart">
                    <div>
                        <DxDataGrid 
                            id="data-grid-list" 
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
                                :allow-adding="true" 
                                :use-icons="true"
                                mode="row" 
                            />
                            <DxFilterRow :visible="true" />
                            <DxHeaderFilter :visible="true" />
                            <DxColumn 
                                data-field="year" 
                                caption="Year" 
                                :width="100" 
                                alignment="center"
                                :editor-options="{ placeholder: 'Select' }"
                                sort-order="desc"
                            >
                                <DxLookup :data-source="yearList" />
                            </DxColumn>
                            <DxColumn
                                data-field="period" 
                                caption="Period" 
                                :width="100" 
                                alignment="center" 
                                :editor-options="{ placeholder: 'Select' }"
                                sort-order="desc"
                            >
                                <DxLookup :data-source="periodList" />
                            </DxColumn>
                            <DxColumn 
                                data-field="dissolved_o2_val" 
                                caption="Dissolved O2 (ppb)" 
                                :width="100" 
                                alignment="center"
                                :editor-options="{ placeholder: 'Dissolved O2' }"
                            />
                        </DxDataGrid>
                    </div>
                    <div class="chart-container">
                        <highcharts :options="chartOptions"  />
                    </div>
                </div>

                <div fill v-if="active_tab === tabs[2]" class="table-chart">
                    <div>
                        <DxDataGrid 
                            id="data-grid-list" 
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
                                :allow-adding="true" 
                                :use-icons="true"
                                mode="row" 
                            />
                            <DxFilterRow :visible="true" />
                            <DxHeaderFilter :visible="true" />
                            <DxColumn 
                                data-field="year" 
                                caption="Year" 
                                :width="100" 
                                alignment="center"
                                :editor-options="{ placeholder: 'Select' }"
                                sort-order="desc"
                            >
                                <DxLookup :data-source="yearList" />
                            </DxColumn>
                            <DxColumn
                                data-field="period" 
                                caption="Period" 
                                :width="100" 
                                alignment="center" 
                                :editor-options="{ placeholder: 'Select' }"
                                sort-order="desc"
                            >
                                <DxLookup :data-source="periodList" />
                            </DxColumn>
                            <DxColumn 
                                data-field="ion_count" 
                                caption="Ion Count" 
                                :width="100" 
                                alignment="center"
                                :editor-options="{ placeholder: 'Ion Count' }"
                            />
                        </DxDataGrid>
                    </div>
                    <div class="chart-container">
                        <highcharts :options="chartOptions"  />
                    </div>
                </div>

                <div fill v-if="active_tab === tabs[3]" class="table-chart">
                    <div style="grid-column: span 2;">
                        <DxDataGrid 
                            id="data-grid-list" 
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
import { axios } from "/axios.js";
// import moment from "moment";
import "devextreme/dist/css/dx.light.css";
// import { Workbook } from "exceljs";
// import saveAs from "file-saver";
// import { exportDataGrid } from "devextreme/excel_exporter";
// import DxTextArea from 'devextreme-vue/text-area';
// import DxAddRowButton from "devextreme-vue/button";
// import { DxItem } from "devextreme-vue/form";

import exportingInit from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
exportingInit(Highcharts);
offlineExporting(Highcharts);

import {
    DxDataGrid,
    // DxSearchPanel,
    // DxPaging,
    // DxPager,
    // DxScrolling,
    DxColumn,
    // DxExport,
    // DxToolbar,
    DxHeaderFilter,
    // DxSelection,
    DxEditing,
    DxFilterRow,
    // DxButton,
    DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    // DxForm
} from "devextreme-vue/data-grid";

//Structures

export default {
    name: "edit-water-analysis-result",
    props: {
        dataInfo: Object,
    },
    components: {
        DxDataGrid,
        // DxSearchPanel,
        // DxPaging,
        // DxPager,
        // DxScrolling,
        DxColumn,
        // DxExport,
        // DxToolbar,
        DxHeaderFilter,
        // DxSelection,
        // DxForm,
        // DxItem,
        DxEditing,
        DxFilterRow,
        // DxButton,
        // DxAddRowButton,
        DxLookup,
        // DxRequiredRule,
        // DxFormItem,
        // DxSelectBox,
        // DxTextBox,
        // DxDateBox,
        // DxCheckBox,
        // DxTextArea,
        // trashSvg
        highcharts: Chart
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "WATER ANALYSIS",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            console.log('dataInfo', this.dataInfo);
            this.FETCH_DATA('/CMWaterAnalysisPH/ByTag/' + this.dataInfo.id, 'pHList');
            this.FETCH_DATA('/CMWaterAnalysisDissolvedO2/ByTag/' + this.dataInfo.id, 'dissolvedList');
            this.FETCH_DATA('/CMWaterAnalysisIonCount/ByTag/' + this.dataInfo.id, 'ionCountList');
            this.chartOptions = {
                title: {
                    text: 'Trending Results Chart',
                    align: 'center'
                },
                xAxis: {
                    categories: ['2020 H1', '2020 H2', '2021 H1', '2021 H2', '2022 H1', '2022 H2', '2023 H1', '2023 H2']
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
                    name: 'Trend',
                    data: [12.3, 9.5, 4, 18.4, 6, 3, 111, 9.5]
                }]
            }
        }
    },
    data() {
        return {
            pHList: [],
            dissolvedList: [],
            ionCountList: [],
            libraryList: [],
            tabs: ['pH', 'Dissolved O2', 'Ion Count', 'Library'],
            active_tab: 'pH',
            chartOptions: {},
            dataGridAttributesPh: {
                class: "data-grid-list-ph"
            },
            dataGridAttributesDissolved: {
                class: "data-grid-list-dissolved"
            },
            dataGridAttributesIon: {
                class: "data-grid-list-ion"
            },
            yearList: [2022,2023,2024,2025,2026],
            periodList: ['H1','H2'],
        };
    },
    computed: {},
    methods: {
        CREATE_RECORD(e) {
            const user = JSON.parse(localStorage.getItem("user"));
            e.data.id = 0;
            e.data.id_tag = this.dataInfo.id;
            e.data.created_by = user.id;
            e.data.updated_by = user.id;
            if(e.component._customClass == 'data-grid-list-ph'){
                this.POST_DATA('/CMWaterAnalysisPH', e.data, () => {this.FETCH_DATA('/CMWaterAnalysisPH/ByTag/' + this.dataInfo.id, 'pHList')});
            } else if (e.component._customClass == 'data-grid-list-dissolved') {
                this.POST_DATA('/CMWaterAnalysisDissolvedO2', e.data, () => {this.FETCH_DATA('/CMWaterAnalysisDissolvedO2/ByTag/' + this.dataInfo.id, 'dissolvedList')});
            } else if (e.component._customClass == 'data-grid-list-ion') {
                this.POST_DATA('/CMWaterAnalysisIonCount', e.data, () => {this.FETCH_DATA('/CMWaterAnalysisIonCount/ByTag/' + this.dataInfo.id, 'ionCountList')});
            }
        },
        UPDATE_RECORD(e) {
            const user = JSON.parse(localStorage.getItem("user"));
            e.data.updated_by = user.id;
            if(e.component._customClass == 'data-grid-list-ph'){
                this.PUT_DATA('/CMWaterAnalysisPH/' + e.data.id, e.data, () => {this.FETCH_DATA('/CMWaterAnalysisPH/ByTag/' + this.dataInfo.id, 'pHList')});
            } else if (e.component._customClass == 'data-grid-list-dissolved') {
                this.PUT_DATA('/CMWaterAnalysisDissolvedO2/' + e.data.id, e.data, () => {this.FETCH_DATA('/CMWaterAnalysisDissolvedO2/ByTag/' + this.dataInfo.id, 'dissolvedList')});
            } else if (e.component._customClass == 'data-grid-list-ion') {
                this.PUT_DATA('/CMWaterAnalysisIonCount/' + e.data.id, e.data, () => {this.FETCH_DATA('/CMWaterAnalysisIonCount/ByTag/' + this.dataInfo.id, 'ionCountList')});
            }
        },
        DELETE_RECORD(e) {
            if(e.component._customClass == 'data-grid-list-ph'){
                this.DELETE_DATA('/CMWaterAnalysisPH/' + e.data.id, () => {this.FETCH_DATA('/CMWaterAnalysisPH/ByTag/' + this.dataInfo.id, 'pHList')});
            } else if (e.component._customClass == 'data-grid-list-dissolved') {
                this.DELETE_DATA('/CMWaterAnalysisDissolvedO2/' + e.data.id, () => {this.FETCH_DATA('/CMWaterAnalysisDissolvedO2/ByTag/' + this.dataInfo.id, 'dissolvedList')});
            } else if (e.component._customClass == 'data-grid-list-ion') {
                this.DELETE_DATA('/CMWaterAnalysisIonCount/' + e.data.id, () => {this.FETCH_DATA('/CMWaterAnalysisIonCount/ByTag/' + this.dataInfo.id, 'ionCountList')});
            }
        },
        DELETE_DATA(url, callback) {
            this.isLoading = true;
            axios({
                method: "delete",
                url: url,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            })
                .then(res => {
                    if (res.status == 204) {
                        if (callback && typeof callback === 'function') {
                            callback(res.data);
                        } 
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        PUT_DATA(url, data, callback) {
            this.isLoading = true;
            axios({
                method: "put",
                url: url,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: data,
            })
                .then(res => {
                    if (res.status == 204 && res.data) {
                        console.log(url, res);
                        if (callback && typeof callback === 'function') {
                            callback(res.data);
                        } 
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        POST_DATA(url, data, callback) {
            this.isLoading = true;
            axios({
                method: "post",
                url: url,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: data,
            })
                .then(res => {
                    if (res.status == 201 && res.data) {
                        console.log(url, res);
                        if (callback && typeof callback === 'function') {
                            callback(res.data);
                        } 
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_DATA(url, targetVariable, callback) {
            this.isLoading = true;
            axios({
                method: "get",
                url: url,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        if (callback && typeof callback === 'function') {
                            callback(res.data);
                        } else {
                            this.$set(this, targetVariable, res.data);
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        onCellPrepared(e) {
            console.log("test", e);
            if (e.column.dataField === "dissolved_o2_val" && e.rowType === "data") {
                console.log(e.data.id_status); 
                if (e.data.id_status == 1) {
                e.cellElement.style.backgroundColor = "#FF0000";
                } else if (e.data.id_status == 2) {
                e.cellElement.style.backgroundColor = "#FFFF00";
                } else if(e.data.id_status == 3) {
                e.cellElement.style.backgroundColor = "#66FF33";
                }
            }
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