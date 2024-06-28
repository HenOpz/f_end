<template>
    <div class="page-container">
        <div class="action-bar">
            <button class="back" @click="SET_CURRENT_VIEW(0)">
                <i class="fas fa-chevron-left"></i> BACK
            </button>
        </div>
        <br>
        <div class="page-section">
            <div class="table-wrapper">
                <div class="charts">
                    <DxPolarChart id="chart" style="width: 300px; height: 300px;" :data-source="graph.data">
                        <DxCommonSeriesSettings type="line" />
                        <DxSeries v-for="v in graph.key" :key="v" :value-field="`${v}`" :name="`${v}`"/>
                        <DxArgumentAxis :start-angle="0" :tick-interval="45" />
                        <DxValueAxis :minValueMargin="10" :maxValueMargin="0.1" />
                        <DxLegend :visible="false"/>
                    </DxPolarChart>

                    <DxPolarChart id="chart" style="width: 300px; height: 300px;" :data-source="graph.data">
                        <DxCommonSeriesSettings type="line" />
                        <DxSeries v-for="v in graph.key" :key="v" :value-field="`${v}`" :name="`${v}`"/>
                        <DxArgumentAxis :start-angle="0" :tick-interval="45" />
                        <DxValueAxis :minValueMargin="10" :maxValueMargin="0.1" />
                        <DxLegend :visible="false"/>
                    </DxPolarChart>
                </div>

                <div>
                    <DxDataGrid
                        id="data-grid-list"
                        :ref="gridRefName"
                        :data-source="inspectionList"
                        :hover-state-enabled="true" 
                        :allow-column-reordering="true"
                        :show-borders="true" 
                        :show-row-lines="true" 
                        :row-alternation-enabled="false"
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
                        <DxFilterRow :visible="true" />
                        <DxHeaderFilter :visible="true" />
                        <DxColumn 
                            data-field="tag_no" 
                            caption="Tag No."
                            width="150"
                        >
                        </DxColumn>
                        <DxColumn caption="Inspection Detail">
                            <DxColumn 
                                data-field="inspection_date" 
                                caption="Date" 
                                data-type="date" 
                                alignment="center" 
                                :width="110" 
                                format="dd MMM yyyy"
                            />
                            <DxColumn 
                                data-field="inspection_type" 
                                caption="Type" 
                                alignment="center" 
                                :width="110" 
                            />
                        </DxColumn>
                        <DxColumn 
                            data-field="integrity_status" 
                            caption="Integrity Status" 
                            alignment="center"
                            :width="110"
                        >
                        </DxColumn>
                        <DxColumn 
                            :width="60" 
                            alignment="center" 
                            cell-template="action-cell-template" 
                        />
                
                        <template #action-cell-template="{ data }">
                            <div class="action-wrapper">
                                <div
                                    @click="SET_CURRENT_VIEW(1, data.data.id)">
                                    <img src="/img/svg/magnifying-glass-svg.svg" class="penSvg" />
                                </div>
                            </div>
                        </template>
                        
                        <!-- <DxFilterRow :visible="true" /> -->
                        <DxScrolling mode="standard" />
                        <DxSearchPanel :visible="false" />
                        <DxPaging :page-size="10" :page-index="0" />
                        <DxPager 
                            :show-page-size-selector="true" 
                            :allowed-page-sizes="[5, 10, 20]" 
                            :show-navigation-buttons="true"
                            :show-info="true" 
                            info-text="Page {0} of {1} ({2} items)" 
                        />
                        <DxExport :enabled="false" />
                    </DxDataGrid>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { axios } from "/axios.js";
import "devextreme/dist/css/dx.light.css";
// import { DxItem } from "devextreme-vue/form";
// import DxButton from "devextreme-vue/button";

import {
  DxPolarChart,
  DxSeries,
  DxArgumentAxis,
  DxCommonSeriesSettings,
  DxValueAxis,
  DxLegend
} from "devextreme-vue/polar-chart";

import {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    //   DxToolbar,
    DxEditing,
    // DxLookup,
    // DxRequiredRule,
    DxFilterRow,
    DxHeaderFilter,
    // DxButton,
    // DxFormItem,
    // DxForm
} from "devextreme-vue/data-grid";

