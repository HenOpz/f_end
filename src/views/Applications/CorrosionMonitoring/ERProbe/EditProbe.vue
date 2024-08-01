<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h3
                    style="grid-column: span 2; margin-bottom: 0; margin-top: 0"
                >
                    Edit Result
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

                <div/>

                <button class="create" @click="UPDATE_RECORD">Update</button>
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

    name: "edit-probe-record",
    props: {
        id_record: Number,
        moc_no: String,
    },
    components: {
        DxSelectBox,
        DxTextBox,
        DxDateBox,
        DxNumberBox,
    },
    created() {
        if (this.$store.state.status.server == true) {
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
        }
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
        UPDATE_RECORD() {
            if (this.mocList.start_date !== null)
                this.mocList.start_date = moment(this.mocList.start_date).format("L");
            if (this.mocList.expiry_date !== null)
                this.mocList.expiry_date = moment(this.mocList.expiry_date).format("L");
            POST_DATA(`/ManagementOfChange/${this.mocList.id}`, this.mocList, () => { this.SET_CURRENT_VIEW(0); });
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

    *[span-6] {
        grid-column: span 6;
    }

    *[fill] {
        grid-column: span 6;
    }

    .action-bar {
        width: calc(100% - 80px);
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