<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <DxDataGrid 
                    id="data-grid-list" 
                    key-expr="id" 
                    :data-source="shortTermRecordList"
                    :selection="{ mode: 'single' }" 
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
                        mode="popup" 
                    />
                    <DxFilterRow :visible="true" />
                    <DxHeaderFilter :visible="true" />
                    <DxSelection mode="single" />
                    <DxColumn data-field="fa_number" caption="Action No." :width="130" alignment="center" />
                    <DxColumn data-field="tag_no" caption="Tag No." :width="120" alignment="center" />
                    <DxColumn data-field="wo_no" caption="SAP WO No." :width="120" alignment="center" />
                    <DxColumn data-field="action_details" caption="Action Detail" :min-width="200" alignment="left" />
                    <DxColumn data-field="action_date" caption="Action Date" :width="120" alignment="center"
                        dataType="date" format="dd MMM yyyy" />
                    <DxColumn data-field="id_discipline" caption="Discipline" :width="100" alignment="center">
                        <DxLookup :data-source="formSelect.discipline" display-expr="discipline" value-expr="id" />
                    </DxColumn>
                    <DxColumn data-field="id_failure_action_status" caption="Status" :width="100" alignment="center">
                        <DxLookup :data-source="formSelect.status" display-expr="status" value-expr="id" />
                    </DxColumn>
                    <!-- <DxColumn :width="80" alignment="center" cell-template="action-cell-template" /> -->

                    <!-- <template #action-cell-template="{ data }">
                        <div class="action-wrapper">
                            <div @click="SET_CURRENT_VIEW(2, data.data.id)">
                                <img src="/img/svg/pen-svg.svg" class="penSvg" />
                            </div>
                            <div @click="DELETE_RECORD(data)">
                                <img src="/img/svg/trash-svg.svg" class="trashSvg" />
                            </div>
                        </div>
                    </template> -->

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
import {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    DxHeaderFilter,
    DxSelection,
    DxEditing,
    DxFilterRow,
    DxLookup,
} from "devextreme-vue/data-grid";

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
        DxHeaderFilter,
        DxSelection,
        DxEditing,
        DxFilterRow,
        DxLookup,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "SHORT TERM TRACKING",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.FETCH_DISCIPLINE();
            this.FETCH_STATUS();
            this.FETCH_SHORT_TERM_RECORD();
        }
    },
    data() {
        return {
            testList: null,
            shortTermRecordList: {},
            dataGridAttributes: {
                class: "data-grid-style"
            },
            formSelect: [
                {
                    discipline: {},
                    status: {}
                }
            ]
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
                        "LONG-TERM-ACTION.xlsx"
                    );
                });
            });
            e.cancel = true;
        },
        FETCH_SHORT_TERM_RECORD() {
            this.isLoading = true;
            axios({
                method: "get",
                url:
                    "/FailureActionRecord",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        const list = [];
                        res.data.forEach(data => {
                            if (data.action_type == 'short-term')
                                list.push(data)
                        });
                        this.shortTermRecordList = list;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        DELETE_RECORD(e) {
            axios({
                method: "delete",
                url: "/FailureActionRecord/delete-failure-action-record?id=" + e.key,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 204) {
                        this.FETCH_SHORT_TERM_RECORD();
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
            this.$store.commit("SET_SHOW_BACK_BUTTON", false);
            if (data !== null) this.$emit('currentView', view, data);
            else this.$emit('currentView', view);
        },
        FETCH_DISCIPLINE() {
            axios({
                method: "get",
                url: "/Md/get-md-failure-discipline-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: {}
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.formSelect.discipline = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_STATUS() {
            axios({
                method: "get",
                url: "/Md/get-md-failure-action-status-list",
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
    },
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