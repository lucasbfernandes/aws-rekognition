<template>
  <div class="Login">
    <div class="Login__box">
      <header>
      </header>
      <main>
        <el-button 
          @click="checkLoginState"
          type="primary">Logar com facebook</el-button>
      </main>
      <footer>
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
      doSaveLoginInformation() {
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
        } else {
          this.doLogin();
        }
      }
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
