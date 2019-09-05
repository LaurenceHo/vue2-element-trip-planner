<template>
  <div>
    <el-button @click="handleClick" circle class="logo" type="info">
      <img alt="Vuejs" height="30" src="../assets/vue-logo.png" />
    </el-button>
    <el-menu
      :collapse="!$store.state.dashboard.toggle"
      :default-openeds="['dateFilter']"
      @select="handleSelect"
      active-text-color="#ffd04b"
      background-color="#2d3a4b"
      class="side-menu"
      default-active="current"
      text-color="#fff"
    >
      <el-button :disabled="shouldDisable" @click="openCreateTripDialog" class="create-button" type="info">
        <font-awesome-icon class="menu-icon" icon="plus" />
        {{ $store.state.dashboard.toggle ? 'New Trip' : '' }}
      </el-button>
      <el-submenu index="dateFilter">
        <template slot="title">
          <font-awesome-icon class="menu-icon" icon="filter" />
          <span slot="title">Filter by date</span>
        </template>
        <div :key="option.key" v-for="option in sideMenuOption">
          <el-menu-item :disabled="shouldDisable" :index="option.key">
            <font-awesome-icon class="menu-icon" icon="calendar-alt" />
            {{ option.label }}
          </el-menu-item>
        </div>
      </el-submenu>
      <el-menu-item :disabled="shouldDisable" index="archived">
        <font-awesome-icon class="menu-icon" icon="archive" />
        <span>Archived</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Actions } from '@/constants/actions';

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

  handleClick() {
    this.$router.push('/');
  }

  handleSelect(value: string) {
    this.$store.dispatch(Actions.SET_SIDE_MENU, value);
    this.$store.dispatch(Actions.GET_TRIP_LIST);
  }
}
</script>

<style scoped>
.logo {
  margin: 0.5rem 0 0 0.15rem;
}

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
