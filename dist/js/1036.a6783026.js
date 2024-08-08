"use strict";(self["webpackChunktims_dexon"]=self["webpackChunktims_dexon"]||[]).push([[1036],{95162:(t,e,s)=>{s.d(e,{Z:()=>l});var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"app-loading"},[s("div",{staticClass:"box"},[s("hash-loader",{staticClass:"custom-class",attrs:{color:"#1e1450",loading:!0,size:40,sizeUnit:"px"}}),s("h5",{staticClass:"app-name"},[t._v(t._s(t.text))])],1)])},i=[];const n={name:"app-user-logging-in",props:{text:String}},o=n;var r=s(1001),c=(0,r.Z)(o,a,i,!1,null,"7261fb9f",null);const l=c.exports},99986:(t,e,s)=>{s.d(e,{Z:()=>l});var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._t("default")],2)},i=[];const n={name:"LayoutMain",components:{}},o=n;var r=s(1001),c=(0,r.Z)(o,a,i,!1,null,null,null);const l=c.exports},1036:(t,e,s)=>{s.r(e),s.d(e,{default:()=>C});var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-body",attrs:{id:"page-home"}},[s("div",{attrs:{id:"user-panel"}},[s("div",{staticClass:"page-container",staticStyle:{"padding-top":"40px","padding-bottom":"80px"}},[s("div",{staticClass:"wrapper"},[s("div",{staticClass:"left-col"},[s("div",{staticClass:"detail"},[s("div",{staticClass:"name"},[s("h2",[t._v("Asset Integrity Management System")]),s("h2",[t._v(t._s(t.user.lastname))])])])]),s("div",{staticClass:"right-col"},[s("v-ons-toolbar-button",{staticStyle:{"background-color":"transparent"},on:{click:function(e){return t.GO_TO("/account")}}},[s("span",[t._v("My Account")]),s("i",{staticClass:"las la-user-circle"})])],1)]),s("div",{staticClass:"searchbar-box"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.search_key,expression:"search_key"}],staticClass:"query",attrs:{type:"text",name:"search",size:"50",placeholder:"Search"},domProps:{value:t.search_key},on:{input:function(e){e.target.composing||(t.search_key=e.target.value)}}}),t._m(0),t.search_key?s("span",{staticClass:"close",on:{click:function(e){return t.SEARCH_CLEAR()}}},[s("i",{staticClass:"la la-close"})]):t._e()])]),s("div",{staticClass:"bg-filter"})]),s("div",{staticClass:"page-container"},[t._m(1),!this.search_key&&this.assetListRecent.length>0?s("div",{staticClass:"client-list-recent"},t._l(t.assetListPaged,(function(e){return s("v-ons-card",{key:e.id,staticClass:"client-card",on:{click:function(s){return t.VIEW_INFO(e)}}},[s("div",{staticClass:"client_logo"},[s("img",{attrs:{src:e.logo,alt:"logo"}})]),s("div",{staticClass:"title"},[t._v(t._s(e.asset_name))])])})),1):t._e()]),this.search_key?t._e():s("div",{staticClass:"page-container"},[1==t.showSectionLabel?s("div",{staticClass:"section-label"},[s("h2",{staticClass:"page-section-label"},[t._v("Master Data & Management")])]):t._e(),s("div",{staticClass:"app-drawer-wrapper"},t._l(t.appsList.managementApps,(function(e){return s("div",{key:e.id,staticClass:"app-item-wrapper"},[1==e.isActive?s("div",{staticClass:"app-item",on:{click:function(s){return t.OPEN_APP(e)}}},[s("img",{attrs:{src:e.icon_menu}}),s("label",[t._v(t._s(e.name))])]):t._e()])})),0)]),1==t.isOpening?s("AppLoading",{attrs:{icon:t.openingApp.icon_menu,name:t.openingApp.name}}):t._e(),1==t.isLoading?s("PageLoading",{attrs:{text:"Loading"}}):t._e()],1)},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon"},[s("i",{staticClass:"la la-search"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"section-label"},[s("h2",{staticClass:"page-section-label",staticStyle:{"padding-top":"40px"}},[t._v("Assets")])])}],n=(s(29254),s(57327),s(41539),s(26699),s(32023),s(38862),s(47042),s(40561),s(17133)),o=s.n(n),r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"app-loading"},[s("div",{staticClass:"box"},[s("img",{attrs:{src:t.icon}}),s("hash-loader",{staticClass:"loader",attrs:{color:"#1e1450",loading:!0,size:40,sizeUnit:"px"}})],1)])},c=[];const l={name:"in-app-opening",props:{name:String,icon:String,color:String}},p=l;var _=s(1001),u=(0,_.Z)(p,r,c,!1,null,"055b2ff6",null);const d=u.exports;var g=s(99986),m=s(95162);const h={name:"HomeView",components:{AppLoading:d,PageLoading:m.Z},data:function(){return{appsList:this.$store.state.appsList,isOpening:!1,isLoading:!1,openingApp:"",showSectionLabel:!0,user:null,assetList:[{id_asset:1,asset_name:"Flowline",logo:"/img/icon_menu/equipment/flowline.png"},{id_asset:2,asset_name:"Piping",logo:"/img/icon_menu/equipment/piping.png"},{id_asset:3,asset_name:"Pressure Vessel",logo:"/img/icon_menu/equipment/vessel.png"},{id_asset:4,asset_name:"Storage Tank",logo:"/img/icon_menu/equipment/tank.png"},{id_asset:5,asset_name:"Pipeline",logo:"/img/icon_menu/equipment/pipeline.png"},{id_asset:6,asset_name:"Lifting",logo:"/img/icon_menu/equipment/lifting.png"},{id_asset:8,asset_name:"Pressure Relief Device"},{id_asset:9,asset_name:"Rotating"}],assetListPaged:[],assetListFiltered:[],assetListRecent:[],search_key:""}},watch:{search_key:function(){this.SEARCH_GET(this.search_key)}},created:function(){this.STORE_LIST(),this.$emit("update:layout",g.Z),this.$store.commit("CLEAR_CURRENT_INAPP"),this.user=JSON.parse(localStorage.getItem("user")),1==this.$store.state.status.server&&(this.ADD_LOCAL_STORE_LIST(),this.CHECK_RECENT_EXIST())},beforeMount:function(){},mounted:function(){},methods:{OPEN_APP:function(t){if(1==t.isActive){this.openingApp=t,this.isOpening=!0;var e=this.openingApp.link;e&&this.$router.push(e),this.isOpening=!1}},VIEW_INFO:function(t){if(t.id_asset){var e=encodeURI(t.asset_name.toLowerCase());"Pressure Vessel"==t.asset_name?e="vessel":"Storage Tank"==t.asset_name&&(e="tank"),this.KEEP_RECENT(t),this.$store.commit("UPDATE_CURRENT_VIEW_CLIENT",t.asset_name),this.$router.push(e)}},SEARCH_GET:function(t){var e=this.assetList;""!=t&&t&&(e=e.filter((function(e){return e.asset_name.toUpperCase().includes(t.toUpperCase())}))),this.assetListFiltered=e},SEARCH_CLEAR:function(){this.search_key=null},GO_TO:function(t){t&&this.$router.push(t)},CHECK_RECENT_EXIST:function(){var t=JSON.parse(localStorage.getItem("recent_asset"));if(console.log(t),null==t){var e=[];localStorage.setItem("recent_asset",JSON.stringify(e))}this.assetListRecent=JSON.parse(localStorage.getItem("recent_asset")),this.assetListRecent=this.assetListRecent.slice(0,6)},ADD_LOCAL_STORE_LIST:function(){var t=this.assetList;localStorage.setItem("recent_asset",JSON.stringify(t))},KEEP_RECENT:function(t){var e,s=JSON.parse(localStorage.getItem("recent_asset")),a=s.filter((function(e){return e.id_asset==t.id_asset}));e=a.length>0?1:0;var i=s;if(0==e)i.unshift(t),localStorage.setItem("recent_asset",JSON.stringify(i));else{for(var n=0;n<i.length;n++)if(i[n].id_asset==t.id_asset){i.splice(n,1);break}i.unshift(t),localStorage.setItem("recent_asset",JSON.stringify(i))}},CLEAR_RECENT:function(){var t=this;this.$ons.notification.confirm("Confirm Clear?").then((function(e){1==e&&(localStorage.removeItem("recent_asset"),t.CHECK_RECENT_EXIST())}))},SHOW_MORE_CLIENT:function(){this.assetListPaged=this.assetList},STORE_LIST:function(){this.assetListPaged=this.assetList.slice(0,9)}},computed:{baseURL:function(){var t=this.$store.state.mode;return"dev"==t?this.$store.state.modeURL.dev:"prod"==t?this.$store.state.modeURL.prod:console.log("develpment mode set up incorrect.")},current_date:function(){return o()().format("dddd, LL, hh:mm:ss a")},client_list_section_label:function(){return this.search_key&&0==this.assetListFiltered.length?"Not Found":this.search_key&&this.assetListFiltered.length>0?"Search Result":"All Assets"}}},f=h;var v=(0,_.Z)(f,a,i,!1,null,"31d8f6b3",null);const C=v.exports},32023:(t,e,s)=>{var a=s(82109),i=s(1702),n=s(3929),o=s(84488),r=s(41340),c=s(84964),l=i("".indexOf);a({target:"String",proto:!0,forced:!c("includes")},{includes:function(t){return!!~l(r(o(this)),r(n(t)),arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=1036.a6783026.js.map