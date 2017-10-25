<template>
  <div class="AdminLogin">
    <el-row type="flex" class="row-bg" justify="center">
      <div class="AdminLogin__login">
        <el-form ref="form">
          <el-form-item label="Usuário">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="Senha">
            <el-input type="password" v-model="password"></el-input>
          </el-form-item>
          <el-alert
            class="AdminLogin__login__error"
            v-if="showError"
            title="Usuário ou senha invalidos"
            type="error"
            :closable="false"
            show-icon>
          </el-alert>
          <el-row type="flex" class="row-bg" justify="center">
            <el-button
              @click="onClick('slider')"
              class="PageBox__button--send-image AdminLogin__login__button" 
              type="primary" 
              size="large">
              Logar para slider
            </el-button>
          </el-row>
          <el-row type="flex" class="row-bg" justify="center">
            <el-button
              @click="onClick('control')"
              class="PageBox__button--send-image AdminLogin__login__button" 
              type="primary" 
              size="large">
              Logar para controle
            </el-button>
          </el-row>
        </el-form>
      </div>
    </el-row>
  </div>
</template>
<script>
  import LocalStoragePersistence from '@core/utils/LocalStoragePersistence';
  import axios from 'axios';

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

      requestLoginConfig(requestParams) {
        return {
          method: 'post',
          url: 'http://ec2-34-234-74-53.compute-1.amazonaws.com/Pass',
          data: requestParams,
          headers: {'Content-Type': 'application/json' },
          json: true
        };
      },

      doLogin(type) {
        let payload = { 
          username: this.username, 
          senha: btoa(this.password)
        };
        this.requestLogin(payload, type);
      },

      doRedirectPage(type) {
        if (type === 'slider') {
          this.$router.push({ path: 'slider' });
        } else {
          this.$router.push({ path: 'control' });
        }
      },

      requestLoginSuccess(res, type) {
        if (res.data.result === '200') {
          this.showError = false;
          LocalStoragePersistence.set('admin-session', 'true');
          this.doRedirectPage(type);
        } else {
          this.showError = true;
        }
      },

      requestLoginError(error) {

      },

      requestLogin(params, type) {
        let config = this.requestLoginConfig(params);
        axios(config).then(
          res => this.requestLoginSuccess(res, type),
          error => this.requestLoginError(error)
        );
      },

      onClick(type) {
        this.doLogin(type);
      },

    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>