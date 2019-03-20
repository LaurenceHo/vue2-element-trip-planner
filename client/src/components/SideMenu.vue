<template>
  <div style="background-color: #545c64">
    <el-menu
      class="side-menu"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      default-active="current"
      @select="handleSelect"
      :default-openeds="['dateFilter']"
      :collapse="!this.$store.state.toggle"
    >
      <el-menu-item index="create">
        <font-awesome-icon icon="plus" class="menu-icon"/>
        <span>Create new trip</span>
      </el-menu-item>
      <el-submenu index="dateFilter">
        <template slot="title">
          <font-awesome-icon icon="filter" class="menu-icon"/>
          <span slot="title">Filter by date</span>
        </template>
        <el-menu-item index="upcoming">
          <font-awesome-icon icon="calendar-alt" class="menu-icon"/>
          Upcoming
        </el-menu-item>
        <el-menu-item index="current">
          <font-awesome-icon icon="calendar-alt" class="menu-icon"/>
          Current
        </el-menu-item>
        <el-menu-item index="past">
          <font-awesome-icon icon="calendar-alt" class="menu-icon"/>
          Past
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="archived">
        <font-awesome-icon icon="archive" class="menu-icon"/>
        <span>Archived</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({})

  export default class SideMenu extends Vue {
    handleSelect(value: string) {
      if (value === 'create') {
        this.$router.push('/create-trip');
      }
    }
  }
</script>

<style scoped>
  .side-menu {
    border: none;
    min-height: 55rem;
  }

  .side-menu:not(.el-menu--collapse) {
    width: 15rem;
  }

  .menu-icon {
    padding-right: 0.8rem
  }
</style>
