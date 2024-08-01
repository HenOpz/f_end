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
                        <span style="display: flex; align-items: center; justify-content: center;">
                            Tag No.
                        </span>
                        <span style="display: flex; align-items: center; justify-content: center;">
                            Result
                        </span>
                        <span v-for="(month, index) in monthList" :key="'month-' + index" style="display: flex; align-items: center; justify-content: center;">
                            {{ month.month_code }}
                        </span>
                    </div>
                    <div v-for="(tag, index) in tagList" :key="'tag-' + index" style="display: grid; grid-template-columns: 10% repeat(13, 1fr); gap: 5px; margin-bottom: 5px; border-bottom: 2px solid #777; font-weight: 600; padding-bottom: 5px;">
                        <span style="grid-row: span 2; display: flex; align-items: center; justify-content: flex-start; background-color: #ddd; padding-left: 5px; ">
                            {{ tag.key }}
                        </span>
                        <span style="display: flex; align-items: center; justify-content: center; background-color: #ccc; padding-top: 5px; padding-bottom: 5px;">
                            Target
                        </span>
                        <span v-for="(val, valIndex) in 12" :key="'target-' + valIndex" style="display: flex; align-items: center; justify-content: center; background-color: #ccc;">
                            95%
                        </span>
                        <span style="grid-column-start: 2; display: flex; align-items: center; justify-content: center; background-color: #eee; padding-top: 5px; padding-bottom: 5px;" >
                            Actual
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
                key-expr="id"
                :ref="gridRefName"
                :data-source="cmChemInjectionList"
                :hover-state-enabled="true"
                :allow-column-reordering="true"
                :show-borders="true"
                :show-row-lines="true"
                :row-alternation-enabled="false"
                :column-hiding-enabled="false"
                :word-wrap-enabled="true"
                :column-auto-width="true"
                @cell-prepared="onCellPrepared"
                style="margin-top: 10px;"
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

                <DxColumn 
                    data-field="id_platform"
                    caption="Location" 
                    alignment="center" 
                    :width="100"
                >
                    <DxLookup :data-source="platformList" display-expr="code_name" value-expr="id" />
                </DxColumn>
                <DxColumn
                    data-field="id_tag"
                    caption="Tag No." 
                    alignment="left"
                    :min-width="130"
                >
                    <DxLookup :data-source="cmTagList" display-expr="tag_no" value-expr="id" />
                </DxColumn>
                <DxColumn
                    data-field="gas_flow_rate_mmscfd"
                    caption="Gas Flow Rate (MMscfd)" 
                    alignment="center"
                    :width="130"
                    :format="formatDecimal2"
                />
                <DxColumn 
                    data-field="req_ci_injection_rate_liters_mmscfd" 
                    caption="Required C/I Injection Rate (liters/MMscfd)" 
                    alignment="center"  
                    :width="130"
                    :format="formatDecimal3"
                />
                <DxColumn 
                    data-field="req_ci_rate_liters_day" 
                    caption="Required C/I Rate Liters/day)" 
                    alignment="center"
                    :width="130"
                    :format="formatDecimal3"
                />
                <DxColumn
                    data-field="yesterday_ci_tank_level_percent"
                    caption="Yesterdays (06.00hrs) CI Tank Level (%)" 
                    alignment="center"
                    :width="130"
                    :format="formatDecimal3"
                />
                <DxColumn
                    data-field="today_ci_tank_level_percent"
                    caption="Todays (06.00hrs) CI Tank Level (%)" 
                    alignment="center"
                    :width="130"
                    :format="formatDecimal3"
                />
                <DxColumn
                    data-field="actual_ci_injection_liters_day"
                    caption="Actual C/I Injection (liters/day)" 
                    alignment="center"
                    :width="130"
                    :format="formatDecimal3"
                />
                <DxColumn
                    data-field="id_status"
                    caption="Result" 
                    alignment="center"
                    :width="100"
                >
                    <DxLookup :data-source="statusList" display-expr="severity_level" value-expr="id" />
                </DxColumn>
                <DxColumn :width="40" alignment="center" cell-template="action-cell-template" />
        
                <template #action-cell-template="{ data }">
                    <div class="action-wrapper">
                        <div @click="() => [isShow = 2, selectedData = data.data]">
                            <img src="/img/svg/magnifying-glass-svg.svg" class="penSvg" />
                        </div>
                    </div>
                </template>
                <DxToolbar>
                    <!-- <DxItem
                        location="before"
                        template="monthFilterTemplate"
                    />
                    <DxItem
                        location="before"
                        template="yearFilterTemplate"
                    /> -->
                    <DxItem
                        location="before"
                        template="dateFilterTemplate"
                    />
                    <DxItem
                        location="after"
                        name="searchPanel"
                    />
                </DxToolbar>
                <template #dateFilterTemplate>
                    <DxDateBox
                        width="120"
                        type="date"
                        placeholder="Select Date"
                        display-format="dd MMM yyyy"
                        @value-changed="toggleDate($event)"
                        :value="nowDate"
                    />
                </template>
                <!-- <template #monthFilterTemplate>
                    <DxSelectBox
                        width="100"
                        :items="monthList"
                        value-expr="val" 
                        display-expr="code"
                        :input-attr="{ 'aria-label': 'Month' }"
                        @value-changed="toggleMonth($event)"
                        placeholder="Month"
                        :value="nowMonth"
                    />
                </template>
                <template #yearFilterTemplate>
                    <DxSelectBox
                        width="100"
                        :items="yearList"
                        value-expr="val" 
                        display-expr="val"
                        :input-attr="{ 'aria-label': 'MonYearth' }"
                        @value-changed="toggleYear(($event))"
                        placeholder="Year"
                        :value="nowYear"
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
        <AddTagRegistration 
            v-if="isShow === 1" 
            @popup="TOGGLE_POPUP" 
        />
        <EditTagRegistration 
            v-if="isShow === 2" 
            :infoData="selectedData" 
            :selectedYear="nowYear"
            :selectedMonth="nowMonth"
            @popup="TOGGLE_POPUP" 
        />
    </div>
