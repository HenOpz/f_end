<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <div class="input-wrapper" span-3>
                    <span>Year</span>
                    <div class="input">
                        <DxTextBox
                            placeholder="Enter Year"
                            v-model="mocList.worksite"
                        />
                    </div>
                </div>  

                <div class="input-wrapper" span-3>
                    <span>Platform</span>
                    <div class="input">
                        <DxSelectBox
                            :items="formSelect.status"
                            value-expr="id"
                            display-expr="status"
                            placeholder="Select Platform"
                            v-model="mocList.id_moc_status"
                        />
                    </div>
                </div>

                <div class="input-wrapper" span-3>
                    <span>From Date</span>
                    <div class="select">
                        <DxDateBox
                            type="date"
                            placeholder="Select From Date"
                            v-model="mocList.start_date"
                            display-format="dd MMM yyyy"
                        />
                    </div>
                </div>

                <div class="input-wrapper" span-3>
                    <span>To Date</span>
                    <div class="select">
                        <DxDateBox
                            type="date"
                            placeholder="Select To Date"
                            v-model="mocList.start_date"
                            display-format="dd MMM yyyy"
                        />
                    </div>
                </div>

                <div class="input-wrapper" fill>
                    <span>Description</span>
                    <div class="input">
                        <DxTextBox
                            placeholder="Enter Description"
                            v-model="mocList.worksite"
                        />
                    </div>
                </div>

                <button span-3 class="create">Update</button>
                <button span-3 @click="$emit('popup')">Cancel</button>
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
import { DxCheckBox } from 'devextreme-vue/check-box';
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
        DxCheckBox,
        // DxTextArea,
        // trashSvg
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "Number: " + this.moc_no,
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
            },
            activities: {
                wa: false,
                mb: false,
                rci: false,
                cc: false,
                erp: false
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
  overflow-y: hidden;
  position: absolute !important;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: #14141484;
}

.page-section {
  width: 900px;
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

    .action-bar {
        width: calc(100% - 80px);
    }

    .input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 6px;

        .checkbox-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
            margin-bottom: 5px;
        }

        span {
            font-size: 12px;
            font-weight: 600;
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
  .create {
    color: white;
    background-color: $web-theme-color-secondary;
    border: solid 1px $web-theme-color-secondary;
  }
}
</style>