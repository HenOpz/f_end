<template>
  <div class="page-container">
    <div class="page-section">
      <div class="table-wrapper">
        <h4 style="grid-column: span 4">Edit Short Term Tracking</h4>
        <div class="input-wrapper" fill>
          <span>Action Details</span>
          <div class="input">
            <DxTextBox
              placeholder="Enter Action Details"
              v-model="failureActionRecordList.action_details"
            />
          </div>
        </div>
        <div class="input-wrapper">
          <span>Discipline</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.discipline"
              value-expr="id"
              display-expr="discipline"
              placeholder="Select Discipline"
              v-model="failureActionRecordList.id_discipline"
              :search-enabled="true"
            />
          </div>
        </div>
        <div class="input-wrapper">
          <span>Action Date</span>
          <div class="select">
            <DxDateBox
              type="date"
              placeholder="Select Action Date"
              v-model="failureActionRecordList.action_date"
              display-format="dd MMM yyyy"
            />
          </div>
        </div>
        <div class="input-wrapper">
          <span>Failure Action Status</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.failureactionStatus"
              value-expr="id"
              display-expr="status"
              placeholder="Select Failure Action Status"
              v-model="failureActionRecordList.id_failure_action_status"
              :search-enabled="true"
            />
          </div>
        </div>
        <h4 style="grid-column: span 4">SAP Notification Header</h4>
        <div class="input-wrapper">
          <span>WO Order No.</span>
          <div class="select">
            <DxTextBox
              placeholder="Generate by SAP"
              v-model="sapHeader.wo_order_no"
              :disabled="true"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Notification Type</span>
          <div class="select">
            <DxTextBox
              placeholder="Enter Notification Type"
              v-model="sapHeader.notification_type"
              :disabled="true"
            />
          </div>
        </div>

        <div class="input-wrapper" style="grid-column: span 2;">
          <span>Description</span>
          <div class="select">
            <DxTextBox
              placeholder="Description (Maximum 40 characters)"
              v-model="sapHeader.description"
              max-length="40"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Functional Location</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.functionalLocation"
              value-expr="functional_location"
              display-expr="functional_location"
              placeholder="Select Functional Location"
              v-model="sapHeader.functional_location"
              :search-enabled="true"
            />
          </div>
        </div>

        <!-- <div class="input-wrapper">
          <span>Equipment No.</span>
          <div class="select">
            <DxTextBox
              placeholder="Blank"
              v-model="sapHeader.equipment_no"
              :disabled="true"
            />
          </div>
        </div> -->

        <div class="input-wrapper">
          <span>Planner Grp</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.plannerGrp"
              value-expr="code"
              display-expr="code"
              placeholder="Select Planner Grp"
              v-model="sapHeader.planner_grp"
              :search-enabled="true"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Planner Grp Planning Plant</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.plannerGrpPlanning"
              value-expr="code"
              display-expr="code"
              placeholder="Select Planner Grp Planning Plant"
              v-model="sapHeader.planner_grp_planning_plant"
              :search-enabled="true"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Main WorkCtr</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.mainWorkCtr"
              value-expr="code"
              display-expr="code"
              placeholder="Select Main WorkCtr"
              v-model="sapHeader.main_workctr"
              :search-enabled="true"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Code Grp Object Part</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.codegrpObjectpart"
              value-expr="object_part_code"
              display-expr="object_part_code"
              placeholder="Select Code Grp Object Part"
              v-model="sapHeader.code_grp_object_part"
              :search-enabled="true"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Object Part Code</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.objectpartCode"
              value-expr="object_part_code"
              display-expr="ddl"
              placeholder="Select Object Part Code"
              v-model="sapHeader.object_part_code"
              :search-enabled="true"
            />
          </div>
        </div>
        <div class="input-wrapper">
          <span>Code Grp Damage</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.codegrpDamage"
              value-expr="code"
              display-expr="code"
              placeholder="Select Code Grp Damage"
              v-model="sapHeader.code_grp_damage"
              :search-enabled="true"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Damage Code</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.damageCode"
              value-expr="damage_code"
              display-expr="ddl"
              placeholder="Select Damage Code"
              v-model="sapHeader.damage_code"
              :search-enabled="true"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Damage Free Text</span>
          <div class="select">
            <DxTextBox
              placeholder="Enter Damage Free text"
              v-model="sapHeader.damage_free_text"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Code Grp Cause</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.codegrpCause"
              value-expr="cause_code"
              display-expr="cause_code"
              placeholder="Select Code Grp Cause"
              v-model="sapHeader.code_grp_cause"
              :search-enabled="true"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Cause Code</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.causeCode"
              value-expr="cause_code"
              display-expr="ddl"
              placeholder="Select Cause Code"
              v-model="sapHeader.cause_code"
              :search-enabled="true"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Cause Grp Free Text</span>
          <div class="select">
            <DxTextBox
              placeholder="Enter Cause Grp Free Text"
              v-model="sapHeader.cause_grp_free_text"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Required Start Date</span>
          <div class="select">
            <DxDateBox
              type="date"
              placeholder="Select Required Start Date"
              v-model="sapHeader.required_start_date"
              display-format="dd MMM yyyy"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Required Start Time</span>
          <div class="select">
            <DxDateBox
              type="time"
              placeholder="Select Required Start Time"
              v-model="sapHeader.required_start_time"
              display-format="HH:mm"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Required End Date</span>
          <div class="select">
            <DxDateBox
              type="date"
              placeholder="Select Required End date"
              v-model="sapHeader.required_end_date"
              display-format="dd MMM yyyy"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Required End Time</span>
          <div class="select">
            <DxDateBox
              type="time"
              placeholder="Select Required End Time"
              v-model="sapHeader.required_end_time"
              display-format="HH:mm"
            />
          </div>
        </div>
        
        <div class="input-wrapper">
          <span>Addtional Data</span>
          <div class="select">
            <DxTextBox
              placeholder="Enter Addtional Data"
              v-model="sapHeader.additional_data"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Accessibility</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.accessibility"
              value-expr="code"
              display-expr="description"
              placeholder="Select Accessibility"
              v-model="sapHeader.accessibility"
              :search-enabled="true"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <span>Scaffolding Requirement</span>
          <div class="select">
            <DxSelectBox
              :items="formSelect.scaffoldingReq"
              value-expr="code"
              display-expr="code"
              placeholder="Select Scaffolding Requirement"
              v-model="sapHeader.scaffolding_requirement"
              :search-enabled="true"
            />
          </div>
        </div>
        <div></div>
        <div></div>

        <div class="action-container" style="grid-column: span 4">
          <button class="submit" @click="UPDATE_RECORD">Submit</button>
          <button @click="$emit('popup', 0)">Cancel</button>
        </div>
      
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
  name: "edit-short-term",
  props: {
    id_record: Number,
  },
  components: {
    DxSelectBox,
    DxTextBox,
    DxDateBox,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "FR NUMBER: ",
      subpageInnerName: null,
    });
    this.FETCH_FAILURE_ACTION_STATUS();
    this.FETCH_DISCIPLINE();
    this.FETCH_STATUS();
    this.FETCH_FUNC_LOCATION();
    this.FETCH_PLANNER_GRP();
    this.FETCH_PLANNER_GRP_PLANNING_PLANT();
    this.FETCH_MAIN_WORK_CTR();
    this.FETCH_CODE_GROUP_OBJECT_PART();
    this.FETCH_OBJECT_PART_CODE();
    this.FETCH_CODE_GRP_DAMAGE();
    this.FETCH_DAMAGE_CODE();
    this.FETCH_CODE_GRP_CAUSE();
    this.FETCH_CAUSE_CODE();
    this.FETCH_ACCESSIBILITY();
    this.FETCH_SCAFFOLDING_REQ();
    this.FETCH_FAILURE_ACTION_RECORD();
  },
  data() {
    return {
      failureActionRecordList: {},
      formSelect: {
        failureactionStatus: [],
        discipline: [],
        status: [],
        functionalLocation: [],
        plannerGrp: [],
        plannerGrpPlanning: [],
        mainWorkCtr: [],
        codegrpObjectpart: [],
        objectpartCode: [],
        codegrpDamage: [],
        damageCode: [],
        codegrpCause: [],
        causeCode: [],
        causeGrp: [],
        accessibility: [],
        scaffoldingReq: [],
      },
      sapHeader: {
        required_start_date: '',
        required_start_time: null,
        required_end_date: '',
        required_end_time: null,
      }
    };
  },
  computed: {},
  methods: {
    FETCH_FAILURE_ACTION_RECORD() {
      console.log(this.id_record);
      this.isLoading = true;
      axios({
        method: "get",
        url: "/FailureActionRecord/" + this.id_record,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          console.log('FailureActionRecord', res);
          if (res.status == 200 && res.data) {
            this.failureActionRecordList = res.data;
            axios({
              method: "get",
              url: "/SapHeader/get-sap-header-by-module-from-module?id_module=2&id_from_module=" + this.id_record,
              headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
              }
            })
              .then(res => {
                console.log('SapHeader', res);
                this.sapHeader = res.data[0];
                if(this.sapHeader.required_end_date) {
                  const y = this.sapHeader.required_end_date.substring(0, 4);
                  const m = this.sapHeader.required_end_date.substring(4, 6) - 1;
                  const d = this.sapHeader.required_end_date.substring(6, 8);
                  this.sapHeader.required_end_date = new Date(y, m, d);
                }
                if(this.sapHeader.required_start_date) {
                  const y = this.sapHeader.required_start_date.substring(0, 4);
                  const m = this.sapHeader.required_start_date.substring(4, 6) - 1;
                  const d = this.sapHeader.required_start_date.substring(6, 8);
                  this.sapHeader.required_start_date = new Date(y, m, d);
                }
                if(this.sapHeader.required_start_time) {
                  this.sapHeader.required_start_time = moment(this.sapHeader.required_start_time, ["HHmmss"]).format("lll");
                  console.log(this.sapHeader.required_start_time);
                }
                if(this.sapHeader.required_end_time) {
                  this.sapHeader.required_end_time = moment(this.sapHeader.required_end_time, ["HHmmss"]).format("lll");
                  console.log(this.sapHeader.required_end_time);
                }
              })
              .catch(error => {
                console.log(error);
              })
              .finally(() => {
                this.isLoading = false;
              });
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_FAILURE_ACTION_STATUS() {
      axios({
        method: "get",
        url: "/Md/get-md-failure-action-status-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.failureactionStatus = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_DISCIPLINE() {
      axios({
        method: "get",
        url: "/Md/get-md-failure-discipline-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.discipline = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_STATUS() {
      axios({
        method: "get",
        url: "/Md/get-md-failure-action-status-list",
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
    FETCH_FUNC_LOCATION() {
      axios({
        method: "get",
        url: "/Md/get-md-sap-functional-location-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.functionalLocation = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_PLANNER_GRP() {
      axios({
        method: "get",
        url: "/Md/get-md-sap-planner-grp-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.plannerGrp = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_PLANNER_GRP_PLANNING_PLANT() {
      axios({
        method: "get",
        url: "/Md/get-md-sap-planner-grp-planning-plant-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.plannerGrpPlanning = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_MAIN_WORK_CTR() {
      axios({
        method: "get",
        url: "/Md/get-md-sap-main-work-ctr-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.mainWorkCtr = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_OBJECT_PART_CODE() {
      axios({
        method: "get",
        url: "/Md/get-md-sap-object-part-code-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.objectpartCode = res.data;
            for(let i = 0; i < this.formSelect.objectpartCode.length; i++) {
              this.formSelect.objectpartCode[i].ddl = this.formSelect.objectpartCode[i].object_part_code + "-" + this.formSelect.objectpartCode[i].object_part_text
            }
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CODE_GROUP_OBJECT_PART() {
      axios({
        method: "get",
        url: "/Md/get-md-sap-code-grp-object-part-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.codegrpObjectpart = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CODE_GRP_DAMAGE() {
      axios({
        method: "get",
        url: "/Md/get-md-sap-code-grp-damage-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.codegrpDamage = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_DAMAGE_CODE() {
      axios({
        method: "get",
        url: "/Md/get-md-sap-damage-code-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.damageCode = res.data;
            for(let i = 0; i < this.formSelect.damageCode.length; i++) {
              this.formSelect.damageCode[i].ddl = this.formSelect.damageCode[i].damage_code + "-" + this.formSelect.damageCode[i].damage_code_text
            }
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CODE_GRP_CAUSE() {
      axios({
        method: "get",
        url: "/Md/get-md-sap-code-grp-cause-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.codegrpCause = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CAUSE_CODE() {
      axios({
        method: "get",
        url: "/Md/get-md-sap-cause-code-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.causeCode = res.data;
            for(let i = 0; i < this.formSelect.causeCode.length; i++) {
              this.formSelect.causeCode[i].ddl = this.formSelect.causeCode[i].cause_code + "-" + this.formSelect.causeCode[i].cause_text
            }
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_ACCESSIBILITY() {
      axios({
        method: "get",
        url: "/Md/get-md-sap-accessibility-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.accessibility = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_SCAFFOLDING_REQ() {
      axios({
        method: "get",
        url: "/Md/get-md-sap-scaffolding-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.formSelect.scaffoldingReq = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_RECORD() {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log('failureActionRecordList', this.failureActionRecordList);
      console.log('sapHeader', this.sapHeader);
      // must to check required field.
      this.failureActionRecordList.action_date = this.failureActionRecordList.action_date ? moment(this.failureActionRecordList.action_date).format("L") : '';
      this.failureActionRecordList.updated_by = user.id;
      axios({
        method: "put",
        url: "/FailureActionRecord/" + this.failureActionRecordList.id,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: this.failureActionRecordList
      })
        .then(res => {
          console.log('FailureActionRecordRes',res);
          if (res.status == 204) {
            this.sapHeader.required_start_date = this.sapHeader.required_start_date ? moment(this.sapHeader.required_start_date).format("YYYYMMDD") : '';
            this.sapHeader.required_end_date = this.sapHeader.required_end_date ? moment(this.sapHeader.required_end_date).format("YYYYMMDD") : '';
            this.sapHeader.required_start_time = this.sapHeader.required_start_time ? moment(this.sapHeader.required_start_time).format("HHmmss") : '';
            this.sapHeader.required_end_time = this.sapHeader.required_end_time ? moment(this.sapHeader.required_end_time).format("HHmmss") : '';
            this.sapHeader.updated_by = user.id;
            axios({
              method: "put",
              url: "/SapHeader/" + this.sapHeader.id,
              headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
              },
              data: this.sapHeader
            }) 
            .then(res => {
              console.log('SapHeaderRes', res);
              this.$emit('popup');
            })
            .catch(error => {
              this.$ons.notification.alert(
                error.code + " " + error.response.status + " " + error.message
              );
            })
            .finally(() => {});
          }
        })
        .catch(error => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
    DELETE_RECORD() {
      axios({
        method: "delete",
        url: "/FailureActionRecord/delete-failure-action-record?id=" + this.failureActionRecordList.id,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          if (res.status == 204) {
            this.SET_CURRENT_VIEW(2);
          }
        })
        .catch(error => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
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
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;

  h4 {
    padding: 0;
    margin: 0;
  }
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
    
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
  .submit {
    color: white;
    background-color: $web-theme-color-secondary;
  }
  .action-container{
    display: flex;
    justify-content: center;
    gap: 5px;
    
    button{
      width: 50%;
    }
  }
}
</style>