<template>
  <div class="container">
    <el-form
      ref="user"
      :model="user"
      class="login-form"
      label-position="top"
      label-width="5rem">
      <el-alert
        v-if="alert.message"
        :title="alert.message"
        :type="alert.type"
        show-icon />
      <div class="title-container">
        <h3 class="title">
          Login
        </h3>
      </div>
      <el-form-item
        :rules="emailRules"
        label="Email"
        prop="email">
        <el-input v-model="user.email" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          v-model="user.password"
          type="password" />
      </el-form-item>
      <el-form-item>
        <el-button
          @click="handleSubmit(user)"
          :disabled="loggingIn || !user.email || !user.password"
          class="login-button"
          type="primary">
          Login
        </el-button>
      </el-form-item>
      <div class="register-text">
        or you want to
        <router-link to="/register">
          register
        </router-link>?
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
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
}
</script>

<style scoped>
.login-form {
  position: relative;
  width: 30rem;
  max-width: 100%;
  padding: 12rem 3rem 0;
  margin: 0 auto;
  overflow: hidden;
}

.title-container {
  position: relative;
}

.title {
  font-size: 2rem;
  color: #eee;
  text-align: center;
  font-weight: bold;
}

.login-button {
  width: 100%;
}
.register-text {
  float: right;
  color: #eee;
}
</style>
