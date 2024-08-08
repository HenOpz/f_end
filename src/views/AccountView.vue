<template>
  <div class="page-container">
    <br>
    <DxDataGrid
        id="data-grid-list"
        key-expr="id"
        :data-source="userList"
        :selection="{ mode: 'single' }"
        :hover-state-enabled="true"
        :allow-column-reordering="false"
        :show-borders="true"
        :show-row-lines="false"
        :row-alternation-enabled="true"
        @row-updated="UPDATE_ROW"
      >
        <DxEditing 
          :allow-updating="true" 
          :allow-deleting="false" 
          :allow-adding="false" 
          :use-icons="true"
          mode="popup"
        >
        <DxPopup
            :show-title="true"
            :width="500"
            :height="400"
            title="User Info"
        />
        <DxForm label-location="top" :col-count="2"></DxForm>
        </DxEditing>
        <DxColumn data-field="name" caption="Name" />
        <DxColumn data-field="id_company" caption="Company" :allow-editing="false">
            <DxLookup :data-source="companyList" display-expr="company_name" value-expr="id" />
        </DxColumn>
        <DxColumn data-field="position" caption="Position" />
        <DxColumn data-field="email" caption="Email" :allow-editing="false" />
        <DxMasterDetail
            :enabled="true"
            template="masterDetailTemplate"
        />
        <template #masterDetailTemplate="{ data }">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
              <displayImage :id_user="user.id" :id_record="data.key" :image_path="data.data.profile_img" :type="1" />
              <displayImage :id_user="user.id" :id_record="data.key" :image_path="data.data.signature" :type="2" />
            </div>
        </template>

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
    </DxDataGrid>
    <PageLoading v-if="isLoading == true" text="Loading" />
  </div>
</template>

<script>
// import { sha256 } from "js-sha256";
// import moment from "moment";
import displayImage from "@/components/image-component.vue";

import { GET_DATA, PUT_DATA, POST_DATA } from "/axios.js";
import "devextreme/dist/css/dx.light.css";
import {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxEditing,
    DxLookup,
    DxFilterRow,
    DxHeaderFilter,
    DxMasterDetail,
    DxPopup,
    DxForm,
} from "devextreme-vue/data-grid";

import ViewLayout from "@/layouts/non-sidebar-layout.vue";
// import DxDateBox from "devextreme-vue/date-box";
// import DxSelectBox from "devextreme-vue/select-box";
import PageLoading from "@/components/app-structures/app-loading.vue";

export default {
  name: "AccountView",
  components: { 
    PageLoading,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxEditing,
    DxLookup,
    DxFilterRow,
    DxHeaderFilter,
    DxMasterDetail,
    displayImage,
    DxPopup,
    DxForm,
  },
  created() {
    this.$emit(`update:layout`, ViewLayout);
    this.$store.commit("CLEAR_CURRENT_CLIENT");
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "My Account",
      icon: "",
    });
    if (this.$store.state.status.server == true) {
      this.user = JSON.parse(localStorage.getItem("user"));
      GET_DATA(this, '/Md/get-md-user-company-list', 'companyList');
      GET_DATA(this, `/User/get-user-info-by-id-user?id=${this.user.id}`, 'userList');
    }
  },
  data() {
    return {
      userList: [],
      companyList: [],
      user: {},
      file_pic_upload: "",
      previewImg: "",
      isLoading: false,
    };
  },
  computed: {
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    },
  },
  methods: {
    CREATE_ROW(e) {
      POST_DATA('/User/add-user-info', e.data, () => {});
    },
    UPDATE_ROW(e) {
      PUT_DATA(`/User/edit-user-info?id=${e.key}`, e.data, () => {})
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

report-sheet {
    max-width: 100%;
    width: 100%;
    font-family: $web-default-font;
    box-shadow: none;
    padding: 0 !important;
    margin-top: 0;
    margin-bottom: 0;

    .report-container {
        .header {
            .title {
                grid-column: span 4;
            }
        }

        .sheet-body {
            grid-template-columns: 100%;
            overflow: hidden;

            .form-item {
                display: grid;
                grid-template-columns: 230px calc(100% - 230px);
                grid-template-rows: 35px;

                .form-item-label {
                    label {
                        line-height: 14px;
                    }
                }

                .form-item-value {
                    grid-column: span 1;

                    label {
                        margin: 0 auto;
                        font-weight: 600;
                        line-height: 14px;
                    }
                }
            }
        }
    }
}
</style>
