<template>
  <div>
    <el-card shadow="hover">
      <el-row type="flex">
        <el-col :span="1">
          <font-awesome-icon v-if="tripEvent.category_id === 1" icon="walking" size="2x" />
          <font-awesome-icon v-if="tripEvent.category_id === 2" icon="bus-alt" size="2x" />
          <font-awesome-icon v-if="tripEvent.category_id === 3" icon="info-circle" size="2x" />
          <font-awesome-icon v-if="tripEvent.category_id === 4" icon="hotel" size="2x" />
          <font-awesome-icon v-if="tripEvent.category_id === 5" icon="plane" size="2x" />
          <font-awesome-icon v-if="tripEvent.category_id === 6" icon="ship" size="2x" />
        </el-col>
        <el-col :span="21" style="border-left: 2px dodgerblue solid">
          <div style="padding-left: 0.4rem">
            <div style="font-size: 1.5rem">{{ tripEvent.title }}</div>
            <div v-if="tripEvent.start_time" class="event-text">Start at: {{ tripEvent.start_time }}</div>
            <div v-if="tripEvent.end_time" class="event-text">End at: {{ tripEvent.end_time }}</div>
            <div v-if="tripEvent.start_location" class="event-text">From: {{ tripEvent.start_location }}</div>
            <div v-if="tripEvent.end_location" class="event-text">To: {{ tripEvent.end_location }}</div>
            <div v-if="tripEvent.cost">Price: ${{ tripEvent.cost }} {{ currency ? `(${currency.code})` : '' }}</div>
            <div v-if="tripEvent.tag">
              <font-awesome-icon icon="tags" />
              <el-tag v-for="tag in tripEvent.tag.split(',')" :key="tag" style="margin-right: 0.3rem;">
                {{ tag }}
              </el-tag>
            </div>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button @click="editEvent" type="primary" size="mini" circle>
            <font-awesome-icon icon="edit" />
          </el-button>
          <el-button @click="controlDialog" type="danger" size="mini" circle>
            <font-awesome-icon icon="trash-alt" />
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog v-if="isDialogOpen" :visible.sync="isDialogOpen" title="Warning" width="30%">
      <span>This will permanently delete the event. Continue?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="controlDialog">Cancel</el-button>
        <el-button @click="controlDialog" type="primary">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Event as TripEvent } from '../models/event';
import { Actions } from '../constants/actions';
import { currency } from '../assets/currency';
import { Currency } from '../models/currency';

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

  controlDialog() {
    this.isDialogOpen = !this.isDialogOpen;
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
