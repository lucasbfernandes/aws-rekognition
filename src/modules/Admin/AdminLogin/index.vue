<template>
  <div class="AdminLogin">
    <el-row type="flex" class="row-bg" justify="center">
      <div class="AdminLogin__login">
        <el-form ref="form">
          <el-form-item label="Usuário">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="Senha">
            <el-input v-model="password"></el-input>
          </el-form-item>
          <el-alert
            class="AdminLogin__login__error"
            v-if="showError"
            title="Usuário ou senha invalidos"
            type="error"
            :closable="false"
            show-icon>
          </el-alert>
          <el-form-item>
            <el-button
              @click="onClick"
              class="PageBox__button--send-image" 
              type="primary" 
              size="large">
              Logar
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'admin-login',
    data() {
      return {
        username: null,
        password: null,
        showError: false,
      }
    },
    methods: {
      onClick() {
        if (this.username === 'admin' && this.password === 'aws') {
          this.showError = false;
          this.$router.push({ path: 'slider' });
        } else {
          this.showError = true;
        }
      }
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>