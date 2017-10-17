<template>
  <div class="Main">
    <header class="Main__header">
      <el-row type="flex" class="row-bg" justify="start">
        <el-col :span="12">
          <div class="Main__logo Main__logo--header Main__logo--header--left">
            <img class="Main__logo__img" src="../../core/images/logo-star-wars.svg" alt="Logo Aws"/>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="Main__logo Main__logo--header Main__logo--header--right">
            <span @click="doLogout" class="Main__logout__text">Sair</span>
          </div>
        </el-col>
      </el-row>
    </header>
    <router-view></router-view>
    <footer class="Main__footer">
      <el-row type="flex" class="row-bg" justify="end">
        <el-col :span="24">
          <div class="Main__logo Main__logo--footer">
            <img class="Main__logo__img" src="../../core/images/logo-aws-2.svg" alt="Logo Aws"/>
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

      doLogout() {
        this.setLoading(true);
        FB.logout((response) => {
          this.setLoading(false);
          LocalStoragePersistence.remove('FBLogin');
          LocalStoragePersistence.remove('FBData');
          this.$router.push({ path: '/login' });
        });
      }
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>