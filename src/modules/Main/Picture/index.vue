<template>
  <div class="PageBox">
    <div class="PageBox__container">
      <header class="PageBox__header">
        <h2>Tire uma foto de perfil:</h2>
      </header>
      <main class="PageBox__upload">
        <el-upload
          class=""
          action=""
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onChangePicture">
          <img v-if="imageUrl" :src="imageUrl" class="PageBox__upload__picture">
          <i v-else class="el-icon-plus PageBox__upload__icon"></i>
        </el-upload>
      </main>
      <footer class="PageBox__footer">
        <el-button @click="onClickPrevious" class="PageBox__button--previous" type="primary" size="large">Voltar</el-button>
        <el-button class="PageBox__button--send-image" type="primary" size="large">Enviar</el-button>
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
