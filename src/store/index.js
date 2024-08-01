import Vue from 'vue'
import Vuex from 'vuex'
import { axios } from "/axios.js";
import router from '/src/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mode: 'dev', //dev, prod
    modeURL: {
      dev: 'http://localhost:3000/',
      prod: 'https://dis02.dexon-technology.com:449/',
      //prod: 'https://aims-muda.cpoc.com.my:1444/'
    },
    urlApi: {
      dev: 'http://localhost:3000/api',
      prod: 'https://dis02.dexon-technology.com:449/api',
      //prod: 'https://aims-muda.cpoc.com.my:1444/api',
    },
    msalDev: {
      clientId: "11e9d8bf-c86f-451c-921a-a6dc664d463f",
      authority: "https://login.microsoftonline.com/207965f0-fa58-4bf2-b944-cf95f533feeb",
      redirectUri: "http://localhost:8081/login",
    },
    msalProd: { // dis02 server
      clientId: "ec225fd3-615d-43e4-bcc2-c08f1d36f7d3",
      authority: "https://login.microsoftonline.com/207965f0-fa58-4bf2-b944-cf95f533feeb",
      redirectUri: "https://dis02.dexon-technology.com:1449",
    },
    // msalProd: { // cpoc server
    //   clientId: "767a1056-a0fb-4121-a515-eb8f23887079",
    //   authority: "https://login.microsoftonline.com/a1a72289-9e38-42b8-af4f-4604df99036b",
    //   redirectUri: "https://aims-muda.cpoc.com.my:444/login",
    // },
    urlApiFileMaker: 'https://ai1.dexon-technology.com/fmi/data/v2/databases', // dis02 server
    //urlApiFileMaker: 'https://aims-muda.cpoc.com.my/fmi/data/v2/databases', // cpoc server
    user: '',
    appIcon: '/img/app-logo.svg',
    currentInApp: '',
    currentPageName: '',
    currentPageInnerName: '',
    currentClient: '',
    showBackButton: true,
    status: {
      fullscreenAlert: false,
      server: true,
      token: false,
    },
    appsList: {
      managementApps: [
        {
          id: 103,
          name: "Master Data",
          icon: "/img/icon_menu/modules/master_data.svg",
          icon_menu: '/img/icon_menu/modules/master_data.svg',
          link: "/md/user-role",
          isActive: true,
        },
        {
          id: 108,
          name: "User Account",
          icon: "/img/icon_menu/modules/users.svg",
          icon_menu: "/img/icon_menu/modules/users.svg",
          link: "/user-account-manager",
          isActive: true,
        },
        {
          id: 109,
          name: "Accessibility",
          icon: "/img/icon_menu/modules/users.svg",
          icon_menu: "/img/icon_menu/modules/key-solid.svg",
          link: "/accessibility-manager",
          isActive: true,
        },
      ],
    },

    sidebarMasterDateList: [
      {
        id: 100,
        name: "User Role",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/user-role",
        isActive: true,
      },
      {
        id: 101,
        name: "Prefix",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/prefix",
        isActive: true,
      },
      {
        id: 102,
        name: "Asset Type",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/asset-type",
        isActive: true,
      },
      {
        id: 103,
        name: "Insp Campaign Status",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/insp-campaign-status",
        isActive: true,
      },
      {
        id: 104,
        name: "Insp Task Status",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/insp-task-status",
        isActive: true,
      },
      {
        id: 105,
        name: "Insp Type",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/insp-type",
        isActive: true,
      },
      {
        id: 106,
        name: "Integrity Status",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/integrity-status",
        isActive: true,
      },
      {
        id: 107,
        name: "MOC NOC",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/moc-noc",
        isActive: true,
      },
      {
        id: 108,
        name: "MOC RRL",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/moc-rrl",
        isActive: true,
      },
      {
        id: 109,
        name: "MOC Status",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/moc-status",
        isActive: true,
      },
      {
        id: 110,
        name: "Platform",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/platform",
        isActive: true,
      },
      {
        id: 111,
        name: "Rectification Status",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/rectification-status",
        isActive: true,
      },
      {
        id: 112,
        name: "Risk Ranking",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/risk-ranking",
        isActive: true,
      },
      {
        id: 113,
        name: "Failure Impact",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/failure-impact",
        isActive: true,
      },
      {
        id: 114,
        name: "Failure Action Impact",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/failure-action-impact",
        isActive: true,
      },
      {
        id: 115,
        name: "Failure Dicipline",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/failure-dicipline",
        isActive: true,
      },
      {
        id: 116,
        name: "Failure Approval Status",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/failure-approval-status",
        isActive: true,
      },
      {
        id: 117,
        name: "TXN Status",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/txn-status",
        isActive: true,
      },
    ],
    sidebarSAP : [
      {
        id: 118,
        name: "SAP Modules",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/sap-modules",
        isActive: true,
      },
      {
        id: 119,
        name: "SAP Accessibility",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/sap-accessibility",
        isActive: true,
      },
      {
        id: 120,
        name: "SAP Code",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/sap-code",
        isActive: true,
      },
      {
        id: 121,
        name: "SAP Code GRP Cause",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/sap-code-grp-cause",
        isActive: true,
      },
      {
        id: 122,
        name: "SAP Code GRP Damage",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/sap-code-grp-damage",
        isActive: true,
      },
      {
        id: 123,
        name: "SAP Code GRP Object Part",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/sap-code-grp-object-part",
        isActive: true,
      },
      {
        id: 124,
        name: "SAP Damage Code",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/sap-damage-code",
        isActive: true,
      },
      {
        id: 125,
        name: "SAP Functional Location",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/sap-functional-location",
        isActive: true,
      },
      {
        id: 126,
        name: "SAP Main Work CTR",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/sap-main-work-ctr",
        isActive: true,
      },
      {
        id: 127,
        name: "SAP Planner GRP",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/sap-planner-grp",
        isActive: true,
      },
      {
        id: 128,
        name: "SAP Planner GRP Planning Plant",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/sap-planner-grp-planning-plant",
        isActive: true,
      },

    ],
    sidebarExInspec :[
      {
        id: 129,
        name: "Area Class",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-area-class",
        isActive: true,
      },
      {
        id: 130,
        name: "Area GasGroup",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-area-gas-group",
        isActive: true,
      },
      {
        id: 131,
        name: "Area Standard",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-area-standard",
        isActive: true,
      },
      {
        id: 132,
        name: "Area TempClass",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-area-temp-class",
        isActive: true,
      },
      {
        id: 135,
        name: "Equip Standard",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-equip-standard",
        isActive: true,
      },
      {
        id: 136,
        name: "Equip ProtectionLevel Category",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-equip-protection-level-category",
        isActive: true,
      },
      {
        id: 137,
        name: "Equip Protection Type",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-equip-protection-type",
        isActive: true,
      },
      {
        id: 138,
        name: "Equip Class",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-equip-class",
        isActive: true,
      },
      {
        id: 139,
        name: "Equip TempClass",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-equip-temp-class",
        isActive: true,
      },
      {
        id: 140,
        name: "Equip GasGroup",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-equip-gas-group",
        isActive: true,
      },
      {
        id: 141,
        name: "Equip IP Rating",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-equip-ip-rating",
        isActive: true,
      },
      {
        id: 142,
        name: "Equip Enclosure Type",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-equip-enclosure-type",
        isActive: true,
      },
      {
        id: 143,
        name: "Equip Type",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-equip-type",
        isActive: true,
      },
      {
        id: 144,
        name: "Env Status",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-env-status",
        isActive: true,
      },
      {
        id: 133,
        name: "Checklist Status",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-checklist-status",
        isActive: true,
      },
      {
        id: 134,
        name: "PictureLog Status",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-picturelog-status",
        isActive: true,
      },
      {
        id: 145,
        name: "Discipline",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-discip-line",
        isActive: true,
      },
      {
        id: 145,
        name: "GasGroup",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-gas-group",
        isActive: true,
      },
      {
        id: 146,
        name: "Location",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-location",
        isActive: true,
      },
      {
        id: 147,
        name: "Zone",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/ex-inspec-zone",
        isActive: true,
      },


    ],
    sidebarList: {
    },
    inAppMessage: {
      noData: "<div class='no-data-box' style='display: flex;justify-content: center;align-items: center;flex-direction: column;color: #a6a6a6;height: 200px;'><div><i class='las la-folder-open' style='margin-right:10px;font-size:20px;'></i><span>No Data</span></div></div>",
    },
    currentViewClient: null,
  },
  getters: {
  },
  mutations: {
    SET_SHOW_BACK_BUTTON: (state, payload) => {
      state.showBackButton = payload;
    },
    UPDATE_CURRENT_INAPP: (state, payload) => {
      if (payload) state.currentInApp = payload;
      else console.log('error: no payload');
    },
    UPDATE_CURRENT_CLIENT: (state, payload) => {
      if (payload) state.currentClient = payload;
      else console.log('error: no payload');
    },
    CLEAR_CURRENT_INAPP: (state) => {
      state.currentInApp = '';
    },
    CLEAR_CURRENT_CLIENT: (state) => {
      state.currentClient = '';
    },
    SIGN_IN: (state, payload) => {
      state.user = payload
    },
    SIGN_OUT: (state) => {
      state.user = "";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/login");
    },
    VALIDATE_TOKEN: (state) => {
      axios({
        method: "get",
        url: "/User/connection-test",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          if (res.status == 200) {
            state.status.token = true;
            state.status.server = true;
            console.log("==> CONNECTION OK || TOKEN IS VALID <==")
          }

        })
        .catch((error) => {

          console.log("VALIDATE ERROR:")
          console.log(error)
          if (error.response.status == 0) {
            console.log('SERVER FAILED')
            // state.status.server = false;
            // state.status.fullscreenAlert = true;
            // alert('Cannot connect to server. Click "OK" to retry.')
            // router.go();
          }
          else if (error.response.status == 401) {
            console.warn('TOKEN FAILED!')
            state.status.token = false;
            state.status.fullscreenAlert = true;
            // alert('Session is expired. Please sign in again.')
            // localStorage.removeItem("user");
            // localStorage.removeItem("token");
            // router.push("/login");
          }
          else{
            // state.status.token = false
            // state.status.fullscreenAlert=true;
          }
        })
        .finally(() => { });
    },
    FETCH_USER_INFO: (state) => {
      if (JSON.parse(localStorage.getItem("user"))) {
        var id_user = JSON.parse(localStorage.getItem("user")).id_user;
      }
      if (id_user) {
        axios({
          method: "post",
          url: "/user/get-info",
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
          data: { id_user },
        })
          .then((res) => {
            if (res.status == 200) {
              state.user = res.data.user;
              console.log("==> Fetch User Info : Vuex <==");
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          });
      }
    },
    UPDATE_CURRENT_VIEW_CLIENT: (state, payload) => {
      if (payload) {
        state.currentViewClient = payload;
      }
    },
    UPDATE_CURRENT_PAGENAME: (state, payload) => {
      if (payload) {
        state.currentPageName = payload.subpageName;
        state.currentPageInnerName = payload.subpageInnerName;
      }
    },
    CLEAR_CURRENT_PAGENAME: (state) => {
      state.currentPageName = '';
    }

  },
  actions: {
  },
  modules: {
  }
})
