<template>
  <div style="padding-bottom: 1rem;">
    <el-card>
      <el-row type="flex">
        <el-col :span="2">
          <font-awesome-icon icon="walking" size="2x" v-if="tripEvent.category_id === 1" />
          <font-awesome-icon icon="bus-alt" size="2x" v-if="tripEvent.category_id === 2" />
          <font-awesome-icon icon="info-circle" size="2x" v-if="tripEvent.category_id === 3" />
          <font-awesome-icon icon="bed" size="2x" v-if="tripEvent.category_id === 4" />
          <font-awesome-icon icon="plane" size="2x" v-if="tripEvent.category_id === 5" />
          <font-awesome-icon icon="ship" size="2x" v-if="tripEvent.category_id === 6" />
        </el-col>
        <el-col :span="20" style="border-left: 2px dodgerblue solid">
          <div style="padding-left: 0.4rem">
            <div style="font-size: 1.5rem">{{ tripEvent.title }}</div>
            <div class="event-text" v-if="tripEvent.start_time">Start at: {{ tripEvent.start_time }}</div>
            <div class="event-text" v-if="tripEvent.end_time">End at: {{ tripEvent.end_time }}</div>
            <div class="event-text" v-if="tripEvent.start_location">From: {{ tripEvent.start_location }}</div>
            <div class="event-text" v-if="tripEvent.end_location">To: {{ tripEvent.end_location }}</div>
            <div v-if="tripEvent.cost">Price: ${{ tripEvent.cost }} {{ currency ? `(${currency.code})` : '' }}</div>
            <div v-if="tripEvent.tag">
              <font-awesome-icon icon="tags" />
              <el-tag :key="tag" style="margin-right: 0.3rem;" v-for="tag in tripEvent.tag.split(',')">
                {{ tag }}
              </el-tag>
            </div>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button @click="editEvent" circle icon="el-icon-edit" size="mini" type="primary"></el-button>
          <el-button @click="isDialogOpen = true" circle icon="el-icon-delete" size="mini" type="danger"></el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog :visible.sync="isDialogOpen" title="Warning" v-if="isDialogOpen" width="30%">
      <span>
        This will permanently delete the event <strong>{{ tripEvent.title }}</strong
        >. Do you want to continue?
      </span>
      <span class="dialog-footer" slot="footer">
        <el-button @click="isDialogOpen = false">Cancel</el-button>
        <el-button @click="deleteEvent" type="primary">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Event as TripEvent } from '@/models/event';
import { Actions } from '@/constants/actions';
import { currency } from '@/assets/currency';
import { Currency } from '@/models/currency';

@Component
export default class Event extends Vue {
  currencyList: Currency[] = currency;
  isDialogOpen: boolean = false;

  @Prop()
  tripEvent: TripEvent;

  get currency(): Currency {
    return this.currencyList.find((currency: Currency) => currency.id === this.tripEvent.currency_id);
  }

  editEvent() {
    this.$store.dispatch(Actions.OPEN_TRIP_EVENT_FORM, true);
    this.$store.dispatch(Actions.UPDATE_EDIT, {
      isEditMode: true,
      idInEdit: this.tripEvent.id,
      component: 'tripEvent',
    });
  }

  deleteEvent() {
    this.isDialogOpen = false;
    this.$store.dispatch(Actions.DELETE_TRIP_EVENT, this.tripEvent);
  }
}
</script>

<style scoped>
.el-card {
  border: none;
}

.event-text {
  line-height: 1.8rem;
}
</style>
