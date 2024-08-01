<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h3 style="grid-column: span 2; margin-bottom: 0; margin-top: 0;">New Result</h3>

                <div class="input-wrapper">
                    <span>Pipeline</span>
                    <div class="input">
                        <DxSelectBox 
                            :items="formSelect.pipelineList" 
                            value-expr="id" 
                            display-expr="tag_no"
                            placeholder="Select Pipeline" 
                            v-model="data.id_pipeline"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Date</span>
                    <div class="input">
                        <DxDateBox 
                            type="date" 
                            placeholder="Select Date" 
                            v-model="data.date" 
                            display-format="dd MMM yyyy" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Report No.</span>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Report No." 
                            v-model="data.report_no" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Well Flowline</span>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Well Flowline" 
                            v-model="data.well_flowline" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Gas Rate (mmscfd)</span>
                    <div class="input">
                        <DxNumberBox 
                            placeholder="Enter Gas Rate" 
                            v-model="data.gas_rate"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Sand (kg)</span>
                    <div class="input">
                        <DxNumberBox 
                            placeholder="Enter Sand" 
                            v-model="data.sand"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Sludge (kg)</span>
                    <div class="input">
                        <DxNumberBox 
                            placeholder="Enter Sludge" 
                            v-model="data.sludge"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Sludge (kg)</span>
                    <div class="input">
                        <DxNumberBox 
                            placeholder="Enter Hg" 
                            v-model="data.hg"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Duration (hrs)</span>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Duration" 
                            v-model="data.duration" 
                        />
                    </div>
                </div>

                <div />

                <button class="create" @click="CREATE_RECORD">Create</button>
                <button @click="$emit('popup')">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import { POST_DATA } from "/axios.js";
import moment from "moment";
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';
import DxDateBox from 'devextreme-vue/date-box';
import DxNumberBox from 'devextreme-vue/number-box';

//Structures

export default {
    name: "inspection-record",
    components: {
        DxSelectBox,
        DxDateBox,
        DxTextBox,
        DxNumberBox,
    },
    created() {
        // GET_DATA(this, '/Md/get-md-moc-rrl-list', 'formSelect.pipelineList');
    },
    data() {
        return {
            formSelect: {
                pipelineList: [],
            },
            data: {
                id_pipeline: null,
                date: null,
                report_no: null,
                pig_type: null,
                well_flowline: null,
                gas_rate: null,
                sand: null,
                sludge: null,
                hg: null,
                duration: null,
            }
        };
    },
    computed: {},
    methods: {
        EXPORT_DATA(e) {
            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet("Projects");
            exportDataGrid({
                worksheet: worksheet,
                component: e.component
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(
                        new Blob([buffer], { type: "application/octet-stream" }),
                        "inspection_record.xlsx"
                    );
                });
            });
            e.cancel = true;
        },
        CREATE_RECORD() {
            if (this.data.date !== null)
                this.data.date = moment(this.data.date).format("L");
            POST_DATA('/PiggingOperation', this.mocList, () => { this.SET_CURRENT_VIEW(0); });
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
    grid-template-columns: 48% 48%;
    gap: 15px;

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

    .pdf-wrapper {
        display: grid;
        grid-template-columns: 3;
        gap: 10px;

        *[span-2] {
            grid-column: span 2;
        }

        *[fill] {
            grid-column: span 3;
        }

        span {
            font-size: 16px;
        }

        img {
            width: 100%;
        }

        .button-wrapper {
            display: flex;
            flex-direction: column;
            gap: 10px;

            button,
            select {
                width: 100%;
                padding: 10px 0;
                color: white;
            }

            .select {
                background-color: $dexon-primary-green !important;
            }

            .delete {
                background-color: $dexon-primary-red;
            }
        }
    }
}
</style>