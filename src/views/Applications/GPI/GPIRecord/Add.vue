<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h3 style="grid-column: span 2; margin-top: 0; margin-bottom: 0;">New GPI Record</h3>

                <div class="input-wrapper">
                    <div class="title-wrapper">
                        <span>Platform</span>
                        <span>*</span>
                    </div>
                    <div class="select">
                        <DxSelectBox 
                            :items="platformList" 
                            value-expr="id" 
                            display-expr="code_name"
                            v-model="gpiRecordList.id_platform" 
                            placeholder="Select Platform" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <div class="title-wrapper">
                        <span>Asset Type</span>
                        <span>*</span>
                    </div>
                    <div class="select">
                        <DxSelectBox 
                            :items="assetTypeList" 
                            value-expr="asset_type" 
                            display-expr="asset_type"
                            v-model="gpiRecordList.asset_type" 
                            :value="gpiRecordList.asset_type"
                            placeholder="Select Asset Type" 
                            :accept-custom-value="true"
                            @customItemCreating="INSERT_ITEM_SELECT_BOX($event, assetTypeList)"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Tag Number</span>
                    <div class="input">
                        <DxTextBox 
                            v-model="gpiRecordList.tag_no" 
                            placeholder="Enter Tag Number" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Location | Deck</span>
                    <div class="input">
                        <DxSelectBox 
                            :items="deckList" 
                            value-expr="code" 
                            display-expr="code"
                            :value="gpiRecordList.location_deck"
                            v-model="gpiRecordList.location_deck" 
                            :accept-custom-value="true"
                            @customItemCreating="INSERT_ITEM_SELECT_BOX($event, deckList)"
                            placeholder="Select Location | Deck" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <div class="title-wrapper">
                        <span>GPI Date</span>
                        <span>*</span>
                    </div>
                    <div class="input">
                        <DxDateBox 
                            v-model="gpiRecordList.gpi_date" 
                            placeholder="Select Date" 
                            display-format="dd MMM yyyy"  
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Main Component Description</span>
                    <div class="input">
                        <DxTextBox
                            v-model="gpiRecordList.main_component_free_text"
                            placeholder="Enter Main Component Description" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Severity</span>
                    <div class="select">
                        <DxSelectBox 
                            :items="severityList"
                            value-expr="id" 
                            display-expr="status"
                            v-model="gpiRecordList.id_severity" 
                            placeholder="Enter Severity" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Mitigation</span>
                    <div class="input">
                        <DxTextBox 
                            placeholder="Enter Mitigation"
                            v-model="gpiRecordList.mitigation_free_text" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Repair Description</span>
                    <div class="input">
                        <DxSelectBox 
                            :items="repairTypeList" 
                            value-expr="code" 
                            display-expr="code"
                            :value="gpiRecordList.repair_type_free_text"
                            v-model="gpiRecordList.repair_type_free_text" 
                            :accept-custom-value="true"
                            @customItemCreating="INSERT_ITEM_SELECT_BOX($event, repairTypeList)"
                            placeholder="Select Repair Type" 
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Discipline</span>
                    <div class="select">
                        <DxSelectBox 
                            :items="disciplineList" 
                            value-expr="id" 
                            display-expr="code"
                            v-model="gpiRecordList.id_discipline" 
                            placeholder="Select Discipline"
                        />
                    </div>
                </div>

                <div class="input-wrapper">
                    <span>Expected Finish Date</span>
                    <div class="select">
                        <DxDateBox 
                            v-model="gpiRecordList.expected_finish_date" 
                            placeholder="Select Date"
                            display-format="dd MMM yyyy"  
                        />
                    </div>
                </div>

                <div fill class="input-wrapper">
                    <span>Damage Mechanism / Findings</span>
                    <div class="input">
                        <dxTextArea 
                            :height="80" 
                            :auto-resize-enabled="true" 
                            placeholder="Enter Damage Mechanism / FFindings"
                            v-model="gpiRecordList.dmg_mech_findings" 
                        />
                    </div>
                </div>

                <div fill class="input-wrapper">
                    <span>Recommendation</span>
                    <div class="input">
                        <dxTextArea 
                            :height="80" 
                            :auto-resize-enabled="true" 
                            placeholder="Enter Recommendation"
                            v-model="gpiRecordList.recommendation" 
                        />
                    </div>
                </div>

                <button class="create" @click="CREATE_RECORD">Create</button>
                <button @click="SET_CURRENT_VIEW(0)">Cancel</button>

                <br>
            </div>
        </div>
    </div>
