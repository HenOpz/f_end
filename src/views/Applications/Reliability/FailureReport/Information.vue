<template>
    <div class="page-container">
        <div class="page-section">
            <div class="action-bar">
                <button class="back" @click="SET_CURRENT_VIEW(0)">
                    <i class="fas fa-chevron-left"></i> BACK
                </button>
                <div class="wrapper">
                    <button 
                        class="submit"
                        @click="submitFailureRecord = true"
                        v-if="this.currentStatusTXN == 5 && this.user.id == this.currentUserTXN"
                    >
                        SUBMIT
                    </button>
                    <button 
                        class="submit"
                        @click="approveFailureRecord = true"
                        v-if="this.currentStatusTXN == 2 && this.user.id == this.currentUserTXN"
                    >
                        APPROVE
                    </button>
                    <button 
                        class="delete"
                        @click="rejectFailureRecord = true"
                        v-if="this.currentStatusTXN == 2 && this.user.id == this.currentUserTXN"
                    >
                        REJECT
                    </button>
                </div>
            </div>
            <div class="table-wrapper"> 
                <div id="pdfPreview"></div>
                <RiskMatrix pdf style="position: absolute; left: -9999px; top: -9999px;" />
            </div>
        </div>
        <div
            v-if="submitFailureRecord"
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
                        @click="SUBMIT_FAILURE_RECORD"
                    >
                        SUBMIT
                    </button>
                    <button
                        class="cancel"
                        @click="submitFailureRecord = false"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>

        <div
            v-if="approveFailureRecord"
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
                        @click="APPROVE_FAILURE_RECORD"
                    >
                        APPROVE
                    </button>
                    <button
                        class="cancel"
                        @click="approveFailureRecord = false"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>

        <div
            v-if="rejectFailureRecord"
            class="confirm-popup-backdrop"
        >
            <div class="popup">
                <h4>Are You Sure?</h4>
                <p style="margin-bottom: 10px;">Are you sure you want to reject this report? Please enter the remark of the reject report.</p>
                <DxTextArea
                    placeholder="Enter Remark"
                    v-model="rejectFailureRemark"
                    style="margin-bottom: 15px;"
                />
                <div class="actions">
                    <button
                        class="reject"
                        @click="REJECT_FAILURE_RECORD"
                    >
                        REJECT
                    </button>
                    <button
                        class="cancel"
                        @click="rejectFailureRecord = false"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
        <contentLoading text="Loading, please wait..." v-if="isReportLoading == true" color="#fc9b21" />
    </div>
</template>

<script>
import { axios, GET_DATA, POST_DATA } from "/axios.js";
import moment from "moment";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import html2canvas from 'html2canvas';
import RiskMatrix from "./RiskMatrix.vue"
import contentLoading from "@/components/app-structures/app-content-loading.vue";

import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import DxTextArea from "devextreme-vue/text-area";

