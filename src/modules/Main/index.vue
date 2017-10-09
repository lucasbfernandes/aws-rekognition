<template>
  <div class="Main">
    <router-view></router-view>
    <footer class="Main__footer">
      <div class="Main__partners-container">
        <img class="Main__logo" src="/src/core/images/logo-aws-2.svg" alt="Logo Aws"/>
        <img class="Main__logo" src="/src/core/images/logo-mandic.png" alt="Logo Mandic"/>
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
