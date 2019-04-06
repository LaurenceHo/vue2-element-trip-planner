<template>
  <div class="main-content">
    <create-trip-dialog/>
    <div v-if="isLoading" :style="{width: '100%', textAlign: 'center'}">
      <i class="el-icon-loading loading-spinner"></i>
      Loading...
    </div>
    <div v-else>
      <el-alert
        v-if="alert.message"
        :title="alert.message"
        :type="alert.type"
        :closable=false
        show-icon>
      </el-alert>
      <div v-if="trips.size === 0">
        <el-alert
          title="You have no trip..."
          type="info"
          show-icon>
        </el-alert>
      </div>
      <div v-else>
        <el-card class="box-card" v-for="trip in trips" :title="trip.name">
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
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import CreateTripDialog from './CreateTripDialog.vue';

  @Component({
    components: {CreateTripDialog}
  })
  export default class Dashboard extends Vue {
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
