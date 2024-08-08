<template>
  <div id="page-login" class="page-body">
    <div class="login-panel" v-if="!isLoading">
      <img class="app-background" src="/img/banner.png" alt="app background image">
      
      <div class="form-login">
        <img class="app-logo" :src="appIcon" alt="app icon" />

        <div class="app-description">
          <h2>CPOC AIMS</h2>
          <h1>ASSETS INTEGRITY MANAGEMENT SYSTEM</h1>
          <h3>CARIGALI-PTTEPI Operating Company Sdn. Bhd.</h3>
        </div>

        <input
            v-if="currentSignIn === 2"
            class="user"
            type="text"
            placeholder="Username"
            v-model="formData.username"
        />
        <input
            v-if="currentSignIn === 2"
            class="password"
            type="password"
            placeholder="Password"
            v-model="formData.password"
        />

        <button v-if="currentSignIn === 2" class="signin" v-on:click="SIGN_IN_VENDOR()">Sign In</button>
        <button v-if="currentSignIn === 1" @click="SIGN_IN" class="microsoft">
          <img src="/img/microsoft.svg" alt="microsoft">
          Login with Microsoft
        </button>
        <div class="separator">
          <hr>
          <span>OR</span>
          <hr>
        </div>
        <span class="signin-method" v-on:click="SIGN_IN_METHOD()">Sign in as {{ currentSignIn === 1 ? 'Vendor' : 'CPOC' }}</span>

        <!-- <span @click="$router.push('/forgot-password')" class="forgotPassword">Forgot Password?</span> -->

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
import { axios, POST_DATA } from "/axios.js";
import { signIn } from "/authService.js"

//UI
import ViewLayout from "@/layouts/non-sidebar-layout.vue";
import PageLoading from "@/components/app-structures/app-loading.vue";

export default {
  name: "Login-View",
  components: { PageLoading },
  data() {
    return {
      appIcon: this.$store.state.appIcon,
      isLoggedIn: localStorage.getItem("user"),
      isLoading: false,
      currentSignIn: 1,
      formData: {
        username: "",
        password: "",
        name: "",
        uniqueId: ""
      }
    };
  },
  created() {
    this.$emit(`update:layout`, ViewLayout);
    this.$store.commit("CLEAR_CURRENT_INAPP");
    if (this.isLoggedIn) this.$router.push("/");
  },
  methods: {
    async FETCH_USER_ID(uniqueId, accessToken) {
        axios({
          method: "get",
          url: `https://graph.microsoft.com/v1.0/users?$filter=identities/any(c:c/issuerAssignedId eq '${uniqueId}')&$select=id`,
          headers: {
                Authorization: `Bearer ${accessToken}`
            },
          data: {}
        })
          .then(res => {
            return res.data.value[0].id;
          })
          .catch(error => {
            console.log(error);
          })
        
    },
    async FETCH_USER_PHOTO(uniqueId, accessToken) {
      const userId = await this.FETCH_USER_ID(uniqueId, accessToken);
        axios({
          method: "get",
          url: `https://graph.microsoft.com/v1.0/users/${userId}/photo/$value`,
          headers: {
            responseType: 'arraybuffer'
          },
          data: {}
        })
          .then(res => {
            return res.data;
            // const imageUrl = URL.createObjectURL(new Blob([res.data]));
          })
          .catch(error => {
            console.log(error);
          })
    },
    SIGN_IN_VENDOR() {
      let data = {
        username: this.formData.username,
        password: this.formData.password
      }
      POST_DATA('/User/loginByVendor', data, (e) => {
        localStorage.setItem("user", JSON.stringify(e.user));
        localStorage.setItem("token", JSON.stringify(e.token));
        this.$router.push("/");
      });
    },
    SIGN_IN_GUEST() {
      const name = 'GUEST';
      const username = 'guest@dexon-technology.com';
      const uniqueId = '51fca672-f9b4-49b3-8100-c414ec703509';
      const img = '';
      axios({
          method: "post",
          url: "/User/login",
          data: { name, username, uniqueId, img }
        })
          .then(res => {
            if (res.data.user && res.data.token) {
              localStorage.setItem("user", JSON.stringify(res.data.user));
              localStorage.setItem("token", JSON.stringify(res.data.token));
              console.log("==> SIGNED IN USER: ");
              console.log(res.data.user);
              this.$router.push("/");
            }
          })
          .catch(error => {
            if (error.response) {
              if (error.response.data) {
                this.$ons.notification.alert(error.response.data.message);
              }
              if (error.response.status == 0) {
                this.$ons.notification.alert(
                  "Cannot connect to a server.<br/> Please try again later."
                );
              }
            } else {
              console.log(error);
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
    },
    async SIGN_IN() {
      try {
        const authResult = await signIn();
        // const img = this.FETCH_USER_PHOTO(authResult.uniqueId, authResult.accessToken);
        console.log("authResult", authResult);
        var name = authResult.account.name;
        var username = authResult.account.username;
        var uniqueId = authResult.uniqueId;

        console.log("login", name, username, uniqueId);

        axios({
          method: "post",
          url: "/User/login",
          data: { name, username, uniqueId }
        })
          .then(res => {
            if (res.data.user && res.data.token) {
              localStorage.setItem("user", JSON.stringify(res.data.user));
              localStorage.setItem("token", JSON.stringify(res.data.token));
              console.log("==> SIGNED IN USER: ");
              console.log(res.data.user);
              this.$router.push("/");
            }
          })
          .catch(error => {
            if (error.response) {
              if (error.response.data) {
                this.$ons.notification.alert(error.response.data.message);
              }
              if (error.response.status == 0) {
                this.$ons.notification.alert(
                  "Cannot connect to a server.<br/> Please try again later."
                );
              }
            } else {
              console.log(error);
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
        // console.log("authResult", authResult);
      } catch (error) {
          console.error('Sign-in error:', error);
      }
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
    },
    SIGN_IN_METHOD() {
      if (this.currentSignIn === 1) this.currentSignIn = 2;
      else if (this.currentSignIn === 2) this.currentSignIn = 1;
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
    .app-logo {
      margin-top: 15vh;
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
      padding: 15px 30px;
      // background-color: #F9F9F9;
      border: solid 1px #adadad;
      border-radius: 10px;
    }
    input::placeholder {
      color: #BCBCBC;
    }
    button {
      width: 100%;
      padding: 12px 0;
      border: none;
      color: white;
      border-radius: 5px;
      font-weight: 800;
      cursor: pointer;
    }
    .signin {
      background-image: linear-gradient(to right, #1A0D7F, #3F2DCA);
    }
    .separator {
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 5px;
      align-items: center;

      hr {
        flex: 1;
        background-color: #000000;
        height: 1px;
      }
      span {
        font-size: 14px;
      }
    }
    .signin-method {
      color: #000;
      font-size: 15px;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: rgb(0, 132, 255);
        text-decoration: underline;
      }
    }
    .microsoft {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      background-image: linear-gradient(to right, #000000, #737373);
    }
    .forgotPassword {
      text-decoration: underline;
      font-size: 13px;
      align-self: flex-start;
      cursor: pointer;
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