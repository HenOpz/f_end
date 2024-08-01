<template>
    <div>
        <div class="page-container">
            <div class="page-section">
                <div fill class="table-tabs-buttons">
                    <button 
                        v-for="(tab, index) in tabs" 
                        :key="index" 
                        :class="active_tab === tab ? 'active' : ''"
                        @click="active_tab = tab"
                    >
                        {{ tab }}
                    </button>
                </div>
                <div v-if="active_tab === tabs[0]" style="font-size: 12px;">
                    <div id="month-data" style="display: grid; grid-template-columns: 10% repeat(13, 1fr); background-color: #fff; font-weight: 600; gap: 5px; margin-bottom: 5px; margin-top: 25px;">
                        <span style="display: flex; align-items: center; justify-content: center; ">
                            Tag No.
                        </span>
                        <span style="display: flex; align-items: center; justify-content: center; text-align: center;">
                            CI Injection Rate (ml/MMscf)
                        </span>
                        <span v-for="(month, index) in monthList" :key="'month-' + index" style="display: flex; align-items: center; justify-content: center;">
                            {{ month.month_code }}
                        </span>
                    </div>
                    <div v-for="(tag, index) in tagList" :key="'tag-' + index" style="display: grid; grid-template-columns: 10% repeat(13, 1fr); gap: 5px; margin-bottom: 5px; border-bottom: 2px solid #777; font-weight: 600; padding-bottom: 5px;">
                        <span style="grid-row: span 1; display: flex; align-items: center; justify-content: flex-start; background-color: #ddd; padding-left: 5px; ">
                            {{ tag.tag_no }}
                        </span>
                        <!-- <span style="display: flex; align-items: center; justify-content: center; background-color: #ccc; padding-top: 5px; padding-bottom: 5px;">
                            Target
                        </span>
                        <span v-for="(val, valIndex) in 12" :key="'target-' + valIndex" style="display: flex; align-items: center; justify-content: center; background-color: #ccc;">
                            95%
                        </span> -->
                        <span style="grid-column-start: 2; display: flex; align-items: center; justify-content: center; background-color: #eee; padding-top: 5px; padding-bottom: 5px;" >
                            500
                        </span>
                        <span v-for="(val, valIndex) in tag.value" :key="'actual-' + valIndex" style="display: flex; align-items: center; justify-content: center; background-color: #eee;" 
                        v-bind:style="val.Percentage >= 95 || !val.Percentage ? 'backgroundColor: #eee;' : 'backgroundColor: #ff0000a8;'">
                            {{ TO_FIXED(val.Percentage, 2) }}
                        </span>
                    </div>
                </div>
                <DxDataGrid
                    v-if="active_tab === tabs[1]"
                    id="data-grid-list"
                    :ref="gridRefName"
                    :data-source="tagList"
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
                    <DxColumn data-field="id_platform" caption="Platform" alignment="center" :width="100">
                        <DxRequiredRule />
                    </DxColumn>
                    <DxColumn data-field="tag_no" caption="Tag No." alignment="center">
                        <DxRequiredRule />
                    </DxColumn>
                    <DxColumn data-field="desc" caption="Desc."
                        alignment="center" :width="100">
                        <DxRequiredRule />
                    </DxColumn>
                    <DxColumn data-field="temp_c" caption="Temp." alignment="center"  
                        :min-width="150">
                        <DxRequiredRule />
                    </DxColumn>
                    <DxColumn caption="Latest">
                        <DxColumn data-field="last_date" caption="Latest Date" 
                            :width="120" alignment="center" />
                        <DxColumn data-field="ci_injection_rate" caption="CI Injection Rate (ml/MMscf)"
                            alignment="center" :width="120">
                            <DxRequiredRule />
                        </DxColumn>
                        <DxColumn data-field="rci_val" caption="R-CI (ppm)"
                            alignment="center" :width="100">
                            <DxRequiredRule />
                        </DxColumn>
                        <DxColumn data-field="temp" caption="Status"
                            alignment="center" :width="100">
                            <DxRequiredRule />
                        </DxColumn>
                    </DxColumn>
                    <DxColumn data-field="note" caption="Note"
                        alignment="center" :width="100">
                        <DxRequiredRule />
                    </DxColumn>
                    <DxColumn :width="50" alignment="center" cell-template="action-cell-template" />
            
                    <template #action-cell-template="{ data }">
                        <div class="action-wrapper">
                            <div @click="() => [isShow = 3, selectedId = data.data.id_tag]">
                                <img src="/img/svg/magnifying-glass-svg.svg" class="penSvg" />
                            </div>
                        </div>
                    </template>
                    <DxToolbar>
                        <!-- <DxItem
                            location="after"
                            template="filterSelect"
                        /> -->
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
                    <!-- <template #filterSelect>
                        <DxSelectBox
                            :items="yearList"
                            value-expr="id"
                            display-expr="year"
                            placeholder="Filter Year"
                            
                        />
                    </template> -->
                    
                    
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
        <InjectionRate v-if="isShow === 3" @popup="FETCH_MOC_RECORD" :id_record="selectedId" />
    </div>
</template> 

<script>
//API
import { GET_DATA, DELETE_DATA } from "/axios.js";
// import moment from "moment";
import AddTagRegistration from "./Add.vue"
import EditTagRegistration from "./Edit.vue"
import InjectionRate from "./InjectionRate.vue"

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
// import DxSelectBox from 'devextreme-vue/select-box';

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
        // DxSelectBox,
        AddTagRegistration,
        EditTagRegistration,
        InjectionRate
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
            GET_DATA(this, '/Md/get-md-month-list', 'monthList');
            GET_DATA(this, '/CMRCIRecord/get-latest-cm-rci-records', 'tagList');
            // GET_DATA(this, '/CMInfo/get-tag-pipeline-view-in-chem-injection-percentage?year=2024', 'tagList', (data) => {
            //     const resultArray = [];
            //     for (const [key, value] of Object.entries(data)) {
            //         resultArray.push({key: key, value: value});
            //     }
            //     this.tagList = resultArray;
            // });
            const years = []
            for (let index = 0; index < 11; index++) {
                years.push({ id: index, year: 2020 + index })
            }
            this.yearList = years;
        }
    },
    data() {
        return {
            tagList: [],
            isShow: 0,
            selectedId: null,
            gridRefName: "grid",
            yearList: [],
            tabs: ['Dashboard', 'R-CI Data'],
            active_tab: 'Dashboard',
            monthList: [],
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
            this.isShow = 0;
            GET_DATA(this, '/CMRCIRecord/get-latest-cm-rci-records', 'tagList');
        },
        DELETE_RECORD(e) {
            DELETE_DATA(`/ManagementOfChange/delete-management-of-change?id=${e.key}`, () => { this.FETCH_MOC_RECORD(); });
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
        TO_FIXED(value, digits) {
            if(value) {
                return value.toFixed(digits) + '%';
            } else {
                return "";
            }
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

.table-tabs-buttons {
    display: flex;
    flex-direction: row;
    gap: 5px;
    margin-bottom: 10px;

    button {
        border-radius: 0;
        padding: 10px;
        width: 130px;
    }
    .active {
        color: white;
        background-color: $web-theme-color-secondary;
        border: solid 1px $web-theme-color-secondary;
    }
}

button {
    padding: 10px 0;
    background-color: white;
    border: solid 1px gray;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    transition: 1s;
    cursor: pointer;
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