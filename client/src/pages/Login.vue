<template>
  <div class="container">
    <el-row type="flex" class="row-bg" justify="end" style="padding-top: 1rem">
      <el-col :span="2">
        <el-button @click="goToRegisterPage" type="primary">
          Sign Up
        </el-button>
      </el-col>
    </el-row>
    <el-form ref="user" :model="user" class="user-form" label-position="top" label-width="5rem">
      <el-alert v-if="alert.message" :title="alert.message" :type="alert.type" show-icon />
      <div class="user-form-title-container">
        <h3 class="user-form-title ">
          Sign In
        </h3>
      </div>
      <el-form-item :rules="emailRules" label="Email" prop="email">
        <el-input v-model="user.email" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="user.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button
          @click="handleSubmit(user)"
          :disabled="loggingIn || !user.email || !user.password"
          class="user-form-button"
          type="primary"
          native-type="submit"
        >
          Login
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  emailRules = [{ type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }];
  user = {
    email: '',
    password: '',
  };

  created() {
    this.$store.dispatch('alert/clear');
  }

  get alert() {
    return this.$store.state.alert;
  }

  get loggingIn() {
    return this.$store.state.authentication.status.loggingIn;
  }

  handleSubmit(user: any) {
    this.$store.dispatch('authentication/login', user);
  }

  goToRegisterPage() {
    this.$router.push('/register');
  }
}
</script>

<style scoped></style>
