<template>
  <div class="wrapper">
    <side-bar v-if="!logindeMi">
      <template slot="links">
        <sidebar-link
          v-if="!userMi"
          to="/icons"
          :name="$t('sidebar.icons')"
          icon="tim-icons icon-atom"
        />
        <sidebar-link
          v-if="userMi"
          to="/dashboard"
          :name="$t('sidebar.dashboard')"
          icon="tim-icons icon-chart-pie-36"
        />
        <sidebar-link
          v-if="userMi"
          to="/maps"
          :name="$t('sidebar.maps')"
          icon="tim-icons icon-pin"
        />
        <sidebar-link
          v-if="userMi"
          to="/notifications"
          :name="$t('sidebar.notifications')"
          icon="tim-icons icon-bell-55"
        />
        <sidebar-link
          to="/profile"
          :name="$t('sidebar.userProfile')"
          icon="tim-icons icon-single-02"
        />
        <sidebar-link
          v-if="userMi"
          to="/table-list"
          :name="$t('sidebar.tableList')"
          icon="tim-icons icon-puzzle-10"
        />
        <sidebar-link
          to="/typography"
          v-if="userMi"
          :name="$t('sidebar.typography')"
          icon="tim-icons icon-align-center"
        />
        <sidebar-link
          v-if="!girisYapildiMi"
          to="/login"
          :name="$t('sidebar.login')"
          icon="tim-icons icon-world"
        />
        <sidebar-link
          v-if="girisYapildiMi"
          to="/login"
          :name="$t('sidebar.logout')"
          icon="tim-icons icon-world"
        />
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    logindeMi: false,
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  data() {
    return {
      girisYapildiMi: false,
      userMi: false
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  },
  created() {
    this.logindeMi = this.$route.name == "login" ? true : false;
    if (JSON.parse(localStorage.getItem("current_user"))["id"] == -1) {
      this.girisYapildiMi = false;
    } else {
      this.girisYapildiMi = true;
    }

    if (localStorage.getItem("user_type") == "user") {
      this.userMi = true;
    } else if (localStorage.getItem("user_type") == "customer") {
      this.userMi = false;
    }
  }
};
</script>
