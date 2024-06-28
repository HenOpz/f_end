<template>
    <div class="page-container">
        <div class="page-section">
            <div class="table-wrapper">
                <div style="display: flex; gap: 30px;">
                    <h5 style="margin: 0;">Platform: ADA</h5>
                    <h5 style="margin: 0;">Pipeline: 18-ADA-MTA</h5>
                </div>
                
                <DxDataGrid 
                    id="data-grid-list" 
                    key-expr="id" 
                    :data-source="piggingList"
                    :selection="{ mode: 'single' }" 
                    :hover-state-enabled="true" 
                    :allow-column-reordering="true"
                    :show-borders="true" 
                    :show-row-lines="true" 
                    :row-alternation-enabled="false"
                    :word-wrap-enabled="true" 
                    :column-auto-width="true"
                    >
                    <DxHeaderFilter :visible="true" />
                    <DxEditing 
                        :allow-updating="true" 
                        :allow-deleting="true" 
                        :allow-adding="true" 
                        :use-icons="true"
                        mode="row" 
                    />
                    <DxColumn 
                        data-field="date" 
                        caption="Date" 
                        :width="100" 
                        alignment="center"
                        dataType="date" 
                        format="dd MMM yyyy"
                        :editor-options="{ placeholder: 'Select' }"
                    />
                    <DxColumn
                        data-field="report_no" 
                        caption="Report No." 
                        :width="100" 
                        alignment="center" 
                        :editor-options="{ placeholder: 'Report No' }"
                    />
                    <DxColumn 
                        data-field="pig_type" 
                        caption="Pig Type" 
                        :width="100" 
                        alignment="center"
                        :editor-options="{ placeholder: 'Type' }"
                    />
                    <DxColumn 
                        data-field="well_flowline" 
                        caption="Well Flowline" 
                        :width="100" 
                        alignment="center"
                        :editor-options="{ placeholder: 'Well Flowline' }"
                    />
                    <DxColumn 
                        data-field="gas_rate" 
                        caption="Gas Rate (mmscfd)" 
                        :width="100" 
                        alignment="center"
                        :editor-options="{ placeholder: 'Gas Rate' }"
                    />
                    <DxColumn 
                        data-field="sand" 
                        caption="Sand (kg)" 
                        :width="100" 
                        alignment="center"
                        :editor-options="{ placeholder: 'Sand' }"
                    />
                    <DxColumn 
                        data-field="sludge" 
                        caption="Sludge (kg)" 
                        :width="100" 
                        alignment="center"
                        :editor-options="{ placeholder: 'Sludge' }"
                    />
                    <DxColumn 
                        data-field="hg" 
                        caption="Hg (kg)" 
                        :width="100" 
                        alignment="center"
                        :editor-options="{ placeholder: 'Hg' }"
                    />
                    <DxColumn 
                        data-field="duration" 
                        caption="Duration (hrs)" 
                        :width="100" 
                        alignment="center"
                        :editor-options="{ placeholder: 'Duration' }"
                    />
                    <DxScrolling mode="standard" />
                    <DxSearchPanel :visible="true" />
                    <DxPaging :page-size="10" :page-index="0" />
                    <DxPager 
                        :show-page-size-selector="true" 
                        :allowed-page-sizes="[5, 10, 20]" 
                        :show-navigation-buttons="true"
                        :show-info="true" 
                        info-text="Page {0} of {1} ({2} items)" 
                    />
                    <DxExport :enabled="false" />
                </DxDataGrid>

                <div class="chart-container">
                    <highcharts :options="chartOptions"  />
                </div>

                <button @click="$emit('popup')">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import { axios } from "/axios.js";
import moment from "moment";
import "devextreme/dist/css/dx.light.css";
// import { Workbook } from "exceljs";
// import saveAs from "file-saver";
// import { exportDataGrid } from "devextreme/excel_exporter";


import exportingInit from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
exportingInit(Highcharts);
offlineExporting(Highcharts);

