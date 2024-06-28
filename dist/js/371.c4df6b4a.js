"use strict";(self["webpackChunkSPRC_NDERMS"]=self["webpackChunkSPRC_NDERMS"]||[]).push([[371],{18681:(t,a,e)=>{e.d(a,{A:()=>l});var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"app-content-loading"},[e("div",{staticClass:"box"},[e("hash-loader",{staticClass:"custom-class",attrs:{color:"#1e1450",loading:!0,size:40,sizeUnit:"px"}})],1)])},o=[];const i={name:"AppLoading",props:{text:String,icon:String,color:String}},s=i;var r=e(81656),d=(0,r.A)(s,n,o,!1,null,"7c335792",null);const l=d.exports},90371:(t,a,e)=>{e.r(a),e.d(a,{default:()=>m});var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"pm-page"},[e("div",{staticClass:"pm-page-container"},[e("div",{staticClass:"page-container"},[e("DxDataGrid",{attrs:{id:"grid-data-list","key-expr":"id","data-source":t.dataList,selection:{mode:"single"},"hover-state-enabled":!0,"allow-column-reordering":!0,"show-borders":!0,"show-row-lines":!1,"row-alternation-enabled":!0},on:{"row-inserted":t.CREATE,"row-updated":t.UPDATE,"row-removed":t.DELETE,exporting:t.EXPORT_DATA}},[e("DxEditing",{attrs:{"allow-updating":!0,"allow-deleting":!0,"allow-adding":!0,mode:"row"}}),e("DxColumn",{attrs:{"data-field":"id_area_standard",caption:"Area Standard"}},[e("DxRequiredRule")],1),e("DxColumn",{attrs:{"data-field":"code",caption:"Code"}},[e("DxRequiredRule")],1),e("DxScrolling",{attrs:{mode:"standard"}}),e("DxSearchPanel",{attrs:{visible:!0}}),e("DxPaging",{attrs:{"page-size":10,"page-index":0}}),e("DxPager",{attrs:{"show-page-size-selector":!0,"allowed-page-sizes":[5,10,20],"show-navigation-buttons":!0,"show-info":!0,"info-text":"Page {0} of {1} ({2} items)"}}),e("DxExport",{attrs:{enabled:!0}})],1)],1)]),1==t.isLoading?e("contentLoading",{attrs:{text:"Loading, please wait...",color:"#fc9b21"}}):t._e()],1)},o=[],i=(e(5086),e(47093)),s=e(10788),r=e.n(s),d=e(16164),l=e(63869),c=e(18681),u=e(88704);const g={name:"ViewApplicableStatus",components:{DxDataGrid:l.DxDataGrid,DxSearchPanel:l.DxSearchPanel,DxPaging:l.DxPaging,DxPager:l.DxPager,DxScrolling:l.DxScrolling,DxColumn:l.DxColumn,DxExport:l.DxExport,DxEditing:l.DxEditing,DxRequiredRule:l.DxRequiredRule,contentLoading:c.A},created:function(){this.$store.commit("UPDATE_CURRENT_INAPP",{name:"Master Data Manager",icon:"/img/icon_menu/master_data/table.png"}),1==this.$store.state.status.server&&this.FETCH_LIST()},data:function(){return{dataList:null,isLoading:!1}},computed:{},methods:{EXPORT_DATA:function(t){var a=new i.Workbook,e=a.addWorksheet("Projects");(0,d.V)({worksheet:e,component:t.component}).then((function(){a.xlsx.writeBuffer().then((function(t){r()(new Blob([t],{type:"application/octet-stream"}),"Projects.xlsx")}))})),t.cancel=!0},FETCH_LIST:function(){var t=this;this.isLoading=!0,(0,u.p)({method:"get",url:"/Md/get-md-ex-insp-area-std-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(a){200==a.status&&a.data&&(t.dataList=a.data,console.log("this.dataList",t.dataList))}))["catch"]((function(a){t.$ons.notification.alert(a.code+" "+a.response.status+" "+a.message)}))["finally"]((function(){t.isLoading=!1}))},CREATE:function(t){var a=this;t.data.id=0,(0,u.p)({method:"post",url:"/Md/add-md-ex-insp-area-std",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:t.data}).then((function(t){201==t.status&&a.FETCH_LIST()}))["catch"]((function(t){a.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))},UPDATE:function(t){var a=this;(0,u.p)({method:"put",url:"/Md/edit-md-ex-insp-area-std?id="+t.data.id,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:t.data}).then((function(t){200==t.status&&a.FETCH_LIST()}))["catch"]((function(t){a.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))},DELETE:function(t){var a=this;(0,u.p)({method:"delete",url:"/Md/delete-md-ex-insp-area-std?id="+t.data.id,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:t.data}).then((function(t){204==t.status&&a.FETCH_LIST()}))["catch"]((function(t){a.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))}}},p=g;var h=e(81656),x=(0,h.A)(p,n,o,!1,null,"c1e8ca92",null);const m=x.exports}}]);
//# sourceMappingURL=371.c4df6b4a.js.map