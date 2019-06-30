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
        <el-table :data="tripList" stripe style="width: 100%">
          <el-table-column prop="name" label="Trip name" />
          <el-table-column label="Date">
            <template slot-scope="scope">
              <span>{{ `${scope.row.start_date} ~ ${scope.row.end_date}` }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="destination" label="Destination" />
          <el-table-column fixed="right" label="Operations">
            <template slot-scope="scope">
              <el-button @click="goToTripDetail(scope.row)" type="text">Detail</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Actions } from '../constants/actions';
import { Trip } from '../models/trip';

@Component
export default class TripList extends Vue {
  beforeMount() {
    this.$store.dispatch(Actions.GET_TRIP_LIST);
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

  goToTripDetail(row: Trip) {
    this.$router.push(`trip/${row.id}`);
    this.$store.dispatch(Actions.GET_TRIP_DETAIL, { tripId: row.id, isCreateOrUpdate: false });
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
