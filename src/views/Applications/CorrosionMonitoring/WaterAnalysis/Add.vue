<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <h3 fill style="margin-bottom: 0; margin-top: 0;">New Result</h3>

                <div span-2 class="input-wrapper">
                    <span>Tag Number</span>
                    <div class="input">
                        <DxSelectBox 
                            :items="tagList" 
                            value-expr="id" 
                            display-expr="tag_no"
                            placeholder="Select Tag Number" 
                            v-model="data.id_tag" 
                        />
                    </div>
                </div>

                <div span-2 class="input-wrapper">
                    <span>Year</span>
                    <div class="input">
                        <DxSelectBox 
                            :items="yearList" 
                            placeholder="Select Year" 
                            v-model="data.year" 
                        />
                    </div>
                </div>

                <div span-2 class="input-wrapper">
                    <span>Period</span>
                    <div class="input">
                        <DxSelectBox 
                            :items="periodList" 
                            placeholder="Select Period" 
                            v-model="data.period" 
                        />
                    </div>
                </div>

                <div span-2 class="input-wrapper">
                    <span>pH</span>
                    <div class="input">
                        <DxNumberBox 
                            placeholder="Enter pH" 
                            v-model="data.ph_val" 
                        />
                    </div>
                </div>

                <div span-2 class="input-wrapper">
                    <span>Dissolved O2 (ppb)</span>
                    <div class="input">
                        <DxNumberBox 
                            placeholder="Enter Dissolved O2" 
                            v-model="data.dissolved_o2_val" 
                        />
                    </div>
                </div>

                <div span-2 class="input-wrapper">
                    <span>Ion Count</span>
                    <div class="input">
                        <DxNumberBox 
                            placeholder="Enter Ion Count" 
                            v-model="data.ion_count" 
                        />
                    </div>
                </div>


                <button class="create" @click="CREATE_RECORD">Create</button>
                <button @click="$emit('popup')">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import { axios } from "/axios.js";
import "devextreme/dist/css/dx.light.css";
import DxSelectBox from 'devextreme-vue/select-box';
// import DxTextBox from 'devextreme-vue/text-box';
import DxNumberBox from 'devextreme-vue/number-box';

export default {
    name: "add-water-analysis-result",
    components: {
        DxSelectBox,
        // DxTextBox,
        DxNumberBox,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "WATER ANALYSIS",
            subpageInnerName: null,
        });
    },
    data() {
        return {
            data: {
                id: 0,
                id_tag: null,
                year: null,
                period: null,
                ph_val: null,
                dissolved_o2_val: null,
                ion_count: null,
                created_by: null,
                updated_by: null,
                id_status: null,
            },
            yearList: [2022,2023,2024],
            periodList: ['H1','H2'],
        };
    },
    props: {
        tagList: Array,
    },
    computed: {},
    methods: {
        CREATE_RECORD() {
            const user = JSON.parse(localStorage.getItem("user"));
            this.data.created_by = user.id;
            this.data.updated_by = user.id;
            if( this.data.id_tag &&
                this.data.year && 
                this.data.period
            ){
                this.POST_DATA('/CMWaterAnalysisPH');
                this.POST_DATA('/CMWaterAnalysisDissolvedO2');
                this.POST_DATA('/CMWaterAnalysisIonCount');
                this.$emit('popup');
            }
        },
        POST_DATA(url) {
            this.isLoading = true;
            axios({
                method: "post",
                url: url,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: this.data,
            })
                .then(res => {
                    if (res.status == 201 && res.data) {
                        console.log(url, res);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
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
    grid-template-columns: repeat(6, 1fr);
    gap: 15px;

    *[span-2] {
        grid-column: span 2;
    }

    *[fill] {
        grid-column: span 6;
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
        grid-column: span 3;
    }

    .create {
        color: white;
        background-color: $web-theme-color-secondary;
        border: solid 1px $web-theme-color-secondary;
    }
}
</style>