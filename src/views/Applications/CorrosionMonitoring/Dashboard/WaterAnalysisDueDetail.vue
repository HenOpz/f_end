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
                        data-field="latest_date" 
                        caption="Latest Date" 
                        :width="100"
                        alignment="center" 
                    />
                    <DxColumn 
                        data-field="next_due_date" 
                        caption="Next Due Date" 
                        :width="100"
                        alignment="center" 
                    />
                    <DxScrolling mode="standard" />
                    <DxSearchPanel :visible="true" />
                </DxDataGrid>
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
                    latest_date: 'H2 2024',
                    next_due_date: 'H1 2025',
                    id_due_status: 3,
                },
                {
                    id: 2,
                    platform: 'MDPP',
                    tag_no: 'C-TEST-002',
                    latest_date: 'H2 2024',
                    next_due_date: 'H1 2025',
                    id_due_status: 3,
                },
                {
                    id: 5,
                    platform: 'MDPP',
                    tag_no: 'C-TEST-005',
                    latest_date: 'H2 2024',
                    next_due_date: 'H1 2025',
                    id_due_status: 3,
                },
                {
                    id: 6,
                    platform: 'MDPP',
                    tag_no: 'C-TEST-006',
                    latest_date: 'H2 2024',
                    next_due_date: 'H1 2025',
                    id_due_status: 3,
                },  
            ],
            dueStatusList: [
                {
                    "id": 1,
                    "name": "Overdue",
                    "color_code": "#ff0000",
                },
                {
                    "id": 2,
                    "name": "Ondue",
                    "color_code": "#ffdd00",
                },
                {
                    "id": 3,
                    "name": "Notdue",
                    "color_code": "#00e676",
                }
            ],
        };
    },
    computed: {},
    methods: {
        onCellPrepared(e) {
            if (e.column.dataField === "next_due_date" && e.rowType === "data") {
                e.cellElement.style.backgroundColor = this.GET_DUE_STATUS_COLOR(e.row.data.id_due_status);
            }
        },
        GET_DUE_STATUS_COLOR(value) {
            if(value) {
            const v = this.dueStatusList.filter(i => i.id == value);
            return v[0].color_code;
            } else {
                return '#ffffff';
            }
        },
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