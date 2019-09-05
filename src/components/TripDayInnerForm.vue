<template>
  <el-form
    :model="tripDayDetail"
    :rules="requiredRules"
    label-position="top"
    label-width="4rem"
    ref="tripForm"
    size="mini"
    width="40rem"
  >
    <el-row align="bottom">
      <el-col :span="9">
        <el-form-item label="Trip date" prop="trip_date_object">
          <el-date-picker
            :picker-options="{ disabledDate }"
            placeholder="Pick a day"
            style="width: 90%"
            type="date"
            v-model="tripDayDetail.trip_date_object"
          />
        </el-form-item>
      </el-col>
      <el-col :span="9">
        <el-form-item label="Name">
          <el-input style="width: 90%" v-model="tripDayDetail.name" />
        </el-form-item>
      </el-col>
      <el-col :span="6" style="padding-top: 2.2rem">
        <el-button @click="cancel" circle icon="el-icon-close" size="mini" type="info"></el-button>
        <el-button
          @click="handleSubmit"
          circle
          icon="el-icon-check"
          native-type="submit"
          size="mini"
          type="success"
        ></el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import moment from 'moment';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { TripDay } from '@/models/trip-day';
import { Actions } from '@/constants/actions';
import { Messages } from '@/constants/messages';

@Component
export default class TripDayInnerForm extends Vue {
  @Prop({ default: null })
  tripDayDetail: TripDay;

  requiredRules = {
    trip_date_object: [{ type: 'date', required: true, message: Messages.date.required, trigger: 'change' }],
  };

  @Emit('cancel')
  cancel() {}

  get tripDetail() {
    return this.$store.state.trip.tripDetail;
  }

  handleSubmit() {
    const tripForm: any = this.$refs.tripForm;
    tripForm.validate((valid: boolean) => {
      if (valid) {
        this.$store.dispatch(Actions.UPDATE_TRIP_DAY, this.tripDayDetail);
        this.cancel();
      } else {
        return false;
      }
    });
  }

  disabledDate(date: Date) {
    const startDate = moment(this.tripDetail.start_date);
    const endDate = moment(this.tripDetail.end_date);
    return moment(date) > endDate || moment(date) < startDate;
  }
}
</script>
