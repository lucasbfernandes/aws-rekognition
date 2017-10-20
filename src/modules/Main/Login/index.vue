<template>
  <div class="PageBox">
    <div class="PageBox__container">
      <header class="PageBox__header">
        <h1>qual o seu lado da força?</h1>
      </header>
      <main>

      </main>
      <footer class="PageBox__footer">
        <el-button @click="doLogin" class="PageBox__button--fb-login" type="primary" size="large">Entre com o Facebook</el-button>
      </footer>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  import LocalStoragePersistence from '@core/utils/LocalStoragePersistence';
  import ValidationNotifications from '@core/utils/ValidationNotifications';
  import axios from 'axios';

  export default {
    name: 'login',
    methods: {
      ...mapActions({
        setLoading: 'setLoading',
      }),

      doRedirectHome() {
        this.$router.push({ path: 'home' });
      },

      onDoPushUserInformationSuccess(res) {
        this.setLoading(false);
        if (res && res.data.result === '200') {
          this.doRedirectHome();
        } else {
            ValidationNotifications.showErrorMessage(this.$notify);
        }
      },

      onDoPushUserInformationError(error) {
        this.setLoading(false);
        ValidationNotifications.showErrorMessage(this.$notify);
      },

      getDoPushUserInformationRequestConfig(requestParams) {
        return {
          method: 'post',
          url: 'http://ec2-34-229-73-88.compute-1.amazonaws.com/Register',
          data: requestParams,
          headers: {'Content-Type': 'application/json' },
          json: true
        };
      },

      doPushUserInformation(params) {
        let config = this.getDoPushUserInformationRequestConfig(params);
        this.setLoading(true);
        axios(config).then(
          res => this.onDoPushUserInformationSuccess(res),
          error => this.onDoPushUserInformationError(error)
        );
      },

      getDoPushUserInformationParams(data) {
        return {
          'user_id': data && data.id ? data.id : '',
          'birthday': '',
          'email': '',
          'username': data && data.name ? data.name : '',
          'gender': data && data.gender ? data.gender : '',
          'hometown': '',
          'last_access': ''
        }
      },

      onRetrieveUserInformationSuccess(res) {
        let params = this.getDoPushUserInformationParams(res);
        this.doSaveUserInformation(params);
        this.doPushUserInformation(params);
      },

      doRetrieveUserInformation() {
        FB.api('/me', {fields: 'id, name, gender'},
          res => this.onRetrieveUserInformationSuccess(res)
        );
      },

      doSaveUserInformation(data) {
        LocalStoragePersistence.set('FBData', data);
      },

      doSaveLoginInformation(res) {
        LocalStoragePersistence.set('FBLogin', res);
        this.doRetrieveUserInformation();
      },

      onLoginSuccess(res) {
        if (res.authResponse) {
          this.doSaveLoginInformation(res);
        }
      },

      doLogin() { 
        FB.login(res => this.onLoginSuccess(res));
      },
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
