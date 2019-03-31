<template>
  <el-container>
    <el-header>
      <top-bar :username="this.username"/>
    </el-header>
    <el-container>
      <side-menu/>
      <el-main>
        <dashboard/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import TopBar from '../components/TopBar.vue';
  import Dashboard from '../components/Dashboard.vue';
  import SideMenu from '../components/SideMenu.vue';

  @Component({
    components: {SideMenu, TopBar, Dashboard}
  })
  export default class Layout extends Vue {
    username: string = '';

    constructor() {
      super();
      this.username = JSON.parse(localStorage.getItem('user')).username;
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
