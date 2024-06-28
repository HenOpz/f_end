<template>
    <div class="page-popup">
        <div class="page-popup-section">
            <!-- <div class="popup"> -->
                <div class="table-wrapper">
                    <DxDataGrid 
                        id="data-grid-list" 
                        key-expr="id" 
                        :data-source="testList"
                        :selection="{ mode: 'single' }"
                        :hover-state-enabled="true" 
                        :allow-column-reordering="true" 
                        :show-borders="true" 
                        :show-row-lines="false"
                        :row-alternation-enabled="false" 
                        :word-wrap-enabled="true" 
                        :column-auto-width="true"
                        @row-inserted="ADD_NEW_FILE" 
                        @row-removed="DELETE_DOC" 
                        @init-new-row="() => {
                            this.file = [];
                            this.isEdit = false;
                        }" 
                        @editing-start="(e) => {
                            this.file = [];
                            this.isEdit = true;
                            this.dataFileTemp = e;
                        }" 
                        @row-removing="() => {
                            this.isEdit = false;
                        }" 
                        @saved="SAVE"
                    >
                        <DxEditing
                            :allow-updating="true"
                            :allow-deleting="true"
                            :allow-adding="true"
                            :use-icons="true"
                            mode="popup"
                        >
                        <DxPopup
                            :show-title="true"
                            :width="750"
                            :height="600"
                            title="Attachment"
                        />
                        <DxForm label-location="top">
                            <DxItem :col-count="3" :col-span="2" :row-count="1" item-type="group">
                                <DxItem data-field="id_item" :col-span="1" />
                                <DxItem data-field="checklist_item" :col-span="1" />
                                <DxItem data-field="finding_status" :col-span="1" />
                                <DxItem data-field="overview_img" :col-span="3" />
                                <DxItem data-field="close_up_img" :col-span="3" />
                                <DxItem data-field="findings" :col-span="3" />
                                <DxItem data-field="recommendation" :col-span="3" />
                                <DxItem data-field="deenergize" :col-span="1" />
                                <DxItem data-field="quick_fix" :col-span="1" />
                                <DxItem data-field="interim_measure" :col-span="1" />
                                <DxItem data-field="interim_measure_validity" :col-span="1" />
                                <DxItem data-field="finding_compliance_status" :col-span="1" />
                            </DxItem>
                        </DxForm>
                        </DxEditing>
                        <DxFilterRow :visible="false" />
                        <DxHeaderFilter :visible="false" />
                        <DxSelection mode="single" />
                        <DxColumn 
                            data-field="file" 
                            :visible="false" 
                            edit-cell-template="insertCellTemplate" 
                        />
                        <DxColumn 
                            :width="50" 
                            alignment="center" 
                            caption="Item"
                            data-field="id_item" 
                        />
                        <DxColumn 
                            :width="80" 
                            alignment="center" 
                            caption="Checklist Item"
                            data-field="checklist_item" 
                        />
                        <DxColumn 
                            :width="180" 
                            alignment="center" 
                            caption="Overview"
                            cell-template="overview-template"
                            edit-cell-template="overview-edit-template"
                            data-field="overview_img" 
                        />
                        <DxColumn 
                            :width="180" 
                            alignment="center" 
                            caption="Close-up"
                            cell-template="close-up-template"
                            edit-cell-template="close-up-edit-template"
                            data-field="close_up_img" 
                        />
                        <DxColumn 
                            :width="160" 
                            alignment="center" 
                            caption="Findings"
                            data-field="findings" 
                        />
                        <DxColumn 
                            :width="160" 
                            alignment="center" 
                            caption="Recommendation"
                            data-field="recommendation" 
                        />
                        <DxColumn 
                            :width="80" 
                            alignment="center" 
                            caption="Finding Status (Open/Close)"
                            data-field="finding_status" 
                        >
                            <DxLookup :data-source="platform" display-expr="code_name" value-expr="id" />
                        </DxColumn>
                        <DxColumn 
                            :width="80" 
                            alignment="center" 
                            caption="Deenergize"
                            data-field="deenergize" 
                        />
                        <DxColumn 
                            :width="80" 
                            alignment="center" 
                            caption="Quick Fix"
                            data-field="quick_fix" 
                        />
                        <DxColumn 
                            :width="80" 
                            alignment="center" 
                            caption="Interim Measure"
                            data-field="interim_measure" 
                        />
                        <DxColumn 
                            :width="80" 
                            alignment="center" 
                            caption="Interim Measure Validity"
                            data-field="interim_measure_validity" 
                        />
                        <DxColumn 
                            :width="80" 
                            alignment="center" 
                            caption="Finding Compliance Status"
                            data-field="finding_compliance_status" 
                        />

                        <template #overview-template="{ data }">
                            <img class="cell-picture" :src="data.data.closeup ? data.data.closeup : '/img/default_image.png'" alt="Picture">
                        </template>

                        <template #overview-edit-template>
                            <div class="widget-container">
                                <DxFileUploader 
                                    id="file-uploader" 
                                    :multiple="false" 
                                    upload-mode="useForm"
                                    @value-changed="VALUE_CHANGE" 
                                    :visible="true" 
                                />
                        </div>
                        </template>

                        <template #close-up-template="{ data }">
                            <img class="cell-picture" :src="data.data.closeup ? data.data.closeup : '/img/default_image.png'" alt="Picture">
                        </template>

                        <template #close-up-edit-template>
                        <div class="widget-container">
                            <DxFileUploader 
                                id="file-uploader" 
                                :multiple="false" 
                                upload-mode="useForm"
                                @value-changed="VALUE_CHANGE" 
                                :visible="true" 
                            />
                        </div>
                        </template>

                        <template #insertCellTemplate>
                        <div class="widget-container">
                            <DxFileUploader 
                                id="file-uploader" 
                                :multiple="false" 
                                upload-mode="useForm"
                                @value-changed="VALUE_CHANGE" 
                                :visible="true" 
                            />
                        </div>
                        </template>

                        

                        <!-- Configuration goes here -->
                        <!-- <DxFilterRow :visible="true" /> -->
                        <DxScrolling mode="standard" />
                        <!-- <DxSearchPanel :visible="true" /> -->
                        <DxPaging 
                            :page-size="10" 
                            :page-index="0" />
                        <DxPager 
                            :show-page-size-selector="true" 
                            :allowed-page-sizes="[10, 20, 30]"
                            :show-navigation-buttons="true" 
                            :show-info="false" 
                            info-text="Page {0} of {1} ({2} items)" 
                        />
                        <DxExport 
                            :enabled="false" 
                        />
                    </DxDataGrid>
                </div>
                <!-- <span style="font-size: 16px; font-weight: 400; grid-column: span 2;">CHECKLIST ID: {{ this.record }} </span>
                <div class="input-wrapper">
                    <span>Item</span>
                    <div class="input">
                        <DxTextBox :width="300" placeholder="Enter Item" />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Checklist Item</span>
                    <div class="input">
                        <DxTextBox :width="300" placeholder="Enter Checklist Item" v-model="checklist_row" />
                    </div>
                </div>

                <div class="input-wrapper">
                    <div class="widget-container">
                        <span>Overview</span>
                        <DxFileUploader id="file-uploader" :width="300" :multiple="false" upload-mode="useForm"
                            :visible="true" />
                    </div>
                </div>

                <div class="input-wrapper">
                    <div class="widget-container">
                        <span>Close-up</span>
                        <DxFileUploader id="file-uploader" :width="300" :multiple="false" upload-mode="useForm"
                            :visible="true" />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Findings</span>
                    <div class="input">
                        <DxTextBox :width="300" placeholder="Enter Findings" />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Recommendation</span>
                    <div class="input">
                        <DxTextBox :width="300" placeholder="Enter Recommendation" />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Finding Status (Open/Close)</span>
                    <div class="input">
                        <DxTextBox :width="300" placeholder="Enter Finding Status (Open/Close)" />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Deenergize</span>
                    <div class="input">
                        <DxTextBox :width="300" placeholder="Enter Deenergize" />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Quick Fix</span>
                    <div class="input">
                        <DxTextBox :width="300" placeholder="Enter Quick Fix" />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Interim Measure</span>
                    <div class="input">
                        <DxTextBox :width="300" placeholder="Enter Interim Measure" />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Interim Measure Validity</span>
                    <div class="input">
                        <DxTextBox :width="300" placeholder="Enter Interim Measure Validity" />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Finding Compliance Status</span>
                    <div class="input">
                        <DxTextBox :width="300" placeholder="Enter Finding Compliance Status" />
                    </div>
                </div> -->

                <div class="action-container" style="justify-content: end;">
                    <!-- <button class="create">Create</button> -->
                    <button @click="$emit('popup', false)">Cancel</button>
                </div>

            <!-- </div> -->
        </div>
    </div>
