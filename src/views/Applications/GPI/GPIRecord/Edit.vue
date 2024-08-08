<template>
    <div>
        <div class="page-container">
            <div class="page-section">
                <div class="action-bar">
                    <button
                        class="back"
                        @click="()=>{this.$router.go(-1)}"
                    >
                        <i class="fas fa-chevron-left"></i> BACK
                    </button>
                    <div class="wrapper">
                        <div
                            class="switch"
                            v-if="this.user.id == this.currentUserTXN && this.currentStatusTXN != 3"
                        >
                            <div>
                                <v-ons-switch
                                    style="padding: 0 !important; border: 0"
                                    input-id="switch1"
                                    v-model="btn_state"
                                />
                            </div>
                            <span>EDIT MODE</span>
                        </div>

                        <button
                            @click="UPDATE_RECORD"
                            class="submit"
                            v-if="this.user.id == this.currentUserTXN && this.currentStatusTXN != 3"
                        >
                            <i class="fas fa-save"></i> SAVE
                        </button>
                        <button
                            @click="SET_CURRENT_VIEW(0)"
                            class="delete"
                            v-if="this.user.id == this.currentUserTXN && this.currentStatusTXN != 3"
                        >
                            <i class="fas fa-trash-alt"></i> DELETE
                        </button>
                    </div>
                </div>
                <div class="table-wrapper">
                    <div
                        span-2
                        class="input-wrapper"
                    >
                        <div class="title-wrapper">
                            <span>Platform</span>
                            <span>*</span>
                        </div>
                        <div class="select">
                            <DxSelectBox
                                :items="platformList"
                                value-expr="id"
                                display-expr="code_name"
                                v-model="gpiRecordList.id_platform"
                                placeholder="Select Platform"
                                :disabled="!btn_state"
                            />
                        </div>
                    </div>

                    <div
                        span-2
                        class="input-wrapper"
                    >
                        <div class="title-wrapper">
                            <span>Asset Type</span>
                            <span>*</span>
                        </div>
                        <div class="select">
                            <DxSelectBox
                                :items="assetTypeList"
                                value-expr="asset_type"
                                display-expr="asset_type"
                                v-model="gpiRecordList.asset_type"
                                :value="gpiRecordList.asset_type"
                                placeholder="Select Asset Type"
                                :accept-custom-value="true"
                                @customItemCreating="
                                    INSERT_ITEM_SELECT_BOX(
                                        $event,
                                        assetTypeList
                                    )
                                "
                                :disabled="!btn_state"
                            />
                        </div>
                    </div>

                    <div
                        span-2
                        class="input-wrapper"
                    >
                        <span>Tag Number</span>
                        <div class="input">
                            <DxTextBox
                                v-model="gpiRecordList.tag_no"
                                placeholder="Enter Tag Number"
                                :disabled="!btn_state"
                            />
                        </div>
                    </div>

                    <div
                        span-2
                        class="input-wrapper"
                    >
                        <span>Location | Deck</span>
                        <div class="input">
                            <DxSelectBox
                                :items="deckList"
                                value-expr="code"
                                display-expr="code"
                                :value="gpiRecordList.location_deck"
                                v-model="gpiRecordList.location_deck"
                                :accept-custom-value="true"
                                @customItemCreating="
                                    INSERT_ITEM_SELECT_BOX($event, deckList)
                                "
                                placeholder="Select Location | Deck"
                                :disabled="!btn_state"
                            />
                        </div>
                    </div>

                    <div
                        span-2
                        class="input-wrapper"
                    >
                        <div class="title-wrapper">
                            <span>GPI Date</span>
                            <span>*</span>
                        </div>
                        <div class="input">
                            <DxDateBox
                                type="date"
                                v-model="gpiRecordList.gpi_date"
                                :disabled="!btn_state"
                                display-format="dd MMM yyyy"
                            />
                        </div>
                    </div>

                    <div
                        span-2
                        class="input-wrapper"
                    >
                        <span>Main Component Description</span>
                        <div class="input">
                            <DxTextBox
                                v-model="gpiRecordList.main_component_free_text"
                                placeholder="Enter Main Component Description"
                                :disabled="!btn_state"
                            />
                        </div>
                    </div>

                    <div
                        span-2
                        class="input-wrapper"
                    >
                        <span>Severity</span>
                        <div class="select">
                            <DxSelectBox
                                :items="severityList"
                                value-expr="id"
                                display-expr="status"
                                v-model="gpiRecordList.id_severity"
                                placeholder="Select Severity"
                                :disabled="!btn_state"
                            />
                        </div>
                    </div>

                    <div
                        span-2
                        class="input-wrapper"
                    >
                        <span>Mitigation</span>
                        <div class="input">
                            <DxTextBox
                                v-model="gpiRecordList.mitigation_free_text"
                                placeholder="Enter Mitigation"
                                :disabled="!btn_state"
                            />
                        </div>
                    </div>

                    <div
                        span-2
                        class="input-wrapper"
                    >
                        <span>Repair Description</span>
                        <div class="input">
                            <DxSelectBox
                                :items="repairTypeList"
                                value-expr="code"
                                display-expr="code"
                                :value="gpiRecordList.repair_type_free_text"
                                v-model="gpiRecordList.repair_type_free_text"
                                :accept-custom-value="true"
                                @customItemCreating="
                                    INSERT_ITEM_SELECT_BOX(
                                        $event,
                                        repairTypeList
                                    )
                                "
                                placeholder="Select Repair Type"
                                :disabled="!btn_state"
                            />
                        </div>
                    </div>

                    <div
                        span-2
                        class="input-wrapper"
                    >
                        <span>Discipline</span>
                        <div class="select">
                            <DxSelectBox
                                :items="disciplineList"
                                value-expr="id"
                                display-expr="code"
                                v-model="gpiRecordList.id_discipline"
                                placeholder="Select Discipline"
                                :disabled="disciplineDisable"
                            />
                        </div>
                    </div>

                    <div
                        span-2
                        class="input-wrapper"
                    >
                        <span>Expected Finish Date</span>
                        <div class="select">
                            <DxDateBox
                                v-model="gpiRecordList.expected_finish_date"
                                placeholder="Select Date"
                                :disabled="!btn_state"
                                display-format="dd MMM yyyy"
                            />
                        </div>
                    </div>

                    <div
                        span-2
                        class="input-wrapper"
                    >
                        <span>Status</span>
                        <div class="select">
                            <DxSelectBox
                                :items="statusList"
                                value-expr="id"
                                display-expr="code"
                                v-model="gpiRecordList.id_status"
                                placeholder="Select Status"
                                :disabled="!btn_state"
                            />
                        </div>
                    </div>

                    <div
                        fill
                        class="input-wrapper"
                    >
                        <span>Damage Mechanism / Findings</span>
                        <div class="input">
                            <DxTextArea
                                :height="120"
                                :auto-resize-enabled="true"
                                v-model="gpiRecordList.dmg_mech_findings"
                                :disabled="!btn_state"
                            />
                        </div>
                    </div>

                    <div
                        fill
                        class="input-wrapper"
                    >
                        <span>Recommendation</span>
                        <div class="input">
                            <DxTextArea
                                :height="120"
                                :auto-resize-enabled="true"
                                v-model="gpiRecordList.recommendation"
                                :disabled="!btn_state"
                            />
                        </div>
                    </div>

                    <div fill>
                        <div
                            class="table-header-toolbar left"
                            style="width: calc(100% - 231px)"
                        >
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
                            @init-new-row="
                                () => {
                                    this.file = [];
                                    this.isEdit = false;
                                }
                            "
                            @editing-start="
                                (e) => {
                                    this.file = [];
                                    this.isEdit = true;
                                    this.dataFileTemp = e;
                                }
                            "
                            @row-removing="
                                () => {
                                    this.isEdit = false;
                                }
                            "
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
                                    <DxItem
                                        :col-count="2"
                                        :col-span="2"
                                        :row-count="1"
                                        item-type="group"
                                    >
                                        <DxItem item-type="group">
                                            <DxItem
                                                data-field="file"
                                                :col-span="1"
                                            />
                                        </DxItem>
                                        <DxItem item-type="group">
                                            <DxItem
                                                data-field="note"
                                                :col-span="1"
                                            />
                                        </DxItem>
                                    </DxItem>
                                </DxForm>
                            </DxEditing>

                            <DxColumn
                                data-field="file"
                                :visible="false"
                                edit-cell-template="insertCellTemplate"
                            />

                            <!-- <DxColumn 
                                data-field="file_name" 
                                :allow-adding="true" 
                                :allow-editing="true" 
                                caption="File Name"
                                :editor-options="fileNameInputOptions" 
                                sort-order="desc" :min-width="120" 
                            /> -->
                            <DxColumn
                                data-field="file_name"
                                :allow-adding="true"
                                :allow-editing="true"
                                caption="Picture"
                                :editor-options="fileNameInputOptions"
                                sort-order="desc"
                                :min-width="120"
                                cell-template="picture-template"
                            />
                            <template #picture-template="{ data }">
                                <div
                                    style="
                                        display: flex;
                                        justify-content: center;
                                    "
                                >
                                    <!-- <a :href="baseURL + data.value" download="dwg" target="_blank" v-if="data.value != ''">
                                    <img :src="baseURL + data.value" width="300" height="200" />
                                    <br />
                                </a> -->

                                    <img
                                        :src="baseURL + data.data.file_path"
                                        width="200"
                                        height="200"
                                    />
                                </div>
                            </template>

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
                                        accept="image/*"
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
                                    <button
                                        class="library-btn-download"
                                        @click="
                                            DOWNLOAD(
                                                data.value,
                                                data.data.file_name
                                            )
                                        "
                                    >
                                        <i
                                            class="fa-regular fa-circle-down"
                                        ></i>
                                        DOWNLOAD
                                    </button>
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

                            <DxHeaderFilter :visible="true" />
                            <!-- <DxFilterRow :visible="false" /> -->
                            <DxScrolling mode="standard" />
                            <DxSearchPanel :visible="true" />
                            <DxPaging
                                :page-size="10"
                                :page-index="0"
                            />
                            <DxPager
                                :visible="false"
                                :show-page-size-selector="true"
                                :allowed-page-sizes="[5, 10, 'all']"
                                :show-navigation-buttons="true"
                                :show-info="true"
                                info-text="Page {0} of {1} ({2} items)"
                            />
                            <DxExport :enabled="false" />
                        </DxDataGrid>
                    </div>

                    <br />

                    <div
                        class="action-wrapper"
                        fill
                    >
                        <button class="submit" @click="submitGpiRecord = true" v-if="this.currentStatusTXN == 5 && this.user.id == this.currentUserTXN">SUBMIT</button>
                        <button class="submit" @click="approveGpiRecordWithSap = true" v-if="this.currentStatusTXN == 2 && this.user.id == this.currentUserTXN">APPROVE WITH SAP</button>
                        <button class="submit" @click="approveGpiRecord = true" v-if="this.currentStatusTXN == 2 && this.user.id == this.currentUserTXN">APPROVE</button>
                        <button class="delete" @click="rejectGpiRecord = true" v-if="this.currentStatusTXN == 2 && this.user.id == this.currentUserTXN">REJECT</button>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="submitGpiRecord"
            class="confirm-popup-backdrop"
        >
            <div class="popup">
                <h4>Are You Sure?</h4>
                <p>Your report will be sent once you confirm it. Please note that you will not be able to make any changes after it has been submitted. Are you sure you want to continue?</p>
                <div v-if="this.userList.length > 1" class="select-wrapper">
                    <span>Select User</span>
                    <div class="select">
                        <DxSelectBox
                            :items="userList"
                            value-expr="id"
                            display-expr="code"
                            v-model="selectedUser.id_user_info"
                            placeholder="Select User"
                        />
                    </div>
                </div>
                <br>
                <div v-if="this.userList.length > 1" class="input-wrapper">
                    <span>Enter Pin for Confirm</span>
                    <div class="inputs">
                        <div class="input">
                            <DxTextBox
                                v-model="selectedUser.pin.box1"
                                max-length="1"
                                :input-attr="{ style: 'text-align: center;' }"
                            />
                        </div>
                        <div class="input">
                            <DxTextBox
                                v-model="selectedUser.pin.box2"
                                max-length="1"
                                :input-attr="{ style: 'text-align: center;' }"
                            />
                        </div>
                        <div class="input">
                            <DxTextBox
                                v-model="selectedUser.pin.box3"
                                max-length="1"
                                :input-attr="{ style: 'text-align: center;' }"
                            />
                        </div>
                        <div class="input">
                            <DxTextBox
                                v-model="selectedUser.pin.box4"
                                max-length="1"
                                :input-attr="{ style: 'text-align: center;' }"
                            />
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <button
                        class="submit"
                        @click="SUBMIT_GPI_RECORD"
                    >
                        SUBMIT
                    </button>
                    <button
                        class="cancel"
                        @click="submitGpiRecord = false"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>

        <div
            v-if="approveGpiRecord"
            class="confirm-popup-backdrop"
        >
            <div class="popup">
                <h4>Are You Sure?</h4>
                <p>Your report will be approved once you confirm it. Please note that you will not be able to make any changes after it has been approved. Are you sure you want to continue?</p>
                <div v-if="this.userList.length > 1" class="select-wrapper">
                    <span>Select User</span>
                    <div class="select">
                        <DxSelectBox
                            :items="userList"
                            value-expr="id"
                            display-expr="code"
                            v-model="selectedUser.id_user_info"
                            placeholder="Select User"
                        />
                    </div>
                </div>
                <br>
                <div v-if="this.userList.length > 1" class="input-wrapper">
                    <span>Enter Pin for Confirm</span>
                    <div class="inputs">
                        <div class="input">
                            <DxTextBox
                                v-model="selectedUser.pin.box1"
                                max-length="1"
                                :input-attr="{ style: 'text-align: center;' }"
                            />
                        </div>
                        <div class="input">
                            <DxTextBox
                                v-model="selectedUser.pin.box2"
                                max-length="1"
                                :input-attr="{ style: 'text-align: center;' }"
                            />
                        </div>
                        <div class="input">
                            <DxTextBox
                                v-model="selectedUser.pin.box3"
                                max-length="1"
                                :input-attr="{ style: 'text-align: center;' }"
                            />
                        </div>
                        <div class="input">
                            <DxTextBox
                                v-model="selectedUser.pin.box4"
                                max-length="1"
                                :input-attr="{ style: 'text-align: center;' }"
                            />
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <button
                        class="submit"
                        @click="APPROVE_GPI_RECORD"
                    >
                        APPROVE
                    </button>
                    <button
                        class="cancel"
                        @click="approveGpiRecord = false"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>

        <div
            v-if="rejectGpiRecord"
            class="confirm-popup-backdrop"
        >
            <div class="popup">
                <h4>Are You Sure?</h4>
                <p style="margin-bottom: 10px;">Are you sure you want to reject this report? Please enter the remark of the reject report.</p>
                <DxTextArea
                    placeholder="Enter Remark"
                    v-model="rejectGpiRemark"
                    style="margin-bottom: 15px;"
                />
                <div class="actions">
                    <button
                        class="reject"
                        @click="REJECT_GPI_RECORD"
                    >
                        REJECT
                    </button>
                    <button
                        class="cancel"
                        @click="rejectGpiRecord = false"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
        
        <Sap :data="gpiRecordList" v-if="approveGpiRecordWithSap == true" @popup="REFRESH_DATA" />
    </div>
