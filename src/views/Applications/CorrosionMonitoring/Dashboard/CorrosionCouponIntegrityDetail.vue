<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h5 fill style="margin-bottom: 0; margin-top: 0;">Cooling Medium / Corrosion Coupon</h5>
                <DxDataGrid 
                    id="data-grid-dashboard" 
                    key-expr="id" 
                    :data-source="couponList"
                    :hover-state-enabled="true" 
                    :allow-column-reordering="true"
                    :show-borders="true" 
                    :show-row-lines="true" 
                    :row-alternation-enabled="false" 
                    :word-wrap-enabled="true"
                    :column-auto-width="true" 
                    @cell-prepared="onCellPrepared"
                >
                    <DxColumn 
                        data-field="platform" 
                        caption="Platform" 
                        :width="100"
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="tag_no" 
                        caption="Tag No." 
                        :width="130"
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="desc" 
                        caption="Description" 
                        :min-width="100"
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="cr" 
                        caption="Corrosion Rate (mm/yr)" 
                        :width="90"
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="pitting_rate" 
                        caption="Pitting Rate (mm/yr)" 
                        :width="90"
                        alignment="center" 
                    />
                    <DxScrolling mode="standard" />
                    <DxSearchPanel :visible="true" />
                </DxDataGrid>
                <div class="definition">
                    <ul class="ul-detail-ii" style="grid-column: span 2; margin-block-end: -5px;">
                        <li class="li-header">Note:</li>
                    </ul>
                    <ul class="ul-detail-ii">
                        <li class="li-header">Corrosion Coupon</li>
                        <ul class="ul-detail-ii">
                            <li>
                                <div class="circle-row">
                                    <div class="circle green" /><span>Corrosion Rate &lt; 0.025</span>
                                    <div class="circle yellow" /><span>0.025 &lt;= Corrosion Rate &lt;= 0.25</span>
                                    <div class="circle red" /><span>Corrosion Rate &gt; 0.25</span>
                                </div>
                            </li>
                            <li>
                                <div class="circle-row">
                                    <div class="circle green" /><span>Max Pitting Rate &lt; 0.13</span>
                                    <div class="circle yellow" /><span>0.13 &lt;= Max Pitting Rate &lt;= 0.38</span>
                                    <div class="circle red" /><span>Max Pitting Rate &gt; 0.38</span>
                                </div>
                            </li>
                        </ul>
                    </ul>
                </div>
            </div>
            <div style="text-align: center;">
                <button @click="$emit('popup')">Close</button>
            </div>
        </div>
    </div>
</template>
<script>
// import { axios } from "/axios.js";
// import moment from "moment";
import "devextreme/dist/css/dx.light.css";
import {
    DxDataGrid,
    DxSearchPanel,
    DxScrolling,
    DxColumn,
    // DxLookup,
} from "devextreme-vue/data-grid";
export default {
    name: "coupon-detail",
    components: {
        DxDataGrid,
        DxSearchPanel,
        DxScrolling,
        DxColumn,
        // DxLookup,
    },
    created() {

    },
    data() {
        return {
            couponList: [
                {
                    id: 1,
                    platform: 'MDPP',
                    tag_no: 'MDPP-CC-04201',
                    cr: 0.0061,
                    pitting_rate: 0,
                    id_cr: 3,
                    id_pitting_rate: 3,
                }, 
                {
                    id: 1,
                    platform: 'MDPP',
                    tag_no: 'MDPP-CC-05201',
                    cr: 0.129,
                    pitting_rate: 0,
                    id_cr: 2,
                    id_pitting_rate: 3,
                }, 
                {
                    id: 1,
                    platform: 'MDPP',
                    tag_no: 'MDPP-CC-07201',
                    cr: 0.071,
                    pitting_rate: 0,
                    id_cr: 2,
                    id_pitting_rate: 3,
                }, 
            ]
        };
    },
    computed: {},
    methods: {
        onCellPrepared(e) {
            if (e.column.dataField === "cr" && e.rowType === "data") {
                if (e.data.id_cr == 1) {
                e.cellElement.style.backgroundColor = "#FF0000";
                e.cellElement.style.color = "#FFF";
                } else if (e.data.id_cr == 2) {
                e.cellElement.style.backgroundColor = "#FFFF00";
                } else if(e.data.id_cr == 3) {
                e.cellElement.style.backgroundColor = "#66FF33";
                }
            }
            if (e.column.dataField === "pitting_rate" && e.rowType === "data") {
                if (e.data.id_pitting_rate == 1) {
                e.cellElement.style.backgroundColor = "#FF0000";
                e.cellElement.style.color = "#FFF";
                } else if (e.data.id_pitting_rate == 2) {
                e.cellElement.style.backgroundColor = "#FFFF00";
                } else if(e.data.id_pitting_rate == 3) {
                e.cellElement.style.backgroundColor = "#66FF33";
                }
            }
        }
    },
}
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
    position: absolute !important;
    z-index: 999;
    top: 0;
    left: 0;
    background-color: #14141484;
}

.page-section {
    width: 700px;
    padding: 20px;
    overflow-y: auto;
    height: auto;
    grid-row: span 2;
    // width: 1;
    position: absolute !important;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff !important;
    border-radius: 10px;
    border: #d9d9d9 1px solid;
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
    width: 100px;
    margin-top: 10px;
}
.ul-detail-i,
.ul-detail-ii {
    padding-inline-start: 10px;
    list-style-type: none;
}
.li-header {
    font-size: 10px;
    font-weight: 600;
}
.circle-row {
    display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;

    .circle {
        display: block !important;
        margin: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    .green {
        background-color: #00e676;
    }

    .yellow {
        background-color: #ffdd00;
    }

    .red {
        background-color: #ff0000;
    }

    span {
        font-size: 10px;
    }
}
</style>