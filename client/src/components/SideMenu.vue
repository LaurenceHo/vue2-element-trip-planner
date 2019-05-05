<template>
  <div style="background-color: #545c64">
    <el-menu
      @select="handleSelect"
      :default-openeds="['dateFilter']"
      :collapse="!this.$store.state.toggle"
      class="side-menu"
      background-color="#2d3a4b"
      text-color="#fff"
      active-text-color="#ffd04b"
      default-active="current"
    >
      <el-button @click="openCreateTripDialog" class="create-button" type="primary">
        <font-awesome-icon icon="plus" class="menu-icon" />
        {{ this.$store.state.toggle ? 'Create new trip' : '' }}
      </el-button>
      <el-submenu index="dateFilter">
        <template slot="title">
          <font-awesome-icon icon="filter" class="menu-icon" />
          <span slot="title">Filter by date</span>
        </template>
        <el-menu-item index="upcoming">
          <font-awesome-icon icon="calendar-alt" class="menu-icon" />
          Upcoming
        </el-menu-item>
        <el-menu-item index="current">
          <font-awesome-icon icon="calendar-alt" class="menu-icon" />
          Current
        </el-menu-item>
        <el-menu-item index="past">
          <font-awesome-icon icon="calendar-alt" class="menu-icon" />
          Past
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="archived">
        <font-awesome-icon icon="archive" class="menu-icon" />
        <span>Archived</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class SideMenu extends Vue {
  openCreateTripDialog() {
    this.$store.dispatch('openCreateTripDialog', true);
  }

  handleSelect(value: string) {
    // TODO
    console.log(value);
  }
}
</script>

<style scoped>
.side-menu {
  border: none;
  min-height: 100%;
}

.side-menu:not(.el-menu--collapse) {
  width: 13rem;
}

.menu-icon {
  padding-right: 0.4rem;
}

.create-button {
  background-color: #2d3a4b;
  border-color: #2d3a4b;
  margin-top: 1rem;
}
</style>
