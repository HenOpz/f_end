<template>
    <div>
        <div class="page-container">
            <div class="page-section">
                <DxDataGrid
                id="data-grid-list"
                :ref="gridRefName"
                :data-source="tagRegistrationList"
                :hover-state-enabled="true"
                :allow-column-reordering="true"
                :show-borders="true"
                :show-row-lines="true"
                :row-alternation-enabled="false"
                :column-hiding-enabled="false"
                :word-wrap-enabled="true"
                :column-auto-width="true"
                >
                <DxEditing
                    :allow-updating="false"
                    :allow-deleting="false"
                    :allow-adding="false"
                    :use-icons="true"
                    mode="form"
                >
                    
                </DxEditing>
                <DxFilterRow :visible="true" />
                <DxHeaderFilter :visible="true" />
                <!-- <DxColumn data-field="gpi_no" caption="GPI No." alignment="center" :width="50"
                    :editor-options="GPINoInputOptions">
                    <DxRequiredRule />
                </DxColumn> -->
                <DxColumn data-field="id_platform" caption="Platform" alignment="center" :width="100"
                    :editor-options="platformNoInputOptions">
                    <DxRequiredRule />
                </DxColumn>
                <DxColumn data-field="tag_no" caption="Tag No." alignment="center">
                    <DxRequiredRule />
                </DxColumn>
                <DxColumn data-field="temp" caption="Temp"
                    alignment="center" :width="100" :editor-options="ExpDateInputOptions">
                    <DxRequiredRule />
                </DxColumn>
                <DxColumn data-field="description" caption="Description" alignment="center" :editor-options="tagNoInputOptions"   
                    :min-width="150">
                    <DxRequiredRule />
                </DxColumn>
                <DxColumn data-field="ir" caption="Injection Rate ml/MMscf" alignment="center"
                    :width="150" :editor-options="GPIDateInputOptions">
                    <DxRequiredRule />
                </DxColumn>
                <DxColumn data-field="jan" caption="Jan"
                    alignment="center" :width="80" :editor-options="ExpDateInputOptions">
                    <DxRequiredRule />
                </DxColumn>
                <DxColumn data-field="feb" caption="Feb"
                    alignment="center" :width="80" :editor-options="ExpDateInputOptions">
                    <DxRequiredRule />
                </DxColumn>
                <DxColumn data-field="mar" caption="Mar"
                    alignment="center" :width="80" :editor-options="ExpDateInputOptions">
                    <DxRequiredRule />
                </DxColumn>
                <DxColumn data-field="apr" caption="Apr"
                    alignment="center" :width="80" :editor-options="ExpDateInputOptions">
                    <DxRequiredRule />
                </DxColumn>
                <DxColumn data-field="may" caption="May"
                    alignment="center" :width="80" :editor-options="ExpDateInputOptions">
                    <DxRequiredRule />
                </DxColumn>
                <DxColumn data-field="jun" caption="Jun"
                    alignment="center" :width="80" :editor-options="ExpDateInputOptions">
                    <DxRequiredRule />
                </DxColumn>
                <DxColumn data-field="jul" caption="Jul"
                    alignment="center" :width="80" :editor-options="ExpDateInputOptions">
                    <DxRequiredRule />
                </DxColumn>
                <DxColumn data-field="aug" caption="Aug"
                    alignment="center" :width="80" :editor-options="ExpDateInputOptions">
                    <DxRequiredRule />
                </DxColumn>
                <DxColumn data-field="sep" caption="Sep"
                    alignment="center" :width="80" :editor-options="ExpDateInputOptions">
                    <DxRequiredRule />
                </DxColumn>
                <DxColumn data-field="oct" caption="Oct"
                    alignment="center" :width="80" :editor-options="ExpDateInputOptions">
                    <DxRequiredRule />
                </DxColumn>
                <DxColumn data-field="nov" caption="Nov"
                    alignment="center" :width="80" :editor-options="ExpDateInputOptions">
                    <DxRequiredRule />
                </DxColumn>
                <DxColumn data-field="dec" caption="Dec"
                    alignment="center" :width="80" :editor-options="ExpDateInputOptions">
                    <DxRequiredRule />
                </DxColumn>
                <DxColumn :width="50" alignment="center" cell-template="action-cell-template" />
        
                <template #action-cell-template="{ data }">
                    <div class="action-wrapper">
                        <div @click="() => [isShow = 2, selectedId = data.data.id]">
                            <img src="/img/svg/magnifying-glass-svg.svg" class="penSvg" />
                        </div>
                    </div>
                </template>
                <DxToolbar>
                    <DxItem
                        location="after"
                        template="filterSelect"
                    />
                    <!-- <DxItem
                        location="after"
                        template="addButton"
                    /> -->
                    <DxItem
                        location="after"
                        name="searchPanel"
                    />
                </DxToolbar>
                <template #addButton>
                    <DxButton
                    icon="las la-plus"
                    @click="ADD_ROW"
                    hint="Add"
                    />
                </template>
                <template #filterSelect>
                    <DxSelectBox
                        :items="yearList"
                        value-expr="id"
                        display-expr="year"
                        placeholder="Filter Year"
                        
                    />
                </template>
                
                
                <!-- <DxFilterRow :visible="true" /> -->
                <DxScrolling mode="standard" />
                <DxSearchPanel :visible="true" />
                <DxPaging :page-size="10" :page-index="0" />
                <DxPager 
                    :show-page-size-selector="true" 
                    :allowed-page-sizes="[5, 10, 20]" 
                    :show-navigation-buttons="true"
                    :show-info="true" 
                    info-text="Page {0} of {1} ({2} items)" 
                />
                <DxExport :enabled="false" />
                </DxDataGrid>
            </div>
        </div>
        <AddTagRegistration v-if="isShow === 1" @popup="FETCH_MOC_RECORD" />
        <EditTagRegistration v-if="isShow === 2" @popup="FETCH_MOC_RECORD" :id_record="selectedId" />
    </div>
