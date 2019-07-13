<template>
  <el-menu @select="handleSelect" class="trip-day-menu" default-active="0">
    <el-button @click="openTripDayForm" type="primary">
      <font-awesome-icon icon="plus" />
      New Day
    </el-button>
    <div v-for="(tripDay, index) in tripDetail.trip_day">
      <el-menu-item :index="String(index)">
        <el-row>
          <el-col :span="23">
            <span>{{ tripDay.trip_date }}</span>
          </el-col>
          <el-col :span="1">
            <font-awesome-icon icon="chevron-right" />
          </el-col>
        </el-row>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Actions } from '../constants/actions';

@Component
export default class TripDay extends Vue {
  get tripDetail() {
    return this.$store.state.trip.tripDetail;
  }

  openTripDayForm() {
    this.$store.dispatch(Actions.OPEN_TRIP_DAY_FORM, true);
  }

  handleSelect(value: string) {
    const tripDay = this.tripDetail.trip_day[Number(value)];
    this.$store.dispatch(Actions.UPDATE_SELECTED_TRIP_DAY_ID, tripDay.id);
  }
}
</script>

<style scoped>
.el-button {
  margin-bottom: 0.5rem;
  margin-left: 1rem;
}

.trip-day-menu {
  border: none;
  min-height: 100%;
}
</style>
