<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h5 fill style="margin-bottom: 0; margin-top: 0;">Cooling Medium / Water Analysis</h5>
                <DxDataGrid 
                    id="data-grid-dashboard" 
                    key-expr="id" 
                    :data-source="waterAnalysisList"
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
                        data-field="ph" 
                        caption="pH" 
                        :width="90"
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="dissolved_o2" 
                        caption="Dissolved O2 (ppb)" 
                        :width="90"
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="ion_count" 
                        caption="Ion Count" 
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
                        <li class="li-header">Water Analysis</li>
                        <ul class="ul-detail-ii">
                            <li>
                                <div class="circle-row">
                                    <div class="circle green" /><span>Dissolved O2 &lt;= 30</span>
                                    <div class="circle yellow" /><span>Dissolved O2 = N/A</span>
                                    <div class="circle red" /><span>Dissolved O2 &gt; 30</span>
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
            waterAnalysisList: [
                {
                    id: 1,
                    platform: 'MDPP',
                    tag_no: 'C-TEST-001',
                    ph: 9.23,
                    dissolved_o2: 46.45,
                    ion_count: 67.21,
                    id_dissolved_o2_status: 1,
                },
                {
                    id: 2,
                    platform: 'MDPP',
                    tag_no: 'C-TEST-002',
                    ph: 5.89,
                    dissolved_o2: 34.76,
                    ion_count: 54.21,
                    id_dissolved_o2_status: 1,
                },
                {
                    id: 5,
                    platform: 'MDPP',
                    tag_no: 'C-TEST-005',
                    ph: 8.12,
                    dissolved_o2: 35.87,
                    ion_count: 98.23,
                    id_dissolved_o2_status: 1,
                },
                {
                    id: 6,
                    platform: 'MDPP',
                    tag_no: 'C-TEST-006',
                    ph: 9.89,
                    dissolved_o2: 34.67,
                    ion_count: 31.76,
                    id_dissolved_o2_status: 1,
                },  
            ]
        };
    },
    computed: {},
    methods: {
        onCellPrepared(e) {
            if (e.column.dataField === "dissolved_o2" && e.rowType === "data") {
                if (e.data.id_dissolved_o2_status == 1) {
                e.cellElement.style.backgroundColor = "#FF0000";
                e.cellElement.style.color = "#FFF";
                } else if (e.data.id_dissolved_o2_status == 2) {
                e.cellElement.style.backgroundColor = "#FFFF00";
                } else if(e.data.id_dissolved_o2_status == 3) {
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