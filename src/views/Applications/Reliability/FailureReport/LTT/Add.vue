<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h4 style="">New Long Term Tracking</h4>
                <div class="scroll">
                    <div
                        class="input-wrapper"
                        fill
                    >
                        <span>Action Details</span>
                        <div class="input">
                            <DxTextBox
                                placeholder="Enter Action Details"
                                v-model="failureActionRecordList.action_details"
                            />
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <span>Discipline</span>
                        <div class="select">
                            <DxSelectBox
                                :items="formSelect.mainWorkCtr"
                                value-expr="id"
                                display-expr="code"
                                placeholder="Select Discipline"
                                v-model="failureActionRecordList.id_discipline"
                                :search-enabled="true"
                            />
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <span>Action Date</span>
                        <div class="select">
                            <DxDateBox
                                type="date"
                                placeholder="Select Action Date"
                                v-model="failureActionRecordList.action_date"
                                display-format="dd MMM yyyy"
                            />
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <span>Failure Action Status</span>
                        <div class="select">
                            <DxSelectBox
                                :items="formSelect.failureactionStatus"
                                value-expr="id"
                                display-expr="status"
                                placeholder="Select Failure Action Status"
                                v-model="
                                    failureActionRecordList.id_failure_action_status
                                "
                                :search-enabled="true"
                            />
                        </div>
                    </div>
                    <h4 style="grid-column: span 4">SAP Notification Header</h4>
                    <div class="input-wrapper">
                        <span>WO Order No.</span>
                        <div class="select">
                            <DxTextBox
                                placeholder="Generate by SAP"
                                v-model="sapHeader.wo_order_no"
                                :disabled="true"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Notification Type</span>
                        <div class="select">
                            <DxTextBox
                                placeholder="Enter Notification Type"
                                v-model="sapHeader.notification_type"
                                :disabled="true"
                            />
                        </div>
                    </div>

                    <div
                        class="input-wrapper"
                        style="grid-column: span 2"
                    >
                        <span>Description</span>
                        <div class="select">
                            <DxTextBox
                                placeholder="Description (Maximum 40 characters)"
                                v-model="sapHeader.description"
                                max-length="40"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Functional Location</span>
                        <div class="select">
                            <DxSelectBox
                                :items="formSelect.functionalLocation"
                                value-expr="functional_location"
                                display-expr="functional_location"
                                placeholder="Select Functional Location"
                                v-model="sapHeader.functional_location"
                                :search-enabled="true"
                            />
                        </div>
                    </div>

                    <!-- <div class="input-wrapper">
            <span>Equipment No.</span>
            <div class="select">
              <DxTextBox
                placeholder="Blank"
                v-model="sapHeader.equipment_no"
                :disabled="true"
              />
            </div>
          </div> -->

                    <div class="input-wrapper">
                        <span>Main WorkCtr</span>
                        <div class="select">
                            <DxSelectBox
                                :items="formSelect.mainWorkCtr"
                                value-expr="code"
                                display-expr="code"
                                placeholder="Select Main WorkCtr"
                                v-model="sapHeader.main_workctr"
                                :search-enabled="true"
                                @value-changed="ON_MAIN_WORKCTR_CHANGED"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Planner Grp</span>
                        <div class="select">
                            <DxSelectBox
                                :items="formSelect.plannerGrp"
                                value-expr="code"
                                display-expr="code"
                                placeholder="Select Planner Grp"
                                v-model="sapHeader.planner_grp"
                                :search-enabled="true"
                                :disabled="true"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Planner Grp Planning Plant</span>
                        <div class="select">
                            <DxSelectBox
                                :items="formSelect.plannerGrpPlanning"
                                value-expr="code"
                                display-expr="code"
                                placeholder="Select Planner Grp Planning Plant"
                                v-model="sapHeader.planner_grp_planning_plant"
                                :search-enabled="true"
                                :disabled="true"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Code Grp Object Part</span>
                        <div class="select">
                            <DxSelectBox
                                :items="formSelect.codegrpObjectpart"
                                value-expr="object_part_code"
                                display-expr="object_part_code"
                                placeholder="Select Code Grp Object Part"
                                v-model="sapHeader.code_grp_object_part"
                                :search-enabled="true"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Object Part Code</span>
                        <div class="select">
                            <DxSelectBox
                                :items="formSelect.objectpartCode"
                                value-expr="object_part_code"
                                display-expr="ddl"
                                placeholder="Select Object Part Code"
                                v-model="sapHeader.object_part_code"
                                :search-enabled="true"
                            />
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <span>Code Grp Damage</span>
                        <div class="select">
                            <DxSelectBox
                                :items="formSelect.codegrpDamage"
                                value-expr="code"
                                display-expr="code"
                                placeholder="Select Code Grp Damage"
                                v-model="sapHeader.code_grp_damage"
                                :search-enabled="true"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Damage Code</span>
                        <div class="select">
                            <DxSelectBox
                                :items="formSelect.damageCode"
                                value-expr="damage_code"
                                display-expr="ddl"
                                placeholder="Select Damage Code"
                                v-model="sapHeader.damage_code"
                                :search-enabled="true"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Damage Free Text</span>
                        <div class="select">
                            <DxTextBox
                                placeholder="Enter Damage Free text"
                                v-model="sapHeader.damage_free_text"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Code Grp Cause</span>
                        <div class="select">
                            <DxSelectBox
                                :items="formSelect.codegrpCause"
                                value-expr="cause_code"
                                display-expr="cause_code"
                                placeholder="Select Code Grp Cause"
                                v-model="sapHeader.code_grp_cause"
                                :search-enabled="true"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Cause Code</span>
                        <div class="select">
                            <DxSelectBox
                                :items="formSelect.causeCode"
                                value-expr="cause_code"
                                display-expr="ddl"
                                placeholder="Select Cause Code"
                                v-model="sapHeader.cause_code"
                                :search-enabled="true"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Cause Grp Free Text</span>
                        <div class="select">
                            <DxTextBox
                                placeholder="Enter Cause Grp Free Text"
                                v-model="sapHeader.cause_grp_free_text"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Required Start Date</span>
                        <div class="select">
                            <DxDateBox
                                type="date"
                                placeholder="Select Required Start Date"
                                v-model="sapHeader.required_start_date"
                                display-format="dd MMM yyyy"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Required Start Time</span>
                        <div class="select">
                            <DxDateBox
                                type="time"
                                placeholder="Select Required Start Time"
                                v-model="sapHeader.required_start_time"
                                display-format="HH:mm"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Required End Date</span>
                        <div class="select">
                            <DxDateBox
                                type="date"
                                placeholder="Select Required End date"
                                v-model="sapHeader.required_end_date"
                                display-format="dd MMM yyyy"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Required End Time</span>
                        <div class="select">
                            <DxDateBox
                                type="time"
                                placeholder="Select Required End Time"
                                v-model="sapHeader.required_end_time"
                                display-format="HH:mm"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Addtional Data</span>
                        <div class="select">
                            <DxTextBox
                                placeholder="Enter Addtional Data"
                                v-model="sapHeader.additional_data"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Accessibility</span>
                        <div class="select">
                            <DxSelectBox
                                :items="formSelect.accessibility"
                                value-expr="code"
                                display-expr="description"
                                placeholder="Select Accessibility"
                                v-model="sapHeader.accessibility"
                                :search-enabled="true"
                            />
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <span>Scaffolding Requirement</span>
                        <div class="select">
                            <DxSelectBox
                                :items="formSelect.scaffoldingReq"
                                value-expr="code"
                                display-expr="code"
                                placeholder="Select Scaffolding Requirement"
                                v-model="sapHeader.scaffolding_requirement"
                                :search-enabled="true"
                            />
                        </div>
                    </div>
                </div>

                <div
                    class="action-container"
                    style=""
                >
                    <button
                        class="create"
                        @click="CREATE_RECORD"
                    >
                        Create
                    </button>
                    <button @click="$emit('popup', 0)">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GET_DATA, POST_DATA } from "/axios.js";
