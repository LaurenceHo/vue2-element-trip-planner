<template>
  <el-container>
    <el-header>
      <top-bar :username="this.username"/>
    </el-header>
    <el-container>
      <side-menu/>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import TopBar from './components/TopBar.vue';
  import Dashboard from './components/Dashboard.vue';
  import SideMenu from './components/SideMenu.vue';

  @Component({
    components: {SideMenu, TopBar, Dashboard}
  })
  export default class App extends Vue {
    username: string = '';

    constructor() {
      super();
      this.username = 'Laurence Ho';
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #545c64;
    color: #fff;
    line-height: 5rem;
    padding: 0;
  }
</style>
