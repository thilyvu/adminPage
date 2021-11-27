<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard',
          }"
        />

        <!-- <sidebar-item
          :link="{
            name: 'Icons',
            icon: 'ni ni-planet text-blue',
            path: '/icons',
          }"
        /> -->
        <!-- <sidebar-item
          :link="{
            name: 'Maps',
            icon: 'ni ni-pin-3 text-orange',
            path: '/maps',
          }"
        /> -->
        <!-- <sidebar-item
          :link="{
            name: 'User Profile',
            icon: 'ni ni-single-02 text-yellow',
            path: '/profile',
          }"
        /> -->
        <sidebar-item
          :link="{
            name: 'Classes',
            icon: 'ni ni-hat-3 text-black',
            path: '/classes',
          }"
        />
        <sidebar-item
          :link="{
            name: 'File Management',
            icon: 'ni ni-folder-17 text-yellow',
            path: '/fileManagement',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Scores',
            icon: 'ni ni-map-big text-blue',
            path: '/Scores',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Exercises',
            icon: 'ni ni-single-copy-04 text-red',
            path: '/Exercises',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Users',
            icon: 'ni ni-circle-08 text-green',
            path: '/Users',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Lectures',
            icon: 'ni ni-tablet-button text-purple',
            path: '/Lectures',
          }"
        />
        <sidebar-item
          :link="{
            name: 'New Feeds',
            icon: 'ni ni-paper-diploma text-teal',
            path: '/NewFeeds',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Comments',
            icon: 'ni ni-ungroup text-orange',
            path: '/Comments',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Calendars',
            icon: 'ni ni-album-2 text-charcoal',
            path: '/Calendars',
          }"
        />
        <!-- <sidebar-item
          :link="{
            name: 'Login',
            icon: 'ni ni-key-25 text-info',
            path: '/login',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Register',
            icon: 'ni ni-circle-08 text-pink',
            path: '/register',
          }"
        /> -->
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <!-- your content here -->
        <router-view></router-view>
        <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
// import ContentFooter from "./ContentFooter.vue";

export default {
  components: {
    DashboardNavbar,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
<style lang="scss"></style>
