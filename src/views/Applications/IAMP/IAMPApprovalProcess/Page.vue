<template>
  <div>
    <ViewFR v-if="current_view == 0" @currentView="(view, row) => SET_EDIT(view, row)" />
  </div>
</template> 

<script>

//Structures
import ViewFR from "./View.vue"

export default {
  name: "inspection-record",
  components: {
    ViewFR,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "FAILURE REPORT",
      subpageInnerName: null,
    });
  },
  data() {
    return {
      current_view: 0,
      edit_row: 0
    };
  },
  computed: {},
  methods: {
    SET_EDIT(view, row) {
      this.current_view = view;
      if (row) this.edit_row = row;
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