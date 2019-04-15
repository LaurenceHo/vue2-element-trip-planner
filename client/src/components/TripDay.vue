<template>
  <el-menu @select="handleSelect" class="trip-day-menu" default-active="0">
    <el-button class="create-button">
      <font-awesome-icon icon="plus" class="menu-icon" />
      Create new day
    </el-button>
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

  handleSelect(value: string) {
    const payload = {
      trip_id: this.$store.state.trip.tripDetail.id,
      trip_day_id: this.tripDetail.trip_day[Number(value)].id,
    };
    this.$store.dispatch('trip/getTripDayWithEvents', payload);
  }
}
</script>

<style scoped>
.el-button {
  margin-left: 1rem;
}

.trip-day-menu {
  border: none;
  min-height: 100%;
}
</style>