//Structures

export default {
    name: "inspection-record",
    components: {
        DxDataGrid,
        DxSearchPanel,
        DxPaging,
        DxPager,
        DxScrolling,
        DxColumn,
        DxExport,
        // DxToolbar,
        // DxForm,
        // DxItem,
        DxEditing,
        // DxLookup,
        // DxRequiredRule,
        DxFilterRow,
        DxHeaderFilter,
        // DxButton,
        // DxFormItem,
        DxPolarChart,
        DxSeries,
        DxArgumentAxis,
        DxCommonSeriesSettings,
        DxValueAxis,
        DxLegend
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "Year: 2024 Platform: MDA",
            subpageInnerName: null,
        });
        // if (this.$store.state.status.server == true) {
            
        // }
    },
    data() {
        return {
            inspectionList: [
                {
                    id: 1,
                    tag_no: 'MDA-XXX-001',
                    inspection_date: '1/2/2024',
                    inspection_type: 'C',
                    integrity_status: 1
                },
                {
                    id: 2,
                    tag_no: 'MDA-XXX-002',
                    inspection_date: '1/3/2024',
                    inspection_type: 'D',
                    integrity_status: 2
                },
                {
                    id: 3,
                    tag_no: 'MDA-XXX-003',
                    inspection_date: '1/4/2024',
                    inspection_type: 'V',
                    integrity_status: 3
                },
                {
                    id: 4,
                    tag_no: 'MDA-XXX-001',
                    inspection_date: '1/5/2024',
                    inspection_type: 'C',
                    integrity_status: 1
                },
                {
                    id: 5,
                    tag_no: 'MDA-XXX-002',
                    inspection_date: '1/6/2024',
                    inspection_type: 'D',
                    integrity_status: 2
                },
                {
                    id: 6,
                    tag_no: 'MDA-XXX-003',
                    inspection_date: '1/7/2024',
                    inspection_type: 'V',
                    integrity_status: 3
                }
            ],
            graph: {
                data: {},
                key: null
            },
            cellColors: {
                green: '#34eb74',
                yellow: '#FFDB58',
                red: '#eb4034',
            },
            dataGridAttributes: {
                class: "data-grid-style"
            },
        };
    },
    computed: {
        baseURL() {
            var mode = this.$store.state.mode;
            if (mode == "dev") return this.$store.state.modeURL.dev;
            else if (mode == "prod") return this.$store.state.modeURL.prod;
            else return console.log("develpment mode set up incorrect.");
        }
    },
    methods: {
        CREATE_RECORD() {
            axios({
                method: "post",
                url: "/ExInspectionRegisterInfo",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: this.inspRecordList
            })
                .then(res => {
                    if (res.status == 201) {
                        this.$emit('popup');
                    }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => { });
        },
        SET_CURRENT_VIEW(view, data = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", true);
            if (data !== null) this.$emit('currentView', view, data);
            else this.$emit('currentView', view);
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
        GET_STATUS_CELL_COLOR(value) {
            if (value.rowType === "data" && value.column.dataField === "integrity_status") {
                if (value.data.integrity_status) {
                    if (value.data.integrity_status === 1) return this.cellColors.green;
                    else if (value.data.integrity_status === 2) return this.cellColors.yellow;
                    else if (value.data.integrity_status === 3) return this.cellColors.red;
                }
            }
        },
        onCellPrepared(e) {
            e.cellElement.style.backgroundColor = this.GET_STATUS_CELL_COLOR(e);
            e.cellElement.style.color = this.GET_STATUS_CELL_COLOR(e);
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
    height: calc(100% - 210px);
    grid-row: span 2;
}

.table-wrapper {
    display: flex;
    flex-direction: row;
    gap: 60px;

    .charts {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 6px;

        input {
            width: 200px;
        }

        span {
            font-size: 12px;
            font-weight: 600;
        }
    }

    .multiple {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }

    button {
        padding: 10px 0;
        background-color: white;
        border: solid 1px gray;
        border-radius: 10px;
        font-weight: 800;
        font-size: 16px;
        transition: 1s;
        cursor: pointer;
    }

    .create {
        color: white;
        background-color: $web-theme-color-secondary;
    }
}
</style>