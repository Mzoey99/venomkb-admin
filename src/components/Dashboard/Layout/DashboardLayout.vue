<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/proteins">
        <i class="nc-icon nc-circle-09"></i>
        <p>Proteins</p>
      </sidebar-link>
      <sidebar-link to="/species">
        <i class="nc-icon nc-notes"></i>
        <p>Species</p>
      </sidebar-link>
      <sidebar-link to="/genomes">
        <i class="nc-icon nc-paper-2"></i>
        <p>Genomes</p>
      </sidebar-link>
      <sidebar-link to="/systemic-effects">
        <i class="nc-icon nc-atom"></i>
        <p>Systemic Effects</p>
      </sidebar-link>
      <sidebar-link to="/semantic">
        <i class="nc-icon nc-pin-3"></i>
        <p>Semantic API</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
