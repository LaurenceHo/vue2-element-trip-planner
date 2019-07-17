<template>
  <el-container>
    <el-header>
      <top-bar />
    </el-header>
    <el-container>
      <side-menu />
      <el-main>
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import TopBar from '../components/TopBar.vue';
import SideMenu from '../components/SideMenu.vue';
import { Actions } from '../constants/actions';

@Component({
  components: { SideMenu, TopBar },
})
export default class Dashboard extends Vue {
  created() {
    this.$store.dispatch(Actions.CLEAR_ALERT);
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

.el-main {
  padding: 0;
}
</style>
