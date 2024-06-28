<template>
  <div class="page-wrapper">
    <div class="page-toolbar">
      <toolbar
        pageSubName="Accessibility"
        @refreshInfo="FETCH_LIST()"
        :isNewBtn="false"
        newBtnLabel="New"
        @newBtnFn="TOGGLE_POPUP('add')"
        :isBack="true"
      />
    </div>
    <div class="page-content">
      <DxDataGrid
        id="data-grid-list"
        key-expr="id"
        :data-source="accountList"
        :selection="{ mode: 'single' }"
        :hover-state-enabled="true"
        :allow-column-reordering="false"
        :show-borders="true"
        :show-row-lines="false"
        :row-alternation-enabled="true"
        @exporting="EXPORT_DATA"
      >
        <DxColumn data-field="name" caption="Full Name" />
        <DxColumn data-field="username" caption="Username" />
        <DxColumn data-field="login_last_date" caption="Last Login" data-type="date" format="dd MMM yyyy | HH:mm" alignment="center" />
        <DxMasterDetail
          :enabled="true"
          template="masterDetailTemplate"
        />
        <template #masterDetailTemplate="{ data }">
          <MenuList :accountData="data"/>
        </template>
        <!-- Configuration goes here -->
        <DxFilterRow :visible="true" />
        <DxHeaderFilter :visible="true" />
        <DxScrolling mode="standard" />
        <DxSearchPanel :visible="true" />
        <DxPaging :page-size="10" :page-index="0" />
        <DxPager
          :show-page-size-selector="true"
          :allowed-page-sizes="[5, 10, 20]"
          :show-navigation-buttons="true"
          :show-info="true"
          info-text="Page {0} of {1} ({2} items)"
        />
        <DxExport :enabled="true" />
      </DxDataGrid>
    </div>
    <contentLoading
      text="Loading, please wait..."
      v-if="isLoading == true"
      color="#fc9b21"
    />
  </div>
</template> 

<script>
//DataGrid
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import {
  DxDataGrid,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  DxExport,
  DxFilterRow,
  DxHeaderFilter,
  DxMasterDetail,
} from "devextreme-vue/data-grid";

import { axios } from "/axios.js";
import toolbar from "@/components/app-structures/app-navbar-toolbar.vue";
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import MenuList from "@/views/Applications/Accessibility/MenuList.vue";
// import clone from "just-clone";
export default {
  name: "User-Account-List",
  components: {
    toolbar,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    contentLoading,
    DxFilterRow,
    DxHeaderFilter,
    DxMasterDetail,
    MenuList
  },
  created() {
    this.$store.commit("CLEAR_CURRENT_CLIENT");
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "User Account Manager",
      icon: "/img/icon_menu/account/account.png",
    });
    if (this.$store.state.status.server == true) this.FETCH_LIST();
  },
  data() {
    return {
      accountList: [],
      isLoading: false,
      errorMessage: "",
    };
  },
  computed: {},
  methods: {
    EXPORT_DATA(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Clients");
      exportDataGrid({
        worksheet: worksheet,
        component: e.component,
      }).then(function () {
        workbook.xlsx.writeBuffer().then(function (buffer) {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "CPOC-AIMS-Account.xlsx"
          );
        });
      });
      e.cancel = true;
    },
    FETCH_LIST() {
      this.isLoading = true;
      axios({
        method: "get",
        url: "/User/get-active-user-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data) {
            this.accountList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.data-grid-style {
  margin-bottom: 100px;
}
</style>