<template>
    <div>
        <div class="page-container">
            <div class="page-section">
                <DxDataGrid
                id="data-grid-list"
                key-expr="id_tag"
                :ref="gridRefName"
                :data-source="waterAnalysisList"
                :hover-state-enabled="true"
                :allow-column-reordering="true"
                :show-borders="true"
                :show-row-lines="true"
                :row-alternation-enabled="false"
                :column-hiding-enabled="false"
                :word-wrap-enabled="true"
                :column-min-width="50"
                :column-auto-width="true"
                @cell-prepared="onCellPrepared"
                >
                <DxEditing
                    :allow-updating="false"
                    :allow-deleting="false"
                    :allow-adding="false"
                    :use-icons="true"
                    mode="form"
                >
                    
                </DxEditing>
                <DxFilterRow :visible="true" />
                <DxHeaderFilter :visible="true" />
                
                <DxColumn 
                    data-field="id_platform"
                    caption="Platform" 
                    alignment="center" 
                    :width="90"
                >
                    <DxLookup :data-source="platformList" display-expr="code_name" value-expr="id" />
                </DxColumn>
                <DxColumn 
                    data-field="tag_no" 
                    caption="Tag No." 
                    alignment="left"
                    :width="110"
                >
                </DxColumn>
                <!-- <DxColumn 
                    data-field="desc" 
                    caption="Description" 
                    alignment="left"  
                    :min-width="120"
                >
                </DxColumn> -->
                <DxColumn 
                    data-field="ph_lastest_period" 
                    caption="Latest Period" 
                    alignment="center"
                    :width="100"
                />
                <DxColumn 
                    data-field="ph_value" 
                    caption="pH" 
                    alignment="center"
                    :width="80"
                />
                <DxColumn 
                    data-field="co2_value" 
                    caption="CO2 (ppb)" 
                    alignment="center"
                    :width="90"
                />
                <DxColumn 
                    data-field="o2_value" 
                    caption="Dissolved O2 (ppb)" 
                    alignment="center"
                    :width="100"
                />
                <DxColumn 
                    data-field="ion_value" 
                    caption="Fe Count" 
                    alignment="center"
                    :width="90"
                />
                
                <DxColumn caption="Hydro Dynamic">
                    <DxColumn 
                        data-field="hydro_dynamic_lastest_date" 
                        caption="Latest Date" 
                        alignment="center"
                        :width="100"
                    />
                    <DxColumn 
                        data-field="hydro_dynamic_cr_90_value" 
                        caption="CR 90% (mm/yr)" 
                        alignment="center"
                        :width="90"
                    />
                    <DxColumn 
                        data-field="hydro_dynamic_cr_95_value" 
                        caption="CR 95% (mm/yr)" 
                        alignment="center"
                        :width="90"
                    />
                    <DxColumn 
                        data-field="hydro_dynamic_cr_99_value" 
                        caption="CR 99% (mm/yr)" 
                        alignment="center"
                        :width="90"
                    />
                    <DxColumn 
                        data-field="hydro_dynamic_not_injected_value" 
                        caption="CR Not Injected (mm/yr)" 
                        alignment="center"
                        :width="90"
                    />
                </DxColumn>
                <!-- <DxColumn 
                    data-field="next_due_date" 
                    caption="Next Due Date" 
                    alignment="center"
                    :width="150" 
                /> -->
                <DxColumn :width="40" alignment="center" cell-template="action-cell-template" />
        
                <template #action-cell-template="{ data }">
                    <div class="action-wrapper">
                        <div @click="() => [isShow = 2, selectedData = data.data]">
                            <img src="/img/svg/magnifying-glass-svg.svg" class="penSvg" />
                        </div>
                        <!-- <div @click="DELETE_RECORD(data)">
                            <img src="/img/svg/trash-svg.svg" class="trashSvg" />
                        </div> -->
                    </div>
                </template>
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
                    @click="CREATE_ROW"
                    hint="Add"
                    />
                </template>
                
                
                <!-- <DxFilterRow :visible="true" /> -->
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
                <br>
                <div
                    class="table-header-toolbar left"
                    style="width: calc(100% - 231px)"
                >
                    <label class="hd">Attachment</label>
                </div>
                <DxDataGrid 
                    id="data-grid-list" 
                    key-expr="id" 
                    :ref="gridRefNameAttachment" 
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

                    <DxColumn 
                        data-field="file_type" 
                        caption="Extension" 
                        :width="120" 
                        alignment="center" 
                    />

                    <DxColumn 
                        data-field="created_date" 
                        caption="Uploaded Date" 
                        :width="120" 
                        alignment="center"
                        format="dd MMM yyyy" 
                        data-type="date" 
                        header-cell-template="dateHeader"
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
            </div>
        </div>
        <AddTagRegistration 
            v-if="isShow === 1" 
            @popup="POPUP_CALL"
            :tagList="waterAnalysisList" 
        />
        <EditTagRegistration 
            v-if="isShow === 2" 
            @popup="POPUP_CALL" 
            :dataInfo="selectedData" 
        />
    </div>
