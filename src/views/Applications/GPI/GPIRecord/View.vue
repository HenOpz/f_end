<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
            <DxDataGrid 
                id="data-grid-list"
                :data-source="gpiRecordList" 
                :hover-state-enabled="true"
                :allow-column-reordering="true" 
                :show-borders="true" 
                :show-row-lines="true"
                :row-alternation-enabled="false" 
                :column-hiding-enabled="false" 
                :word-wrap-enabled="true"
                :column-min-width="100" 
                :column-auto-width="true"
                @init-new-row="SET_CURRENT_VIEW(1)"
                @cell-prepared="onCellPrepared"
            >
                <DxEditing 
                    :allow-updating="false" 
                    :allow-deleting="false" 
                    :allow-adding="true" 
                    :use-icons="true"
                    mode="popup"
                >

                </DxEditing>
                <DxFilterRow :visible="true" />
                <DxHeaderFilter :visible="true" />
                <DxColumn 
                    data-field="id_platform" 
                    caption="Platform" 
                    alignment="center" 
                    :width="50"
                >
                    <DxLookup :data-source="platformList" display-expr="code_name" value-expr="id" />
                </DxColumn>
                <DxColumn 
                    data-field="asset_type" 
                    caption="Asset Type" 
                    alignment="center"
                >
                    <!-- <DxLookup :data-source="assetTypeList" display-expr="asset_type" value-expr="id" /> -->
                </DxColumn>
                <DxColumn 
                    data-field="tag_no" 
                    caption="Tag Number" 
                    alignment="center"
                >
                </DxColumn>
                <DxColumn 
                    data-field="location_deck" 
                    caption="Location | Deck" 
                    alignment="center"
                >
                </DxColumn>
                <DxColumn 
                    data-field="gpi_date" 
                    caption="GPI Date" 
                    data-type="date" 
                    format="dd MMM yyyy"
                    alignment="center" 
                    :width="150"
                >
                </DxColumn>
                <DxColumn 
                    data-field="expected_finish_date" 
                    caption="Expected Finish Date" 
                    data-type="date"
                    format="dd MMM yyyy" 
                    alignment="center" 
                    :width="150"
                >
                </DxColumn>
                <DxColumn 
                    data-field="id_discipline" 
                    caption="Discipline" 
                    alignment="center"
                >
                    <DxLookup :data-source="disciplineList" display-expr="code" value-expr="id" />
                </DxColumn>
                <DxColumn 
                    data-field="id_severity" 
                    caption="Severity" 
                    alignment="center"
                >
                    <DxLookup :data-source="severityList" display-expr="status" value-expr="id" />
                </DxColumn>
                <DxColumn 
                    :width="80" 
                    alignment="center" 
                    cell-template="action-cell-template" 
                />

                <template #action-cell-template="{ data }">
                    <div class="action-wrapper">
                        <div @click="SET_CURRENT_VIEW(3, data.data)">
                            <img src="/img/svg/pdf-file-svg.svg" class="pdfSvg" />
                        </div>
                        <div @click="SET_CURRENT_VIEW(2, data.data)">
                            <img src="/img/svg/pen-svg.svg" class="penSvg" />
                        </div>
                        <div @click="DELETE_RECORD(data)">
                            <img src="/img/svg/trash-svg.svg" class="trashSvg" />
                        </div>
                    </div>
                </template>
                <DxMasterDetail
                    :enabled="true"
                    template="masterDetailTemplate"
                />
                <template #masterDetailTemplate="{ data }">
                    <div>
                    GPI Number: {{ data.data.gpi_number }}<br>
                    Main Component: {{ data.data.main_component_free_text }}<br>
                    Repair Description: {{ data.data.repair_type_free_text }}<br>
                    Damage Mechanism / Findings:
                    <textarea readonly :value="data.data.dmg_mech_findings" style="width: 100%; min-height: 100px; border: none; font-size: 10px; padding: 5px; margin-top: 5px;"></textarea>
                    Recommendation:
                    <textarea readonly :value="data.data.recommendation" style="width: 100%; min-height: 100px; border: none; font-size: 10px; padding: 5px; margin-top: 5px;"></textarea>
                    </div>
                </template>
                <!-- <DxFilterRow :visible="true" /> -->
                <DxScrolling mode="standard" />
                <DxSearchPanel :visible="true" />
                <DxPaging :page-size="10" :page-index="0" />
                <DxPager :show-page-size-selector="true" :allowed-page-sizes="[5, 10, 20]"
                    :show-navigation-buttons="true" :show-info="true" info-text="Page {0} of {1} ({2} items)" />
                <DxExport :enabled="false" />
            </DxDataGrid>
            </div>
        </div>
    </div>
