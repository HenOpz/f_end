<template>

    <div class="page-container">
        <div class="action-bar">
            <button class="back" @click="SET_CURRENT_VIEW(0)"><i class="fas fa-chevron-left"></i> BACK</button>
            <div class="wrapper">
                <div class="switch">
                    <div>
                        <v-ons-switch 
                            style="padding: 0 !important; border: 0;" 
                            input-id="switch1"
                            v-model="btn_state" 
                        />
                    </div>
                    <span>EDIT MODE</span>
                </div>
                <button class="submit" @click="UPDATE_RECORD"><i class="fas fa-save"></i> SUBMIT</button>
                <button @click="DELETE_RECORD" class="delete">
                    <i class="fas fa-trash-alt"></i> DELETE
                </button>
            </div>
        </div>
        <div class="page-section">
            <div class="table-wrapper">
                <div class="input-wrapper">
                    <span>Platform</span>
                    <div class="select">
                        <DxSelectBox 
                            :items="platform" 
                            value-expr="id" 
                            display-expr="code_name"
                            v-model="inspTaskRecordList.id_platform" 
                            :disabled="true"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Asset Type</span>
                    <div class="select">
                        <DxSelectBox 
                            :items="asset" 
                            value-expr="id" 
                            display-expr="asset_type"
                            v-model="inspTaskRecordList.id_asset" 
                            :disabled="true" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Tag Number</span>
                    <div class="input">
                        <DxTextBox 
                            v-model="inspTaskRecordList.tag_number" 
                            :disabled="true" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Inspection Type</span>
                    <div class="select">
                        <DxSelectBox 
                            :items="insp_type" 
                            value-expr="id" 
                            display-expr="insp_type"
                            v-model="inspTaskRecordList.id_insp_type" 
                            :disabled="true" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Due Inspection Date</span>
                    <div class="input">
                        <DxDateBox 
                            type="date" 
                            v-model="inspTaskRecordList.due_insp_date" 
                            :disabled="true" 
                            display-format="dd MMM yyyy" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Plan Inspection Date</span>
                    <div class="input">
                        <DxDateBox 
                            type="date" 
                            v-model="inspTaskRecordList.plan_insp_date" 
                            :disabled="!btn_state" 
                            display-format="dd MMM yyyy" 
                            placeholder="Select Date"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Plan Manhours</span>
                    <div class="input">
                        <DxTextBox 
                            v-model="inspTaskRecordList.plan_manhours" 
                            :disabled="!btn_state" 
                            placeholder="Enter Plan Manhours"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Actual Manhours</span>
                    <div class="input">
                        <DxTextBox 
                            v-model="inspTaskRecordList.actual_manhours" 
                            :disabled="!btn_state" 
                            placeholder="Enter Plan Manhours"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Inspection Effectiveness</span>
                    <div class="input">
                        <DxTextBox 
                            v-model="inspTaskRecordList.insp_effectiveness" 
                            :disabled="!btn_state" 
                            placeholder="Enter Inspection Effectiveness"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Status</span>
                    <div class="select">
                        <DxSelectBox 
                            :items="task_status" 
                            value-expr="id" 
                            display-expr="status"
                            v-model="inspTaskRecordList.id_insp_task_status" 
                            :disabled="!btn_state" 
                            placeholder="Select Status"
                        />
                    </div>
                </div>

                <div class="input-wrapper" span-2>
                    <span>Note</span>
                    <div class="input">
                        <DxTextBox 
                            v-model="inspTaskRecordList.note" 
                            :disabled="!btn_state" 
                            placeholder="Enter Note"
                        />
                    </div>
                </div>

                <div fill>
                    <div class="table-header-toolbar left" style="width: calc(100% - 231px)">
                        <label class="hd">Attachment</label>
                    </div>
                    <DxDataGrid 
                        id="data-grid-list" 
                        key-expr="id" 
                        :ref="gridRefName" 
                        :data-source="library"
                        :hover-state-enabled="true" 
                        :allow-column-reordering="true" 
                        :show-borders="true"
                        :show-row-lines="true" 
                        :focused-row-enabled="false" 
                        :row-alternation-enabled="false"
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
                            :allow-deleting="true" 
                            :allow-adding="true" 
                            :allow-updating="true" 
                            :use-icons="true"
                            :show-borders="true" 
                            mode="popup"
                        >
                            <DxPopup
                                :show-title="true"
                                :width="650"
                                :height="300"
                                title="Attachment"
                            />
                            <DxForm label-location="top">
                                <DxItem :col-count="2" :col-span="2" :row-count="1" item-type="group">
                                    <DxItem item-type="group">
                                        <DxItem data-field="file" :col-span="1" />
                                    </DxItem>
                                    <DxItem item-type="group">
                                        <DxItem data-field="note" :col-span="1" />
                                    </DxItem>
                                </DxItem>
                            </DxForm>
                        </DxEditing>

                        <DxColumn 
                            data-field="file" 
                            :visible="false" 
                            edit-cell-template="insertCellTemplate" 
                        />

                        <DxColumn 
                            data-field="file_name" 
                            :allow-adding="true" 
                            :allow-editing="true" 
                            caption="File Name"
                            :editor-options="fileNameInputOptions" 
                            sort-order="desc" 
                            :min-width="120" 
                        />

                        <DxColumn 
                            data-field="note" 
                            caption="Note" 
                            :min-width="120" 
                            alignment="left" 
                        />

                        <DxColumn 
                            data-field="file_type" 
                            caption="Extension" 
                            :width="120" 
                            alignment="center" 
                        />

                        <DxColumn 
                            data-field="created_date" 
                            caption="Uploaded Date" 
                            :width="120" 
                            alignment="center"
                            format="dd MMM yyyy" 
                            data-type="date" 
                            header-cell-template="dateHeader"
                        />

                        <template #dateHeader>
                            <div>Uploaded<br />Date</div>
                        </template>

                        <DxColumn
                            data-field="file_path" 
                            cell-template="pathCellTemplate" 
                            caption="Attachment"
                            :width="120" 
                            alignment="center" 
                        />

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

                        <!-- <template #noteCellTemplate="{ data }">
                            <div>
                                <DxTextArea :height="100" :value="data.data.value" placeholder="Enter Note" />
                            </div>
                        </template> -->

                        <template #pathCellTemplate="{ data }">
                            <div>
                                <button class="library-btn-download" @click="DOWNLOAD(data.value, data.data.file_name)">
                                    <i class="fa-regular fa-circle-down"></i>
                                    DOWNLOAD</button>
                            </div>
                        </template>

                        <DxToolbar>
                            <DxItem location="after" template="addButton" />
                            <DxItem location="after" name="searchPanel" />
                        </DxToolbar>
                        <template #addButton>
                            <DxButton icon="las la-plus" @click="ADD_ROW" hint="Add" />
                        </template>

                        <DxHeaderFilter :visible="true" />
                        <!-- <DxFilterRow :visible="false" /> -->
                        <DxScrolling mode="standard" />
                        <DxSearchPanel :visible="true" />
                        <DxPaging :page-size="10" :page-index="0" />
                        <DxPager :visible="false" :show-page-size-selector="true" :allowed-page-sizes="[5, 10, 'all']"
                            :show-navigation-buttons="true" :show-info="true" info-text="Page {0} of {1} ({2} items)" />
                        <DxExport :enabled="false" />
                    </DxDataGrid>
                </div>
                <br>
            </div>
        </div>
    </div>
