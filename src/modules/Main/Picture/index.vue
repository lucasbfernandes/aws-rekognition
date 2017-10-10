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
          :on-change="handlePictureUploadChange"
          :on-remove="handlePictureRemoval"
          :file-list="picturesList"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
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
        picturesList: [],
        acceptedMimeTypesArray: ['image/jpg', 'image/jpeg', 'image/png'],
      }
    },
    methods: {
     handlePictureRemoval() {
        this.picturesList = [];
      },

      handlePictureUploadChange(file, fileList) {
        if (this.acceptedMimeTypesArray.indexOf(file.raw.type) !== -1) {
          this.picturesList = fileList.slice(-1);
        } else {
          if (this.picturesList.length) {
            this.picturesList = fileList.slice(0, 1);
          } else {
            this.picturesList = [];
          }
        }
      },
    },
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
