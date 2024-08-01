<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h3
                    style="grid-column: span 2; margin-bottom: 0; margin-top: 0"
                >
                    New Result
                </h3>

                <div class="input-wrapper">
                    <span>Record Date</span>
                    <div class="input">
                        <DxDateBox
                            v-model="data.record_date"
                            placeholder="Select Date"
                            display-format="dd MMM yyyy"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Metal Loss (mm)</span>
                    <div class="input">
                        <DxNumberBox
                            placeholder="Enter Metal Loss"
                            v-model="data.metal_loss"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Corrosion Rate (mm/y)</span>
                    <div class="input">
                        <DxNumberBox
                            placeholder="Enter Corrosion Rate"
                            v-model="data.corrosion_rate"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Note</span>
                    <div class="input">
                        <DxTextBox
                            placeholder="Enter Note"
                            v-model="data.note"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Probe Status</span>
                    <div class="input">
                        <DxSelectBox
                            :items="probeList"
                            value-expr="id"
                            display-expr="code"
                            placeholder="Select Status"
                            v-model="data.id_probe_status"
                        />
                    </div>
                </div>

                <div />

                <button
                    class="create"
                    @click="CREATE_RECORD"
                >
                    Create
                </button>
                <button @click="$emit('popup')">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import { POST_DATA } from "/axios.js";
import moment from "moment";
import "devextreme/dist/css/dx.light.css";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import DxDateBox from "devextreme-vue/date-box";
import DxNumberBox from "devextreme-vue/number-box";

export default {
    name: "add-probe-record",
    components: {
        DxSelectBox,
        DxTextBox,
        DxDateBox,
        DxNumberBox,
    },
    created() {
        this.probeList = [
            {
                id: 1,
                code: "Applicable",
            },
            {
                id: 2,
                code: "Not Applicable",
            },
        ];
    },
    data() {
        return {
            data: {
                id: 0,
                id_tag: this.id_tag,
                record_date: null,
                probe_type: null,
                part_no: null,
                probe_id: null,
                metal_loss: null,
                corrosion_rate: null,
                note: null,
                id_probe_status: null,
            },
            probeList: [],
        };
    },
    computed: {},
    methods: {
        CREATE_RECORD() {
            console.log(this.data);
            const user = JSON.parse(localStorage.getItem("user"));
            this.data.created_by = user.id;
            this.data.updated_by = user.id;
            if (this.data.record_date) {
                this.data.record_date = moment(this.data.record_date).format(
                    "L"
                );
                POST_DATA("/CMERProbeRecord", this.data, () => {
                    this.$emit("popup");
                });
            }
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
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
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
