<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <!-- <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Sign in with</small>
          </div>
          <div class="btn-wrapper text-center">
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="img/icons/common/github.svg"
              /></span>
              <span class="btn-inner--text">Github</span>
            </a>
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="img/icons/common/google.svg"
              /></span>
              <span class="btn-inner--text">Google</span>
            </a>
          </div>
        </div> -->
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <h1>Login</h1>
          </div>
          <form role="form">
            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="model.email"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            >
            </base-input>

            <base-checkbox class="custom-control-alternative">
              <span class="text-muted">Remember me</span>
            </base-checkbox>
            <div class="text-center">
              <el-button
                :loading="loading"
                type="primary"
                class="my-4"
                @click="handleLogin"
                >Sign in
              </el-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light"><small>Forgot password?</small></a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light"
            ><small>Create new account</small></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import useUser from "../models/users";
import VueCookies from "vue-cookies";
import Api from "../models/api";
export default {
  name: "login",
  data() {
    return {
      model: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      Api.post("/users/login-user", this.model)
        .then((res) => {
          VueCookies.set("token", res.data.token, "1h");
          VueCookies.set("refreshToken", res.data.refreshToken, "7 days");
          this.$router.push({ path: "/" });

          this.loading = false;
        })
        .catch((err) => {
          this.$notify({
            title: "error",
            message: err.toString(),
          });
          this.loading = false;
        });
    },
  },
};
</script>
<style></style>
