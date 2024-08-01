<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <DxDataGrid 
                    id="data-grid-list" 
                    key-expr="id" 
                    :data-source="rectificationCampaignList"
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
                    <!-- <DxColumn data-field="id" caption="Item" :width="70" alignment="center" /> -->
                    <DxColumn 
                        data-field="rc_issue" 
                        caption="Rectification Issue" 
                        :width="300" 
                        alignment="left" 
                    />
                    <DxColumn 
                        data-field="person_in_charge" 
                        caption="PIC" 
                        :width="120" 
                        alignment="center"
                    />
                    <DxColumn 
                        data-field="contactor" 
                        caption="Contractor" 
                        :width="120" 
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="target_completion" 
                        caption="Target Completion" 
                        :width="120"
                        alignment="center" 
                        data-type="date"
                        format="dd MMM yyyy"
                    />
                    <DxColumn 
                        data-field="id_status_work_package" 
                        caption="Work Package"
                        :width="120" 
                        alignment="center"
                        cellTemplate="block-cell-template" 
                    />
                    <DxColumn 
                        data-field="id_status_manpower" 
                        caption="Manpower"
                        :width="120" 
                        alignment="center"
                        cellTemplate="block-cell-template" 
                    />
                    <DxColumn 
                        data-field="id_status_equipment" 
                        caption="Equipment"
                        :width="120" 
                        alignment="center"
                        cellTemplate="block-cell-template" 
                    />
                    <DxColumn 
                        data-field="id_status_pob" 
                        caption="POB"
                        :width="120" 
                        alignment="center"
                        cellTemplate="block-cell-template" 
                    />
                    <DxColumn 
                        data-field="id_status_execute" 
                        caption="Execute"
                        :width="120" 
                        alignment="center"
                        cellTemplate="block-cell-template" 
                    />
                    <DxColumn 
                        data-field="comments" 
                        caption="Comments" 
                        :width="300" 
                        alignment="left" 
                    />
                    <DxColumn 
                        :width="80"
                        alignment="center" 
                        cell-template="action-cell-template" 
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

                    <template #block-cell-template="{ data }">
                        <div class="block" :style="{ backgroundColor: GET_STATUS_CELL_COLOR(data) }"></div>
                    </template>

                    <!-- Configuration goes here -->
                    <!-- <DxFilterRow :visible="true" /> -->
                    <DxScrolling mode="standard" />
                    <DxSearchPanel :visible="true" />
                    <DxPaging :page-size="10" :page-index="0" />
                    <DxPager 
                        :show-page-size-selector="true" 
                        :allowed-page-sizes="[10, 20, 30]"
                        :show-navigation-buttons="true" 
                        :show-info="false" 
                        info-text="Page {0} of {1} ({2} items)" />
                    <DxExport :enabled="false" />
                </DxDataGrid>
            </div>
        </div>
    </div>
</template>

<script>
import { GET_DATA, DELETE_DATA } from "/axios.js";
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
    name: "rectification-campaign",
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
            subpageName: "RECTIFICATION CAMPAIGN",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.FETCH_DROPDOWN_STATUS();
            this.FETCH_RECTICATION_CAMPAIGN();
        }
    },
    data() {
        return {
            rectificationCampaignList: {},
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
                        "RECTIFICATION-CAMPAIGN.xlsx"
                    );
                });
            });
            e.cancel = true;
        },
        FETCH_RECTICATION_CAMPAIGN() {
            GET_DATA(this, '/RectificationCampaign', 'rectificationCampaignList');
        },
        DELETE_RECORD(e) {
            this.$ons.notification.confirm("Confirm Delete Rectification Campaign?").then((res) => {
                if (res == 1) {
                    DELETE_DATA(`RectificationCampaign/delete-rectification-campaign?id=${e.key}`, () => { this.FETCH_RECTICATION_CAMPAIGN(); });
                }
            });
        },
        GET_STATUS_CELL_COLOR(value) {
            if (value.rowType === "data") {
                if(value.value) {
                    const color = this.status.filter(item => {
                        return item.id === value.value
                    });
                    console.log(color);
                    return color[0].color_code;
                } 
            }
        },
        FETCH_DROPDOWN_STATUS() {
            GET_DATA(this, '/Md/get-md-rectification-status-list', 'status');
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