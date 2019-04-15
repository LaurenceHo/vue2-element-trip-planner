<template>
  <el-dialog
    :visible.sync="this.$store.state.openCreateTripDialog"
    :show-close="false"
    custom-class="create-trip-dialog"
    title="Create trip"
    width="40%"
  >
    <el-form
      ref="tripForm"
      :rules="requiredRules"
      :model="trip"
      class="create-trip-form"
      label-position="top"
      label-width="3rem"
    >
      <el-form-item label="Name">
        <el-input v-model="trip.name" />
      </el-form-item>
      <el-form-item label="Destination" prop="destination">
        <el-input v-model="trip.destination" />
      </el-form-item>
      <el-col :span="12">
        <el-form-item label="Start date" prop="start_date">
          <el-date-picker v-model="trip.start_date" style="width: 90%;" type="date" placeholder="Pick a day" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="End date" prop="end_date">
          <el-date-picker v-model="trip.end_date" style="width: 90%;" type="date" placeholder="Pick a day" />
        </el-form-item>
      </el-col>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">Cancel</el-button>
      <el-button @click="createTrip()" type="primary">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({})
export default class CreateTripDialog extends Vue {
  requiredRules = {
    destination: [{ required: true, message: 'Please input destination', trigger: 'blur' }],
    start_date: [{ type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }],
    end_date: [{ type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }],
  };

  trip = {
    user_id: 0,
    start_date: '',
    end_date: '',
    name: '',
    destination: '',
    archived: false,
  };

  closeDialog() {
    this.$store.dispatch('openCreateTripDialog', false);
  }

  createTrip() {
    let tripForm: any = this.$refs.tripForm;
    tripForm.validate((valid: boolean) => {
      if (valid) {
        this.$store.dispatch('openCreateTripDialog', false);
        this.trip.user_id = this.$store.state.authentication.user.id;
        this.$store.dispatch('trip/createTrip', this.trip);
        tripForm.resetFields();
      } else {
        return false;
      }
    });
  }
}
</script>

<style scoped></style>
