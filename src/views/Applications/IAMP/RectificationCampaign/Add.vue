<template>
  <div class="page-container">
    <div class="page-section">
      <div class="table-wrapper">
        <h3 style="grid-column: span 2; margin-bottom: 0; margin-top: 0;">New Rectification Campaign</h3>

        <div class="input-wrapper">
          <span>Rectification Issue</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Rectification Issue"
              v-model="rectificationCampaignList.rc_issue"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>PIC</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter PIC"
              v-model="rectificationCampaignList.person_in_charge"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Contractor</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Contractor"
              v-model="rectificationCampaignList.contactor"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Target Completion</span>
          <div class="select">
            <DxDateBox
              type="date"
              placeholder="Select Target Completion"
              v-model="rectificationCampaignList.target_completion"
              display-format="dd MMM yyyy"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Work Package</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.status"
              value-expr="id"
              display-expr="status"
              placeholder="Select Status"
              v-model="rectificationCampaignList.id_status_work_package"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Manpower</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.status"
              value-expr="id"
              display-expr="status"
              placeholder="Select Status"
              v-model="rectificationCampaignList.id_status_manpower"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Equipment</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.status"
              value-expr="id"
              display-expr="status"
              placeholder="Select Status"
              v-model="rectificationCampaignList.id_status_equipment"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>POB</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.status"
              value-expr="id"
              display-expr="status"
              placeholder="Select Status"
              v-model="rectificationCampaignList.id_status_pob"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Execution</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.status"
              value-expr="id"
              display-expr="status"
              placeholder="Select Status"
              v-model="rectificationCampaignList.id_status_execute"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Comments</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Comments"
              v-model="rectificationCampaignList.comments"
            />
          </div>
        </div>
        
        <button class="create" @click="CREATE_RECORD">Create</button>
        <button @click="SET_CURRENT_VIEW(0)">Cancel</button>

        <br>
      </div>
    </div>
  </div>
</template> 

<script>
import { axios } from "/axios.js";
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
      subpageName: "RECTIFICATION CAMPAIGN",
      subpageInnerName: null,
    });
    this.FETCH_DROPDOWN_STATUS();
  },
  data() {
    return {
      testList: [],
      rectificationCampaignList: {
        id: 0,
        rc_issue: null,
        person_in_charge: null,
        contactor: null,
        target_completion: null,
        id_status_work_package: null,
        id_status_manpower: null,
        id_status_equipment: null,
        id_status_pob: null,
        id_status_execute: null,
        comments: null,
        is_active: true
      },
      formSelect: {
        status: [],
      }
    };
  },
  computed: {},
  methods: {
    CREATE_RECORD() {
      this.rectificationCampaignList.target_completion = moment(this.rectificationCampaignList.target_completion).format("L")
      axios({
        method: "post",
        url: "/RectificationCampaign",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: this.rectificationCampaignList
      })
        .then(res => {
          if (res.status == 201) {
            this.SET_CURRENT_VIEW(0);
          }
        })
        .catch(error => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
    FETCH_DROPDOWN_STATUS() {
      axios({
        method: "get",
        url: "/Md/get-md-rectification-status-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.status = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
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
    font-weight: 800;
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