</template>

<script>
import { axios } from "/axios.js";
// import moment from "moment";
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
    DxEditing,
    DxLookup,
    DxFilterRow,
    DxHeaderFilter,
    DxMasterDetail,
} from "devextreme-vue/data-grid";

export default {
    name: "gpi-record",
    components: {
        DxDataGrid,
        DxSearchPanel,
        DxPaging,
        DxPager,
        DxScrolling,
        DxColumn,
        DxExport,
        DxEditing,
        DxLookup,
        DxFilterRow,
        DxHeaderFilter,
        DxMasterDetail,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "GPI RECORD",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.FETCH_DATA('/Md/get-md-platform-list', 'platformList');
            this.FETCH_DATA('/Md/get-md-asset-type-list', 'assetTypeList');
            this.FETCH_DATA('/Md/get-md-gpi-main-component-list', 'mainComponentList');
            this.FETCH_DATA('/Md/get-md-gpi-damage-mechanism-list', 'damageMechanismList');
            this.FETCH_DATA('/Md/get-md-gpi-severity-list', 'severityList');
            this.FETCH_DATA('/Md/get-md-gpi-repair-list', 'typeOfRepairList');
            this.FETCH_DATA('/Md/get-md-gpi-repair-type-list', 'repairTypeList');
            this.FETCH_DATA('/Md/get-md-sap-main-work-ctr-list', 'mainWorkCtrList');
            this.FETCH_DATA('/Md/get-md-gpi-discipline-list', 'disciplineList');
            this.FETCH_DATA('/GpiRecord', 'gpiRecordList');
        }
    },
    data() {
        return {
            platformList: [],
            assetTypeList: [],
            mainComponentList: [],
            damageMechanismList: [],
            severityList: [],
            typeOfRepairList: [],
            repairTypeList: [],
            mainWorkCtrList: [],
            gpiRecordList: {},
            disciplineList: [],
            dataGridAttributes: {
                class: "data-grid-style"
            },
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
                        "GPI-RECORD.xlsx"
                    );
                });
            });
            e.cancel = true;
        },
        DELETE_RECORD(e) {
            axios({
                method: "delete",
                url: "/GpiRecord/delete-gpi-record?id=" + e.key,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 204) {
                        this.FETCH_GPI_RECORD();
                    }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => { });
        },
        onCellPrepared(e) {
            // console.log(e);
            if (e.rowType === "data" && e.column.dataField === "id_severity") {
                e.cellElement.style.backgroundColor = this.GET_STATUS_COLOR(e.data.id_severity);
                e.cellElement.style.color = "#fff";
                e.cellElement.style.textTransform = "uppercase";
            }
            if (e.rowType === "data" && e.column.dataField === "id_severity") {
                e.cellElement.style.backgroundColor = this.GET_STATUS_COLOR(e.data.id_severity);
                e.cellElement.style.color = "#fff";
                e.cellElement.style.textTransform = "uppercase";
            }
        },
        GET_STATUS_COLOR(id) {
            if (id) {
                var data = this.severityList.filter(function (s) {
                    return s.id == id;
                });
                return data[0].color_code;
            } else {
                return "#fff";
            }
        },
        GET_DAMAGE(id) {
            if (id) {
                var data = this.damageMechanismList.filter(function (s) {
                    return s.id == id;
                });
                return data[0].code;
            } else {
                return "-";
            }
        },
        GET_REPAIR_TYPE(id) {
            if (id) {
                var data = this.typeOfRepairList.filter(function (s) {
                    return s.id == id;
                });
                return data[0].code;
            } else {
                return "-";
            }
        },
        SET_CURRENT_VIEW(view, data = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", false);
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