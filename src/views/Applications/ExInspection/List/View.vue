<template>
    <div>
        <div class="page-container">
            <div class="page-section">
                <div class="table-wrapper">
                    <DxDataGrid 
                        id="data-grid-list" 
                        key-expr="id" 
                        :data-source="exList"
                        :selection="{ mode: 'single' }" 
                        :hover-state-enabled="true" 
                        :allow-column-reordering="true"
                        :show-borders="true" 
                        :show-row-lines="true" 
                        :row-alternation-enabled="false"
                        :word-wrap-enabled="true" 
                        :column-auto-width="true" 
                        @init-new-row="SET_CURRENT_VIEW(1)"
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
                            data-field="location" 
                            caption="Location" 
                            :width="100"
                            alignment="center" 
                        />
                        <DxColumn 
                            data-field="system" 
                            caption="System" 
                            :width="100" 
                            alignment="center" 
                        />
                        <DxColumn 
                            data-field="tag_no" 
                            caption="Tag No." 
                            :width="120" 
                            alignment="center" 
                        />
                        <DxColumn caption="Equipment">
                            <DxColumn data-field="equip_desc" caption="Description" :width="120" alignment="center" />
                            <DxColumn data-field="id_equip_type" caption="Type" :width="120" alignment="center">
                                <DxLookup :data-source="equipTypeList" display-expr="code" value-expr="id" />
                            </DxColumn>
                            <DxColumn data-field="serial_no" caption="Serial No." :width="120" alignment="center" />
                        </DxColumn>
                        <DxColumn data-field="model" caption="Model/Part No." :width="120" alignment="center" />
                        <DxMasterDetail :enabled="true" template="masterDetailTemplate" />
                        <DxColumn :width="120" alignment="center" cell-template="action-cell-template" />

                        <template #masterDetailTemplate="{ data }">
                            <div class="detail-master">
                                <div class="master-grid">
                                    <div class="input-wrapper">
                                        <span>System Desc.</span>
                                        <div class="master-result">
                                            {{ data.data.system_desc }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Install Date</span>
                                        <div class="master-result">
                                            {{ data.data.installation_date }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Area Standard</span>
                                        <div class="master-result">
                                            {{ data.data.area_standard }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Area Class</span>
                                        <div class="master-result">
                                            {{ data.data.area_class }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Area Temp. Class.</span>
                                        <div class="master-result">
                                            {{ data.data.area_temp_class }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Area Gas Group</span>
                                        <div class="master-result">
                                            {{ data.data.area_gas_group }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Equip Standard</span>
                                        <div class="master-result">
                                            {{ data.data.equip_standard }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Equip Protection Tag</span>
                                        <div class="master-result">
                                            {{ data.data.equip_protection_tag }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Equip Protection Type</span>
                                        <div class="master-result">
                                            {{ data.data.equip_protection_type }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Equip Gas Group</span>
                                        <div class="master-result">
                                            {{ data.data.equip_gas_group }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Equip Temp. Class.</span>
                                        <div class="master-result">
                                            {{ data.data.equip_temp_class }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Equip Class.</span>
                                        <div class="master-result">
                                            {{ data.data.equip_class }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Equip Protection Level Cat.</span>
                                        <div class="master-result">
                                            {{ data.data.equip_protection_level_category }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Equip IP Rating</span>
                                        <div class="master-result">
                                            {{ data.data.equip_ip_rating }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Equip Enclosure Type</span>
                                        <div class="master-result">
                                            {{ data.data.equip_enclosure_type }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Equip Manufacturer</span>
                                        <div class="master-result">
                                            {{ data.data.equip_manufacturer }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Drawing Ref.</span>
                                        <div class="master-result">
                                            {{ data.data.drawing_ref }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Certifying Body</span>
                                        <div class="master-result">
                                            {{ data.data.certifying_body }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Ex Cert. No.</span>
                                        <div class="master-result">
                                            {{ data.data.ex_cert_no }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Operating During ESD</span>
                                        <div class="master-result">
                                            {{ data.data.operating_during_esd }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Cat. Inst. Elect</span>
                                        <div class="master-result">
                                            {{ data.data.category_inst_elect }}
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <span>Equip Remark</span>
                                        <div class="master-result">
                                            {{ data.data.equip_remark }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template #action-cell-template="{ data }">
                            <div class="action-wrapper">
                                <div
                                    @click="() => { $router.push({ path: `/ex-inspection/tag/${data.data.id}/information`, replace: true }); }">
                                    <img src="/img/svg/magnifying-glass-svg.svg" class="penSvg" />
                                </div>
                                <div @click="SET_CURRENT_VIEW(2, data.data.id)">
                                    <img src="/img/svg/pen-svg.svg" class="penSvg" />
                                </div>
                                <div @click="DELETE_RECORD(data)">
                                    <img src="/img/svg/trash-svg.svg" class="trashSvg" />
                                </div>
                            </div>
                        </template>

                        <DxToolbar>
                            <DxItem location="after" template="addButton" />
                            <DxItem location="after" name="searchPanel" />
                        </DxToolbar>
                        <template #addButton>
                            <DxButton icon="las la-plus" @click="SET_CURRENT_VIEW(1)" hint="Add" />
                        </template>

                        <!-- Configuration goes here -->
                        <!-- <DxFilterRow :visible="true" /> -->
                        <DxScrolling mode="standard" />
                        <DxSearchPanel :visible="true" />
                        <DxPaging :page-size="10" :page-index="0" />
                        <DxPager :show-page-size-selector="true" :allowed-page-sizes="[10, 20, 30]"
                            :show-navigation-buttons="true" :show-info="false"
                            info-text="Page {0} of {1} ({2} items)" />
                        <DxExport :enabled="false" />
                    </DxDataGrid>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//API
import { axios } from "/axios.js";
// import moment from "moment";

//Components
//import VueTabsChrome from "vue-tabs-chrome";
// import penSvg from "@/components/svg/pen-svg.vue"
// import trashSvg from "@/components/svg/trash-svg.vue"

//DataGrid
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
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
    DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    // DxForm
    DxMasterDetail,
} from "devextreme-vue/data-grid";

//Structures

export default {
    name: "ex-inspection-list",
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
        // DxAddRowButton,
        DxLookup,
        // DxRequiredRule,
        // DxFormItem,
        // penSvg,
        // trashSvg,
        DxButton,
        DxMasterDetail,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "LIST OF EX-INSPECTION",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.FETCH_DATA('/ExInspectionRegisterInfo', 'exList');
            this.FETCH_DATA('/Md/get-md-ex-insp-area-std-list', 'areaStandardList');
            this.FETCH_DATA('/Md/get-md-ex-insp-area-class-list', 'areaClassList');
            this.FETCH_DATA('/Md/get-md-ex-insp-area-temp-class-list', 'areaTempClassList');
            this.FETCH_DATA('/Md/get-md-ex-insp-area-gas-group-list', 'areaGasGroupList');
            this.FETCH_DATA('/Md/get-md-ex-insp-equip-std-list', 'equipStandardList');
            this.FETCH_DATA('/Md/get-md-ex-insp-equip-protec-type-list', 'equipProtectTypeList');
            this.FETCH_DATA('/Md/get-md-ex-insp-equip-type-list', 'equipTypeList');
            this.FETCH_DATA('/Md/get-md-ex-insp-equip-gas-group-list', 'equipGasGroupList');
            this.FETCH_DATA('/Md/get-md-ex-insp-equip-temp-class-list', 'equipTempClassList');
            this.FETCH_DATA('/Md/get-md-ex-insp-equip-class-list', 'equipClassList');
            this.FETCH_DATA('/Md/get-md-ex-insp-equip-protec-lv-cat-list', 'equipProtectLvlList');
            this.FETCH_DATA('/Md/get-md-ex-insp-equip-ip-rating-list', 'equipIPRatingList');
            this.FETCH_DATA('/Md/get-md-ex-insp-equip-enclosure-type-list', 'equipEnclosureTypeList');
            this.operatingDuringESDList = [
                { id: 1, code: 'Yes' },
                { id: 2, code: 'No' },
                { id: 3, code: 'Unknown' }
            ];
            this.catInspElectList = [
                { id: 1, code: 'Instrument' },
                { id: 2, code: 'Electrical' },
                { id: 3, code: 'Unknown' }
            ];
        }
    },
    data() {
        return {
            areaStandardList: [],
            areaClassList: [],
            areaTempClassList: [],
            areaGasGroupList: [],
            equipStandardList: [],
            equipProtectTypeList: [],
            equipTypeList: [],
            equipGasGroupList: [],
            equipTempClassList: [],
            equipClassList: [],
            equipProtectLvlList: [],
            equipIPRatingList: [],
            equipEnclosureTypeList: [],
            operatingDuringESDList: [],
            catInspElectList: [],
            exList: {},
            dataGridAttributes: {
                class: "data-grid-style"
            },
            selectedId: 0
        };
    },
    computed: {},
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
        DELETE_RECORD(e) {
            axios({
                method: "delete",
                url: "/ExInspectionRegisterInfo/delete-ex-inspection-register-info?id=" + e.key,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 204) {
                        this.FETCH_DATA('/ExInspectionRegisterInfo', 'exList');
                    }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => { });
        },
        SET_CURRENT_VIEW(view, data = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", false);
            if (data !== null) this.$emit('currentView', view, data);
            else this.$emit('currentView', view);
        },
        FETCH_DATA(url, targetVariable, callback) {
            this.isLoading = true;
            axios({
                method: "get",
                url: url,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        if (callback && typeof callback === 'function') {
                            callback(res.data);
                        } else {
                            this.$set(this, targetVariable, res.data);
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    }
};
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
}

.page-section {
    padding: 20px;
    overflow-y: auto;
    grid-row: span 2;
}

.page-section:last-child {
    padding-bottom: 20px;
}

.table-wrapper {
    margin-bottom: 200px;
}

.detail-master {
    background-color: #fff;
    border-radius: 10px;
}

.master-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    padding: 20px;

    .input-wrapper {
        display: flex;
        flex-direction: column;

        span {
            font-weight: 600;
            font-size: 10px;
            color: #777777;
        }
        .master-result {
            font-size: 12px;
            font-weight: 500;
            color: #333333;
            margin-top: 5px;
        }
    }
}
</style>