<template>
  <div class="top-bar">
    <create-trip-dialog />
    <create-trip-day-dialog />
    <el-button @click="handleClick" type="info" circle>
      <img src="../assets/vue-logo.png" height="30" alt="Vuejs" />
    </el-button>
    <hamburger :toggle-click="toggleSideBar" :is-active="this.$store.state.toggle" class="hamburger-container" />
    <div class="right-menu">
      <el-dropdown @command="handleSelect" class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <div class="avatar-outer">
            <img class="avatar" src="../assets/default-avatar.png" height="10" alt="avatar" />
          </div>
          <div style="float: right">{{ user.username }}</div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="profile">
            <font-awesome-icon icon="user" class="menu-icon" />
            Your profile
          </el-dropdown-item>
          <el-dropdown-item command="setting">
            <font-awesome-icon icon="cog" class="menu-icon" />
            Setting
          </el-dropdown-item>
          <el-dropdown-item divided command="logout">
            <font-awesome-icon icon="sign-out-alt" class="menu-icon" />
            Logout
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Hamburger from './Hamburger.vue';
import CreateTripDialog from '../components/CreateTripDialog.vue';
import CreateTripDayDialog from '../components/CreateTripDayDialog.vue';

@Component({
  components: { CreateTripDialog, CreateTripDayDialog, Hamburger },
})
export default class TopBar extends Vue {
  get user() {
    return this.$store.state.authentication.user;
  }

  toggleSideBar() {
    this.$store.dispatch('toggleSideBar');
  }

  handleClick() {
    this.$router.push('/');
  }

  handleSelect(value: string) {
    if (value === 'logout') {
      this.$store.dispatch('authentication/logout');
    }
  }
}
</script>

<style scoped>
.top-bar {
  z-index: 1;
  width: 100%;
}

.hamburger-container {
  line-height: 3.5rem;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
}

.hamburger-container:hover {
  background: rgba(0, 0, 0, 0.1);
}

.right-menu {
  float: right;
  height: 100%;
  line-height: 3.8rem;
  padding-right: 2rem;
}

.right-menu-item {
  display: inline-block;
  padding: 0 0.4rem;
  height: 100%;
  font-size: 1rem;
  color: #5a5e66;
  vertical-align: text-bottom;
}

.hover-effect {
  cursor: pointer;
  transition: background 0.3s;
}

.hover-effect:hover {
  background: rgba(0, 0, 0, 0.1);
}

.avatar-wrapper {
  cursor: pointer;
  color: #ffd04b;
}

.avatar-outer {
  float: left;
  margin-top: 0.5rem;
}

.avatar {
  border: 1px solid #fff;
  margin-right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}

.menu-icon {
  padding-right: 0.5rem;
}
</style>
