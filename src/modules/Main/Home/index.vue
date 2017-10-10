<template>
  <div class="Home">
    <div class="Home__box">
      <header class="Home__box__header">
        <h2>baseado em uma foto sua, conseguimos dizer de qual lado da força você está!</h2>
      </header>
      <main>
      </main>
      <footer class="Home__footer">
        <el-button @click="onClickAbout" class="Home__footer__button--info" type="primary" size="large">Saiba mais</el-button>
        <el-button @click="onClickNext" class="Home__footer__button--picture" type="primary" size="large">Descubra</el-button>
      </footer>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'home',
    methods: {
      onClickNext() {
        this.$router.push({ path: 'picture' });
      },
      onClickAbout() {
        this.$router.push({ path: 'about' });
      }
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
