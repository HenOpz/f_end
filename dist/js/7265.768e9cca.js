"use strict";(self["webpackChunktims_dexon"]=self["webpackChunktims_dexon"]||[]).push([[7265],{47265:(t,i,e)=>{e.r(i),e.d(i,{default:()=>v});var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"pm-page",class:[1==t.sidebarHiding?"pm-page-none-sidbar":"pm-page"]},[e("toolbar",{staticStyle:{"grid-column":"span 3"},attrs:{pageSubName:this.$store.state.currentPageName,pageSubInnerName:this.$store.state.currentPageInnerName,isBackPath:!0,isBack_specificPath:"/piping",isNewBtn:!1,newBtnLabel:"New Line",infoPiping:t.infoPiping,isMoreBtn:!0,isSearchBox:!1,isRefresh:!0,isSearchDropdown:!0,options:t.pipingList},on:{refreshInfo:function(i){return t.refreshPage()},newBtnFn:function(i){return t.TOGGLE_POPUP()}}}),e("sidebar",{on:{resizeGridLayout:function(i){return t.RESIZE_GRID_LAYOUT()}}}),e("div",{staticClass:"pm-page-container"},[e("router-view")],1),1==t.isAdd?e("popupAdd",{on:{closePopup:function(i){return t.TOGGLE_POPUPADD()}}}):t._e()],1)},n=[],a=(e(41539),e(39477)),o=e(68043),r=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"app-sidebar",class:[1==t.sidebarHiding?"app-sidebar-hide":"app-sidebar"]},[e("div",{staticClass:"item-container"},[t._m(0),e("router-link",{attrs:{to:"/piping/tag/"+t.id_tag+"/info"}},[e("v-ons-toolbar-button",{staticClass:"item"},[e("img",{attrs:{src:"/img/icon_sidebar/tank/info.png"}}),e("span",[t._v("Information")])])],1),e("router-link",{attrs:{to:"/piping/tag/"+t.id_tag+"/insp-record"}},[e("v-ons-toolbar-button",{staticClass:"item"},[e("img",{attrs:{src:"/img/icon_sidebar/tank/inspection-record.png"}}),e("span",[t._v("Inspection Record")])])],1),t._m(1),e("router-link",{attrs:{to:"/piping/tag/"+t.id_tag+"/marked-up-drawing"}},[e("v-ons-toolbar-button",{staticClass:"item"},[e("img",{attrs:{src:"/img/icon_sidebar/tank/drawing.png"}}),e("span",[t._v("Marked-up ISO")])])],1),e("router-link",{attrs:{to:"/piping/tag/"+t.id_tag+"/thickness"}},[e("v-ons-toolbar-button",{staticClass:"item"},[e("img",{attrs:{src:"/img/icon_sidebar/tank/thickness.png"}}),e("span",[t._v("Thickness")])])],1),e("router-link",{attrs:{to:"/piping/tag/"+t.id_tag+"/checklist"}},[e("v-ons-toolbar-button",{staticClass:"item"},[e("img",{attrs:{src:"/img/icon_sidebar/tank/checklist.png"}}),e("span",[t._v("Visual Checklist")])])],1),e("router-link",{attrs:{to:"/piping/tag/"+t.id_tag+"/visual"}},[e("v-ons-toolbar-button",{staticClass:"item"},[e("img",{attrs:{src:"/img/icon_sidebar/tank/visual.png"}}),e("span",[t._v("Picture Log")])])],1),t._m(2),e("v-ons-popover",{attrs:{cancelable:"",visible:t.popoverVisible.checklist,target:t.popoverTarget,direction:t.popoverDirection,"cover-target":t.coverTarget},on:{"update:visible":function(i){return t.$set(t.popoverVisible,"checklist",i)}}},t._l(t.sidebarSubmenu.checklist,(function(i){return e("v-ons-toolbar-button",{key:i.id,staticClass:"popover-button",on:{click:function(e){return t.GO_TO(i,"checklist")}}},[e("span",[t._v(t._s(i.checklist_code))]),e("i",{staticClass:"las la-angle-right"})])})),1)],1),e("div",{staticClass:"item-container fixed-panel"},[e("v-ons-toolbar-button",{staticClass:"item bottom-btn",on:{click:function(i){return t.SHOW_HIDE_SIDEBAR()}}},[0==t.sidebarHiding?e("i",{staticClass:"las la-caret-square-left"}):t._e(),1==t.sidebarHiding?e("i",{staticClass:"las la-caret-square-right"}):t._e(),e("span",[t._v("Hide Sidebar")])])],1)])},c=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"section-label"},[e("label",[t._v("Information")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"section-label"},[e("label",[t._v("Inspection")]),e("hr")])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"section-label"},[e("label",[t._v("Report")]),e("hr")])}];const l={name:"app-sidebar",created:function(){},props:{},data:function(){return{id_tag:this.$route.params.id_tag,asset_name:this.$route.params.asset_name,popoverVisible:{markup_drawing:!1,checklist:!1,thickness:!1,evaluation:!1},popoverTarget:null,popoverDirection:"right",coverTarget:!1,sidebarSubmenu:{checklist:[{id:1,checklist_code:"Generic"},{id:2,checklist_code:"ILAST External"},{id:3,checklist_code:"ILAST Internal"}],thickness:[{id:1,code:"Roof",path:"roof"},{id:3,code:"Shell",path:"shell"}]},sidebarHiding:!1}},computed:{},methods:{SHOW_POPOVER:function(t,i){var e=arguments.length>2&&void 0!==arguments[2]&&arguments[2],s=arguments.length>3?arguments[3]:void 0;this.popoverTarget=t,this.popoverDirection=i,this.coverTarget=e,"checklist"==s&&this.sidebarSubmenu.checklist.length>0&&(this.popoverVisible.checklist=!0)},GO_TO:function(t,i){this.popoverVisible.markup_drawing=!1,this.popoverVisible.checklist=!1,this.popoverVisible.thickness=!1,this.popoverVisible.evaluation=!1,"checklist"==i&&this.$router.push({path:"/piping/tag/"+this.id_tag+"/checklist/form/"+t.id,replace:!0})},SHOW_HIDE_SIDEBAR:function(){0==this.sidebarHiding?this.sidebarHiding=!0:this.sidebarHiding=!1,this.$emit("resizeGridLayout")}}},p=l;var d=e(1001),u=(0,d.Z)(p,r,c,!1,null,"53e5b82e",null);const g=u.exports;var h=e(56803);const m={name:"router-template-detail",components:{toolbar:o.Z,popupAdd:h.Z,sidebar:g},created:function(){this.$store.commit("UPDATE_CURRENT_INAPP",{name:"Piping Management",icon:"/img/icon_menu/equipment/piping.png"}),this.$store.commit("UPDATE_CURRENT_PAGENAME",{subpageName:"Piping",subpageInnerName:null}),1==this.$store.state.status.server&&(this.FETCH_INFO(),this.FETCH_LIST())},data:function(){return{pipingList:[],infoPiping:{},sidebarHiding:!1,isAdd:!1}},computed:{},methods:{FETCH_INFO:function(){var t=this;this.isLoading=!0;var i=this.$route.params.id_tag;(0,a.Z)({method:"get",url:"PipingInfo/piping-info-view-by-id?id_piping="+i,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:null}).then((function(i){console.log(i.data),200==i.status&&i.data&&(t.infoPiping=i.data[0])}))["catch"]((function(t){console.log(t)}))["finally"]((function(){t.isLoading=!1}))},FETCH_LIST:function(){var t=this;this.isLoading=!0,(0,a.Z)({method:"get",url:"PipingInfo",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:null}).then((function(i){200==i.status&&i.data&&(t.pipingList=i.data)}))["catch"]((function(i){console.log(i),t.$ons.notification.alert(i.code+" "+i.response.status+" "+i.message)}))["finally"]((function(){t.isLoading=!1}))},RESIZE_GRID_LAYOUT:function(){this.sidebarHiding=!this.sidebarHiding},TOGGLE_POPUPADD:function(){this.isAdd=!this.isAdd},refreshPage:function(){this.$router.go()}}},_=m;var b=(0,d.Z)(_,s,n,!1,null,"72f3753c",null);const v=b.exports}}]);
//# sourceMappingURL=7265.768e9cca.js.map