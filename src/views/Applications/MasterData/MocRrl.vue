<template>
  <div class="pm-page">
    <div class="pm-page-container">
      <div class="page-container">
        <DxDataGrid
          id="grid-data-list"
          key-expr="id"
          :data-source="dataList"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="false"
          :row-alternation-enabled="true"
          @row-inserted="CREATE"
          @row-updated="UPDATE"
          @row-removed="DELETE"
          @exporting="EXPORT_DATA"
        >
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            mode="row"
          />
          <DxColumn data-field="status" caption="Status">
            <DxRequiredRule />
          </DxColumn>
          <DxColumn data-field="color_code" caption="Color Code">
            <DxRequiredRule />
          </DxColumn>
          <DxColumn data-field="sort" caption="Sort">
            <DxRequiredRule />
          </DxColumn>
          <!-- Configuration goes here -->
          <!-- <DxFilterRow :visible="true" /> -->
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
  DxEditing,
  DxRequiredRule,
} from "devextreme-vue/data-grid";

//Structures
import contentLoading from "@/components/app-structures/app-content-loading.vue";

//API
import { GET_DATA, PUT_DATA, POST_DATA, DELETE_DATA } from "/axios.js";

export default {
  name: "ViewApplicableStatus",
  components: {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    DxEditing,
    DxRequiredRule,
    contentLoading,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Master Data Manager",
      icon: "/img/icon_menu/master_data/table.png",
    });
    if (this.$store.state.status.server == true) this.FETCH_LIST();
  },
  data() {
    return {
      dataList: null,
      isLoading: false,
    };
  },
  computed: {},
  methods: {
    EXPORT_DATA(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Projects");
      exportDataGrid({
        worksheet: worksheet,
        component: e.component,
      }).then(function () {
        workbook.xlsx.writeBuffer().then(function (buffer) {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "Projects.xlsx"
          );
        });
      });
      e.cancel = true;
    },
    FETCH_LIST() {
      GET_DATA(this, '/Md/get-md-moc-rrl-list', 'dataList');
    },
    CREATE(e) {
      e.data.id = 0;
      POST_DATA('/Md/add-md-moc-rrl', e.data, () => { this.FETCH_LIST(); });
    },
    UPDATE(e) {
      PUT_DATA(`/Md/edit-md-moc-rrl?id=${e.data.id}`, e.data, () => { this.FETCH_LIST(); });
    },
    DELETE(e) {
      DELETE_DATA(`/Md/delete-md-moc-rrl?id=${e.data.id}`, () => { this.FETCH_LIST(); });
    },
  },
};
</script>

<style lang="scss" scoped>
.pm-page {
  border: 1px solid #e6e6e6;
  border-width: 0 0 0 1px;
  background-color: #ffffff;
  height: 100%;

  .pm-page-container {
    background-color: #ffffff;
    padding: 20px 20px 0px 20px;
    height: calc(100vh - 159px);
    overflow-y: scroll;

    .page-container {
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
  }
}
#data-grid {
  height: 100%;
}
</style>