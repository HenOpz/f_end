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
            data-field="initial_weight" 
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

        <DxColumn :width="80" alignment="center" cell-template="action-cell-template" />

        <template #action-cell-template="{ data }">
            <div class="action-wrapper">
                <div @click="$emit('action', 4, id_record, data.data)">
                    <img src="/img/svg/pen-svg.svg" class="penSvg" />
                </div>
                <div @click="DELETE_RECORD(data.data.id)">
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
import { GET_DATA, DELETE_DATA } from "/axios.js";
//import moment from "moment";
import "devextreme/dist/css/dx.light.css";
// import DxSelectBox from 'devextreme-vue/select-box';
// import DxTextBox from 'devextreme-vue/text-box';
// import DxDateBox from 'devextreme-vue/date-box';
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
    name: "corrosion-coupon-list",
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
        // DxSelectBox,
        // DxTextBox,
        // DxDateBox,
        // DxTextArea,
        // trashSvg,
    },
    created() {
        this.FETCH_COUPON(this.id_record);
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
        FETCH_COUPON(id_record) {
            GET_DATA(this, `/CMCorrosionCouponMonitorDetail/ByRecord/${id_record}`, 'couponList');
        },
        DELETE_RECORD(id_coupon) {
            DELETE_DATA(`/CMCorrosionCouponMonitorDetail/${id_coupon}`, () => { this.FETCH_COUPON(this.id_record); });
        },
    }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

</style>