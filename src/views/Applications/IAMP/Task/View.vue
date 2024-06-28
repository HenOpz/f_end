<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <DxDataGrid 
                    id="data-grid-list" 
                    key-expr="id" 
                    :data-source="taskList" 
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

                    <!-- <DxColumn 
                        data-field="id_item" 
                        caption="Item" 
                        :min-width="70" 
                        alignment="center" 
                    /> -->

                    <DxColumn 
                        data-field="it_number" 
                        caption="Work Order No." 
                        :min-width="90"
                        alignment="center" 
                    />
                    
                    <DxColumn 
                        data-field="id_platform" 
                        caption="Platform" 
                        :min-width="90" 
                        alignment="center" 
                    >
                        <DxLookup :data-source="platform" display-expr="code_name" value-expr="id" />
                    </DxColumn>

                    <DxColumn 
                        data-field="id_asset"
                        caption="Asset" 
                        :min-width="120" 
                        alignment="center" 
                    >
                        <DxLookup :data-source="asset" display-expr="asset_type" value-expr="id" />
                    </DxColumn>

                    <DxColumn 
                        data-field="tag_number" 
                        caption="Tag No." 
                        :min-width="140" 
                        alignment="center" 
                    />

                    <DxColumn 
                        data-field="id_insp_type"
                        caption="Inspection Type" 
                        :min-width="120" 
                        alignment="center" 
                    >
                        <DxLookup :data-source="insp_type" display-expr="insp_type" value-expr="id" />
                    </DxColumn>

                    <DxColumn 
                        data-field="due_insp_date" 
                        caption="Due Inspection Date" 
                        :min-width="80"
                        alignment="center" 
                        data-type="date"
                        format="yyyy"
                    />

                    <DxColumn
                        data-field="plan_insp_date" 
                        caption="Plan Inspection Date" 
                        :min-width="80"
                        alignment="center" 
                        data-type="date"
                        format="dd MMM yyyy"
                    />

                    <DxColumn 
                        data-field="id_insp_task_status" 
                        caption="Status" 
                        :min-width="80" 
                        alignment="center" 
                    >
                        <DxLookup :data-source="task_status" display-expr="status" value-expr="id" />
                    </DxColumn>

                    <DxColumn 
                        name="actions" 
                        data-field="status" 
                        caption="" 
                        :width="90" 
                        alignment="center"
                        cell-template="action-cell-template" 
                    />

                    <template #action-cell-template="{ data }">
                        <div class="action-wrapper">
                            <div @click="SET_CURRENT_VIEW(2, data.data)">
                                <img src="/img/svg/pen-svg.svg" class="penSvg" />
                            </div>
                            <div>
                                <img src="/img/svg/trash-svg.svg" v-if="data.value != 'Completed'" class="trashSvg" />
                            </div>
                        </div>
                    </template>

                    <DxScrolling mode="standard" />
                    <DxSearchPanel :visible="true" />
                    <DxPaging :page-size="10" :page-index="0" />
                    <DxPager :show-page-size-selector="true" :allowed-page-sizes="[10, 20, 30]"
                        :show-navigation-buttons="true" :show-info="false" info-text="Page {0} of {1} ({2} items)" />
                    <DxExport :enabled="false" />
                </DxDataGrid>
            </div>
        </div>
    </div>
</template>

<script>
//API
import { axios } from "/axios.js";
// import moment from "moment";

//Components
//import VueTabsChrome from "vue-tabs-chrome";
// import penSvg from "@/components/svg/pen-svg.vue"
// import trashSvg from "@/components/svg/trash-svg.vue"

//DataGrid
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
// import DXButton from "devextreme-vue/button";
// import { DxItem } from "devextreme-vue/form";
import {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    // DxToolbar,
    DxHeaderFilter,
    DxSelection,
    DxEditing,
    DxFilterRow,
    // DxButton,
    DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    // DxForm
} from "devextreme-vue/data-grid";
// import { platform } from "onsenui";

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
        DxHeaderFilter,
        DxSelection,
        // DxForm,
        // DxItem,
        DxEditing,
        DxFilterRow,
        // DxButton,
        // DXButton,
        DxLookup,
        // DxRequiredRule,
        // DxFormItem,
        // penSvg,
        // trashSvg
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "INSPECTION TASK",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.FETCH_DROPDOWN_ASSET();
            this.FETCH_DROPDOWN_PLATFORM();
            this.FETCH_DROPDOWN_INSP_TYPE();
            this.FETCH_DROPDOWN_TASK_STATUS();
            this.FETCH_TASK();
        }
    },
    data() {
        return {
            taskList: null,
            insp_type: [],
            platform: [],
            asset: [],
            task_status: [],
        };
    },
    computed: {},
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
        FETCH_TASK() {
            this.isLoading = true;
            axios({
                method: "get",
                url: "/InspectionTask",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            })
                .then(res => {
                    if (res.status == 200) {
                        this.taskList = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_DROPDOWN_INSP_TYPE() {
            axios({
                method: "get",
                url: "/Md/get-md-insp-type-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.insp_type = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_DROPDOWN_PLATFORM() {
            axios({
                method: "get",
                url: "/Md/get-md-platform-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.platform = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_DROPDOWN_ASSET() {
            axios({
                method: "get",
                url: "/Md/get-md-asset-type-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.asset = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_DROPDOWN_TASK_STATUS() {
            axios({
                method: "get",
                url: "/Md/get-md-insp-task-status-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.task_status = res.data;
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
            console.log('data', data);
            this.$store.commit("SET_SHOW_BACK_BUTTON", false);
            if (data !== null) this.$emit('currentView', view, data.id);
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
    overflow-y: hidden;
}

.page-section {
    padding: 20px;
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