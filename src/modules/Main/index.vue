<template>
  <div class="Main">
    <header class="Main__header">
      <el-row type="flex" class="row-bg" justify="start">
        <el-col :span="12">
          <div class="Main__logo Main__logo--header Main__logo--header--left">
            <img class="Main__logo__img__logo" src="../../core/images/choose-the-force_versao-01_vazado.svg" alt="Logo Aws"/>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="Main__logo Main__logo--header Main__logo--header--right">
            <span v-if="isNotLoginPage()" @click="doLogout" class="Main__logout__text">Sair</span>
          </div>
        </el-col>
      </el-row>
    </header>
    <router-view></router-view>
    <footer class="Main__footer">
      <el-row type="flex" class="row-bg" justify="end">
        <el-col :span="24">
          <div class="Main__logo Main__logo--footer">
            <img class="Main__logo__img__aws" src="../../core/images/aws_logo.png" alt="Logo Aws"/>
            <img class="Main__logo__img" src="../../core/images/logo-mandic.png" alt="Logo Mandic"/>
          </div>
        </el-col>
      </el-row>
    </footer>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  import LocalStoragePersistence from '@core/utils/LocalStoragePersistence';

  export default {
    name: 'main',
    methods: {
      ...mapActions({
        setLoading: 'setLoading',
      }),
      resetUserData() {
        LocalStoragePersistence.remove('FBLogin');
        LocalStoragePersistence.remove('FBData');
        this.setLoading(false);
        this.$router.push({ path: '/login' });
      },
      doLogout() {
        this.setLoading(true);
        FB.logout((response) => {
          this.resetUserData();
        });
      },
      isNotLoginPage() {
        return this.$route.path.indexOf('login') === -1;
      }
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>