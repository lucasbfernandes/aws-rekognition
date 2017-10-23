<template>
  <div class="Admin">
  	<header class="Admin__header">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="24" justify="center">
          <div class="Admin__logo Admin__logo--header">
            <img class="Admin__logo__img" src="../../core/images/choose-the-force_versao-01_vazado.svg" alt="Logo Aws"/>
          </div>
        </el-col>
      </el-row>
    </header>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'admin',
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>