export default {
    name: "failure-report",
    props: {
        data_row: Object,
    },
    components: {
        RiskMatrix,
        contentLoading,
        DxSelectBox,
        DxTextBox,
        DxTextArea
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "FR NUMBER: " + this.data_row.fl_number,
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.FETCH_DISC();
            this.FETCH_IMPACT();
            this.FETCH_PLATFORM();
            this.FETCH_LIBRARY();
            GET_DATA(this, '/User/get-user-list', 'userListAll'); 
            GET_DATA(this, '/Md/get-md-failure-risk-matrix-list', 'riskMatrixList'); 
            GET_DATA(this, '/Md/get-md-failure-cof-list', 'cofList'); 
            GET_DATA(this, '/Md/get-md-failure-pof-list', 'pofList'); 
            this.FETCH_FAILURE_RECORD();
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            GET_DATA(this, `FailureRecordTXN/get-last-failure-record-txn-by-id-failure?id_failure=${this.id_record}`, 'recordLastTXN', (data) => { 
                this.currentStatusTXN = data.id_status;
                this.currentUserTXN = data.id_user;
            });
            this.user = JSON.parse(localStorage.getItem("user"));
            GET_DATA(this, `/User/get-user-info-by-id-user?id=${this.user.id}`, (data) => {
                this.userList = data.map(e => {
                    return {id: e.id, code: e.name}
                })
                if (this.userList.length === 1) this.selectedUser.id_user_info = this.userList[0].id;
            });
        }
    },
    data() {
        return {
            failureRecordList: {},
            appData: [],
            shortTermRecordList: [],
            longTermRecordList: [],
            shortTermLength: 2,
            longTermLength: 2,
            userList: [],
            userListAll: [],
            riskMatrixList: [],
            cofList: [],
            pofList: [],
            selectedUser: {
                id_user_info: 0,
                pin: {
                    box1: null,
                    box2: null,
                    box3: null,
                    box4: null
                }
            },
            export_status: {
                active: false,
                cur: 0,
                max: 0,
            },
            library: [],
            platform: [],
            disc: [],
            impact: [],
            id_record: this.data_row.id,
            base64ImageUrl: '',
            isReportLoading: false,
            submitFailureRecord: false,
            approveFailureRecord: false,
            rejectFailureRecord: false,
            rejectFailureRemark: "",
            recordLastTXN: [],
            currentStatusTXN: null,
            currentUserTXN: null,
            user: null,
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
        REFRESH_DATA() {
            GET_DATA(this, `/FailureRecord/${this.id_record}`, "failureRecordList",
                (data) => {
                    this.failureRecordList = data.data;
                    this.appData = data.app_data;
                    this.FETCH_SHORT_TERM_RECORD();
                    this.FETCH_LONG_TERM_RECORD();
                }
            );
            GET_DATA(
                this,
                `/FailureRecordTXN/get-last-failure-record-txn-by-id-failure?id_failure=${this.id_record}`,
                "recordLastTXN",
                (data) => {
                    this.currentStatusTXN = data.id_status;
                    this.currentUserTXN = data.id_user;
                }
            );
        },
        SUBMIT_FAILURE_RECORD() {
            if (this.userList.length > 1) {
                let pin = String(this.selectedUser.pin.box1) + String(this.selectedUser.pin.box2) + String(this.selectedUser.pin.box3) + String(this.selectedUser.pin.box4)
                let userPin = this.user.UserInfoes.filter(e => e.id === this.selectedUser.id_user_info)[0].pin
                if (pin !== userPin) {
                    this.$ons.notification.alert("Pin is incorrect!");
                    return;
                }
            }
            
            POST_DATA(
                `/FailureRecordTXN/add-submit-txn?id_user=${this.user.id}&id_failure=${this.id_record}&id_user_info=${this.selectedUser.id_user_info}`,
                {},
                () => {
                    this.submitFailureRecord = false;
                    this.REFRESH_DATA();
                }
            );
        },
        APPROVE_FAILURE_RECORD() {
            if (this.userList.length > 1) {
                let pin = String(this.selectedUser.pin.box1) + String(this.selectedUser.pin.box2) + String(this.selectedUser.pin.box3) + String(this.selectedUser.pin.box4)
                let userPin = this.user.UserInfoes.filter(e => e.id === this.selectedUser.id_user_info)[0].pin
                if (pin !== userPin) {
                    this.$ons.notification.alert("Pin is incorrect!");
                    return;
                }
            }
            POST_DATA(
                `/FailureRecordTXN/add-appr-txn?id_user=${this.user.id}&id_failure=${this.id_record}&id_user_info=${this.selectedUser.id_user_info}`,
                {},
                () => {
                    this.approveFailureRecord = false;
                    this.REFRESH_DATA();
                }
            );
        },
        REJECT_FAILURE_RECORD() {
            POST_DATA(
                `/FailureRecordTXN/add-reject-txn?id_user=${this.user.id}&id_failure=${this.id_record}&remark=${this.rejectFailureRemark}`,
                {},
                () => {
                    this.rejectFailureRecord = false;
                    this.REFRESH_DATA();
                }
            );
        },
        async FETCH_FAILURE_RECORD() {
            GET_DATA(this, `/FailureRecord/${this.id_record}`, async (data) => {
                this.failureRecordList = data.data;
                this.appData = data.app_data;
                this.FETCH_SHORT_TERM_RECORD();
                this.FETCH_LONG_TERM_RECORD();
                this.isReportLoading = true;
                await this.generatePDF();
                this.isReportLoading = false;
                // this.$nextTick(function () {
                //     window.setTimeout(async () => {
                //         this.generatePDF();
                //     },1500);
                // })
            });
        },
        FETCH_SHORT_TERM_RECORD() {
            axios({
                method: "get",
                url:
                    "/FailureActionRecord/get-failure-action-record-short-term-by-id?id_failure=" + this.failureRecordList.id,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.shortTermRecordList = res.data;
                        this.shortTermLength = this.shortTermRecordList.length + 1;
                        // console.log("shortTermRecordList", this.shortTermRecordList);
                    }
                })
                .catch(error => {
                    console.log(error);
                    if(error.response.data.message == 'NoActionRecorded') {
                        this.shortTermLength = 2;
                    }
                })
                .finally(() => {
                    // this.isLoading = false;
                });
        },
        FETCH_LONG_TERM_RECORD() {
            axios({
                method: "get",
                url:
                    "/FailureActionRecord/get-failure-action-record-long-term-by-id?id_failure=" + this.failureRecordList.id,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.longTermRecordList = res.data;
                        this.longTermLength = this.longTermRecordList.length + 1;
                        // console.log("longTermRecordList", this.longTermRecordList);
                    }
                })
                .catch(error => {
                    console.log(error);
                    if(error.response.data.message == 'NoActionRecorded') {
                        this.longTermLength = 2;
                    }
                })
                .finally(() => {
                    // this.isLoading = false;
                });
        },
        FETCH_LIBRARY() {
            GET_DATA(this, `/FailureFile/get-failure-file-by-id?id=${this.id_record}`, 'library');
        },
        FETCH_PLATFORM() {
            GET_DATA(this, '/Md/get-md-platform-list', 'platform');
        },
        FETCH_DISC() {
            GET_DATA(this, '/Md/get-md-failure-discipline-list', 'disc');
        },
        FETCH_IMPACT() {
            GET_DATA(this, '/Md/get-md-failure-impact-list', 'impact');
        },
        DATE_FORMAT(d) {
            return moment(d).format("DD MMM yyyy");
        },
        SET_CURRENT_VIEW(view, data = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", true);
            if (data !== null) this.$emit('currentView', view, data);
            else this.$emit('currentView', view);
        },
        convertImageToBase64(url) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'Anonymous';

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    const dataURL = canvas.toDataURL('image/png');
                    resolve(dataURL);
                };

                img.onerror = (e) => {
                    reject(e);
                };

                img.src = url;
            });
        },
        async convert(url) {
            try {
                this.error = null;
                this.base64ImageUrl = await this.convertImageToBase64(url);
            } catch (e) {
                this.error = e;
                console.error('Failed to convert image:', e);
            }
        },
        headerTable() {
            return {
                widths: [85.5, '*', 37.5, 80],
                body: [
                    [
                        { rowSpan: 4, image: 'logo', width: 60, height: 50, alignment: 'center', margin: [0, 0, 0, 0] },
                        { rowSpan: 4, text: 'FAILURE REPORT', style: 'headerTitle', alignment: 'center' , margin: [0, 20, 0, 0] },
                        { text: 'No:', style: 'cellLeft' },
                        { text: this.failureRecordList ? this.failureRecordList.fl_number : '-', style: 'headerCellRight' }
                    ],
                    [
                        '',
                        '',
                        { text: 'Date:', style: 'cellLeft' }, 
                        { text: this.failureRecordList ? this.DATE_FORMAT(this.failureRecordList.findings_date) : '-', style: 'headerCellRight' } 
                    ],
                    [
                        '',
                        '',
                        { text: 'Discipline:', style: 'cellLeft' }, 
                        { text: this.failureRecordList ? this.GET_DISC(this.failureRecordList?.id_discipline) : '-', style: 'headerCellRight' } 
                    ],
                    [
                        '',
                        '',
                        { text: 'Originator:', style: 'cellLeft' }, 
                        { text: this.failureRecordList ? this.GET_ORIGINATOR(this.failureRecordList.created_by) : '-', style: 'headerCellRight' } 
                    ],

                ]
            }
        },
        subHeaderTable() {
            if (this.failureRecordList === undefined) return {};
            return {
                widths: [60, '*', 60, '*', 60, '*'],
                border: [true, false, true, true],
                body: [
                    [
                        { text: 'Tag No:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.failureRecordList?.tag_no, border: [true, false, true, true] },
                        { text: 'Location:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.GET_PLATFORM(this.failureRecordList?.id_platform), border: [true, false, true, true] },
                        { text: 'Failure Impact:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.GET_IMPACT(this.failureRecordList?.id_failure_impact), border: [true, false, true, true] }
                    ],
                    [
                        { text: 'Drawing No:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.failureRecordList?.drawing_no, border: [true, false, true, true] },
                        { text: 'Unit:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.failureRecordList?.unit, border: [true, false, true, true] },
                        { text: 'Equipment Type:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.failureRecordList?.equipment_type, border: [true, false, true, true] }
                    ],
                    [
                        { text: 'Findings Date:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.DATE_FORMAT(this.failureRecordList?.findings_date), border: [true, false, true, true] },
                        { text: 'Risk Level', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.failureRecordList?.id_risk ? this.GET_RISK_MATRIX(this.failureRecordList?.id_risk).risk_level : '-', border: [true, false, true, true], fillColor: this.failureRecordList?.id_risk ? this.GET_RISK_MATRIX(this.failureRecordList?.id_risk).color_code : '#FFFFFF' },
                        { text: 'RCFA Required', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.failureRecordList?.is_rcfa, border: [true, false, true, true] }
                    ],
                ]
            }
        },
        async generatePictures() {
            if (this.library.length === 0) return;

            let pictures = []
            for (const element of this.library) {
                await this.convert(this.baseURL + element.file_path);

                pictures.push(
                    [
                        {
                            style: 'header',
                            pageBreak: 'before',
                            table: this.headerTable()
                        },
                        {
                            border: [true, false, true, true],
                            table: this.subHeaderTable()
                        },
                        { 
                            image: this.base64ImageUrl, 
                            width: 515, 
                            alignment: 'center', 
                            border: [true, false, true, true] 
                        }
                    ]
                )

                this.base64ImageUrl = '';
            }
            
            return pictures;
        },
        async generatePDF() {
            const shortTermData = () => {
                let data = [
                    [
                        { rowSpan: this.shortTermLength, text: 'Short-Term', style: 'cellSubTitle', border: [true, false, true, true], margin: [0, this.shortTermLength * 4.5, 0, 0] },
                        { text: 'Action No', style: 'cellSubTitle', border: [true, false, true, true] },
                        { text: 'Action Detail', style: 'cellSubTitle', border: [true, false, true, true] },
                        { text: 'Discipline', style: 'cellSubTitle', border: [true, false, true, true] },
                        { text: 'Due Date', style: 'cellSubTitle', border: [true, false, true, true] }
                    ]
                ];               

                this.shortTermRecordList.forEach(element => {
                    data.push([
                        '',
                        { text: element.fa_number, border: [true, false, true, true] },
                        { text: element.action_details, border: [true, false, true, true] },
                        { text: this.GET_DISC(element.id_discipline), border: [true, false, true, true], alignment: 'center' },
                        { text: this.DATE_FORMAT(element.action_date), border: [true, false, true, true], alignment: 'center' }
                    ])
                })

                if (this.shortTermRecordList.length === 0) {
                    data.push([
                        '',
                        { text: '-', border: [true, false, true, true] },
                        { text: '-', border: [true, false, true, true] },
                        { text: '-', border: [true, false, true, true] },
                        { text: '-', border: [true, false, true, true] }
                    ])
                }
                
                //console.warn(data);
                
                return data;
            }

            const longTermData = () => {
                let data = [
                    [
                        { rowSpan: this.longTermLength, text: 'Long-Term', style: 'cellSubTitle', border: [true, false, true, true], margin: [0, this.longTermLength * 4.5, 0, 0] },
                        { text: 'Action No', style: 'cellSubTitle', border: [true, false, true, true] },
                        { text: 'Action Detail', style: 'cellSubTitle', border: [true, false, true, true] },
                        { text: 'Discipline', style: 'cellSubTitle', border: [true, false, true, true] },
                        { text: 'Due Date', style: 'cellSubTitle', border: [true, false, true, true] }
                    ]
                ];

                this.longTermRecordList.forEach(element => {
                    data.push([
                        '',
                        { text: element.fa_number, border: [true, false, true, true] },
                        { text: element.action_details, border: [true, false, true, true] },
                        { text: this.GET_DISC(element.id_discipline), border: [true, false, true, true], alignment: 'center' },
                        { text: this.DATE_FORMAT(element.action_date), border: [true, false, true, true], alignment: 'center' }
                    ])
                })

                if (this.longTermRecordList.length === 0) {
                    data.push([
                        '',
                        { text: '-', border: [true, false, true, true] },
                        { text: '-', border: [true, false, true, true] },
                        { text: '-', border: [true, false, true, true] },
                        { text: '-', border: [true, false, true, true] }
                    ])
                }

                //console.warn(data);

                return data;
            }

            const signatureImage = async () => {
                let pictureRow = []
                for (let index = 0; index < 3; index++) {
                    const element = this.appData[index];
                    if (element && element.signature) {
                        await this.convert(this.baseURL + element.signature);
                        pictureRow.push([{ image: this.base64ImageUrl, width: 100, height: 30, alignment: 'center', border: [false, false, false, false] }])
                        this.base64ImageUrl = '';
                    }
                    else pictureRow.push([{ text: '', border: [true, false, true, false] }])
                }
                return pictureRow;
            }

            const riskMatrix = document.getElementById('risk-matrix');
            const canvas = await html2canvas(riskMatrix);
            const imgData = canvas.toDataURL('image/png');
            console.log(imgData);

            const docDefinition = {
                info: {
                    title: this.failureRecordList.fl_number || ''
                },
                content: [
                    {
                        style: 'header',
                        table: this.headerTable(),
                        layout: {
                            vLineWidth: function (i) {
                                return (i === 3) ? 0 : 1;
                            },
                        }
                    },
                    {
                        border: [true, false, true, true],
                        table: this.subHeaderTable(),
                        layout: {
                            vLineWidth: function (i) {
                                return (i === 1 || i === 3 || i === 5) ? 0 : 1;
                            },
                        }
                    },
                    {
                        table: {
                            widths: '*',
                            body: [[{ text: 'FAILURE DESCRIPTION', style: 'cellTitle', border: [true, false, true, true], }]]
                        },
                    },
                    {
                        table: {
                            widths: [85.5, '*'],
                            body: [[
                                { text: 'Details:', style: 'cellLeft', border: [true, false, true, true] },
                                {
                                    text: this.failureRecordList.details,
                                    border: [true, false, true, true]
                                }
                            ]]
                        },
                        layout: {
                            vLineWidth: function (i) {
                                return (i === 1) ? 0 : 1;
                            },
                        }
                    },
                    {
                        table: {
                            widths: [85.5, '*'],
                            body: [[
                                { text: 'Findings:', style: 'cellLeft', border: [true, false, true, true] },
                                {
                                    text: this.failureRecordList.findings,
                                    border: [true, false, true, true]
                                }
                            ]]
                        },
                        layout: {
                            vLineWidth: function (i) {
                                return (i === 1) ? 0 : 1;
                            },
                        }
                    },
                    {
                        table: {
                            widths: [85.5, '*'],
                            body: [[
                                { text: 'Mitigation:', style: 'cellLeft', border: [true, false, true, true] },
                                {
                                    text: this.failureRecordList.mitigation,
                                    border: [true, false, true, true]
                                }
                            ]]
                        },
                        layout: {
                            vLineWidth: function (i) {
                                return (i === 1) ? 0 : 1;
                            },
                        }
                    },
                    {
                        table: {
                            widths: '*',
                            body: [[{ text: 'FAILURE RISK', style: 'cellTitle', border: [true, false, true, true], }]]
                        },
                    },
                    {
                        table: {
                            widths: [85.5, 85.5, '*'],
                            body: [
                                [
                                    { text: 'Probability of Failure:', style: 'cellLeft', border: [true, false, true, true] },
                                    { text: this.GET_POF(this.failureRecordList.id_pof), border: [true, false, true, true] },
                                    { text: this.failureRecordList.note_pof, border: [true, false, true, true] }
                                ],
                                [
                                    { text: 'COF-People:', style: 'cellLeft', border: [true, false, true, true] },
                                    { text: this.GET_COF(this.failureRecordList.id_cof_people), border: [true, false, true, true] },
                                    { text: this.failureRecordList.note_cof_people, border: [true, false, true, true] }
                                ],
                                [
                                    { text: 'COF-Environment:', style: 'cellLeft', border: [true, false, true, true] },
                                    { text: this.GET_COF(this.failureRecordList.id_cof_environment), border: [true, false, true, true] },
                                    { text: this.failureRecordList.note_cof_environment, border: [true, false, true, true] }
                                ],
                                [
                                    { text: 'COF-Production Loss:', style: 'cellLeft', border: [true, false, true, true] },
                                    { text: this.GET_COF(this.failureRecordList.id_cof_production_loss), border: [true, false, true, true] },
                                    { text: this.failureRecordList.note_cof_production_loss, border: [true, false, true, true] }
                                ],
                                [
                                    { text: 'COF-Reputation:', style: 'cellLeft', border: [true, false, true, true] },
                                    { text: this.GET_COF(this.failureRecordList.id_cof_reputation), border: [true, false, true, true] },
                                    { text: this.failureRecordList.note_cof_reputation, border: [true, false, true, true] }
                                ]
                            ]
                        }
                    },
                    {
                        table: {
                            widths: '*',
                            body: [[{ text: 'REMEDIAL ACTION', style: 'cellTitle', border: [true, false, true, true], }]]
                        }
                    },
                    {
                        table: {
                            widths: [50, 68, '*', 50, 50],
                            body: shortTermData()
                        }
                    },
                    {
                        table: {
                            widths: [50, 68, '*', 50, 50],
                            body: longTermData()
                        }
                    },
                    {
                        table: {
                            widths: '*',
                            body: [
                                [{ text: 'REMARK', style: 'cellTitle', border: [true, false, true, true] }],
                                [{ text: this.failureRecordList.remark ? this.failureRecordList.material_cost : '-', border: [true, false, true, true] }]
                            ]
                        }
                    },
                    {
                        table: {
                            widths: ['*', '*', '*'],
                            body: [
                                [
                                    { text: 'ACKNOWLEDGMENT', style: 'cellTitle', border: [true, false, true, true], colSpan: 3 },
                                    '',
                                    ''
                                ],
                                [
                                    { text: this.failureRecordList.id_work_group === 1 ? 'Engineer' : 'Team Leader', border: [true, false, true, true], bold: true, alignment: 'center' },
                                    { text: this.failureRecordList.id_work_group === 1 ? 'Section Leader' : 'Maintenance/Operation Supervisor', border: [true, false, true, true], bold: true, alignment: 'center' },
                                    { text: this.failureRecordList.id_work_group === 1 ? 'DPO' : 'OIM', border: [true, false, true, true], bold: true, alignment: 'center' }
                                ],
                                await signatureImage(),
                                [
                                    { text: this.appData[0] ? this.appData[0].name : '', border: [true, false, true, false], alignment: 'center' },
                                    { text: this.appData[1] ? this.appData[1].name : '', border: [true, false, true, false], alignment: 'center' },
                                    { text: this.appData[2] ? this.appData[2].name : '', border: [true, false, true, false], alignment: 'center' }
                                ],
                                
                                [
                                    { text: this.appData[0] ? moment(this.appData[0].txn_datetime).format("DD MMM yyyy") : '', border: [true, false, true, true], alignment: 'center' },
                                    { text: this.appData[1] ? moment(this.appData[1].txn_datetime).format("DD MMM yyyy") : '', border: [true, false, true, true], alignment: 'center' },
                                    { text: this.appData[2] ? moment(this.appData[2].txn_datetime).format("DD MMM yyyy") : '', border: [true, false, true, true], alignment: 'center' }
                                ],
                                [
                                    { text: 'CMMS Input by:', style: 'cellLeft', border: [true, false, true, true] },
                                    { text: 'Date:', style: 'cellLeft', border: [true, false, true, true] },
                                    { text: '', style: 'cellLeft', border: [true, false, true, true] }
                                ]
                            ]
                        },
                        layout: {
                            hLineWidth: function (i) {
                                return (i === 3 || i === 4 ) ? 0 : 1;
                            },
                        }
                    },
                    await this.generatePictures(),
                ],
                pageBreakBefore: function(currentNode) {
                    
                    if(
                        (currentNode.startPosition.top > 800 && currentNode.text == 'REMEDIAL ACTION') || 
                        (currentNode.startPosition.top > 700 && currentNode.text == 'REMARK') ||
                        (currentNode.startPosition.top > 700 && currentNode.text == 'ACKNOWLEDGMENT')
                    ) {
                        console.warn(currentNode.text);
                        currentNode.startPosition.pageNumber = 2;
                        return true;
                    }
                    //return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
                },
                styles: {
                    header: {
                        // margin: [0, -30, 0, 0],
                    },
                    headerTitle: {
                        fontSize: 14,
                        bold: true
                    },
                    cellLeft: {
                        fillColor: '#d3d3d3',
                    },
                    cellRight: {},
                    cellTitle: {
                        fontSize: 10,
                        bold: true,
                        fillColor: '#d3d3d3',
                        alignment: 'center',
                    },
                    cellSubTitle: {
                        fontSize: 8,
                        fillColor: '#d3d3d3',
                        alignment: 'center',
                    }
                },
                defaultStyle: {
                    fontSize: 8,
                },

                images: {
                    logo: this.baseURL + 'wwwroot/assets/cpoc_logo_new.png'
                }
            };
            //pdfMake.createPdf(docDefinition).open();
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);

            // Convert the PDF to a data URL
            pdfDocGenerator.getDataUrl((dataUrl) => {

                // Split the data URL to get the base64 data
                const [metadata, base64Data] = dataUrl.split(',');

                // Decode the base64 string to a binary string
                const binaryString = atob(base64Data);

                // Create an array of bytes
                const byteArray = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    byteArray[i] = binaryString.charCodeAt(i);
                }

                // Extract the mime type from the metadata
                const mimeType = metadata.split(':')[1].split(';')[0];
                const b = new Blob([byteArray], { type: mimeType });
                const c = URL.createObjectURL(b)
                // console.log(c);

                const embed = document.createElement('embed');
                embed.src = c;
                embed.type = 'application/pdf';
                embed.width = '100%';
                embed.height = '600px';

                // Append the embedded object to the preview container
                document.getElementById('pdfPreview').appendChild(embed);
            });
        },
        GET_ORIGINATOR(id) {
            const user = this.userListAll.filter(p => p.id == id);
            if (user.length > 0) return user[0].name;
            else return ''
        },
        GET_PLATFORM(id) {
            const platform = this.platform.filter(p => p.id == id);
            return platform[0].code_name;
        },
        GET_IMPACT(id) {
            const impact = this.impact.filter(i => i.id == id);
            return impact[0].status;
        },
        GET_DISC(id) {
            const disc = this.disc.filter(d => d.id == id);
            return disc[0]?.discipline ? disc[0].discipline : '-';
        },
        GET_RISK_MATRIX(id) {
            const data = this.riskMatrixList.filter(d => d.id == id);
            return data[0] || '-';
        },
        GET_COF(id) {
            const data = this.cofList.filter(d => d.id == id);
            return data[0]?.category ? data[0].category : '-';
        },
        GET_POF(id) {
            const data = this.pofList.filter(d => d.id == id);
            return data[0]?.category ? data[0].category : '-';
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
    grid-template-columns: 100%;
    gap: 15px;
    margin: 0px 20px;

    *[fill] {
        grid-column: span 2;
    }

    .input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 6px;

        span {
            font-size: 16px;
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