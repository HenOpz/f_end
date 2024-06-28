<template>
    <div class="page-container">
        <div class="action-bar">
            <button class="back" @click="SET_CURRENT_VIEW(0)"><i class="fas fa-chevron-left"></i> BACK</button>
            <div class="wrapper">
                <div class="switch">
                    <div>
                        <v-ons-switch style="padding: 0 !important; border: 0;" input-id="switch1" v-model="btn_state" />
                    </div>
                    <span>EDIT MODE</span>
                </div>
                <button @click="UPDATE_RECORD" class="submit">
                    <i class="fas fa-save"></i>SUBMIT
                </button>
                <button @click="DELETE_RECORD" class="delete">
                    <i class="fas fa-trash-alt"></i>DELETE
                </button>
            </div>

            <!-- <button @click="UPDATE_RECORD" class="submit">SUBMIT</button>
      <button class="draft">DRAFT</button>
      <button @click="DELETE_RECORD" class="delete"><trashSvg style="width: 15px; fill: white;" />  DELETE</button> -->
        </div>
        <div class="page-section">
            <div class="table-wrapper">
                <div class="input-wrapper" span-3>
                    <span>MOC Number</span>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter MOC Number" 
                            v-model="mocList.moc_number" 
                            :disabled="!btn_state"
                        />
                    </div>
                </div>

                <div class="input-wrapper" span-3>
                    <span>Worksite</span>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Worksite" 
                            v-model="mocList.worksite" 
                            :disabled="!btn_state"
                        />
                    </div>
                </div>

                <div class="input-wrapper" span-3>
                    <span>Status</span>
                    <div class="input">
                        <DxSelectBox 
                            :items="formSelect.status" 
                            value-expr="id" 
                            display-expr="status"
                            placeholder="Select Status" 
                            v-model="mocList.id_moc_status" 
                            :disabled="!btn_state"
                        />
                    </div>
                </div>

                <div class="input-wrapper" span-3>
                    <span>Nature Of Change</span>
                    <div class="select">
                        <DxSelectBox 
                            :items="formSelect.noc" 
                            value-expr="id" 
                            display-expr="status"
                            placeholder="Select Nature Of Change" 
                            v-model="mocList.id_moc_noc"
                            :disabled="!btn_state" 
                        />
                    </div>
                </div>

                <div class="input-wrapper" span-3>
                    <span>Residual Risk Level</span>
                    <div class="input">
                        <DxSelectBox 
                            :items="formSelect.rrl" 
                            value-expr="id" 
                            display-expr="status"
                            placeholder="Select Residual Risk Level"
                            v-model="mocList.id_moc_rrl"
                            :disabled="!btn_state" 
                        />
                    </div>
                </div>

                <div class="input-wrapper" span-3>
                    <span>Initiator</span>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Initiator" 
                            v-model="mocList.initiator" 
                            :disabled="!btn_state"
                        />
                    </div>
                </div>

                <div class="input-wrapper" span-3>
                    <span>Start Date</span>
                    <div class="select">
                        <DxDateBox 
                            type="date" 
                            placeholder="Select Start Date" 
                            v-model="mocList.start_date"
                            display-format="dd MMM yyyy" 
                            :disabled="!btn_state"
                        />
                    </div>
                </div>

                <div class="input-wrapper" span-3>
                    <span>Expiry Date</span>
                    <div class="select">
                        <DxDateBox 
                            type="date" 
                            placeholder="Select Expiry Date" 
                            v-model="mocList.expiry_date"
                            display-format="dd MMM yyyy" 
                            :disabled="!btn_state"
                        />
                    </div>
                </div>

                <div class="input-wrapper" span-6>
                    <span>Action</span>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Action" 
                            v-model="mocList.action" 
                            :disabled="!btn_state" 
                        />
                    </div>
                </div>

                <div class="input-wrapper" span-6>
                    <span>Remark</span>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Remark" 
                            v-model="mocList.remark" 
                            :disabled="!btn_state" 
                        />
                    </div>
                </div>

                <div class="input-wrapper" span-6>
                    <span>Initiator</span>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Initiator"
                            v-model="mocList.initiator" 
                            :disabled="!btn_state" 
                        />
                    </div>
                </div>

                <!-- <div span-3 /> -->

                <!-- <div span-3 class="pdf-wrapper">
                    <span fill>MOC PDF</span>
                    <input type="text" span-2>
                    <img span-2 src="/img/default_image.png" alt="picture">
                    <div class="button-wrapper">
                        <button class="select">Select</button>
                        <button class="delete">Delete</button>
                    </div>
                </div>

                <div span-3 class="pdf-wrapper">
                    <span fill>RA PDF</span>
                    <input type="text" span-2>
                    <img span-2 src="/img/default_image.png" alt="picture">
                    <div class="button-wrapper">
                        <button class="select">Select</button>
                        <button class="delete">Delete</button>
                    </div>
                </div> -->
                <!-- <button class="create" @click="UPDATE_RECORD" span-3>Save</button>
                <button @click="$emit('currentView', 0)" span-3>Cancel</button> -->
                <br>
            </div>
        </div>
    </div>
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
// import DxAddRowButton from "devextreme-vue/button";
// import { DxItem } from "devextreme-vue/form";
import {
    // DxDataGrid,
    // DxSearchPanel,
    // DxPaging,
    // DxPager,
    // DxScrolling,
    // DxColumn,
    // DxExport,
    // DxToolbar,
    // DxHeaderFilter,
    // DxSelection,
    // DxEditing,
    // DxFilterRow,
    // DxButton,
    // DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    // DxForm
} from "devextreme-vue/data-grid";

