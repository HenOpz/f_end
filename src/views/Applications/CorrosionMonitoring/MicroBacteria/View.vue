<template>
    <div>
        <div class="page-container">
            <div class="page-section">
                <DxDataGrid
                id="data-grid-list"
                key-expr="id"
                :ref="gridRefName"
                :data-source="microBacteriaList"
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
                <DxColumn caption="ATP">
                    <DxColumn 
                        data-field="atp_latest_date" 
                        caption="Latest Date" 
                        alignment="center"
                        :width="100"
                    />
                    <DxColumn 
                        data-field="atp" 
                        caption="ATP (pgATP/mL)" 
                        alignment="center"
                        :width="100"
                    />
                </DxColumn>
                <DxColumn caption="GHB">
                    <DxColumn 
                        data-field="ghb_latest_date" 
                        caption="Latest Date" 
                        alignment="center"
                        :width="100"
                    />
                    <DxColumn 
                        data-field="ghb" 
                        caption="GHB (Cells/mL)" 
                        alignment="center"
                        :width="100"
                    />
                </DxColumn>
                <DxColumn caption="APGHB">
                    <DxColumn 
                        data-field="apghb_latest_date" 
                        caption="Latest Date" 
                        alignment="center"
                        :width="100"
                    />
                    <DxColumn 
                        data-field="apghb" 
                        caption="APGHB (Cells/mL)" 
                        alignment="center"
                        :width="100"
                    />
                </DxColumn>
                <DxColumn caption="Sulphide">
                    <DxColumn 
                        data-field="sulphide_latest_date" 
                        caption="Latest Date" 
                        alignment="center"
                        :width="100"
                    />
                    <DxColumn 
                        data-field="sulphide" 
                        caption="Sulphide (mg/L)" 
                        alignment="center"
                        :width="100"
                    />
                </DxColumn>
                <DxColumn caption="SRB">
                    <DxColumn 
                        data-field="srb_latest_date" 
                        caption="Latest Date" 
                        alignment="center"
                        :width="100"
                    />
                    <DxColumn 
                        data-field="srb" 
                        caption="SRB (cfu)" 
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
            @popup="FETCH_DATA('/CMInfo', 'microBacteriaList');"
            :tagList="microBacteriaList" 
        />
        <EditTagRegistration
            v-if="isShow === 2" 
            @popup="FETCH_DATA('/CMInfo', 'microBacteriaList');" 
            :dataInfo="selectedData" 
        />
    </div>
</template> 

<script>
//API
import { axios } from "/axios.js";
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

//Structures

export default {
    name: "micro-bacteria-list",
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
            subpageName: "MICROBIOLOGICAL BACTERIA",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.system = this.$route.fullPath.split('/')[2];
            this.isCoolingMedium = this.CHECK_SYSTEM('cooling-medium');
            this.isProducedWater = this.CHECK_SYSTEM('produced-water');
            this.isSeaWater = this.CHECK_SYSTEM('sea-water');
            this.isPipeline = this.CHECK_SYSTEM('pipeline');
            this.FETCH_DATA('/Md/get-md-platform-list', 'platformList');
            this.FETCH_DATA('/CMInfo', 'microBacteriaList');
        }
    },
    data() {
        return {
            platformList: [],
            microBacteriaList: [],
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
                        "CM-MICRO-BACTERIA.xlsx"
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
                                this.microBacteriaList = this.microBacteriaList.filter(t => t.id_system == this.SYSTEM_ID && t.is_micro_bacteria);
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
            if (value.rowType === "data" && value.column.dataField === "atp") {
                if (value.data.atp) {
                    let str = value.data.atp.split(" ");
                    let num = Number(str[str.length - 1]);

                    if (num <= 10) return this.cellColors.green;
                    else if (num > 10 && num <= 100) return this.cellColors.yellow;
                    else if (num > 100) return this.cellColors.red;
                }
            }
            if (value.rowType === "data" && value.column.dataField === "ghb") {
                if (value.data.ghb) {
                    let str = value.data.ghb.split(" ");
                    let num = Number(str[str.length - 1]);

                    if (num <= 0.3) return this.cellColors.green;
                    else if (0.3 < num && num  <= 100) return this.cellColors.yellow;
                    else if (num > 100) return this.cellColors.red;
                }
            }
            if (value.rowType === "data" && value.column.dataField === "apghb") {
                if (value.data.apghb) {
                    let str = value.data.apghb.split(" ");
                    let num = Number(str[str.length - 1]);

                    if (num <= 0.3) return this.cellColors.green;
                    else if (0.3 < num && num  <= 100) return this.cellColors.yellow;
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
            if(e.rowType === "data" && e.column.dataField === "atp") {
                e.cellElement.style.backgroundColor = this.GET_STATUS_CELL_COLOR(e);
                e.cellElement.style.textTransform = "uppercase";
            }
            if(e.rowType === "data" && e.column.dataField === "ghb") {
                e.cellElement.style.backgroundColor = this.GET_STATUS_CELL_COLOR(e);
                e.cellElement.style.textTransform = "uppercase";
            }
            if(e.rowType === "data" && e.column.dataField === "apghb") {
                e.cellElement.style.backgroundColor = this.GET_STATUS_CELL_COLOR(e);
                e.cellElement.style.textTransform = "uppercase";
            }
            if(e.rowType === "data" && e.column.dataField === "srb") {
                e.cellElement.style.backgroundColor = this.GET_STATUS_CELL_COLOR(e);
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