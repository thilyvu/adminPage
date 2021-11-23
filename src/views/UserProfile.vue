<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="
        min-height: 400px;
        background-image: url(img/theme/profile-cover.jpg);
        background-size: cover;
        background-position: center top;
      "
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg col-md-16" style="display: grid">
            <h1 class="display-2 text-white">Hello {{ this.model.name }}</h1>
            <!-- <p class="text-white mt-0 mb-5">
              This is your profile page. You can see the progress you've made
              with your work and manage your projects or assigned tasks
            </p> -->
            <!-- <a href="#!" class="btn btn-info">Edit profile</a> -->
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
          <div class="card card-profile shadow">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img :src="this.model.avatar" class="rounded-circle" />
                  </a>
                </div>
              </div>
            </div>
            <div
              class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
            >
              <div class="d-flex justify-content-between">
                <base-button size="sm" type="info" class="mr-4"
                  >Connect</base-button
                >
                <base-button size="sm" type="default" class="float-right"
                  >Message</base-button
                >
              </div>
            </div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                `
                <div class="col">
                  <div
                    class="card-profile-stats d-flex justify-content-center mt-md-5"
                  >
                    <div>
                      <span class="heading">22</span>
                      <span class="description">Class</span>
                    </div>
                    <div>
                      <span class="heading">100</span>
                      <span class="description">Students</span>
                    </div>
                    <div>
                      <span class="heading">891</span>
                      <span class="description">Lectures</span>
                    </div>
                  </div>
                </div>
                `
              </div>
              <div class="text-center">
                <h3>
                  {{ this.model.name
                  }}<span class="font-weight-light"
                    >, {{ getAge(this.model.dob) }}</span
                  >
                </h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>{{ this.model.province }}
                </div>
                <!-- <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Solution Manager
                  - Creative Tim Officer
                </div>
                <div>
                  <i class="ni education_hat mr-2"></i>University of Computer
                  Science
                </div>
                <hr class="my-4" />
                <p>
                  Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick
                  Murphy — writes, performs and records all of his own music.
                </p>
                <a href="#">Show more</a> -->
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-8 order-xl-1">
          <card shadow type="secondary">
            <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">My account</h3>
                  </div>
                  <!-- <div class="col-4 text-right">
                    <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                  </div> -->
                </div>
              </div>
            </template>

            <form>
              <h6 class="heading-small text-muted mb-4">User information</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Username"
                      placeholder="Username"
                      input-classes="form-control-alternative"
                      v-model="model.username"
                    />
                  </div>
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Email address"
                      placeholder="jesse@example.com"
                      input-classes="form-control-alternative"
                      v-model="model.email"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Full name"
                      placeholder="Full name"
                      input-classes="form-control-alternative"
                      v-model="model.name"
                    />
                  </div>
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Role"
                      placeholder="Role"
                      input-classes="form-control-alternative"
                      v-model="model.role"
                    />
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <!-- Address -->
              <h6 class="heading-small text-muted mb-4">More Info</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      alternative=""
                      label="School"
                      placeholder="School"
                      input-classes="form-control-alternative"
                      v-model="model.school"
                    />
                  </div>
                  <div class="col-md-6">
                    <!-- <base-input
                      alternative=""
                      label="Date of birth  "
                      placeholder="Date of birth"
                      input-classes="form-control-alternative"
                      v-model="model.school"
                    /> -->
                    <base-input
                      alternative=""
                      label="Gender"
                      placeholder="Gender"
                      input-classes="form-control-alternative"
                      v-model="model.gender"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    <base-input
                      alternative=""
                      label="Province"
                      placeholder="Province"
                      input-classes="form-control-alternative"
                      v-model="model.province"
                    />
                  </div>
                  <div class="col-lg-4">
                    <base-input
                      alternative=""
                      label="Phone"
                      placeholder="phone"
                      input-classes="form-control-alternative"
                      v-model="model.phone"
                    />
                  </div>
                  <div class="col-lg-4">
                    <el-date-picker
                      style="
                        margin: 2rem 1rem 2rem 0rem;
                        height: 43px !important;
                        box-shadow: 0 1px 3px rgb(50 50 93 / 15%),
                          0 1px 0 rgb(0 0 0 / 2%);
                        border: 0;
                        transition: box-shadow 0.15s ease;
                      "
                      v-model="model.DOB"
                      type="date"
                      input-classes="form-control-alternative"
                      placeholder="Date of birth"
                    >
                    </el-date-picker>
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <div class="row">
                <div class="col-lg-4"></div>
                <div class="col-lg-4"></div>
                <div class="col-lg-4">
                  <el-button
                    style="margin: 6rem"
                    :loading="loading"
                    type="primary"
                    class="my-4"
                    @click="handleUpdateProfile"
                    >Edit profile
                  </el-button>
                </div>
              </div>
              <!-- Description -->
              <!-- <h6 class="heading-small text-muted mb-4">About me</h6>
              <div class="pl-lg-4">
                <div class="form-group">
                  <base-input alternative="" label="About Me">
                    <textarea
                      rows="4"
                      class="form-control form-control-alternative"
                      placeholder="A few words about you ..."
                    >
A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea
                    >
                  </base-input>
                </div>
              </div> -->
            </form>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Api from "../models/api";
export default {
  name: "user-profile",
  data() {
    return {
      model: {
        username: "",
        email: "",
        name: "",
        province: "",
        phone: "",
        role: "",
        school: "",
        gender: "",
        DOB: "",
        avatar: "",
      },
      id: "",
      loading: false,
    };
  },
  mounted() {
    Api.get("/users/profile", this.model)
      .then((res) => {
        this.model.username = res.data.username;
        this.model.email = res.data.email;
        this.model.school = res.data.school;
        this.model.name = res.data.name;
        this.model.phone = res.data.phone;
        this.model.province = res.data.province;
        this.model.role = res.data.role;
        this.model.gender = res.data.gender;
        this.model.DOB = res.data.dob;
        this.model.avatar = res.data.avatar;
        this.id = res.data.id;
      })
      .catch((err) => {
        this.$notify({
          type: "warning",
          title: "error",
          message: err.toString(),
        });
      });
  },
  methods: {
    handleUpdateProfile() {
      this.loading = true;
      const updateDate = {
        name: this.model.name,
        province: this.model.province,
        phone: this.model.phone,
        school: this.model.school,
        gender: this.model.gender,
        DOB: this.model.dob,
      };
      Api.put(`/users/update-profile/${this.id}`, updateDate)
        .then((res) => {
          console.log(res.data);
          this.loading = false;
          this.$notify({
            type: "success",
            title: "Update profile success",
            message: "Update profile information successfull",
          });
        })
        .catch((err) => {
          this.$notify({
            type: "warning",
            title: "error",
            message: err.toString(),
          });
          this.loading = false;
        });
    },
    getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
  },
};
</script>
<style></style>