</template>

<script>
//API
// import { axios } from "/axios.js";
// import DxSelectBox from "devextreme-vue/select-box";
// import DxTextBox from 'devextreme-vue/text-box';
import { DxItem } from "devextreme-vue/form";
import { DxFileUploader } from 'devextreme-vue/file-uploader';

import {
    DxDataGrid,
  //   DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    DxFilterRow,
    DxHeaderFilter,
    DxSelection,
  //   DxToolbar,
    DxEditing,
    DxPopup,
    DxLookup,
  //   DxRequiredRule,
  //   DxFormItem,
    DxForm
} from "devextreme-vue/data-grid";

export default {
    name: "checklist-generic",
    components: {
        // DxSelectBox,
        // DxTextBox,
        // DxFileUploader
        DxDataGrid,
        DxExport,
        DxPager,
        DxPaging,
        DxScrolling,
        DxColumn,
        DxFilterRow,
        DxHeaderFilter,
        DxSelection,
        DxEditing,
        DxPopup,
        DxForm,
        DxItem,
        DxFileUploader,
        DxLookup
    },
    props: {
        // checklistInfo: Array,
        record: Number,
        // remark: Object
    },
    data() {
        return {
            checkRecordList: {},
            checkStatus: [],
            checkbox: false,
            // id_checklist: this.$route.params.id_checklist,
            formData: {
                id: null,
                id_chk: null,
                id_inspection_record: null,
                id_result: null,
                comment: ""
            },
            popupShow: false,
            checklist_row: String(this.record),
            // formDataRemark: {
            //   id_header: null,
            //   remark: null
            // }
        };
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "CHECKLIST",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.testList = [
                {
                id: 1,
                id_item: 1,
                inspection_date: '20 Dec 2023',
                campaign: 'Routine Inspection',
                checklist_status: 'P6',
                picture_log_status: 'P6',
                integrity_status: 'P6',
                note: 'Good condition'
                },
            ];
        }
        // if (this.$store.state.status.server == true) {
        //     this.FETCH_CHECKLIST_RECORD();
        //     this.FETCH_INS_CHK_STATUS();
        //     console.log('record: ', this.record)
        // }
    },
    methods: {
        // FETCH_CHECKLIST_RECORD() {
        //     this.isLoading = true;
        //     axios({
        //         method: "get",
        //         url: "/ExInspectionChecklist/get-ex-insp-chk-list-insp-id?id_insp_record=" + this.record,
        //         headers: {
        //             Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        //         },
        //         data: {}
        //     })
        //         .then(res => {
        //             if (res.status == 200 && res.data) {
        //                 this.checkRecordList = res.data;
        //                 // console.log("data ",this.checkRecordList)
        //             }
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         })
        //         .finally(() => {
        //             this.isLoading = false;
        //         });
        // },
        // UPDATE_RESULT(item) {
        //     console.log('test ', item)
        //     axios({
        //         method: "put",
        //         url: "ExInspectionChecklist/edit-ex-insp-chk-list-result",
        //         headers: {
        //             Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        //         },
        //         data: item
        //     })
        //         .then(res => {
        //             if (res.status == 200 && res.data) {
        //                 console.log("==> RESULT UPDATED");
        //             }
        //         })
        //         .catch(error => {
        //             console.log(error);
        //             this.$ons.notification.alert(
        //                 "Update Failed!<br/>Please try again later"
        //             );
        //         })
        //         .finally(() => { });
        // },
        // FETCH_INS_CHK_STATUS() {
        //     axios({
        //         method: "get",
        //         url: "Md/get-md-ex-insp-chk-status-list",
        //         headers: {
        //             Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        //         }
        //     })
        //         .then(res => {
        //             if (res.status == 200 && res.data) {
        //                 this.checkStatus = res.data;
        //                 console.log('status ', res.data)
        //             }
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         })
        //         .finally(() => { });
        // },
        // SET_CHECKLIST_ACTION(popupShow, row) {
        //     // this.current_view = view;
        //     this.checklist_row = row;
        //     this.popupShow = popupShow;
        //     console.log("test row ", row, ' popup ', popupShow);
        // },
    }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-popup {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 51px calc(100vh - 95px);
    transition: all 0.3s;
    overflow-y: hidden;
    position: fixed !important;
    z-index: 999;
    top: 0;
    left: 0;
    background-color: #14141484;
    margin: auto;

    .page-popup-section {
        padding: 20px;
        overflow-y: auto;
        width: 40%;
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

    // @media screen and (max-width: 1180px) {
    //     .page-popup-section {
    //         width: 60%;
    //     }
    // }

    // .popup {
    //     // display: grid;
    //     // grid-template-columns: repeat(2, 1fr);
    //     // gap: 15px;
    //     // *[fill] {

    //     //   grid-column: span 3;
    //     // }
    //     h3 {
    //         padding: 0;
    //         margin: 0;

    //     }
    // }
}

.input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;

    span {
        font-size: 10px;
        font-weight: 600;
    }
}

.action-container {
    display: flex;
    justify-content: center;
    // gap: 15%;
    margin-top: 15px;

    button {
        width: 30%;
    }
}

button {
    padding: 20px 0;
    background-color: white;
    border: solid 1px gray;
    border-radius: 10px;
    font-weight: 800;
    font-size: 16px;
    transition: 1s;
    cursor: pointer;
}

.create {
    color: white;
    background-color: $web-theme-color-secondary;
}
img{
    width:  80px;
    height: 80px;
}
</style>