</template> 

<script>
//API
import { axios } from "/axios.js";
// import moment from "moment";
import AddTagRegistration from "./Add.vue"
import EditTagRegistration from "./Edit.vue"

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
import { DxItem } from "devextreme-vue/form";
import DxButton from "devextreme-vue/button";
import DxSelectBox from 'devextreme-vue/select-box';

import {
  DxDataGrid,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  DxExport,
  DxToolbar,
  DxEditing,
//   DxLookup,
  DxRequiredRule,
  DxFilterRow,
  DxHeaderFilter,
  // DxButton,
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
        DxToolbar,
        // DxForm,
        DxItem,
        DxEditing,
        // DxLookup,
        DxRequiredRule,
        DxFilterRow,
        DxHeaderFilter,
        DxButton,
        // DXButton,
        // DxFormItem,
        // penSvg,
        // trashSvg,
        DxSelectBox,
        AddTagRegistration,
        EditTagRegistration
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "RESIDUAL CORROSION INHIBITOR",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            // this.FETCH_DROPDOWN_NOC();
            // this.FETCH_DROPDOWN_RRL();
            // this.FETCH_DROPDOWN_STATUS();
            // this.FETCH_MOC_RECORD();
            const years = []
            for (let index = 0; index < 11; index++) {
                years.push({ id: index, year: 2020 + index })
            }
            this.yearList = years;
            this.tagRegistrationList = [
                {
                    id: 1,
                    id_platform: 'MDC',
                    tag_no: 'MDC-CC-04201',
                    temp: 45,
                    description: '-',
                    ir: 500,
                    jan: 77.85,
                    feb: 77.85,
                    mar: 77.85,
                    apr: 77.85,
                    may: 77.85,
                    jun: 77.85,
                    jul: 77.85,
                    aug: 77.85,
                    sep: 77.85,
                    oct: 77.85,
                    nov: 77.85,
                    dec: 77.85,
                },
                {
                    id: 2,
                    id_platform: 'MDDC',
                    tag_no: 'MDDC-CC-07301',
                    temp: 65,
                    description: '-',
                    ir: 500,
                    jan: 65,
                    feb: 65,
                    mar: 65,
                    apr: 65,
                    may: 65,
                    jun: 65,
                    jul: 65,
                    aug: 65,
                    sep: 65,
                    oct: 65,
                    nov: 65,
                    dec: 65,
                },
            ];
        }
    },
    data() {
        return {
            tagRegistrationList: [],
            isShow: 0,
            selectedId: null,
            gridRefName: "grid",
            yearList: []
        };
    },
    computed: {
        baseURL() {
            var mode = this.$store.state.mode;
            if (mode == "dev") return this.$store.state.modeURL.dev;
            else if (mode == "prod") return this.$store.state.modeURL.prod;
            else return console.log("develpment mode set up incorrect.");
        },
    },
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
            this.isShow = 0;
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
        SET_CURRENT_VIEW(view, data = null, data2 = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", false);
            if (data !== null && data2 === null) this.$emit('currentView', view, data);
            else if (data !== null && data2 !== null) this.$emit('currentView', view, data, data2);
            else this.$emit('currentView', view);
        },
        ADD_ROW() {
            this.isShow = 1
        },
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