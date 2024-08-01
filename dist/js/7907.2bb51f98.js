"use strict";(self["webpackChunktims_dexon"]=self["webpackChunktims_dexon"]||[]).push([[7907],{79228:(t,e,a)=>{a.r(e),a.d(e,{default:()=>D});var i=function(){var t=this,e=this,a=e.$createElement,i=e._self._c||a;return i("div",{staticClass:"page-container"},[i("div",{staticClass:"list-page",staticStyle:{"grid-column":"span 2"}},[i("DxDataGrid",{attrs:{id:"data-grid-style","key-expr":"id","data-source":e.drawingList,"element-attr":e.dataGridAttributes,"hover-state-enabled":!0,"allow-column-reordering":!0,"show-borders":!0,"show-row-lines":!0,"row-alternation-enabled":!1},on:{exporting:e.EXPORT_DATA,"row-inserted":e.CREATE_DWG,"row-updated":e.UPDATE_DWG,"row-removed":e.DELETE_DWG,"editing-start":function(e){t.isEdit=!1,t.display_img_on_upload=e.data.file_path,t.file=[],t.dataDwgTemp=e},"init-new-row":function(){t.display_img_on_upload="",t.file=[]},saved:e.SAVE},scopedSlots:e._u([{key:"dwg-img",fn:function(t){var a=t.data;return[i("div",{staticStyle:{position:"relative"}},[i("a",{attrs:{href:e.baseURL+a.value,download:"dwg",target:"_blank"}},[i("img",{attrs:{src:e.baseURL+a.value,width:"300",height:"200"}}),i("br")])])]}},{key:"dwg-img-editor",fn:function(t){var a=t.data;return[i("div",[""!=e.display_img_on_upload&&0==e.isEdit?i("img",{attrs:{src:e.baseURL+a.value,width:"300",height:"200"}}):e._e(),""!=e.display_img_on_upload&&1==e.isEdit?i("img",{attrs:{src:e.display_img_on_upload,width:"300",height:"200"}}):e._e(),""==e.display_img_on_upload?i("img",{attrs:{src:"http://tmt-solution.com/public/image-empty.png",width:"300",height:"200"}}):e._e(),i("DxFileUploader",{attrs:{"select-button-text":"Select photo","label-text":"",accept:"image/*","upload-mode":"useForm"},on:{"value-changed":e.ON_DWG_CHANGE}})],1)]}}])},[i("DxEditing",{attrs:{"allow-updating":!0,"allow-deleting":!0,"allow-adding":!0,"use-icons":!0,mode:"form"}},[i("DxForm",{attrs:{"label-location":"top"}},[i("DxItem",{attrs:{"col-count":2,"col-span":2,"item-type":"group"}},[i("DxItem",{attrs:{"data-field":"file_path","col-span":2}})],1)],1)],1),i("DxColumn",{attrs:{"data-field":"file_path",caption:"Marked-up Drawing","cell-template":"dwg-img","edit-cell-template":"dwg-img-editor",width:320}}),i("DxScrolling",{attrs:{mode:"standard"}}),i("DxSearchPanel",{attrs:{visible:!0}}),i("DxPaging",{attrs:{"page-size":10,"page-index":0}}),i("DxPager",{attrs:{"show-page-size-selector":!0,"allowed-page-sizes":[5,10,20],"show-navigation-buttons":!0,"show-info":!0,"info-text":"Page {0} of {1} ({2} items)"}}),i("DxExport",{attrs:{enabled:!1}})],1)],1)])},n=[],o=(a(41539),a(39477)),r=a(71642),s=a(53706),l=a.n(s),d=a(66262),c=a(48626),u=a(78417),g=a(60082);const p={name:"ViewProjectList",components:{DxDataGrid:c.DxDataGrid,DxSearchPanel:c.DxSearchPanel,DxPaging:c.DxPaging,DxPager:c.DxPager,DxScrolling:c.DxScrolling,DxColumn:c.DxColumn,DxExport:c.DxExport,DxEditing:c.DxEditing,DxFileUploader:u.DxFileUploader,DxForm:c.DxForm,DxItem:g.DxItem},created:function(){this.$store.commit("UPDATE_CURRENT_PAGENAME",{subpageName:"Marked-Up Drawing"}),this.VIEW_ITEM()},data:function(){return{drawingList:[],isLoading:!1,display_img_on_upload:"",file:[],isEdit:!1,dataGridAttributes:{class:"data-grid-style"},pagePanelHiding:!1,dataDwgTemp:"",fileNameInputOptions:{placeholder:"Enter file name ..."}}},computed:{baseURL:function(){var t=this.$store.state.mode;return"dev"==t?this.$store.state.modeURL.dev:"prod"==t?this.$store.state.modeURL.prod:console.log("develpment mode set up incorrect.")}},methods:{EXPORT_DATA:function(t){var e=new r.Workbook,a=e.addWorksheet("Projects");(0,d.d)({worksheet:a,component:t.component}).then((function(){e.xlsx.writeBuffer().then((function(t){l()(new Blob([t],{type:"application/octet-stream"}),"Projects.xlsx")}))})),t.cancel=!0},VIEW_ITEM:function(){var t=this;this.isLoading=!0,this.drawingList=[],(0,o.Z)({method:"get",url:"PressureVesselDrawing/get-pv-by-id-tag/"+this.$route.params.id_tag,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:{}}).then((function(e){console.log("drawing list:"),console.log(e.data),200==e.status&&e.data&&(t.drawingList=e.data)}))["catch"]((function(t){console.log(t)}))["finally"]((function(){t.isLoading=!1}))},CREATE_DWG:function(){var t=this,e=new FormData,a=JSON.parse(localStorage.getItem("user"));if(e.append("id_tag",this.$route.params.id_tag),e.append("file",this.file),e.append("created_by",a.id),e.append("updated_by",a.id),0==this.file.length)return this.$ons.notification.alert("Please select file").then((function(e){0==e&&t.VIEW_ITEM()}));(0,o.Z)({method:"post",url:"PressureVesselDrawing",headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:e}).then((function(e){201==e.status&&e.data&&t.VIEW_ITEM()}))["catch"]((function(e){console.log(e),t.$ons.notification.alert(e.message,{title:"Add New Drawing Failed"}).then((function(e){0==e&&t.VIEW_ITEM()}))}))["finally"]((function(){t.isLoading=!1}))},UPDATE_DWG:function(t){var e=this,a=new FormData,i=JSON.parse(localStorage.getItem("user"));a.append("id",t.key),a.append("id_tag",this.$route.params.id_tag),a.append("file",this.file),a.append("file_path",t.data.file_path),a.append("updated_by",i.id),(0,o.Z)({method:"put",url:"PressureVesselDrawing/"+t.key,headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:a}).then((function(t){204==t.status&&e.VIEW_ITEM()}))["catch"]((function(t){console.log(t),e.$ons.notification.alert(t.message,{title:"Update Drawing Failed"}).then((function(t){0==t&&e.VIEW_ITEM()}))}))["finally"]((function(){e.isLoading=!1}))},DELETE_DWG:function(t){var e=this;(0,o.Z)({method:"delete",url:"PressureVesselDrawing/"+t.key,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:{}}).then((function(t){204==t.status&&e.VIEW_ITEM()}))["catch"]((function(t){console.log(t),e.$ons.notification.alert(t.message,{title:"Delete Drawing Failed"}).then((function(t){0==t&&e.VIEW_ITEM()}))}))["finally"]((function(){e.isLoading=!1}))},ON_DWG_CHANGE:function(t){var e=this,a=new FileReader;a.readAsDataURL(t.value[0]),a.onload=function(){e.display_img_on_upload=a.result},this.isEdit=!0,this.file=t.value[0]},SAVE:function(){this.isEdit&&this.UPDATE_DWG(this.dataDwgTemp)}}},h=p;var m=a(1001),f=(0,m.Z)(h,i,n,!1,null,"6b3853b2",null);const D=f.exports},5735:(t,e,a)=>{var i=a(82109),n=a(47293),o=a(47908),r=a(57593),s=n((function(){return null!==new Date(NaN).toJSON()||1!==Date.prototype.toJSON.call({toISOString:function(){return 1}})}));i({target:"Date",proto:!0,forced:s},{toJSON:function(t){var e=o(this),a=r(e,"number");return"number"!=typeof a||isFinite(a)?e.toISOString():null}})},83753:(t,e,a)=>{var i=a(82109),n=a(46916);i({target:"URL",proto:!0,enumerable:!0},{toJSON:function(){return n(URL.prototype.toString,this)}})}}]);
//# sourceMappingURL=7907.2bb51f98.js.map