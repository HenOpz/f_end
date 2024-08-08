"use strict";(self["webpackChunktims_dexon"]=self["webpackChunktims_dexon"]||[]).push([[8169],{78169:(t,e,a)=>{a.r(e),a.d(e,{default:()=>f});var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-container"},[a("div",{staticClass:"page-section"},[a("DxDataGrid",{attrs:{id:"data-grid-style","key-expr":"id","data-source":t.dataList,"element-attr":t.dataGridAttributes,"hover-state-enabled":!0,"allow-column-reordering":!0,"show-borders":!0,"show-row-lines":!0,"row-alternation-enabled":!1,"column-hiding-enabled":!0,"word-wrap-enabled":!0},on:{"row-inserted":t.CREATE_RECORD,"row-updated":t.UPDATE_RECORD,"row-removed":t.DELETE_RECORD,"editing-start":t.EDIT_START,saved:t.SAVE},scopedSlots:t._u([{key:"file-editor",fn:function(){return[a("div",[a("DxFileUploader",{staticStyle:{"padding-top":"10px"},attrs:{"select-button-text":"Upload file","label-text":"or Drop file here",accept:"","upload-mode":"useForm"},on:{"value-changed":t.ON_UPLOAD_CHANGE}})],1)]},proxy:!0},{key:"file-icon",fn:function(e){var n=e.data;return[n.data.file_path?a("div",{staticClass:"d-md-none",staticStyle:{display:"flex"}},[a("i",{staticClass:"fa-regular fa-file-pdf",staticStyle:{display:"flex","font-size":"18px","justify-content":"center"}}),a("label",{staticStyle:{"padding-left":"5px"}},[t._v(t._s(n.data.file_name))])]):t._e()]}},{key:"dxTextArea",fn:function(t){var e=t.data;return[a("div",[a("DxTextArea",{attrs:{"read-only":!0,value:e.value}})],1)]}}])},[a("DxEditing",{attrs:{"allow-updating":!0,"allow-deleting":!0,"allow-adding":!0,"use-icons":!0,mode:"form"}},[a("DxForm",{attrs:{"label-location":"top"}},[a("DxItem",{attrs:{"col-count":2,"col-span":2,"item-type":"group"}},[a("DxItem",{attrs:{"data-field":"cert_no","col-span":1}}),a("DxItem",{attrs:{"data-field":"visual_by","col-span":1}}),a("DxItem",{attrs:{"data-field":"visual_test_date","col-span":1}}),a("DxItem",{attrs:{"data-field":"visual_test_result","col-span":1}}),a("DxItem",{attrs:{"data-field":"file_path","col-span":2}})],1)],1)],1),a("DxColumn",{attrs:{"data-field":"cert_no",caption:"Certificate No",width:200}},[a("DxRequiredRule")],1),a("DxColumn",{attrs:{"data-field":"visual_by",caption:"Visual By",width:150}},[a("DxRequiredRule")],1),a("DxColumn",{attrs:{"data-field":"visual_test_date",caption:"Inspection Date","data-type":"date",format:"dd MMM yyyy",width:150}}),a("DxColumn",{attrs:{"data-field":"visual_test_result",caption:"Result"}},[a("DxLookup",{attrs:{"data-source":t.result,"display-expr":"desc","value-expr":"desc"}}),a("DxRequiredRule")],1),a("DxColumn",{attrs:{"data-field":"file_path",caption:"File",width:150,"cell-template":"file-icon","edit-cell-template":"file-editor"}}),a("DxScrolling",{attrs:{mode:"standard"}}),a("DxSearchPanel",{attrs:{visible:!0}}),a("DxPaging",{attrs:{"page-size":10,"page-index":0}}),a("DxPager",{attrs:{"show-page-size-selector":!0,"allowed-page-sizes":[5,10,20],"show-navigation-buttons":!0,"show-info":!0,"info-text":"Page {0} of {1} ({2} items)"}}),a("DxExport",{attrs:{enabled:!0}})],1)],1)])},i=[],l=(a(41539),a(83710),a(28733),a(39477)),o=a(78417),s=a(70306),u=a.n(s),d=a(60082),r=a(48626);const p={name:"VisualInspection",components:{DxFileUploader:o.DxFileUploader,DxDataGrid:r.DxDataGrid,DxSearchPanel:r.DxSearchPanel,DxPaging:r.DxPaging,DxPager:r.DxPager,DxScrolling:r.DxScrolling,DxColumn:r.DxColumn,DxExport:r.DxExport,DxForm:r.DxForm,DxItem:d.DxItem,DxEditing:r.DxEditing,DxLookup:r.DxLookup,DxRequiredRule:r.DxRequiredRule,DxTextArea:u()},created:function(){this.$store.commit("UPDATE_CURRENT_PAGENAME",{subpageName:"Visual Inspection",subpageInnerName:null}),this.FETCH_RECORD()},data:function(){return{dataList:[],file:"",file_render:"",dataEvent:"",result:[{desc:"Accept"},{desc:"Reject"}],dataGridAttributes:{class:"data-grid-style"}}},computed:{},methods:{FETCH_RECORD:function(){var t=this;this.isLoading=!0;var e=this.$route.params.id_tag;(0,l.Z)({method:"get",url:"/LiftingTest/get-lifting-visual-test-by-id-tag?id_tag="+e,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){console.log("visual record:"),200==e.status&&e.data&&(t.dataList=e.data,console.log(t.dataList))}))["catch"]((function(t){console.log(t)}))["finally"]((function(){t.isLoading=!1}))},CREATE_RECORD:function(t){var e=this,a=new FormData,n=new Date(t.data.visual_test_date),i=JSON.parse(localStorage.getItem("user"));a.append("id_tag",this.$route.params.id_tag),a.append("cert_no",t.data.cert_no),a.append("visual_by",t.data.visual_by),a.append("visual_test_date",n.toISOString()),a.append("visual_test_result",t.data.visual_test_result),a.append("created_by",i.id),a.append("file",this.file),(0,l.Z)({method:"post",url:"/LiftingTest/add-lifting-visual-test",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:a}).then((function(t){201==t.status&&(console.log("visual record created!"),e.FETCH_RECORD())}))["catch"]((function(t){e.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))},UPDATE_RECORD:function(t){var e,a=this;console.warn(this.file);var n=new FormData,i=new Date(t.data.visual_test_date),o=JSON.parse(localStorage.getItem("user"));n.append("id",t.key),n.append("id_tag",this.$route.params.id_tag),n.append("cert_no",t.data.cert_no),n.append("visual_by",t.data.visual_by),n.append("visual_test_date",i.toISOString()),n.append("visual_test_result",t.data.visual_test_result),n.append("updated_by",o.id),n.append("file_path",t.data.file_path),n.append("file_name",t.data.file_name),n.append("file",null!==(e=this.file)&&void 0!==e?e:""),(0,l.Z)({method:"put",url:"/LiftingTest/edit-lifting-visual-test?id="+t.key,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:n}).then((function(t){204==t.status&&(console.log("update success"),a.FETCH_RECORD())}))["catch"]((function(t){a.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))},DELETE_RECORD:function(t){var e=this;(0,l.Z)({method:"delete",url:"/LiftingTest/visual/"+t.key,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(t){204==t.status&&(console.log("delete success"),e.FETCH_RECORD())}))["catch"]((function(t){e.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))},ON_UPLOAD_CHANGE:function(t){var e=this,a=new FileReader;a.readAsDataURL(t.value[0]),a.onload=function(){e.file_render=a.result},this.file=t.value[0]},EDIT_START:function(t){this.file=[],this.dataEvent=t},SAVE:function(t){console.log(t),console.log(t.changes.length),0==t.changes.length&&this.UPDATE_RECORD(this.dataEvent)}}},c=p;var h=a(1001),g=(0,h.Z)(c,n,i,!1,null,"5a48145a",null);const f=g.exports},70306:function(t,e,a){
/*!
 * devextreme-vue
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/devextreme-vue
 */
a(69070),a(9653);var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.DxTextArea=void 0;var i=n(a(37262)),l=a(26876),o=l.createComponent({props:{accessKey:String,activeStateEnabled:Boolean,autoResizeEnabled:Boolean,disabled:Boolean,elementAttr:Object,focusStateEnabled:Boolean,height:[Function,Number,String],hint:String,hoverStateEnabled:Boolean,inputAttr:{},isValid:Boolean,label:String,labelMode:String,maxHeight:[Number,String],maxLength:[Number,String],minHeight:[Number,String],name:String,onChange:Function,onContentReady:Function,onCopy:Function,onCut:Function,onDisposing:Function,onEnterKey:Function,onFocusIn:Function,onFocusOut:Function,onInitialized:Function,onInput:Function,onKeyDown:Function,onKeyUp:Function,onOptionChanged:Function,onPaste:Function,onValueChanged:Function,placeholder:String,readOnly:Boolean,rtlEnabled:Boolean,spellcheck:Boolean,stylingMode:String,tabIndex:Number,text:String,validationError:{},validationErrors:Array,validationMessageMode:String,validationStatus:String,value:String,valueChangeEvent:String,visible:Boolean,width:[Function,Number,String]},emits:{"update:isActive":null,"update:hoveredElement":null,"update:accessKey":null,"update:activeStateEnabled":null,"update:autoResizeEnabled":null,"update:disabled":null,"update:elementAttr":null,"update:focusStateEnabled":null,"update:height":null,"update:hint":null,"update:hoverStateEnabled":null,"update:inputAttr":null,"update:isValid":null,"update:label":null,"update:labelMode":null,"update:maxHeight":null,"update:maxLength":null,"update:minHeight":null,"update:name":null,"update:onChange":null,"update:onContentReady":null,"update:onCopy":null,"update:onCut":null,"update:onDisposing":null,"update:onEnterKey":null,"update:onFocusIn":null,"update:onFocusOut":null,"update:onInitialized":null,"update:onInput":null,"update:onKeyDown":null,"update:onKeyUp":null,"update:onOptionChanged":null,"update:onPaste":null,"update:onValueChanged":null,"update:placeholder":null,"update:readOnly":null,"update:rtlEnabled":null,"update:spellcheck":null,"update:stylingMode":null,"update:tabIndex":null,"update:text":null,"update:validationError":null,"update:validationErrors":null,"update:validationMessageMode":null,"update:validationStatus":null,"update:value":null,"update:valueChangeEvent":null,"update:visible":null,"update:width":null},model:{prop:"value",event:"update:value"},computed:{instance:function(){return this.$_instance}},beforeCreate:function(){this.$_WidgetClass=i["default"],this.$_hasAsyncTemplate=!0}});e.DxTextArea=o,e["default"]=o},37262:(t,e,a)=>{a.r(e),a.d(e,{default:()=>E});a(24812),a(68309);var n=a(40555),i=a(50337),l=a(38218),o=a(42632),s=a(61025),u=a(43908),d=a(29532),r=a(31925),p=a(459),c=a(85200),h=a(8767),g=function(t,e,a){var i=(0,n.Z)(t),l=a?i.scrollLeft():i.scrollTop(),o=a?"Width":"Height",s=i.prop("scroll".concat(o))-i.prop("client".concat(o))-l;if(0===l&&0===s)return!1;var u=0===l&&e>=0,d=0===s&&e<=0,r=l>0&&s>0;return!!(u||d||r)||void 0},f=function(t,e){var a=(0,n.Z)(t);return{validate:function(i){if((0,r.pR)(i)&&(l=i.target,!e||(0,n.Z)(l).is(t)))return!!g(a,-i.delta,i.shiftKey)&&(i._needSkipEvent=!0,!0);var l}}},_=a(88791),v="dx-textarea",m="dx-texteditor-input",x="dx-texteditor-input-auto-resize",D=_["default"].inherit({_getDefaultOptions:function(){return(0,u.l)(this.callBase(),{spellcheck:!0,minHeight:void 0,maxHeight:void 0,autoResizeEnabled:!1})},_initMarkup:function(){this.$element().addClass(v),this.callBase(),this.setAria("multiline","true")},_renderContentImpl:function(){this._updateInputHeight(),this.callBase()},_renderInput:function(){this.callBase(),this._renderScrollHandler()},_createInput:function(){var t=(0,n.Z)("<textarea>");return this._applyInputAttributes(t,this.option("inputAttr")),this._updateInputAutoResizeAppearance(t),t},_applyInputAttributes:function(t,e){t.attr(e).addClass(m)},_renderScrollHandler:function(){this._eventY=0;var t=this._input(),e=f(t,!0);i.Z.on(t,(0,r.V4)(c.Z.init,this.NAME),e,l.ZT),i.Z.on(t,(0,r.V4)(p.Z.down,this.NAME),this._pointerDownHandler.bind(this)),i.Z.on(t,(0,r.V4)(p.Z.move,this.NAME),this._pointerMoveHandler.bind(this))},_pointerDownHandler:function(t){this._eventY=(0,r.a0)(t).y},_pointerMoveHandler:function(t){var e=(0,r.a0)(t).y,a=this._eventY-e;g(this._input(),a)&&(t.isScrollingEvent=!0,t.stopPropagation()),this._eventY=e},_renderDimensions:function(){var t=this.$element(),e=t.get(0),a=this._getOptionValue("width",e),n=this._getOptionValue("height",e),i=this.option("minHeight"),l=this.option("maxHeight");t.css({minHeight:void 0!==i?i:"",maxHeight:void 0!==l?l:"",width:a,height:n})},_resetDimensions:function(){this.$element().css({height:"",minHeight:"",maxHeight:""})},_renderEvents:function(){this.option("autoResizeEnabled")&&i.Z.on(this._input(),(0,r.V4)("input paste",this.NAME),this._updateInputHeight.bind(this)),this.callBase()},_refreshEvents:function(){i.Z.off(this._input(),(0,r.V4)("input paste",this.NAME)),this.callBase()},_getHeightDifference:function(t){return(0,h.sQ)(this._$element.get(0),!1)+(0,h.sQ)(this._$textEditorContainer.get(0),!1)+(0,h.sQ)(this._$textEditorInputContainer.get(0),!1)+(0,h.p)("height",(0,o.Jj)().getComputedStyle(t.get(0))).margin},_updateInputHeight:function(){if((0,o.Ym)()){var t=this._input(),e=this.option("height"),a=void 0===e&&this.option("autoResizeEnabled"),n=a||void 0===e&&this.option("minHeight");if(n){this._resetDimensions(),this._$element.css("height",(0,h.zp)(this._$element)),t.css("height",0);var i=this._getHeightDifference(t);this._renderDimensions();var l=this._getBoundaryHeight("minHeight"),s=this._getBoundaryHeight("maxHeight"),u=t[0].scrollHeight;if(void 0!==l&&(u=Math.max(u,l-i)),void 0!==s){var d=s-i,r=u>d;u=Math.min(u,d),this._updateInputAutoResizeAppearance(t,!r)}t.css("height",u),a&&this._$element.css("height","auto")}else t.css("height","")}},_getBoundaryHeight:function(t){var e=this.option(t);if((0,d.$K)(e))return"number"===typeof e?e:(0,h.EJ)(e,this.$element().get(0).parentElement)},_renderInputType:l.ZT,_visibilityChanged:function(t){t&&this._updateInputHeight()},_updateInputAutoResizeAppearance:function(t,e){if(t){var a=(0,l.IS)(e,this.option("autoResizeEnabled"));t.toggleClass(x,a)}},_dimensionChanged:function(){this.option("visible")&&this._updateInputHeight()},_optionChanged:function(t){switch(t.name){case"autoResizeEnabled":this._updateInputAutoResizeAppearance(this._input(),t.value),this._refreshEvents(),this._updateInputHeight();break;case"value":case"height":this.callBase(t),this._updateInputHeight();break;case"minHeight":case"maxHeight":this._renderDimensions(),this._updateInputHeight();break;case"visible":this.callBase(t),t.value&&this._updateInputHeight();break;default:this.callBase(t)}}});(0,s.Z)("dxTextArea",D);const E=D}}]);
//# sourceMappingURL=8169.9b68e179.js.map