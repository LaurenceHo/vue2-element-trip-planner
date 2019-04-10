<template>
  <el-menu
    @open="handleOpen"
    @close="handleClose"
    class="trip-day-menu"
    default-active="0">
    <div v-for="(tripDay, index) in tripDetail.trip_day">
      <el-menu-item :index="String(index)">
        <span>{{ tripDay.trip_date }}</span>
        <i class="el-icon-arrow-right" />
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class TripDay extends Vue {
  get tripDetail() {
    return this.$store.state.trip.tripDetail;
  }

  handleOpen(key: any, keyPath: any) {
    console.log(key, keyPath);
  }

  handleClose(key: any, keyPath: any) {
    console.log(key, keyPath);
  }
}
</script>

<style scoped>
.trip-day-menu {
  border: none;
  min-height: 100%;
}

/*.trip-day-menu:not(.el-menu--collapse) {*/
/*  width: 10rem;*/
/*}*/
</style>
