<template>
  <el-container>
    <el-header>
      <top-bar :username="user.username"/>
    </el-header>
    <el-container>
      <side-menu/>
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import TopBar from '../components/TopBar.vue';
  import SideMenu from '../components/SideMenu.vue';

  @Component({
    components: {SideMenu, TopBar}
  })
  export default class Layout extends Vue {
    created() {
      this.$store.dispatch('alert/clear');
    }

    get user() {
      return this.$store.state.authentication.user;
    }
  }
</script>

<style scoped>
  .el-container {
    min-height: 100%;
  }

  .el-header {
    background-color: #2d3a4b;
    color: #fff;
    line-height: 5rem;
    padding: 0;
  }
</style>
