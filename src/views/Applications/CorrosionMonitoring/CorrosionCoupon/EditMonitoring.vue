<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h5 style="grid-column: span 2; margin-bottom: 0; margin-top: 0;">Edit Monitoring Record</h5>

                <div class="input-wrapper">
                    <span>Install Date</span>
                    <div class="input">
                        <DxDateBox 
                            v-model="data.install_date" 
                            placeholder="Select Date" 
                            display-format="dd MMM yyyy"  
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Remove Date</span>
                    <div class="input">
                        <DxDateBox 
                            v-model="data.remove_date" 
                            placeholder="Select Date" 
                            display-format="dd MMM yyyy"  
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

                <button class="create" @click="UPDATE_RECORD">Edit</button>
                <button @click="$emit('popup')">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import { PUT_DATA } from "/axios.js";
import moment from "moment";
import "devextreme/dist/css/dx.light.css";
import DxSelectBox from 'devextreme-vue/select-box';
import DxDateBox from 'devextreme-vue/date-box';
export default {
    name: "edit-monitoring-record",
    props: {
        selectedData: Object
    },
    components: {
        DxDateBox,
        DxSelectBox
    },
    created() {
        console.log(this.selectedData);
        this.probeList = [
            {
                id: 1,
                code: 'Applicable'
            },
            {
                id: 2,
                code: 'Not Applicable'
            },
        ]
    },
    data() {
        return {
            data: {
                id: this.selectedData.id,
                id_tag: this.selectedData.id_tag,
                install_date: this.selectedData.install_date,
                remove_date: this.selectedData.remove_date,
            },
            probeList: [],
        };
    },
    computed: {},
    methods: {
        UPDATE_RECORD() {
            const user = JSON.parse(localStorage.getItem("user"));
            this.data.updated_by = user.id;
            if(this.data.install_date && this.data.remove_date) {
                this.data.install_date = moment(this.data.install_date).format("L");
                this.data.remove_date = moment(this.data.remove_date).format("L");
                PUT_DATA(`/CMCorrosionCouponMonitorRecord/${this.data.id}`, this.data, () => { this.$emit('popup'); });
            }
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
}
</style>