import {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    DxHeaderFilter,
    DxEditing,
} from "devextreme-vue/data-grid";

export default {
    name: "inspection-record",
    props: {
        id_record: Number,
    },
    components: {
        DxDataGrid,
        DxSearchPanel,
        DxPaging,
        DxPager,
        DxScrolling,
        DxColumn,
        DxExport,
        DxHeaderFilter,
        DxEditing,
        highcharts: Chart,
    },
    created() {
        if (this.$store.state.status.server == true) {
            this.chartOptions = {
                title: {
                    text: 'Trending Results Chart',
                    align: 'center'
                },
                xAxis: {
                    categories: ['2020 H1', '2020 H2', '2021 H1', '2021 H2', '2022 H1', '2022 H2', '2023 H1', '2023 H2']
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    type: 'column',
                    name: 'Gas rate (mmscfd)',
                    data: [59, 83, 65, 228, 184]
                }, {
                    type: 'column',
                    name: 'Sand (kg)',
                    data: [24, 79, 72, 240, 167]
                }, {
                    type: 'column',
                    name: 'Sludge (kg)',
                    data: [58, 88, 75, 250, 176]
                }, {
                    type: 'column',
                    name: 'Kg (kg)',
                    data: [58, 88, 75, 250, 176]
                }]
            }
        }
    },
    data() {
        return {
            piggingList: [
                {
                    id: 1,
                    date: '8 Aug 2023',
                    report_no: 'Pigging-2023/xx',
                    pig_type: 'Splash',
                    well_flowline: 'ADA-01/02',
                    gas_rate: '12.00',
                    sand: '20.00',
                    sludge: '0.00',
                    hg: '1.00',
                    duration: '01:44'
                },
                {
                    id: 2,
                    date: '24 Nov 2022',
                    report_no: 'Pigging-2022/xx',
                    pig_type: 'Splash',
                    well_flowline: 'ADA-01',
                    gas_rate: '12.00',
                    sand: '80.00',
                    sludge: '0.00',
                    hg: '0.00',
                    duration: '01:23'
                },
                {
                    id: 3,
                    date: '8 Sep 2022',
                    report_no: 'Pigging-2022/xx',
                    pig_type: 'Splash',
                    well_flowline: 'ADA-03/05',
                    gas_rate: '12.00',
                    sand: '0.00',
                    sludge: '0.00',
                    hg: '0.00',
                    duration: '01:04'
                }
            ],
            isShow: 0,
            chartOptions: {},
            dataGridAttributes: {
                class: "data-grid"
            },
        };
    },
    computed: {},
    methods: {
        FETCH_PIGGING() {
            this.isLoading = true;
            axios({
                method: "get",
                url: "/PiggingOperation/" + this.id_record,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.piggingList = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        UPDATE_RECORD() {
            if (this.piggingList.date !== null)
                this.piggingList.date = moment(this.piggingList.date).format("L");
            axios({
                method: "put",
                url: "/PiggingOperation/" + this.mocList.id,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: this.piggingList
            })
                .then(res => {
                    if (res.status == 204) {
                        this.FETCH_PIGGING();
                    }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => { });
        },
        DELETE_RECORD() {
            axios({
                method: "delete",
                url: "/PiggingOperation/delete-pigging-operation?id=" + this.piggingList.id,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 204) {
                        this.FETCH_PIGGING(0);
                    }
                })
                .catch(error => {
                    this.$ons.notification.alert(
                        error.code + " " + error.response.status + " " + error.message
                    );
                })
                .finally(() => { });
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
  width: 1000px;
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
    grid-template-columns: repeat(1, 1fr);
    gap: 15px;

    .table-tabs-buttons {
        display: flex;
        flex-direction: row;
        gap: 5px;

        button {
            border-radius: 0;
            padding: 5px;
            width: 120px;
        }
        .active {
            color: white;
             background-color: $web-theme-color-secondary;
        }
    }

    .table-chart {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 5px;
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