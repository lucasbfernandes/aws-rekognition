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
          <i v-else class="el-icon-plus Picture__main__upload__icon"></i>
        </el-upload>
      </main>
      <footer class="Picture__footer">
        <el-button @click="onClickPrevious" class="Picture__footer__button--previous" type="primary" size="large">Voltar</el-button>
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
      onClickPrevious() {
        this.$router.push({ path: 'home' });
      }
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