</template>

<script>
import { GET_DATA, PUT_DATA, POST_DATA, DELETE_DATA } from "/axios.js";
import moment from "moment";
import "devextreme/dist/css/dx.light.css";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import DxDateBox from "devextreme-vue/date-box";
import DxTextArea from "devextreme-vue/text-area";
import { DxFileUploader } from "devextreme-vue/file-uploader";
import DxButton from "devextreme-vue/button";
import { DxItem } from "devextreme-vue/form";
import DataSource from "devextreme/data/data_source";
import Sap from "./Sap.vue"
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
    DxEditing,
    DxForm,
    DxPopup,
} from "devextreme-vue/data-grid";

export default {
    name: "gpi-record",
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
        DxForm,
        DxItem,
        DxEditing,
        DxButton,
        DxPopup,
        DxSelectBox,
        DxTextBox,
        DxDateBox,
        DxTextArea,
        DxFileUploader,
        Sap,
    },
    created() {
        if (this.$store.state.status.server == true) {
            GET_DATA(this, `/GpiRecord/${this.id_record}`, "gpiRecordList", (data) => {
                const resultArray = []
                for (const [key, value] of Object.entries(data)) {
                    resultArray.push({key: key, value: value});
                }
                this.gpiRecordList = resultArray[0].value;

                this.$store.commit("UPDATE_CURRENT_PAGENAME", {
                    subpageName: "GPI NUMBER: " + this.gpiRecordList.gpi_number,
                    subpageInnerName: null,
                });
            }, (errorMsg) => {
                if(errorMsg.response.status == 404) {
                    this.$router.go(-1);
                }
            });
            GET_DATA(this, "/Md/get-md-platform-list", "platformList");
            GET_DATA(this, "/Md/get-md-asset-type-list", "assetTypeList");
            GET_DATA(
                this,
                "/Md/get-md-gpi-main-component-list",
                "mainComponentList"
            );
            GET_DATA(
                this,
                "/Md/get-md-gpi-damage-mechanism-list",
                "damageMechanismList"
            );
            GET_DATA(this, "/Md/get-md-gpi-severity-list", "severityList");
            GET_DATA(this, "/Md/get-md-gpi-repair-list", "typeOfRepairList");
            GET_DATA(this, "/Md/get-md-gpi-repair-type-list", "repairTypeList");
            GET_DATA(
                this,
                "/Md/get-md-sap-main-work-ctr-list",
                "mainWorkCtrList"
            );
            GET_DATA(this, "/Md/get-md-gpi-location-deck-list", "deckList");
            GET_DATA(this, "/Md/get-md-gpi-discipline-list", "disciplineList");
            GET_DATA(this, "/Md/get-md-gpi-record-status-list", "statusList");
            GET_DATA(
                this,
                `/GpiRecordTXN/get-last-gpi-record-txn-by-id-gpi?id_gpi=${this.id_record}`,
                "recordLastTXN",
                (data) => {
                    this.currentStatusTXN = data.id_status;
                    this.currentUserTXN = data.id_user;
                }
            );
            GET_DATA(
                this,
                `/GpiFile/get-gpi-file-by-id?id=${this.id_record}`,
                "library"
            );
            this.user = JSON.parse(localStorage.getItem("user"));
            GET_DATA(this, `/User/get-user-info-by-id-user?id=${this.user.id}`, (data) => {
                this.userList = data.map(e => {
                    return {id: e.id, code: e.name}
                })
                if (this.userList.length === 1) this.selectedUser.id_user_info = this.userList[0].id;
            });
            console.log("user", this.user);
        }
    },
    data() {
        return {
            userList: [],
            platformList: [],
            assetTypeList: [],
            mainComponentList: [],
            damageMechanismList: [],
            severityList: [],
            typeOfRepairList: [],
            repairTypeList: [],
            mainWorkCtrList: [],
            deckList: [],
            disciplineList: [],
            gpiRecordList: {},
            statusList: [],
            recordLastTXN: [],
            selectedUser: {
                id_user_info: 0,
                pin: {
                    box1: null,
                    box2: null,
                    box3: null,
                    box4: null
                }
            },
            file: [],
            library: [],
            gridRefName: "grid-library",
            fileNameInputOptions: { placeholder: "File Name" },
            dataFileTemp: "",
            isEdit: false,
            dataGridAttributes: {
                class: "data-grid-style",
            },
            btn_state: false,
            user: null,
            submitGpiRecord: false,
            approveGpiRecord: false,
            approveGpiRecordWithSap: false,
            rejectGpiRecord: false,
            rejectGpiRemark: "",
            id_record: this.$route.params.id_record,
            currentStatusTXN: null,
            currentUserTXN: null,
        };
    },
    computed: {
        baseURL() {
            var mode = this.$store.state.mode;
            if (mode == "dev") return this.$store.state.modeURL.dev;
            else if (mode == "prod") return this.$store.state.modeURL.prod;
            else return console.log("develpment mode set up incorrect.");
        },
        disciplineDisable() {
            if (this.currentStatusTXN == 2) {
                return true;
            } else {
                return !this.btn_state;
            }
        },
    },
    methods: {
        UPDATE_RECORD() {
            this.gpiRecordList.updated_by = this.user.id;
            if (this.gpiRecordList.gpi_date !== null)
                this.gpiRecordList.gpi_date = moment(
                    this.gpiRecordList.gpi_date
                ).format("L");
            if (this.gpiRecordList.expected_finish_date !== null)
                this.gpiRecordList.expected_finish_date = moment(
                    this.gpiRecordList.expected_finish_date
                ).format("L");
            PUT_DATA(`/GpiRecord/${this.id_record}`, this.gpiRecordList, () => {
                //this.REFRESH_DATA();
            });
        },
        DELETE_RECORD() {
            DELETE_DATA(
                `/GpiRecord/delete-gpi-record?id=${this.id_record}`,
                () => {
                    this.SET_CURRENT_VIEW(0);
                }
            );
        },
        SET_CURRENT_VIEW(view, data = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", true);
            if (data !== null) this.$emit("currentView", view, data);
            else this.$emit("currentView", view);
        },
        ADD_NEW_FILE(e) {
            var formData = new FormData();
            formData.append("id_gpi_record", this.id_record);
            formData.append("file", this.file);
            formData.append("note", e.data.note);
            if (this.file.length == 0)
                return this.$ons.notification
                    .alert("Please select file")
                    .then((res) => {
                        if (res == 0) {
                            GET_DATA(
                                this,
                                `/GpiFile/get-gpi-file-by-id?id=${this.id_record}`,
                                "library"
                            );
                        }
                    });
            POST_DATA("/GpiFile", formData, true, () => {
                GET_DATA(
                    this,
                    `/GpiFile/get-gpi-file-by-id?id=${this.id_record}`,
                    "library"
                );
            });
        },
        UPDATE_DOC(e) {
            console.log("e.data", e.data);
            var formData = new FormData();
            formData.append("id", e.data.id);
            formData.append("id_gpi_record", e.data.id_gpi_record);
            formData.append("file", this.file ?? "");
            formData.append("note", e.data.note);
            PUT_DATA(`/GpiFile/${e.data.id}`, formData, true, () => {
                GET_DATA(
                    this,
                    `/GpiFile/get-gpi-file-by-id?id=${this.id_record}`,
                    "library"
                );
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
                console.log("save");
                this.UPDATE_DOC(this.dataFileTemp);
            }
        },
        DOWNLOAD(p, n) {
            console.log(this.baseURL + p);
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
            DELETE_DATA(`/GpiFile/${id}`, () => {
                GET_DATA(
                    this,
                    `/GpiFile/get-gpi-file-by-id?id=${this.id_record}`,
                    "library"
                );
            });
        },
        ADD_ROW() {
            var grid = this.$refs[this.gridRefName].instance;
            grid.addRow();
            grid.deselectAll();
        },
        INSERT_ITEM_SELECT_BOX(data, array) {
            if (!data.text) {
                data.customItem = null;
                return;
            }

            const newItem = {
                id:
                    array.length > 0
                        ? Math.max(...array.map((item) => item.id)) + 1
                        : 1, // Generate a unique ID
                code: data.text,
                asset_type: data.text,
            };

            const productsDataSource = new DataSource({
                store: {
                    data: array,
                    type: "array",
                    key: "ID",
                },
            });

            data.customItem = productsDataSource
                .store()
                .insert(newItem)
                .then(() => productsDataSource.load())
                .then(() => newItem)
                .catch((error) => {
                    throw error;
                });
        },
        SUBMIT_GPI_RECORD() {
            if (this.userList.length > 1) {
                let pin = String(this.selectedUser.pin.box1) + String(this.selectedUser.pin.box2) + String(this.selectedUser.pin.box3) + String(this.selectedUser.pin.box4)
                let userPin = this.user.UserInfoes.filter(e => e.id === this.selectedUser.id_user_info)[0].pin
                if (pin !== userPin) {
                    this.$ons.notification.alert("Pin is incorrect!");
                    return;
                }
            }
            POST_DATA(
                `/GpiRecordTXN/add-submit-txn?id_user=${this.user.id}&id_gpi=${this.id_record}&id_user_info=${this.selectedUser.id_user_info}`,
                {},
                () => {
                    this.submitGpiRecord = false;
                    this.REFRESH_DATA();
                }
            );
        },
        APPROVE_GPI_RECORD() {
            if (this.userList.length > 1) {
                let pin = String(this.selectedUser.pin.box1) + String(this.selectedUser.pin.box2) + String(this.selectedUser.pin.box3) + String(this.selectedUser.pin.box4)
                let userPin = this.user.UserInfoes.filter(e => e.id === this.selectedUser.id_user_info)[0].pin
                if (pin !== userPin) {
                    this.$ons.notification.alert("Pin is incorrect!");
                    return;
                }
            }
            POST_DATA(
                `/GpiRecordTXN/add-appr-txn?id_user=${this.user.id}&id_gpi=${this.id_record}&id_user_info=${this.selectedUser.id_user_info}`,
                {},
                () => {
                    this.approveGpiRecord = false;
                    this.REFRESH_DATA();
                }
            );
        },
        REJECT_GPI_RECORD() {
            POST_DATA(
                `/GpiRecordTXN/add-reject-txn?id_user=${this.user.id}&id_gpi=${this.id_record}&remark=${this.rejectGpiRemark}`,
                {},
                () => {
                    this.rejectGpiRecord = false;
                    this.REFRESH_DATA();
                }
            );
        },
        REFRESH_DATA() {
            this.approveGpiRecordWithSap = false
            GET_DATA(this, `/GpiRecord/${this.id_record}`, "gpiRecordList", (data) => {
                const resultArray = []
                for (const [key, value] of Object.entries(data)) {
                    resultArray.push({key: key, value: value});
                }
                this.gpiRecordList = resultArray[0].value;
            });
            GET_DATA(
                this,
                `/GpiRecordTXN/get-last-gpi-record-txn-by-id-gpi?id_gpi=${this.id_record}`,
                "recordLastTXN",
                (data) => {
                    this.currentStatusTXN = data.id_status;
                    this.currentUserTXN = data.id_user;
                    this.btn_state = false;
                }
            );
        }
    },
};
</script>

