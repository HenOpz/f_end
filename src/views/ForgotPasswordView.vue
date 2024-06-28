<template>
  <div id="page-login" class="page-body">
    <div class="login-panel" v-if="!isLoading">
      <img class="app-background" src="/img/banner.png" alt="app background image">
      
      <div class="form-login">
        <v-ons-toolbar-button v-on:click="$router.go(-1)">
          <i class="las la-angle-left"></i>
          <span>Back</span>
        </v-ons-toolbar-button>

        <img class="app-logo" :src="appIcon" alt="app icon" />

        <div class="app-description">
          <h2>CPOC IMS</h2>
          <h1>INSPECTION & MAINTENANCE SYSTEM</h1>
          <h3>CARIGALI-PTTEPI Operating Company Sdn. Bhd.</h3>
        </div>

        <span class="EnterEmail">Enter the email address associated with your account and we'll send you a link to reset your password.</span>

        <input
            type="email"
            placeholder="Email"
            v-model="formData.username"
            v-on:keyup.enter="SIGN_IN()"
        />

        <button>Continue</button>

        <div class="footer">
          <span>2024 Ⓒ Designed and developed by</span>
          <img src="/img/dexon.svg" alt="dexon">
        </div>
      </div>
    </div>

    <PageLoading v-if="isLoading == true" text="Logging In" />
  </div>
</template>

<script>
//API
//import axios from "/axios.js";

//UI
import ViewLayout from "@/layouts/non-sidebar-layout.vue";
import PageLoading from "@/components/app-structures/app-loading.vue";

export default {
  name: "Forgot-Password-View",
  components: { PageLoading },
  data() {
    return {
      appIcon: this.$store.state.appIcon,
      isLoggedIn: localStorage.getItem("user"),
      isLoading: false,
      formData: {
        username: "",
        password: ""
      }
    };
  },
  created() {
    this.$emit(`update:layout`, ViewLayout);
    this.$store.commit("CLEAR_CURRENT_INAPP");
    if (this.isLoggedIn) this.$router.push("/");
  },
  methods: {
    SIGN_IN() {
      this.$router.push("/");
      // if (this.formData.username) {
      //   if (this.formData.password) {
      //     this.isLoading = true;
      //     setTimeout(() => {
      //       var password = this.formData.password;
      //       var username = this.formData.username.toLowerCase();

      //       axios({
      //         method: "post",
      //         url: "/UserAccount/login",
      //         data: { username, password }
      //       })
      //         .then(res => {
      //           if (res.data.user && res.data.token) {
      //             localStorage.setItem("user", JSON.stringify(res.data.user));
      //             localStorage.setItem("token", JSON.stringify(res.data.token));
      //             console.log("==> SIGNED IN USER: ");
      //             console.log(res.data.user);
      //             this.$router.push("/");
      //           }
      //         })
      //         .catch(error => {
      //           if (error.response) {
      //             if (error.response.data) {
      //               this.$ons.notification.alert(error.response.data.message);
      //             }
      //             if (error.response.status == 0) {
      //               this.$ons.notification.alert(
      //                 "Cannot connect to a server.<br/> Please try again later."
      //               );
      //             }
      //           } else {
      //             console.log(error);
      //           }
      //         })
      //         .finally(() => {
      //           this.isLoading = false;
      //         });
      //     }, 500);
      //   } else {
      //     this.$ons.notification.alert('"Password" cannot be empty');
      //   }
      // } else {
      //   this.$ons.notification.alert('"Username" cannot be empty');
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

#page-login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.page-container {
  position: relative;
  height: 100%;
}
.login-panel {
  display: grid;
  grid-template-columns: 60% 40%;
  .app-background {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .form-login {
    background-color: white;
    height: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 35px 0 35px;
    gap: 20px;
    .toolbar-button {
      background-color: $web-theme-color-background;
      padding: 0;
      margin-top: 20px;
      padding-right: 15px;
      height: 34px;
      border: 0px;
      align-self: flex-start;

      i {
        font-size: 18px;
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
    .app-logo {
      margin-top: 10vh;
      width: 80px;
      height: 80px;
      align-self: flex-start;
    }
    .app-description {
      margin-top: 10px;
      align-self: flex-start;
      h2 {
        color: #1D9531;
        font-size: 16px;
        margin: 0;
      }
      h1 {
        font-size: 20px;
        font-weight: 800;
        margin: 0;
      }
      h3 {
        font-size: 14px;
        font-weight: 500;
        margin: 0;
        margin-top: 3px;
      }
    }
    input {
      width: calc(100% - 60px);
      padding: 10px 30px;
      background-color: #F9F9F9;
      border: none;
      margin-top: 15px;
      border-radius: 5px;
      box-shadow: inset 0 2px 0 #E9E9E9;
    }
    input::placeholder {
      color: #BCBCBC;
    }
    .EnterEmail {
      margin-top: 60px;
      font-size: 12px;
    }
    button {
      width: 100%;
      padding: 12px 0;
      border: none;
      color: white;
      border-radius: 5px;
      font-weight: 800;
      background-image: linear-gradient(to right, #1A0D7F, #3F2DCA);
    }
    .footer {
      display: flex;
      align-items: center;
      gap: 10px;
      position: fixed;
      bottom: 20px;
      font-size: 10px;
      img {
        width: 100px;
        height: auto;
      }
    }
  }
}
</style>