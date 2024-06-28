<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <DxDataGrid 
                    id="data-grid-list" 
                    key-expr="id" 
                    :data-source="inspectionCampaignList"
                    :selection="{ mode: 'single' }" :hover-state-enabled="true" :allow-column-reordering="true"
                    :show-borders="true" 
                    :show-row-lines="true" :row-alternation-enabled="false"
                    :word-wrap-enabled="true" 
                    :column-auto-width="true"
                    @init-new-row="SET_CURRENT_VIEW(1)"
                >
                    <DxEditing 
                        :allow-updating="false" 
                        :allow-deleting="false" 
                        :allow-adding="true" :use-icons="true"
                        mode="popup" 
                    />
                    <DxFilterRow :visible="true" />
                    <DxHeaderFilter :visible="true" />
                    <DxSelection mode="single" />
                    <!-- <DxColumn data-field="id" caption="Item" :width="70" alignment="center" /> -->
                    <DxColumn 
                        data-field="inspection_program" caption="Inspection Program" 
                        :width="300"
                    />
                    <DxColumn 
                        data-field="start_date" 
                        caption="Start Date" 
                        :width="100" 
                        alignment="center"
                        dataType="date" 
                        format="dd MMM yyyy" 
                    />
                    <DxColumn 
                        data-field="end_date" 
                        caption="End Date" 
                        :width="100" 
                        alignment="center"
                        dataType="date" 
                        format="dd MMM yyyy" 
                    />
                    <DxColumn
                        data-field="person_in_charge" 
                        caption="PIC" 
                        :width="100" 
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="Contractor" 
                        caption="Contractor" 
                        :width="150" 
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="comments" 
                        caption="Comments" 
                        :width="300" 
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="id_ic_status" 
                        caption="Status" 
                        :width="90" 
                        alignment="center"
                        cellTemplate="block-cell-template" 
                    />
                    <DxColumn 
                        :width="80" 
                        alignment="center" cell-template="action-cell-template" 
                    />
                    <template #action-cell-template="{ data }">
                        <div class="action-wrapper">
                            <div @click="SET_CURRENT_VIEW(2, data.data.id)">
                                <img src="/img/svg/pen-svg.svg" class="penSvg" />
                            </div>
                            <div @click="DELETE_RECORD(data)">
                                <img src="/img/svg/trash-svg.svg" class="trashSvg" />
                            </div>
                        </div>
                    </template>

                    <template #attachment-cell-template="{ }">
                        <div class="column-template">
                            <span>FileName.ext</span>
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
                    <DxPaging :page-size="10" :page-index="0" />
                    <DxPager 
                        :show-page-size-selector="true" :allowed-page-sizes="[5, 10, 25]"
                        :show-navigation-buttons="true" :show-info="false" 
                        info-text="Page {0} of {1} ({2} items)" />
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
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "INSPECTION CAMPAIGN",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.FETCH_DROPDOWN_STATUS();
            this.FETCH_INSPECTION_RECORD();
        }
    },
    data() {
        return {
            inspectionCampaignList: {},
            status: [],
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
                        "INSPECTION-CAMPAIGN.xlsx"
                    );
                });
            });
            e.cancel = true;
        },
        FETCH_INSPECTION_RECORD() {
            this.isLoading = true;
            axios({
                method: "get",
                url:
                    "/InspectionCampaign",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    console.log("insp record:");
                    console.log(res);
                    if (res.status == 200 && res.data) {
                        this.inspectionCampaignList = res.data;
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
            this.$ons.notification.confirm("Confirm Delete Inspection Campaign?").then((res) => {
                if (res == 1) {
                    axios({
                        method: "delete",
                        url: "InspectionCampaign/delete-insp-campaign?id=" + e.key,
                        headers: {
                            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                        }
                    })
                        .then(res => {
                            if (res.status == 204) {
                                console.log("delete success");
                                this.FETCH_INSPECTION_RECORD();
                            }
                        })
                        .catch(error => {
                            this.$ons.notification.alert(
                                error.code + " " + error.response.status + " " + error.message
                            );
                        })
                        .finally(() => { });
                }
            });
        },
        GET_STATUS_CELL_COLOR(value) {
            if (value.rowType === "data" && value.column.dataField === "id_ic_status") {
                if(value.data.id_ic_status) {
                    const color = this.status.filter(item => {
                        return item.id === value.data.id_ic_status
                    });
                    console.log(color);
                    return color[0].color_code;
                } else {
                    return '#fff';
                }
            }
        },
        FETCH_DROPDOWN_STATUS() {
        axios({
            method: "get",
            url: "/Md/get-md-insp-campaign-status-list",
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
        SET_CURRENT_VIEW(view, data = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", false);
            if (data !== null) this.$emit('currentView', view, data);
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
    align-items: center;
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