//Structures

export default {
    name: "inspection-record",
    props: {
        id_record: Number,
        moc_no: String,
    },
    components: {
        // DxDataGrid,
        // DxSearchPanel,
        // DxPaging,
        // DxPager,
        // DxScrolling,
        // DxColumn,
        // DxExport,
        // DxToolbar,
        // DxHeaderFilter,
        // DxSelection,
        // DxForm,
        // DxItem,
        // DxEditing,
        // DxFilterRow,
        // DxButton,
        // DxAddRowButton,
        // DxLookup,
        // DxRequiredRule,
        // DxFormItem,
        DxSelectBox,
        DxTextBox,
        DxDateBox,
        // DxTextArea,
        // trashSvg
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "MOC Number: " + this.moc_no,
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.FETCH_DROPDOWN_NOC();
            this.FETCH_DROPDOWN_RRL();
            this.FETCH_DROPDOWN_STATUS();
            this.FETCH_MOC_RECORD();
        }
    },
    data() {
        return {
            mocList: {},
            btn_state: false,
            formSelect: {
                noc: [],
                status: [],
                rrl: [],
            }
        };
    },
    computed: {},
    methods: {
        FETCH_MOC_RECORD() {
            this.isLoading = true;
            axios({
                method: "get",
                url:
                    "/ManagementOfChange/" + this.id_record,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.mocList = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        UPDATE_RECORD() {
            if (this.mocList.start_date !== null)
                this.mocList.start_date = moment(this.mocList.start_date).format("L");
            if (this.mocList.expiry_date !== null)
                this.mocList.expiry_date = moment(this.mocList.expiry_date).format("L");
            axios({
                method: "put",
                url: "/ManagementOfChange/" + this.mocList.id,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: this.mocList
            })
                .then(res => {
                    if (res.status == 204) {
                        this.SET_CURRENT_VIEW(0);
                    }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => { });
        },
        DELETE_RECORD() {
            axios({
                method: "delete",
                url: "/ManagementOfChange/delete-management-of-change?id=" + this.mocList.id,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 204) {
                        this.SET_CURRENT_VIEW(0);
                    }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => { });
        },
        FETCH_DROPDOWN_NOC() {
            axios({
                method: "get",
                url: "/Md/get-md-moc-noc-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: {}
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.formSelect.noc = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_DROPDOWN_STATUS() {
            axios({
                method: "get",
                url: "/Md/get-md-moc-status-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: {}
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.formSelect.status = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_DROPDOWN_RRL() {
            axios({
                method: "get",
                url: "/Md/get-md-moc-rrl-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: {}
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.formSelect.rrl = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        SET_CURRENT_VIEW(view, data = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", true);
            if (data !== null) this.$emit('currentView', view, data);
            else this.$emit('currentView', view);
        }
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
    // overflow-y: hidden;
}

.page-section {
    padding: 20px;
    overflow-y: auto;
    height: calc(100% - 270px);
    grid-row: span 2;
    margin-top: 60px;
}

.table-wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 15px;

    *[span-2] {
        grid-column: span 2;
    }

    *[span-3] {
        grid-column: span 3;
    }

    *[span-4] {
        grid-column: span 4;
    }

    *[span-5] {
        grid-column: span 5;
    }

    *[span-6] {
        grid-column: span 6;
    }

    *[fill] {
        grid-column: span 6;
    }

    .input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 6px;

        span {
            font-size: 12px;
            font-weight: 600;
        }
    }
}
</style>