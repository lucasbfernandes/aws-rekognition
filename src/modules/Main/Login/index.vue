<template>
  <div class="Login">
    <div class="Login__box">
      <header class="Login__box__header">
        <h1>qual o seu lado da força?</h1>
      </header>
      <main>
        <el-button 
          @click="doLogin"
          type="primary">Logar com facebook</el-button>
      </main>
      <footer class="Login__footer">
        <el-button class="Login__footer__button" type="primary" size="large">Entre com o Facebook</el-button>
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