import moment from "moment";
import "devextreme/dist/css/dx.light.css";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import DxDateBox from "devextreme-vue/date-box";

export default {
    name: "add-long-term",
    props: {
        id_record: Number,
        id_platform: Number,
    },
    components: {
        DxSelectBox,
        DxTextBox,
        DxDateBox,
    },
    created() {
        console.log("id_record:" + this.id_record);
        console.log("id_platform:" + this.id_platform);
        this.FETCH_FAILURE_ACTION_STATUS();
        this.FETCH_DISCIPLINE();
        this.FETCH_STATUS();
        // this.FETCH_FUNC_LOCATION();
        this.FETCH_PLANNER_GRP();
        this.FETCH_PLANNER_GRP_PLANNING_PLANT();
        this.FETCH_MAIN_WORK_CTR();
        this.FETCH_CODE_GROUP_OBJECT_PART();
        this.FETCH_OBJECT_PART_CODE();
        this.FETCH_CODE_GRP_DAMAGE();
        this.FETCH_DAMAGE_CODE();
        this.FETCH_CODE_GRP_CAUSE();
        this.FETCH_CAUSE_CODE();
        this.FETCH_ACCESSIBILITY();
        this.FETCH_SCAFFOLDING_REQ();
        this.FETCH_PLATFORM();
    },
    data() {
        return {
            failureActionRecordList: {
                id: 0,
                is_active: true,
                id_failure: this.id_record,
                action_type: "long-term",
                id_failure_action_status: null,
                id_discipline: null,
                action_date: null,
                action_details: null,
            },
            formSelect: {
                failureactionStatus: [],
                discipline: [],
                status: [],
                functionalLocation: [],
                plannerGrp: [],
                plannerGrpPlanning: [],
                mainWorkCtr: [],
                codegrpObjectpart: [],
                objectpartCode: [],
                codegrpDamage: [],
                damageCode: [],
                codegrpCause: [],
                causeCode: [],
                causeGrp: [],
                accessibility: [],
                scaffoldingReq: [],
            },
            sapHeader: {
                notification_type: "CM",
                code_grp_object_part: "MECH-PI",
                code_grp_damage: "MECH-PI",
                code_grp_cause: "MECH-PI",
                id_module: 2,
                id_from_module: null,
                id_reference: null,
                is_active: true,
                required_start_date: "",
                required_start_time: null,
                required_end_date: "",
                required_end_time: null,
                reported_by: "AIMS",
                abc_indicator: "1",
                user_status: "SCRN",
            },
            platform: null,
        };
    },
    computed: {},
    methods: {
        CREATE_RECORD() {
            const user = JSON.parse(localStorage.getItem("user"));
            console.log(
                "failureActionRecordList",
                this.failureActionRecordList
            );
            console.log("sapHeader", this.sapHeader);
            // must to check required field.
            this.failureActionRecordList.action_date = this
                .failureActionRecordList.action_date
                ? moment(this.failureActionRecordList.action_date).format("L")
                : "";
            this.failureActionRecordList.created_by = user.id;
            this.failureActionRecordList.updated_by = user.id;
            POST_DATA(
                "/FailureActionRecord",
                this.failureActionRecordList,
                (data) => {
                    this.sapHeader.id_from_module = data.id;
                    this.sapHeader.id_reference = "RR" + data.id;
                    // this.sapHeader.description = (this.sapHeader.id_reference + '-' + this.sapHeader.equipment_no + '-' + this.failureActionRecordList.action_details).substring(0,41);
                    this.sapHeader.required_start_date = this.sapHeader
                        .required_start_date
                        ? moment(this.sapHeader.required_start_date).format(
                              "YYYYMMDD"
                          )
                        : "";
                    this.sapHeader.required_end_date = this.sapHeader
                        .required_end_date
                        ? moment(this.sapHeader.required_end_date).format(
                              "YYYYMMDD"
                          )
                        : "";
                    this.sapHeader.required_start_time = this.sapHeader
                        .required_start_time
                        ? moment(this.sapHeader.required_start_time).format(
                              "HHmmss"
                          )
                        : null;
                    this.sapHeader.required_end_time = this.sapHeader
                        .required_end_time
                        ? moment(this.sapHeader.required_end_time).format(
                              "HHmmss"
                          )
                        : null;
                    this.sapHeader.created_by = user.id;
                    this.sapHeader.updated_by = user.id;
                    POST_DATA("/SapHeader", this.sapHeader, () => {
                        this.$emit("popup");
                    });
                }
            );
        },
        FETCH_FAILURE_ACTION_STATUS() {
            GET_DATA(
                this,
                "/Md/get-md-failure-action-status-list",
                "formSelect.failureactionStatus"
            );
        },
        FETCH_DISCIPLINE() {
            GET_DATA(
                this,
                "/Md/get-md-failure-discipline-list",
                "formSelect.discipline"
            );
        },
        FETCH_STATUS() {
            GET_DATA(
                this,
                "/Md/get-md-failure-action-status-list",
                "formSelect.status"
            );
        },
        FETCH_FUNC_LOCATION() {
            GET_DATA(
                this,
                "/Md/get-md-sap-functional-location-list",
                "formSelect.functionalLocation"
            );
        },
        FETCH_PLANNER_GRP() {
            GET_DATA(
                this,
                "/Md/get-md-sap-planner-grp-list",
                "formSelect.plannerGrp"
            );
        },
        FETCH_PLANNER_GRP_PLANNING_PLANT() {
            GET_DATA(
                this,
                "/Md/get-md-sap-planner-grp-planning-plant-list",
                "formSelect.plannerGrpPlanning"
            );
        },
        FETCH_MAIN_WORK_CTR() {
            GET_DATA(
                this,
                "/Md/get-md-sap-main-work-ctr-list",
                "formSelect.mainWorkCtr"
            );
        },
        FETCH_OBJECT_PART_CODE() {
            GET_DATA(this, "/Md/get-md-sap-object-part-code-list", (data) => {
                this.formSelect.objectpartCode = data;
                for (
                    let i = 0;
                    i < this.formSelect.objectpartCode.length;
                    i++
                ) {
                    this.formSelect.objectpartCode[i].ddl =
                        this.formSelect.objectpartCode[i].object_part_code +
                        "-" +
                        this.formSelect.objectpartCode[i].object_part_text;
                }
            });
        },
        FETCH_CODE_GROUP_OBJECT_PART() {
            GET_DATA(
                this,
                "/Md/get-md-sap-code-grp-object-part-list",
                "formSelect.codegrpObjectpart"
            );
        },
        FETCH_CODE_GRP_DAMAGE() {
            GET_DATA(
                this,
                "/Md/get-md-sap-code-grp-damage-list",
                "formSelect.codegrpDamage"
            );
        },
        FETCH_DAMAGE_CODE() {
            GET_DATA(this, "/Md/get-md-sap-damage-code-list", (data) => {
                this.formSelect.damageCode = data;
                for (let i = 0; i < this.formSelect.damageCode.length; i++) {
                    this.formSelect.damageCode[i].ddl =
                        this.formSelect.damageCode[i].damage_code +
                        "-" +
                        this.formSelect.damageCode[i].damage_code_text;
                }
            });
        },
        FETCH_CODE_GRP_CAUSE() {
            GET_DATA(
                this,
                "/Md/get-md-sap-code-grp-cause-list",
                "formSelect.codegrpCause"
            );
        },
        FETCH_CAUSE_CODE() {
            GET_DATA(this, "/Md/get-md-sap-cause-code-list", (data) => {
                this.formSelect.causeCode = data;
                for (let i = 0; i < this.formSelect.causeCode.length; i++) {
                    this.formSelect.causeCode[i].ddl =
                        this.formSelect.causeCode[i].cause_code +
                        "-" +
                        this.formSelect.causeCode[i].cause_text;
                }
            });
        },
        FETCH_ACCESSIBILITY() {
            GET_DATA(
                this,
                "/Md/get-md-sap-accessibility-list",
                "formSelect.accessibility"
            );
        },
        FETCH_SCAFFOLDING_REQ() {
            GET_DATA(
                this,
                "/Md/get-md-sap-scaffolding-list",
                "formSelect.scaffoldingReq"
            );
        },
        FETCH_PLATFORM() {
            GET_DATA(this, "/Md/get-md-platform-list", (data) => {
                const platform = data.filter((p) => p.id == this.id_platform);
                this.sapHeader.planner_grp_planning_plant = platform[0].planning_plant;
                this.platform = platform[0].code_name;
                GET_DATA(this, `/Md/get-md-sap-functional-location-by-platform?platform=${this.platform}`, "formSelect.functionalLocation");
            });
        },
        SET_CURRENT_VIEW(view, data = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", true);
            if (data !== null) this.$emit("currentView", view, data);
            else this.$emit("currentView", view);
        },
        ON_MAIN_WORKCTR_CHANGED(e) {
            console.log(e);
            const pg = this.formSelect.mainWorkCtr.filter(
                (m) => m.code == e.value
            );
            this.sapHeader.planner_grp = pg[0].planner_grp;
        },
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
    height: 500px;
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
    // *[fill] {
    //   grid-column: span 3;
    // }
    h4 {
        position: fixed;
        top: 0;
        padding: 20px 0px 20px 20px;
        margin: 0;
        background-color: white;
        border-radius: 10px;
        z-index: 999;
        width: calc(100% - 20px);
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
    }
    .action-container {
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: center;
        gap: 5px;
        width: 100%;
        background-color: white;
        padding: 20px 0;

        button {
            width: 40%;
        }
    }
    .scroll {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 15px;
        overflow-y: auto;
        height: 350px;
        margin-top: 50px;
        padding: 20px;

        h4 {
            position: relative;
            width: auto;
            padding: 0;
            margin: 0;
            z-index: 100;
        }
    }
}
</style>
