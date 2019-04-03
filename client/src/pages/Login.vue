<template>
  <div class="login-container">
    <el-form class="login-form" label-position="right" label-width="7rem">
      <el-alert
        v-if="alert.message"
        :title="alert.message"
        :type="alert.type"
        show-icon>
      </el-alert>
      <div class="title-container">
        <h3 class="title">
          Login
        </h3>
      </div>
      <el-form-item label="Email Address">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="user.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleSubmit(user)"
          :disabled="loggingIn || !user.email || !user.password">
          Login
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { UserService } from '../services/user-service';

  @Component({})
  export default class Login extends Vue {
    userService = new UserService();
    user = {
      email: '',
      password: ''
    };

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
  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: #2d3a4b;
    overflow: hidden;
  }

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
</style>