</template> 

<script>
import { GET_DATA } from "/axios.js";
import moment from "moment";
import AddTagRegistration from "./Add.vue"
import EditTagRegistration from "./Edit.vue"
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import { DxItem } from "devextreme-vue/form";
// import DxButton from "devextreme-vue/button";

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
    DxLookup,
    DxFilterRow,
    DxHeaderFilter,
    // DxButton,
    // DxFormItem,
    // DxForm
} from "devextreme-vue/data-grid";
// import DxSelectBox from "devextreme-vue/select-box";
import DxDateBox from "devextreme-vue/date-box";

export default {
    name: "tag-registration",
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
        DxLookup,
        DxFilterRow,
        DxHeaderFilter,
        // DxSelectBox,
        DxDateBox,
        // DxButton,
        // DXButton,
        // DxFormItem,
        // penSvg,
        // trashSvg,
        AddTagRegistration,
        EditTagRegistration
    },
    data() {
        return {
            platformList: [],
            tagList: [],
            cmTagList: [],
            statusList: [],
            cmChemInjectionList: [],
            tabs: ['Dashboard', 'Injection Data'],
            active_tab: 'Dashboard',
            isShow: 0,
            selectedId: null,
            gridRefName: "grid",
            isCoolingMedium: false,
            isProducedWater: false,
            isSeaWater: false,
            isPipeline: false,
            nowMonth: null,
            nowYear: null,
            nowDate: null,
            selectedMonth: null,
            selectedYear: null,
            monthList: [],
            yearList: [2020,2021,2022,2023,2024,2025],
            formatDecimal2: {
                type: 'fixedPoint',
                precision: 2,
            },
            formatDecimal3: {
                type: 'fixedPoint',
                precision: 3,
            },
        };
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "CHEMICAL INJECTION",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.nowDate = new Date();
            // this.nowYear = new Date().getFullYear();
            // this.nowMonth = new Date().getMonth() + 1;
            // this.selectedMonth = this.nowMonth;
            // this.selectedYear = this.nowYear;
            this.cmChemInjectionList = [];
            GET_DATA(this, '/Md/get-md-month-list', 'monthList');
            GET_DATA(this, '/Md/get-md-platform-list', 'platformList');
            GET_DATA(this, '/CMInfo', 'cmTagList');
            GET_DATA(this, '/CMInfo/get-tag-pipeline-view-in-chem-injection-percentage?year=2024', 'tagList', (data) => {
                const resultArray = [];
                for (const [key, value] of Object.entries(data)) {
                    resultArray.push({key: key, value: value});
                }
                this.tagList = resultArray;
            });
            GET_DATA(this, '/Md/get-md-cm-chem-inj-status-list', 'statusList');
            GET_DATA(this, '/CMChemInjectionRecord/ByDate/' + moment(this.nowDate).format("YYYY-MM-DD"), 'cmChemInjectionList');
        }
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
                        "CM-TAG-REGISTATION.xlsx"
                    );
                });
            });
            e.cancel = true;
        },
        TOGGLE_POPUP() {
            if (this.isShow === 1) {
                GET_DATA(this, '/CMInfo', 'cmChemInjectionList');
            }
            else if (this.isShow === 2) {
                GET_DATA(this, '/CMChemInjectionRecord', 'cmChemInjectionList');
                this.isShow = 0;
            }
        },
        ADD_ROW() {
            this.isShow = 1
        },
        toggleMonth(e) {
            console.log(e);
        },
        toggleYear(e) {
            console.log(e);
        },
        toggleDate(e) {
            console.log(e);
            const date = moment(e.value).format("YYYY-MM-DD");
            const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
            const match = date.match(regex);
            this.nowYear = parseInt(match[1], 10);
            this.nowMonth = parseInt(match[2], 10);

            GET_DATA(this, '/CMChemInjectionRecord/ByDate/' + moment(e.value).format("YYYY-MM-DD"), 'cmChemInjectionList');
        },
        onCellPrepared(e) {
            if(e.rowType === "data" && e.column.dataField === "id_status") {
                e.cellElement.style.backgroundColor = this.GET_STATUS_COLOR(e.row.data.id_status);
            }
        },
        GET_STATUS_COLOR(value) {
            if(value) {
            const v = this.statusList.filter(i => i.id == value);
            return v[0].color_code;
            } else {
                return '#ffffff';
            }
        },
        TO_FIXED(value, digits) {
            if(value) {
                return value.toFixed(digits) + '%';
            } else {
                return "";
            }
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