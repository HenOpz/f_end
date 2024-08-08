<template>
  <div class="picture-wrapper">
      <div class="picture-header">
          <span>{{ this.type === 1 ? 'Picture 1' : 'Picture 2' }}</span>
      </div>
      <div class="picture-body">
          <div class="picture-actions">
              <v-ons-toolbar-button
                  v-on:click="DELETE_PIC()"
                  v-if="imagePath">
                  <label class="picture-action-btn"
                      v-if="imagePath">
                      <i class="las la-trash"></i>
                  </label>
              </v-ons-toolbar-button>
              <v-ons-toolbar-button>
                  <label class="picture-action-btn" :for="picUploadRef"
                      v-if="!imagePath">
                      <i class="las la-plus"></i>
                  </label>
              </v-ons-toolbar-button>
          </div>
          <img :src="baseURL + imagePath" v-if="imagePath" />
          <div class="no-image" v-if="!imagePath">
              <i class="las la-image"></i>
              <span>No Image</span>
          </div>
          <input type="file" :id="picUploadRef" style="display: none" :ref="picUploadRef"
          @change="UPLOAD_PIC()" />
      </div>
  </div>
</template>

<script>
import { GET_DATA, POST_DATA, DELETE_DATA } from "/axios.js";

export default {
name: "add-long-term",
props: {
  id_user: Number,
  id_record: Number,
  image_path: String,
  type: Number,
},
components: {
  
},
created() {
  this.imagePath = this.image_path;
  this.picUploadRef = `pic_upload_${this.type}`;
},
data() {
  return {
      imagePath: null,
      file_pic_upload: "",
      previewImg: "",
      picUploadRef: null,
  };
},
computed: {
  baseURL() {
    var mode = this.$store.state.mode;
    if (mode == "dev") return this.$store.state.modeURL.dev;
    else if (mode == "prod") return this.$store.state.modeURL.prod;
    else return console.log("develpment mode set up incorrect.");
  },
},
methods: {
  UPLOAD_PIC() {
      this.file_pic_upload = this.$refs[this.picUploadRef].files[0];
      if (
          (
              this.file_pic_upload && 
              this.file_pic_upload.type == "image/jpeg") || 
              this.file_pic_upload.type == "image/png"
      ) {
          if (this.file_pic_upload.size < 20000000) {
              const formData = {
                  id: this.id_record,
                  file: this.file_pic_upload,
                  type: this.type
              }
              POST_DATA("/User/upload-user-info-pic", formData, true, () => {
                  console.log('post');
                  
                  GET_DATA(this, `/User/get-user-info-by-id-user?id=${this.id_user}`, (data) => {
                      if (this.type === 1) this.imagePath = data[0].profile_img;
                      else if (this.type === 2) this.imagePath = data[0].signature;
                  });
              });
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
      this.$ons.notification.confirm("Confirm delete?").then(res => {
          if (res == 1) {
              DELETE_DATA(`/User/delete-user-info-pic?id=${this.id_record}&pic_type=${this.type}`, () => {
                  console.log('delete');
                  
                  GET_DATA(this, `/User/get-user-info-by-id-user?id=${this.id_user}`, (data) => {
                      if (this.type === 1) this.imagePath = data[0].profile_img;
                      else if (this.type === 2) this.imagePath = data[0].signature;
                  });
              });
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

.picture-wrapper {
  width: 100%;
  background-color: $dexon-primary-gray-light;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  cursor: auto;
  max-height: 250px;

  .picture-header {
      background-color: $web-theme-color-secondary;
      padding: 10px 5px;
      display: flex;
      justify-content: center;

      span {
          color: white;
          font-size: 13px;
      }
  }
  .picture-body {
      position: relative;
      height: 100%;
      display: flex;
      justify-content: center;

      img {
          max-width: 100%; 
          max-height: 100%; 
          object-fit: contain;
      }
      .picture-actions {
          position: absolute;
          right: 0;

          .picture-action-btn {
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

              i {
                  color: black;
              }
          }
      }
      .no-image {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          height: 150px;

          i {
              font-size: 24px;
          }
          span {
              font-size: 14px;
          }
      }
  }
}
</style>