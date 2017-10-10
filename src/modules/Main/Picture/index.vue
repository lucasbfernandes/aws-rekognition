<template>
  <div class="Picture">
    <div class="Picture__box">
      <header class="Picture__box__header">
        <h2>Tire uma foto de perfil:</h2>
      </header>
      <main class="Picture__main">
        <el-upload
          class="Picture__main__upload"
          action=""
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onChangePicture">
          <img v-if="imageUrl" :src="imageUrl" class="Picture__main__picture">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </main>
      <footer class="Picture__footer">
        <el-button class="Picture__footer__button--send" type="primary" size="large">Enviar</el-button>
      </footer>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'picture',
    data() {
      return {
          imageUrl: '',
      }
    },
    methods: {
      onChangePicture(file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
