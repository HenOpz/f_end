<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <DxDataGrid
                    id="data-grid-list" 
                    key-expr="id" 
                    :data-source="sapHeaderList"
                    :hover-state-enabled="true" 
                    :allow-column-reordering="true"
                    :show-borders="true" 
                    :show-row-lines="true" 
                    :row-alternation-enabled="false"
                    :word-wrap-enabled="true" 
                    :column-auto-width="true"
                    style="font-size: 12px;"
                >
                    <DxEditing 
                        :allow-updating="false"
                        :allow-deleting="false" 
                        :allow-adding="false"
                        :use-icons="true"
                        mode="row" 
                    />
                    <DxFilterRow :visible="true" />
                    <DxHeaderFilter :visible="true" />
                    <DxColumn 
                        data-field="wo_order_no" 
                        caption="Work Order" 
                        :width="120" 
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="description" 
                        caption="Description" 
                        :min-width="120" 
                        alignment="left"
                    />
                    <DxColumn 
                        data-field="main_workctr" 
                        caption="Main WorkCtr" 
                        :width="100" 
                        alignment="center"
                    />
                    <DxColumn 
                        data-field="required_start_date" 
                        caption="Required Start Date" 
                        :width="120" 
                        data-type="date"
                        alignment="center"
                        format="dd MMM yyyy"
                    />
                    <DxColumn 
                        data-field="required_end_date" 
                        caption="Required End Date" 
                        :width="120" 
                        data-type="date"
                        alignment="center"
                        format="dd MMM yyyy"
                    />
                    <DxColumn 
                        data-field="additional_data" 
                        caption="Additional" 
                        :min-width="120" 
                        alignment="left"
                    />
                    <DxColumn 
                        data-field="accessibility" 
                        caption="Accessibility" 
                        :width="130" 
                        alignment="center"
                    />
                    <DxColumn 
                        data-field="scaffolding_requirement" 
                        caption="Scaffolding Req." 
                        :width="120" 
                        alignment="center"
                    />
                    <DxColumn 
                        data-field="system_status" 
                        caption="System Status" 
                        :width="120" 
                        alignment="center"
                    />

                    <!-- Configuration goes here -->
                    <!-- <DxFilterRow :visible="true" /> -->
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
import { GET_DATA } from "/axios.js";
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
// import { DxItem } from "devextreme-vue/form";
// import DxButton from "devextreme-vue/button";
import {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    DxHeaderFilter,
    // DxSelection,
    DxEditing,
    DxFilterRow,
    // DxToolbar
    // DxLookup,
} from "devextreme-vue/data-grid";

export default {
    name: "gpi-sap-tracking",
    components: {
        DxDataGrid,
        DxSearchPanel,
        DxPaging,
        DxPager,
        DxScrolling,
        DxColumn,
        DxExport,
        DxHeaderFilter,
        // DxSelection,
        DxEditing,
        DxFilterRow,
        // DxToolbar,
        // DxItem,
        // DxButton
        // DxLookup,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "SAP TRACKING",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            GET_DATA(this, `/SapHeader/get-sap-header-by-module?id_module=${6}`, 'sapHeaderList');
        }
    },
    data() {
        return {
            sapHeaderList: [],
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
                        "SHORT-TERM-ACTION.xlsx"
                    );
                });
            });
            e.cancel = true;
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
}

.page-section {
    padding: 20px 40px;
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