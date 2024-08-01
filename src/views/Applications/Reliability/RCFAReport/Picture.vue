<template>
    <div class="report-sheet" style="margin: 0 auto;">
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
</template>

<script>
import { POST_DATA, DELETE_DATA } from "/axios.js";

export default {
  name: "inspection-record",
  props: {
    inspRecordList: Object,
  },
  components: {},
  created() {
    if (this.$store.state.status.server == true) {
      console.log();
    }
  },
  data() {
    return {
        file_pic_upload: "",
        previewImg: "",
    };
  },
  computed: {},
  methods: {
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
          POST_DATA(`/ExInspectionRegisterInfo/attach-pic?id_info=${id_tag}`, this.file_pic_upload, () => {  });
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
          DELETE_DATA(`/ExInspectionRegisterInfo/delete-pic?id_info=${id_tag}`, () => {  });
        }
      });
    },
    PREVIEW_PIC(img) {
      if (img) {
        this.previewImg = img;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.report-sheet {
  max-width: 100%;
  width: 100%;
  font-family: $web-default-font;
  box-shadow: none !important;
  padding: 0 !important;
  margin-top: 0;
  margin-bottom: 0;

  .form-item-picture-log {
    height: auto !important;
    .img-box {
      height: auto !important;
    }
    .btn-panel {
      height: auto !important;
    }
  }
  .report-container {
    .header {
      .title {
        grid-column: span 2;
      }
    }
    .sheet-body {
      grid-template-columns: 100%;
      // overflow: hidden;
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