<template>
    <div>
        <div class="page-container">
            <div class="page-section">
                <button span-3 class="back" @click="SET_CURRENT_VIEW(0)">BACK</button>
                <div class="table-wrapper">
                    <div fill class="table-tabs-buttons">
                        <button 
                            v-for="(tab, index) in tabs" 
                            :key="index" 
                            :class="active_tab === tab ? 'active' : ''"
                            @click="active_tab = tab"
                        >
                            {{ tab }}
                        </button>
                    </div>
                    <div fill v-if="active_tab === tabs[1]" class="table-chart">
                        <div class="chart-container" style="border: 1px solid gray; padding: 10px;">
                            <highcharts :options="chartHighestWeightTrendingOptions"  />
                        </div>
                        <div class="chart-container" style="border: 1px solid gray; padding: 10px;">
                            <highcharts :options="chartHighestWeightLossTrendingOptions"  />
                        </div>
                        <div class="chart-container" style="border: 1px solid gray; padding: 10px;">
                            <highcharts :options="chartHighestCorrosionRateTrendingOptions" />
                        </div>
                    </div>
                    <div fill v-if="active_tab === tabs[0]">
                        <DxDataGrid 
                            id="data-grid-list" 
                            key-expr="id" 
                            :data-source="recordList" 
                            :selection="{ mode: 'single' }"
                            :hover-state-enabled="true" 
                            :allow-column-reordering="true" 
                            :show-borders="true"
                            :show-row-lines="true" 
                            :row-alternation-enabled="false" 
                            :word-wrap-enabled="true"
                            :column-auto-width="true" 
                        >
                            <DxEditing 
                                :allow-updating="false"
                                :allow-deleting="false" 
                                :allow-adding="false" 
                                :use-icons="true"
                                mode="popup" 
                            />
                            <DxFilterRow :visible="true" />
                            <DxHeaderFilter :visible="true" />
                            <DxSelection mode="single" />
                            <DxColumn 
                                data-field="install_date" 
                                caption="Install Date" 
                                :width="100" 
                                alignment="center"
                                dataType="date" 
                                format="dd MMM yyyy" 
                            />
                            <DxColumn 
                                data-field="remove_date" 
                                caption="Remove Date" 
                                :width="100" 
                                alignment="center"
                                dataType="date" 
                                format="dd MMM yyyy" 
                            />
                            <DxColumn 
                                data-field="expose_time" 
                                caption="Expose Time (days)" 
                                :width="100" 
                                alignment="center"
                            />
                            <DxColumn 
                                data-field="coupon_id" 
                                caption="Coupon ID (Highest CR.)" 
                                :width="120" 
                                alignment="center"
                            />
                            <DxColumn 
                                data-field="weight_loss" 
                                caption="Weight Loss (g)" 
                                :width="120" 
                                alignment="center"
                            />
                            <DxColumn 
                                data-field="corrosion_rate" 
                                caption="Corrosion Rate (mm/y)" 
                                :width="120" 
                                alignment="center"
                            />
                            <DxColumn 
                                data-field="max_pit_depth" 
                                caption="Max Pit Depth" 
                                :width="120" 
                                alignment="center"
                            />
                            <DxColumn 
                                data-field="pitting_rate" 
                                caption="Pitting Rate (mm/y)" 
                                :width="120" 
                                alignment="center"
                            />
                            <DxColumn 
                                data-field="probe_status" 
                                caption="Probe Status" 
                                :width="120" 
                                alignment="center"
                            />
                            <!-- <DxColumn caption="MOC" :width="80" alignment="center" cell-template="moc-cell-template" />
                            <DxColumn caption="RA" :width="80" alignment="center" cell-template="ra-cell-template" /> -->
                            <DxColumn :width="80" alignment="center" cell-template="action-cell-template" />

                            <DxToolbar>
                                <DxItem
                                    location="after"
                                    template="addButton"
                                />
                                <DxItem
                                    location="after"
                                    name="searchPanel"
                                />
                            </DxToolbar>
                            <template #addButton>
                                <DxButton
                                icon="las la-plus"
                                @click="isShow = 1"
                                hint="Add"
                                />
                            </template>

                            <DxMasterDetail 
                                :enabled="true" template="masterDetailTemplate"
                            />

                            <template #action-cell-template="{ data }">
                                <div class="action-wrapper">
                                    <div @click="() => [isShow = 2, selectedData = data.data]">
                                        <img src="/img/svg/pen-svg.svg" class="penSvg" />
                                    </div>
                                    <div @click="DELETE_RECORD(data.data.id)">
                                        <img src="/img/svg/trash-svg.svg" class="trashSvg" />
                                    </div>
                                </div>
                            </template>

                            <template #masterDetailTemplate="{ data }">
                                <DxTabPanel>
                                    <DxItem title="Coupon" template="coupon" />
                                    <DxItem title="Picture Log" template="picture-log" />
                                    <template #coupon>
                                        <CouponGrid 
                                            :monitorData="data"
                                            @action="SET_IS_SHOW"
                                            :ref="'couponGrid-' + data.data.id"
                                        />
                                    </template>
                                    <template #picture-log>
                                        <DxDataGrid 
                                            id="data-grid-list" 
                                            key-expr="id" 
                                            :ref="gridRefName" 
                                            :data-source="library"
                                            :hover-state-enabled="true" 
                                            :allow-column-reordering="true" 
                                            :show-borders="true"
                                            :show-row-lines="true" 
                                            :focused-row-enabled="false" 
                                            :row-alternation-enabled="false"
                                            @row-inserted="ADD_NEW_FILE" 
                                            @row-removed="DELETE_DOC" 
                                            @init-new-row="() => {
                                                this.file = [];
                                                this.isEdit = false;
                                            }" 
                                            @editing-start="(e) => {
                                                this.file = [];
                                                this.isEdit = true;
                                                this.dataFileTemp = e;
                                            }" 
                                            @row-removing="() => {
                                                this.isEdit = false;
                                            }" 
                                            @saved="SAVE"
                                        >
                                            <DxEditing 
                                                :allow-deleting="true" 
                                                :allow-adding="true" 
                                                :allow-updating="true" 
                                                :use-icons="true"
                                                :show-borders="true" 
                                                mode="popup"
                                            >
                                                <DxPopup
                                                    :show-title="true"
                                                    :width="650"
                                                    :height="300"
                                                    title="Attachment"
                                                />
                                                <DxForm label-location="top">
                                                    <DxItem :col-count="2" :col-span="2" :row-count="1" item-type="group">
                                                        <DxItem item-type="group">
                                                            <DxItem data-field="file" :col-span="1" />
                                                        </DxItem>
                                                        <DxItem item-type="group">
                                                            <DxItem data-field="note" :col-span="1" />
                                                        </DxItem>
                                                    </DxItem>
                                                </DxForm>
                                            </DxEditing>

                                            <DxColumn 
                                                data-field="file" 
                                                :visible="false" 
                                                edit-cell-template="insertCellTemplate" 
                                            />

                                            <DxColumn 
                                                data-field="file_name" 
                                                :allow-adding="true" 
                                                :allow-editing="true" 
                                                caption="File Name"
                                                :editor-options="fileNameInputOptions" 
                                                sort-order="desc" 
                                                :min-width="120" 
                                            />

                                            <DxColumn 
                                                data-field="note" 
                                                caption="Note" 
                                                :min-width="120" 
                                                alignment="left" 
                                            />

                                            <template #dateHeader>
                                                <div>Uploaded<br />Date</div>
                                            </template>

                                            <DxColumn
                                                data-field="file_path" 
                                                cell-template="pathCellTemplate" 
                                                caption="Attachment"
                                                :width="120" 
                                                alignment="center" 
                                            />

                                            <template #insertCellTemplate>
                                                <div class="widget-container">
                                                    <DxFileUploader 
                                                        id="file-uploader" 
                                                        :multiple="false" 
                                                        upload-mode="useForm"
                                                        @value-changed="VALUE_CHANGE" 
                                                        :visible="true" 
                                                    />
                                                </div>
                                            </template>

                                            <!-- <template #noteCellTemplate="{ data }">
                                                <div>
                                                    <DxTextArea :height="100" :value="data.data.value" placeholder="Enter Note" />
                                                </div>
                                            </template> -->

                                            <template #pathCellTemplate="{ data }">
                                                <div>
                                                    <button class="library-btn-download" @click="DOWNLOAD(data.value, data.data.file_name)">
                                                        <i class="fa-regular fa-circle-down"></i>
                                                        DOWNLOAD</button>
                                                </div>
                                            </template>

                                            <DxToolbar>
                                                <DxItem location="after" template="addButton" />
                                                <DxItem location="after" name="searchPanel" />
                                            </DxToolbar>
                                            <template #addButton>
                                                <DxButton icon="las la-plus" @click="ADD_ROW" hint="Add" />
                                            </template>

                                            <DxHeaderFilter :visible="true" />
                                            <!-- <DxFilterRow :visible="false" /> -->
                                            <DxScrolling mode="standard" />
                                            <DxSearchPanel :visible="true" />
                                            <DxPaging :page-size="10" :page-index="0" />
                                            <DxPager :visible="false" :show-page-size-selector="true" :allowed-page-sizes="[5, 10, 'all']"
                                                :show-navigation-buttons="true" :show-info="true" info-text="Page {0} of {1} ({2} items)" />
                                            <DxExport :enabled="false" />
                                        </DxDataGrid>
                                    </template>
                                </DxTabPanel>
                            </template>

                            <!-- Configuration goes here -->
                            <!-- <DxFilterRow :visible="true" /> -->
                            <DxScrolling mode="standard" />
                            <DxSearchPanel :visible="true" />
                            <DxPaging :page-size="5" :page-index="0" />
                            <DxPager :show-page-size-selector="true" :allowed-page-sizes="[5, 10, 25]"
                                :show-navigation-buttons="true" :show-info="false" info-text="Page {0} of {1} ({2} items)" />
                            <DxExport :enabled="false" />
                        </DxDataGrid>
                    </div>
                    <div fill v-if="active_tab === tabs[2]" class="table-chart">
                        <div>
                            <DxDataGrid 
                                id="data-grid-list-library" 
                                key-expr="id" 
                                :data-source="libraryList"
                                :selection="{ mode: 'single' }" 
                                :hover-state-enabled="true" 
                                :allow-column-reordering="true"
                                :show-borders="true" 
                                :show-row-lines="true" 
                                :row-alternation-enabled="false"
                                :word-wrap-enabled="true" 
                                :column-auto-width="true"
                                @init-new-row="SET_CURRENT_VIEW(1)"
                                >
                                <DxEditing 
                                    :allow-updating="true" 
                                    :allow-deleting="true" 
                                    :allow-adding="false" 
                                    :use-icons="true"
                                    mode="row" 
                                />
                                <DxColumn 
                                    data-field="year" 
                                    caption="Year" 
                                    :width="100" 
                                    alignment="center"
                                />
                                <DxColumn
                                    data-field="period" 
                                    caption="Period" 
                                    :width="100" 
                                    alignment="center" 
                                />
                                <DxColumn 
                                    data-field="library" 
                                    caption="Library" 
                                    :width="100" 
                                    alignment="center"
                                />
                            </DxDataGrid>
                        </div>
                        <div class="chart-container">
                            <highcharts :options="chartOptions"  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AddMonitoringPopup 
            v-if="isShow === 1" 
            @popup="CLOSE_POPUP" 
            :id_tag="id_tag"
        />
        <EditMonitoringPopup 
            v-if="isShow === 2" 
            @popup="CLOSE_POPUP"
            :selectedData="selectedData"
        />
        <AddCouponPopup 
            v-if="isShow === 3" 
            @popup="COUPON_POPUP"
            :id_record="id_record"
        />
        <EditCouponPopup 
            v-if="isShow === 4" 
            @popup="COUPON_POPUP" 
            :selectedData="selectedCouponData"
        />
    </div>
