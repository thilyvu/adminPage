<template>
  <base-nav
    class="navbar-top navbar-dark"
    id="navbar-main"
    :show-toggle-button="false"
    expand
  >
    <form
      class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto"
    >
      <div class="form-group mb-0">
        <!-- <base-input
          placeholder="Search"
          class="input-group-alternative"
          alternative=""
          addon-right-icon="fas fa-search"
        >
        </base-input> -->
      </div>
    </form>
    <ul class="navbar-nav align-items-center d-none d-md-flex">
      <li class="nav-item dropdown">
        <base-dropdown class="nav-link pr-0" style="margin-left: -50px">
          <template v-slot:title>
            <div class="media align-items-center">
              <span class="avatar avatar-sm rounded-circle">
                <img alt="Image placeholder" :src="this.model.avatar" />
              </span>
              <div class="media-body ml-2 d-none d-lg-block">
                <span class="mb-0 text-sm font-weight-bold">{{
                  this.model.name
                }}</span>
              </div>
            </div>
          </template>
          <div class="dropdown-header noti-title">
            <h6 class="text-overflow m-0">Welcome!</h6>
          </div>
          <router-link to="/profile" class="dropdown-item">
            <i class="ni ni-single-02"></i>
            <span>My profile</span>
          </router-link>
          <router-link to="/profile" class="dropdown-item">
            <i class="ni ni-settings-gear-65"></i>
            <span>Settings</span>
          </router-link>
          <!-- <router-link to="/profile" class="dropdown-item">
            <i class="ni ni-calendar-grid-58"></i>
            <span>Activity</span>
          </router-link>
          <router-link to="/profile" class="dropdown-item">
            <i class="ni ni-support-16"></i>
            <span>Support</span>
          </router-link> -->
          <div class="dropdown-divider"></div>
          <router-link to="/login" class="dropdown-item">
            <i class="ni ni-user-run"></i>
            <span>Logout</span>
          </router-link>
        </base-dropdown>
      </li>
    </ul>
  </base-nav>
</template>
<script>
import Api from "../models/api";
export default {
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchQuery: "",
      model: {
        name: "",
        avatar: "",
      },
    };
  },
  mounted() {
    Api.get("/users/profile", this.model)
      .then((res) => {
        this.model.name = res.data.name;
        this.model.avatar = res.data.avatar;
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
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>
