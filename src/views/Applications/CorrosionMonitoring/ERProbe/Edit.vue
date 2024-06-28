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
                    <div fill v-if="active_tab === tabs[0]" class="table-chart">
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
                    <div fill v-if="active_tab === tabs[1]">
                        <DxDataGrid 
                            id="data-grid-list" 
                            key-expr="id" 
                            :data-source="monitoringRecord" 
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
                            <DxFilterRow :visible="true" />
                            <DxHeaderFilter :visible="true" />
                            <DxSelection mode="single" />
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
                                data-field="comments" 
                                caption="Comments" 
                                :min-width="120" 
                                alignment="center"
                            />
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

                            <!-- Configuration goes here -->
                            <!-- <DxFilterRow :visible="true" /> -->
                            <DxScrolling mode="standard" />
                            <DxSearchPanel :visible="true" />
                            <DxPaging :page-size="5" :page-index="0" />
                            <DxPager :show-page-size-selector="true" :allowed-page-sizes="[5, 10, 25]"
                                :show-navigation-buttons="true" :show-info="false" info-text="Page {0} of {1} ({2} items)" />
                            <DxExport :enabled="false" />
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
        <AddProbe v-if="isShow === 1" @popup="isShow = 0" />
        <EditProbe v-if="isShow === 2" @popup="isShow = 0" />
    </div>
</template>

<script>
/* eslint-disable */
//API
import { axios } from "/axios.js";
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
    // DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    // DxForm
    DxMasterDetail
} from "devextreme-vue/data-grid";

//Structures

export default {
    name: "inspection-record",
    props: {
        id_record: Number,
        moc_no: String,
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
        // DxLookup,
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
            subpageName: "MOC Number: " + this.moc_no,
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            // this.FETCH_DROPDOWN_NOC();
            // this.FETCH_DROPDOWN_RRL();
            // this.FETCH_DROPDOWN_STATUS();
            // this.FETCH_MOC_RECORD();
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
            monitoringRecord: [
                {
                    id: 1,
                    record_date: '2 May 2022',
                    metal_loss: '0.0064',
                    corrosion_rate: '0.0002',
                    comments: 'Low corrosion rate'
                },
                {
                    id: 2,
                    record_date: '25 Apr 2021',
                    metal_loss: '0.0054',
                    corrosion_rate: '0.0001',
                    comments: 'Low corrosion rate'
                },
                {
                    id: 3,
                    record_date: '25 Mar 2020',
                    metal_loss: '0.0068',
                    corrosion_rate: '0.0003',
                    comments: 'Low corrosion rate'
                },
            ],
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
            chartOptions: {},
            tabs: ['Summary Dashboard', 'Probe Record', 'Library'],
            active_tab: 'Summary Dashboard',
            isShow: 0,
            dataGridAttributes: {
                class: "data-grid"
            },
        };
    },
    computed: {},
    methods: {
        SET_IS_SHOW(val) {
            if (val) this.isShow = val;
        },
        FETCH_MOC_RECORD() {
            this.isLoading = true;
            axios({
                method: "get",
                url:
                    "/ManagementOfChange/" + this.id_record,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.mocList = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        UPDATE_RECORD() {
            if (this.mocList.start_date !== null)
                this.mocList.start_date = moment(this.mocList.start_date).format("L");
            if (this.mocList.expiry_date !== null)
                this.mocList.expiry_date = moment(this.mocList.expiry_date).format("L");
            axios({
                method: "put",
                url: "/ManagementOfChange/" + this.mocList.id,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: this.mocList
            })
                .then(res => {
                    if (res.status == 204) {
                        this.SET_CURRENT_VIEW(0);
                    }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => { });
        },
        DELETE_RECORD() {
            axios({
                method: "delete",
                url: "/ManagementOfChange/delete-management-of-change?id=" + this.mocList.id,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 204) {
                        this.SET_CURRENT_VIEW(0);
                    }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => { });
        },
        FETCH_DROPDOWN_NOC() {
            axios({
                method: "get",
                url: "/Md/get-md-moc-noc-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: {}
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.formSelect.noc = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_DROPDOWN_STATUS() {
            axios({
                method: "get",
                url: "/Md/get-md-moc-status-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: {}
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.formSelect.status = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_DROPDOWN_RRL() {
            axios({
                method: "get",
                url: "/Md/get-md-moc-rrl-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: {}
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.formSelect.rrl = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        SET_CURRENT_VIEW(view, data = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", true);
            if (data !== null) this.$emit('currentView', view, data);
            else this.$emit('currentView', view);
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
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    transition: 1s;
    cursor: pointer;
    margin-bottom: 15px;
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
            padding: 5px;
            width: 160px;
        }
        .active {
            color: white;
             background-color: $web-theme-color-secondary;
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