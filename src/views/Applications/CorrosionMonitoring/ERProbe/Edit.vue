<template>
    <div>
        <div class="page-container">
            <div class="page-section">
                <button span-3 class="back" @click="SET_CURRENT_VIEW(0)">BACK</button>
                <div class="table-wrapper">
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
                    <div fill v-if="active_tab === tabs[1]" class="table-chart">
                        <div class="chart-container">
                            <highcharts :options="chartOptions"  />
                        </div>
                        <div class="chart-container">
                            <highcharts :options="chartOptions"  />
                        </div>
                        <div class="chart-container">
                            <highcharts :options="chartOptions"  />
                        </div>
                    </div> 
                    <div fill v-if="active_tab === tabs[0]">
                        <DxDataGrid 
                            id="data-grid-list" 
                            key-expr="id" 
                            :data-source="erProbeRecord" 
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
                                :allow-updating="false"
                                :allow-deleting="false" 
                                :allow-adding="false" 
                                :use-icons="true"
                                mode="popup" 
                            />
                            <DxColumn 
                                data-field="record_date" 
                                caption="Record Date" 
                                :width="100" 
                                alignment="center"
                                dataType="date" 
                                format="dd MMM yyyy" 
                            />
                            <DxColumn 
                                data-field="metal_loss" 
                                caption="Metal Loss (mm)" 
                                :width="100" 
                                alignment="center"
                            />
                            <DxColumn 
                                data-field="corrosion_rate" 
                                caption="Corrosion Rate (mm/y)" 
                                :width="100" 
                                alignment="center"
                            />
                            <DxColumn 
                                data-field="note" 
                                caption="Note" 
                                :min-width="120" 
                                alignment="center"
                            />
                            <DxColumn 
                                data-field="id_probe_status" 
                                caption="Probe Status" 
                                :width="120" 
                                alignment="center"
                            >
                                <DxLookup :data-source="probeList" display-expr="status" value-expr="id" />
                            </DxColumn>
                            <DxColumn :width="80" alignment="center" cell-template="action-cell-template" />

                            <DxToolbar>
                                <DxItem
                                    location="after"
                                    template="addButton"
                                />
                                <DxItem
                                    location="after"
                                    name="searchPanel"
                                />
                            </DxToolbar>
                            <template #addButton>
                                <DxButton
                                icon="las la-plus"
                                @click="isShow = 1"
                                hint="Add"
                                />
                            </template>

                            <template #action-cell-template="{ data }">
                                <div class="action-wrapper">
                                    <div @click="() => [isShow = 2, selectedId = data.data.id]">
                                        <img src="/img/svg/pen-svg.svg" class="penSvg" />
                                    </div>
                                    <div @click="DELETE_RECORD(data)">
                                        <img src="/img/svg/trash-svg.svg" class="trashSvg" />
                                    </div>
                                </div>
                            </template>
                        </DxDataGrid>
                    </div>
                    <div fill v-if="active_tab === tabs[2]" class="table-chart">
                        <div>
                            <DxDataGrid 
                                id="data-grid-list-library" 
                                key-expr="id" 
                                :element-attr="dataGridAttributes"
                                :data-source="libraryList"
                                :selection="{ mode: 'single' }" 
                                :hover-state-enabled="true" 
                                :allow-column-reordering="true"
                                :show-borders="true" 
                                :show-row-lines="true" 
                                :row-alternation-enabled="false"
                                :word-wrap-enabled="true" 
                                :column-auto-width="true"
                                @init-new-row="SET_CURRENT_VIEW(1)"
                                >
                                <DxEditing 
                                    :allow-updating="true" 
                                    :allow-deleting="true" 
                                    :allow-adding="false" 
                                    :use-icons="true"
                                    mode="row" 
                                />
                                <DxColumn 
                                    data-field="year" 
                                    caption="Year" 
                                    :width="100" 
                                    alignment="center"
                                />
                                <DxColumn
                                    data-field="period" 
                                    caption="Period" 
                                    :width="100" 
                                    alignment="center" 
                                />
                                <DxColumn 
                                    data-field="library" 
                                    caption="Library" 
                                    :width="100" 
                                    alignment="center"
                                />
                            </DxDataGrid>
                        </div>
                        <div class="chart-container">
                            <highcharts :options="chartOptions"  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AddProbe v-if="isShow === 1" :id_tag="id_tag" @popup="CLOSE_POPUP" />
        <EditProbe v-if="isShow === 2" :id_record="selectedId" @popup="CLOSE_POPUP" />
    </div>
</template>

<script>
/* eslint-disable */
//API
import { GET_DATA, PUT_DATA, DELETE_DATA } from "/axios.js";
import moment from "moment";
import AddProbe from "./AddProbe.vue"
import EditProbe from "./EditProbe.vue"


