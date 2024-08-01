<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h5 fill style="margin-bottom: 0; margin-top: 0;">Cooling Medium / Microbiological Bacteria</h5>
                <DxDataGrid 
                    id="data-grid-dashboard" 
                    key-expr="id" 
                    :data-source="microBacteriaList"
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
                        data-field="srb" 
                        caption="SRB (cfu)" 
                        :width="90"
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="atp" 
                        caption="ATP (pgATP/mL)" 
                        :width="90"
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="ghb" 
                        caption="GHB (Cell/mL)" 
                        :width="90"
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="apghb" 
                        caption="APGHB (Cell/mL)" 
                        :width="90"
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="sulphide" 
                        caption="Sulphide (mg/L)" 
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
                        <li class="li-header">Microbiological Bacteria</li>
                        <ul class="ul-detail-ii">
                            <li>
                                <div class="circle-row">
                                    <div class="circle green" /><span>SRB &lt;= 0.3</span>
                                    <div class="circle yellow" /><span>0.3 &lt; SRB &lt;= 100</span>
                                    <div class="circle red" /><span>SRB &gt; 100</span>
                                </div>
                            </li>
                            <li>
                                <div class="circle-row">
                                    <div class="circle green" /><span>ATP &lt;= 10</span>
                                    <div class="circle yellow" /><span>10 &lt; ATP &lt;= 100</span>
                                    <div class="circle red" /><span>ATP &gt; 100</span>
                                </div>
                            </li>
                            <li>
                                <div class="circle-row">
                                    <div class="circle green" /><span>GHB &lt;= 0.3</span>
                                    <div class="circle yellow" /><span>0.3 &lt; GHB &lt;= 100</span>
                                    <div class="circle red" /><span>GHB &gt; 100</span>
                                </div>
                            </li>
                            <li>
                                <div class="circle-row">
                                    <div class="circle green" /><span>APGHB &lt;= 0.3</span>
                                    <div class="circle yellow" /><span>0.3 &lt; APGHB &lt;= 100</span>
                                    <div class="circle red" /><span>APGHB &gt; 100</span>
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
    name: "water-analysis-detail",
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
            microBacteriaList: [
                {
                    id: 1,
                    platform: 'MDPP',
                    tag_no: 'C-TEST-001',
                    srb: 104.21,
                    atp: 9.56,
                    ghb: 112.56,
                    apghb: 119.43,
                    sulphide: 194.64,
                    id_srb_status: 1,
                    id_atp_status: 3,
                    id_ghb_status: 1,
                    id_apghb_status: 1,
                },
                {
                    id: 2,
                    platform: 'MDPP',
                    tag_no: 'C-TEST-003',
                    srb: 101.22,
                    atp: 114.65,
                    ghb: 111.1,
                    apghb: 103.23,
                    sulphide: 107.54,
                    id_srb_status: 1,
                    id_atp_status: 1,
                    id_ghb_status: 1,
                    id_apghb_status: 1,
                },
                {
                    id: 3,
                    platform: 'MDPP',
                    tag_no: 'C-TEST-004',
                    srb: 121.98,
                    atp: 110.32,
                    ghb: 101.45,
                    apghb: 108.55,
                    sulphide: 92.33,
                    id_srb_status: 1,
                    id_atp_status: 1,
                    id_ghb_status: 1,
                    id_apghb_status: 1,
                },
                {
                    id: 4,
                    platform: 'MDPP',
                    tag_no: 'C-TEST-005',
                    srb: 87.75,
                    atp: 96.43,
                    ghb: 96.54,
                    apghb: 94.45,
                    sulphide: 129.78,
                    id_srb_status: 2,
                    id_atp_status: 2,
                    id_ghb_status: 2,
                    id_apghb_status: 2,
                },

            ]
        };
    },
    computed: {},
    methods: {
        onCellPrepared(e) {
            if (e.column.dataField === "srb" && e.rowType === "data") {
                if (e.data.id_srb_status == 1) {
                e.cellElement.style.backgroundColor = "#FF0000";
                e.cellElement.style.color = "#FFF";
                } else if (e.data.id_srb_status == 2) {
                e.cellElement.style.backgroundColor = "#FFFF00";
                } else if(e.data.id_srb_status == 3) {
                e.cellElement.style.backgroundColor = "#66FF33";
                }
            }
            if (e.column.dataField === "atp" && e.rowType === "data") {
                if (e.data.id_atp_status == 1) {
                e.cellElement.style.backgroundColor = "#FF0000";
                e.cellElement.style.color = "#FFF";
                } else if (e.data.id_atp_status == 2) {
                e.cellElement.style.backgroundColor = "#FFFF00";
                } else if(e.data.id_atp_status == 3) {
                e.cellElement.style.backgroundColor = "#66FF33";
                }
            }
            if (e.column.dataField === "ghb" && e.rowType === "data") {
                if (e.data.id_ghb_status == 1) {
                e.cellElement.style.backgroundColor = "#FF0000";
                e.cellElement.style.color = "#FFF";
                } else if (e.data.id_ghb_status == 2) {
                e.cellElement.style.backgroundColor = "#FFFF00";
                } else if(e.data.id_ghb_status == 3) {
                e.cellElement.style.backgroundColor = "#66FF33";
                }
            }
            if (e.column.dataField === "apghb" && e.rowType === "data") {
                if (e.data.id_apghb_status == 1) {
                e.cellElement.style.backgroundColor = "#FF0000";
                e.cellElement.style.color = "#FFF";
                } else if (e.data.id_apghb_status == 2) {
                e.cellElement.style.backgroundColor = "#FFFF00";
                } else if(e.data.id_apghb_status == 3) {
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
    width: 800px;
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