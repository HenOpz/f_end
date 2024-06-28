<template>
  <div id="app-toolbar">
    <div class="left-col">
      <h1>{{ pageName }}</h1>
      <h2>{{ pageSubName }}</h2>
      <div class="sub-page-box" v-if="pageSubInnerName">
        <div class="btn-group-separater-client">
          <i class="las la-angle-right"></i>
        </div>
        <h2>{{ pageSubInnerName }}</h2>
      </div>
    </div>
    
  </div>
</template>

<script>
// import moment from "moment";
// import { axios } from "/axios.js";
// import vSelect from "vue-select";

export default {
  name: "app-toolbar",
  components: {
    // popupEdit,
    // popupAdd,
    // vSelect
  },
  props: {
    pageName: String,
    pageSubName: String,
    pageSubInnerName: String,
    isBack: Boolean,
    isBack_specificPath: String,
    isBackPath: Boolean,
    isEdit: Boolean,
    isSave: Boolean,
    isDelete: Boolean,
    isPrint: Boolean,
    isDownload: Boolean,
    isNewBtn: Boolean,
    isRefresh: Boolean,
    isMoreBtn: Boolean,
    newBtnLabel: String,
    options: Array
  },
  data() {
    return {
      searchKeyword: "",
      isEditPopup: false,
      isAdd: false,
      selectedOption: null,

      //POPUP
      popoverVisible: false,
      popoverTarget: null,
      popoverDirection: "up",
      coverTarget: false
    };
  },
  methods: {
    GO_BACK_TO() {
      this.$router.push(this.isBack_specificPath);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

#app-toolbar {
  width: 100%;
  height: 50px;
  background: #fff;
  border: 1px solid #e6e6e6;
  border-width: 0 0 1px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-col,
  .right-col {
    display: flex;

    align-items: center;
  }
  .left-col {
    padding-left: 20px;
    justify-content: flex-start;
    width: fit-content;
    position: relative;
    h1,
    h2 {
      font-style: normal;
      font-weight: 600;
      line-height: 29px;
      letter-spacing: -0.08px;
      margin: 0;

      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      user-select: text;
    }
    h1 {
      font-size: 2.75em;
      color: $web-font-color-blue;
    }
    h2 {
      font-size: 2em;
      color: $web-font-color-black;
      width: auto;
    }
    .toolbar-button {
      margin-left: 0;
      margin-right: 20px;
    }
    @media screen and (max-width: 1024px) {
      h1 {
        font-size: 2.5em;
      }
      h2 {
        font-size: 2em;
      }
    }
  }
  .right-col {
    padding-right: 20px;
    justify-content: flex-end;
    .toolbar-button {
      margin-right: 10px;
      i {
        font-size: 20px;
      }
    }
    .toolbar-button:last-child {
      margin-right: 0;
    }
    .btn-group-separater {
      height: 28px;
      width: 1px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-width: 0 1px 0 0;
      margin-right: 10px;
    }
  }
}

.toolbar-button {
  background-color: $web-theme-color-background;
  padding: 0;
  padding-right: 15px;
  height: 34px;
  border: 0px;

  i {
    font-size: 20px;
    color: $dexon-primary-blue;
  }
  span {
    font-size: 12px;
    font-weight: 500;
    color: $web-font-color-black;
  }
}
.toolbar-button:hover,
.toolbar-button:active {
  background-color: $web-theme-color-secondary;

  i {
    color: $web-font-color-white;
  }
  span {
    color: $web-font-color-white;
  }
}

.highlight-btn {
  background-color: $dexon-primary-blue !important;
  width: 150px;
  span,
  i {
    color: #fff;
  }
}
.highlight-btn:hover {
  opacity: 0.8;
}

.highlight-btn:active {
  opacity: 1;
}

.toolbar-info {
  padding-left: 40px;
  display: flex;
  .info-item {
    display: block;
    width: fit-content;
    padding-right: 25px;

    .desc,
    .value {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
      cursor: text;
    }
    .desc {
      color: $web-font-color-grey;
      font-size: 10px;
    }
    .value {
      color: $web-font-color-black;
      font-weight: 600;
      font-size: 12px;
    }
    .integrity-status {
      padding: 3px;
      text-align: center;
      color: white !important;
      text-transform: uppercase;
      font-size: 10px;
    }
  }
}

.search-box {
  width: 180px;
  height: 34px;
  position: relative;
  margin-right: 10px;
  i {
    font-size: 14px;
    color: #5b5b5b;
  }
  input {
    width: 100%;
    height: 32px;
    padding: 0;
    margin: 0;
    border: 1px solid #e6e6e6;
    border-radius: 6px;
    cursor: text;
    font-size: 14px;
    text-indent: 30px;
    color: $web-font-color-black;
    font-weight: 500;
  }
  .search {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    cursor: text;
  }
  .clear {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
    cursor: pointer;
    padding: 10px;
  }
}

.search-box:last-child {
  margin-right: 0px;
}

.popover-button {
  padding: 6px 5px 6px 18px;
  border: 1px solid #e6e6e6;
  border-width: 0 0 1px 0;
  background-color: #fff;

  i {
    font-size: 20px;
    width: 20px;
    text-align: center;
    color: $dexon-primary-blue;
  }
  span {
    font-size: 14px;
    color: $dexon-primary-blue;
    font-weight: 400;
  }
}
.popover-button:hover {
  background-color: #140a4b12;

  i,
  span {
    color: $dexon-primary-blue;
  }
}

.popover-button:last-child {
  border: 0;
}

.sub-page-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .btn-group-separater-client {
    margin: 0 4px;
    i {
      font-size: 22px;
      color: rgba(0, 0, 0, 0.1);
    }
  }
}
@media (max-width: 992px) {
  #v-search {
    display: none;
  }
}
.custom-select {
  font-size: 14px;
  color: #5b5b5b;
}
</style>