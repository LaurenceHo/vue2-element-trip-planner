<template>
  <div style="background-color: #545c64">
    <el-menu
      @select="handleSelect"
      :default-openeds="['dateFilter']"
      :collapse="!$store.state.dashboard.toggle"
      class="side-menu"
      background-color="#2d3a4b"
      text-color="#fff"
      active-text-color="#ffd04b"
      default-active="current"
    >
      <el-button @click="openCreateTripDialog" :disabled="shouldDisable" class="create-button" type="info">
        <font-awesome-icon icon="plus" class="menu-icon" />
        {{ $store.state.dashboard.toggle ? 'New Trip' : '' }}
      </el-button>
      <el-submenu index="dateFilter">
        <template slot="title">
          <font-awesome-icon icon="filter" class="menu-icon" />
          <span slot="title">Filter by date</span>
        </template>
        <div v-for="option in sideMenuOption">
          <el-menu-item :index="option.key" :disabled="shouldDisable">
            <font-awesome-icon icon="calendar-alt" class="menu-icon" />
            {{ option.label }}
          </el-menu-item>
        </div>
      </el-submenu>
      <el-menu-item :disabled="shouldDisable" index="archived">
        <font-awesome-icon icon="archive" class="menu-icon" />
        <span>Archived</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Actions } from '../constants/actions';

@Component
export default class SideMenu extends Vue {
  sideMenuOption = [
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'current', label: 'Currently Traveling' },
    { key: 'past', label: 'Past' },
  ];

  get shouldDisable() {
    return !this.$route.path.includes('dashboard');
  }

  openCreateTripDialog() {
    this.$store.dispatch(Actions.OPEN_TRIP_FORM, true);
  }

  handleSelect(value: string) {
    this.$store.dispatch(Actions.SET_SIDE_MENU, value);
    this.$store.dispatch(Actions.GET_TRIP_LIST);
  }
}
</script>

<style scoped>
.side-menu {
  border: none;
  min-height: 100%;
}

.side-menu:not(.el-menu--collapse) {
  width: 15rem;
}

.menu-icon {
  padding-right: 0.4rem;
}

.create-button {
  background-color: #2d3a4b;
  border-color: #2d3a4b;
  margin-top: 1rem;
  width: 100%;
  text-align: left;
}
</style>
