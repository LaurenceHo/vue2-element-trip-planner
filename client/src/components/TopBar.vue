<template>
  <div class="top-bar">
    <img
      src="../assets/vue-logo.png"
      height="30"
      alt="Vuejs"
    />

    <div class="right-menu">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img
            class="avatar"
            src="../assets/default-avatar.png"
            height="10"
            alt="avatar"
          /> {{username}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              <font-awesome-icon icon="user" class="menu-icon"/>
              Your profile
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              <font-awesome-icon icon="cog" class="menu-icon"/>
              Setting
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <font-awesome-icon icon="sign-out-alt" class="menu-icon"/>
            Logout
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Hamburger from './Hamburger';

  @Component({
    components: {Hamburger},
    props: {
      username: {
        type: String,
        default: ''
      }
    }
  })

  export default class TopBar extends Vue {

  }

</script>

<style scoped>
  .top-bar {
    position: fixed;
    z-index: 1;
    width: 100%;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 4rem;
    padding-right: 2rem;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #ffd04b;
  }

  .avatar {
    border: 1px solid #fff;
    margin-right: .5rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
  }

  .menu-icon {
    padding-right: 0.5rem
  }

  .github-button {
    color: #fff;
    font-size: 2rem;
    padding: 1rem;
  }

</style>