</template> 

<script>
import { GET_DATA, PUT_DATA, POST_DATA, DELETE_DATA } from "/axios.js";
// import moment from "moment";
import AddTagRegistration from "./Add.vue"
import EditTagRegistration from "./Edit.vue"
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import { DxItem } from "devextreme-vue/form";
import DxButton from "devextreme-vue/button";
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
    DxEditing,
    DxLookup,
    DxFilterRow,
    DxHeaderFilter,
    DxForm,
    DxPopup
    // DxButton,
    // DxFormItem,
} from "devextreme-vue/data-grid";

export default {
    name: "water-analysis-list",
    components: {
        DxDataGrid,
        DxSearchPanel,
        DxPaging,
        DxPager,
        DxScrolling,
        DxColumn,
        DxExport,
        DxToolbar,
        DxForm,
        DxItem,
        DxEditing,
        DxLookup,
        DxFilterRow,
        DxHeaderFilter,
        DxButton,
        DxPopup,
        DxFileUploader,
        // DXButton,
        // DxFormItem,
        // penSvg,
        // trashSvg,
        AddTagRegistration,
        EditTagRegistration
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "WATER ANALYSIS",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.system = this.$route.fullPath.split('/')[2];
            this.isCoolingMedium = this.CHECK_SYSTEM('cooling-medium');
            this.isProducedWater = this.CHECK_SYSTEM('produced-water');
            this.isSeaWater = this.CHECK_SYSTEM('sea-water');
            this.isPipeline = this.CHECK_SYSTEM('pipeline');
            GET_DATA(this, '/Md/get-md-cm-water-analysis-status-list/', 'dissolvedStatusList');
            GET_DATA(this, '/Md/get-md-platform-list', 'platformList');
            GET_DATA(this, this.listApiUrl, 'waterAnalysisList');
            this.FETCH_LIBRARY();
        }
    },
    data() {
        return {
            platformList: [],
            waterAnalysisList: [],
            dissolvedStatusList: [],
            isShow: 0,
            system: null,
            gridRefName: "grid",
            cellColors: {
                green: '#34eb74',
                yellow: '#FFDB58',
                red: '#eb4034',
            },
            isCoolingMedium: false,
            isProducedWater: false,
            isSeaWater: false,
            isPipeline: false,
            library: [],
            file: [],
            gridRefNameAttachment: "grid-library",
            fileNameInputOptions: { placeholder: "File Name" },
            dataFileTemp: "",
            isEdit: false,
        };
    },
    computed: {
        baseURL() {
            var mode = this.$store.state.mode;
            if (mode == "dev") return this.$store.state.modeURL.dev;
            else if (mode == "prod") return this.$store.state.modeURL.prod;
            else return console.log("develpment mode set up incorrect.");
        },
        SYSTEM_ID() {
            if(this.system == 'cooling-medium') return 1; 
            else if(this.system == 'produced-water') return 2; 
            else if(this.system == 'sea-water') return 3; 
            else if(this.system == 'pipeline') return 4;
            else return 0;
        },
        listApiUrl() {
            if(this.system == 'cooling-medium') return '/CMInfo/get-tag-cooling-medium-view-in-water-analysis'; 
            else if(this.system == 'produced-water') return '/CMInfo/get-tag-produced-water-view-in-water-analysis'; 
            else if(this.system == 'sea-water') return '/CMInfo/get-tag-sea-water-view-in-water-analysis'; 
            else if(this.system == 'pipeline') return '/CMInfo/get-tag-pipeline-view-in-water-analysis';
            else return '';
        },
    },
    methods: {
        EXPORT_DATA(e) {
            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet("Projects");
            exportDataGrid({
                worksheet: worksheet,
                component: e.component
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(
                        new Blob([buffer], { type: "application/octet-stream" }),
                        "CM-WATER-ANALYSIS.xlsx"
                    );
                });
            });
            e.cancel = true;
        },
        POPUP_CALL() {
            this.isShow = 0;
            GET_DATA(this, this.listApiUrl, 'waterAnalysisList');
        },
        CHECK_SYSTEM(e) {
            if (this.system === e) return true;
            else return false;
        },
        onCellPrepared(e) {
            if(e.rowType === "data" && e.column.dataField === "o2_value") {
                e.cellElement.style.backgroundColor = '#fff';
            }
        },
        CREATE_ROW() {
            this.isShow = 1
        },
        FETCH_LIBRARY() {
            GET_DATA(this, `/CMWaterAnalysisLibrary`, 'library');
        },
        ADD_NEW_FILE(e) {
            var formData = new FormData();
            formData.append("id_system", this.SYSTEM_ID);
            formData.append("file", this.file);
            formData.append("note", e.data.note);
            if (this.file.length == 0)
                return this.$ons.notification.alert("Please select file").then(res => {
                    if (res == 0) {
                        this.FETCH_LIBRARY();
                    }
                });
            POST_DATA('/CMWaterAnalysisLibrary', formData, true, () => { this.FETCH_LIBRARY(); });
        },
        UPDATE_DOC(e) {
            console.log("e.data", e.data);
            var formData = new FormData();
            formData.append("id", e.data.id);
            formData.append("id_system", this.SYSTEM_ID);
            formData.append("file", this.file ?? "");
            formData.append("note", e.data.note);
            PUT_DATA(`/CMWaterAnalysisLibrary/${e.data.id}`, formData, true, () => { this.FETCH_LIBRARY(); });
        },
        VALUE_CHANGE(e) {
            //console.log("fileReader e data:");
            console.log(e);
            console.log(e.value[0].name);
            let reader = new FileReader();
            reader.readAsDataURL(e.value[0]);
            reader.onload = () => {
                // this function is for showing the image preview on upload
            };
            this.file = e.value[0];
        },
        SAVE(e) {
            console.log(e);
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
            DELETE_DATA(`/CMWaterAnalysisLibrary/${id}`, () => { this.FETCH_LIBRARY(); });
        },
        ADD_ROW() {
            var grid = this.$refs[this.gridRefNameAttachment].instance;
            grid.addRow();
            grid.deselectAll();
        },
    }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.block {
    display: flex;
    margin: 0 auto;
    width: 22px;
    height: 22px;
}

.column-template {
    display: flex;
    gap: 10px;
    justify-content: space-between;

    svg {
        width: 25px;
        transition: 0.2s;
    }

    svg:last-child {
        width: 25px;
        padding: 5px;
        background-color: blue;
        fill: white;
        border-radius: 5px;
    }

    svg:hover {
        transform: scale(1.1);
    }
}

.listSvg {
    width: 25px;
    padding: 5px;
    background-color: orange;
    fill: white;
    transition: 0.2s;
    border-radius: 5px;
}

.listSvg:hover {
    transform: scale(1.1);
}

.page-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 51px calc(100vh - 95px);
    transition: all 0.3s;
    overflow-y: hidden;
}

.page-section {
    padding: 20px 40px;
    height: calc(100vh - 235px);
    overflow-y: auto;
    grid-row: span 2;
}

.page-section:last-child {
    padding-bottom: 20px;
}

.hd {
    line-height: 36px;
    user-select: text;
    cursor: text;
    font-size: 16px;
    font-weight: 600;
    color: $dexon-primary-blue;
}

</style>