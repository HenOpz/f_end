"use strict";(self["webpackChunkSPRC_NDERMS"]=self["webpackChunkSPRC_NDERMS"]||[]).push([[5041],{18681:(t,e,a)=>{a.d(e,{A:()=>c});var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-content-loading"},[a("div",{staticClass:"box"},[a("hash-loader",{staticClass:"custom-class",attrs:{color:"#1e1450",loading:!0,size:40,sizeUnit:"px"}})],1)])},i=[];const o={name:"AppLoading",props:{text:String,icon:String,color:String}},s=o;var r=a(81656),l=(0,r.A)(s,n,i,!1,null,"7c335792",null);const c=l.exports},95041:(t,e,a)=>{a.r(e),a.d(e,{default:()=>b});var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[0==t.current_view?a("ViewFR",{on:{currentView:function(e,a){return t.SET_EDIT(e,a)}}}):t._e(),1==t.current_view?a("AddFR",{attrs:{fieldData:t.fieldData},on:{currentView:function(e){return t.current_view=e}}}):t._e()],1)},i=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-container"},[a("div",{staticClass:"page-section"},[a("div",{staticClass:"table-wrapper"},[a("DxDataGrid",{attrs:{id:"data-grid-list","key-expr":"recordId","data-source":t.riserList,selection:{mode:"single"},"hover-state-enabled":!0,"allow-column-reordering":!0,"show-borders":!0,"show-row-lines":!0,"row-alternation-enabled":!1,"word-wrap-enabled":!0,"column-auto-width":!0},on:{"cell-prepared":t.onCellPrepared},scopedSlots:t._u([{key:"status-cell-template",fn:function(e){var n=e.data;return[a("div",["Above Splash Zone"==n.data.fieldData.riser_type?a("span",[t._v(" "+t._s(n.data.fieldData["info::outgoing_riser_status_asz"])+" ")]):t._e(),"Subsea"==n.data.fieldData.riser_type?a("span",[t._v(" "+t._s(n.data.fieldData["info::outgoing_riser_status_visual_bsz"])+" ")]):t._e()])]}},{key:"action-cell-template",fn:function(e){var n=e.data;return[a("div",{staticClass:"action-wrapper"},[a("div",{on:{click:function(e){return t.SET_CURRENT_VIEW(1,n.data.fieldData)}}},[a("img",{staticClass:"list-check",attrs:{src:"/img/svg/list-check-svg.svg"}})])])]}}])},[a("DxEditing",{attrs:{"allow-updating":!1,"allow-deleting":!1,"allow-adding":!1,"use-icons":!0,mode:"popup"}}),a("DxFilterRow",{attrs:{visible:!0}}),a("DxHeaderFilter",{attrs:{visible:!0}}),a("DxSelection",{attrs:{mode:"single"}}),a("DxColumn",{attrs:{"data-field":"fieldData.platform",caption:"Platform",width:100,alignment:"center"}}),a("DxColumn",{attrs:{"data-field":"fieldData.pipeline_no",caption:"Pipeline No.","min-width":100,alignment:"center"}}),a("DxColumn",{attrs:{"data-field":"fieldData.riser_no",caption:"Riser No.","min-width":100,alignment:"center"}}),a("DxColumn",{attrs:{"data-field":"fieldData.riser_type",caption:"Riser Type","min-width":100,alignment:"center"}}),a("DxColumn",{attrs:{"data-field":"fieldData.info::risk_ranking",caption:"Risk Ranking",width:100,alignment:"center"}}),a("DxColumn",{attrs:{caption:"Integrity Status",width:100,alignment:"center","cell-template":"status-cell-template"}}),a("DxColumn",{attrs:{"data-field":"fieldData.inspection_type",caption:"Inspection Type",width:120,alignment:"center"}}),a("DxColumn",{attrs:{"data-field":"fieldData.last_insp_date",caption:"Last Inspection Date",width:100,alignment:"center",dataType:"date",format:"yyyy"}}),a("DxColumn",{attrs:{"data-field":"fieldData.next_insp_date",caption:"Next Inspection Date",width:100,alignment:"center"}}),a("DxColumn",{attrs:{"data-field":"fieldData.wo_no",caption:"Work Order",width:120,alignment:"center"}}),a("DxColumn",{attrs:{alignment:"center","cell-template":"action-cell-template",width:60}}),a("DxScrolling",{attrs:{mode:"standard"}}),a("DxSearchPanel",{attrs:{visible:!0}}),a("DxPaging",{attrs:{"page-size":10,"page-index":0}}),a("DxPager",{attrs:{"show-page-size-selector":!0,"allowed-page-sizes":[10,20,30],"show-navigation-buttons":!0,"show-info":!1,"info-text":"Page {0} of {1} ({2} items)"}}),a("DxExport",{attrs:{enabled:!1}})],1)],1)]),1==t.isLoading?a("contentLoading",{attrs:{text:"Loading, please wait...",color:"#fc9b21"}}):t._e()],1)},s=[],r=(a(30959),a(17),a(5086),a(88704)),l=a(18681),c=a(47093),d=a(10788),p=a.n(d),u=a(16164),g=a(63869);const f={name:"inspection-record",components:{contentLoading:l.A,DxDataGrid:g.DxDataGrid,DxSearchPanel:g.DxSearchPanel,DxPaging:g.DxPaging,DxPager:g.DxPager,DxScrolling:g.DxScrolling,DxColumn:g.DxColumn,DxExport:g.DxExport,DxHeaderFilter:g.DxHeaderFilter,DxSelection:g.DxSelection,DxEditing:g.DxEditing,DxFilterRow:g.DxFilterRow},created:function(){this.$store.commit("UPDATE_CURRENT_PAGENAME",{subpageName:"INSPECTION DUE OUTGOING RISER",subpageInnerName:null}),1==this.$store.state.status.server&&(this.FETCH_FILE_MAKER_RECORD(),this.FETCH_STATUS(),this.FETCH_RISK_RANKING())},data:function(){return{riserList:{},isLoading:!1,statusList:{},riskrankingList:{}}},computed:{},methods:{GENERATE_SESSION:function(){var t=this;(0,r.b)({method:"POST",url:"/Pipeline/sessions",headers:{"Content-Type":"application/json",Authorization:"Basic dmlzaXRvcjpBaW1zMjAyMg=="},data:{}}).then((function(e){localStorage.setItem("pipeline_token",JSON.stringify(e.data.response.token)),t.FETCH_FILE_MAKER_RECORD()}))["catch"]((function(t){console.log("api",t)}))},FETCH_FILE_MAKER_RECORD:function(){var t=this;this.isLoading=!0,(0,r.b)({method:"GET",url:"/Pipeline/layouts/info_outgoing_riser_due_inspection/records?_limit=10000",headers:{"Content-Type":"application/json",Authorization:"Bearer "+JSON.parse(localStorage.getItem("pipeline_token"))}}).then((function(e){t.riserList=e.data.response.data,console.log("this.riserList",t.riserList),t.isLoading=!1}))["catch"]((function(e){console.log("api",e),t.GENERATE_SESSION()}))},EXPORT_DATA:function(t){var e=new c.Workbook,a=e.addWorksheet("Projects");(0,u.V)({worksheet:a,component:t.component}).then((function(){e.xlsx.writeBuffer().then((function(t){p()(new Blob([t],{type:"application/octet-stream"}),"OUTGOING-RISER-INSPECTION-DUE.xlsx")}))})),t.cancel=!0},onCellPrepared:function(t){console.log("data ",t),"data"===t.rowType&&"Integrity Status"===t.column.caption&&(console.log(t.data.fieldData),t.cellElement.style.backgroundColor=this.GET_STATUS_COLOR(t.data.fieldData["info::outgoing_riser_status_asz"]),t.cellElement.style.color="#000",t.cellElement.style.textTransform="uppercase"),"data"===t.rowType&&"fieldData.info::risk_ranking"===t.column.dataField&&(console.log(t.data.fieldData),t.cellElement.style.backgroundColor=this.GET_RISK_COLOR(t.data.fieldData["info::risk_ranking"]),t.cellElement.style.color="#000",t.cellElement.style.textTransform="uppercase")},GET_STATUS_COLOR:function(t){if(t){var e=this.statusList.filter((function(e){return e.status==t}));return e[0].color_code}return"#fff"},GET_RISK_COLOR:function(t){if(t){var e=this.riskrankingList.filter((function(e){return e.risk_ranking.toUpperCase()==t}));return e[0].color_code}return"#fff"},FETCH_STATUS:function(){var t=this;(0,r.p)({method:"get",url:"/Md/get-md-integrity-status-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){console.log(e),200==e.status&&e.data&&(t.statusList=e.data)}))["catch"]((function(t){console.log(t)}))["finally"]((function(){t.isLoading=!1}))},FETCH_RISK_RANKING:function(){var t=this;(0,r.p)({method:"get",url:"/Md/get-md-risk-ranking-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){console.log(e),200==e.status&&e.data&&(t.riskrankingList=e.data)}))["catch"]((function(t){console.log(t)}))["finally"]((function(){t.isLoading=!1}))},RISER_TYPE:function(){}}},_=f;var m=a(81656),h=(0,m.A)(_,o,s,!1,null,"6632c6aa",null);const E=h.exports;var D=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-container"},[a("div",{staticClass:"page-section"},[a("div",{staticClass:"table-wrapper"},[a("h3",{staticStyle:{"grid-column":"span 2"}},[t._v("New Inspection Task")]),a("div",{staticClass:"input-wrapper"},[a("span",[t._v("Tag Number")]),a("div",{staticClass:"input"},[a("DxTextBox",{attrs:{placeholder:"0.5-AI-B2-5092",disabled:"true"}})],1)]),a("div",{staticClass:"input-wrapper"},[a("span",[t._v("Inspection Type")]),a("div",{staticClass:"input"},[a("DxTextBox",{attrs:{placeholder:"NDE",disabled:"true"}})],1)]),a("div",{staticClass:"input-wrapper"},[a("span",[t._v("Due Inspection Date")]),a("div",{staticClass:"input"},[a("DxTextBox",{attrs:{placeholder:"2024",disabled:"true"}})],1)]),a("div",{staticClass:"input-wrapper"},[t._m(0),a("div",{staticClass:"select"},[a("DxDateBox",{attrs:{type:"date",placeholder:"Select Inspection Date"}})],1)]),a("div",{staticClass:"input-wrapper"},[t._m(1),a("div",{staticClass:"input"},[a("DxTextBox",{attrs:{placeholder:"Enter Manhours"}})],1)]),a("div",{staticClass:"input-wrapper"},[a("span",[t._v("Note")]),a("div",{staticClass:"input"},[a("DxTextBox",{attrs:{placeholder:"Enter Note"}})],1)]),a("button",{staticClass:"create",on:{click:function(e){return t.SET_CURRENT_VIEW(0)}}},[t._v("Create")]),a("button",{on:{click:function(e){return t.SET_CURRENT_VIEW(0)}}},[t._v("Cancel")]),a("br")])])])},x=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"title-wrapper"},[a("span",[t._v("Inspection Date")]),a("span",[t._v("*")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"title-wrapper"},[a("span",[t._v("Plan Manhours")]),a("span",[t._v("*")])])}],C=a(49148),v=a.n(C),R=a(57723),T=a.n(R),S=a(17768),w=a.n(S);const I={name:"inspection-record",components:{DxTextBox:T(),DxDateBox:w()},created:function(){this.$store.commit("UPDATE_CURRENT_PAGENAME",{subpageName:"FAILURE REPORT",subpageInnerName:null})},data:function(){return{testList:[],inspRecordList:{},campaigeList:{},dataGridAttributes:{class:"data-grid-style"},inspDateInputOptions:{placeholder:"Select date"},projectNoInputOptions:{placeholder:"Enter project no"},reportNoInputOptions:{placeholder:"Enter report no"},remarkInputOptions:{placeholder:"Enter remark"}}},computed:{},methods:{EXPORT_DATA:function(t){var e=new c.Workbook,a=e.addWorksheet("Projects");(0,u.V)({worksheet:a,component:t.component}).then((function(){e.xlsx.writeBuffer().then((function(t){p()(new Blob([t],{type:"application/octet-stream"}),"inspection_record.xlsx")}))})),t.cancel=!0},FETCH_INSP_RECORD:function(){var t=this;this.isLoading=!0;var e=this.$route.params.id_tag;(0,r.p)({method:"get",url:"/PipingInspectionRecord/get-piping-ir-by-id-line?id_line="+e,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){console.log("insp record:"),console.log(e),200==e.status&&e.data&&(console.log("success"),t.inspRecordList=e.data,console.log(t.inspRecordList))}))["catch"]((function(t){console.log(t)}))["finally"]((function(){t.isLoading=!1}))},CREATE_RECORD:function(t){var e=this;t.data.id_line=this.$route.params.id_tag,t.data.id=0,t.data.is_active=!0,t.data.inspection_date=v()(t.data.inspection_date).format("L"),console.log(t.data),(0,r.p)({method:"post",url:"/PipingInspectionRecord",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:t.data}).then((function(t){201==t.status&&(console.log("create success"),e.FETCH_INSP_RECORD())}))["catch"]((function(t){e.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))},UPDATE_RECORD:function(t){var e=this;t.data.inspection_date=v()(t.data.inspection_date).format("L"),console.log(t.data),(0,r.p)({method:"put",url:"/PipingInspectionRecord/"+t.key,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:t.data}).then((function(t){204==t.status&&(console.log("update success"),e.FETCH_INSP_RECORD())}))["catch"]((function(t){e.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))},DELETE_RECORD:function(t){var e=this;(0,r.p)({method:"delete",url:"/PipingInspectionRecord/"+t.key,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(t){204==t.status&&(console.log("delete success"),e.FETCH_INSP_RECORD())}))["catch"]((function(t){e.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))},SET_CURRENT_VIEW:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.$store.commit("SET_SHOW_BACK_BUTTON",!0),null!==e?this.$emit("currentView",t,e):this.$emit("currentView",t)}}},N=I;var k=(0,m.A)(N,D,x,!1,null,"65438c00",null);const A=k.exports,O={name:"inspection-record",components:{ViewFR:E,AddFR:A},created:function(){this.$store.commit("UPDATE_CURRENT_PAGENAME",{subpageName:"INSPECTION",subpageInnerName:null})},data:function(){return{current_view:0,fieldData:null}},computed:{},methods:{SET_EDIT:function(t,e){this.current_view=t,this.fieldData=e}}},y=O;var P=(0,m.A)(y,n,i,!1,null,"1707229e",null);const b=P.exports}}]);
//# sourceMappingURL=5041.89e54a1e.js.map