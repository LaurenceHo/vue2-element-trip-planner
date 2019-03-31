<template>
  <div class="main-content">
    <div v-if="this.$store.state.isLoading" :style="{width: '100%', textAlign: 'center'}">
      <i class="el-icon-loading loading-spinner"></i>
      Loading...
    </div>
    <div v-else>
      <div v-if="this.$store.state.errorMessage">
        <el-alert
          type="error"
          :title="this.$store.state.errorMessage"
          :closable=false
          show-icon>
        </el-alert>
      </div>
      <div v-else>
        <div v-if="this.$store.state.trips.size === 0">
          <el-alert
            title="You have no trip..."
            type="info"
            show-icon>
          </el-alert>
        </div>
        <div v-else>
          <el-card class="box-card" v-for="trip in this.$store.state.trips" :title="trip.name">
            <div slot="header" class="clearfix">
              <span>{{trip.name}}</span>
              <el-button style="float: right; padding: 3px 0" type="text">Detail</el-button>
            </div>
            <div>
              <p>Start date: {{trip.start_date}}</p>
              <p>End date: {{trip.end_date}}</p>
              <p>Destination: {{trip.destination}}</p>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { TripService } from '../services/trip-service';

  @Component({})

  export default class Dashboard extends Vue {
    tripService = new TripService();

    beforeMount() {
      const requestBody = {};
      this.$store.dispatch('isLoading', {isLoading: true});

      this.tripService.getAllTrips(requestBody).then((result: any) => {
        this.$store.dispatch('setTrips', {trips: result.result});
        this.$store.dispatch('isLoading', {isLoading: false});
      }).catch((error: any) => {
        this.$store.dispatch('isLoading', {isLoading: false});
        this.$store.dispatch('errorMessage', {errorMessage: error.message});
      });
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

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
