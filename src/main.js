import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

//DexExtreme
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

//Main UI Framework (OnsenUI)
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import VueOnsen from 'vue-onsenui';

// var sha256 = require('js-sha256');
import { VueSpinners } from '@saeris/vue-spinners'
import SignaturePad from 'signature_pad'

//highchart
import Highchart from "highcharts/highcharts";
import HighchartsVue from "highcharts-vue";
import stockInit from "highcharts/modules/stock";
//import exportingInit from "highcharts/modules/exporting";
//import offlineExporting from "highcharts/modules/offline-exporting";

//v-select
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

import { initializeMSAL } from '/authService.js';

(async () => {
  try {
      await initializeMSAL();
  } catch (error) {
      console.error('MSAL initialization error:', error);
  }
})();

stockInit(Highchart);
Highchart.setOptions({
  lang: {
    thousandsSep: ','
  }
})
Vue.use(HighchartsVue);
Vue.use(vSelect)
//Vue.use(offlineExporting);
//Vue.use(exportingInit);
Vue.use(VueSpinners)
// Vue.use(require('vue-moment'));
Vue.use(VueOnsen);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  // sha256,
  SignaturePad,
  render: h => h(App)
}).$mount('#app')

