<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <DxDataGrid 
                    id="data-grid-list" 
                    key-expr="id" 
                    :data-source="mocList" 
                    :selection="{ mode: 'single' }"
                    :hover-state-enabled="true" 
                    :allow-column-reordering="true" 
                    :show-borders="true"
                    :show-row-lines="true" 
                    :row-alternation-enabled="false" 
                    :word-wrap-enabled="true"
                    :column-auto-width="true" 
                    @init-new-row="SET_CURRENT_VIEW(1)"
                >
                    <DxEditing 
                        :allow-updating="false"
                        :allow-deleting="false" 
                        :allow-adding="true" 
                        :use-icons="true"
                        mode="popup" 
                    />
                    <DxFilterRow :visible="true" />
                    <DxHeaderFilter :visible="true" />
                    <DxSelection mode="single" />
                    <!-- <DxColumn 
                        data-field="id" 
                        caption="No." 
                        :width="80" 
                        alignment="center" 
                    /> -->
                    <DxColumn 
                        data-field="moc_number" 
                        caption="MOC No." 
                        :width="140" 
                        alignment="center"
                    />
                    <DxColumn 
                        data-field="title" 
                        caption="Title" 
                        :width="200"
                        alignment="left" 
                    />
                    <DxColumn 
                        data-field="worksite" 
                        caption="Worksite" 
                        :width="120" 
                        alignment="center"
                    />
                    <DxColumn 
                        data-field="id_moc_noc" 
                        caption="Nature Of Change" 
                        :width="120" 
                        alignment="center"
                    >
                        <DxLookup :data-source="noc" display-expr="status" value-expr="id" />
                    </DxColumn>
                    <DxColumn 
                        data-field="id_moc_rrl" 
                        caption="Residual Risk Level" 
                        :width="120" 
                        alignment="center"
                    >
                        <DxLookup :data-source="rrl" display-expr="status" value-expr="id" />
                    </DxColumn>
                    <DxColumn 
                        data-field="start_date" 
                        caption="Start Date" 
                        :width="100" 
                        alignment="center"
                        dataType="date" 
                        format="dd MMM yyyy" 
                    />
                    <DxColumn 
                        data-field="expiry_date" 
                        caption="Expiry Date" 
                        :width="100" 
                        alignment="center"
                        dataType="date" 
                        format="dd MMM yyyy" 
                    />
                    <DxColumn 
                        data-field="id_moc_status" 
                        cellTemplate="block-cell-template" 
                        caption="Status" 
                        :width="100"
                        alignment="center"
                    />
                    <DxColumn 
                        data-field="initiator" 
                        caption="Initiator" 
                        :width="100"
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="action" 
                        caption="Action" 
                        :width="200" 
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="remark" 
                        caption="Remark" 
                        :width="200" 
                        alignment="left" 
                    />
                    <!-- <DxColumn caption="MOC" :width="80" alignment="center" cell-template="moc-cell-template" />
                    <DxColumn caption="RA" :width="80" alignment="center" cell-template="ra-cell-template" /> -->
                    <DxColumn :width="80" alignment="center" cell-template="action-cell-template" />

                    <template #action-cell-template="{ data }">
                        <div class="action-wrapper">
                            <div @click="SET_CURRENT_VIEW(2, data.data.id, data.data.moc_number)">
                                <img src="/img/svg/pen-svg.svg" class="penSvg" />
                            </div>
                            <div @click="DELETE_RECORD(data)">
                                <img src="/img/svg/trash-svg.svg" class="trashSvg" />
                            </div>
                        </div>
                    </template>

                    <template #moc-cell-template="{ }">
                        <div class="column-template">
                            <downloadFileSvg />
                            <magnifyingGlassSvg />
                        </div>
                    </template>

                    <template #ra-cell-template="{ }">
                        <div class="column-template">
                            <downloadFileSvg />
                            <magnifyingGlassSvg />
                        </div>
                    </template>

                    <template #block-cell-template="{ data }">
                        <div class="block" :style="{ backgroundColor: GET_STATUS_CELL_COLOR(data) }"></div>
                    </template>

                    <!-- Configuration goes here -->
                    <!-- <DxFilterRow :visible="true" /> -->
                    <DxScrolling mode="standard" />
                    <DxSearchPanel :visible="true" />
                    <DxPaging :page-size="5" :page-index="0" />
                    <DxPager :show-page-size-selector="true" :allowed-page-sizes="[5, 10, 25]"
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
// import downloadFileSvg from "@/components/svg/download-file-svg.vue"
// import magnifyingGlassSvg from "@/components/svg/magnifying-glass-svg.vue"
// import penSvg from "@/components/svg/pen-svg.vue"
// import trashSvg from "@/components/svg/trash-svg.vue"

//DataGrid
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
// import DxAddRowButton from "devextreme-vue/button";
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
    DxLookup,
    // DxRequiredRule,
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
        DxHeaderFilter,
        DxSelection,
        // DxForm,
        // DxItem,
        DxEditing,
        DxFilterRow,
        // DxAddRowButton,
        DxLookup,
        // DxRequiredRule,
        // DxFormItem
        // downloadFileSvg,
        // magnifyingGlassSvg,
        // penSvg,
        // trashSvg
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "MANAGEMENT OF CHANGE",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.FETCH_DROPDOWN_NOC();
            this.FETCH_DROPDOWN_RRL();
            this.FETCH_DROPDOWN_STATUS();
            this.FETCH_MOC_RECORD();
        }
    },
    data() {
        return {
            testList: null,
            mocList: {},
            dataGridAttributes: {
                class: "data-grid-style"
            },
            rrl: [],
            status: [],
            noc: [],
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
        FETCH_MOC_RECORD() {
            this.isLoading = true;
            axios({
                method: "get",
                url:
                    "/ManagementOfChange",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    console.log("insp record:");
                    console.log(res);
                    if (res.status == 200 && res.data) {
                        this.mocList = res.data;
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
                url: "/ManagementOfChange/delete-management-of-change?id=" + e.key,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 204) {
                        console.log("delete success");
                        this.FETCH_MOC_RECORD();
                    }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => { });
        },
        GET_STATUS_CELL_COLOR(value) {
            if (value.rowType === "data" && value.column.dataField === "id_moc_status") {
                if(value.data.id_moc_status) {
                    const color = this.status.filter(item => {
                        return item.id === value.data.id_moc_status
                    });
                    console.log(color);
                    return color[0].color_code;
                } else {
                    return '#fff';
                }

            }
        },
        FETCH_DROPDOWN_NOC() {
      axios({
        method: "get",
        url: "/Md/get-md-moc-noc-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.noc = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_DROPDOWN_STATUS() {
      axios({
        method: "get",
        url: "/Md/get-md-moc-status-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.status = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_DROPDOWN_RRL() {
      axios({
        method: "get",
        url: "/Md/get-md-moc-rrl-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.rrl = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    SET_CURRENT_VIEW(view, data = null, data2 = null) {
        this.$store.commit("SET_SHOW_BACK_BUTTON", false);
        if (data !== null && data2 === null) this.$emit('currentView', view, data);
        else if (data !== null && data2 !== null) this.$emit('currentView', view, data, data2);
        else this.$emit('currentView', view);
    }
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