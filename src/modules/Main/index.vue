<template>
  <div class="Main">
    <router-view></router-view>
    <header class="Main__header">
      <div class="Main__header__logo-container">
        <img class="Main__header__logo" src="/src/core/images/logo-star-wars.svg" alt="Logo Aws"/>
      </div>
    </header>
    <footer class="Main__footer">
      <div class="Main__footer__logo-container">
        <img class="Main__footer__logo" src="/src/core/images/logo-aws-2.svg" alt="Logo Aws"/>
        <img class="Main__footer__logo" src="/src/core/images/logo-mandic.png" alt="Logo Mandic"/>
      </div>
    </footer>
  </div>
</template>
<script>
  export default {
    name: 'main'
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
