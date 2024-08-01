<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h3 style="grid-column: span 2; margin-bottom: 0; margin-top: 0;">New Tag Number</h3>

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

                <button class="create" @click="CREATE_TAG">Create</button>
                <button @click="CANCEL">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import { GET_DATA, POST_DATA } from "/axios.js";
import "devextreme/dist/css/dx.light.css";
import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';
import { DxCheckBox } from 'devextreme-vue/check-box';

export default {
    name: "add-cm-tag-regis",
    components: {
        DxSelectBox,
        DxTextBox,
        DxCheckBox,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "TAG REGISTRATION",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            GET_DATA(this, '/Md/get-md-platform-list', 'platformList', () => {
                this.platformList = this.platformList.filter(e => e.code_name === "MDPP");
            });
        }
    },
    data() {
        return {
            platformList: [],
            registration: {
                id: 0,
                id_platform: null,
                tag_no: null,
                desc: null,
                is_pigging_opt: false,
                pigging_opt_desc: null,
                is_water_analysis: false,
                water_analysis_desc: null,
                is_micro_bacteria: false,
                micro_bacteria_desc: null,
                is_corrosion_coupon: false,
                corrosion_coupon_desc: null,
                is_er_probe: false,
                er_probe_desc: null,
                is_ci: false,
                ci_desc: null,
                is_rci: false,
                rci_desc: null,
                id_system: null,
                is_active: true,
            },
        };
    },
    props: {
        system: String,
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
        CREATE_TAG() {
            const user = JSON.parse(localStorage.getItem("user"));
            this.registration.created_by = user.id;
            this.registration.updated_by = user.id;
            this.registration.id_system = this.SYSTEM_ID;
            POST_DATA('/CMInfo', this.registration, () => { this.$emit('popup'); });
        },
        CANCEL() {
            this.$emit('popup');
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