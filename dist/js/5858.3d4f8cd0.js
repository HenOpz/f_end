"use strict";(self["webpackChunktims_dexon"]=self["webpackChunktims_dexon"]||[]).push([[5858],{30594:(t,e,a)=>{a.d(e,{Z:()=>c});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-content-loading"},[a("div",{staticClass:"box"},[a("hash-loader",{staticClass:"custom-class",attrs:{color:"#1e1450",loading:!0,size:40,sizeUnit:"px"}})],1)])},n=[];const s={name:"AppLoading",props:{text:String,icon:String,color:String}},o=s;var l=a(1001),r=(0,l.Z)(o,i,n,!1,null,"cf1f01c2",null);const c=r.exports},96348:(t,e,a)=>{a.d(e,{Z:()=>c});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"image-preview-wrapper"},[a("div",{staticClass:"preview-popup"},[a("v-ons-toolbar-button",{staticClass:"btn-close",on:{click:function(e){return t.CLOSE_PREVIEW()}}},[a("i",{staticClass:"las la-times"})]),a("v-ons-toolbar-button",{staticClass:"btn-close download"},[a("a",{attrs:{target:"_blank",href:t.baseURL+t.imageURL,download:""}},[a("i",{staticClass:"las la-download"})])]),a("img",{attrs:{src:t.baseURL+t.imageURL}})],1)])},n=[];a(74916),a(23123);const s={name:"image-preview",props:{imageURL:String},computed:{baseURL:function(){var t=this.$store.state.mode;return"dev"==t?this.$store.state.modeURL.dev:"prod"==t?this.$store.state.modeURL.prod:console.log("develpment mode set up incorrect.")}},methods:{DOWNLOAD_IMG:function(t){var e=document.createElement("a");e.href=t,e.download=t.split("/").pop(),document.body.appendChild(e),e.click(),document.body.removeChild(e)},CLOSE_PREVIEW:function(){this.$emit("close-preview")}}},o=s;var l=a(1001),r=(0,l.Z)(o,i,n,!1,null,"4574c401",null);const c=r.exports},5314:(t,e,a)=>{a.r(e),a.d(e,{default:()=>v});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-container"},[a("div",{staticClass:"tab-wrapper"},[a("vue-tabs-chrome",{attrs:{tabs:t.tabs},model:{value:t.tabCurrent,callback:function(e){t.tabCurrent=e},expression:"tabCurrent"}})],1),"info"==t.tabCurrent?a("div",{staticClass:"page-section info-tab-display"},[a("div",{staticClass:"report-sheet report-sheet-info",staticStyle:{"grid-row":"span 2"}},[a("div",{staticClass:"report-container"},[a("div",{staticClass:"sheet-body",staticStyle:{"grid-template-columns":"50% 50%"}},[t._m(0),t._l(t.generalInfo,(function(e){return a("div",{key:e.desc,staticClass:"form-item"},[a("div",{staticClass:"form-item-label"},[a("label",[t._v(t._s(e.desc))])]),a("div",{staticClass:"form-item-value"},[a("label",[t._v(t._s(e.value))])])])})),a("div",{staticClass:"form-item",staticStyle:{"grid-column":"span 2","grid-row":"span 2",height:"49px","border-bottom":"0.5px solid black"}},[t._m(1),a("div",{staticClass:"form-item-value",staticStyle:{height:"36px"}},[a("label",[t._v(t._s(t.infoTank.foundation))])])])],2)])]),a("div",{staticClass:"report-sheet"},[a("div",{staticClass:"report-container"},[a("div",{staticClass:"sheet-body"},[a("div",[t._m(2),a("div",{staticClass:"form-item-picture-log"},[a("div",{staticClass:"img-box"},[a("div",{staticClass:"btn-panel"},[t.infoTank.overview_img_path?a("v-ons-toolbar-button",{staticClass:"pic-toolbar-btn",on:{click:function(e){return t.PREVIEW_PIC(t.infoTank.overview_img_path)}}},[a("i",{staticClass:"las la-eye"})]):t._e(),t.infoTank.overview_img_path?a("v-ons-toolbar-button",{staticClass:"pic-toolbar-btn",on:{click:function(e){return t.DELETE_PIC(t.infoTank.overview_img_path,1)}}},[a("i",{staticClass:"las la-trash"})]):t._e(),a("v-ons-toolbar-button",[t.infoTank.overview_img_path?t._e():a("label",{staticClass:"pic-toolbar-btn",attrs:{for:"pic-upload-btn"}},[a("i",{staticClass:"las la-plus"})])])],1),t.infoTank.overview_img_path?a("img",{attrs:{src:t.baseURL+t.infoTank.overview_img_path}}):t._e(),a("input",{ref:"pic_upload_ov",staticStyle:{display:"none"},attrs:{type:"file",id:"pic-upload-btn"},on:{change:function(e){return t.UPLOAD_PIC(1)}}}),a("div",{},[t.infoTank.overview_img_path?t._e():a("i",{staticClass:"las la-image"}),t.infoTank.overview_img_path?t._e():a("label",[t._v("No Image")])])])])])])])]),a("div",{staticClass:"report-sheet"},[a("div",{staticClass:"report-container"},[a("div",{staticClass:"sheet-body"},[a("div",[t._m(3),a("div",{staticClass:"form-item-picture-log"},[a("div",{staticClass:"img-box"},[a("div",{staticClass:"btn-panel"},[t.infoTank.name_plate_img_path?a("v-ons-toolbar-button",{staticClass:"pic-toolbar-btn",on:{click:function(e){return t.PREVIEW_PIC(t.infoTank.name_plate_img_path)}}},[a("i",{staticClass:"las la-eye"})]):t._e(),t.infoTank.name_plate_img_path?a("v-ons-toolbar-button",{staticClass:"pic-toolbar-btn",on:{click:function(e){return t.DELETE_PIC(t.infoTank.name_plate_img_path,2)}}},[a("i",{staticClass:"las la-trash"})]):t._e(),t.infoTank.name_plate_img_path?t._e():a("v-ons-toolbar-button",[t.infoTank.name_plate_img_path?t._e():a("label",{staticClass:"pic-toolbar-btn",attrs:{for:"pic-upload-btn-2"}},[a("i",{staticClass:"las la-plus"})])])],1),t.infoTank.name_plate_img_path?a("img",{attrs:{src:t.baseURL+t.infoTank.name_plate_img_path}}):t._e(),a("input",{ref:"pic_upload_np",staticStyle:{display:"none"},attrs:{type:"file",id:"pic-upload-btn-2"},on:{change:function(e){return t.UPLOAD_PIC(2)}}}),t.infoTank.name_plate_img_path?t._e():a("i",{staticClass:"las la-image"}),t.infoTank.name_plate_img_path?t._e():a("label",[t._v("No Image")])])])])])])])]):t._e(),1==t.isLoading?a("contentLoading",{attrs:{text:"Loading, please wait...",color:"#fc9b21"}}):t._e(),t.previewImg?a("previewImage",{attrs:{imageURL:t.previewImg},on:{"close-preview":function(e){return t.PREVIEW_PIC_CLOSE()}}}):t._e()],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"section-label",staticStyle:{"grid-column":"span 2"}},[a("label",[t._v("Tank information")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-item-label",staticStyle:{height:"36px"}},[a("label",[t._v("Foundation")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"section-label"},[a("label",[t._v("overview picture")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"section-label"},[a("label",[t._v("name plate picture")])])}],s=(a(41539),a(39477)),o=a(17133),l=a.n(o),r=a(25930),c=a.n(r),d=a(30594),u=a(96348);const p={name:"StorageTankInfo",components:{VueTabsChrome:c(),contentLoading:d.Z,previewImage:u.Z},created:function(){this.$store.commit("UPDATE_CURRENT_PAGENAME",{subpageName:"Tank Information",subpageInnerName:null}),this.FETCH_INFO()},data:function(){return{infoTank:{},file_pic_upload:"",tabCurrent:"info",tabs:[{label:"General Information",key:"info",closable:!1}],previewImg:"",isLoading:!1}},computed:{generalInfo:function(){var t=[{desc:"Construction Code",value:this.infoTank.id_construction_code},{desc:"Tank Status",value:this.infoTank.tank_status},{desc:"Inspection Code",value:this.infoTank.inspection_code},{desc:"Tank Capacity (Litre)",value:this.infoTank.tank_capacity_litre},{desc:"Tank Height (m)",value:this.infoTank.tank_height_m},{desc:"Joint Efficiency",value:this.infoTank.joint_efficiency},{desc:"Max. Liquid Level (m)",value:this.infoTank.max_liquid_level_m},{desc:"Bottom Nominal Thk. (mm)",value:this.infoTank.bottom_nominal_thk_mm},{desc:"Diameter (m)",value:this.infoTank.diameter_m},{desc:"Annular Nominal Thk. (mm)",value:this.infoTank.annular_nominal_thk_mm},{desc:"No. of Shell Course",value:this.infoTank.no_of_shell_course},{desc:"Roof Nominal Thk. (mm)",value:this.infoTank.roof_nominal_thk_mm},{desc:"Tank Internal Pressure ",value:this.infoTank.tank_internal_pressure},{desc:"Design Pressure Shell",value:this.infoTank.design_pressure_shell},{desc:"Roof Type",value:this.infoTank.roof_type},{desc:"Operating Pressure Shell",value:this.infoTank.ope_pressure_shell},{desc:"Roof Shape",value:this.infoTank.roof_shape},{desc:"Design Pressure Coil",value:this.infoTank.design_pressure_coil},{desc:"Bottom",value:this.infoTank.bottom_type},{desc:"Operating Pressure Coil",value:this.infoTank.ope_pressure_coil},{desc:"Insulation ",value:this.infoTank.insulation},{desc:"Installation Date ",value:l()(this.infoTank.installation_date).format("LL")},{desc:"Insulation Thickness (mm)",value:this.infoTank.insulation_thk_mm},{desc:"First In-service Date ",value:l()(this.infoTank.inservice_date).format("LL")},{desc:"Product",value:this.infoTank.product_code},{desc:"Previous Inspection Date",value:this.infoTank.last_inspection_date?l()(this.infoTank.last_inspection_date).format("LL"):null},{desc:"Specific Gravity",value:this.infoTank.sg_of_product},{desc:"In-service Age of Tank (year)",value:this.infoTank.inservice_age_of_tank_yrs}];return t},baseURL:function(){var t=this.$store.state.mode;return"dev"==t?this.$store.state.modeURL.dev:"prod"==t?this.$store.state.modeURL.prod:console.log("develpment mode set up incorrect.")}},watch:{$route:{handler:function(){this.FETCH_INFO()}}},methods:{FETCH_INFO:function(){var t=this;console.log("==> FETCH TANK INFO: "),this.isLoading=!0;var e=this.$route.params.id_tag;(0,s.Z)({method:"get",url:"TankInfo/"+e,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:{}}).then((function(e){200==e.status&&e.data&&(t.infoTank=e.data,console.log(t.infoTank))}))["catch"]((function(t){console.log(t)}))["finally"]((function(){t.isLoading=!1}))},UPLOAD_PIC:function(t){var e=this;this.isLoading=!0;var a=this.$route.params.id_tag;if(this.file_pic_upload=1==t?this.$refs.pic_upload_ov.files[0]:this.$refs.pic_upload_np.files[0],this.file_pic_upload&&"image/jpeg"==this.file_pic_upload.type||"image/png"==this.file_pic_upload.type)if(this.file_pic_upload.size<2e7)(0,s.Z)({method:"post",url:"/Tank/upload-pic",headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:{id:a,file:this.file_pic_upload,type:t}}).then((function(t){200==t.status&&(e.FETCH_INFO(),console.log("==> TANK INFO IMG UPLOAD: DONE"),e.isLoading=!1)}))["catch"]((function(t){e.isLoading=!1,e.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}));else{this.$ons.notification.alert("File size too large. (20 MB max)");var i=document.getElementById("pic-upload-btn");i.val="",this.isLoading=!1}else{this.$ons.notification.alert("Incorrect filetype. <br/> Only JPEG/PNG file can be uploaded.");var n=document.getElementById("pic-upload-btn");n.val="",this.isLoading=!1}},DELETE_PIC:function(t,e){var a=this;this.$ons.notification.confirm("Confirm delete?").then((function(i){if(1==i){a.isLoading=!0;var n=a.$route.params.id_tag;(0,s.Z)({method:"delete",url:"/Tank/delete-pic",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:{id_tag:n,file_path:t,type:e}}).then((function(t){200==t.status&&(a.FETCH_INFO(),console.log("==> TANK INFO IMG DELETE: DONE"),a.isLoading=!1)}))["catch"]((function(t){a.isLoading=!1,a.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){a.FETCH_INFO()}))}}))},PREVIEW_PIC:function(t){t&&(this.previewImg=t)},PREVIEW_PIC_CLOSE:function(){this.previewImg=""}}},_=p;var f=a(1001),m=(0,f.Z)(_,i,n,!1,null,"47964c91",null);const v=m.exports},34553:(t,e,a)=>{var i=a(82109),n=a(42092).findIndex,s=a(51223),o="findIndex",l=!0;o in[]&&Array(1)[o]((function(){l=!1})),i({target:"Array",proto:!0,forced:l},{findIndex:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),s(o)}}]);
//# sourceMappingURL=5858.3d4f8cd0.js.map