<template>
  <div>
    <ViewFR v-if="current_view == 0" @currentView="(view, data) => SET_EDIT(view, data)" />
    <AddFR :fieldData="fieldData" v-if="current_view == 1" @currentView="(view) => current_view = view" />
  </div>
</template> 

<script>

//Structures
import ViewFR from "./View.vue"
import AddFR from "./Add.vue"

export default {
  name: "inspection-record",
  components: {
    ViewFR,
    AddFR,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "INSPECTION",
      subpageInnerName: null,
    });
  },
  data() {
    return {
      current_view: 0,
      fieldData: null
    };
  },
  computed: {},
  methods: {
    SET_EDIT(view, data) {
      this.current_view = view;
      this.fieldData = data;
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
}

.page-section {
  padding: 20px;
  overflow-y: auto;
  grid-row: span 2;
}

.page-section:last-child {
  padding-bottom: 20px;
}
</style>