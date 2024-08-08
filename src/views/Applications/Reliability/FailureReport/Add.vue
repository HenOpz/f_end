<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h3
                    style="grid-column: span 2; margin-top: 0; margin-bottom: 0"
                >
                    New Failure Report
                </h3>

                <div class="input-wrapper">
                    <span>Tag Number</span>
                    <div class="select">
                        <DxTextBox
                            placeholder="Enter Tag Number"
                            v-model="failureRecordList.tag_no"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Location</span>
                    <div class="select">
                        <DxSelectBox
                            :items="formSelect.platform"
                            value-expr="id"
                            display-expr="code_name"
                            placeholder="Select Location"
                            v-model="failureRecordList.id_platform"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Equipment Type</span>
                    <div class="input">
                        <DxTextBox
                            placeholder="Enter Equipment Type"
                            v-model="failureRecordList.equipment_type"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Unit</span>
                    <div class="input">
                        <DxTextBox
                            placeholder="Enter Unit"
                            v-model="failureRecordList.unit"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Drawing Number</span>
                    <div class="input">
                        <DxTextBox
                            placeholder="Enter Drawing Number"
                            v-model="failureRecordList.drawing_no"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Failure Impact</span>
                    <div class="select">
                        <DxSelectBox
                            :items="formSelect.failureImpact"
                            value-expr="id"
                            display-expr="status"
                            placeholder="Select Failure Impact"
                            v-model="failureRecordList.id_failure_impact"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Discipline</span>
                    <div class="select">
                        <DxSelectBox
                            :items="formSelect.discipline"
                            value-expr="id"
                            display-expr="discipline"
                            placeholder="Select Discipline"
                            v-model="failureRecordList.id_discipline"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Findings Date</span>
                    <div class="select">
                        <DxDateBox
                            type="date"
                            placeholder="Select Findings Date"
                            v-model="failureRecordList.findings_date"
                            display-format="dd MMM yyyy"
                        />
                    </div>
                </div>

                <div
                    class="input-wrapper"
                    fill
                >
                    <span>Details</span>
                    <div class="input">
                        <DxTextArea
                            :height="150"
                            :auto-resize-enabled="true"
                            placeholder="Enter Details"
                            v-model="failureRecordList.details"
                        />
                    </div>
                </div>

                <div
                    class="input-wrapper"
                    fill
                >
                    <span>Findings</span>
                    <div class="input">
                        <DxTextArea
                            :height="150"
                            :auto-resize-enabled="true"
                            placeholder="Enter Findings"
                            v-model="failureRecordList.findings"
                        />
                    </div>
                </div>

                <div
                    class="input-wrapper"
                    fill
                >
                    <span>Mitigation</span>
                    <div class="input">
                        <DxTextArea
                            :height="150"
                            :auto-resize-enabled="true"
                            placeholder="Enter Mitigation"
                            v-model="failureRecordList.mitigation"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Probability of Failure</span>
                    <div class="select">
                        <DxSelectBox
                            :items="formSelect.pof"
                            value-expr="id"
                            display-expr="category"
                            placeholder="Select Probability of Failure"
                            v-model="failureRecordList.id_pof"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Note</span>
                    <div class="input">
                        <DxTextBox
                            placeholder="Enter Note"
                            v-model="failureRecordList.note_pof"
                            :disabled="failureRecordList.id_pof === null"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>People</span>
                    <div class="select">
                        <DxSelectBox
                            :items="formSelect.cof"
                            value-expr="id"
                            display-expr="category"
                            placeholder="Select People"
                            v-model="failureRecordList.id_cof_people"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Note</span>
                    <div class="input">
                        <DxTextBox
                            placeholder="Enter Note"
                            v-model="failureRecordList.note_cof_people"
                            :disabled="failureRecordList.id_cof_people === null"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Environment</span>
                    <div class="select">
                        <DxSelectBox
                            :items="formSelect.cof"
                            value-expr="id"
                            display-expr="category"
                            placeholder="Select Environment"
                            v-model="failureRecordList.id_cof_environment"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Note</span>
                    <div class="input">
                        <DxTextBox
                            placeholder="Enter Note"
                            v-model="failureRecordList.note_cof_environment"
                            :disabled="
                                failureRecordList.id_cof_environment === null
                            "
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Production Loss</span>
                    <div class="select">
                        <DxSelectBox
                            :items="formSelect.cof"
                            value-expr="id"
                            display-expr="category"
                            placeholder="Select Production Loss"
                            v-model="failureRecordList.id_cof_production_loss"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Note</span>
                    <div class="input">
                        <DxTextBox
                            placeholder="Enter Note"
                            v-model="failureRecordList.note_cof_production_loss"
                            :disabled="
                                failureRecordList.id_cof_production_loss ===
                                null
                            "
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Reputation</span>
                    <div class="select">
                        <DxSelectBox
                            :items="formSelect.cof"
                            value-expr="id"
                            display-expr="category"
                            placeholder="Select Reputation"
                            v-model="failureRecordList.id_cof_reputation"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Note</span>
                    <div class="input">
                        <DxTextBox
                            placeholder="Enter Note"
                            v-model="failureRecordList.note_cof_reputation"
                            :disabled="
                                failureRecordList.id_cof_reputation === null
                            "
                        />
                    </div>
                </div>

                <div
                    class="input-wrapper"
                    fill
                >
                    <div class="checkbox-wrapper">
                        <DxCheckBox
                            v-model="GET_RISK_MATRIX_CHECK"
                            :disabled="GET_RISK_MATRIX_DISABLE"
                        />
                        <span>RCFA</span>
                    </div>
                </div>

                <button
                    class="create"
                    @click="CREATE_RECORD"
                >
                    Create
                </button>
                <button @click="SET_CURRENT_VIEW(0)">Cancel</button>
                <br />
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
import DxTextArea from "devextreme-vue/text-area";
import { DxCheckBox } from "devextreme-vue/check-box";
export default {
    name: "add-failure-record",
    components: {
        DxSelectBox,
        DxTextBox,
        DxDateBox,
        DxTextArea,
        DxCheckBox,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "FAILURE REPORT",
            subpageInnerName: null,
        });
        this.FETCH_DROPDOWN_FAILURE_IMPACT();
        this.FETCH_DROPDOWN_DISCIPLINE();
        this.FETCH_DROPDOWN_PLATFORM_LIST();
    },
    data() {
        return {
            formSelect: {
                platform: [],
                failureImpact: [],
                discipline: [],
                pof: [
                    {
                        id: 1,
                        code: "A",
                        category: "Rare (A)",
                        desc: "Never heard in E&P industry but could occur",
                    },
                    {
                        id: 2,
                        code: "B",
                        category: "Unlikely (B)",
                        desc: "Event has occurred in the E&P industry or is unlikely to occur in CPOC",
                    },
                    {
                        id: 3,
                        code: "C",
                        category: "Possible (C)",
                        desc: "Event occurred more than once in the E&P industry or has occurred in CPOC",
                    },
                    {
                        id: 4,
                        code: "D",
                        category: "Likely (D)",
                        desc: "Event occurred several times per year in the E&P industry or once per year in CPOC",
                    },
                    {
                        id: 5,
                        code: "E",
                        category: "Almost Certain (E)",
                        desc: "Event occurred frequently in the E&P industry or occurred several times per year in CPOC",
                    },
                ],
                cof: [
                    {
                        id: 1,
                        code: 1,
                        category: "Minor (1)",
                        people_desc: "",
                        environment_desc: "",
                        production_loss_desc: "",
                        reputation_desc: "",
                    },
                    {
                        id: 2,
                        code: 2,
                        category: "Moderate (2)",
                        people_desc: "",
                        environment_desc: "",
                        production_loss_desc: "",
                        reputation_desc: "",
                    },
                    {
                        id: 3,
                        code: 3,
                        category: "Significant (3)",
                        people_desc: "",
                        environment_desc: "",
                        production_loss_desc: "",
                        reputation_desc: "",
                    },
                    {
                        id: 4,
                        code: 4,
                        category: "Serious (4)",
                        people_desc: "",
                        environment_desc: "",
                        production_loss_desc: "",
                        reputation_desc: "",
                    },
                    {
                        id: 5,
                        code: 5,
                        category: "Critical (5)",
                        people_desc: "",
                        environment_desc: "",
                        production_loss_desc: "",
                        reputation_desc: "",
                    },
                ],
            },
            failureRecordList: {
                id: 0,
                is_active: true,
                tag_no: null,
                id_platform: null,
                equipment_type: null,
                unit: null,
                drawing_no: null,
                id_failure_impact: null,
                id_discipline: null,
                findings_date: null,
                health_and_safety: null,
                production_loss: null,
                material_cost: null,
                environment_impact: null,
                id_cof_people: null,
                id_cof_environment: null,
                id_cof_production_loss: null,
                id_cof_reputation: null,
                id_pof: null,
                id_risk: null,
                is_rcfa: false,
                note_cof_people: null,
                note_cof_environment: null,
                note_cof_production_loss: null,
                note_cof_reputation: null,
                note_pof: null,
                remark: null,
                findings: null,
                mitigation: null,
            },
            risk_matrix: null,
            dataGridAttributes: {
                class: "data-grid-style",
            },
        };
    },
    watch: {
        "failureRecordList.id_cof_people": function () {
            this.FETCH_RISK_MATRIX();
        },
        "failureRecordList.id_cof_environment": function () {
            this.FETCH_RISK_MATRIX();
        },
        "failureRecordList.id_cof_production_loss": function () {
            this.FETCH_RISK_MATRIX();
        },
        "failureRecordList.id_cof_reputation": function () {
            this.FETCH_RISK_MATRIX();
        },
        "failureRecordList.id_pof": function () {
            this.FETCH_RISK_MATRIX();
        },
    },
    computed: {
        GET_RISK_MATRIX_CHECK() {
            if (this.risk_matrix) {
                if (this.risk_matrix.color_name === "Green") return false;
                if (this.risk_matrix.color_name === "Yellow") return false;
                if (this.risk_matrix.color_name === "Orange") return true;
                if (this.risk_matrix.color_name === "Red") return true;
                else return null;
            } else return false;
        },
        GET_RISK_MATRIX_DISABLE() {
            if (this.risk_matrix) {
                if (this.risk_matrix.color_name === "Green") return true;
                if (this.risk_matrix.color_name === "Yellow") return false;
                if (this.risk_matrix.color_name === "Orange") return true;
                if (this.risk_matrix.color_name === "Red") return true;
                else return true;
            } else return true;
        },
    },
    methods: {
        CREATE_RECORD() {
            const user = JSON.parse(localStorage.getItem("user"));
            this.failureRecordList.created_by = user.id;
            this.failureRecordList.updated_by = user.id;
            this.failureRecordList.id_work_group = user.failureRecordAuths[0].id_work_group;

            if (this.failureRecordList.findings_date)
                this.failureRecordList.findings_date = moment(
                    this.failureRecordList.findings_date
                ).format("L");
            POST_DATA("/FailureRecord", this.failureRecordList, (data) => {
                this.SET_CURRENT_VIEW(2, data);
            });
        },
        FETCH_RISK_MATRIX() {
            const numbers = [
                this.failureRecordList.id_cof_people || 0,
                this.failureRecordList.id_cof_environment || 0,
                this.failureRecordList.id_cof_production_loss || 0,
                this.failureRecordList.id_cof_reputation || 0,
            ];
            const maxNumber = Math.max(...numbers);

            GET_DATA(
                this,
                `/Md/get-md-failure-risk-matrix-by-pof-cof?id_pof=${this.failureRecordList.id_pof}&id_cof=${maxNumber}`,
                "risk_matrix"
            );
        },
        FETCH_DROPDOWN_FAILURE_IMPACT() {
            GET_DATA(
                this,
                "/Md/get-md-failure-impact-list",
                "formSelect.failureImpact"
            );
        },
        FETCH_DROPDOWN_DISCIPLINE() {
            GET_DATA(
                this,
                "/Md/get-md-failure-discipline-list",
                "formSelect.discipline"
            );
        },
        FETCH_DROPDOWN_PLATFORM_LIST() {
            GET_DATA(this, "/Md/get-md-platform-list", "formSelect.platform");
        },
        SET_CURRENT_VIEW(view, data = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", true);
            if (data !== null) this.$emit("currentView", view, data);
            else this.$emit("currentView", view);
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
    // overflow-y: hidden;
}

.page-section {
    padding: 20px;
    overflow-y: auto;
    height: calc(100% - 210px);
    grid-row: span 2;
}

.table-wrapper {
    display: grid;
    grid-template-columns: 48% 48%;
    gap: 15px;
    margin-bottom: 50px !important;
    *[fill] {
        grid-column: span 2;
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
