<template>
  <div class="page-container">
      <div class="page-section">
          <h1>Dashboard</h1>
      </div>
  </div>
</template>

<script>
// import { axios } from "/axios.js";
// import moment from "moment";
import "devextreme/dist/css/dx.light.css";
export default {
  name: "ex-dashboard",
  components: {
  },
  created() {
      this.$store.commit("UPDATE_CURRENT_PAGENAME", {
          subpageName: "DASHBOARD",
          subpageInnerName: null,
      });
      // if (this.$store.state.status.server == true) {
      // }
  },
  data() {
      return {
      };
  },
  computed: {},
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.page-section {
  padding: 20px;
}

.page-section:last-child {
  padding-bottom: 20px;
}
</style>