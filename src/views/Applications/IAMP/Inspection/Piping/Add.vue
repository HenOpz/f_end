<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h3 style="grid-column: span 2; margin-bottom: 0; margin-top: 0;">New Inspection Task</h3>

                <div class="input-wrapper">
                    <span>Platform</span>
                    <div class="input">
                        <DxSelectBox 
                            :items="platform" 
                            value-expr="id" 
                            display-expr="code_name"
                            placeholder="Select Platform" 
                            v-model="data.id_platform" 
                            :disabled="true"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Tag Number</span>
                    <div class="input">
                        <DxTextBox :disabled="true" v-model="data.tag_number"  />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Inspection Type</span>
                    <div class="input">
                        <DxSelectBox 
                            :items="insp_type" 
                            value-expr="id" 
                            display-expr="insp_type"
                            placeholder="Select Inspection Type" 
                            v-model="data.id_insp_type" 
                            :disabled="true"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Due Inspection Date</span>
                    <div class="input">
                        <DxTextBox 
                            v-model="data.due_insp_date"  
                            :disabled="true"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <div class="title-wrapper">
                        <span>Inspection Date</span>
                        <span>*</span>
                    </div>
                    <div class="select">
                        <DxDateBox 
                            type="date" 
                            placeholder="Select Inspection Date" 
                            v-model="data.plan_insp_date" 
                            display-format="dd MMM yyyy" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <div class="title-wrapper">
                        <span>Plan Manhours</span>
                        <span>*</span>
                    </div>
                    <div class="input">
                        <DxTextBox placeholder="Enter Manhours" v-model="data.plan_manhours" />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Note</span>
                    <div class="input">
                        <DxTextBox placeholder="Enter Note" v-model="data.note" />
                    </div>
                </div>

                <div />

                <button class="create" @click="CREATE_RECORD">Create</button>
                <button @click="SET_CURRENT_VIEW(0)">Cancel</button>

                <br>
            </div>
        </div>
    </div>
</template>

<script>
import { axios } from "/axios.js";
import { axiosFileMaker } from "/axios.js";
import moment from "moment";
import "devextreme/dist/css/dx.light.css";
import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';
import DxDateBox from 'devextreme-vue/date-box';

export default {
    name: "inspection-task",
    props: {
        fieldData: Object
    },
    components: {
        DxSelectBox,
        DxTextBox,
        DxDateBox,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "PIPING INSPECTION TASK",
            subpageInnerName: null,
        });
        this.FETCH_DROPDOWN_PLATFORM();
        this.FETCH_DROPDOWN_INSP_TYPE();
        console.log('tag data', this.fieldData);
    },
    data() {
        return {
            data: {
                id_platform: null,
                id_asset: 2,
                id_tag: this.fieldData.id_line,
                id_insp_type: null,
                id_insp_task_status: 1,
                tag_number: this.fieldData.line_no,
                due_insp_date: this.fieldData.next_insp_date,
                plan_insp_date: null,
                plan_manhours: null,
                actual_manhours: null,
                insp_effectiveness: null,
                note: null,
                is_active: 1,
                it_number: null,
            },
            insp_type: [],
            platform: [],
        };
    },
    computed: {

    },
    methods: {
        DATE_FORMAT(d) {
            return moment(d).format("YYYY");
        },
        CREATE_RECORD() {
            console.log(this.data);
            const _due_insp_date = new Date(this.data.due_insp_date + '-01-01');
            this.data.due_insp_date = moment(_due_insp_date).format("L");
            this.data.plan_insp_date = moment(this.data.plan_insp_date).format("L");
            axios({
                method: "post",
                url: "/InspectionTask",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: this.data
            })
                .then(res => {
                    if (res.status == 201) {
                        console.log("create success", res);
                        this.data.it_number = res.data.it_number;
                        this.CREATE_RECORD_FM();
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
        CREATE_RECORD_FM() {
            const param = this.data.id_tag + '||' + this.data.it_number + '||' + this.data.plan_insp_date + '||' + this.fieldData.inspection_type + '||' + this.data.plan_manhours + '||' + this.data.note;
            console.log('param', param);
            axiosFileMaker({
                method: "GET",
                url: "/Piping/layouts/info_due_inspection/script/create_inspection_task_api?script.param=" + param,
                headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("piping_token")),
                },
            })
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                console.log("api", error);
                    this.GENERATE_SESSION();
                })
        },
        GENERATE_SESSION() {
            axiosFileMaker({
                method: "POST",
                url: "/Piping/sessions",
                headers: {
                "Content-Type": "application/json",
                Authorization: "Basic dmlzaXRvcjpBaW1zMjAyMg=="
                },
                data: {}
            })
                .then(res => {
                localStorage.setItem("piping_token", JSON.stringify(res.data.response.token));
                this.CREATE_RECORD_FM();
                })
                .catch(error => {
                console.log("api", error);
                })
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
                        this.insp_type = this.insp_type.filter(item => {
                            return item.id_asset == 2
                        })
                        this.data.id_insp_type = this.GET_INSP_TYPE_ID(this.fieldData.inspection_type);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        GET_INSP_TYPE_ID(val) {
            const f = this.insp_type.filter(item => {
                return item.insp_type == val;
            });
            return f[0].id;
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
                        this.data.id_platform = this.GET_PLATFORM_ID(this.fieldData.platform);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        GET_PLATFORM_ID(val) {
            const f = this.platform.filter(item => {
                return item.code_name == val;
            });
            return f[0].id;
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

.dx-state-disabled.dx-widget {
    opacity: 1;
}
</style>