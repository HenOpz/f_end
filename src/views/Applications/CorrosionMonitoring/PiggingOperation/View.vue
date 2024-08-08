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
                <DxColumn 
                    data-field="id_platform" 
                    caption="Wellhead" 
                    alignment="center" 
                    :width="120"
                >
                    <DxLookup :data-source="formSelect.platform" display-expr="code_name" value-expr="id" />
                </DxColumn>
                <DxColumn 
                    data-field="pipeline" 
                    caption="Pipeline" 
                    alignment="center" 
                    :width="120"
                />
                <DxColumn 
                    data-field="lastest_date" 
                    caption="Latest Date" 
                    alignment="center"
                    dataType="date" 
                    format="dd MMM yyyy"    
                    :width="100"
                />
                <DxColumn 
                    data-field="gas_rate" 
                    caption="Gas Rate (mmscfd)" 
                    alignment="center"
                    :width="120"
                />
                <DxColumn 
                    data-field="sand" 
                    caption="Sand (kg)"
                    alignment="center" 
                    :width="95"
                />
                <DxColumn 
                    data-field="sludge" 
                    caption="Sludge (kg)" 
                    alignment="center"
                    :width="95"
                />
                <DxColumn 
                    data-field="hg" 
                    caption="Hg (kg)" 
                    alignment="center" 
                    :width="95"
                />
                <DxColumn 
                    data-field="retrieval_info" 
                    caption="Retrieval Information" 
                    alignment="left" 
                    :min-width="150"
                />
                <DxColumn 
                    :width="60" 
                    alignment="center" 
                    cell-template="action-cell-template" 
                />
        
                <template #action-cell-template="{ data }">
                    <div class="action-wrapper">
                        <div @click="() => [isShow = 3, selectedId = data.data.id]">
                            <img src="/img/svg/magnifying-glass-svg.svg" class="penSvg" />
                        </div>
                        <!-- <div @click="() => [isShow = 2, selectedId = data.data.id]">
                            <img src="/img/svg/pen-svg.svg" class="penSvg" />
                        </div>
                        <div @click="DELETE_RECORD(data)">
                            <img src="/img/svg/trash-svg.svg" class="trashSvg" />
                        </div> -->
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
                    @click="ADD_ROW"
                    hint="Add"
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
        <AddPage v-if="isShow === 1" @popup="FETCH_PIGGING" />
        <EditPage v-if="isShow === 2" @popup="FETCH_PIGGING" :id_record="selectedId" />
        <DetailPage v-if="isShow === 3" @popup="FETCH_PIGGING" :id_record="selectedId" />
    </div>
</template> 

<script>
import { GET_DATA } from "/axios.js";
import AddPage from "./Add.vue"
import EditPage from "./Edit.vue"
import DetailPage from "./Detail.vue"
import "devextreme/dist/css/dx.light.css";
import { DxItem } from "devextreme-vue/form";
import DxButton from "devextreme-vue/button";

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

export default {
    name: "pigging-operation",
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
        DxButton,
        // DXButton,
        // DxFormItem,
        // penSvg,
        // trashSvg,
        AddPage,
        EditPage,
        DetailPage
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "SPLASH PIG",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            GET_DATA(this, '/Md/get-md-platform-list', 'formSelect.platform');
            this.tagRegistrationList = [
                {
                    id: 1,
                    id_platform: 15,
                    pipeline: '18-ADA-MTA',
                    lastest_date: '8 Aug 2023',
                    gas_rate: '12.00',
                    sand: '20.00',
                    sludge: '0.00',
                    hg: '0.00',
                    retrieval_info: '-'
                },
                {
                    id: 2,
                    id_platform: 16,
                    pipeline: '12-ADB-ADA',
                    lastest_date: '7 Mar 2023',
                    gas_rate: '18.00',
                    sand: '10.00',
                    sludge: '0.00',
                    hg: '0.00',
                    retrieval_info: '-'
                },
                {
                    id: 3,
                    id_platform: 12,
                    pipeline: '18-AMA-MDF',
                    lastest_date: '16 Sep 2023',
                    gas_rate: '10.00',
                    sand: '5.00',
                    sludge: '0.00',
                    hg: '0.00',
                    retrieval_info: '-'
                }
            ];
        }
    },
    data() {
        return {
            tagRegistrationList: [],
            isShow: 0,
            selectedId: null,
            gridRefName: "grid",
            formSelect: {
                platform: [],
            },
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
        FETCH_PIGGING() {
            this.isShow = 0;
            GET_DATA(this, '/PiggingOperation', 'tagRegistrationList');
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
    padding: 20px 40px;
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