</template>

<script>
import { axios } from "/axios.js";
import moment from "moment";
import "devextreme/dist/css/dx.light.css";
import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';
import DxDateBox from 'devextreme-vue/date-box';
import DxTextArea from 'devextreme-vue/text-area';
import DataSource from 'devextreme/data/data_source';

export default {
    name: "gpi-record",
    components: {
        DxSelectBox,
        DxTextBox,
        DxDateBox,
        DxTextArea
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "GPI RECORD",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.FETCH_DATA('/Md/get-md-platform-list', 'platformList');
            this.FETCH_DATA('/Md/get-md-asset-type-list', 'assetTypeList');
            this.FETCH_DATA('/Md/get-md-gpi-main-component-list', 'mainComponentList');
            this.FETCH_DATA('/Md/get-md-gpi-damage-mechanism-list', 'damageMechanismList');
            this.FETCH_DATA('/Md/get-md-gpi-severity-list', 'severityList');
            this.FETCH_DATA('/Md/get-md-gpi-discipline-list', 'disciplineList');
            this.FETCH_DATA('/Md/get-md-gpi-repair-type-list', 'repairTypeList');
            this.FETCH_DATA('/Md/get-md-sap-main-work-ctr-list', 'mainWorkCtrList');
            this.FETCH_DATA('/Md/get-md-gpi-location-deck-list', 'deckList');
        }
    },
    data() {
        return {
            platformList: [],
            assetTypeList: [],
            mainComponentList: [],
            damageMechanismList: [],
            severityList: [],
            repairTypeList: [],
            mainWorkCtrList: [],
            deckList: [],
            disciplineList: [],
            gpiRecordList: {
                id: 0,
                is_active: true,
                id_platform: null,
                id_main_workctr: null,
                id_repair: null,
                id_repair_type: null,
                id_severity: null,
                tag_no: null,
                gpi_date: null,
                expected_finish_date: null,
                dmg_mech_findings: null,
                recommendation: null,
            },
        };
    },
    computed: {},
    methods: {
        CREATE_RECORD() {
            this.gpiRecordList.gpi_date = this.gpiRecordList.gpi_date ? moment(this.gpiRecordList.gpi_date).format("L") : '';
            this.gpiRecordList.expected_finish_date = this.gpiRecordList.expected_finish_date ? moment(this.gpiRecordList.expected_finish_date).format("L") : '';
            axios({
                method: "post",
                url: "/GpiRecord",
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: this.gpiRecordList
            })
                .then(res => {
                    if (res.status == 201) {
                        this.SET_CURRENT_VIEW(2, res.data);
                    }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => { });
        },
        SET_CURRENT_VIEW(view, data = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", true);
            if (data !== null) this.$emit('currentView', view, data);
            else this.$emit('currentView', view);
        },
        FETCH_DATA(url, targetVariable, callback) {
            this.isLoading = true;
            axios({
                method: "get",
                url: url,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        if (callback && typeof callback === 'function') {
                            callback(res.data);
                        } else {
                            this.$set(this, targetVariable, res.data);
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        INSERT_ITEM_SELECT_BOX(data, array) {
          if (!data.text) {
            data.customItem = null;
            return;
          }

          const newItem = {
            id: array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1, // Generate a unique ID
            code: data.text,
            asset_type: data.text
        };

          const productsDataSource = new DataSource({
            store: {
              data: array,
              type: 'array',
              key: 'ID',
            },
          });

          data.customItem = productsDataSource
            .store()
            .insert(newItem)
            .then(() => productsDataSource.load())
            .then(() => newItem)
            .catch((error) => {
              throw error;
            });
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
</style>