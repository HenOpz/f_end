"use strict";(self["webpackChunktims_dexon"]=self["webpackChunktims_dexon"]||[]).push([[741],{80741:(t,e,a)=>{a.d(e,{Z:()=>P});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app-toolbar"}},[a("div",{staticClass:"left-col"},[t.isBack?a("v-ons-toolbar-button",{on:{click:function(e){return t.$router.go(-1)}}},[a("i",{staticClass:"las la-angle-left"}),a("span",[t._v("Back")])]):t._e(),t.isBackPath?a("v-ons-toolbar-button",{on:{click:function(e){return t.GO_BACK_TO()}}},[a("i",{staticClass:"las la-angle-left"}),a("span",[t._v("Back")])]):t._e(),t.infoLifting?a("span",{staticStyle:{position:"absolute",top:"6px",left:"124px","font-size":"12px",color:"red"}},[t._v("id: "+t._s(t.infoLifting.id))]):t._e(),a("h1",[t._v(t._s(t.pageName))]),a("h2",[t._v(t._s(t.pageSubName))]),t.pageSubInnerName?a("div",{staticClass:"sub-page-box"},[t._m(0),a("h2",[t._v(t._s(t.pageSubInnerName))])]):t._e(),t.infoLifting?a("div",{staticClass:"toolbar-info mobile-none"},[a("div",{staticClass:"info-item"},[a("label",{staticClass:"desc"},[t._v("Tag No:")]),a("label",{staticClass:"value"},[t._v(t._s(t.infoLifting.tag_no))])]),a("div",{staticClass:"info-item"},[a("label",{staticClass:"desc"},[t._v("Serial No:")]),a("label",{staticClass:"value"},[t._v(t._s(t.infoLifting.serial_no))])]),a("div",{staticClass:"info-item"},[a("label",{staticClass:"desc"},[t._v("Site Name:")]),a("label",{staticClass:"value"},[t._v(t._s(t.infoLifting.site_name))])])]):t._e()],1),a("div",{staticClass:"right-col"},[1==t.isSearchBoxList?a("div",{staticClass:"search-box"},[a("i",{staticClass:"las la-search search"}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.searchKeyword,expression:"searchKeyword"}],attrs:{type:"text",placeholder:"search tag no."},domProps:{value:t.searchKeyword},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.$emit("isSearch")},input:function(e){e.target.composing||(t.searchKeyword=e.target.value)}}}),""!=t.searchKeyword?a("i",{staticClass:"las la-times clear",on:{click:function(e){return t.CLEAR_SEARCH()}}}):t._e()]):t._e(),1==t.isSearchDropdown?a("div",{staticClass:"search-box",attrs:{id:"v-search"}},[a("i",{staticClass:"las la-search search"}),a("v-select",{staticClass:"custom-select",attrs:{options:t.formattedOptions,placeholder:"serial no . . . "},on:{input:t.onSelectOption},model:{value:t.selectedOption,callback:function(e){t.selectedOption=e},expression:"selectedOption"}}),""!=t.searchKeyword?a("i",{staticClass:"las la-times clear",on:{click:function(e){return t.CLEAR_SEARCH()}}}):t._e()],1):t._e(),1==t.isSearchBox?a("div",{staticClass:"search-box"},[a("i",{staticClass:"las la-search search"}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.searchKeyword,expression:"searchKeyword"}],attrs:{type:"text",placeholder:"search tag no."},domProps:{value:t.searchKeyword},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.GET_SEARCH()},input:function(e){e.target.composing||(t.searchKeyword=e.target.value)}}}),""!=t.searchKeyword?a("i",{staticClass:"las la-times clear",on:{click:function(e){return t.CLEAR_SEARCH()}}}):t._e()]):t._e(),t.isSave?a("v-ons-toolbar-button",{staticClass:"highlight-btn",on:{click:function(e){return t.$emit("isSaveBtn")}}},[a("i",{staticClass:"las la-save"}),a("span",[t._v("Save")])]):t._e(),t.isEdit?a("v-ons-toolbar-button",{on:{click:function(e){return t.$emit("isEditBtn")}}},[a("i",{staticClass:"las la-edit"}),a("span",[t._v("Edit")])]):t._e(),t.isDelete?a("v-ons-toolbar-button",{on:{click:function(e){return t.$emit("isDeleteBtn")}}},[a("i",{staticClass:"las la-trash"}),a("span",[t._v("Delete")])]):t._e(),t.isPrint||t.isDownload?a("div",{staticClass:"btn-group-separater"}):t._e(),t.isRefresh?a("v-ons-toolbar-button",{on:{click:function(e){return t.$emit("refreshInfo")}}},[a("i",{staticClass:"las la-sync"}),a("span",[t._v("Refresh")])]):t._e(),t.isPrint?a("v-ons-toolbar-button",[a("i",{staticClass:"las la-print"}),a("span",[t._v("Print")])]):t._e(),t.isDownload?a("v-ons-toolbar-button",{on:{click:function(e){return t.$emit("isDownloadBtn")}}},[a("i",{staticClass:"las la-download"}),a("span",[t._v("Download")])]):t._e(),t.isNewBtn?a("v-ons-toolbar-button",{on:{click:function(e){return t.$emit("newBtnFn")}}},[a("i",{staticClass:"las la-plus"}),a("span",[t._v(t._s(t.newBtnLabel))])]):t._e(),t.isMoreBtn?a("v-ons-toolbar-button",{staticStyle:{"padding-right":"0px"},on:{click:function(e){return t.SHOW_POPOVER(e,"down",!0)}}},[a("i",{staticClass:"las la-cog"})]):t._e(),a("v-ons-popover",{attrs:{cancelable:"",visible:t.popoverVisible,target:t.popoverTarget,direction:t.popoverDirection,"cover-target":t.coverTarget},on:{"update:visible":function(e){t.popoverVisible=e}}},[a("v-ons-toolbar-button",{staticClass:"popover-button",on:{click:function(e){return t.EDIT_LIFTING_INFO()}}},[a("span",[t._v("Edit Info")]),a("i",{staticClass:"las la-edit"})]),a("v-ons-toolbar-button",{staticClass:"popover-button",on:{click:function(e){return t.DELETE_LIFTING_INFO()}}},[a("span",{staticStyle:{color:"red"}},[t._v("Delete")]),a("i",{staticClass:"las la-trash",staticStyle:{color:"red"}})])],1)],1),1==t.isAdd?a("popupAdd",{on:{closePopup:function(e){return t.TOGGLE_POPUPADD()}}}):t._e(),1==t.isEditPopup?a("popupEdit",{attrs:{editInfo:t.infoLifting},on:{closePopup:function(e){return t.TOGGLE_POPUP()}}}):t._e()],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"btn-group-separater-client"},[a("i",{staticClass:"las la-angle-right"})])}],o=(a(41539),a(21249),a(17133)),n=a.n(o),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"popup-wrapper"},[a("div",{staticClass:"popup-card"},[t._m(0),a("div",{staticClass:"popup-content form"},[a("div",{staticClass:"popup-content form"},[a("div",{staticClass:"form-item-container"},[a("label",{staticClass:"section-text",staticStyle:{"margin-top":"0"}},[t._v("General Information")]),a("div",{staticClass:"input-set"},[t._m(1),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.tag_no,expression:"formData.tag_no"}],attrs:{type:"text",placeholder:"Tag No"},domProps:{value:t.formData.tag_no},on:{input:function(e){e.target.composing||t.$set(t.formData,"tag_no",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(2),a("DxSelectBox",{staticStyle:{border:"0","font-size":"14px"},attrs:{"data-source":t.formSelect.site,"display-expr":"site_desc","value-expr":"id",placeholder:"Select Site"},model:{value:t.formData.id_site,callback:function(e){t.$set(t.formData,"id_site",e)},expression:"formData.id_site"}})],1),a("div",{staticClass:"input-set"},[t._m(3),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.swl_main,expression:"formData.swl_main"}],attrs:{type:"text",placeholder:"swl main"},domProps:{value:t.formData.swl_main},on:{input:function(e){e.target.composing||t.$set(t.formData,"swl_main",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(4),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.swl_aux,expression:"formData.swl_aux"}],attrs:{type:"text",placeholder:"swl aux"},domProps:{value:t.formData.swl_aux},on:{input:function(e){e.target.composing||t.$set(t.formData,"swl_aux",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(5),a("DxSelectBox",{staticStyle:{border:"0","font-size":"14px"},attrs:{"data-source":t.formSelect.id_equipment_type,"display-expr":"code","value-expr":"id",placeholder:"Select"},model:{value:t.formData.id_equipment_type,callback:function(e){t.$set(t.formData,"id_equipment_type",e)},expression:"formData.id_equipment_type"}})],1),a("div",{staticClass:"input-set"},[t._m(6),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.eq_user,expression:"formData.eq_user"}],attrs:{type:"text",placeholder:"Equipment User"},domProps:{value:t.formData.eq_user},on:{input:function(e){e.target.composing||t.$set(t.formData,"eq_user",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(7),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.eq_owner,expression:"formData.eq_owner"}],attrs:{type:"text",placeholder:"Equipment Owner"},domProps:{value:t.formData.eq_owner},on:{input:function(e){e.target.composing||t.$set(t.formData,"eq_owner",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(8),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.model,expression:"formData.model"}],attrs:{type:"text",placeholder:"Model"},domProps:{value:t.formData.model},on:{input:function(e){e.target.composing||t.$set(t.formData,"model",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(9),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.part_line,expression:"formData.part_line"}],attrs:{type:"text",placeholder:"Part line"},domProps:{value:t.formData.part_line},on:{input:function(e){e.target.composing||t.$set(t.formData,"part_line",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(10),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.license_plate_no,expression:"formData.license_plate_no"}],attrs:{type:"text",placeholder:"License Plate No"},domProps:{value:t.formData.license_plate_no},on:{input:function(e){e.target.composing||t.$set(t.formData,"license_plate_no",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(11),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.license_plate_province,expression:"formData.license_plate_province"}],attrs:{type:"text",placeholder:"License Plate Province"},domProps:{value:t.formData.license_plate_province},on:{input:function(e){e.target.composing||t.$set(t.formData,"license_plate_province",e.target.value)}}})])])])]),t._e(),a("div",{staticClass:"popup-footer"},[a("div",{staticClass:"button-set"},[a("button",{staticClass:"blue",on:{click:function(e){return t.SAVE()}}},[a("label",[t._v("Save")])]),a("button",{staticClass:"grey",on:{click:function(e){return t.CANCEL()}}},[a("label",[t._v("Cancel")])])])])])])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"popup-header"},[a("label",[t._v("Edit Pressure Vessel Info")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Tag No:")]),a("label",{staticClass:"star-label"},[a("i",{staticClass:"las la-asterisk"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Site:")]),a("label",{staticClass:"star-label"},[a("i",{staticClass:"las la-asterisk"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("swl main:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("swl aux:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Equipment Type:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Equipment User:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Equipment Owner:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Model:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Part line:")]),a("label",{staticClass:"star-label"},[a("i",{staticClass:"las la-asterisk"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("License Plate No:")]),a("label",{staticClass:"star-label"},[a("i",{staticClass:"las la-asterisk"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("License Plate Province:")]),a("label",{staticClass:"star-label"},[a("i",{staticClass:"las la-asterisk"})])])}],c=a(39477),u=a(56935),p=a.n(u),m=a(89584),d=a(30594);const _={name:"popup-edit",props:{editInfo:Object},components:{DxSelectBox:p(),contentLoading:d.Z},data:function(){return{formData:{},formSelect:{site:[]}}},computed:{all_form_select_loaded:function(){return this.formSelect.site.length>0}},created:function(){this.formData=(0,m.Z)(this.editInfo),this.FETCH_DROPDOWN()},methods:{SAVE:function(){var t=this;this.formData.inservice_date=this.formData.inservice_date?n()(this.formData.inservice_date).format("L"):null,""!==this.formData.id_site?this.$ons.notification.confirm("Confirm save?").then((function(e){if(1==e){var a=JSON.parse(localStorage.getItem("user"));t.formData.updated_by=a.id;var s=t.formData;(0,c.Z)({method:"put",url:"/LiftingInfo/"+s.id,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:s}).then((function(e){204==e.status&&(t.$emit("closePopup"),t.$router.go())}))["catch"]((function(e){t.$ons.notification.alert(e.code+" "+e.response.status+" "+e.message)}))["finally"]((function(){}))}})):this.$ons.notification.alert("Please fill all required fields.")},CANCEL:function(){var t=this;this.formData!=this.formData?this.$ons.notification.confirm("Your unsaved changes will be lost").then((function(e){1==e&&t.$emit("closePopup")})):this.$emit("closePopup")},FETCH_DROPDOWN:function(){this.FETCH_DROPDOWN_SITE(),this.FETCH_DROPDOWN_MATERIAL_OF_CONST(),this.FETCH_DROPDOWN_APPLICABLE_STATUS(),this.FETCH_DROPDOWN_EQUIPMENT_TYPE(),this.FETCH_DROPDOWN_TUBE_MATERIAL()},FETCH_DROPDOWN_SITE:function(){var t=this;(0,c.Z)({method:"get",url:"/master-data/get-md-site-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){e.data&&(t.formSelect.site=e.data)}))},FETCH_DROPDOWN_APPLICABLE_STATUS:function(){var t=this;(0,c.Z)({method:"get",url:"/master-data/get-md-applicable-status-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){e.data&&(t.formSelect.applicable_status=e.data)}))},FETCH_DROPDOWN_TUBE_MATERIAL:function(){var t=this;(0,c.Z)({method:"get",url:"master-data/get-md-tubematerial-status-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){e.data&&(t.formSelect.tube_material=e.data)}))},FETCH_DROPDOWN_MATERIAL_OF_CONST:function(){var t=this;(0,c.Z)({method:"get",url:"master-data/get-md-materialofconst-status-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){e.data&&(t.formSelect.material_of_const=e.data)}))},FETCH_DROPDOWN_EQUIPMENT_TYPE:function(){var t=this;(0,c.Z)({method:"get",url:"master-data/get-md-pvequipmenttype-status-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){e.data&&(t.formSelect.material_of_const=e.data)}))}}},f=_;var v=a(1001),h=(0,v.Z)(f,l,r,!1,null,"122967c9",null);const C=h.exports;var g=a(47886),b=a(30768),D=a.n(b);const E={name:"app-toolbar",components:{popupEdit:C,popupAdd:g.Z,vSelect:D()},props:{pageName:String,pageSubName:String,pageSubInnerName:String,isBack:Boolean,isBack_specificPath:String,isBackPath:Boolean,isEdit:Boolean,isSave:Boolean,isDelete:Boolean,isPrint:Boolean,isDownload:Boolean,isNewBtn:Boolean,isRefresh:Boolean,isMoreBtn:Boolean,infoLifting:Object,newBtnLabel:String,isSearchBox:Boolean,isSearchBoxList:Boolean,isSearchDropdown:Boolean,options:Array},data:function(){return{searchKeyword:"",isEditPopup:!1,isAdd:!1,selectedOption:null,popoverVisible:!1,popoverTarget:null,popoverDirection:"up",coverTarget:!1}},methods:{GO_BACK_TO:function(){this.$router.push(this.isBack_specificPath)},CLEAR_SEARCH:function(){this.searchKeyword=""},SHOW_POPOVER:function(t,e){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];this.popoverVisible=!0,this.popoverTarget=t,this.popoverDirection=e,this.coverTarget=a},TOGGLE_POPUP:function(){this.isEditPopup=!this.isEditPopup},TOGGLE_POPUPADD:function(){this.isAdd=!this.isAdd},NEW_LIFTING_INFO:function(){this.popoverVisible=!1,this.isAdd=!0},EDIT_LIFTING_INFO:function(){this.popoverVisible=!1,this.isEditPopup=!0},DELETE_LIFTING_INFO:function(){var t=this;this.popoverVisible=!1;var e=this.$route.params.id_tag;this.$ons.notification.confirm("Confirm delete?").then((function(a){1==a&&(0,c.Z)({method:"delete",url:"LiftingInfo/"+e,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:t.infoLifting}).then((function(e){200==e.status&&(t.$ons.notification.alert("Project delete successful"),t.$router.push("/lifting"))}))["catch"]((function(e){t.$ons.notification.alert(e.code+" "+e.response.status+" "+e.message)}))["finally"]((function(){}))}))},onSelectOption:function(t){var e=encodeURI("/lifting/tag/"+t.value+"/info");this.$router.push(e)}},computed:{lifting_inservice_date:function(){return this.infoLifting.inservice_date?n()(this.infoLifting.inservice_date).format("LL"):"N/A"},formattedOptions:function(){return this.options.map((function(t){return{label:t.serial_no,value:t.id}}))}}},S=E;var x=(0,v.Z)(S,s,i,!1,null,"814b26bc",null);const P=x.exports},47886:(t,e,a)=>{a.d(e,{Z:()=>f});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"popup-wrapper"},[a("div",{staticClass:"popup-card"},[t._m(0),a("div",{staticClass:"popup-content form"},[a("div",{staticClass:"form-item-container"},[a("label",{staticClass:"section-text",staticStyle:{"margin-top":"0"}},[t._v("General Information")]),a("div",{staticClass:"input-set"},[t._m(1),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.tag_no,expression:"formData.tag_no"}],attrs:{type:"text",placeholder:"Tag No"},domProps:{value:t.formData.tag_no},on:{input:function(e){e.target.composing||t.$set(t.formData,"tag_no",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(2),a("DxSelectBox",{staticStyle:{border:"0","font-size":"14px"},attrs:{"data-source":t.formSelect.site,"display-expr":"site_desc","value-expr":"id",placeholder:"Select Site"},model:{value:t.formData.id_site,callback:function(e){t.$set(t.formData,"id_site",e)},expression:"formData.id_site"}})],1),a("div",{staticClass:"input-set"},[t._m(3),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.swl_main,expression:"formData.swl_main"}],attrs:{type:"text",placeholder:"swl main"},domProps:{value:t.formData.swl_main},on:{input:function(e){e.target.composing||t.$set(t.formData,"swl_main",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(4),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.swl_aux,expression:"formData.swl_aux"}],attrs:{type:"text",placeholder:"swl aux"},domProps:{value:t.formData.swl_aux},on:{input:function(e){e.target.composing||t.$set(t.formData,"swl_aux",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(5),a("DxSelectBox",{staticStyle:{border:"0","font-size":"14px"},attrs:{"data-source":t.formSelect.id_equipment_type,"display-expr":"code","value-expr":"id",placeholder:"Select"},model:{value:t.formData.id_equipment_type,callback:function(e){t.$set(t.formData,"id_equipment_type",e)},expression:"formData.id_equipment_type"}})],1),a("div",{staticClass:"input-set"},[t._m(6),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.eq_user,expression:"formData.eq_user"}],attrs:{type:"text",placeholder:"Equipment User"},domProps:{value:t.formData.eq_user},on:{input:function(e){e.target.composing||t.$set(t.formData,"eq_user",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(7),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.eq_owner,expression:"formData.eq_owner"}],attrs:{type:"text",placeholder:"Equipment Owner"},domProps:{value:t.formData.eq_owner},on:{input:function(e){e.target.composing||t.$set(t.formData,"eq_owner",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(8),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.model,expression:"formData.model"}],attrs:{type:"text",placeholder:"Model"},domProps:{value:t.formData.model},on:{input:function(e){e.target.composing||t.$set(t.formData,"model",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(9),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.part_line,expression:"formData.part_line"}],attrs:{type:"text",placeholder:"Part line"},domProps:{value:t.formData.part_line},on:{input:function(e){e.target.composing||t.$set(t.formData,"part_line",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(10),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.license_plate_no,expression:"formData.license_plate_no"}],attrs:{type:"text",placeholder:"License Plate No"},domProps:{value:t.formData.license_plate_no},on:{input:function(e){e.target.composing||t.$set(t.formData,"license_plate_no",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(11),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.license_plate_province,expression:"formData.license_plate_province"}],attrs:{type:"text",placeholder:"License Plate Province"},domProps:{value:t.formData.license_plate_province},on:{input:function(e){e.target.composing||t.$set(t.formData,"license_plate_province",e.target.value)}}})])])]),t._e(),a("div",{staticClass:"popup-footer"},[a("div",{staticClass:"button-set"},[a("button",{staticClass:"blue",on:{click:function(e){return t.SAVE()}}},[a("label",[t._v("Save")])]),a("button",{staticClass:"grey",on:{click:function(e){return t.CANCEL()}}},[a("label",[t._v("Cancel")])])])])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"popup-header"},[a("label",[t._v("Add New")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Tag No:")]),a("label",{staticClass:"star-label"},[a("i",{staticClass:"las la-asterisk"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Site:")]),a("label",{staticClass:"star-label"},[a("i",{staticClass:"las la-asterisk"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("swl main:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("swl aux:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Equipment Type:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Equipment User:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Equipment Owner:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Model:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Part line:")]),a("label",{staticClass:"star-label"},[a("i",{staticClass:"las la-asterisk"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("License Plate No:")]),a("label",{staticClass:"star-label"},[a("i",{staticClass:"las la-asterisk"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("License Plate Province:")]),a("label",{staticClass:"star-label"},[a("i",{staticClass:"las la-asterisk"})])])}],o=(a(41539),a(39477)),n=a(17133),l=a.n(n),r=a(56935),c=a.n(r),u=a(30594);const p={name:"popup-add",components:{DxSelectBox:c(),contentLoading:u.Z},data:function(){return{formData:{},formSelect:{site:[],applicable_status:[]}}},computed:{all_form_select_loaded:function(){return this.formSelect.site.length>0&&this.formSelect.tube_material.length>0&&this.formSelect.material_of_const.length>0&&this.formSelect.applicable_status>0}},created:function(){this.FETCH_DROPDOWN()},methods:{SAVE:function(){var t=this;console.log("Submit: "),this.formData.inservice_date=l()(this.formData.inservice_date).format("L"),this.formData.tag_no&&this.formData.id_site&&""!==this.formData.serial_no?this.$ons.notification.confirm("Confirm save?").then((function(e){if(1==e){var a=JSON.parse(localStorage.getItem("user"));t.formData.created_by=a.id,t.formData.updated_by=a.id;var s=t.formData;(0,o.Z)({method:"post",url:"/LiftingInfo",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:s}).then((function(e){if(201==e.status){t.$emit("closePopup");var a=e.data[0].id_tag;a&&t.$router.push("/lifting/tag"+a+"/info")}}))["catch"]((function(e){t.$ons.notification.alert(e.code+" "+e.response.status+" "+e.message)}))["finally"]((function(){}))}})):this.$ons.notification.alert("Please fill all required fields.")},CANCEL:function(){var t=this;this.formData!=this.formData?this.$ons.notification.confirm("Your unsaved changes will be lost").then((function(e){1==e&&t.$emit("closePopup")})):this.$emit("closePopup")},FETCH_DROPDOWN:function(){this.FETCH_DROPDOWN_SITE(),this.FETCH_DROPDOWN_MATERIAL_OF_CONST(),this.FETCH_DROPDOWN_APPLICABLE_STATUS(),this.FETCH_DROPDOWN_EQUIPMENT_TYPE(),this.FETCH_DROPDOWN_TUBE_MATERIAL()},FETCH_DROPDOWN_SITE:function(){var t=this;(0,o.Z)({method:"get",url:"/master-data/get-md-site-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){e.data&&(t.formSelect.site=e.data)}))},FETCH_DROPDOWN_APPLICABLE_STATUS:function(){var t=this;(0,o.Z)({method:"get",url:"/master-data/get-md-applicable-status-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){e.data&&(t.formSelect.applicable_status=e.data)}))},FETCH_DROPDOWN_TUBE_MATERIAL:function(){var t=this;(0,o.Z)({method:"get",url:"master-data/get-md-tubematerial-status-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){e.data&&(t.formSelect.tube_material=e.data)}))},FETCH_DROPDOWN_MATERIAL_OF_CONST:function(){var t=this;(0,o.Z)({method:"get",url:"master-data/get-md-materialofconst-status-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){e.data&&(t.formSelect.material_of_const=e.data)}))},FETCH_DROPDOWN_EQUIPMENT_TYPE:function(){var t=this;(0,o.Z)({method:"get",url:"master-data/get-md-pvequipmenttype-status-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){e.data&&(t.formSelect.material_of_const=e.data)}))}}},m=p;var d=a(1001),_=(0,d.Z)(m,s,i,!1,null,"120a0277",null);const f=_.exports}}]);
//# sourceMappingURL=741.148e4a26.js.map