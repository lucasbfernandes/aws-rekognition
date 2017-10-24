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
          nextImageId: null
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

      formatErrorMessage(message) {
        if (message && message.indexOf('sem resultado') !== -1) {
          return 'Comparação sem resultado. Tente novamente com outra foto!';
        }

        return null;
      },

      onSendImageForClassificationSuccess(res) {
        this.setLoading(false);
        if (res && res.data.result === '200') {
          LocalStoragePersistence.set('compareResult', res.data);
          this.doRedirectResult();
        } else {
          ValidationNotifications.showErrorMessage(this.$notify, this.formatErrorMessage(res.data.description));
        }
      },

      onSendImageForClassificationError(error) {
        this.setLoading(false);
        ValidationNotifications.showErrorMessage(this.$notify);
      },

      getSendImageForClassificationRequestConfig(requestParams) {
        return {
          method: 'post',
          url: 'http://ec2-52-91-50-100.compute-1.amazonaws.com/Comparer',
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
          'id': pictureId ? pictureId : '',
          'birthday': JSON.parse(localStorage.getItem('FBData')).birthday,
          'email': JSON.parse(localStorage.getItem('FBData')).email,
          'username': JSON.parse(localStorage.getItem('FBData')).username,
          'gender': JSON.parse(localStorage.getItem('FBData')).gender,
          'hometown': JSON.parse(localStorage.getItem('FBData')).hometown,
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

      uploadImageToS3() {
        this.setLoading(true);
        AwsSdk.uploadS3(this.currentImage, this.nextImageId).then(
          res => this.onUploadImageToS3Success(res, this.nextImageId),
          err => this.onUploadImageToS3Error(err)
        );
      },

      doSaveUserInformation(data) {
        LocalStoragePersistence.set('FBData', data);
      },

      getParsedUserInformation(data) {
        return {
          'user_id': data && data.id ? data.id : '',
          'birthday': '',
          'email': '',
          'username': data && data.name ? data.name : '',
          'gender': data && data.gender ? data.gender : '',
          'hometown': '',
          'last_access': ''
        }
      },

      onRetrieveUserInformationSuccess(res) {
        this.setLoading(false);
        this.userInformation = this.getParsedUserInformation(res);
        this.doSaveUserInformation(this.userInformation);
        this.uploadImageToS3();
      },

      doRetrieveUserInformation() {
        this.setLoading(true);
        FB.api('/me', {fields: 'id, name, gender'},
          res => this.onRetrieveUserInformationSuccess(res)
        );
      },

      onGetImageIdSuccess(res) {
        this.setLoading(false);
        if (res.data.id >= 0) {
          this.nextImageId = res.data.id;
          this.doRetrieveUserInformation();
        } else {
          ValidationNotifications.showErrorMessage(
            this.$notify,
            'O envio da imagem não foi permitido para a sua conta.'
          );
        }
      },

      onGetImageIdError(error) {
        this.setLoading(false);
        ValidationNotifications.showErrorMessage(this.$notify);
      },

      getImageIdRequestConfig(requestParams) {
        let userId = JSON.parse(localStorage.getItem('FBLogin')).authResponse.userID;
        return {
          method: 'get',
          url: `http://ec2-52-91-50-100.compute-1.amazonaws.com/GetId?userid=${userId}`,
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

      onClickSendImage() {
        if (this.currentImage) {
          this.getImageId();
        } else {
          ValidationNotifications.showErrorMessage(this.$notify, 'Selecione uma imagem para prosseguir no fluxo.');
        }
      }
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
