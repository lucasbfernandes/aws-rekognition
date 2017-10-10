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
    methods: {
      checkLoginState() {
        FB.login(function(response){
          storage.set('FB', response);
        });
      }
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
