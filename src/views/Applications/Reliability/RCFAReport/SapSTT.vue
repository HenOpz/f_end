<template>
    <div class="page-ltt-detail-master">
        <div class="table-wrapper">
            <h4 style="grid-column: span 5; margin-bottom: 0; margin-top: 0; font-size: 16px;">SAP Notification Header</h4>
            <div class="input-wrapper">
                <span>WO Order No.</span>
                <ul>
                    <li>{{ sapbymoduleList.wo_order_no }}</li>
                </ul>
            </div>

            <!-- <div class="input-wrapper">
                <span>WO Type</span>
                <ul>
                    <li>{{ sapbymoduleList.wo_type }}</li>
                </ul>
            </div>  -->

            <div class="input-wrapper">
                <span>Description</span>
                <ul>
                    <li>{{ sapbymoduleList.description }}</li>
                </ul>
            </div>

            <div class="input-wrapper">
                <span>Functional Location</span>
                <ul>
                    <li>{{ sapbymoduleList.functional_location }}</li>
                </ul>
            </div>

            <div class="input-wrapper">
                <span>Equipment No.</span>
                <ul>
                    <li>{{ sapbymoduleList.equipment_no }}</li>
                </ul>
            </div> 

            <!-- <div class="input-wrapper">
                <span>Planner Grp</span>
                <ul>
                    <li>{{ sapbymoduleList.planner_grp }}</li>
                </ul>
            </div> -->

            <!-- <div class="input-wrapper">
                <span>Planner Grp Planning Plant</span>
                <div class="select">
                    <ul>
                        <li>{{ sapbymoduleList.planner_grp_planning_plant }}</li>
                    </ul>
                </div>
            </div> -->

            <div class="input-wrapper">
                <span>Main WorkCtr</span>
                <div class="select">
                    <ul>
                        <li>{{ sapbymoduleList.main_workctr }}</li>
                    </ul>
                </div>
            </div>

            <!-- <div class="input-wrapper">
                <span>Code Grp Object Part</span>
                <div class="select">
                    <ul>
                        <li>{{ sapbymoduleList.code_grp_object_part }}</li>
                    </ul>
                </div>
            </div> -->

            <div class="input-wrapper">
                <span>Object Part Code</span>
                <div class="select">
                    <ul>
                        <li>{{ sapbymoduleList.object_part_code }}</li>
                    </ul>
                </div>
            </div>

            <!-- <div class="input-wrapper">
                <span>Code Grp Damage</span>
                <ul>
                    <li>{{ sapbymoduleList.code_grp_damage }}</li>
                </ul>
            </div> -->

            <div class="input-wrapper">
                <span>Damage Code</span>
                <ul>
                    <li>{{ sapbymoduleList.damage_code }}</li>
                </ul>
            </div>

            <!-- <div class="input-wrapper">
                <span>Damage Free Text</span>
                <ul>
                    <li>{{ sapbymoduleList.damage_free_text }}</li>
                </ul>
            </div> -->

            <!-- <div class="input-wrapper">
                <span>Code Grp Cause</span>
                <ul>
                    <li>{{ sapbymoduleList.damage_free_text }}</li>
                </ul>
            </div> -->

            <div class="input-wrapper">
                <span>Cause Code</span>
                <ul>
                    <li>{{ sapbymoduleList.cause_code }}</li>
                </ul>
            </div>

            <!-- <div class="input-wrapper">
                <span>Cause Grp Free Text</span>
                <ul>
                    <li>{{ sapbymoduleList.cause_grp_free_text }}</li>
                </ul>
            </div> -->

            <div class="input-wrapper">
                <span>Required Start Date</span>
                <ul>
                    <li>{{ sapbymoduleList.required_start_date }}</li>
                </ul>
            </div>

            <!-- <div class="input-wrapper">
                <span>Required Start Time</span>
                <ul>
                    <li>{{ sapbymoduleList.required_start_time }}</li>
                </ul>
            </div> -->

            <div class="input-wrapper">
                <span>Required End Date</span>
                <ul>
                    <li>{{ sapbymoduleList.required_end_date }}</li>
                </ul>
            </div>

            <!-- <div class="input-wrapper">
                <span>Required End Time</span>
                <ul>
                    <li>{{ sapbymoduleList.required_end_time }}</li>
                </ul>
            </div> -->

            <div class="input-wrapper">
                <span>Addtional Data</span>
                <ul>
                    <li>{{ sapbymoduleList.additional_data }}</li>
                </ul>
            </div>

            <div class="input-wrapper">
                <span>Accessibility</span>
                <ul>
                    <li>{{ sapbymoduleList.accessibility }}</li>
                </ul>
            </div>

            <div class="input-wrapper">
                <span>Scaffolding Requirement</span>
                <ul>
                    <li>{{ sapbymoduleList.scaffolding_requirement }}</li>
                </ul>
            </div>
            <div></div>
            <div></div> 
        </div>
    </div>
</template>

<script>
import { GET_DATA } from "/axios.js";
//   import moment from "moment";
import "devextreme/dist/css/dx.light.css";
// import DxSelectBox from 'devextreme-vue/select-box';
// import DxTextBox from 'devextreme-vue/text-box';
// import DxDateBox from 'devextreme-vue/date-box';

export default {
    name: "edit-long-term",
    props: {
        sapData: Object
    },
    components: {
        // DxSelectBox,
        // DxTextBox,
        // DxDateBox,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "FR NUMBER: ",
            subpageInnerName: null,
        });
        this.FETCH_SAP_BY_MODULE();
    },
    data() {
        return {
            id_module: this.sapData.key,
            sapbymoduleList: {},
            failureActionRecordList: {},
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
            sapHeader: {}
        };
    },
    computed: {},
    methods: {
        FETCH_SAP_BY_MODULE() {
            GET_DATA(this, `/SapHeader/get-sap-header-by-module-from-module?id_module=2&id_from_module=${this.id_module}`, (data) => { this.sapbymoduleList = data[0]; });
        },
    }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-ltt-detail-master {
    background-color: #fff;
    border-radius: 10px;
}

.table-wrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
    padding: 20px;

    *[span-2] {
        grid-column: span 2;
    }

    *[fill] {
        grid-column: span 4;
    }

    .input-wrapper {
        display: flex;
        flex-direction: column;
        // gap: 6px;
        h4{
            font-size: 14px;
            font-weight: 700; 
        }

        span {
            font-size: 10px;
            font-weight: 600;
            color: #777;
        }
        ul {
            padding-inline-start: 0px;
            list-style-type: none;
            margin-block-start: 5px;
        }
        li {
            font-size: 12px;
            font-weight: 500;
        }
    }
}
</style>