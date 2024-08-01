<template>
    <div class="page-sheet">
      <div class="page-section">
        <div class="sheet-header">
          <div class="logo">
            <img src="/img/app-logo.svg" />
          </div>
          <div class="title">Ex-INSPECTION CHECKLIST</div>
        </div>

        <div class="sheet-body">
            <div class="section-label" style="background-color: #d5d5d5;">
                <label>Tag Number</label>
            </div>
            <div class="section-label">
                <label >NN-PP-252</label>
            </div>
            <div class="section-label" style="background-color: #d5d5d5;">
                <label>Tag Description</label>
            </div>
            <div class="section-label">
                <label>NAV. LIGHT</label>
            </div>
        </div>

        <div class="sheet-body-header">
            <div class="section-label-header header-label" style="grid-row: span 2; grid-column: span 1">
                <label>CHECKLIST</label>
            </div>
            <div class="section-label-header header-label" style="grid-column: span 1; text-align: center;">
                <label >GRADE OF INSPECTION</label>
            </div>
            <div class="section-label-header header-label" style="grid-row: span 2">
                <label>COMMENTS/REMARKS</label>
            </div>
            <div class="grade-option" style="">
                <label>D</label>
                <label>C</label>
                <label style="background-color: green;">V</label>
                <label></label>
            </div>
        </div>
        
          <div class="header" v-for="item in checkRecordList" :key="item.id">
            <div  class="sheet-main-header" v-if="item.is_header == true & item.is_subheader == false">
                <div class="align-main-center">
                  <label >{{ item.checklist_no }}</label>
                </div>
                <div class="align-main-start">
                  <label >{{ item.checklist_content }}</label>
                </div>
            </div>
            
            <div class="sheet-mainsub-header" v-else-if="item.is_header == false & item.is_subheader == true">
                <div class="align-sub-center">
                  <label >{{ item.checklist_no }}</label>
                </div>
                <div class="align-sub-start">
                  <label >{{ item.checklist_content }}</label>
                </div>
            </div>

            <div class="sheet-sub-header" v-else-if="item.is_header == false & item.is_subheader == false">
                <div class="align-sub-center">
                  <label >{{ item.checklist_no }}</label>
                </div>
                <div class="align-sub-start">
                  <label >{{ item.checklist_content }}</label>
                </div>
                <div class="align-sub-center">
                  <label >{{ item.d_type }}</label>
                </div>
                <div class="align-sub-center">
                  <label >{{ item.c_type }}</label>
                </div>
                <div class="align-sub-center">
                  <label >{{ item.v_type }}</label>
                </div>
                <div class="align-sub-center">
                  <DxSelectBox
                    class="custom-selectbox"
                    :data-source="checkStatus"
                    display-expr="code"
                    value-expr="id"
                    placeholder="Select"
                    v-model="item.result.id_result"
                    @value-changed="UPDATE_RESULT(item.result)"
                  />
                </div>
                <div class="form-item-textarea">
                  <textarea
                    placeholder="comment..."
                    v-model="item.result.comment"
                    @focusout="UPDATE_RESULT(item.result)"
                  />
                </div>
                <div class="img-center">
                   <!-- <button >test</button> -->
                   <img src="/img/svg/window-layout-svg.svg" class="window-layout-svg" @click="SET_POPUP_ACTION(!popupShow,item.id)"/>
                </div>
            </div>
          </div>
          
          <PictureLogPopup :record="checklist_row"  v-if="popupShow == true" @popup="(popupShow) => SET_POPUP_ACTION(popupShow)"/>
          <!-- <div class="page-popup" v-if="popupShow == true">
            <div class="page-popup-section">
                <div class="popup">
                  <span style="font-size: 16px; font-weight: 400; grid-column: span 2;">CHECKLIST ID: {{ this.checklist_row }} </span>
                  <div class="input-wrapper">
                      <span>Item</span>
                      <div class="input">
                          <DxTextBox 
                            :width="300"
                            placeholder="Enter Item"
                          />
                      </div>
                  </div>

                  <div class="input-wrapper">
                      <span>Checklist Item</span>
                      <div class="input">
                          <DxTextBox 
                            :width="300"
                            placeholder="Enter Checklist Item"
                            v-model="checklist_row"
                          />
                      </div>
                  </div>

                  <div class="input-wrapper">
                      <div class="widget-container">
                        <span>Overview</span>
                        <DxFileUploader 
                            id="file-uploader" 
                            :width="300"
                            :multiple="false" 
                            upload-mode="useForm"
                            :visible="true" 
                        />
                      </div>
                  </div>

                  <div class="input-wrapper">
                      <div class="widget-container">
                        <span>Close-up</span>
                        <DxFileUploader 
                            id="file-uploader" 
                            :width="300"
                            :multiple="false" 
                            upload-mode="useForm"
                            :visible="true" 
                        />
                      </div>
                  </div>

                  <div class="input-wrapper">
                      <span>Findings</span>
                      <div class="input">
                          <DxTextBox 
                            :width="300"
                            placeholder="Enter Findings"
                          />
                      </div>
                  </div>

                  <div class="input-wrapper">
                      <span>Recommendation</span>
                      <div class="input">
                          <DxTextBox 
                            :width="300"
                            placeholder="Enter Recommendation"
                          />
                      </div>
                  </div>

                  <div class="input-wrapper">
                      <span>Finding Status (Open/Close)</span>
                      <div class="input">
                          <DxTextBox 
                            :width="300"
                            placeholder="Enter Finding Status (Open/Close)"
                          />
                      </div>
                  </div>

                  <div class="input-wrapper">
                      <span>Deenergize</span>
                      <div class="input">
                          <DxTextBox 
                            :width="300"
                            placeholder="Enter Deenergize"
                          />
                      </div>
                  </div>

                  <div class="input-wrapper">
                      <span>Quick Fix</span>
                      <div class="input">
                          <DxTextBox 
                            :width="300"
                            placeholder="Enter Quick Fix"
                          />
                      </div>
                  </div>

                  <div class="input-wrapper">
                      <span>Interim Measure</span>
                      <div class="input">
                          <DxTextBox 
                            :width="300"
                            placeholder="Enter Interim Measure"
                          />
                      </div>
                  </div>

                  <div class="input-wrapper">
                      <span>Interim Measure Validity</span>
                      <div class="input">
                          <DxTextBox 
                            :width="300"
                            placeholder="Enter Interim Measure Validity"
                          />
                      </div>
                  </div>

                  <div class="input-wrapper">
                      <span>Finding Compliance Status</span>
                      <div class="input">
                          <DxTextBox 
                            :width="300"
                            placeholder="Enter Finding Compliance Status"
                          />
                      </div>
                  </div>

                  <div class="action-container" style="grid-column: span 2">
                    <button class="create">Create</button>
                    <button @click="popupShow = false">Cancel</button>
                  </div>

                </div>
            </div>
          </div> -->
      </div>
    </div>
  </template>
  
  <script>
  //API
  import {GET_DATA, PUT_DATA} from "/axios.js";
  import DxSelectBox from "devextreme-vue/select-box";
  // import DxTextBox from 'devextreme-vue/text-box';
  // import { DxFileUploader } from 'devextreme-vue/file-uploader';
  import PictureLogPopup from "@/views/Applications/ExInspection/Pages/Checklist/PictureLogPopup.vue"
  
  export default {
    name: "checklist-generic",
    components: {
      DxSelectBox,
      // DxTextBox,
      // DxFileUploader
      PictureLogPopup,
    },
    props: {
      // checklistInfo: Array,
      record: Number,
      // remark: Object
    },
    data() {
      return {
        checkRecordList : {},
        checkStatus : [],
        checkbox : false,
        // id_checklist: this.$route.params.id_checklist,
        formData: {
          id: null,
          id_chk: null,
          id_inspection_record: null,
          id_result: null,
          comment: ""
        },
        popupShow: false,
        checklist_row: 0,
        // formDataRemark: {
        //   id_header: null,
        //   remark: null
        // }
      };
    },
    created() {
      this.$store.commit("UPDATE_CURRENT_PAGENAME", {
        subpageName: "CHECKLIST",
        subpageInnerName: null,
      });
      if (this.$store.state.status.server == true) {
        GET_DATA(this, `/ExInspectionChecklist/get-ex-insp-chk-list-insp-id?id_insp_record=${this.record}`, 'checkRecordList');
        GET_DATA(this, 'Md/get-md-ex-insp-chk-status-list', 'checkStatus');
        console.log('record: ',this.record)
      }
    },
    methods: {
      UPDATE_RESULT(item) {
        console.log('test ',item)
        PUT_DATA('ExInspectionChecklist/edit-ex-insp-chk-list-result', item);
      },
      // SET_CHECKLIST_ACTION(popupShow,row) {
      //   // this.current_view = view;
      //   this.checklist_row = row;
      //   this.popupShow = popupShow;
      //   console.log("test row ",row, ' popup ', popupShow);
      // },

      //แยก 2 set เพื่แส่งค่า
      SET_POPUP_ACTION(popupShow, row) {
        // this.current_view = view;
        this.checklist_row = row;
        this.popupShow = popupShow;
        console.log("test row ",row, ' popup ', popupShow);
      },
    }
  };
  </script>
  
  <style lang="scss" scoped>
  @import "@/style/main.scss";

  .page-sheet {
    // width: auto;
    margin: 0 auto;
    border-top: 0.5px solid black;
    border-right: 0.5px solid black;
    // border: 0.5px solid black;

    box-shadow: none;
    // max-width: auto !important;
    // min-width: auto !important;
    // overflow-y: scroll;
    // overflow-x: scroll;

    // @media screen and (max-width: 1600px) {
    //   width: calc(100% - 20px);
    // }
  }

  .page-section {
    min-width: 800px;
    
    .sheet-header {
      width: 100%;
      display: grid;
      //grid-template-columns: repeat(6, 16.66%);
      grid-template-columns: 20% 60% 20%;
      height: 80px;
      // padding-bottom: 12px;
      border-left: 0.5px solid black;
      border-bottom: 0.5px solid black;


      .logo,
      .title,
      .docno {
        display: flex;
        align-items: center;
      }

      .logo {
        justify-content: flex-start;

        img {
          height: 60px;
          margin-left: 12px;
          object-fit: contain;
        }
      }

      .title {
        justify-content: center;
        font-size: 15px;
        font-family: inherit;
        font-weight: 500;
        text-transform: uppercase;
        color: #000;
        flex-direction: column;
        //grid-column: span 4;
      }
    }

    .sheet-body {
      display: grid;
      grid-template-columns: 20% 35% 20% 25%;
      // border: 0.5px solid $web-theme-color-secondary;

      .section-label,
      .form-item-label,
      .form-item-value,
      .form-item-unit {
        padding: 6px 8px;
      }

      .section-label {
        // background-color: #140a4b;
        border-left: 0.5px solid black;
        border-bottom: 0.5px solid black;

        label {
          font-size: 12px;
          font-family: inherit;
          font-weight: 500;
          text-transform: uppercase;
        //   color: #fff;
        }
      }
 
      .section-label-header {
        background-color: #140a4b;
        // border: 0.5px solid black;
        ;

        label {
          font-size: 12px;
          font-family: inherit;
          font-weight: 500;
          text-transform: uppercase;
          color: #fff;
        }
      }
    }

    .sheet-body-header {
        width: 100%;
        display: grid;
        // grid-template-columns: repeat(3, 1fr);
        grid-template-columns: 55% 20% auto;
        // grid-template-columns: 3fr 1fr 1fr;
        height: 80px;
        //   padding-bottom: 12px;

        .section-label-header {
            background-color: $web-theme-color-secondary;
            border-left: 0.5px solid black;

            label {
                font-size: 12px;
                font-family: inherit;
                font-weight: 500;
                text-transform: uppercase;
                color: #fff;
            }
         }
        .header-label {
            display: flex;
            justify-content: center;
            align-items: center;

            label {
                font-size: 10px;
                font-family: inherit;
                font-weight: 700;
                text-transform: uppercase;
                color: #fff;
            }
        }
        // .grade-label,
        // .comment-label,
        .grade-option {
            display: grid; 
            grid-template-columns: 20% 20% 20% 40% ; 
            // grid-template-columns: repeat(3, 1fr) 2fr ;
            width: 100%; 
            background-color: #d5d5d5;
            
            label{
                font-size: 10px;
                text-transform: capitalize;
                font-weight: 500;
                border-left: 0.5px solid black;
                border-bottom: 0.5px solid black;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .rating-option {
            position: relative;
            height: 80px;

            label {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform-origin: 0 50%;
                transform: rotate(270deg);
                text-transform: uppercase !important;
            }
        }
    }

    .sheet-main-header {
        width: 100%;
        display: grid;
        // grid-template-columns: repeat(3, 1fr);
        grid-template-columns: 5% 95%; 
        // height: 30px;
        background-color: #d5d5d5;
        border-bottom: 0.5px solid black;
        // border-left: 0.5px solid black;

        .align-main-center {
            font-size: 10px;
            text-transform: capitalize;
            font-weight: 400;
            padding: 12px 12px;
            border-left: 0.5px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .align-main-start {
            font-size: 10px;
            text-transform: capitalize;
            font-weight: 400;
            padding: 12px 12px;
            border-left: 0.5px solid black;
        }
    }

    .sheet-mainsub-header {
        // width: 100% !important;
        display: grid;
        // grid-template-columns: repeat(3, 1fr);
        grid-template-columns: 5% 95%;
        background-color: #E9EAEC;
        border-bottom: 0.5px solid black;
        // border-right: 0.5px solid black;
    }

    .sheet-sub-header {
        // width: 100%;
        // min-width: 1200px;
        display: grid;
        // grid-template-columns: repeat(3, 1fr);
        grid-template-columns: 5% 50% 4% 4% 4% 120px auto 5%;
        // grid-template-columns: 50px 600px 50px 50px 50px 120px 300px auto ;        
        // height: 30px;
        // background-color: #d5d5d5;
        border-bottom: 0.5px solid black;
        // border-right: 0.5px solid black;
    }
    
    .align-sub-center {
        font-size: 10px;
        text-transform: capitalize;
        font-weight: 400;
        padding: 12px 12px;
        border-left: 0.5px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .align-sub-start {
        font-size: 10px;
        text-transform: capitalize;
        font-weight: 400;
        padding: 12px 12px;
        border-left: 0.5px solid black;
        display: flex;
        align-items: center;
    }

    .form-item-textarea{
        // margin-right: 5px;
        // margin-left: 5px;
        // margin-top: 12px;
        
        border-left: 0.5px solid black;
        
        textarea {
          padding: 0;
          margin-right: 5px;
          margin-left: 5px;
          margin-top: 12px;
          width:100%;
          border: 0;
          min-width: -webkit-fill-available;
          max-width: -webkit-fill-available;
          min-height: auto;
          // border-left: 0.5px;
          font-family: inherit;
          font-size: 10px;
          text-transform: capitalize;
          font-weight: 400;
        }
    }
    .custom-selectbox{
        font-family: inherit;
        font-size: 10px;
        text-transform: capitalize;
        font-weight: 400;
    }
    .img-center{
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 0.5px solid black;

        .button{
          width: 4px;
        }
    }
    .window-layout-svg {
        width: 25px; 
        padding: 5px; 
        height: 25px;
        background-color: #291F85; 
        fill: white;
        transition: 0.2s;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
        transform: scale(1.1);
        }
    }
    .page-popup{
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-rows: 51px calc(100vh - 95px);
      transition: all 0.3s;
      overflow-y: hidden;
      position: fixed !important;
      z-index: 999;
      top: 0;
      left: 0;
      background-color: #14141484;
      margin: auto;

      .page-popup-section{
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
      .popup{
        display: grid;
        grid-template-columns: repeat(2 , 1fr) ;
        gap: 15px;ß
        // *[fill] {
        //   grid-column: span 3;
        // }
        h3 {
          padding: 0;
          margin: 0;
          
        }
      }
    }
    .input-wrapper{
      display: flex;
        flex-direction: column;
        gap: 6px;

        span {
            font-size: 10px;
            font-weight: 600;
        }
    }
    .action-container{
      display: flex;
      justify-content: center;
      gap: 15%;
      
      button{
        width: 30%;
      }
    }
    button {
      padding: 20px 0;
      background-color: white;
      border: solid 1px gray;
      border-radius: 10px;
      font-weight: 800;
      font-size: 16px;
      transition: 1s;
      cursor: pointer;
    }
    .create {
      color: white;
      background-color: $web-theme-color-secondary;
    }
  }
  </style>