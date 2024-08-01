<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <DxDataGrid
                    id="data-grid-list" 
                    key-expr="id" 
                    :data-source="gpiApprProcessList"
                    :hover-state-enabled="true" 
                    :allow-column-reordering="true"
                    :show-borders="true" 
                    :show-row-lines="true" 
                    :row-alternation-enabled="false"
                    :word-wrap-enabled="true" 
                    :column-auto-width="true"
                    style="font-size: 12px;"
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
                        data-field="seq" 
                        caption="No." 
                        :width="100" 
                        alignment="center" 
                        :editor-options="{ placeholder: 'No.' }"
                    />
                    <DxColumn 
                        data-field="id_user" 
                        caption="Account" 
                        :min-width="120" 
                        alignment="left"
                        :editor-options="{ placeholder: 'Select Account' }"
                    >
                        <DxLookup :data-source="userList" display-expr="username" value-expr="id" />
                    </DxColumn>
                    <DxMasterDetail
                        :enabled="true"
                        template="masterDetailTemplate"
                    />
                    <template #masterDetailTemplate="{ data }">
                        <MenuList :accountData="data"/>
                    </template>

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
import { GET_DATA, PUT_DATA, POST_DATA, DELETE_DATA } from "/axios.js";
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import MenuList from "./MenuList.vue";
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
    DxLookup,
    DxMasterDetail
} from "devextreme-vue/data-grid";

export default {
    name: "gpi-user-permission",
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
        DxLookup,
        DxMasterDetail,
        MenuList
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "USER PERMISSION",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            GET_DATA(this, '/User/get-active-user-list', null, 
                (data) => {
                    this.userList = data;
                    GET_DATA(this, '/Md/get-md-gpi-discipline-list', 'discList');
                    GET_DATA(this, '/GpiRecordAuth/gpi-record-auth-list', 'gpiApprProcessList');
                }
            );
        }
    },
    data() {
        return {
            active_tab: 1,
            gpiApprProcessList: [],
            userList: [],
            discList: [],
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
        CREATE_RECORD(e) {
            e.data.id = 0;
            e.data.is_active = true;
            POST_DATA('/GpiRecordAuth/add-gpi-record-auth', e.data, () => { GET_DATA(this, '/GpiRecordAuth/gpi-record-auth-list', 'gpiApprProcessList'); });
        },
        UPDATE_RECORD(e) {
            PUT_DATA(`/GpiRecordAuth/edit-gpi-record-auth?id=${e.data.id}`, e.data, () => { GET_DATA(this, '/GpiRecordAuth/gpi-record-auth-list', 'gpiApprProcessList'); });
        },
        DELETE_RECORD(e) {
            DELETE_DATA(`/GpiRecordAuth/delete-gpi-record-auth?id=${e.key}`, () => { GET_DATA(this, '/GpiRecordAuth/gpi-record-auth-list', 'gpiApprProcessList'); });
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