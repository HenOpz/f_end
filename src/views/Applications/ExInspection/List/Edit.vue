<template>
  <div class="page-container">
    <div class="action-bar">
      <button class="back" @click="SET_CURRENT_VIEW(0)">
          <i class="fas fa-chevron-left"></i> BACK
      </button>
      <div class="wrapper">
        <div class="switch">
          <div>
            <v-ons-switch 
              style="padding: 0 !important; 
              border: 0;"
              input-id="switch1"
              v-model="btn_state"
            />
          </div>

          <span>EDIT MODE</span>
        </div>

        <!-- <div class="switch">
        <DxSwitch :value="false"/>
        <span>EDIT MODE</span>
      </div> -->
        <button @click="UPDATE_RECORD" class="submit">
            <i class="fas fa-save"></i> SUBMIT
        </button>
        <button @click="DELETE_RECORD" class="delete">
            <i class="fas fa-trash-alt"></i> DELETE
        </button>
      </div>
    </div>
    <div class="page-section">
      <div class="table-wrapper">
        <div fill class="header">
          <h3 fill style="margin: 0;">Update Ex-Inspection List</h3>
          <hr fill>
        </div>

        <div class="input-wrapper">
          <span>Tag No.</span>
          <div class="text">
            <DxTextBox
              placeholder="Enter Tag No."
              v-model="inspRecordList.tag_no"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Equipment Description</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Equipment Description"
              v-model="inspRecordList.equip_desc"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <hr fill>

        <div class="input-wrapper">
          <span>Location</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Location"
              v-model="inspRecordList.location"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>System</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter System"
              v-model="inspRecordList.system"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>System Description</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter System Description"
              v-model="inspRecordList.system_desc"
              :disabled="!btn_state"
            />
          </div>
        </div>
        
        <div class="input-wrapper">
          <span>Installation Date</span>
          <div class="select">
            <DxDateBox
              type="date"
              placeholder="Enter Installation Date"
              v-model="inspRecordList.installation_date"
              display-format="dd MMM yyyy"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <hr fill>

        <div class="input-wrapper">
          <span>Area Standard</span>
          <div class="select">
            <DxSelectBox
              :items="areaStandardList"
              value-expr="id"
              display-expr="code"
              placeholder="Select Area Standard"
              v-model="inspRecordList.id_area_standard"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Area Classification</span>
          <div class="select">
            <DxSelectBox
              :items="areaClassList"
              value-expr="id"
              display-expr="code"
              placeholder="Select Area Classification"
              v-model="inspRecordList.id_area_class"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Area Temperature Class</span>
          <div class="select">
            <DxSelectBox
              :items="areaTempClassList"
              value-expr="id"
              display-expr="code"
              placeholder="Select Area Temperature Class"
              v-model="inspRecordList.id_area_temp_class"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Area Gas Group</span>
          <div class="select">
            <DxSelectBox
              :items="areaGasGroupList"
              value-expr="id"
              display-expr="code"
              placeholder="Select Area Gas Group"
              v-model="inspRecordList.id_area_gas_group"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <hr fill>

        <div class="input-wrapper">
          <span>Equipment Standard</span>
          <div class="select">
            <DxSelectBox
              :items="equipStandardList"
              value-expr="id"
              display-expr="code"
              placeholder="Select Equipment Standard"
              v-model="inspRecordList.id_equip_standard"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Equipment Protection Tag</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Equipment Protection Tag"
              v-model="inspRecordList.equip_protection_tag"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Equipment Protection Type</span>
          <div class="select">
            <DxSelectBox
              :items="equipProtectTypeList"
              value-expr="id"
              display-expr="code"
              placeholder="Select Equipment Protection Type"
              v-model="inspRecordList.id_equip_protection_type"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Equipment Type</span>
          <div class="select">
            <DxSelectBox
              :items="equipTypeList"
              value-expr="id"
              display-expr="code"
              placeholder="Select Equipment Type"
              v-model="inspRecordList.id_equip_type"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Equipment Gas Group</span>
          <div class="select">
            <DxSelectBox
              :items="equipGasGroupList"
              value-expr="id"
              display-expr="code"
              placeholder="Select Equipment Gas Group"
              v-model="inspRecordList.id_equip_gas_group"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Equipment Temperature Class</span>
          <div class="select">
            <DxSelectBox
              :items="equipTempClassList"
              value-expr="id"
              display-expr="code"
              placeholder="Select Equipment Temperature Class"
              v-model="inspRecordList.id_equip_temp_class"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Equipment Classification</span>
          <div class="select">
            <DxSelectBox
              :items="equipClassList"
              value-expr="id"
              display-expr="code"
              placeholder="Select Equipment Classification"
              v-model="inspRecordList.id_equip_class"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Equipment Protection Level/Equipment Category</span>
          <div class="select">
            <DxSelectBox
              :items="equipProtectLvlList"
              value-expr="id"
              display-expr="code"
              placeholder="Select Equipment Protection Level/Equipment Category"
              v-model="inspRecordList.id_equip_protection_level_category"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Equipment IP Rating</span>
          <div class="select">
            <DxSelectBox
              :items="equipIPRatingList"
              value-expr="id"
              display-expr="code"
              placeholder="Select "
              v-model="inspRecordList.id_equip_ip_rating"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Equipment Enclosure Type</span>
          <div class="select">
            <DxSelectBox
              :items="equipEnclosureTypeList"
              value-expr="id"
              display-expr="code"
              placeholder="Select Equip Enclosure Type"
              v-model="inspRecordList.id_equip_enclosure_type"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <hr fill>

        <div class="input-wrapper">
          <span>Equipment Manufacturer</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Equipment Manufacturer"
              v-model="inspRecordList.equip_manufacturer"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Model/Part No.</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Model/Part No."
              v-model="inspRecordList.model"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Equipment Serial No.</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Equipment Serial No."
              v-model="inspRecordList.serial_no"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Drawing reference</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Drawing reference"
              v-model="inspRecordList.drawing_ref"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Certifying Body</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Certifying Body"
              v-model="inspRecordList.certifying_body"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Ex Certificate No.</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Ex Certificate No."
              v-model="inspRecordList.ex_cert_no"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Operating During ESD</span>
          <div class="select">
            <DxSelectBox
              :items="operatingDuringESDList"
              value-expr="code"
              display-expr="code"
              placeholder="Select Operating During ESD"
              v-model="inspRecordList.operating_during_esd"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Category (Ins/Elect)</span>
          <div class="select">
            <DxSelectBox
              :items="catInspElectList"
              value-expr="code"
              display-expr="code"
              placeholder="Select Category (Ins/Elect)"
              v-model="inspRecordList.category_inst_elect"
              :disabled="!btn_state"
            />
          </div>
        </div>

        <hr fill>

        <div fill class="input-wrapper">
          <span>Equipment Remarks</span>
          <div class="input">
            <dxTextArea
              :height="80"
              :auto-resize-enabled="true"
              placeholder="Enter Equipment Remarks"
              v-model="inspRecordList.equip_remark"
              :disabled="!btn_state"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
