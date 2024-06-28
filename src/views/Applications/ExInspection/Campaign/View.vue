<template>
    <div>
        <div class="page-container">
            <div class="page-section">
                <DxDataGrid
                id="data-grid-list"
                :ref="gridRefName"
                :data-source="campaignList"
                :hover-state-enabled="true"
                :allow-column-reordering="true"
                :show-borders="true"
                :show-row-lines="true"
                :row-alternation-enabled="false"
                :column-hiding-enabled="false"
                :word-wrap-enabled="true"
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
                    data-field="year" 
                    caption="Year" 
                    alignment="center"
                    :width="100"
                >
                </DxColumn>
                <DxColumn 
                    data-field="id_platform" 
                    caption="Platform" 
                    alignment="center" 
                    :width="100"
                >
                <DxLookup :data-source="platformList" display-expr="code_name" value-expr="id" />
                </DxColumn>
                <DxColumn caption="Period">
                    <DxColumn 
                        data-field="from_date" 
                        caption="From Date" 
                        data-type="date" 
                        alignment="center" 
                        :width="110"
                        format="dd MMM yyyy"
                    />
                    <DxColumn 
                        data-field="to_date" 
                        caption="To Date" 
                        data-type="date"
                        alignment="center" 
                        :width="110"
                        format="dd MMM yyyy"
                    />
                </DxColumn>
                <DxColumn 
                    data-field="description" 
                    caption="Description" 
                    alignment="left"  
                    :min-width="150"
                >
                </DxColumn>
                <DxColumn 
                    data-field="inspected" 
                    caption="Inspected" 
                    alignment="center" 
                    :width="100"
                >
                </DxColumn>
                <DxColumn 
                    data-field="total_equipment" 
                    caption="Total Equipment" 
                    alignment="center" 
                    :width="100"
                >
                </DxColumn>
                <DxColumn 
                    data-field="process" 
                    caption="Process (%)" 
                    alignment="center" 
                    :width="100"
                >
                </DxColumn>
                <DxColumn 
                    :width="110" 
                    alignment="center" 
                    cell-template="action-cell-template" 
                />
        
                <template #action-cell-template="{ data }">
                    <div class="action-wrapper">
                        <div
                            @click="SET_CURRENT_VIEW(1, data.data.id)">
                            <img src="/img/svg/magnifying-glass-svg.svg" class="penSvg" />
                        </div>
                        <div @click="() => [isShow = 2, selectedId = data.data.id]">
                            <img src="/img/svg/pen-svg.svg" class="penSvg" />
                        </div>
                        <div @click="DELETE_RECORD(data)">
                            <img src="/img/svg/trash-svg.svg" class="trashSvg" />
                        </div>
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
            @popup="FETCH_CAMPAIGN" 
        />
        <EditTagRegistration 
            v-if="isShow === 2" 
            @popup="FETCH_CAMPAIGN" 
            :id_record="selectedId" 
        />
    </div>
</template> 

<script>
//API
import { axios } from "/axios.js";
// import moment from "moment";
import AddTagRegistration from "./Add.vue"
import EditTagRegistration from "./Edit.vue"

//Components
//import VueTabsChrome from "vue-tabs-chrome";
// import downloadFileSvg from "@/components/svg/download-file-svg.vue"
// import magnifyingGlassSvg from "@/components/svg/magnifying-glass-svg.vue"
// import penSvg from "@/components/svg/pen-svg.vue"
// import trashSvg from "@/components/svg/trash-svg.vue"

//DataGrid
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
        DxToolbar,
        // DxForm,
        DxItem,
        DxEditing,
        DxLookup,
        // DxRequiredRule,
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
            subpageName: "Ex-INSPECTION CAMPAIGN",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.FETCH_DATA('/Md/get-md-platform-list', 'platformList');
            this.campaignList = [
                {
                    id: 1,
                    id_platform: 1,
                    year: 2024,
                    description: '-',
                    from_date: '2024-01-01',
                    to_date: '2024-03-31',
                    inspected: 40,
                    total_equipment: 200,
                    process: 20,
                },
                {
                    id: 2,
                    id_platform: 2,
                    year: 2024,
                    description: '-',
                    from_date: '2024-04-01',
                    to_date: '2024-04-30',
                    inspected: 200,
                    total_equipment: 500,
                    process: 40,
                },
                {
                    id: 3,
                    id_platform: 3,
                    year: 2024,
                    description: '-',
                    from_date: '2024-05-01',
                    to_date: '2024-06-30',
                    inspected: 115,
                    total_equipment: 230,
                    process: 50,
                },
                {
                    id: 4,
                    id_platform: 4,
                    year: 2023,
                    description: '-',
                    from_date: '2023-12-01',
                    to_date: '2024-01-31',
                    inspected: 143,
                    total_equipment: 143,
                    process: 100,
                },
            ];
        }
    },
    data() {
        return {
            campaignList: [],
            platformList: [],
            isShow: 0,
            selectedId: null,
            gridRefName: "grid",
        };
    },
    computed: {
        baseURL() {
            var mode = this.$store.state.mode;
            if (mode == "dev") return this.$store.state.modeURL.dev;
            else if (mode == "prod") return this.$store.state.modeURL.prod;
            else return console.log("develpment mode set up incorrect.");
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
                        "inspection_record.xlsx"
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
        ADD_ROW() {
            this.isShow = 1
        },
        FETCH_CAMPAIGN() {
            this.isShow = 0
        },
        SET_CURRENT_VIEW(view, data = null, data2 = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", false);
            if (data !== null && data2 === null) this.$emit('currentView', view, data);
            else if (data !== null && data2 !== null) this.$emit('currentView', view, data, data2);
            else this.$emit('currentView', view);
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