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
  import storage from '@core/utils/storage';

  export default {
    name: 'login',
    mounted() {
      this.checkLoginState();
    },
    methods: {
      doRedirectPage() {
        this.$router.push({ path: 'home' });
      },
      doSaveLoginInformation(response) {
        storage.set('FB', response);
        this.doRedirectPage();
      },
      doLogin() {
        FB.login(
          response => this.doSaveLoginInformation(response)
        )
      },
      checkLoginState() {
        let fbStorage = storage.get('FB');

        if (fbStorage && fbStorage.status === 'connected') {
          this.doRedirectPage();
        }
      }
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