</template>

<script>
//API
import { axios } from "/axios.js";
import moment from "moment";

//Components
//import VueTabsChrome from "vue-tabs-chrome";

//DataGrid
import "devextreme/dist/css/dx.light.css";
// import { Workbook } from "exceljs";
// import saveAs from "file-saver";
// import { exportDataGrid } from "devextreme/excel_exporter";
import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';
import DxDateBox from 'devextreme-vue/date-box';
//import DxTextArea from 'devextreme-vue/text-area';
import DxButton from "devextreme-vue/button";
import { DxItem } from "devextreme-vue/form";
import { DxFileUploader } from "devextreme-vue/file-uploader";
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
    // DxSelection,
    DxEditing,
    // DxFilterRow,
    // DxButton,
    // DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    DxForm,
    // DxItem,
    DxPopup,
} from "devextreme-vue/data-grid";

//Structures

export default {
    name: "inspection-record",
    props: {
        id_record: Number,
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
        // DxSelection,
        DxForm,
        DxItem,
        DxEditing,
        // DxFilterRow,
        DxButton,
        // DxAddRowButton,
        // DxLookup,
        // DxRequiredRule,
        // DxFormItem,
        DxSelectBox,
        DxTextBox,
        DxDateBox,
        DxFileUploader,
        // DxTextArea,
        DxPopup,
    },
    created() {
        if (this.$store.state.status.server == true) {
            this.FETCH_DROPDOWN_ASSET();
            this.FETCH_DROPDOWN_PLATFORM();
            this.FETCH_DROPDOWN_INSP_TYPE();
            this.FETCH_DROPDOWN_TASK_STATUS();
            this.FETCH_INSP_TASK_RECORD();
            this.FETCH_INSP_TASK_FILE();
            this.FETCH_LIBRARY();
        }
    },
    data() {
        return {
            inspTaskRecordList: {},
            inspTaskFileList: {},
            insp_type: [],
            platform: [],
            asset: [],
            task_status: [],
            btn_state: false,
            library: [],
            file: [],
            gridRefName: "grid-library",
            fileNameInputOptions: { placeholder: "File Name" },
            dataFileTemp: "",
            isEdit: false,
        };
    },
    computed: {
        baseURL() {
            var mode = this.$store.state.mode;
            if (mode == "dev") return this.$store.state.modeURL.dev;
            else if (mode == "prod") return this.$store.state.modeURL.prod;
            else return console.log("develpment mode set up incorrect.");
        }
    },
    methods: {
        FETCH_INSP_TASK_RECORD() {
            this.isLoading = true;
            axios({
                method: "get",
                url:
                    "/InspectionTask/" + this.id_record,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.inspTaskRecordList = res.data;
                        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
                            subpageName: "IT NUMBER: " + this.inspTaskRecordList.it_number,
                            subpageInnerName: null,
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_INSP_TASK_FILE() {
            this.isLoading = true;
            axios({
                method: "get",
                url:
                    "/InspectionTaskFile",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.inspTaskFileList = res.data;
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
            if (this.inspTaskRecordList.due_insp_date)
                this.inspTaskRecordList.due_insp_date = moment(this.inspTaskRecordList.due_insp_date).format("L");
            if (this.inspTaskRecordList.plan_insp_date)
                this.inspTaskRecordList.plan_insp_date = moment(this.inspTaskRecordList.plan_insp_date).format("L");
            axios({
                method: "put",
                url: "/InspectionTask/" + this.inspTaskRecordList.id,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: this.inspTaskRecordList
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
                url: "/InspectionTask/delete-insp-task?id=" + this.inspTaskRecordList.id,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 204) {
                        this.$emit('currentView', 0);
                    }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => { });
        },
        FETCH_DROPDOWN_INSP_TYPE() {
            axios({
                method: "get",
                url: "/Md/get-md-insp-type-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.insp_type = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_DROPDOWN_PLATFORM() {
            axios({
                method: "get",
                url: "/Md/get-md-platform-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.platform = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_DROPDOWN_ASSET() {
            axios({
                method: "get",
                url: "/Md/get-md-asset-type-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.asset = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_DROPDOWN_TASK_STATUS() {
            axios({
                method: "get",
                url: "/Md/get-md-insp-task-status-list",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.task_status = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_LIBRARY() {
            this.isLoading = true;
            axios({
                method: "get",
                url: "/InspectionTaskFile/get-insp-task-file-by-id-task?id=" + this.id_record,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    console.log('fetch library', res);
                    if (res.status == 200) {
                        this.library = res.data;
                        this.isLoading = false;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        ADD_NEW_FILE(e) {
            // const user = JSON.parse(localStorage.getItem("user"));
            console.log('e',e);
            var formData = new FormData();
            formData.append("id_insp_task", this.inspTaskRecordList.id);
            formData.append("file", this.file);
            formData.append("note", e.data.note);
            if (this.file.length == 0)
                return this.$ons.notification.alert("Please select file").then(res => {
                    if (res == 0) {
                        this.FETCH_LIBRARY();
                    }
                });
            axios({
                method: "post",
                url: "/InspectionTaskFile",
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: formData
            })
                .then(res => {
                    console.log(res);
                    if (res.status == 201) {
                        this.FETCH_LIBRARY();
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                    this.$ons.notification
                        .alert(error.message, {
                            title: "Add New File failed"
                        })
                        .then(res => {
                            if (res == 0) {
                                this.FETCH_LIBRARY();
                            }
                        });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        UPDATE_DOC(e) {
            var formData = new FormData();
            formData.append("id", e.data.id);
            formData.append("id_insp_task", e.data.id_insp_task);
            formData.append("file", this.file ?? "");
            formData.append("note", e.data.note);
            axios({
                method: "put",
                url: "/InspectionTaskFile/" + e.data.id,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: formData
            })
                .then(res => {
                    console.log(res);
                    if (res.status == 204) {
                        this.FETCH_LIBRARY();
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.isLoading = false;
                    this.$ons.notification
                        .alert(error.message, {
                            title: "Update File failed"
                        })
                        .then(res => {
                            if (res == 0) {
                                this.FETCH_LIBRARY();
                            }
                        });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        VALUE_CHANGE(e) {
            //console.log("fileReader e data:");
            console.log(e);
            console.log(e.value[0].name);
            let reader = new FileReader();
            reader.readAsDataURL(e.value[0]);
            reader.onload = () => {
                // this function is for showing the image preview on upload
            };
            this.file = e.value[0];
        },
        SAVE(e) {
            console.log(e);
            console.log(this.file);
            if ((e.changes.length > 0 || this.file.size > 0) && this.isEdit) {
                console.log('save');
                this.UPDATE_DOC(this.dataFileTemp);
            }
        },
        DOWNLOAD(p, n) {
            console.log(n);
            const url = this.baseURL + p;
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", n);
            link.setAttribute("target", "_blank");
            document.body.appendChild(link);
            link.click();
        },
        DELETE_DOC(e) {
            const id = e.data.id;
            axios({
                method: "delete",
                url: "/InspectionTaskFile/" + id,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 204) {
                        this.FETCH_LIBRARY();
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.isLoading = false;
                    this.$ons.notification
                        .alert(error.message, {
                            title: "Delete failed"
                        })
                        .then(res => {
                            if (res == 0) {
                                this.FETCH_LIBRARY();
                            }
                        });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        ADD_ROW() {
            var grid = this.$refs[this.gridRefName].instance;
            grid.addRow();
            grid.deselectAll();
        },
        SET_CURRENT_VIEW(view, data = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", true);
            if (data !== null) this.$emit('currentView', view, data);
            else this.$emit('currentView', view);
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
    grid-template-columns: repeat(4, 1fr);
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

    *[fill] {
        grid-column: span 4;
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

    .library-btn-download {
        font-size: 12px;
        font-weight: 500;
        border-radius: 20px;
        border: 1px solid gray;
        padding: 8px;
        color: #3c3c3c;
        background: transparent;

        &:hover {
            transition: 0.4s;
            background: #d8d8d8;
        }
    }
}
.hd {
  line-height: 36px;
  user-select: text;
  cursor: text;
  font-size: 16px;
  font-weight: 600;
  color: $dexon-primary-blue;
}

</style>