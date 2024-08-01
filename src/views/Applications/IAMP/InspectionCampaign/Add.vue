<template>
  <div class="page-container">
    <div class="page-section">
      <div class="table-wrapper">
        <h3 style="grid-column: span 2; margin-bottom: 0; margin-top: 0;">New Inspection Campaign</h3>

        <div class="input-wrapper">
          <span>Inspection Program</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Inspection Program"
              v-model="inspectionCampaignList.inspection_program"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Status</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.status"
              value-expr="id"
              display-expr="status"
              placeholder="Select Status"
              v-model="inspectionCampaignList.id_ic_status"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Start Date</span>
          <div class="select">
            <DxDateBox
              type="date"
              v-model="inspectionCampaignList.start_date"
              placeholder="Select Start Date"
              display-format="dd MMM yyyy"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>End Date</span>
          <div class="select">
            <DxDateBox
              type="date"
              v-model="inspectionCampaignList.end_date"
              placeholder="Select End Date"
              display-format="dd MMM yyyy"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>PIC</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter PIC"
              v-model="inspectionCampaignList.person_in_charge"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Contractor</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Contractor"
              v-model="inspectionCampaignList.contractor"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Comments</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Comments"
              v-model="inspectionCampaignList.comments"
            />
          </div>
        </div>

        <div class="input-wrapper"></div>

        <button class="create" @click="CREATE_RECORD">Create</button>
        <button @click="SET_CURRENT_VIEW(0)">Cancel</button>

        <br>
      </div>
    </div>
  </div>
</template> 

<script>
import { GET_DATA, POST_DATA } from "/axios.js";
import moment from "moment";
import "devextreme/dist/css/dx.light.css";
import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';
import DxDateBox from 'devextreme-vue/date-box';

export default {
  name: "inspection-record",
  components: {
    DxSelectBox,
    DxTextBox,
    DxDateBox,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "INSPECTION CAMPAIGN",
      subpageInnerName: null,
    });
    this.FETCH_DROPDOWN_STATUS();
  },
  data() {
    return {
      inspectionCampaignList: {
        id: 0,
        inspection_program: null,
        is_active: true,
        start_date: null,
        end_date: null,
        person_in_charge: null,
        comments: null,
        id_ic_status: null,
      },
      formSelect: {
        status: [],
      }
    };
  },
  computed: {},
  methods: {
    CREATE_RECORD() {
      if (this.inspectionCampaignList.start_date !== null)
        this.inspectionCampaignList.start_date = moment(this.inspectionCampaignList.start_date).format("L");
      if (this.inspectionCampaignList.end_date !== null)
        this.inspectionCampaignList.end_date = moment(this.inspectionCampaignList.end_date).format("L");
      POST_DATA('/InspectionCampaign', this.inspectionCampaignList, () => { this.SET_CURRENT_VIEW(0); });
    },
    FETCH_DROPDOWN_STATUS() {
      GET_DATA(this, '/Md/get-md-insp-campaign-status-list', 'formSelect.status');
    },
    SET_CURRENT_VIEW(view, data = null) {
        this.$store.commit("SET_SHOW_BACK_BUTTON", true);
        if (data !== null) this.$emit('currentView', view, data);
        else this.$emit('currentView', view);
    }
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
  // overflow-y: hidden;
}

.page-section {
  padding: 20px;
  overflow-y: auto;
  height: calc(100% - 210px);
  grid-row: span 2;
}

.table-wrapper {
  display: grid;
  grid-template-columns: 48% 48%;
  gap: 15px;
  margin-bottom: 50px !important;
  *[fill] {
    grid-column: span 2;
  }
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
    
    span {
      font-size: 12px;
      font-weight: 600;
    }
    .title-wrapper {
      display: flex;
      align-items: center;
      gap: 5px;

      span:last-child {
        color: red;
      }
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
}
</style>