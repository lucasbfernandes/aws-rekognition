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

      doSaveLoginInformation(res) {
        LocalStoragePersistence.set('FBLogin', res);
      },

      onLoginSuccess(res) {
        this.setLoading(false);
        if (res && res.authResponse) {
          this.doSaveLoginInformation(res);
          this.doRedirectHome();
        } else {
          ValidationNotifications.showErrorMessage(this.$notify);
        }
      },

      doLogin() { 
        this.setLoading(true);
        FB.login(res => this.onLoginSuccess(res));
      },
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
