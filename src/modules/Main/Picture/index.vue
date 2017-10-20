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
        <el-button @click="onClickSendImage" class="PageBox__button--send-image" type="primary" size="large">Enviar</el-button>
      </footer>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  import LocalStoragePersistence from '@core/utils/LocalStoragePersistence';
  import ValidationNotifications from '@core/utils/ValidationNotifications';
  import AwsSdk from '@core/utils/AwsSdk';
  import axios from 'axios';

  export default {
    name: 'picture',
    data() {
      return {
          imageUrl: '',
          currentImage: null,
      }
    },
    mounted() {
      this.doRemoveItemStorage();
    },
    methods: {
      ...mapActions({
        setLoading: 'setLoading',
      }),

      doRemoveItemStorage() {
        LocalStoragePersistence.remove('compareResult');
      },

      doRedirectResult() {
        this.$router.push({ path: 'result' });
      },

      onChangePicture(file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.currentImage = file.raw;
      },

      onClickPrevious() {
        this.$router.push({ path: 'home' });
      },

      onSendImageForClassificationSuccess(res) {
        this.setLoading(false);
        if (res && res.data.result === '200') {
          LocalStoragePersistence.set('compareResult', res.data);
          this.doRedirectResult();
        } else {
          ValidationNotifications.showErrorMessage(this.$notify);
        }
      },

      onSendImageForClassificationError(error) {
        this.setLoading(false);
        ValidationNotifications.showErrorMessage(this.$notify);
      },

      getSendImageForClassificationRequestConfig(requestParams) {
        return {
          method: 'post',
          url: 'http://ec2-34-229-73-88.compute-1.amazonaws.com/Comparer',
          data: requestParams,
          headers: {'Content-Type': 'application/json' },
          json: true
        };
      },

      sendImageForClassification(params) {
        let config = this.getSendImageForClassificationRequestConfig(params);
        this.setLoading(true);
        axios(config).then(
          res => this.onSendImageForClassificationSuccess(res),
          error => this.onSendImageForClassificationError(error)
        );
      },

      getSendImageForClassificationParams(pictureId) {
        return {
          'user_id': JSON.parse(localStorage.getItem('FBLogin')).authResponse.userID,
          'id': pictureId ? pictureId : ''
        }
      },

      onUploadImageToS3Success(res, pictureId) {
        this.setLoading(false);
        let params = this.getSendImageForClassificationParams(pictureId);
        this.sendImageForClassification(params);
      },

      onUploadImageToS3Error(err) {
        this.setLoading(false);
        ValidationNotifications.showErrorMessage(this.$notify);
      },

      uploadImageToS3(pictureId) {
        this.setLoading(true);
        AwsSdk.uploadS3(this.currentImage, pictureId).then(
          res => this.onUploadImageToS3Success(res, pictureId),
          err => this.onUploadImageToS3Error(err)
        );
      },

      onGetImageIdSuccess(res) {
        this.setLoading(false);
        this.uploadImageToS3(res.data.id);
      },

      onGetImageIdError(error) {
        this.setLoading(false);
        ValidationNotifications.showErrorMessage(this.$notify);
      },

      getImageIdRequestConfig(requestParams) {
        return {
          method: 'get',
          url: 'http://ec2-34-229-73-88.compute-1.amazonaws.com/GetId',
          data: requestParams,
          headers: {'Content-Type': 'application/json' },
          json: true
        };
      },

      getImageId(params) {
        this.setLoading(true);
        let config = this.getImageIdRequestConfig(params);
        axios(config).then(
          res => this.onGetImageIdSuccess(res),
          error => this.onGetImageIdError(error)
        );
      },

      getImageIdParams() {
        return {};
      },

      onClickSendImage() {
        let params = this.getImageIdParams();
        this.getImageId(params);
      }
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
