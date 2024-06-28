<template>
    <div>
        <div class="page-container">
            <div class="page-section">
                <DxDataGrid
                id="data-grid-list"
                key-expr="id"
                :ref="gridRefName"
                :data-source="waterAnalysisList"
                :hover-state-enabled="true"
                :allow-column-reordering="true"
                :show-borders="true"
                :show-row-lines="true"
                :row-alternation-enabled="false"
                :column-hiding-enabled="false"
                :word-wrap-enabled="true"
                :column-min-width="50"
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
                    data-field="id_platform"
                    caption="Platform" 
                    alignment="center" 
                    :width="100"
                >
                    <DxLookup :data-source="platformList" display-expr="code_name" value-expr="id" />
                </DxColumn>
                <DxColumn 
                    data-field="tag_no" 
                    caption="Tag No." 
                    alignment="left"
                    :width="120"
                >
                </DxColumn>
                <DxColumn 
                    data-field="desc" 
                    caption="Description" 
                    alignment="left"  
                    :min-width="150"
                >
                </DxColumn>
                <DxColumn caption="pH">
                    <DxColumn 
                        data-field="ph_latest_date" 
                        caption="Latest Date" 
                        alignment="center"
                        :width="100"
                    />
                    <DxColumn 
                        data-field="ph" 
                        caption="pH" 
                        alignment="center"
                        :width="100"
                    />
                </DxColumn>

                <DxColumn caption="Dissolved O2">
                    <DxColumn 
                        data-field="dissolved_o2_latest_date" 
                        caption="Latest Date" 
                        alignment="center"
                        :width="100"
                    />
                    <DxColumn 
                        data-field="dissolved_o2" 
                        caption="Dissolved O2 (ppb)" 
                        alignment="center"
                        :width="100"
                    />
                </DxColumn>

                <DxColumn caption="Ion Count">
                    <DxColumn 
                        data-field="ion_count_latest_date" 
                        caption="Latest Date" 
                        alignment="center"
                        :width="100"
                    />
                    <DxColumn 
                        data-field="ion_count" 
                        caption="Ion Count" 
                        alignment="center"
                        :width="100"
                    />
                </DxColumn>

                <!-- <DxColumn 
                    data-field="next_due_date" 
                    caption="Next Due Date" 
                    alignment="center"
                    :width="150" 
                /> -->
                <DxColumn :width="40" alignment="center" cell-template="action-cell-template" />
        
                <template #action-cell-template="{ data }">
                    <div class="action-wrapper">
                        <div @click="() => [isShow = 2, selectedData = data.data]">
                            <img src="/img/svg/magnifying-glass-svg.svg" class="penSvg" />
                        </div>
                        <!-- <div @click="DELETE_RECORD(data)">
                            <img src="/img/svg/trash-svg.svg" class="trashSvg" />
                        </div> -->
                    </div>
                </template>
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
                    @click="ADD_ROW"
                    hint="Add"
                    />
                </template>
                
                
                <!-- <DxFilterRow :visible="true" /> -->
                <DxScrolling mode="standard" />
                <DxSearchPanel :visible="true" />
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
        <AddTagRegistration 
            v-if="isShow === 1" 
            @popup="FETCH_DATA('/CMInfo', 'waterAnalysisList');"
            :tagList="waterAnalysisList" 
        />
        <EditTagRegistration 
            v-if="isShow === 2" 
            @popup="FETCH_DATA('/CMInfo', 'waterAnalysisList');" 
            :dataInfo="selectedData" 
        />
    </div>
</template> 

<script>
import { axios } from "/axios.js";
// import moment from "moment";
import AddTagRegistration from "./Add.vue"
import EditTagRegistration from "./Edit.vue"
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import { DxItem } from "devextreme-vue/form";
import DxButton from "devextreme-vue/button";

import {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    DxToolbar,
    DxEditing,
    DxLookup,
    DxFilterRow,
    DxHeaderFilter,
    // DxButton,
    // DxFormItem,
    // DxForm
} from "devextreme-vue/data-grid";

