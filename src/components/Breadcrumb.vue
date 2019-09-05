<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/dashboard' }" key="dashboard">Dashboard</el-breadcrumb-item>
      <el-breadcrumb-item key="trip" v-if="!isDashboard">Trip detail</el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Breadcrumb extends Vue {
  get isDashboard() {
    return this.$route.path.includes('dashboard');
  }
}
</script>

<style scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  padding-bottom: 0.45rem;
}
</style>
