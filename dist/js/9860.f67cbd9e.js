"use strict";(self["webpackChunkSPRC_NDERMS"]=self["webpackChunkSPRC_NDERMS"]||[]).push([[9860],{18681:(t,e,a)=>{a.d(e,{A:()=>l});var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-content-loading"},[a("div",{staticClass:"box"},[a("hash-loader",{staticClass:"custom-class",attrs:{color:"#1e1450",loading:!0,size:40,sizeUnit:"px"}})],1)])},i=[];const o={name:"AppLoading",props:{text:String,icon:String,color:String}},s=o;var r=a(81656),d=(0,r.A)(s,n,i,!1,null,"7c335792",null);const l=d.exports},79860:(t,e,a)=>{a.r(e),a.d(e,{default:()=>m});var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pm-page"},[a("div",{staticClass:"pm-page-container"},[a("div",{staticClass:"page-container"},[a("DxDataGrid",{attrs:{id:"grid-data-list","key-expr":"id","data-source":t.dataList,selection:{mode:"single"},"hover-state-enabled":!0,"allow-column-reordering":!0,"show-borders":!0,"show-row-lines":!1,"row-alternation-enabled":!0},on:{"row-inserted":t.CREATE,"row-updated":t.UPDATE,"row-removed":t.DELETE,exporting:t.EXPORT_DATA}},[a("DxEditing",{attrs:{"allow-updating":!0,"allow-deleting":!0,"allow-adding":!0,mode:"row"}}),a("DxColumn",{attrs:{"data-field":"code",caption:"Code"}},[a("DxRequiredRule")],1),a("DxColumn",{attrs:{"data-field":"sort",caption:"Sort"}}),a("DxScrolling",{attrs:{mode:"standard"}}),a("DxSearchPanel",{attrs:{visible:!0}}),a("DxPaging",{attrs:{"page-size":10,"page-index":0}}),a("DxPager",{attrs:{"show-page-size-selector":!0,"allowed-page-sizes":[5,10,20],"show-navigation-buttons":!0,"show-info":!0,"info-text":"Page {0} of {1} ({2} items)"}}),a("DxExport",{attrs:{enabled:!0}})],1)],1)]),1==t.isLoading?a("contentLoading",{attrs:{text:"Loading, please wait...",color:"#fc9b21"}}):t._e()],1)},i=[],o=(a(5086),a(47093)),s=a(10788),r=a.n(s),d=a(16164),l=a(63869),c=a(18681),u=a(88704);const p={name:"ViewApplicableStatus",components:{DxDataGrid:l.DxDataGrid,DxSearchPanel:l.DxSearchPanel,DxPaging:l.DxPaging,DxPager:l.DxPager,DxScrolling:l.DxScrolling,DxColumn:l.DxColumn,DxExport:l.DxExport,DxEditing:l.DxEditing,DxRequiredRule:l.DxRequiredRule,contentLoading:c.A},created:function(){this.$store.commit("UPDATE_CURRENT_INAPP",{name:"Master Data Manager",icon:"/img/icon_menu/master_data/table.png"}),1==this.$store.state.status.server&&this.FETCH_LIST()},data:function(){return{dataList:null,isLoading:!1}},computed:{},methods:{EXPORT_DATA:function(t){var e=new o.Workbook,a=e.addWorksheet("Projects");(0,d.V)({worksheet:a,component:t.component}).then((function(){e.xlsx.writeBuffer().then((function(t){r()(new Blob([t],{type:"application/octet-stream"}),"Projects.xlsx")}))})),t.cancel=!0},FETCH_LIST:function(){var t=this;this.isLoading=!0,(0,u.p)({method:"get",url:"/Md/get-md-ex-insp-discip-line-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){200==e.status&&e.data&&(t.dataList=e.data,console.log("this.dataList",t.dataList))}))["catch"]((function(e){t.$ons.notification.alert(e.code+" "+e.response.status+" "+e.message)}))["finally"]((function(){t.isLoading=!1}))},CREATE:function(t){var e=this;t.data.id=0,(0,u.p)({method:"post",url:"/Md/add-md-ex-insp-discip-line",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:t.data}).then((function(t){201==t.status&&e.FETCH_LIST()}))["catch"]((function(t){e.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))},UPDATE:function(t){var e=this;(0,u.p)({method:"put",url:"/Md/edit-md-ex-insp-discip-line?id="+t.data.id,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:t.data}).then((function(t){200==t.status&&e.FETCH_LIST()}))["catch"]((function(t){e.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))},DELETE:function(t){var e=this;(0,u.p)({method:"delete",url:"/Md/delete-md-ex-insp-discip-line?id="+t.data.id,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:t.data}).then((function(t){204==t.status&&e.FETCH_LIST()}))["catch"]((function(t){e.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))}}},g=p;var h=a(81656),x=(0,h.A)(g,n,i,!1,null,"150b013c",null);const m=x.exports}}]);
//# sourceMappingURL=9860.f67cbd9e.js.map