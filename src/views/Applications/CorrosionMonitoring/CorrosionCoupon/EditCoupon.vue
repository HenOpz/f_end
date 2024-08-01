<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h5 style="grid-column: span 2; margin-bottom: 0; margin-top: 0;">New Coupon</h5>

                <div class="input-wrapper">
                    <span>Coupon ID</span>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Coupon ID" 
                            v-model="data.coupon_id" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Material</span>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Material" 
                            v-model="data.material" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Density (g/cm^3)</span>
                    <div class="input">
                        <DxNumberBox 
                            placeholder="Enter Density" 
                            v-model="data.density" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Area (cm^2)</span>
                    <div class="input">
                        <DxNumberBox 
                            placeholder="Enter Area" 
                            v-model="data.area" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Initial Weight (g)</span>
                    <div class="input">
                        <DxNumberBox 
                            placeholder="Enter Initial Weight" 
                            v-model="data.initial_weight" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Final Weight (g)</span>
                    <div class="input">
                        <DxNumberBox 
                            placeholder="Enter Final Weight" 
                            v-model="data.final_weight" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Max Pit Depth (mm)</span>
                    <div class="input">
                        <DxNumberBox 
                            placeholder="Enter Max Pit Depth" 
                            v-model="data.max_pit_depth" 
                        />
                    </div>
                </div>

                <div />

                <button class="create" @click="UPDATE_RECORD">Edit</button>
                <button @click="$emit('popup')">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import { PUT_DATA } from "/axios.js";
// import moment from "moment";
import "devextreme/dist/css/dx.light.css";
// import DxDateBox from 'devextreme-vue/date-box';
import DxNumberBox from "devextreme-vue/number-box";
import DxTextBox from "devextreme-vue/text-box";

export default {
    name: "edit-coupon-detail",
    props: {
        selectedData: Object,
    },
    components: {
        // DxDateBox,
        DxNumberBox,
        DxTextBox,
    },
    created() {
        console.log(this.selectedData);
    },
    data() {
        return {
            data: {
                id: this.selectedData.id,
                id_record: this.selectedData.id_record,
                coupon_id: this.selectedData.coupon_id,
                material: this.selectedData.material,
                density: this.selectedData.density,
                area: this.selectedData.area,
                initial_weight: this.selectedData.initial_weight,
                final_weight: this.selectedData.final_weight,
                max_pit_depth: this.selectedData.max_pit_depth,
            }
        };
    },
    computed: {},
    methods: {
        UPDATE_RECORD() {
            PUT_DATA(`/CMCorrosionCouponMonitorDetail/${this.data.id}`, this.data, () => { this.$emit('popup', this.data.id_record); });
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