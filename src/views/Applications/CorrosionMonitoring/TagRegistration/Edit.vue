<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h3 style="grid-column: span 2; margin-bottom: 0; margin-top: 0;">Edit Tag Number</h3>

                <div class="input-wrapper">
                    <span>Platform</span>
                    <div class="input">
                        <DxSelectBox 
                            :items="platformList" 
                            value-expr="id" 
                            display-expr="code_name"
                            placeholder="Select Platform" 
                            v-model="registration.id_platform"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Tag Number</span>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Tag Number"
                            v-model="registration.tag_no" 
                        />
                    </div>
                </div>

                <div class="input-wrapper" fill>
                    <span>Description</span>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Description" 
                            v-model="registration.desc" 
                        />
                    </div>
                </div>

                <div class="input-wrapper" v-if="system == 'pipeline'">
                    <span>Operation Temperature (°C)</span>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Operation Temperature"
                            v-model="registration.temp_c" 
                        />
                    </div>
                </div>

                <h5 style="grid-column: span 2; margin-bottom: 0; margin-top: 0;">Activities</h5>

                <div class="input-wrapper" v-if="system == 'pipeline'">
                    <div class="checkbox-wrapper">
                        <DxCheckBox v-model="registration.is_pigging_opt" />
                        <span>Pigging Operation</span>
                    </div>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Pigging Operation Description" v-model="registration.pigging_opt_desc"
                            :disabled="!registration.is_pigging_opt"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <div class="checkbox-wrapper">
                        <DxCheckBox v-model="registration.is_water_analysis" />
                        <span>Water Analysis</span>
                    </div>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Water Analysis Description" v-model="registration.water_analysis_desc"
                            :disabled="!registration.is_water_analysis"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <div class="checkbox-wrapper">
                        <DxCheckBox v-model="registration.is_micro_bacteria" />
                        <span>Microbilogical Bacteria</span>
                    </div>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Microbilogical Bacteria Description" 
                            v-model="registration.micro_bacteria_desc"
                            :disabled="!registration.is_micro_bacteria" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <div class="checkbox-wrapper">
                        <DxCheckBox v-model="registration.is_corrosion_coupon" />
                        <span>Corrosion Coupon</span>
                    </div>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Corrosion Coupon Description" 
                            v-model="registration.corrosion_coupon_desc"
                            :disabled="!registration.is_corrosion_coupon" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <div class="checkbox-wrapper">
                        <DxCheckBox v-model="registration.is_er_probe" />
                        <span>ER Probe</span>
                    </div>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter ER Probe Description" 
                            v-model="registration.er_probe_desc"
                            :disabled="!registration.is_er_probe" 
                        />
                    </div>
                </div>

                <div class="input-wrapper" v-if="system == 'pipeline'">
                    <div class="checkbox-wrapper">
                        <DxCheckBox v-model="registration.is_ci" />
                        <span>Chemical Injection</span>
                    </div>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Chemical Injection Description"
                            v-model="registration.ci_desc" 
                            :disabled="!registration.is_ci" 
                        />
                    </div>
                </div>

                <div class="input-wrapper" v-if="system == 'pipeline'">
                    <div class="checkbox-wrapper">
                        <DxCheckBox v-model="registration.is_rci" />
                        <span>Residual Corrosion Inhibitor</span>
                    </div>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Residual Corrosion Inhibitor Description"
                            v-model="registration.rci_desc" 
                            :disabled="!registration.is_rci" 
                        />
                    </div>
                </div>

                <div v-if="system == 'pipeline'" />

                <button class="create" @click="UPDATE_TAG">Edit</button>
                <button @click="$emit('popup')">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import { GET_DATA, PUT_DATA } from "/axios.js";
import clone from "just-clone";
import "devextreme/dist/css/dx.light.css";
import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';
import { DxCheckBox } from 'devextreme-vue/check-box';

export default {
    name: "edit-cm-tag-regis",
    props: {
        infoData: Object,
        system: String,
    },
    components: {
        DxSelectBox,
        DxTextBox,
        DxCheckBox,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "TAG REGISTRATION ",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.registration = clone(this.infoData);
            GET_DATA(this, '/Md/get-md-platform-list', 'platformList');
        }
    },
    data() {
        return {
            platformList: [],
            registration: {},
        };
    },
    computed: {
        SYSTEM_ID() {
            if(this.system == 'cooling-medium') return 1; 
            else if(this.system == 'produced-water') return 2; 
            else if(this.system == 'sea-water') return 3; 
            else if(this.system == 'pipeline') return 4;
            else return 0;
        }
    },
    methods: {
        UPDATE_TAG() {
            const user = JSON.parse(localStorage.getItem("user"));
            this.registration.updated_by = user.id;
            PUT_DATA(`/CMInfo/${this.registration.id}`, this.registration, () => { this.$emit('popup'); });
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
}
</style>