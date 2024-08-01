"use strict";(self["webpackChunktims_dexon"]=self["webpackChunktims_dexon"]||[]).push([[2210],{30594:(e,t,a)=>{a.d(t,{Z:()=>d});var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-content-loading"},[a("div",{staticClass:"box"},[a("hash-loader",{staticClass:"custom-class",attrs:{color:"#1e1450",loading:!0,size:40,sizeUnit:"px"}})],1)])},o=[];const n={name:"AppLoading",props:{text:String,icon:String,color:String}},s=n;var l=a(1001),r=(0,l.Z)(s,i,o,!1,null,"cf1f01c2",null);const d=r.exports},96348:(e,t,a)=>{a.d(t,{Z:()=>d});var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"image-preview-wrapper"},[a("div",{staticClass:"preview-popup"},[a("v-ons-toolbar-button",{staticClass:"btn-close",on:{click:function(t){return e.CLOSE_PREVIEW()}}},[a("i",{staticClass:"las la-times"})]),a("v-ons-toolbar-button",{staticClass:"btn-close download"},[a("a",{attrs:{target:"_blank",href:e.baseURL+e.imageURL,download:""}},[a("i",{staticClass:"las la-download"})])]),a("img",{attrs:{src:e.baseURL+e.imageURL}})],1)])},o=[];a(74916),a(23123);const n={name:"image-preview",props:{imageURL:String},computed:{baseURL:function(){var e=this.$store.state.mode;return"dev"==e?this.$store.state.modeURL.dev:"prod"==e?this.$store.state.modeURL.prod:console.log("develpment mode set up incorrect.")}},methods:{DOWNLOAD_IMG:function(e){var t=document.createElement("a");t.href=e,t.download=e.split("/").pop(),document.body.appendChild(t),t.click(),document.body.removeChild(t)},CLOSE_PREVIEW:function(){this.$emit("close-preview")}}},s=n;var l=a(1001),r=(0,l.Z)(s,i,o,!1,null,"4574c401",null);const d=r.exports},22210:(e,t,a)=>{a.r(t),a.d(t,{default:()=>W});var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page-container"},[a("div",{staticClass:"tab-wrapper"},[a("vue-tabs-chrome",{attrs:{tabs:e.tabs},model:{value:e.tabCurrent,callback:function(t){e.tabCurrent=t},expression:"tabCurrent"}})],1),"info"==e.tabCurrent?a("div",{staticClass:"page-section info-tab-display"},[a("div",{staticClass:"report-sheet report-sheet-info",staticStyle:{"grid-row":"span 2"}},[a("div",{staticClass:"report-container"},[a("div",{staticClass:"sheet-body",staticStyle:{"grid-template-columns":"50% 50%"}},[e._m(0),e._l(e.generalInfo,(function(t){return a("div",{key:t.desc,staticClass:"form-item"},[a("div",{staticClass:"form-item-label"},[a("label",[e._v(e._s(t.desc))])]),a("div",{staticClass:"form-item-value"},[a("label",[e._v(e._s(t.value))])])])}))],2),a("tableComponent")],1)]),a("div",{staticClass:"report-sheet"},[a("div",{staticClass:"report-container"},[a("div",{staticClass:"sheet-body"},[a("div",[e._m(1),a("div",{staticClass:"form-item-picture-log"},[a("div",{staticClass:"img-box"},[a("div",{staticClass:"btn-panel"},[e.infoVessel.overview_img_path?a("v-ons-toolbar-button",{staticClass:"pic-toolbar-btn",on:{click:function(t){return e.PREVIEW_PIC(e.infoVessel.overview_img_path)}}},[a("i",{staticClass:"las la-eye"})]):e._e(),e.infoVessel.overview_img_path?a("v-ons-toolbar-button",{staticClass:"pic-toolbar-btn",on:{click:function(t){return e.DELETE_PIC(e.infoVessel.overview_img_path,1)}}},[a("i",{staticClass:"las la-trash"})]):e._e(),a("v-ons-toolbar-button",[e.infoVessel.overview_img_path?e._e():a("label",{staticClass:"pic-toolbar-btn",attrs:{for:"pic-upload-btn"}},[a("i",{staticClass:"las la-plus"})])])],1),e.infoVessel.overview_img_path?a("img",{attrs:{src:e.baseURL+e.infoVessel.overview_img_path}}):e._e(),a("input",{ref:"pic_upload_ov",staticStyle:{display:"none"},attrs:{type:"file",id:"pic-upload-btn"},on:{change:function(t){return e.UPLOAD_PIC(1)}}}),a("div",{},[e.infoVessel.overview_img_path?e._e():a("i",{staticClass:"las la-image"}),e.infoVessel.overview_img_path?e._e():a("label",[e._v("No Image")])])])])])])])]),a("div",{staticClass:"report-sheet"},[a("div",{staticClass:"report-container"},[a("div",{staticClass:"sheet-body"},[a("div",[e._m(2),a("div",{staticClass:"form-item-picture-log"},[a("div",{staticClass:"img-box"},[a("div",{staticClass:"btn-panel"},[e.infoVessel.name_plate_img_path?a("v-ons-toolbar-button",{staticClass:"pic-toolbar-btn",on:{click:function(t){return e.PREVIEW_PIC(e.infoVessel.name_plate_img_path)}}},[a("i",{staticClass:"las la-eye"})]):e._e(),e.infoVessel.name_plate_img_path?a("v-ons-toolbar-button",{staticClass:"pic-toolbar-btn",on:{click:function(t){return e.DELETE_PIC(e.infoVessel.name_plate_img_path,2)}}},[a("i",{staticClass:"las la-trash"})]):e._e(),e.infoVessel.name_plate_img_path?e._e():a("v-ons-toolbar-button",[e.infoVessel.name_plate_img_path?e._e():a("label",{staticClass:"pic-toolbar-btn",attrs:{for:"pic-upload-btn-2"}},[a("i",{staticClass:"las la-plus"})])])],1),e.infoVessel.name_plate_img_path?a("img",{attrs:{src:e.baseURL+e.infoVessel.name_plate_img_path}}):e._e(),a("input",{ref:"pic_upload_np",staticStyle:{display:"none"},attrs:{type:"file",id:"pic-upload-btn-2"},on:{change:function(t){return e.UPLOAD_PIC(2)}}}),e.infoVessel.name_plate_img_path?e._e():a("i",{staticClass:"las la-image"}),e.infoVessel.name_plate_img_path?e._e():a("label",[e._v("No Image")])])])])])])])]):e._e(),"doc"==e.tabCurrent?a("div",[a("tableGeneralDoc")],1):e._e(),"const"==e.tabCurrent?a("div",[a("tableConstDoc")],1):e._e(),"insp"==e.tabCurrent?a("div",[a("tableInsp")],1):e._e(),1==e.isLoading?a("contentLoading",{attrs:{text:"Loading, please wait...",color:"#fc9b21"}}):e._e(),e.previewImg?a("previewImage",{attrs:{imageURL:e.previewImg},on:{"close-preview":function(t){return e.PREVIEW_PIC_CLOSE()}}}):e._e()],1)},o=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"section-label",staticStyle:{"grid-column":"span 2"}},[a("label",[e._v("Pressure Vessel information")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"section-label"},[a("label",[e._v("overview picture")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"section-label"},[a("label",[e._v("name plate picture")])])}],n=(a(41539),a(39477)),s=a(17133),l=a.n(s),r=a(25930),d=a.n(r),c=a(30594),u=a(96348),p=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{"padding-top":"10px","padding-bottom":"10px"}},[a("DxDataGrid",{attrs:{id:"data-grid-style","key-expr":"id","data-source":e.vesselComponent,"element-attr":e.dataGridAttributes,selection:{mode:"single"},"word-wrap-enabled":!0,"hover-state-enabled":!0,"allow-column-reordering":!0,"show-borders":!0,"show-row-lines":!0,"row-alternation-enabled":!1},on:{exporting:e.EXPORT_DATA,"row-inserted":e.CREATE_COMPONENT,"row-updated":e.UPDATE_COMPONENT,"row-removed":e.DELETE_COMPONENT},scopedSlots:e._u([{key:"header_design_pressure",fn:function(){return[a("div",[e._v(" Design Pressure "),a("BR"),e._v("(psi) ")],1)]},proxy:!0},{key:"header_design_temp_min",fn:function(){return[a("div",[e._v(" Min Design Temperature "),a("BR"),e._v("(c) ")],1)]},proxy:!0},{key:"header_design_temp_max",fn:function(){return[a("div",[e._v(" Max Design Temperature "),a("BR"),e._v("(c) ")],1)]},proxy:!0},{key:"header_operate_temp",fn:function(){return[a("div",[e._v(" Operate Temperature "),a("BR"),e._v("(c) ")],1)]},proxy:!0},{key:"header_operate_pressure",fn:function(){return[a("div",[e._v(" Operate Pressure "),a("BR"),e._v("(psi) ")],1)]},proxy:!0},{key:"table-header",fn:function(){return[a("div",[a("div",{staticClass:"page-section-label"},[e._v("Pressure Vessel Component")])])]},proxy:!0}])},[a("DxEditing",{attrs:{"allow-updating":!0,"allow-deleting":!0,"allow-adding":!0,"use-icons":!0,mode:"row"}}),a("DxColumn",{attrs:{"data-field":"group_no",width:0,caption:""}}),a("DxColumn",{attrs:{"data-field":"id_group_type",caption:"Component",width:100}},[a("DxLookup",{attrs:{"data-source":e.component_group,"value-expr":"id","display-expr":"code"}})],1),a("DxColumn",{attrs:{"data-field":"design_temp_min",caption:"Design Temp Min",format:"#,##0.00","header-cell-template":"header_design_temp_min"}}),a("DxColumn",{attrs:{"data-field":"design_temp_max",caption:"design_temp_max",format:"#,##0.00","header-cell-template":"header_design_temp_max"}}),a("DxColumn",{attrs:{"data-field":"operate_temp",caption:"Operate Temperature",format:"#,##0.00","header-cell-template":"header_operate_temp"}}),a("DxColumn",{attrs:{"data-field":"design_pressure",caption:"Design Pressure",format:"#,##0.00","header-cell-template":"header_design_pressure"}}),a("DxColumn",{attrs:{"data-field":"operate_pressure",caption:"Operate Pressure",format:"#,##0.00","header-cell-template":"header_operate_pressure"}}),a("DxColumn",{attrs:{"data-field":"corrosion_loop_no",caption:"Corrosion Loop No."}}),a("DxColumn",{attrs:{"data-field":"PWHT",caption:"PWHT"}}),a("DxScrolling",{attrs:{mode:"standard"}}),a("DxSearchPanel",{attrs:{visible:!0}}),a("DxPaging",{attrs:{"page-size":10,"page-index":0}}),a("DxPager",{attrs:{"show-page-size-selector":!0,"allowed-page-sizes":[5,10,20],"show-navigation-buttons":!0,"show-info":!0,"info-text":"Page {0} of {1} ({2} items)"}}),a("DxExport",{attrs:{enabled:!0}})],1)],1)},m=[],f=(a(91058),a(53706)),g=a.n(f),h=a(66262),_=a(71642),v=a(48626);const D={name:"component-table",components:{DxDataGrid:v.DxDataGrid,DxSearchPanel:v.DxSearchPanel,DxPaging:v.DxPaging,DxPager:v.DxPager,DxScrolling:v.DxScrolling,DxColumn:v.DxColumn,DxExport:v.DxExport,DxEditing:v.DxEditing,DxLookup:v.DxLookup},created:function(){1==this.$store.state.status.server&&(this.FETCH_COMPONENT(),this.FETCH_MD_COMPONENT_GROUP())},data:function(){return{vesselComponent:{},component_group:[],dataGridAttributes:{class:"data-grid-style"}}},computed:{},methods:{EXPORT_DATA:function(e){var t=new _.Workbook,a=t.addWorksheet("Projects");(0,h.d)({worksheet:a,component:e.component}).then((function(){t.xlsx.writeBuffer().then((function(e){g()(new Blob([e],{type:"application/octet-stream"}),"Projects.xlsx")}))})),e.cancel=!0},FETCH_COMPONENT:function(){var e=this;this.isLoading=!0;var t=this.$route.params.id_tag;(0,n.Z)({method:"get",url:"PressureVesselComponentGroup/get-pv-com-by-id?id_vessel="+t,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:{}}).then((function(t){200==t.status&&t.data&&(e.vesselComponent=t.data,console.log(e.vesselComponent))}))["catch"]((function(e){console.log(e)}))["finally"]((function(){e.isLoading=!1}))},CREATE_COMPONENT:function(e){var t=this;e.data.id=0,e.data.id_vessel=parseInt(this.$route.params.id_tag),console.warn(e.data),(0,n.Z)({method:"post",url:"/PressureVesselComponentGroup",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:e.data}).then((function(e){201==e.status&&(console.log("create success"),t.FETCH_COMPONENT())}))["catch"]((function(e){t.$ons.notification.alert(e.code+" "+e.response.status+" "+e.message)}))["finally"]((function(){}))},UPDATE_COMPONENT:function(e){var t=this;(0,n.Z)({method:"put",url:"PressureVesselComponentGroup/"+e.data.id,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:e.data}).then((function(e){200==e.status&&(console.log("update success"),t.FETCH_COMPONENT())}))["catch"]((function(e){t.$ons.notification.alert(e.code+" "+e.response.status+" "+e.message)}))["finally"]((function(){}))},DELETE_COMPONENT:function(e){var t=this;(0,n.Z)({method:"delete",url:"PressureVesselComponentGroup/"+e.data.id,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:{}}).then((function(e){204==e.status&&(console.log("delete success"),t.FETCH_COMPONENT())}))["catch"]((function(e){t.$ons.notification.alert(e.code+" "+e.response.status+" "+e.message)}))["finally"]((function(){}))},FETCH_MD_COMPONENT_GROUP:function(){var e=this;(0,n.Z)({method:"get",url:"master-data/get-md-pv-com-group",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(t){200==t.status&&t.data&&(e.component_group=t.data)}))}}},b=D;var x=a(1001),C=(0,x.Z)(b,p,m,!1,null,"ba4d8ffe",null);const E=C.exports;var L=function(){var e=this,t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"page-section"},[t._m(0),i("DxDataGrid",{attrs:{id:"const-data-grid","key-expr":"id","data-source":t.library,"element-attr":t.dataGridAttributes,"hover-state-enabled":!0,"allow-column-reordering":!0,"show-borders":!0,"show-row-lines":!0,"focused-row-enabled":!1,"row-alternation-enabled":!1},on:{"row-inserted":t.ADD_NEW_FILE,"row-removed":t.DELETE_DOC,"init-new-row":function(){e.file=[]}},scopedSlots:t._u([{key:"editCellTemplate",fn:function(e){return[i("div",[i("img",{attrs:{src:"http://tmt-solution.com/public/image-empty.png",width:"150",height:"100"}}),i("DxFileUploader",{attrs:{"select-button-text":"Select File","label-text":"","upload-mode":"useForm"},on:{"value-changed":t.VALUE_CHANGE}})],1)]}},{key:"insertCellTemplate",fn:function(){return[i("div",{staticClass:"widget-container"},[i("DxFileUploader",{attrs:{id:"file-uploader",multiple:!1,"upload-mode":"useForm",visible:!0},on:{"value-changed":t.VALUE_CHANGE,uploaded:t.VALUE_CHANGE}})],1)]},proxy:!0}])},[i("DxEditing",{attrs:{"allow-deleting":!0,"allow-adding":!0,"allow-updating":!0,"use-icons":!0,"show-borders":!0,mode:"form"}},[i("DxForm",{attrs:{"label-location":"top"}})],1),i("DxColumn",{attrs:{"data-field":"file",visible:!1,"edit-cell-template":"insertCellTemplate"}}),i("DxColumn",{attrs:{"data-field":"file_name","allow-adding":!0,"allow-editing":!0,caption:"File name","editor-options":t.fileNameInputOptions}}),i("DxColumn",{attrs:{type:"buttons"}},[i("DxButton",{attrs:{name:"image",hint:"download",icon:"download","on-click":t.DOWNLOAD}}),i("DxButton",{attrs:{name:"delete",hint:"Delete",icon:"trash"}})],1),i("DxHeaderFilter",{attrs:{visible:!0}}),i("DxScrolling",{attrs:{mode:"standard"}}),i("DxSearchPanel",{attrs:{visible:!0}}),i("DxPaging",{attrs:{"page-size":10,"page-index":0}}),i("DxPager",{attrs:{visible:!1,"show-page-size-selector":!0,"allowed-page-sizes":[5,10,"all"],"show-navigation-buttons":!0,"show-info":!0,"info-text":"Page {0} of {1} ({2} items)"}}),i("DxExport",{attrs:{enabled:!1}}),i("DxForm",[i("DxItem")],1)],1)],1)},w=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table-header-toolbar left",staticStyle:{width:"calc(100% - 231px)"}},[a("label",{attrs:{id:"hd"}},[e._v("General Document")])])}],y=(a(68309),a(78417));const I={name:"LibraryGeneral",components:{DxDataGrid:v.DxDataGrid,DxEditing:v.DxEditing,DxSearchPanel:v.DxSearchPanel,DxPaging:v.DxPaging,DxPager:v.DxPager,DxScrolling:v.DxScrolling,DxColumn:v.DxColumn,DxExport:v.DxExport,DxItem:v.DxItem,DxForm:v.DxForm,DxButton:v.DxButton,DxHeaderFilter:v.DxHeaderFilter,DxFileUploader:y.DxFileUploader},created:function(){console.clear(),this.FETCH_LIBRARY()},data:function(){return{file:[],library:[],dataGridAttributes:{class:"data-grid-style"},fileNameInputOptions:{placeholder:"Enter file name"}}},computed:{baseURL:function(){var e=this.$store.state.mode;return"dev"==e?this.$store.state.modeURL.dev:"prod"==e?this.$store.state.modeURL.prod:console.log("develpment mode set up incorrect.")}},methods:{FETCH_LIBRARY:function(){var e=this;this.isLoading=!0;var t=this.$route.params.id_tag;(0,n.Z)({method:"get",url:"/PressureVesselLibrary/get-library-by-type?id="+t+"&type=3",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(t){200==t.status&&(e.library=t.data,e.isLoading=!1)}))["catch"]((function(e){console.log(e)}))["finally"]((function(){e.isLoading=!1}))},ADD_NEW_FILE:function(e){var t,a=this,i=JSON.parse(localStorage.getItem("user")),o=new FormData;if(o.append("id",0),o.append("id_vessel",this.$route.params.id_tag),o.append("file_name",null!==(t=e.data.file_name)&&void 0!==t?t:""),o.append("id_type",3),o.append("created_by",i.id),o.append("file",this.file),0==this.file.length)return this.$ons.notification.alert("Please select file").then((function(e){0==e&&a.FETCH_LIBRARY()}));(0,n.Z)({method:"post",url:"/PressureVesselLibrary",headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:o}).then((function(e){console.log(e),201==e.status&&a.FETCH_LIBRARY()}))["catch"]((function(e){console.log(e),a.isLoading=!1,a.$ons.notification.alert(e.message,{title:"Add New File failed"}).then((function(e){0==e&&a.FETCH_LIBRARY()}))}))["finally"]((function(){a.isLoading=!1}))},VALUE_CHANGE:function(e){console.log(e),console.log(e.value[0].name);var t=new FileReader;t.readAsDataURL(e.value[0]),t.onload=function(){},this.file=e.value[0]},DOWNLOAD:function(e){var t=this.baseURL+e.row.data.file_path,a=document.createElement("a");a.href=t,a.setAttribute("download",e.row.data.file_name),document.body.appendChild(a),a.click()},DELETE_DOC:function(e){var t=this,a=e.data.id;(0,n.Z)({method:"delete",url:"/PressureVesselLibrary/"+a,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){204==e.status&&t.FETCH_LIBRARY()}))["catch"]((function(e){console.log(e),t.isLoading=!1,t.$ons.notification.alert(e.message,{title:"Delete failed"}).then((function(e){0==e&&t.FETCH_LIBRARY()}))}))["finally"]((function(){t.isLoading=!1}))}}},P=I;var T=(0,x.Z)(P,L,w,!1,null,"4a8cb17a",null);const A=T.exports;var F=function(){var e=this,t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"page-section"},[t._m(0),i("DxDataGrid",{attrs:{id:"const-data-grid","key-expr":"id","data-source":t.library,"element-attr":t.dataGridAttributes,"hover-state-enabled":!0,"allow-column-reordering":!0,"show-borders":!0,"show-row-lines":!0,"focused-row-enabled":!1,"row-alternation-enabled":!1},on:{"row-inserted":t.ADD_NEW_FILE,"row-removed":t.DELETE_DOC,"init-new-row":function(){e.file=[]}},scopedSlots:t._u([{key:"editCellTemplate",fn:function(e){return[i("div",[i("img",{attrs:{src:"http://tmt-solution.com/public/image-empty.png",width:"150",height:"100"}}),i("DxFileUploader",{attrs:{"select-button-text":"Select File","label-text":"","upload-mode":"useForm"},on:{"value-changed":t.VALUE_CHANGE}})],1)]}},{key:"insertCellTemplate",fn:function(){return[i("div",{staticClass:"widget-container"},[i("DxFileUploader",{attrs:{id:"file-uploader",multiple:!1,"upload-mode":"useForm",visible:!0},on:{"value-changed":t.VALUE_CHANGE}})],1)]},proxy:!0}])},[i("DxEditing",{attrs:{"allow-deleting":!0,"allow-adding":!0,"allow-updating":!0,"use-icons":!0,"show-borders":!0,mode:"form"}},[i("DxForm",{attrs:{"label-location":"top"}})],1),i("DxColumn",{attrs:{"data-field":"file",visible:!1,"edit-cell-template":"insertCellTemplate"}}),i("DxColumn",{attrs:{"data-field":"file_name","allow-adding":!0,"allow-editing":!0,caption:"File name","editor-options":t.fileNameInputOptions}}),i("DxColumn",{attrs:{type:"buttons"}},[i("DxButton",{attrs:{name:"image",hint:"download",icon:"download","on-click":t.DOWNLOAD}}),i("DxButton",{attrs:{name:"delete",hint:"Delete",icon:"trash"}})],1),i("DxHeaderFilter",{attrs:{visible:!0}}),i("DxScrolling",{attrs:{mode:"standard"}}),i("DxSearchPanel",{attrs:{visible:!0}}),i("DxPaging",{attrs:{"page-size":10,"page-index":0}}),i("DxPager",{attrs:{visible:!1,"show-page-size-selector":!0,"allowed-page-sizes":[5,10,"all"],"show-navigation-buttons":!0,"show-info":!0,"info-text":"Page {0} of {1} ({2} items)"}}),i("DxExport",{attrs:{enabled:!1}}),i("DxForm",[i("DxItem")],1)],1)],1)},N=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table-header-toolbar left",staticStyle:{width:"calc(100% - 231px)"}},[a("label",{attrs:{id:"hd"}},[e._v("Construction Document")])])}];const O={name:"LibraryConstruction",components:{DxDataGrid:v.DxDataGrid,DxEditing:v.DxEditing,DxSearchPanel:v.DxSearchPanel,DxPaging:v.DxPaging,DxPager:v.DxPager,DxScrolling:v.DxScrolling,DxColumn:v.DxColumn,DxExport:v.DxExport,DxItem:v.DxItem,DxForm:v.DxForm,DxButton:v.DxButton,DxHeaderFilter:v.DxHeaderFilter,DxFileUploader:y.DxFileUploader},created:function(){console.clear(),this.FETCH_LIBRARY()},data:function(){return{file:[],library:[],dataGridAttributes:{class:"data-grid-style"},fileNameInputOptions:{placeholder:"Enter file name"}}},computed:{baseURL:function(){var e=this.$store.state.mode;return"dev"==e?this.$store.state.modeURL.dev:"prod"==e?this.$store.state.modeURL.prod:console.log("develpment mode set up incorrect.")}},methods:{FETCH_LIBRARY:function(){var e=this;this.isLoading=!0;var t=this.$route.params.id_tag;(0,n.Z)({method:"get",url:"/PressureVesselLibrary/get-library-by-type?id="+t+"&type=1",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(t){200==t.status&&(e.library=t.data,e.isLoading=!1)}))["catch"]((function(e){console.log(e)}))["finally"]((function(){e.isLoading=!1}))},ADD_NEW_FILE:function(e){var t,a=this,i=JSON.parse(localStorage.getItem("user")),o=new FormData;if(o.append("id",0),o.append("id_vessel",this.$route.params.id_tag),o.append("file_name",null!==(t=e.data.file_name)&&void 0!==t?t:""),o.append("id_type",1),o.append("created_by",i.id),o.append("file",this.file),0==this.file.length)return this.$ons.notification.alert("Please select file").then((function(e){0==e&&a.FETCH_LIBRARY()}));(0,n.Z)({method:"post",url:"/PressureVesselLibrary",headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:o}).then((function(e){console.log(e),201==e.status&&a.FETCH_LIBRARY()}))["catch"]((function(e){console.log(e),a.isLoading=!1,a.$ons.notification.alert(e.message,{title:"Add New File failed"}).then((function(e){0==e&&a.FETCH_LIBRARY()}))}))["finally"]((function(){a.isLoading=!1}))},VALUE_CHANGE:function(e){console.log(e),console.log(e.value[0].name);var t=new FileReader;t.readAsDataURL(e.value[0]),t.onload=function(){},this.file=e.value[0]},DOWNLOAD:function(e){var t=this.baseURL+e.row.data.file_path,a=document.createElement("a");a.href=t,a.setAttribute("download",e.row.data.file_name),document.body.appendChild(a),a.click()},DELETE_DOC:function(e){var t=this,a=e.data.id;(0,n.Z)({method:"delete",url:"/PressureVesselLibrary/"+a,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){204==e.status&&t.FETCH_LIBRARY()}))["catch"]((function(e){console.log(e),t.isLoading=!1,t.$ons.notification.alert(e.message,{title:"Delete failed"}).then((function(e){0==e&&t.FETCH_LIBRARY()}))}))["finally"]((function(){t.isLoading=!1}))}}},V=O;var R=(0,x.Z)(V,F,N,!1,null,"17437d66",null);const S=R.exports;var k=function(){var e=this,t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"page-section"},[t._m(0),i("DxDataGrid",{attrs:{id:"const-data-grid","key-expr":"id","data-source":t.library,"element-attr":t.dataGridAttributes,"hover-state-enabled":!0,"allow-column-reordering":!0,"show-borders":!0,"show-row-lines":!0,"focused-row-enabled":!1,"row-alternation-enabled":!1},on:{"row-inserted":t.ADD_NEW_FILE,"row-removed":t.DELETE_DOC,"init-new-row":function(){e.file=[]}},scopedSlots:t._u([{key:"editCellTemplate",fn:function(e){return[i("div",[i("img",{attrs:{src:"http://tmt-solution.com/public/image-empty.png",width:"150",height:"100"}}),i("DxFileUploader",{attrs:{"select-button-text":"Select File","label-text":"","upload-mode":"useForm"},on:{"value-changed":t.VALUE_CHANGE}})],1)]}},{key:"insertCellTemplate",fn:function(){return[i("div",{staticClass:"widget-container"},[i("DxFileUploader",{attrs:{id:"file-uploader",multiple:!1,"upload-mode":"useForm",visible:!0},on:{"value-changed":t.VALUE_CHANGE,uploaded:t.VALUE_CHANGE}})],1)]},proxy:!0}])},[i("DxEditing",{attrs:{"allow-deleting":!0,"allow-adding":!0,"allow-updating":!0,"use-icons":!0,"show-borders":!0,mode:"form"}},[i("DxForm",{attrs:{"label-location":"top"}})],1),i("DxColumn",{attrs:{"data-field":"file",visible:!1,"edit-cell-template":"insertCellTemplate"}}),i("DxColumn",{attrs:{"data-field":"file_name","allow-adding":!0,"allow-editing":!0,caption:"File name","editor-options":t.fileNameInputOptions}}),i("DxColumn",{attrs:{type:"buttons"}},[i("DxButton",{attrs:{name:"image",hint:"download",icon:"download","on-click":t.DOWNLOAD}}),i("DxButton",{attrs:{name:"delete",hint:"Delete",icon:"trash"}})],1),i("DxHeaderFilter",{attrs:{visible:!0}}),i("DxScrolling",{attrs:{mode:"standard"}}),i("DxSearchPanel",{attrs:{visible:!0}}),i("DxPaging",{attrs:{"page-size":10,"page-index":0}}),i("DxPager",{attrs:{visible:!1,"show-page-size-selector":!0,"allowed-page-sizes":[5,10,"all"],"show-navigation-buttons":!0,"show-info":!0,"info-text":"Page {0} of {1} ({2} items)"}}),i("DxExport",{attrs:{enabled:!1}}),i("DxForm",[i("DxItem")],1)],1)],1)},U=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table-header-toolbar left",staticStyle:{width:"calc(100% - 231px)"}},[a("label",{attrs:{id:"hd"}},[e._v("Inspection Document")])])}];const $={name:"LibraryInspection",components:{DxDataGrid:v.DxDataGrid,DxEditing:v.DxEditing,DxSearchPanel:v.DxSearchPanel,DxPaging:v.DxPaging,DxPager:v.DxPager,DxScrolling:v.DxScrolling,DxColumn:v.DxColumn,DxExport:v.DxExport,DxItem:v.DxItem,DxForm:v.DxForm,DxButton:v.DxButton,DxHeaderFilter:v.DxHeaderFilter,DxFileUploader:y.DxFileUploader},created:function(){console.clear(),this.FETCH_LIBRARY()},data:function(){return{file:[],library:[],dataGridAttributes:{class:"data-grid-style"},fileNameInputOptions:{placeholder:"Enter file name"}}},computed:{baseURL:function(){var e=this.$store.state.mode;return"dev"==e?this.$store.state.modeURL.dev:"prod"==e?this.$store.state.modeURL.prod:console.log("develpment mode set up incorrect.")}},methods:{FETCH_LIBRARY:function(){var e=this;this.isLoading=!0;var t=this.$route.params.id_tag;(0,n.Z)({method:"get",url:"/PressureVesselLibrary/get-library-by-type?id="+t+"&type=2",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(t){200==t.status&&(e.library=t.data,e.isLoading=!1)}))["catch"]((function(e){console.log(e)}))["finally"]((function(){e.isLoading=!1}))},ADD_NEW_FILE:function(e){var t,a=this,i=JSON.parse(localStorage.getItem("user")),o=new FormData;if(o.append("id",0),o.append("id_vessel",this.$route.params.id_tag),o.append("file_name",null!==(t=e.data.file_name)&&void 0!==t?t:""),o.append("id_type",2),o.append("created_by",i.id),o.append("file",this.file),0==this.file.length)return this.$ons.notification.alert("Please select file").then((function(e){0==e&&a.FETCH_LIBRARY()}));(0,n.Z)({method:"post",url:"/PressureVesselLibrary",headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:o}).then((function(e){console.log(e),201==e.status&&a.FETCH_LIBRARY()}))["catch"]((function(e){console.log(e),a.isLoading=!1,a.$ons.notification.alert(e.message,{title:"Add New File failed"}).then((function(e){0==e&&a.FETCH_LIBRARY()}))}))["finally"]((function(){a.isLoading=!1}))},VALUE_CHANGE:function(e){console.log(e),console.log(e.value[0].name);var t=new FileReader;t.readAsDataURL(e.value[0]),t.onload=function(){},this.file=e.value[0]},DOWNLOAD:function(e){var t=this.baseURL+e.row.data.file_path,a=document.createElement("a");a.href=t,a.setAttribute("download",e.row.data.file_name),document.body.appendChild(a),a.click()},DELETE_DOC:function(e){var t=this,a=e.data.id;(0,n.Z)({method:"delete",url:"/PressureVesselLibrary/"+a,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){204==e.status&&t.FETCH_LIBRARY()}))["catch"]((function(e){console.log(e),t.isLoading=!1,t.$ons.notification.alert(e.message,{title:"Delete failed"}).then((function(e){0==e&&t.FETCH_LIBRARY()}))}))["finally"]((function(){t.isLoading=!1}))}}},B=$;var H=(0,x.Z)(B,k,U,!1,null,"26ce18c9",null);const G=H.exports,z={name:"PressureVesselInformation",components:{VueTabsChrome:d(),contentLoading:c.Z,previewImage:u.Z,tableComponent:E,tableGeneralDoc:A,tableConstDoc:S,tableInsp:G},created:function(){this.$store.commit("UPDATE_CURRENT_PAGENAME",{subpageName:"Pressure Vessel Information",subpageInnerName:null}),this.FETCH_INFO()},data:function(){return{infoVessel:{},file_pic_upload:"",tabCurrent:"info",tabs:[{label:"General Information",key:"info",closable:!1},{label:"Construction Document",key:"const",closable:!1},{label:"Inspection Document",key:"insp",closable:!1},{label:"General Document",key:"doc",closable:!1}],previewImg:"",isLoading:!1}},computed:{generalInfo:function(){var e=[{desc:"Tag No.",value:this.infoVessel.id},{desc:"Insulation",value:this.infoVessel.insulation},{desc:"Pressure Vessel No.",value:this.infoVessel.vessel_no},{desc:"Insulation Type",value:this.infoVessel.insulation_type},{desc:"Site",value:this.infoVessel.id_site},{desc:"Insulation Size (mm)",value:this.infoVessel.insulation_size},{desc:"Description",value:this.infoVessel.vessel_desc},{desc:"CAd",value:this.infoVessel.CAd},{desc:"Design Code",value:this.infoVessel.design_code},{desc:"Ld",value:this.infoVessel.Ld},{desc:"Height (mm)",value:this.infoVessel.height_mm},{desc:"Internal Coating",value:this.infoVessel.internal_coating},{desc:"P&ID No.",value:this.infoVessel.pid_no},{desc:"Internal Coating Type",value:this.infoVessel.internal_coating_type},{desc:"Drawing No.",value:this.infoVessel.drawing_no},{desc:"External Coating",value:this.infoVessel.external_coating},{desc:"Construction Material",value:this.infoVessel.material_of_const},{desc:"External Coating Type",value:this.infoVessel.external_coating_type},{desc:"Inservice Date",value:this.infoVessel.next_insp_date?l()(this.infoVessel.inservice_date).format("LL"):null},{desc:"Cladding Material",value:this.infoVessel.cladding_material},{desc:"Internal Lining",value:this.infoVessel.internal_lining},{desc:"Cladding Material Type",value:this.infoVessel.cladding_material_type},{desc:"Code Stamp",value:this.infoVessel.code_stamp},{desc:"Equipment Type",value:this.infoVessel.equipment_type},{desc:"RT",value:this.infoVessel.RT},{desc:"Equipment Desc",value:this.infoVessel.equipment_desc},{desc:"PWHT",value:this.infoVessel.PWHT},{desc:"Tube Material",value:this.infoVessel.tube_material},{desc:"Tube Outside Diameter (mm)",value:this.infoVessel.tube_OD_mm},{desc:"Tube Service",value:this.infoVessel.tube_service},{desc:"Tube Nominal Thickness (mm)",value:this.infoVessel.tube_t_nom},{desc:"Tube Type",value:this.infoVessel.tube_type},{desc:"Tube Quantity",value:this.infoVessel.tube_quantity},{desc:"Tube Length (m)",value:this.infoVessel.tube_length}];return e},baseURL:function(){var e=this.$store.state.mode;return"dev"==e?this.$store.state.modeURL.dev:"prod"==e?this.$store.state.modeURL.prod:console.log("develpment mode set up incorrect.")}},watch:{$route:{handler:function(){this.FETCH_INFO()}}},methods:{FETCH_INFO:function(){var e=this;console.log("==> FETCH Vessel INFO: "),this.isLoading=!0;var t=this.$route.params.id_tag;(0,n.Z)({method:"get",url:"PressureVesselInfo/"+t,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:{}}).then((function(t){200==t.status&&t.data&&(e.infoVessel=t.data,console.log(e.infoVessel))}))["catch"]((function(e){console.log(e)}))["finally"]((function(){e.isLoading=!1}))},UPLOAD_PIC:function(e){var t=this;this.isLoading=!0;var a=this.$route.params.id_tag;if(this.file_pic_upload=1==e?this.$refs.pic_upload_ov.files[0]:this.$refs.pic_upload_np.files[0],this.file_pic_upload&&"image/jpeg"==this.file_pic_upload.type||"image/png"==this.file_pic_upload.type)if(this.file_pic_upload.size<2e7)(0,n.Z)({method:"post",url:"/PressureVesselInfo/upload-pic",headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:{id:a,file:this.file_pic_upload,type:e}}).then((function(e){200==e.status&&(t.FETCH_INFO(),console.log("==> Vessel INFO IMG UPLOAD: DONE"),t.isLoading=!1)}))["catch"]((function(e){t.isLoading=!1,t.$ons.notification.alert(e.code+" "+e.response.status+" "+e.message)}))["finally"]((function(){}));else{this.$ons.notification.alert("File size too large. (20 MB max)");var i=document.getElementById("pic-upload-btn");i.val="",this.isLoading=!1}else{this.$ons.notification.alert("Incorrect filetype. <br/> Only JPEG/PNG file can be uploaded.");var o=document.getElementById("pic-upload-btn");o.val="",this.isLoading=!1}},DELETE_PIC:function(e,t){var a=this;this.$ons.notification.confirm("Confirm delete?").then((function(i){if(1==i){a.isLoading=!0;var o=a.$route.params.id_tag;(0,n.Z)({method:"delete",url:"/PressureVesselInfo/delete-pic",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:{id:o,file_path:e,type:t}}).then((function(e){200==e.status&&(a.FETCH_INFO(),console.log("==> Vessel INFO IMG DELETE: DONE"),a.isLoading=!1)}))["catch"]((function(e){a.isLoading=!1,a.$ons.notification.alert(e.code+" "+e.response.status+" "+e.message)}))["finally"]((function(){a.FETCH_INFO()}))}}))},PREVIEW_PIC:function(e){e&&(this.previewImg=e)},PREVIEW_PIC_CLOSE:function(){this.previewImg=""}}},Z=z;var M=(0,x.Z)(Z,i,o,!1,null,"c8c66714",null);const W=M.exports}}]);
//# sourceMappingURL=2210.88a4546c.js.map