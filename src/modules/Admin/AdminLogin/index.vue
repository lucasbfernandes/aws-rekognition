<template>
  <div class="AdminLogin">
    <el-row type="flex" class="row-bg" justify="center">
      <div class="AdminLogin__login">
        <el-form ref="form">
          <el-form-item label="Usuário">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="Senha">
            <el-input></el-input>
          </el-form-item>
          <el-form-item>
            <el-button 
            class="PageBox__button--send-image" type="primary" size="large">
              Logar
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'admin-login',
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>