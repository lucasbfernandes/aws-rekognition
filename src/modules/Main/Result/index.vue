<template>
  <div class="PageBox">
    <div class="PageBox__container">
      <header class="PageBox__header">
        <h2 class="PageBox__title--0001">{{ userClassification === 0 ? 'Lado da Luz!' : 'Lado Negro!'}} - {{ percentage }} |/\</h2>
      </header>
      <main>
		<el-row type="flex" class="row-bg" justify="center">
		  <el-col :span="10">
		    <el-card class="Result__picture-card" :body-style="{ padding: '0px' }">
		      <img :src="userPicture" class="image Result__picture">
		    </el-card>
        <div class="Result__name">
          <span>{{ userName }}</span>
        </div>
		  </el-col>
		  <el-col :span="10" :offset="2">
		    <el-card class="Result__picture-card" :body-style="{ padding: '0px' }">
		      <img :src="characterPicture" class="image Result__picture">
		    </el-card>
        <div class="Result__name">
          <span>{{ characterName }}</span>
        </div>
		  </el-col>
		</el-row>
      </main>
      <footer class="PageBox__footer">
        <el-button @click="requestAllowShareTv" class="PageBox__button--send-image" type="primary" size="large">TV</el-button>
        <el-button @click="doShareFacebook" class="PageBox__button--send-image" type="primary" size="large">Facebook</el-button>
      </footer>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      size="large">
      <div class="PageBox__dialog">
        <h2>{{ messageModal }}</h2>
      </div> 
      <span slot="footer" class="dialog-footer">
        <div class="PageBox__footer">
          <el-button class="PageBox__button--send-image" type="primary" @click="renewing">Refazer teste</el-button>
          <el-button @click="doShareFacebook" class="PageBox__button--send-image" type="primary" size="large">Facebook</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
  
</template>
<script>
  import { mapActions } from 'vuex';
  import LocalStoragePersistence from '@core/utils/LocalStoragePersistence';
  import ValidationNotifications from '@core/utils/ValidationNotifications';
  import axios from 'axios';

  export default {
    name: 'result',
    data() {
      return {
        dialogVisible: false,
        messageModal: '',
        userClassification: LocalStoragePersistence.get('compareResult').classification,
        userPicture: LocalStoragePersistence.get('compareResult').picture,
        userName: LocalStoragePersistence.get('FBData').username.toLowerCase(),
        characterPicture: LocalStoragePersistence.get('compareResult').character_picture,
        characterName: LocalStoragePersistence.get('compareResult').character_name.toLowerCase(),
        percentage: parseFloat(LocalStoragePersistence.get('compareResult').percentage).toFixed(2),
      };
    },
    methods: {
      ...mapActions({
        setLoading: 'setLoading',
      }),

      configMessageForModal(position) {
        this.messageModal = `voce é o numero ${position}. corra para o estande voce pode ser o proximo!`;
      },

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

      openModal(res) {
        let id = res['order_id'];

        this.configMessageForModal(id);
        this.dialogVisible = true;
      },

      onRequestAllowShareSuccess(res) {
        this.setLoading(false);
        this.openModal(res.data);
      },

      onRequestAllowShareError(error) {
        this.setLoading(false);
        ValidationNotifications.showErrorMessage(this.$notify);
      },

      requestAllowShareTv() {
        let config = this.configRequestAllowShareTv();
        this.setLoading(true);
        axios(config).then(
          res => this.onRequestAllowShareSuccess(res),
          error => this.onRequestAllowShareError(error)
        );
      },

      dinamyGraphApi() {
        let meta = document.getElementsByTagName('meta'),
            squad = this.userClassification === 0 
                    ? 'Eu sou do lado luz!' 
                    : 'Eu sou do lado negro!';

        meta[3].setAttribute('content', squad);
        meta[4].setAttribute('content', 'Descubra de qual lado da força você está!');
      },

      shareOnFacebook() {
        FB.ui(
          {
            method: 'share', //Método para postar no Mural
            href: `
              http://app-hackaton.s3-website-us-east-1.amazonaws.com/single/${LocalStoragePersistence.get('compareResult')['id']}
            `,
            hashtag: '#MandicCloud'
          },
          response => {
             console.log(response); //Callback da função.
          }
        );
      },

      doShareFacebook() {
        this.dinamyGraphApi();
        this.shareOnFacebook();
      },

      renewing() {
        this.dialogVisible = false;
        this.$router.push({ path: 'picture' });
      }
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