//Components
//import VueTabsChrome from "vue-tabs-chrome";
// import trashSvg from "@/components/svg/trash-svg.vue"

//DataGrid
import "devextreme/dist/css/dx.light.css";
// import { Workbook } from "exceljs";
// import saveAs from "file-saver";
// import { exportDataGrid } from "devextreme/excel_exporter";
import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';
import DxDateBox from 'devextreme-vue/date-box';
// import DxTextArea from 'devextreme-vue/text-area';
import DxButton from "devextreme-vue/button";
import { DxItem } from "devextreme-vue/form";
import {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    // DxScrolling,
    DxColumn,
    // DxExport,
    DxToolbar,
    // DxHeaderFilter,
    // DxSelection,
    DxEditing,
    // DxFilterRow,
    // DxButton,
    DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    // DxForm
    DxMasterDetail
} from "devextreme-vue/data-grid";

//Structures

export default {
    name: "inspection-record",
    props: {
        info: Object,
    },
    components: {
        DxDataGrid,
        DxSearchPanel,
        DxPaging,
        DxPager,
        // DxScrolling,
        DxColumn,
        // DxExport,
        DxToolbar,
        // DxHeaderFilter,
        // DxSelection,
        // DxForm,
        DxItem,
        DxEditing,
        // DxFilterRow,
        DxButton,
        // DxAddRowButton,
        DxLookup,
        // DxRequiredRule,
        // DxFormItem,
        DxSelectBox,
        DxTextBox,
        DxDateBox,
        // DxTextArea,
        // trashSvg,
        AddProbe,
        EditProbe
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "ER PROBE: " + this.info.tag_no,
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            // GET_DATA(this, '/Md/get-md-moc-noc-list', 'formSelect.noc');
            // GET_DATA(this, '/Md/get-md-moc-rrl-list', 'formSelect.rrl');
            // GET_DATA(this, '/Md/get-md-moc-status-list', 'formSelect.status');
            // GET_DATA(this, `/ManagementOfChange/${this.id_record}`, 'mocList');
            GET_DATA(this, '/CMERProbeRecord/ByTag/' + this.id_tag, 'erProbeRecord');
            GET_DATA(this, '/Md/get-md-cm-probe-status-list', 'probeList');
            this.chartOptions = {
                credits: {
                enabled: false
                },
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
            erProbeRecord: [],
            libraryList: [
                {
                    id: 1,
                    year: 2023,
                    period: 'H2',
                    library: 0.2
                },
                {
                    id: 2,
                    year: 2022,
                    period: 'H1',
                    library: 'N/A'
                },
                {
                    id: 3,
                    year: 2021,
                    period: 'H2',
                    library: 'N/A'
                }
            ],
            selectedId: null,
            chartOptions: {},
            tabs: ['Probe Record', 'Summary Dashboard'],
            active_tab: 'Probe Record',
            isShow: 0,
            probeList: [],
            dataGridAttributes: {
                class: "data-grid"
            },
            id_tag: this.info.id_tag,
        };
    },
    computed: {},
    methods: {
        SET_IS_SHOW(val) {
            if (val) this.isShow = val;
        },
        UPDATE_RECORD() {
            if (this.mocList.start_date !== null)
                this.mocList.start_date = moment(this.mocList.start_date).format("L");
            if (this.mocList.expiry_date !== null)
                this.mocList.expiry_date = moment(this.mocList.expiry_date).format("L");
            PUT_DATA(`/ManagementOfChange/${this.mocList.id}`, this.mocList, () => { this.SET_CURRENT_VIEW(0); });
        },
        DELETE_RECORD() {
            DELETE_DATA(`/ManagementOfChange/delete-management-of-change?id=${this.mocList.id}`, () => { this.SET_CURRENT_VIEW(0); });
        },
        SET_CURRENT_VIEW(view, data = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", true);
            if (data !== null) this.$emit('currentView', view, data);
            else this.$emit('currentView', view);
        },
        CLOSE_POPUP() {
            this.isShow = 0;
            GET_DATA(this, '/CMERProbeRecord/ByTag/' + this.id_tag, 'erProbeRecord');
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
  // overflow-y: hidden;
}

.page-section {
  padding: 20px;
  overflow-y: auto;
  height: calc(100% - 270px);
  grid-row: span 2;
}

.back {
    padding: 10px 40px;
    background-color: white;
    border: solid 1px gray;
    font-weight: 600;
    font-size: 12px;
    transition: 1s;
    cursor: pointer;
    margin-bottom: 15px;
    width: 130px;
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
        grid-template-columns: repeat(2, 1fr);
        gap: 5px;
    }

    .input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 6px;

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