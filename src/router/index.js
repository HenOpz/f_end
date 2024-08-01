// import { h } from 'vue'
// import store from '@/store'
import Vue from "vue";
import VueRouter from "vue-router";
// import store from '../store'

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "404",
    component: () => import("../views/404View.vue"),
  },
  {
    path: "/login",
    name: "Log In",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: () => import("../views/ForgotPasswordView.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../views/AccountView.vue"),
  },
  //Inspection & anomaly monthly performance
  {
    path: "/iamp",
    name: "Inspection & Anomaly Monthly Performance",
    component: () => import("../views/Applications/IAMP/router-template.vue"),
    children: [
      {
        path: "",
        alias: "Dashboard",
        component: () => import("../views/Applications/IAMP/Dashboard/Page.vue"),
      },
      {
        path: "inspection",
        alias: "Inspection & Anomaly Monthly Performance Inspection",
        component: () => import("../views/Applications/IAMP/Inspection/Page.vue"),
      },
      {
        path: "inspection/flowline",
        alias: "Inspection & Anomaly Monthly Performance Inspection",
        component: () => import("../views/Applications/IAMP/Inspection/FlowLine/Page.vue"),
      },
      {
        path: "inspection/piping",
        alias: "Inspection & Anomaly Monthly Performance Inspection",
        component: () => import("../views/Applications/IAMP/Inspection/Piping/Page.vue"),
      },
      {
        path: "inspection/vessel",
        alias: "Inspection & Anomaly Monthly Performance Inspection",
        component: () => import("../views/Applications/IAMP/Inspection/Vessel/Page.vue"),
      },
      {
        path: "inspection/outgoing_riser",
        alias: "Inspection & Anomaly Monthly Performance Inspection",
        component: () => import("../views/Applications/IAMP/Inspection/OutgoingRiser/Page.vue"),
      },
      {
        path: "inspection/incoming_riser",
        alias: "Inspection & Anomaly Monthly Performance Inspection",
        component: () => import("../views/Applications/IAMP/Inspection/IncomingRiser/Page.vue"),
      },
      {
        path: "inspection/pipeline",
        alias: "Inspection & Anomaly Monthly Performance Inspection",
        component: () => import("../views/Applications/IAMP/Inspection/PipeLine/Page.vue"),
      },
      {
        path: "inspection/structure",
        alias: "Inspection & Anomaly Monthly Performance Inspection",
        component: () => import("../views/Applications/IAMP/Inspection/Structure/Page.vue"),
      },
      {
        path: "inspection/cylinder",
        alias: "Inspection & Anomaly Monthly Performance Inspection",
        component: () => import("../views/Applications/IAMP/Inspection/Cylinder/Page.vue"),
      },
      {
        path: "task",
        alias: "Inspection & Anomaly Monthly Performance Inspection",
        component: () => import("../views/Applications/IAMP/Task/Page.vue"),
      },
      {
        path: "anomaly-iamp",
        alias: "Inspection & Anomaly Monthly Performance Anomaly",
        component: () => import("../views/Applications/IAMP/Anomaly/Page.vue"),
      }, 
      {
        path: "hightlight-activities",
        alias: "Hightlight Activities",
        component: () => import("../views/Applications/IAMP/HightlightActivities/Page.vue"),
      },
      {
        path: "moc",
        alias: "Management Of Change",
        component: () => import("../views/Applications/IAMP/MOC/Page.vue"),
      },
      {
        path: "inspection-campaign",
        alias: "Inspection Campaign",
        component: () => import("../views/Applications/IAMP/InspectionCampaign/Page.vue"),
      },
      {
        path: "cm-wo-management",
        alias: "CM WO Management",
        component: () => import("../views/Applications/IAMP/CMManagement/Page.vue"),
      },
      {
        path: "rectification-campaign",
        alias: "Rectification Campaign",
        component: () => import("../views/Applications/IAMP/RectificationCampaign/Page.vue"),
      },
      {
        path: "inspection-campaign",
        alias: "Inspection Campaign",
        component: () => import("../views/Applications/IAMP/InspectionCampaign/Page.vue"),
      },
      {
        path: "monthly-report",
        alias: "Monthly Report",
        component: () => import("../views/Applications/IAMP/MonthlyReport/Page.vue"),
      },
      {
        path: "iamp-approval-process",
        alias: "User Permission",
        component: () => import("../views/Applications/IAMP/IAMPApprovalProcess/Page.vue"),
      },
    ]
  },
  //GPI
  {
    path: "/gpi",
    name: "General Platform Inspection",
    component: () => import("../views/Applications/GPI/router-template.vue"),
    children: [
      {
        path: "",
        alias: "Dashboard",
        component: () => import("../views/Applications/GPI/Dashboard/Page.vue"),
      },
      {
        path: "gpi-record",
        alias: "GPI Record",
        component: () => import("../views/Applications/GPI/GPIRecord/Page.vue"),
      },
      {
        path: "gpi-pending-approval",
        alias: "Pending Approval",
        component: () => import("../views/Applications/GPI/PendingApproval/Page.vue"),
      },
      {
        path: "gpi-approval-process",
        alias: "GPI Approval Process",
        component: () => import("../views/Applications/GPI/GPIApprovalProcess/Page.vue"),
      },
      {
        path: "gpi-record-edit/:id_record",
        alias: "GPI Record Edit",
        component: () => import("../views/Applications/GPI/GPIRecord/Edit.vue"),
      },
    ]
  },
  //Ex-inspection
  {
    path: "/ex-inspection",
    name: "Ex-Inspection",
    component: () => import("../views/Applications/ExInspection/router-template.vue"),
    children: [
      {
        path: "",
        alias: "Ex-Inspection Dashboard",
        component: () => import("../views/Applications/ExInspection/Dashboard/Page.vue"),
      },
      {
        path: "list",
        alias: "List of Ex-Inspection",
        component: () => import("../views/Applications/ExInspection/List/Page.vue"),
      },
      {
        path: "campaign",
        alias: "Campaign",
        component: () => import("../views/Applications/ExInspection/Campaign/Page.vue"),
      },
      {
        path: "pending-approval",
        alias: "Pending Approval",
        component: () => import("../views/Applications/ExInspection/PendingApproval/Page.vue"),
      },
      {
        path: "work-order",
        alias: "Work Order",
        component: () => import("../views/Applications/ExInspection/WorkOrder/Page.vue"),
      },
      {
        path: "approval-process",
        alias: "Approval Process",
        component: () => import("../views/Applications/ExInspection/ApprovalProcess/Page.vue"),
      },
    ],
  },
  {
    path: "/ex-inspection/tag/:id_tag",
    alias: "Ex-Inspection Info",
    component: () =>
      import("../views/Applications/ExInspection/Pages/router-template.vue"),
    children: [
      {
        path: "information",
        alias: "Ex-Inpsection Info",
        component: () =>
          import(
            "../views/Applications/ExInspection/Pages/Information/Page.vue"
          ),
      },
      {
        path: "inspection-record",
        alias: "Ex-Inpsection Info",
        component: () =>
          import(
            "../views/Applications/ExInspection/Pages/InspectionRecord/Page.vue"
          ),
      },
      {
        path: "checklist",
        alias: "Ex-Inpsection Info",
        component: () =>
          import(
            "../views/Applications/ExInspection/Pages/Checklist/Page.vue"
          ),
      },
      {
        path: "picture-log",
        alias: "Ex-Inpsection Info",
        component: () =>
          import(
            "../views/Applications/ExInspection/Pages/PictureLog/Page.vue"
          ),
      },
    ]
  },
  //Temporary repair
  {
    path: "/temporary-repair",
    name: "Temporary Repair",
    component: () => import("../views/Applications/TemporaryRepair/router-template.vue"),
    children: [
      {
        path: "",
        alias: "Temporary Repair Dashboard",
        component: () => import("../views/Applications/TemporaryRepair/Dashboard/Page.vue"),
      },
      {
        path: "trr",
        alias: "Temporary Repair Record",
        component: () => import("../views/Applications/TemporaryRepair/TRR/Page.vue"),
      },
      {
        path: "temporary-pending-approval",
        alias: "Temporary Repair Pending Approval",
        component: () => import("../views/Applications/TemporaryRepair/PendingApproval/Page.vue"),
      },
    ]
  },
  //Reliability
  {
    path: "/reliability",
    name: "Reliability",
    component: () => import("../views/Applications/Reliability/router-template.vue"),
    children: [
      {
        path: "",
        alias: "Reliability Dashboard",
        component: () => import("../views/Applications/Reliability/Dashboard/Page.vue"),
      },
      {
        path: "failure-report",
        alias: "Failure Report",
        component: () => import("../views/Applications/Reliability/FailureReport/Page.vue"),
      },
      {
        path: "pending-approval",
        alias: "Pending Approval",
        component: () => import("../views/Applications/Reliability/PendingApproval/Page.vue"),
      },
      {
        path: "stt",
        alias: "Short Term Tracking",
        component: () => import("../views/Applications/Reliability/STT/Page.vue"),
      },
      {
        path: "ltt",
        alias: "Long Term Tracking",
        component: () => import("../views/Applications/Reliability/LTT/Page.vue"),
      },
      {
        path: "rcfa-report",
        alias: "RCFA Report",
        component: () => import("../views/Applications/Reliability/RCFAReport/Page.vue"),
      },
      {
        path: "rcfa-stt",
        alias: "Short Term Tracking",
        component: () => import("../views/Applications/Reliability/RCFASTT/Page.vue"),
      },
      {
        path: "rcfa-ltt",
        alias: "Long Term Tracking",
        component: () => import("../views/Applications/Reliability/RCFALTT/Page.vue"),
      },
      {
        path: "failure-approval-process",
        alias: "Failure Approval Process",
        component: () => import("../views/Applications/Reliability/FailureApprovalProcess/Page.vue"),
      },
    ]
  },
  //Corrosion Monitoring
  {
    path: "/corrosion-monitoring",
    name: "Corrosion Monitoring",
    component: () => import("../views/Applications/CorrosionMonitoring/router-template.vue"),
    children: [
      {
        path: "",
        alias: "Dashboard",
        component: () => import("../views/Applications/CorrosionMonitoring/Dashboard/Page.vue"),
      },
      //sub menu
      {
        path: "cooling-medium/tag-registration",
        alias: "Tag Registration",
        component: () => import("../views/Applications/CorrosionMonitoring/TagRegistration/Page.vue"),
      },
      {
        path: "cooling-medium/water-analysis",
        alias: "Water Analysis",
        component: () => import("../views/Applications/CorrosionMonitoring/WaterAnalysis/Page.vue"),
      },
      {
        path: "cooling-medium/microbiological-bacteria",
        alias: "Microbiological Bacteria",
        component: () => import("../views/Applications/CorrosionMonitoring/MicroBacteria/Page.vue"),
      },
      {
        path: "cooling-medium/residual-corrosion-inhibitor",
        alias: "Residual Corrosion Inhibitor",
        component: () => import("../views/Applications/CorrosionMonitoring/RCI/Page.vue"),
      },
      {
        path: "cooling-medium/corrosion-coupon",
        alias: "Corrosion Coupon",
        component: () => import("../views/Applications/CorrosionMonitoring/CorrosionCoupon/Page.vue"),
      },
      {
        path: "cooling-medium/er-probe",
        alias: "ER Probe",
        component: () => import("../views/Applications/CorrosionMonitoring/ERProbe/Page.vue"),
      },
      // end
      //sub menu
      {
        path: "produced-water/tag-registration",
        alias: "Tag Registration",
        component: () => import("../views/Applications/CorrosionMonitoring/TagRegistration/Page.vue"),
      },
      {
        path: "produced-water/water-analysis",
        alias: "Water Analysis",
        component: () => import("../views/Applications/CorrosionMonitoring/WaterAnalysis/Page.vue"),
      },
      {
        path: "produced-water/microbiological-bacteria",
        alias: "Microbiological Bacteria",
        component: () => import("../views/Applications/CorrosionMonitoring/MicroBacteria/Page.vue"),
      },
      {
        path: "produced-water/corrosion-coupon",
        alias: "Corrosion Coupon",
        component: () => import("../views/Applications/CorrosionMonitoring/CorrosionCoupon/Page.vue"),
      },
      {
        path: "produced-water/er-probe",
        alias: "ER Probe",
        component: () => import("../views/Applications/CorrosionMonitoring/ERProbe/Page.vue"),
      },
      // end
      //sub menu
      {
        path: "sea-water/tag-registration",
        alias: "Tag Registration",
        component: () => import("../views/Applications/CorrosionMonitoring/TagRegistration/Page.vue"),
      },
      {
        path: "sea-water/water-analysis",
        alias: "Water Analysis",
        component: () => import("../views/Applications/CorrosionMonitoring/WaterAnalysis/Page.vue"),
      },
      {
        path: "sea-water/microbiological-bacteria",
        alias: "Microbiological Bacteria",
        component: () => import("../views/Applications/CorrosionMonitoring/MicroBacteria/Page.vue"),
      },
      {
        path: "sea-water/corrosion-coupon",
        alias: "Corrosion Coupon",
        component: () => import("../views/Applications/CorrosionMonitoring/CorrosionCoupon/Page.vue"),
      },
      {
        path: "sea-water/er-probe",
        alias: "ER Probe",
        component: () => import("../views/Applications/CorrosionMonitoring/ERProbe/Page.vue"),
      },
      // end
      //sub menu
      {
        path: "pipeline/tag-registration",
        alias: "Tag Registration",
        component: () => import("../views/Applications/CorrosionMonitoring/TagRegistration/Page.vue"),
      },
      {
        path: "pipeline/water-analysis",
        alias: "Water Analysis",
        component: () => import("../views/Applications/CorrosionMonitoring/WaterAnalysis/Page.vue"),
      },
      {
        path: "pipeline/microbiological-bacteria",
        alias: "Microbiological Bacteria",
        component: () => import("../views/Applications/CorrosionMonitoring/MicroBacteria/Page.vue"),
      },
      {
        path: "pipeline/residual-corrosion-inhibitor",
        alias: "Residual Corrosion Inhibitor",
        component: () => import("../views/Applications/CorrosionMonitoring/RCI/Page.vue"),
      },
      {
        path: "pipeline/corrosion-coupon",
        alias: "Corrosion Coupon",
        component: () => import("../views/Applications/CorrosionMonitoring/CorrosionCoupon/Page.vue"),
      },
      {
        path: "pipeline/er-probe",
        alias: "ER Probe",
        component: () => import("../views/Applications/CorrosionMonitoring/ERProbe/Page.vue"),
      },
      {
        path: "pipeline/pigging-operation",
        alias: "Pigging Operation",
        component: () => import("../views/Applications/CorrosionMonitoring/PiggingOperation/Page.vue"),
      },
      {
        path: "pipeline/chemical-injection",
        alias: "Chemical Injection",
        component: () => import("../views/Applications/CorrosionMonitoring/ChemicalInjection/Page.vue"),
      },
      // end





      {
        path: "corrosion-coupon",
        alias: "Corrosion Coupon",
        component: () => import("../views/Applications/CorrosionMonitoring/CorrosionCoupon/Page.vue"),
      },
      {
        path: "library",
        alias: "Library",
        component: () => import("../views/Applications/CorrosionMonitoring/Library/Page.vue"),
      },
    ]
  },
  
  {
    path: "/md",
    name: "MasterData",
    component: () =>
      import("../views/Applications/MasterData/router-template.vue"),
    // beforeEnter: (to, from, next) => {
    //   if (store.state.user.role == 'manager' || store.state.user.role == 'admin') next()
    //   else next('/')
    // },
    children: [

      {
        path: "user-role",
        alias: "User Role",
        component: () =>
          import("../views/Applications/MasterData/UserRole.vue"),
      },
      {
        path: "prefix",
        alias: "Prefix",
        component: () =>
          import("../views/Applications/MasterData/Prefix.vue"),
      },
      {
        path: "asset-type",
        alias: "Asset Type",
        component: () =>
          import("../views/Applications/MasterData/AssetType.vue"),
      },
      {
        path: "insp-campaign-status",
        alias: "Insp Campaign Status",
        component: () =>
          import("../views/Applications/MasterData/InspCampaignStatus.vue"),
      },
      {
        path: "insp-task-status",
        alias: "Insp Task Status",
        component: () =>
          import("../views/Applications/MasterData/InspTaskStatus.vue"),
      },
      {
        path: "insp-type",
        alias: "Insp Type",
        component: () =>
          import("../views/Applications/MasterData/InspType.vue"),
      },
      {
        path: "integrity-status",
        alias: "Integrity Status",
        component: () =>
          import("../views/Applications/MasterData/IntegrityStatus.vue"),
      },
      {
        path: "moc-noc",
        alias: "MOC NOC",
        component: () =>
          import("../views/Applications/MasterData/MocNoc.vue"),
      },
      {
        path: "moc-rrl",
        alias: "MOC RRL",
        component: () =>
          import("../views/Applications/MasterData/MocRrl.vue"),
      },
      {
        path: "moc-status",
        alias: "MOC Status",
        component: () =>
          import("../views/Applications/MasterData/MocStatus.vue"),
      },
      {
        path: "platform",
        alias: "Platform",
        component: () =>
          import("../views/Applications/MasterData/Platform.vue"),
      },
      {
        path: "rectification-status",
        alias: "Rectification Status",
        component: () =>
          import("../views/Applications/MasterData/RectificationStatus.vue"),
      },
      {
        path: "risk-ranking",
        alias: "Risk Ranking",
        component: () =>
          import("../views/Applications/MasterData/RiskRanking.vue"),
      },
      {
        path: "failure-impact",
        alias: "Failure Impact",
        component: () =>
          import("../views/Applications/MasterData/FailureImpact.vue"),
      },
      {
        path: "failure-action-impact",
        alias: "Failure Action Impact",
        component: () =>
          import("../views/Applications/MasterData/FailureActionImpact.vue"),
      },
      {
        path: "failure-dicipline",
        alias: "Failure Dicipline",
        component: () =>
          import("../views/Applications/MasterData/FailureDicipline.vue"),
      },
      {
        path: "failure-approval-status",
        alias: "Failure Approval Status",
        component: () =>
          import("../views/Applications/MasterData/FailureApprovalStatus.vue"),
      },
      {
        path: "txn-status",
        alias: "TXN Status",
        component: () =>
          import("../views/Applications/MasterData/TxnStatus.vue"),
      },
      {
        path: "sap-modules",
        alias: "SAP Modules",
        component: () =>
          import("../views/Applications/MasterData/SapModules.vue"),
      },
      {
        path: "sap-accessibility",
        alias: "SAP Accessibility",
        component: () =>
          import("../views/Applications/MasterData/SapAccessibility.vue"),
      },
      {
        path: "sap-code",
        alias: "SAP Code",
        component: () =>
          import("../views/Applications/MasterData/SapCode.vue"),
      },
      {
        path: "sap-code-grp-cause",
        alias: "SAP Code GRP Cause",
        component: () =>
          import("../views/Applications/MasterData/SapCodeGrpCause.vue"),
      },
      {
        path: "sap-code-grp-damage",
        alias: "SAP Code GRP Damage",
        component: () =>
          import("../views/Applications/MasterData/SapCodeGRrpDamage.vue"),
      },
      {
        path: "sap-code-grp-object-part",
        alias: "SAP Code GRP Object Part",
        component: () =>
          import("../views/Applications/MasterData/SapCodeGrpObjectPart.vue"),
      },
      {
        path: "sap-damage-code",
        alias: "SAP Damage Code",
        component: () =>
          import("../views/Applications/MasterData/SapDamageCode.vue"),
      },
      {
        path: "sap-functional-location",
        alias: "SAP Functional Location",
        component: () =>
          import("../views/Applications/MasterData/SapFunctionalLocation.vue"),
      },
      {
        path: "sap-main-work-ctr",
        alias: "SAP Main Work CTR",
        component: () =>
          import("../views/Applications/MasterData/SapMainWorkCtr.vue"),
      },
      {
        path: "sap-planner-grp",
        alias: "SAP Planner GRP",
        component: () =>
          import("../views/Applications/MasterData/SapPlannerGrp.vue"),
      },
      {
        path: "sap-planner-grp-planning-plant",
        alias: "SAP Planner GRP Planning Plant",
        component: () =>
          import("../views/Applications/MasterData/SapPlannerGrpPlanningPlant.vue"),
      },
      {
        path: "ex-inspec-area-class",
        alias: "ExInspection Area Class",
        component: () =>
          import("../views/Applications/MasterData/ExInspecAreaClass.vue"),
      },
      {
        path: "ex-inspec-area-gas-group",
        alias: "ExInspection Area GasGroup",
        component: () =>
          import ("../views/Applications/MasterData/ExInspecAreaGasGroup.vue"),
      },
      {
        path: "ex-inspec-area-standard",
        alias: "ExInspection Area Standard",
        component: () =>
          import("../views/Applications/MasterData/ExInspecAreaStandard.vue"),
      },
      {
        path: "ex-inspec-area-temp-class",
        alias: "ExInspection Area TempClass",
        component: () =>
          import("../views/Applications/MasterData/ExInspecAreaTempClass.vue"),
      },
      {
        path: "ex-inspec-checklist-status",
        alias: "ExInspection Checklist Status",
        component: () =>
          import("../views/Applications/MasterData/ExInspecChecklistStatus.vue"),
      },
      {
        path: "ex-inspec-picturelog-status",
        alias: "ExInspection PictureLog Status",
        component: () =>
          import("../views/Applications/MasterData/ExInspecPictureLogStatus.vue"),
      },
      {
        path: "ex-inspec-equip-standard",
        alias: "ExInspection Equip Standard",
        component: () =>
          import("../views/Applications/MasterData/ExInspecEquipStandard.vue"),
      },
      {
        path: "ex-inspec-equip-protection-level-category",
        alias: "ExInspection Equip ProtectionLevel Category",
        component: () =>
          import("../views/Applications/MasterData/ExInspecEquipProtectionLvCategory.vue"),
      },
      {
        path: "ex-inspec-equip-protection-type",
        alias: "ExInspection Equip Protection Type",
        component: () =>
          import("../views/Applications/MasterData/ExInspecEquipProtectionType.vue"),
      },
      {
        path: "ex-inspec-equip-class",
        alias: "ExInspection Equip Class",
        component: () =>
          import("../views/Applications/MasterData/ExInspecEquipClass.vue"),
      },
      {
        path: "ex-inspec-equip-temp-class",
        alias: "ExInspection Equip TempClass",
        component: () =>
          import("../views/Applications/MasterData/ExInspecEquipTempClass.vue"),
      },
      {
        path: "ex-inspec-equip-gas-group",
        alias: "ExInspection Equip GasGroup",
        component: () =>
          import("../views/Applications/MasterData/ExInspecEquipGasGroup.vue"),
      },
      {
        path: "ex-inspec-equip-ip-rating",
        alias: "ExInspection Equip IP Rating",
        component: () =>
          import("../views/Applications/MasterData/ExInspecEquipIpRating.vue"),
      },
      {
        path: "ex-inspec-equip-enclosure-type",
        alias: "ExInspection Equip Enclosure Type",
        component: () =>
          import("../views/Applications/MasterData/ExInspecEquipEnclosureType.vue"),
      },
      {
        path: "ex-inspec-equip-type",
        alias: "ExInspection Equip Type",
        component: () =>
          import("../views/Applications/MasterData/ExInspecEquipType.vue"),
      },
      {
        path: "ex-inspec-env-status",
        alias: "ExInspection Env Status",
        component: () =>
          import("../views/Applications/MasterData/ExInspecEnvStatus.vue"),
      },
      {
        path: "ex-inspec-discip-line",
        alias: "ExInspection Discipline",
        component: () =>
          import("../views/Applications/MasterData/ExInspecDiscipline.vue"),
      },
      {
        path: "ex-inspec-gas-group",
        alias: "ExInspection GasGroup",
        component: () =>
          import("../views/Applications/MasterData/ExInspecGasGroup.vue"),
      },
      {
        path: "ex-inspec-location",
        alias: "ExInspection Location",
        component: () =>
          import("../views/Applications/MasterData/ExInspecLocation.vue"),
      },
      {
        path: "ex-inspec-zone",
        alias: "ExInspection Zone",
        component: () =>
          import("../views/Applications/MasterData/ExInspecZone.vue"),
      },




    ]
  },

  // USER ACCOUNT MANAGEMENT
  {
    path: "/user-account-manager",
    name: "User Account Manager",
    component: () =>
      import("../views/Applications/UserAccountManager/UserList.vue"),
    // beforeEnter: (to, from, next) => {
    //   if (store.state.user.role == 'manager' || store.state.user.role == 'admin') next()
    //   else next('/')
    // },
  },
  // ACCESSIBILITY MANAGEMENT
  {
    path: "/accessibility-manager",
    name: "Accessibility Manager",
    component: () =>
      import("../views/Applications/Accessibility/AccessibilityList.vue"),
    // beforeEnter: (to, from, next) => {
    //   if (store.state.user.role == 'manager' || store.state.user.role == 'admin') next()
    //   else next('/')
    // },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/register", "/forgot-password"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next("/login");
  }
  next();
});
