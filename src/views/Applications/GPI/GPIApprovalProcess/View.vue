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
                        caption="Seq." 
                        :width="100" 
                        alignment="center" 
                        :editor-options="{ placeholder: 'Seq.' }"
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
                    <DxColumn 
                        data-field="authorized_name" 
                        caption="Permission Description" 
                        :min-width="120" 
                        alignment="left"
                        :editor-options="{ placeholder: 'Permission Description' }"
                    />
                    <DxColumn 
                        data-field="id_discipline" 
                        caption="Discipline" 
                        :min-width="120" 
                        alignment="left"
                        :editor-options="{ placeholder: 'Select Discipline' }"
                    >
                        <DxLookup :data-source="discList" display-expr="code" value-expr="id" />
                    </DxColumn>

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
import { axios } from "/axios.js";
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
    DxLookup,
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
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "USER PERMISSION",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.FETCH_DATA('/User/get-active-user-list', null, 
                (data) => {
                    this.userList = data;
                    this.FETCH_DATA('/Md/get-md-gpi-discipline-list', 'discList');
                    this.FETCH_DATA('/GpiRecordAuth/gpi-record-auth-list', 'gpiApprProcessList');
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
            axios({
                method: "post",
                url: "/GpiRecordAuth/add-gpi-record-auth",
                headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: e.data
            })
                .then(res => {
                if (res.status == 201) {
                    this.FETCH_DATA('/GpiRecordAuth/gpi-record-auth-list', 'gpiApprProcessList');
                }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => {});
        },
        UPDATE_RECORD(e) {
            axios({
                method: "put",
                url: "/GpiRecordAuth/edit-gpi-record-auth?id=" + e.data.id,
                headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: e.data
            })
                .then(res => {
                if (res.status == 204) {
                    this.FETCH_DATA('/GpiRecordAuth/gpi-record-auth-list', 'gpiApprProcessList');
                }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => {});
        },
        DELETE_RECORD(e) {
            axios({
                method: "delete",
                url: "/GpiRecordAuth/delete-gpi-record-auth?id=" + e.key,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 204) {
                        this.FETCH_DATA('/GpiRecordAuth/gpi-record-auth-list', 'gpiApprProcessList');
                    }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => { });
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