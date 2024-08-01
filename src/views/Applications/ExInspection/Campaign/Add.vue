<template>
  <div class="page-container">
    <div class="page-section">
      <div class="table-wrapper">
        <h3 style="grid-column: span 2; margin-bottom: 0; margin-top: 0;">New Campaign</h3>

        <div class="input-wrapper">
          <span>Year</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Year"
              v-model="data.year"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Platform</span>
          <div class="input">
            <DxSelectBox
              :items="platformList"
              value-expr="id"
              display-expr="code_name"
              placeholder="Select Platform"
              v-model="data.id_platform"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>From Date</span>
          <div class="select">
            <DxDateBox
              type="date"
              placeholder="Select From Date"
              v-model="data.from_date"
              display-format="dd MMM yyyy"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>To Date</span>
          <div class="select">
            <DxDateBox
              type="date"
              placeholder="Select To Date"
              v-model="data.to_date"
              display-format="dd MMM yyyy"
            />
          </div>
        </div>

        <div class="input-wrapper" fill>
          <span>Description</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Description"
              v-model="data.description"
            />
          </div>
        </div>

        <button class="create" @click="CREATE_RECORD">Create</button>
        <button @click="$emit('popup')">Cancel</button>
      </div>
    </div>
  </div>
</template> 

<script>
import { GET_DATA } from "/axios.js";
// import moment from "moment";
import "devextreme/dist/css/dx.light.css";
import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';
import DxDateBox from "devextreme-vue/date-box";

export default {
  name: "add-ex-campaign",
  components: {
    DxSelectBox,
    DxTextBox,
    DxDateBox,

  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "ADD NEW CAMPAIGN",
      subpageInnerName: null,
    });
    if (this.$store.state.status.server == true) {
      GET_DATA(this, '/Md/get-md-platform-list', 'platformList');
    }
  },
  data() {
    return {
      platformList: [],
      data: {

      }
    };
  },
  computed: {},
  methods: {
    CREATE_RECORD() {

    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 51px calc(100vh - 95px);
  transition: all 0.3s;
  overflow-y: hidden;
  position: absolute !important;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: #14141484;
}

.page-section {
  width: 900px;
  padding: 20px;
  overflow-y: auto;
  height: auto;
  grid-row: span 2;
  // width: 1;
  position: absolute !important;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff !important;
  border-radius: 10px;
  border: #d9d9d9 1px solid;
}

.table-wrapper {
  display: grid;
  grid-template-columns: 48% 48%;
  gap: 15px;
  *[fill] {
    grid-column: span 2;
  }
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .checkbox-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      margin-bottom: 5px;
    }
    
    span {
      font-size: 12px;
      font-weight: 600;
    }
  }
  button {
    padding: 10px 0;
    background-color: white;
    border: solid 1px gray;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    transition: 1s;
    cursor: pointer;
  }
  .create {
    color: white;
    background-color: $web-theme-color-secondary;
    border: solid 1px $web-theme-color-secondary;
  }

  .pdf-wrapper {
    display: grid;
    grid-template-columns: 3;
    gap: 10px;

    *[span-2] {
      grid-column: span 2;
    }
    *[fill] {
      grid-column: span 3;
    }

    span {
      font-size: 16px;
    }
    img {
      width: 100%;
    }
    .button-wrapper {
      display: flex;
      flex-direction: column;
      gap: 10px;

      button, select {
        width: 100%;
        padding: 10px 0;
        color: white;
      }
      .select {
        background-color: $dexon-primary-green !important;
      }
      .delete {
        background-color: $dexon-primary-red;
      }
    }
  }
}
</style>