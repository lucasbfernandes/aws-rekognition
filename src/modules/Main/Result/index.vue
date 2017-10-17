<template>
  <div class="PageBox">
    <div class="PageBox__container">
      <header class="PageBox__header">
        <h2>{{ userClassification === 0 ? 'Lado da Luz!' : 'Lado Negro!'}} - {{ percentage }} |/\</h2>
      </header>
      <main>
		<el-row type="flex" class="row-bg" justify="center">
		  <el-col :span="7">
		    <el-card :body-style="{ padding: '0px' }">
		      <img :src="userPicture" class="image">
		      <div class="Result__name">
		        <span>{{ userName }}</span>
		      </div>
		    </el-card>
		  </el-col>
		  <el-col :span="7" :offset="2">
		    <el-card :body-style="{ padding: '0px' }">
		      <img :src="characterPicture" class="image">
		      <div class="Result__name">
		        <span>{{ characterName }}</span>
		      </div>
		    </el-card>
		  </el-col>
		</el-row>
      </main>
      <footer class="PageBox__footer">
        <el-button @click="requestAllowShareTv" class="PageBox__button--send-image" type="primary" size="large">TV</el-button>
        <el-button class="PageBox__button--send-image" type="primary" size="large">Facebook</el-button>
      </footer>
    </div>
  </div>
</template>
<script>
  import LocalStoragePersistence from '@core/utils/LocalStoragePersistence';
  import axios from 'axios';

  export default {
    name: 'result',
    data() {
      return {
        userClassification: LocalStoragePersistence.get('compareResult').classification,
        userPicture: LocalStoragePersistence.get('compareResult').picture,
        userName: LocalStoragePersistence.get('FBData').username.toLowerCase(),
        characterPicture: LocalStoragePersistence.get('compareResult').character_picture,
        characterName: LocalStoragePersistence.get('compareResult').character_name.toLowerCase(),
        percentage: LocalStoragePersistence.get('compareResult').percentage,
      };
    },
    methods: {
      fillPayloadRequestAllowShareTv() {
        return {
          id: LocalStoragePersistence.get('compareResult')['id'],
          allow_share: true
        };
      },

      configRequestAllowShareTv() {
        return {
          method: 'post',
          url: 'http://ec2-34-229-73-88.compute-1.amazonaws.com/AllowShareTv',
          data: this.fillPayloadRequestAllowShareTv(),
          headers: {'Content-Type': 'application/json' },
          json: true
        };
      },

      onRequestAllowShareSuccess(res) {
        console.log(res);
      },

      onRequestAllowShareError(error) {
        console.log(error);
      },

      requestAllowShareTv() {
        let config = this.configRequestAllowShareTv();
        axios(config).then(
          res => this.onRequestAllowShareSuccess(res),
          error => this.onRequestAllowShareError(error)
        );
      }
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
