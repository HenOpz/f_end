<template>
  <div class="page-container">

    <div class="page-section info-tab-display" >
      <div class="report-sheet report-sheet-info">
        <div class="report-container">
          <div class="sheet-body">
            <div class="section-label">
              <label>Ex-INPSECTION INFORMATION</label>
            </div>
            <div class="form-item">
              <template v-for="item in generalInfo">
                <div v-if="item.desc" class="form-item-label" :key="'label_' + item.desc">
                  <label>{{ item.desc }}</label>
                </div>
                <div v-if="!item.fill" span-1 class="form-item-value" :key="'value_' + item.desc">
                  <label>{{ item.value }}</label>
                </div>
                <div v-if="item.fill" fill class="form-item-value" :key="'value_' + item.desc">
                  <label>{{ item.value }}</label>
                </div>
              </template>
              
            </div>
          </div>
        </div>
      </div>

      <div class="report-sheet" style="max-width: 70%; margin: 0 auto;">
        <div class="report-container">
          <div class="sheet-body">
            <div>
              <div class="section-label">
                <label>Picture</label>
              </div>

              <div class="form-item-picture-log">
                <div class="img-box">
                  
                  <div class="btn-panel">
                    
                    <v-ons-toolbar-button
                      class="pic-toolbar-btn"
                      v-on:click="PREVIEW_PIC(inspRecordList.overview_img_path)"
                      v-if="inspRecordList.overview_img_path"
                    >
                      <i class="las la-eye"></i>
                    </v-ons-toolbar-button>
                    <v-ons-toolbar-button
                      class="pic-toolbar-btn"
                      v-on:click="DELETE_PIC()"
                      v-if="inspRecordList.overview_img_path"
                    >
                      <i class="las la-trash"></i>
                    </v-ons-toolbar-button>
                    <v-ons-toolbar-button>
                      <label
                        class="pic-toolbar-btn"
                        for="pic-upload-btn"
                        v-if="!inspRecordList.overview_img_path"
                      >
                        <i class="las la-plus"></i>
                      </label>
                    </v-ons-toolbar-button>
                  </div>

                  <img
                    :src="baseURL + inspRecordList.overview_img_path"
                    v-if="inspRecordList.overview_img_path"
                  />
                  <input
                    type="file"
                    id="pic-upload-btn"
                    style="display: none"
                    ref="pic_upload_ov"
                    @change="UPLOAD_PIC(1)"
                  />

                    <i class="las la-image" v-if="!inspRecordList.overview_img_path"></i>
                    <label v-if="!inspRecordList.overview_img_path">No Image</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <fileTab></fileTab>
    </div>
    <previewImage :imageURL="previewImg" v-if="previewImg" @close-preview="PREVIEW_PIC_CLOSE()" />
  </div>
</template> 

<script>
//API
import { GET_DATA, POST_DATA, DELETE_DATA } from "/axios.js";
// import moment from "moment";

//Components
//import VueTabsChrome from "vue-tabs-chrome";
import fileTab from "./file-table.vue"
import previewImage from "@/components/image-preview.vue";

//DataGrid
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
// import { DxItem } from "devextreme-vue/form";
import {
//   DxDataGrid,
//   DxSearchPanel,
//   DxPaging,
//   DxPager,
//   DxScrolling,
//   DxColumn,
//   DxExport,
//   DxToolbar,
//   DxEditing,
//   DxLookup,
//   DxRequiredRule,
//   DxFormItem,
//   DxForm
} from "devextreme-vue/data-grid";

//Structures

