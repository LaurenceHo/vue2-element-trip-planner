<template>
  <el-menu @select="handleSelect" class="trip-day-menu" default-active="0">
    <el-button @click="openCreateDialog" class="create-button" type="primary">
      <font-awesome-icon icon="plus" />
      Create new day
    </el-button>
    <div v-for="(tripDay, index) in tripDetail.trip_day">
      <el-menu-item :index="String(index)">
        <span>{{ tripDay.trip_date }}</span>
        <font-awesome-icon icon="chevron-right" />
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TripDay extends Vue {
  get tripDetail() {
    return this.$store.state.trip.tripDetail;
  }

  openCreateDialog() {
    this.$store.dispatch('dashboard/openTripDayForm', true);
  }

  handleSelect(value: string) {
    this.$store.dispatch('dashboard/updateSelectedTripDayId', this.tripDetail.trip_day[Number(value)].id);
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