export default {
    name: "water-analysis-list",
    components: {
        DxDataGrid,
        DxSearchPanel,
        DxPaging,
        DxPager,
        DxScrolling,
        DxColumn,
        DxExport,
        DxToolbar,
        // DxForm,
        DxItem,
        DxEditing,
        DxLookup,
        DxFilterRow,
        DxHeaderFilter,
        DxButton,
        // DXButton,
        // DxFormItem,
        // penSvg,
        // trashSvg,
        AddTagRegistration,
        EditTagRegistration
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "WATER ANALYSIS",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.system = this.$route.fullPath.split('/')[2];
            this.isCoolingMedium = this.CHECK_SYSTEM('cooling-medium');
            this.isProducedWater = this.CHECK_SYSTEM('produced-water');
            this.isSeaWater = this.CHECK_SYSTEM('sea-water');
            this.isPipeline = this.CHECK_SYSTEM('pipeline');
            this.FETCH_DATA('/Md/get-md-platform-list', 'platformList');
            this.FETCH_DATA('/CMInfo', 'waterAnalysisList');
        }
    },
    data() {
        return {
            platformList: [],
            waterAnalysisList: [],
            isShow: 0,
            system: null,
            gridRefName: "grid",
            cellColors: {
                green: '#34eb74',
                yellow: '#FFDB58',
                red: '#eb4034',
            },
            isCoolingMedium: false,
            isProducedWater: false,
            isSeaWater: false,
            isPipeline: false,
        };
    },
    computed: {
        baseURL() {
            var mode = this.$store.state.mode;
            if (mode == "dev") return this.$store.state.modeURL.dev;
            else if (mode == "prod") return this.$store.state.modeURL.prod;
            else return console.log("develpment mode set up incorrect.");
        },
        SYSTEM_ID() {
            if(this.system == 'cooling-medium') return 1; 
            else if(this.system == 'produced-water') return 2; 
            else if(this.system == 'sea-water') return 3; 
            else if(this.system == 'pipeline') return 4;
            else return 0;
        },
    },
    methods: {
        EXPORT_DATA(e) {
            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet("Projects");
            exportDataGrid({
                worksheet: worksheet,
                component: e.component
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(
                        new Blob([buffer], { type: "application/octet-stream" }),
                        "CM-WATER-ANALYSIS.xlsx"
                    );
                });
            });
            e.cancel = true;
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
                            if(url == '/CMInfo') {
                                this.isShow = 0;
                                this.waterAnalysisList = this.waterAnalysisList.filter(t => t.id_system == this.SYSTEM_ID && t.is_water_analysis);
                            }
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
        CHECK_SYSTEM(e) {
            if (this.system === e) return true;
            else return false;
        },
        GET_STATUS_CELL_COLOR(value) {
            if (value.rowType === "data" && value.column.dataField === "dissolved") {
                if (value.data.dissolved) {
                    let str = value.data.dissolved.split(" ");
                    let num = Number(str[str.length - 1]);

                    if (num <= 30) return this.cellColors.green;
                    else if (isNaN(num)) return this.cellColors.yellow;
                    else if (num > 30) return this.cellColors.red;
                }
            }
        },
        onCellPrepared(e) {
            if(e.rowType === "data" && e.column.dataField === "dissolved_o2") {
                e.cellElement.style.backgroundColor = this.GET_STATUS_CELL_COLOR(e);
                // e.cellElement.style.color = "#fff";
                e.cellElement.style.textTransform = "uppercase";
            }
        },
        ADD_ROW() {
            this.isShow = 1
        },
    }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.block {
    display: flex;
    margin: 0 auto;
    width: 22px;
    height: 22px;
}

.column-template {
    display: flex;
    gap: 10px;
    justify-content: space-between;

    svg {
        width: 25px;
        transition: 0.2s;
    }

    svg:last-child {
        width: 25px;
        padding: 5px;
        background-color: blue;
        fill: white;
        border-radius: 5px;
    }

    svg:hover {
        transform: scale(1.1);
    }
}

.listSvg {
    width: 25px;
    padding: 5px;
    background-color: orange;
    fill: white;
    transition: 0.2s;
    border-radius: 5px;
}

.listSvg:hover {
    transform: scale(1.1);
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
    height: calc(100vh - 235px);
    overflow-y: auto;
    grid-row: span 2;
}

.page-section:last-child {
    padding-bottom: 20px;
}

.table-wrapper {
    margin-bottom: 200px;
}
</style>