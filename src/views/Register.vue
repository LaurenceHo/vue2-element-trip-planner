<template>
  <div class="container">
    <el-row type="flex" class="row-bg" justify="end" style="padding-top: 1rem">
      <el-col :span="2">
        <el-button @click="goToLoginPage" type="primary">
          Sign In
        </el-button>
      </el-col>
    </el-row>
    <el-form ref="user" :model="user" class="user-form" label-position="top" label-width="5rem">
      <el-alert v-if="alert.message" :title="alert.message" :type="alert.type" show-icon effect="dark" />
      <div class="user-form-title-container">
        <h3 class="user-form-title ">
          Sign Up
        </h3>
      </div>
      <el-form-item :rules="emailRules" label="Email" prop="email">
        <el-input v-model="user.email" />
      </el-form-item>
      <el-form-item label="Username">
        <el-input v-model="user.username" type="text" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="user.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button
          @click="handleSubmit"
          :disabled="!user.email || !user.username || !user.password"
          class="user-form-button"
          type="primary"
          native-type="submit"
        >
          Register
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Actions } from '../constants/actions';
import { Messages } from '../constants/messages';

@Component
export default class Register extends Vue {
  emailRules = [{ type: 'email', message: Messages.email.invalid, trigger: ['blur', 'change'] }];
  user = {
    email: '',
    username: '',
    password: '',
  };

  get alert() {
    return this.$store.state.alert;
  }

  goToLoginPage() {
    this.$router.push('/login');
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.$store.dispatch(Actions.REGISTER, this.user);
  }
}
</script>

<style scoped></style>