<style
    lang="scss"
    scoped
>
@import "@/style/main.scss";

.page-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 0px calc(100vh - 95px);
    transition: all 0.3s;
}

.page-section {
    padding: 0px 20px 20px 20px;
    overflow-y: auto;
    height: calc(100vh - 270px);
    grid-row: span 2;
}

.table-wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 15px;
    margin: 20px;

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

        .title-wrapper {
            display: flex;
            align-items: center;
            gap: 5px;

            span:last-child {
                color: red;
            }
        }
    }

    .picture-wrapper {
        span {
            font-size: 16px;
        }

        img {
            width: 100%;
        }
    }
}

.action-wrapper {
    width: 100%;
    gap: 20px;
    margin-bottom: 10px;

    button {
        color: white;
        border-radius: 5px;
        width: 100px;
        padding: 10px;
        border: solid 1px gray;
        font-weight: 600;
        font-size: 12px;
        transition: 1s;
        cursor: pointer;
    }

    .submit {
        background-color: $dexon-primary-green;
        border-color: $dexon-primary-green;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .delete {
        background-color: $dexon-primary-red;
        border-color: $dexon-primary-red;
        display: flex;
        justify-content: center;
        align-items: center;
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

.popup {
    .select-wrapper {
        
        span {
            font-size: 14px;
        }
        .select {
            
        }
    }
    .input-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        width: 200px;
        span {
            font-size: 14px;
        }
        .inputs {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 5px;
        }
    }
}
</style>