</template>

<script>
import { GET_DATA, PUT_DATA, POST_DATA, DELETE_DATA } from "/axios.js";
// import moment from "moment";
import CouponGrid from "./Coupon.vue"
import AddMonitoringPopup from "./AddMonitoring.vue"
import EditMonitoringPopup from "./EditMonitoring.vue"
import AddCouponPopup from "./AddCoupon.vue"
import EditCouponPopup from "./EditCoupon.vue"
import "devextreme/dist/css/dx.light.css";
// import DxSelectBox from 'devextreme-vue/select-box';
// import DxTextBox from 'devextreme-vue/text-box';
// import DxDateBox from 'devextreme-vue/date-box';
import DxButton from "devextreme-vue/button";
import { DxItem } from "devextreme-vue/form";
import { DxTabPanel } from "devextreme-vue/tab-panel";
import { DxFileUploader } from 'devextreme-vue/file-uploader';
import {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    DxToolbar,
    DxHeaderFilter,
    DxSelection,
    DxEditing,
    DxFilterRow,
    // DxButton,
    // DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    DxForm,
    DxMasterDetail,
    DxPopup
} from "devextreme-vue/data-grid";

//Structures

export default {
    name: "corrosion-coupon-detail",
    props: {
        info: Object,
    },
    components: {
        DxDataGrid,
        DxSearchPanel,
        DxPaging,
        DxPager,
        DxScrolling,
        DxColumn,
        DxExport,
        DxToolbar,
        DxHeaderFilter,
        DxSelection,
        DxForm,
        DxItem,
        DxEditing,
        DxFilterRow,
        DxButton,
        // DxAddRowButton,
        // DxLookup,
        // DxRequiredRule,
        // DxFormItem,
        // DxSelectBox,
        // DxTextBox,
        // DxDateBox,
        DxMasterDetail,
        DxTabPanel,
        DxFileUploader,
        DxPopup,
        CouponGrid,
        AddMonitoringPopup,
        EditMonitoringPopup,
        AddCouponPopup,
        EditCouponPopup,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "CORROSION COUPON: " + this.info.tag_no,
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            GET_DATA(this, '/CMCorrosionCouponMonitorRecord/ByTag/' + this.id_tag, 'recordList');
            this.FETCH_LIBRARY();
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
                        text: this.active_tab
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Trend',
                    data: [12.3, 9.5, 4, 18.4, 6, 3, 111, 9.5]
                }]
            },
            this.chartHighestWeightTrendingOptions = {
                title: {
                    text: 'Highest Weight Trending Results Chart',
                    align: 'center'
                },
                xAxis: {
                    categories: ['25 Apr 2021', '21 Dec 2021']
                },
                yAxis: {
                    title: {
                        text: 'Weight (g)'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Initial Weight',
                    data: [37.8504, 37.0381],
                    marker: {
                        symbol: 'circle'
                    },
                    color: '#3F2DCA',
                },{
                    name: 'Final Weight',
                    data: [37.7437, null],
                    marker: {
                        symbol: 'circle'
                    },
                    color: '#2D9BCA'
                },]
            },
            this.chartHighestWeightLossTrendingOptions = {
                title: {
                    text: 'Highest Weight Loss Trending Results Chart',
                    align: 'center'
                },
                xAxis: {
                    categories: ['25 Apr 2021', '21 Dec 2021']
                },
                yAxis: {
                    title: {
                        text: 'Weight (g)'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Weight Loss',
                    data: [0.1067],
                    marker: {
                        symbol: 'circle'
                    },
                    color: '#3F2DCA',
                },]
            },
            this.chartHighestCorrosionRateTrendingOptions = {
                title: {
                    text: 'Highest Corrosion Rate Trending Chart',
                    align: 'center'
                },
                xAxis: {
                    categories: ['25 Apr 2021', '21 Dec 2021']
                },
                yAxis: {
                    title: {
                        text: 'Corrosion Rate (mm/yr)'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Corrosion Rate',
                    data: [0.0061],
                    marker: {
                        symbol: 'circle'
                    },
                    color: '#3F2DCA',
                },]
            }

        }
    },
    data() {
        return {
            recordList: [],
            libraryList: [],
            chartOptions: {},
            chartHighestWeightTrendingOptions: {},
            chartHighestWeightLossTrendingOptions: {},
            chartHighestCorrosionRateTrendingOptions: {},
            tabs: ['Monitoring Record','Summary Dashboard'],
            active_tab: 'Monitoring Record',
            isShow: 0,
            id_record: 0,
            selectedCouponData: null,
            id_tag: this.info.id_tag,
            library: [],
            file: [],
            gridRefName: "grid-library",
            fileNameInputOptions: { placeholder: "File Name" },
            dataFileTemp: "",
            isEdit: false
        };
    },
    computed: {},
    methods: {
        DELETE_RECORD(id) {
            this.$ons.notification.confirm("Confirm Delete This Row?").then((res) => {
                if (res == 1) {
                    DELETE_DATA(`/CMCorrosionCouponMonitorRecord/${id}`, () => { GET_DATA(this, '/CMCorrosionCouponMonitorRecord/ByTag/' + this.id_tag, 'recordList'); });
                }
            })
        },
        SET_IS_SHOW(val, id, data) {
            console.log('val', val);
            console.log('id', id);
            if (val) this.isShow = val;
            if (id) this.id_record = id;
            if (data) this.selectedCouponData = data;
        },
        SET_CURRENT_VIEW(view, data = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", true);
            if (data !== null) this.$emit('currentView', view, data);
            else this.$emit('currentView', view);
        },
        CLOSE_POPUP() {
            this.isShow = 0;
            GET_DATA(this, '/CMCorrosionCouponMonitorRecord/ByTag/' + this.id_tag, 'recordList');
        },
        COUPON_POPUP(id_record) {
            this.isShow = 0;
            console.log('ffffffffff', this.$refs);
            // this.$refs.couponGrid.FETCH_COUPON(id_record);
            // this.$refs.couponGrid.forEach(child => {
            //     child.FETCH_COUPON();
            // });
            const refName = 'couponGrid-' + id_record;
            const detailComponent = this.$refs[refName];
            if (detailComponent) {
                detailComponent.FETCH_COUPON(id_record);
            }
        },
        FETCH_LIBRARY() {
            GET_DATA(this, `/CMCorrosionCouponPictureLog/ByTag/${this.id_record}`, 'library');
        },
        ADD_NEW_FILE(e) {
            var formData = new FormData();
            formData.append("id_record", this.id_record);
            formData.append("file", this.file);
            formData.append("note", e.data.note);
            if (this.file.length == 0)
                return this.$ons.notification.alert("Please select file").then(res => {
                    if (res == 0) {
                        this.FETCH_LIBRARY();
                    }
                });
            POST_DATA('/CMCorrosionCouponPictureLog', formData, true, () => { this.FETCH_LIBRARY(); });
        },
        UPDATE_DOC(e) {
            console.log("e.data", e.data);
            var formData = new FormData();
            formData.append("id", e.data.id);
            formData.append("id_record", e.data.id_record);
            formData.append("file", this.file ?? "");
            formData.append("note", e.data.note);
            PUT_DATA(`/CMCorrosionCouponPictureLog/${e.data.id}`, formData, true, () => { this.FETCH_LIBRARY(); });
        },
        VALUE_CHANGE(e) {
            console.log(e);
            console.log(e.value[0].name);
            let reader = new FileReader();
            reader.readAsDataURL(e.value[0]);
            reader.onload = () => {};
            this.file = e.value[0];
        },
        SAVE(e) {
            console.log('save', e, this.isEdit);
            console.log(this.file);
            if((e.changes.length > 0 || this.file.size > 0) && this.isEdit) {
                console.log('save');
                this.UPDATE_DOC(this.dataFileTemp);
            }
        },
        DOWNLOAD(p,n) {
            console.log(this.baseURL + p);
            const url = this.baseURL + p;
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", n);
            link.setAttribute("target", "_blank");
            document.body.appendChild(link);
            link.click();
        },
        DELETE_DOC(e) {
            const id = e.data.id;
            DELETE_DATA(`/CMCorrosionCouponPictureLog/${id}`, () => { this.FETCH_LIBRARY(); });
        },
        ADD_ROW() {
            var grid = this.$refs[this.gridRefName].instance;
            grid.addRow();
            grid.deselectAll();
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
  // overflow-y: hidden;
}

.page-section {
  padding: 20px;
  overflow-y: auto;
  height: calc(100% - 270px);
  grid-row: span 2;
}

.back {
    padding: 10px 40px;
    background-color: white;
    border: solid 1px gray;
    font-weight: 600;
    font-size: 12px;
    transition: 1s;
    cursor: pointer;
    margin-bottom: 15px;
    width: 130px;
}

.table-wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
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

    .table-tabs-buttons {
        display: flex;
        flex-direction: row;
        gap: 5px;

        button {
            border-radius: 0;
            padding: 10px;
            width: 130px;
        }
        .active {
            color: white;
            background-color: $web-theme-color-secondary;
            border: solid 1px $web-theme-color-secondary;
        }
    }

    .table-chart {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
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
    .library-btn-download {
        font-size: 12px;
        font-weight: 500;
        border-radius: 20px;
        border: 1px solid gray;
        padding: 8px !important;
        color: #3c3c3c;
        background: transparent;

        &:hover {
          transition: 0.4s;
          background: #d8d8d8;
        }
    }
}
</style>