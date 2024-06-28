<template>
    <DxDataGrid 
        id="data-grid-list" 
        key-expr="id" 
        :data-source="couponList" 
        :selection="{ mode: 'single' }"
        :hover-state-enabled="true" 
        :allow-column-reordering="true" 
        :show-borders="true"
        :show-row-lines="true" 
        :row-alternation-enabled="false" 
        :word-wrap-enabled="true"
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
        <DxColumn 
            data-field="coupon_id" 
            caption="Coupon ID" 
            :width="120" 
            alignment="center"
        />
        <DxColumn 
            data-field="inital_weight" 
            caption="Initial Weight (g)" 
            :width="120" 
            alignment="center"
        />
        <DxColumn 
            data-field="final_weight" 
            caption="Final Weight (g)" 
            :width="120" 
            alignment="center"
        />
        <DxColumn 
            data-field="weight_loss" 
            caption="Weight Loss (g)" 
            :width="120" 
            alignment="center"
        />
        <DxColumn 
            data-field="corrosion_rate" 
            caption="Corrosion Rate (mm/y)" 
            :width="120" 
            alignment="center"
        />
        <DxColumn 
            data-field="max_pit_depth" 
            caption="Max Pit Depth" 
            :width="120" 
            alignment="center"
        />
        <DxColumn 
            data-field="pitting_rate" 
            caption="Pitting Rate (mm/y)" 
            :width="120" 
            alignment="center"
        />
        
        <!-- <DxColumn caption="MOC" :width="80" alignment="center" cell-template="moc-cell-template" />
        <DxColumn caption="RA" :width="80" alignment="center" cell-template="ra-cell-template" /> -->
        <DxColumn :width="80" alignment="center" cell-template="action-cell-template" />

        <template #action-cell-template="{ data }">
            <div class="action-wrapper">
                <div @click="$emit('action', 4)">
                    <img src="/img/svg/pen-svg.svg" class="penSvg" />
                </div>
                <div @click="DELETE_RECORD(data)">
                    <img src="/img/svg/trash-svg.svg" class="trashSvg" />
                </div>
            </div>
        </template>

        <DxToolbar>
            <DxItem
                location="after"
                template="addButton"
            />
            <DxItem
                location="after"
                name="searchPanel"
            />
        </DxToolbar>
        <template #addButton>
            <DxButton
            icon="las la-plus"
            @click="$emit('action', 3, id_record)"
            hint="Add"
            />
        </template>

        <!-- Configuration goes here -->
        <!-- <DxFilterRow :visible="true" /> -->
        <DxScrolling mode="standard" />
        <DxSearchPanel :visible="false" />
        <DxPaging :page-size="5" :page-index="0" />
        <DxPager :show-page-size-selector="true" :allowed-page-sizes="[5, 10, 25]"
            :show-navigation-buttons="true" :show-info="false" info-text="Page {0} of {1} ({2} items)" />
        <DxExport :enabled="false" />
    </DxDataGrid>
</template>

<script>
/* eslint-disable */
//API
import { axios } from "/axios.js";
import moment from "moment";

//Components
//import VueTabsChrome from "vue-tabs-chrome";
// import trashSvg from "@/components/svg/trash-svg.vue"

//DataGrid
import "devextreme/dist/css/dx.light.css";
// import { Workbook } from "exceljs";
// import saveAs from "file-saver";
// import { exportDataGrid } from "devextreme/excel_exporter";
import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';
import DxDateBox from 'devextreme-vue/date-box';
// import DxTextArea from 'devextreme-vue/text-area';
import DxButton from "devextreme-vue/button";
import { DxItem } from "devextreme-vue/form";
import {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    DxToolbar,
    DxHeaderFilter,
    DxSelection,
    DxEditing,
    DxFilterRow,
    // DxButton,
    // DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    // DxForm
} from "devextreme-vue/data-grid";

export default {
    name: "inspection-record",
    props: {
        monitorData: Object
    },
    components: {
        DxDataGrid,
        DxSearchPanel,
        DxPaging,
        DxPager,
        DxScrolling,
        DxColumn,
        DxExport,
        DxToolbar,
        DxHeaderFilter,
        DxSelection,
        // DxForm,
        DxItem,
        DxEditing,
        DxFilterRow,
        DxButton,
        // DxAddRowButton,
        // DxLookup,
        // DxRequiredRule,
        // DxFormItem,
        DxSelectBox,
        DxTextBox,
        DxDateBox,
        // DxTextArea,
        // trashSvg,
    },
    created() {
        this.FETCH_COUPON();
    },
    data() {
        return {
            id_record: this.monitorData.data.id,
            couponList: [],
            isShow: 0,
        };
    },
    computed: {},
    methods: {
        FETCH_COUPON() {
            axios({
                method: "get",
                url: "/CMCorrosionCouponMonitorDetail/ByRecord/"+ this.id_record,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.couponList = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                });
        },
    }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

</style>