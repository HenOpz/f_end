(self["webpackChunktims_dexon"]=self["webpackChunktims_dexon"]||[]).push([[7516],{57516:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>g});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-layout"},[n("div",{staticClass:"page-toolbar"},[n("toolbar",{staticStyle:{"grid-column":"span 2"},attrs:{isNewBtn:!0,isBackPath:!0,isRefresh:!0,isSearchBoxList:!1,isSearchDropdown:!1,options:t.liftingList,isBack_specificPath:"/",newBtnLabel:"New Lifting",pageName:"Lifting"},on:{refreshInfo:function(e){return t.FETCH_LIST()},newBtnFn:function(e){return t.TOGGLE_POPUPADD()},isSearch:function(e){return t.SEARCH_GET()}}})],1),n("div",{staticClass:"page-content"},[t._m(0),t._m(1),t._m(2),t._m(3),n("div",{staticClass:"table-wrapper"},[n("DxDataGrid",{attrs:{id:"data-table-vessel-list","key-expr":"id","data-source":t.liftingList,"element-attr":t.dataGridAttributes,selection:{mode:"single"},"hover-state-enabled":!0,"allow-column-reordering":!0,"show-borders":!0,"show-row-lines":!0,"row-alternation-enabled":!1,"word-wrap-enabled":!0},on:{"selection-changed":t.VIEW_INFO}},[n("DxFilterRow",{attrs:{visible:!0}}),n("DxHeaderFilter",{attrs:{visible:!1}}),n("DxSelection",{attrs:{mode:"single"}}),n("DxColumn",{attrs:{"data-field":"id_site",caption:"Site",width:120,alignment:"center"}},[n("DxLookup",{attrs:{"data-source":t.siteList,"display-expr":"site_desc","value-expr":"id"}})],1),n("DxColumn",{attrs:{"data-field":"tag_no",caption:"Tag No.",width:120,alignment:"left"}}),n("DxColumn",{attrs:{"data-field":"serial_no",caption:"Serial No.",width:120,alignment:"left"}}),n("DxColumn",{attrs:{caption:"Corrosion Loop"}},[n("DxColumn",{attrs:{caption:"Number","data-field":"corrosion_loop_no",width:120}}),n("DxColumn",{attrs:{caption:"Description","data-field":"corrosion_loop_desc",width:120}})],1),n("DxColumn",{attrs:{"data-field":"risk_ranking",caption:"Risk Ranking",width:130,alignment:"left"}}),n("DxColumn",{attrs:{"data-field":"integrity_status",caption:"Integrity Status",width:130,alignment:"left"}}),n("DxColumn",{attrs:{caption:"Due Inspection"}},[n("DxColumn",{attrs:{caption:"Last","data-field":"last_inspection_date",format:"dd MMM yyyy",width:100}}),n("DxColumn",{attrs:{caption:"Next","data-field":"next_inspection_date",format:"dd MMM yyyy",width:100}}),n("DxColumn",{attrs:{caption:"Status","data-field":"due_inspection_status",width:100}})],1),n("DxColumn",{attrs:{caption:"Due Anomaly"}},[n("DxColumn",{attrs:{caption:"Last","data-field":"anom_last_inspection_date",format:"dd MMM yyyy",width:100}}),n("DxColumn",{attrs:{caption:"Next","data-field":"anom_next_inspection_date",format:"dd MMM yyyy",width:100}}),n("DxColumn",{attrs:{caption:"Status","data-field":"anom_due_inspection_status",width:100}})],1),n("DxScrolling",{attrs:{mode:"standard"}}),n("DxSearchPanel",{attrs:{visible:!1}}),n("DxPaging",{attrs:{"page-size":10,"page-index":0}}),n("DxPager",{attrs:{"show-page-size-selector":!0,"allowed-page-sizes":[5,10,20],"show-navigation-buttons":!0,"show-info":!0,"info-text":"Page {0} of {1} ({2} items)"}}),n("DxExport",{attrs:{enabled:!0}})],1)],1)]),1==t.isLoading?n("contentLoading",{attrs:{text:"Loading, please wait...",color:"#fc9b21"}}):t._e(),1==t.isAdd?n("popupAdd",{on:{closePopup:function(e){return t.TOGGLE_POPUPADD()}}}):t._e()],1)},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"box bg-red-status"},[n("div",{staticClass:"row text-center"},[n("div",{staticClass:"col-12"},[n("span",{staticClass:"text-p-number",attrs:{id:"p1_val"}})]),n("div",{staticClass:"col-12 text-p"},[t._v(" RED "),n("div",{staticClass:"text-p-sub"},[t._v("HIGH")])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"box bg-orange-status"},[n("div",{staticClass:"row text-center"},[n("div",{staticClass:"col-12"},[n("span",{staticClass:"text-p-number",attrs:{id:"p1_val"}})]),n("div",{staticClass:"col-12 text-p"},[t._v(" ORANGE "),n("div",{staticClass:"text-p-sub"},[t._v("MEDIUM HIGH")])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"box bg-yellow-status"},[n("div",{staticClass:"row text-center"},[n("div",{staticClass:"col-12"},[n("span",{staticClass:"text-p-number",attrs:{id:"p1_val"}})]),n("div",{staticClass:"col-12 text-p"},[t._v(" YELLOW "),n("div",{staticClass:"text-p-sub"},[t._v("MEDIUM")])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"box bg-green-status"},[n("div",{staticClass:"row text-center"},[n("div",{staticClass:"col-12"},[n("span",{staticClass:"text-p-number",attrs:{id:"p1_val"}})]),n("div",{staticClass:"col-12 text-p"},[t._v(" GREEN "),n("div",{staticClass:"text-p-sub"},[t._v("LOW")])])])])}],s=(n(41539),n(57327),n(26699),n(32023),n(30594)),o=n(80741),a=n(47886),l=n(87041),c=n(17133),u=n.n(c),d=n(39477),f=n(48626);const p={name:"liftingList",components:{toolbar:o.Z,contentLoading:s.Z,popupAdd:a.Z,DxDataGrid:f.DxDataGrid,DxSearchPanel:f.DxSearchPanel,DxPaging:f.DxPaging,DxPager:f.DxPager,DxScrolling:f.DxScrolling,DxColumn:f.DxColumn,DxExport:f.DxExport,DxHeaderFilter:f.DxHeaderFilter,DxFilterRow:f.DxFilterRow,DxSelection:f.DxSelection,DxLookup:f.DxLookup},created:function(){this.$store.commit("UPDATE_CURRENT_INAPP",{name:"Lifting Management",icon:"/img/icon_menu/equipment/lifting.png"}),this.FETCH_SITE(),this.FETCH_LIST()},data:function(){return{isAdd:!1,isEdit:!1,isLoading:!1,editInfo:"",infoClient:{},liftingList:[],liftingListFiltered:[],dataGridAttributes:{class:"data-grid-style"},search_key:null,siteList:[]}},computed:{},watch:{search_key:function(){this.SEARCH_GET(this.search_key)}},methods:{format_inservice_date:function(t){return t.inservice_date?u()(t.inservice_date).format("LL"):"N/A"},VIEW_INFO:function(t){console.log(t.selectedRowKeys),null!=t.selectedRowKeys&&this.$router.push("/lifting/tag/"+t.selectedRowKeys+"/info")},TOGGLE_POPUPADD:function(){this.isAdd=!this.isAdd},FETCH_SITE:function(){var t=this;(0,d.Z)({method:"get",url:"/master-data/get-md-site-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){console.log(e),200==e.status&&e.data&&(t.siteList=e.data)}))["catch"]((function(e){console.log(e),t.$ons.notification.alert(e.code+" "+e.response.status+" "+l.errorMonitor.message)}))["finally"]((function(){t.isLoading=!1}))},FETCH_LIST:function(){var t=this;this.isLoading=!0,(0,d.Z)({method:"get",url:"LiftingInfo",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){200==e.status&&e.data&&(t.liftingList=e.data)}))["catch"]((function(e){console.log(e),t.$ons.notification.alert(e.code+" "+e.response.status+" "+l.errorMonitor.message)}))["finally"]((function(){t.isLoading=!1}))},SEARCH_CLEAR:function(){this.search_key=null},SEARCH_GET:function(t){var e=this.liftingList;""!=t&&t&&(e=e.filter((function(e){return e.line_no.toUpperCase().includes(t.toUpperCase())}))),this.liftingListFiltered=e}}},v=p;var h=n(1001),m=(0,h.Z)(v,i,r,!1,null,"ed1aa0b4",null);const g=m.exports},44048:(t,e,n)=>{var i=n(82109);i({target:"Number",stat:!0},{isNaN:function(t){return t!=t}})},36535:(t,e,n)=>{var i=n(82109),r=n(22104),s=n(19662),o=n(19670),a=n(47293),l=!a((function(){Reflect.apply((function(){}))}));i({target:"Reflect",stat:!0,forced:l},{apply:function(t,e,n){return r(s(t),e,o(n))}})},87041:(t,e,n)=>{"use strict";var i=n(17964)["default"];n(41539),n(81299),n(36535),n(67556),n(82526),n(92222),n(36210),n(44048),n(9653),n(21703),n(96647),n(69070),n(30489),n(78011),n(68309),n(24812),n(47941),n(47042);var r,s="object"===("undefined"===typeof Reflect?"undefined":i(Reflect))?Reflect:null,o=s&&"function"===typeof s.apply?s.apply:function(t,e,n){return Function.prototype.apply.call(t,e,n)};function a(t){console&&console.warn&&console.warn(t)}r=s&&"function"===typeof s.ownKeys?s.ownKeys:Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.getOwnPropertyNames(t)};var l=Number.isNaN||function(t){return t!==t};function c(){c.init.call(this)}t.exports=c,t.exports.once=L,c.EventEmitter=c,c.prototype._events=void 0,c.prototype._eventsCount=0,c.prototype._maxListeners=void 0;var u=10;function d(t){if("function"!==typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+i(t))}function f(t){return void 0===t._maxListeners?c.defaultMaxListeners:t._maxListeners}function p(t,e,n,i){var r,s,o;if(d(n),s=t._events,void 0===s?(s=t._events=Object.create(null),t._eventsCount=0):(void 0!==s.newListener&&(t.emit("newListener",e,n.listener?n.listener:n),s=t._events),o=s[e]),void 0===o)o=s[e]=n,++t._eventsCount;else if("function"===typeof o?o=s[e]=i?[n,o]:[o,n]:i?o.unshift(n):o.push(n),r=f(t),r>0&&o.length>r&&!o.warned){o.warned=!0;var l=new Error("Possible EventEmitter memory leak detected. "+o.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");l.name="MaxListenersExceededWarning",l.emitter=t,l.type=e,l.count=o.length,a(l)}return t}function v(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function h(t,e,n){var i={fired:!1,wrapFn:void 0,target:t,type:e,listener:n},r=v.bind(i);return r.listener=n,i.wrapFn=r,r}function m(t,e,n){var i=t._events;if(void 0===i)return[];var r=i[e];return void 0===r?[]:"function"===typeof r?n?[r.listener||r]:[r]:n?y(r):_(r,r.length)}function g(t){var e=this._events;if(void 0!==e){var n=e[t];if("function"===typeof n)return 1;if(void 0!==n)return n.length}return 0}function _(t,e){for(var n=new Array(e),i=0;i<e;++i)n[i]=t[i];return n}function x(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}function y(t){for(var e=new Array(t.length),n=0;n<e.length;++n)e[n]=t[n].listener||t[n];return e}function L(t,e){return new Promise((function(n,i){function r(n){t.removeListener(e,s),i(n)}function s(){"function"===typeof t.removeListener&&t.removeListener("error",r),n([].slice.call(arguments))}C(t,e,s,{once:!0}),"error"!==e&&w(t,r,{once:!0})}))}function w(t,e,n){"function"===typeof t.on&&C(t,"error",e,n)}function C(t,e,n,r){if("function"===typeof t.on)r.once?t.once(e,n):t.on(e,n);else{if("function"!==typeof t.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+i(t));t.addEventListener(e,(function i(s){r.once&&t.removeEventListener(e,i),n(s)}))}}Object.defineProperty(c,"defaultMaxListeners",{enumerable:!0,get:function(){return u},set:function(t){if("number"!==typeof t||t<0||l(t))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");u=t}}),c.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},c.prototype.setMaxListeners=function(t){if("number"!==typeof t||t<0||l(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this},c.prototype.getMaxListeners=function(){return f(this)},c.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e.push(arguments[n]);var i="error"===t,r=this._events;if(void 0!==r)i=i&&void 0===r.error;else if(!i)return!1;if(i){var s;if(e.length>0&&(s=e[0]),s instanceof Error)throw s;var a=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var l=r[t];if(void 0===l)return!1;if("function"===typeof l)o(l,this,e);else{var c=l.length,u=_(l,c);for(n=0;n<c;++n)o(u[n],this,e)}return!0},c.prototype.addListener=function(t,e){return p(this,t,e,!1)},c.prototype.on=c.prototype.addListener,c.prototype.prependListener=function(t,e){return p(this,t,e,!0)},c.prototype.once=function(t,e){return d(e),this.on(t,h(this,t,e)),this},c.prototype.prependOnceListener=function(t,e){return d(e),this.prependListener(t,h(this,t,e)),this},c.prototype.removeListener=function(t,e){var n,i,r,s,o;if(d(e),i=this._events,void 0===i)return this;if(n=i[t],void 0===n)return this;if(n===e||n.listener===e)0===--this._eventsCount?this._events=Object.create(null):(delete i[t],i.removeListener&&this.emit("removeListener",t,n.listener||e));else if("function"!==typeof n){for(r=-1,s=n.length-1;s>=0;s--)if(n[s]===e||n[s].listener===e){o=n[s].listener,r=s;break}if(r<0)return this;0===r?n.shift():x(n,r),1===n.length&&(i[t]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",t,o||e)}return this},c.prototype.off=c.prototype.removeListener,c.prototype.removeAllListeners=function(t){var e,n,i;if(n=this._events,void 0===n)return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[t]&&(0===--this._eventsCount?this._events=Object.create(null):delete n[t]),this;if(0===arguments.length){var r,s=Object.keys(n);for(i=0;i<s.length;++i)r=s[i],"removeListener"!==r&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(e=n[t],"function"===typeof e)this.removeListener(t,e);else if(void 0!==e)for(i=e.length-1;i>=0;i--)this.removeListener(t,e[i]);return this},c.prototype.listeners=function(t){return m(this,t,!0)},c.prototype.rawListeners=function(t){return m(this,t,!1)},c.listenerCount=function(t,e){return"function"===typeof t.listenerCount?t.listenerCount(e):g.call(t,e)},c.prototype.listenerCount=g,c.prototype.eventNames=function(){return this._eventsCount>0?r(this._events):[]}}}]);
//# sourceMappingURL=7516.a236e21c.js.map