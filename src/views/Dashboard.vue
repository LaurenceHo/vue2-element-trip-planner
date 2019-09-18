<template>
  <el-container>
    <side-menu class="sidebar-container" />
    <el-container>
      <el-header>
        <top-bar />
      </el-header>
      <el-main>
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TopBar from '@/components/TopBar.vue';
import SideMenu from '@/components/SideMenu.vue';
import { Actions } from '@/constants/actions';

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
.sidebar-container {
  background-color: #2d3a4b;
}

.el-container {
  min-height: 100%;
}

.el-header {
  line-height: 5rem;
  padding: 0;
}

.el-main {
  padding: 0;
}
</style>
