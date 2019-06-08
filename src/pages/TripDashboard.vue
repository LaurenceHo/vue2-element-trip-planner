<template>
  <div class="main-content">
    <div v-if="isLoading" class="loading-spinner-outer">
      <i class="el-icon-loading loading-spinner" />
      Loading...
    </div>
    <div v-else>
      <el-alert v-if="alert.message" :title="alert.message" :type="alert.type" :closable="false" show-icon />
      <div v-if="tripList.size === 0">
        <el-alert title="You have no trip..." type="info" show-icon />
      </div>
      <div v-else>
        <div v-for="trip in tripList">
          <el-card :key="trip.id" :title="trip.name" class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ trip.name }}</span>
              <el-button @click="goToTripDetail(trip.id)" class="detail-button" type="text">
                Detail
              </el-button>
            </div>
            <div>
              <p>Start date: {{ trip.start_date }}</p>
              <p>End date: {{ trip.end_date }}</p>
              <p>Destination: {{ trip.destination }}</p>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TripDashboard extends Vue {
  beforeMount() {
    const requestBody = {
      archived: false,
    };
    this.$store.dispatch('trip/getTripList', requestBody);
  }

  get alert() {
    return this.$store.state.alert;
  }

  get tripList() {
    return this.$store.state.trip.tripList;
  }

  get isLoading() {
    return this.$store.state.trip.isLoading;
  }

  goToTripDetail(tripId: number) {
    this.$router.push(`trip/${tripId}`);
    this.$store.dispatch('trip/getTripDetailWithDays', tripId);
  }
}
</script>

<style scoped>
.main-content {
  padding: 0 2rem;
}

.box-card {
  width: 42rem;
  margin: 1rem 0;
}

.detail-button {
  float: right;
  padding: 3px 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>
