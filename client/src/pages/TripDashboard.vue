<template>
  <div class="main-content">
    <create-trip-dialog />
    <div
      v-if="isLoading"
      :style="{ width: '100%', textAlign: 'center' }">
      <i class="el-icon-loading loading-spinner" />
      Loading...
    </div>
    <div v-else>
      <el-alert
        v-if="alert.message"
        :title="alert.message"
        :type="alert.type"
        :closable="false"
        show-icon />
      <div v-if="trips.size === 0">
        <el-alert
          title="You have no trip..."
          type="info"
          show-icon />
      </div>
      <div v-else>
        <el-card
          v-for="trip in trips"
          :title="trip.name"
          class="box-card">
          <div
            slot="header"
            class="clearfix">
            <span>{{ trip.name }}</span>
            <el-button
              @click="goToDetail(trip.id)"
              class="detail-button"
              type="text">
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
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import CreateTripDialog from '../components/CreateTripDialog.vue';

@Component({
  components: { CreateTripDialog },
})
export default class TripDashboard extends Vue {
  beforeMount() {
    // TODO: use date as filter in the request body
    const requestBody = {};
    this.$store.dispatch('trip/getTrips', requestBody);
  }

  get alert() {
    return this.$store.state.alert;
  }

  get trips() {
    return this.$store.state.trip.trips;
  }

  get isLoading() {
    return this.$store.state.trip.isLoading;
  }

  goToDetail(tripId: number) {
    this.$router.push(`trip/${tripId}`);
    this.$store.dispatch('trip/getTripDays', { trip_id: tripId, isInitial: true });
  }
}
</script>

<style scoped>
.main-content {
  padding: 0 2rem;
}

.loading-spinner {
  font-size: 3rem;
  display: inline-block;
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
