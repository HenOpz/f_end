"use strict";(self["webpackChunkSPRC_NDERMS"]=self["webpackChunkSPRC_NDERMS"]||[]).push([[7792],{65411:(t,e,n)=>{n.r(e),n.d(e,{default:()=>A});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[0==t.current_view?n("ViewFR",{on:{currentView:function(e,n){return t.SET_EDIT(e,n)}}}):t._e(),1==t.current_view?n("AddFR",{attrs:{fieldData:t.fieldData},on:{currentView:function(e){return t.current_view=e}}}):t._e()],1)},a=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-container"},[n("div",{staticClass:"page-section"},[n("div",{staticClass:"table-wrapper"},[n("DxDataGrid",{attrs:{id:"data-grid-list","key-expr":"id","data-source":t.testList,selection:{mode:"single"},"hover-state-enabled":!0,"allow-column-reordering":!0,"show-borders":!0,"show-row-lines":!0,"row-alternation-enabled":!1,"word-wrap-enabled":!0,"column-auto-width":!0},scopedSlots:t._u([{key:"action-cell-template",fn:function(e){var i=e.data;return[n("div",{staticClass:"action-wrapper"},[n("div",{on:{click:function(e){return t.SET_CURRENT_VIEW(1,i.data.fieldData)}}},[n("img",{staticClass:"list-check",attrs:{src:"/img/svg/list-check-svg.svg"}})])])]}}])},[n("DxEditing",{attrs:{"allow-updating":!1,"allow-deleting":!1,"allow-adding":!1,"use-icons":!0,mode:"popup"}}),n("DxFilterRow",{attrs:{visible:!0}}),n("DxHeaderFilter",{attrs:{visible:!0}}),n("DxSelection",{attrs:{mode:"single"}}),n("DxColumn",{attrs:{"data-field":"id_item",caption:"Item","min-width":70,alignment:"center"}}),n("DxColumn",{attrs:{"data-field":"platform",caption:"Platform","min-width":90,alignment:"center"}}),n("DxColumn",{attrs:{"data-field":"tag_no",caption:"Tag No.","min-width":200,alignment:"center"}}),n("DxColumn",{attrs:{"data-field":"risk_ranking",caption:"Risk Ranking","min-width":80,alignment:"center"}}),n("DxColumn",{attrs:{"data-field":"integrity_status",caption:"Integrity Status","min-width":90,alignment:"center"}}),n("DxColumn",{attrs:{"data-field":"inspection_type",caption:"Inspection Type","min-width":90,alignment:"center"}}),n("DxColumn",{attrs:{"data-field":"last_inspection_date",caption:"Last Inspection Date","min-width":90,alignment:"center"}}),n("DxColumn",{attrs:{"data-field":"due_inspection_date",caption:"Due Inspection Date","min-width":80,alignment:"center"}}),n("DxColumn",{attrs:{"data-field":"inspection_work_order",caption:"Inspection Work Order","min-width":80,alignment:"center"}}),n("DxColumn",{attrs:{alignment:"center","cell-template":"action-cell-template"}}),n("DxScrolling",{attrs:{mode:"standard"}}),n("DxSearchPanel",{attrs:{visible:!0}}),n("DxPaging",{attrs:{"page-size":10,"page-index":0}}),n("DxPager",{attrs:{"show-page-size-selector":!0,"allowed-page-sizes":[10,20,30],"show-navigation-buttons":!0,"show-info":!1,"info-text":"Page {0} of {1} ({2} items)"}}),n("DxExport",{attrs:{enabled:!1}})],1)],1)])])},s=[],r=(n(5086),n(88704)),c=n(49148),l=n.n(c),d=n(47093),p=n(10788),u=n.n(p),_=n(16164),g=n(63869);const m={name:"inspection-record",components:{DxDataGrid:g.DxDataGrid,DxSearchPanel:g.DxSearchPanel,DxPaging:g.DxPaging,DxPager:g.DxPager,DxScrolling:g.DxScrolling,DxColumn:g.DxColumn,DxExport:g.DxExport,DxHeaderFilter:g.DxHeaderFilter,DxSelection:g.DxSelection,DxEditing:g.DxEditing,DxFilterRow:g.DxFilterRow},created:function(){this.$store.commit("UPDATE_CURRENT_PAGENAME",{subpageName:"INSPECTION DUE TANK",subpageInnerName:null}),1==this.$store.state.status.server&&(this.testList=[{id:1,id_item:1,platform:"MDPP",tag_no:"0.5-AI-B2-5092",risk_ranking:"LOW",integrity_status:"P6",inspection_type:"NDE",last_inspection_date:"2020",due_inspection_date:"2024",inspection_work_order:"-"},{id:2,id_item:2,platform:"MDPP",tag_no:"0.5-AI-B2-5092",risk_ranking:"LOW",integrity_status:"P6",inspection_type:"VT",last_inspection_date:"2020",due_inspection_date:"2024",inspection_work_order:"-"},{id:3,id_item:3,platform:"MDPP",tag_no:"0.5-OW-BS1-7892",risk_ranking:"LOW",integrity_status:"P6",inspection_type:"NDE",last_inspection_date:"2020",due_inspection_date:"2024",inspection_work_order:"-"},{id:4,id_item:4,platform:"MDPP",tag_no:"0.5-OW-BS1-7892",risk_ranking:"LOW",integrity_status:"P6",inspection_type:"VT",last_inspection_date:"2020",due_inspection_date:"2024",inspection_work_order:"-"},{id:5,id_item:5,platform:"MDPP",tag_no:"0.5-OW-C4N-7959",risk_ranking:"LOW",integrity_status:"P6",inspection_type:"NDE",last_inspection_date:"2020",due_inspection_date:"2024",inspection_work_order:"-"},{id:6,id_item:6,platform:"MDPP",tag_no:"0.5-OW-C4N-7959",risk_ranking:"LOW",integrity_status:"P6",inspection_type:"VT",last_inspection_date:"2020",due_inspection_date:"2024",inspection_work_order:"-"},{id:7,id_item:7,platform:"MDPP",tag_no:"0.5-OU-A2-5058",risk_ranking:"LOW",integrity_status:"P5",inspection_type:"NDE",last_inspection_date:"2020",due_inspection_date:"2024",inspection_work_order:"-"},{id:8,id_item:8,platform:"MDPP",tag_no:"0.5-OU-A2-5058",risk_ranking:"LOW",integrity_status:"P5",inspection_type:"VT",last_inspection_date:"2020",due_inspection_date:"2024",inspection_work_order:"-"},{id:9,id_item:9,platform:"MDPP",tag_no:"0.5-CR-B2-4306",risk_ranking:"LOW",integrity_status:"P4",inspection_type:"NDE",last_inspection_date:"2020",due_inspection_date:"2024",inspection_work_order:"-"},{id:10,id_item:10,platform:"MDPP",tag_no:"0.5-CR-B2-4306",risk_ranking:"LOW",integrity_status:"P4",inspection_type:"VT",last_inspection_date:"2020",due_inspection_date:"2024",inspection_work_order:"-"}])},data:function(){return{testList:null,inspRecordList:{},campaigeList:{},dataGridAttributes:{class:"data-grid-style"},inspDateInputOptions:{placeholder:"Select date"},projectNoInputOptions:{placeholder:"Enter project no"},reportNoInputOptions:{placeholder:"Enter report no"},remarkInputOptions:{placeholder:"Enter remark"}}},computed:{},methods:{EXPORT_DATA:function(t){var e=new d.Workbook,n=e.addWorksheet("Projects");(0,_.V)({worksheet:n,component:t.component}).then((function(){e.xlsx.writeBuffer().then((function(t){u()(new Blob([t],{type:"application/octet-stream"}),"inspection_record.xlsx")}))})),t.cancel=!0},FETCH_INSP_RECORD:function(){var t=this;this.isLoading=!0;var e=this.$route.params.id_tag;(0,r.p)({method:"get",url:"/PipingInspectionRecord/get-piping-ir-by-id-line?id_line="+e,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){console.log("insp record:"),console.log(e),200==e.status&&e.data&&(console.log("success"),t.inspRecordList=e.data,console.log(t.inspRecordList))}))["catch"]((function(t){console.log(t)}))["finally"]((function(){t.isLoading=!1}))},CREATE_RECORD:function(t){var e=this;t.data.id_line=this.$route.params.id_tag,t.data.id=0,t.data.is_active=!0,t.data.inspection_date=l()(t.data.inspection_date).format("L"),console.log(t.data),(0,r.p)({method:"post",url:"/PipingInspectionRecord",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:t.data}).then((function(t){201==t.status&&(console.log("create success"),e.FETCH_INSP_RECORD())}))["catch"]((function(t){e.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))},UPDATE_RECORD:function(t){var e=this;t.data.inspection_date=l()(t.data.inspection_date).format("L"),console.log(t.data),(0,r.p)({method:"put",url:"/PipingInspectionRecord/"+t.key,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:t.data}).then((function(t){204==t.status&&(console.log("update success"),e.FETCH_INSP_RECORD())}))["catch"]((function(t){e.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))},DELETE_RECORD:function(t){var e=this;(0,r.p)({method:"delete",url:"/PipingInspectionRecord/"+t.key,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(t){204==t.status&&(console.log("delete success"),e.FETCH_INSP_RECORD())}))["catch"]((function(t){e.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))},SET_CURRENT_VIEW:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.$store.commit("SET_SHOW_BACK_BUTTON",!1),null!==e?this.$emit("currentView",t,e):this.$emit("currentView",t)}}},h=m;var f=n(81656),D=(0,f.A)(h,o,s,!1,null,"0cec4d68",null);const E=D.exports;var x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-container"},[n("div",{staticClass:"page-section"},[n("div",{staticClass:"table-wrapper"},[n("h3",{staticStyle:{"grid-column":"span 2"}},[t._v("New Inspection Task")]),n("div",{staticClass:"input-wrapper"},[n("span",[t._v("Tag Number")]),n("div",{staticClass:"input"},[n("DxTextBox",{attrs:{placeholder:"0.5-AI-B2-5092",disabled:"true"}})],1)]),n("div",{staticClass:"input-wrapper"},[n("span",[t._v("Inspection Type")]),n("div",{staticClass:"input"},[n("DxTextBox",{attrs:{placeholder:"NDE",disabled:"true"}})],1)]),n("div",{staticClass:"input-wrapper"},[n("span",[t._v("Due Inspection Date")]),n("div",{staticClass:"input"},[n("DxTextBox",{attrs:{placeholder:"2024",disabled:"true"}})],1)]),n("div",{staticClass:"input-wrapper"},[t._m(0),n("div",{staticClass:"select"},[n("DxDateBox",{attrs:{type:"date",placeholder:"Select Inspection Date"}})],1)]),n("div",{staticClass:"input-wrapper"},[t._m(1),n("div",{staticClass:"input"},[n("DxTextBox",{attrs:{placeholder:"Enter Manhours"}})],1)]),n("div",{staticClass:"input-wrapper"},[n("span",[t._v("Note")]),n("div",{staticClass:"input"},[n("DxTextBox",{attrs:{placeholder:"Enter Note"}})],1)]),n("button",{staticClass:"create",on:{click:function(e){return t.SET_CURRENT_VIEW(0)}}},[t._v("Create")]),n("button",{on:{click:function(e){return t.SET_CURRENT_VIEW(0)}}},[t._v("Cancel")]),n("br")])])])},C=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"title-wrapper"},[n("span",[t._v("Inspection Date")]),n("span",[t._v("*")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"title-wrapper"},[n("span",[t._v("Plan Manhours")]),n("span",[t._v("*")])])}],R=n(57723),v=n.n(R),P=n(17768),w=n.n(P);const k={name:"inspection-record",components:{DxTextBox:v(),DxDateBox:w()},created:function(){this.$store.commit("UPDATE_CURRENT_PAGENAME",{subpageName:"FAILURE REPORT",subpageInnerName:null})},data:function(){return{testList:[],inspRecordList:{},campaigeList:{},dataGridAttributes:{class:"data-grid-style"},inspDateInputOptions:{placeholder:"Select date"},projectNoInputOptions:{placeholder:"Enter project no"},reportNoInputOptions:{placeholder:"Enter report no"},remarkInputOptions:{placeholder:"Enter remark"}}},computed:{},methods:{EXPORT_DATA:function(t){var e=new d.Workbook,n=e.addWorksheet("Projects");(0,_.V)({worksheet:n,component:t.component}).then((function(){e.xlsx.writeBuffer().then((function(t){u()(new Blob([t],{type:"application/octet-stream"}),"inspection_record.xlsx")}))})),t.cancel=!0},FETCH_INSP_RECORD:function(){var t=this;this.isLoading=!0;var e=this.$route.params.id_tag;(0,r.p)({method:"get",url:"/PipingInspectionRecord/get-piping-ir-by-id-line?id_line="+e,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){console.log("insp record:"),console.log(e),200==e.status&&e.data&&(console.log("success"),t.inspRecordList=e.data,console.log(t.inspRecordList))}))["catch"]((function(t){console.log(t)}))["finally"]((function(){t.isLoading=!1}))},CREATE_RECORD:function(t){var e=this;t.data.id_line=this.$route.params.id_tag,t.data.id=0,t.data.is_active=!0,t.data.inspection_date=l()(t.data.inspection_date).format("L"),console.log(t.data),(0,r.p)({method:"post",url:"/PipingInspectionRecord",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:t.data}).then((function(t){201==t.status&&(console.log("create success"),e.FETCH_INSP_RECORD())}))["catch"]((function(t){e.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))},UPDATE_RECORD:function(t){var e=this;t.data.inspection_date=l()(t.data.inspection_date).format("L"),console.log(t.data),(0,r.p)({method:"put",url:"/PipingInspectionRecord/"+t.key,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:t.data}).then((function(t){204==t.status&&(console.log("update success"),e.FETCH_INSP_RECORD())}))["catch"]((function(t){e.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))},DELETE_RECORD:function(t){var e=this;(0,r.p)({method:"delete",url:"/PipingInspectionRecord/"+t.key,headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(t){204==t.status&&(console.log("delete success"),e.FETCH_INSP_RECORD())}))["catch"]((function(t){e.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)}))["finally"]((function(){}))},SET_CURRENT_VIEW:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.$store.commit("SET_SHOW_BACK_BUTTON",!0),null!==e?this.$emit("currentView",t,e):this.$emit("currentView",t)}}},T=k;var I=(0,f.A)(T,x,C,!1,null,"2ecf4405",null);const N=I.exports,S={name:"inspection-record",components:{ViewFR:E,AddFR:N},created:function(){this.$store.commit("UPDATE_CURRENT_PAGENAME",{subpageName:"INSPECTION",subpageInnerName:null})},data:function(){return{current_view:0,fieldData:null}},computed:{},methods:{SET_EDIT:function(t,e){this.current_view=t,this.fieldData=e}}},O=S;var y=(0,f.A)(O,i,a,!1,null,"73b6b163",null);const A=y.exports}}]);
//# sourceMappingURL=7792.ddae886a.js.map