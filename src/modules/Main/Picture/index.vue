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
          // TODO validations
        }
      },

      onSendImageForClassificationError(error) {
        this.setLoading(false);
        // TODO validations
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

      getSendImageParams(base64Image) {
        return {
          'user_id': JSON.parse(localStorage.getItem('FBLogin')).authResponse.userID,
          'picture': base64Image ? base64Image : ''
        }
      },

      onBase64CalculationReady(readerEvent) {
        let base64Image = btoa(readerEvent.target.result),
            params = this.getSendImageParams(base64Image);
        this.sendImageForClassification(params);
      },

      calculateCurrentImageBase64() {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(this.currentImage);
        return fileReader;
      },

      doCalculateCurrentImageBase64() {
        let fileReader = this.calculateCurrentImageBase64();
        fileReader.onload = readerEvent => this.onBase64CalculationReady(readerEvent);
      },

      onClickSendImage() {
        this.doCalculateCurrentImageBase64();
      }
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
