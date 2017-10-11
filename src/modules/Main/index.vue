<template>
  <div class="Main">
    <header class="Main__header">
      <el-row type="flex" class="row-bg" justify="start">
        <el-col :span="24">
          <div class="Main__logo Main__logo--header">
            <img class="Main__logo__img" src="/src/core/images/logo-star-wars.svg" alt="Logo Aws"/>
          </div>
        </el-col>
      </el-row>
    </header>
    <router-view></router-view>
    <footer class="Main__footer">
      <el-row type="flex" class="row-bg" justify="end">
        <el-col :span="24">
          <div class="Main__logo Main__logo--footer">
            <img class="Main__logo__img" src="/src/core/images/logo-aws-2.svg" alt="Logo Aws"/>
            <img class="Main__logo__img" src="/src/core/images/logo-mandic.png" alt="Logo Mandic"/>
          </div>
        </el-col>
      </el-row>
    </footer>
  </div>
</template>
<script>
  export default {
    name: 'main'
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>