//API
import { GET_DATA, PUT_DATA, DELETE_DATA } from "/axios.js"
// import moment from "moment";

//Components
//import VueTabsChrome from "vue-tabs-chrome";
// import trashSvg from "@/components/svg/trash-svg.vue"

//DataGrid
import "devextreme/dist/css/dx.light.css";
// import { Workbook } from "exceljs";
// import saveAs from "file-saver";
// import { exportDataGrid } from "devextreme/excel_exporter";
import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';
import DxDateBox from 'devextreme-vue/date-box';
import DxTextArea from 'devextreme-vue/text-area';
// import DxAddRowButton from "devextreme-vue/button";
// import { DxItem } from "devextreme-vue/form";
// import { DxFileUploader } from "devextreme-vue/file-uploader";

import {
  // DxDataGrid,
  // DxSearchPanel,
  // DxPaging,
  // DxPager,
  // DxScrolling,
  // DxColumn,
  // DxExport,
  // DxToolbar,
  // DxHeaderFilter,
  // DxSelection,
  // DxEditing,
  // DxFilterRow,
  // DxButton,
  // DxLookup,
  // DxRequiredRule,
  // DxFormItem,
  // DxForm
} from "devextreme-vue/data-grid";

//Structures

export default {
  name: "inspection-record",
  props: {
    id_record: Number,
  },
  components: {
    // DxDataGrid,
    // DxSearchPanel,
    // DxPaging,
    // DxPager,
    // DxScrolling,
    // DxColumn,
    // DxExport,
    // DxToolbar,
    // DxHeaderFilter,
    // DxSelection,
    // DxForm,
    // DxItem,
    // DxEditing,
    // DxFilterRow,
    // DxButton,
    // DxAddRowButton,
    // DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    DxSelectBox,
    DxTextBox,
    DxDateBox,
    DxTextArea,
    // trashSvg
    // DxFileUploader
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "INFO NUMBER: " + this.id_record,
      subpageInnerName: null,
    });
    if (this.$store.state.status.server == true) {
      GET_DATA(this, `/ExInspectionRegisterInfo/${this.id_record}`, 'inspRecordList')
      GET_DATA(this, '/Md/get-md-ex-insp-area-std-list', 'areaStandardList');
      GET_DATA(this, '/Md/get-md-ex-insp-area-class-list', 'areaClassList');
      GET_DATA(this, '/Md/get-md-ex-insp-area-temp-class-list', 'areaTempClassList');
      GET_DATA(this, '/Md/get-md-ex-insp-area-gas-group-list', 'areaGasGroupList');
      GET_DATA(this, '/Md/get-md-ex-insp-equip-std-list', 'equipStandardList');
      GET_DATA(this, '/Md/get-md-ex-insp-equip-protec-type-list', 'equipProtectTypeList');
      GET_DATA(this, '/Md/get-md-ex-insp-equip-type-list', 'equipTypeList');
      GET_DATA(this, '/Md/get-md-ex-insp-equip-gas-group-list', 'equipGasGroupList');
      GET_DATA(this, '/Md/get-md-ex-insp-equip-temp-class-list', 'equipTempClassList');
      GET_DATA(this, '/Md/get-md-ex-insp-equip-class-list', 'equipClassList');
      GET_DATA(this, '/Md/get-md-ex-insp-equip-protec-lv-cat-list', 'equipProtectLvlList');
      GET_DATA(this, '/Md/get-md-ex-insp-equip-ip-rating-list', 'equipIPRatingList');
      GET_DATA(this, '/Md/get-md-ex-insp-equip-enclosure-type-list', 'equipEnclosureTypeList');
      this.operatingDuringESDList = [
        { id: 1, code: 'Yes' },
        { id: 2, code: 'No' },
        { id: 3, code: 'Unknown' }
      ];
      this.catInspElectList = [
        { id: 1, code: 'Instrument' },
        { id: 2, code: 'Electrical' },
        { id: 3, code: 'Unknown' }
      ];
    }
  },
  data() {
    return {
      areaStandardList: [],
      areaClassList: [],
      areaTempClassList: [],
      areaGasGroupList: [],
      equipStandardList: [],
      equipProtectTypeList: [],
      equipTypeList: [],
      equipGasGroupList: [],
      equipTempClassList: [],
      equipClassList: [],
      equipProtectLvlList: [],
      equipIPRatingList: [],
      equipEnclosureTypeList: [], 
      operatingDuringESDList: [],
      catInspElectList: [], 
      inspRecordList: {},
      dataGridAttributes: {
        class: "data-grid-style"
      },
      btn_state: false,
      additionalRemarkList: []
    };
  },
  computed: {},
  methods: {
    UPDATE_RECORD() {
    //   if (this.inspRecordList.action_date)
    //     this.inspRecordList.action_date = moment(this.inspRecordList.action_date).format("L");
      PUT_DATA(`/ExInspectionRegisterInfo/${this.inspRecordList.id}`, this.inspRecordList, () => { this.$emit('popup'); });
    },
    DELETE_RECORD() {
      DELETE_DATA(`/ExInspectionRegisterInfo/delete-ex-inspection-register-info?id=${this.inspRecordList.id}`, () => { this.SET_CURRENT_VIEW(0); });
    },
    SET_CURRENT_VIEW(view, data = null) {
        this.$store.commit("SET_SHOW_BACK_BUTTON", true);
        if (data !== null) this.$emit('currentView', view, data);
        else this.$emit('currentView', view);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  z-index: 10;
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
  margin-top: 60px;
}

.table-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  *[fill] {
    grid-column: span 2;
  }

  .multiple {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
    input{
      width: 200px;
    }
    span {
      font-size: 16px;
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
  }
}
</style>