export default {
  name: "information-record",
  props: {
    id_record: Number,
  },
  components: {
    fileTab,
    // DxDataGrid,
    // DxSearchPanel,
    // DxPaging,
    // DxPager,
    // DxScrolling,
    // DxColumn,
    // DxExport,
    // DxToolbar,
    // DxForm,
    // DxItem,
    // DxEditing,
    // DxLookup,
    // DxRequiredRule
    // DxFormItem,
    previewImage
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "INFORMATION",
      subpageInnerName: null,
    });
    if (this.$store.state.status.server == true) {
      this.FETCH_INSP_RECORD();
    }
  },
  data() {
    return {
      areaStandard: {},
      areaClass: {},
      areaTempClass: {},
      areaGasGroup: {},
      equipStandard: {},
      equipProtectType: {},
      equipType: {},
      equipGasGroup: {},
      equipTempClass: {},
      equipClass: {},
      equipProtectLvl: {},
      equipIPRating: {},
      catInspElect: {}, 
      inspRecordList: {},
      file_pic_upload: "",
      previewImg: "",
    };
  },
  computed: {
    generalInfo() {
      var info = [
        {
          desc: "Tag Number",
          value: this.inspRecordList.tag_no
        },
        {
          desc: "Equipment Description",
          value: this.inspRecordList.equip_desc ?? "-"
        },
        {
          desc: "Location",
          value: this.inspRecordList.location ?? "-"
        },
        {
          desc: "System",
          value: this.inspRecordList.system ?? "-"
        },
        {
          desc: "System Description",
          value: this.inspRecordList.system_desc ?? "-"
        },
        {
          desc: "Installation Date",
          value: this.inspRecordList.installation_date ?? "-"
        },
        {
          desc: "Area Standard",
          value: this.areaStandard?.code ?? "-",
        },
        {
          desc: "Area Classification",
          value: this.areaClass?.code ?? "-"
        },
        {
          desc: "Area Temperature Class",
          value: this.areaTempClass?.code ?? "-"
        },
        {
          desc: "Area Gas Group",
          value: this.areaGasGroup?.code ?? "-"
        },
        {
          desc: "Equipment Standard",
          value: this.equipStandard?.code ?? "-"
        },
        {
          desc: "Equipment Protection Tag",
          value: this.inspRecordList.equip_protection_tag ?? "-"
        },
        {
          desc: "Equipment Protection Type",
          value: this.equipProtectType?.code ?? "-"
        },
        {
          desc: "Equipment Type",
          value: this.equipType?.code ?? "-"
        },
        {
          desc: "Equipment Gas Group",
          value: this.equipGasGroup?.code ?? "-"
        },
        {
          desc: "Equipment Temperature Class",
          value: this.equipTempClass?.code ?? "-"
        },
        {
          desc: "Equipment Classification",
          value: this.equipClass?.code ?? "-"
        },
        {
          desc: "Equipment Protection Level/Equipment Category",
          value: this.equipProtectLvl?.code ?? "-",
        },
        {
          desc: "Equipment IP Rating",
          value: this.equipIPRating?.code ?? "-"
        },
        {
          desc: "Equipment Enclosure Type",
          value: this.equipEnclosureType?.code ?? "-"
        },
        {
          desc: "Equipment Manufacturer",
          value: this.inspRecordList.equip_manufacturer ?? "-"
        },
        {
          desc: "Model/Part No.",
          value: this.inspRecordList.model ?? "-"
        },
        {
          desc: "Equipment Serial No.",
          value: this.inspRecordList.serial_no ?? "-"
        },
        {
          desc: "Drawing reference",
          value: this.inspRecordList.drawing_ref ?? "-"
        },
        {
          desc: "Certifying Body",
          value: this.inspRecordList.certifying_body ?? "-"
        },
        {
          desc: "Ex Certificate No.",
          value: this.inspRecordList.ex_cert_no ?? "-"
        },
        {
          desc: "Operating During ESD",
          value: this.inspRecordList.operating_during_esd ?? "-"
        },
        {
          desc: "Category (Ins/Elect)",
          value: this.inspRecordList.category_inst_elect ?? "-",
        },
        {
          desc: "Equipment Remarks",
          value: this.inspRecordList.equip_remark ?? "-",
          fill: true
        },
      ];
      return info;
    },
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    }
  },
  methods: {
    EXPORT_DATA(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Projects");
      exportDataGrid({
        worksheet: worksheet,
        component: e.component
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "inspection_record.xlsx"
          );
        });
      });
      e.cancel = true;
    },
    FETCH_INSP_RECORD() {
      var id_tag = this.$route.params.id_tag;
      GET_DATA(this, `/ExInspectionRegisterInfo/${id_tag}`, (data) => {
        this.inspRecordList = data;
        if (this.inspRecordList.id_area_standard)
          GET_DATA(this, `/Md/get-md-ex-insp-area-std-by-id?id=${this.inspRecordList.id_area_standard}`, 'areaStandard');
        if (this.inspRecordList.id_area_class)
          GET_DATA(this, `/Md/get-md-ex-insp-area-class-by-id?id=${this.inspRecordList.id_area_class}`, 'areaClass');
        if (this.inspRecordList.id_area_temp_class)
          GET_DATA(this, `/Md/get-md-ex-insp-area-temp-class-by-id?id=${this.inspRecordList.id_area_temp_class}`, 'areaTempClass');
        if (this.inspRecordList.id_area_gas_group)
          GET_DATA(this, `/Md/get-md-ex-insp-area-gas-group-by-id?id=${this.inspRecordList.id_area_gas_group}`, 'areaGasGroup');
        if (this.inspRecordList.id_equip_standard)
          GET_DATA(this, `/Md/get-md-ex-insp-equip-std-by-id?id=${this.inspRecordList.id_equip_standard}`, 'equipStandard');
        if (this.inspRecordList.id_equip_protection_type)
          GET_DATA(this, `/Md/get-md-ex-insp-equip-protec-type-by-id?id=${this.inspRecordList.id_equip_protection_type}`, 'equipProtectType');
        if (this.inspRecordList.id_equip_type)
          GET_DATA(this, `/Md/get-md-ex-insp-equip-type-by-id?id=${this.inspRecordList.id_equip_type}`, 'equipType');
        if (this.inspRecordList.id_equip_gas_group)
          GET_DATA(this, `/Md/get-md-ex-insp-equip-gas-group-by-id?id=${this.inspRecordList.id_equip_gas_group}`, 'equipGasGroup');
        if (this.inspRecordList.id_equip_temp_class)
          GET_DATA(this, `/Md/get-md-ex-insp-equip-temp-class-by-id?id=${this.inspRecordList.id_equip_temp_class}`, 'equipTempClass');
        if (this.inspRecordList.id_equip_class)
          GET_DATA(this, `/Md/get-md-ex-insp-equip-class-by-id?id=${this.inspRecordList.id_equip_class}`, 'equipClass');
        if (this.inspRecordList.id_equip_protection_level_category)
          GET_DATA(this, `/Md/get-md-ex-insp-equip-protec-lv-cat-by-id?id=${this.inspRecordList.id_equip_protection_level_category}`, 'equipProtectLvl');
        if (this.inspRecordList.id_equip_ip_rating)
          GET_DATA(this, `/Md/get-md-ex-insp-equip-ip-rating-by-id?id=${this.inspRecordList.id_equip_ip_rating}`, 'equipIPRating');
        if (this.inspRecordList.id_equip_enclosure_type)
          GET_DATA(this, `/Md/get-md-ex-insp-equip-enclosure-type-by-id?id=${this.inspRecordList.id_equip_enclosure_type}`, 'equipEnclosureType');
      });
    },
    UPLOAD_PIC(pic_type) {
      const id_tag = this.$route.params.id_tag;
      if (pic_type == 1) {
        this.file_pic_upload = this.$refs.pic_upload_ov.files[0];
      } else {
        this.file_pic_upload = this.$refs.pic_upload_np.files[0];
      }
      if (
        (this.file_pic_upload && this.file_pic_upload.type == "image/jpeg") ||
        this.file_pic_upload.type == "image/png"
      ) {
        if (this.file_pic_upload.size < 20000000) {
          POST_DATA(`/ExInspectionRegisterInfo/attach-pic?id_info=${id_tag}`, this.file_pic_upload, () => { this.FETCH_INSP_RECORD(); });
        } else {
          this.$ons.notification.alert("File size too large. (20 MB max)");
          const file = document.getElementById("pic-upload-btn");
          file.val = "";
        }
      } else {
        this.$ons.notification.alert(
          "Incorrect filetype. <br/> Only JPEG/PNG file can be uploaded."
        );
        const file = document.getElementById("pic-upload-btn");
        file.val = "";
      }
    },
    DELETE_PIC() {
      const id_tag = this.$route.params.id_tag;
      this.$ons.notification.confirm("Confirm delete?").then(res => {
        if (res == 1) {
          DELETE_DATA(`/ExInspectionRegisterInfo/delete-pic?id_info=${id_tag}`, () => { this.FETCH_INSP_RECORD(); });
        }
      });
    },
    PREVIEW_PIC(img) {
      if (img) {
        this.previewImg = img;
      }
    },
    PREVIEW_PIC_CLOSE() {
      this.previewImg = "";
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 99%;
  height: calc(100vh - 220px);
  overflow-y: auto;
}

.page-section {
  padding: 20px;
}

.page-section:last-child {
  padding-bottom: 20px;
}

.info-tab-display {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
}
.report-sheet {
  max-width: 100%;
  width: 100%;
  font-family: $web-default-font;
  box-shadow: none;
  padding: 0 !important;
  margin-top: 0;
  margin-bottom: 0;
  .report-container {
    .header {
      .title {
        grid-column: span 2;
      }
    }
    .sheet-body {
      grid-template-columns: 100%;
      overflow: hidden;
      .form-item {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 35px;

        *[span-1] {
          grid-column: span 1;
        }
        *[fill] {
          grid-column: span 3;
          
          label {
            width: auto !important;
          }
        }
        .form-item-label {
          label {
            line-height: 14px;
          }
        }
        .form-item-value {
          // grid-column: span 1;
          label {
            // margin: 0 auto;
            font-weight: 600;
            line-height: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 130px;
          }
        }
      }
    }
  }
}



.pic-toolbar-btn {
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 44px;
  margin: 0 !important;
  padding: 0 !important;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  margin-top: 10px !important;
}
</style>