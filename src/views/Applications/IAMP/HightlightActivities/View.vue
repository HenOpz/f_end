<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <DxDataGrid 
                    id="data-grid-list" 
                    key-expr="id" :data-source="highlightActivitiesList"
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
                        data-field="ha_number"
                        caption="HA Number" 
                        :width="90" 
                        alignment="center"
                    />
                    <DxColumn 
                        data-field="report_date" 
                        caption="Report Date" 
                        :width="90" 
                        alignment="center"
                        dataType="date" 
                        format="dd MMM yyyy" 
                    />
                    <DxColumn
                        data-field="id_platform" 
                        caption="Platform" 
                        :width="90" 
                        alignment="center" 
                    >
                        <DxLookup :data-source="platform" display-expr="code_name" value-expr="id" />
                    </DxColumn>
                    <DxColumn 
                        data-field="id_asset" 
                        caption="Asset Type" 
                        :width="100" 
                        alignment="center"
                    >
                        <DxLookup :data-source="asset" display-expr="asset_type" value-expr="id" />
                    </DxColumn>
                    <DxColumn
                        data-field="tag_number"
                        caption="Tag Number" 
                        :width="150" 
                        alignment="center"
                    />
                    <DxColumn 
                        data-field="contractor" 
                        caption="Contractor" 
                        :width="120" 
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="person_in_charge" 
                        caption="PIC" 
                        :width="100" 
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="activities" 
                        caption="Activites" 
                        :min-width="250" 
                        alignment="left" 
                    />
                    <!-- <DxColumn data-field="details" caption="Detail" :min-width="300" alignment="center" /> -->
                    <DxColumn :width="160" alignment="center" cell-template="action-cell-template" />

                    <template #action-cell-template="{ data }">
                        <div class="action-wrapper">
                            <div @click="SET_CURRENT_VIEW(3, data.data)">
                                <img src="/img/svg/pdf-file-svg.svg" class="pdfSvg" />
                            </div>
                            <div @click="() => [toggleHtmlPreview = true, htmlPreview = data.data.details]">
                                <img src="/img/svg/file-contract-svg.svg" class="pdfSvg" />
                            </div>
                            <div @click="SET_CURRENT_VIEW(2, data.data)">
                                <img src="/img/svg/pen-svg.svg" class="penSvg" />
                            </div>
                            <div @click="DELETE_RECORD(data)">
                                <img src="/img/svg/trash-svg.svg" class="trashSvg" />
                            </div>
                        </div>
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

                <div class="html-preview-container" v-if="toggleHtmlPreview">
                    
                    <div class="html-preview">
                        <div class="svg-container">
                            <svg @click="toggleHtmlPreview = false" xmlns="http://www.w3.org/2000/svg" height="24" width="18" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                        </div>
                        <div v-html="htmlPreview" />
                    </div>
                </div>
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
    // DxForm,
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
        // DxButton,
        // DXButton,
        // DxAddRowButton,
        DxLookup,
        // DxRequiredRule,
        // DxFormItem,
        // penSvg,
        // trashSvg
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "HIGHLIGHT ACTIVITIES",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.FETCH_DROPDOWN_ASSET();
            this.FETCH_DROPDOWN_PLATFORM();
            this.FETCH_HIGHLIGHT_RECORD();
        }
    },
    data() {
        return {
            highlightActivitiesList: {},
            platform: [],
            asset: [],
            htmlPreview: null,
            toggleHtmlPreview: false,
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
        FETCH_HIGHLIGHT_RECORD() {
            this.isLoading = true;
            axios({
                method: "get",
                url:
                    "/HighlightActivities",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.highlightActivitiesList = res.data;
                        console.log("highlightActivitiesList", this.highlightActivitiesList);
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
                url: "/HighlightActivities/delete-highlight-activities?id=" + e.key,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 204) {
                        this.FETCH_HIGHLIGHT_RECORD();
                    }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => { });
        },
        FETCH_DROPDOWN_ASSET() {
      axios({
        method: "get",
        url: "/Md/get-md-asset-type-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
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
    FETCH_DROPDOWN_PLATFORM() {
      axios({
        method: "get",
        url: "/Md/get-md-platform-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
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

.html-preview-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 51px calc(100vh - 95px);
    transition: all 0.3s;
    overflow-y: hidden;
    position: absolute !important;
    z-index: 999;
    top: 0;
    left: 0;
    background-color: #14141484;

    .html-preview {
        width: 900px;
        height: 400px;
        position: absolute !important;
        z-index: 999;
        margin-top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #ffffff !important;
        border-radius: 10px;
        border: #d9d9d9 1px solid;
        padding: 20px;
        overflow-y: scroll;

        .svg-container {
            width: 100%;
            display: flex;
            justify-content: end;
            
            svg {
                cursor: pointer;
            }
        }
    }
}
</style>