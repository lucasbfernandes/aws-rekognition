<template>
  <div class="Slider">
    <div class="Slider__carrousel">
      <el-carousel v-if="showSlider" indicator-position="none"  :interval="4000" height="650px">
        <el-carousel-item v-for="item in listUsers" :key="item.order_id" >
          <div class="Slider__carrousel__item">
            <el-row type="flex" class="row-bg" justify="center">
              <h2 class="PageBox__title--0002">{{ item.classification === 0 ? 'Lado da Luz!' : 'Lado Negro!'}} - {{ parseFloat(item.percentage).toFixed(2) }}|/\</h2>
            </el-row>
            <el-row type="flex" class="row-bg" justify="center">
              <el-col :span="3"></el-col>
              <el-col :span="12">
                <h2 class="Slider__name">{{item.username.toLowerCase()}}</h2>
                <img class="Slider__carrousel__item__picture" :src="item.picture">
              </el-col>
              <el-col :span="3">
                <span class="Slider__carrousel__text">{{item.order_id}}</span>
              </el-col>
              <el-col :span="12">
                <h2 class="Slider__name" >{{item.character_name.toLowerCase()}}</h2>
                <img class="Slider__carrousel__item__picture" :src="item.character_picture">
              </el-col>
              <el-col :span="3"></el-col>
            </el-row>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  import axios from 'axios';
  import SYSTEM from '@core/constants/system';
  import ValidationNotifications from '@core/utils/ValidationNotifications';
  import LocalStoragePersistence from '@core/utils/LocalStoragePersistence';

  export default {
    name: 'slider',

    data() {
      return {
        listUsers: [],
        showSlider: false
      }
    },

    mounted() {
      this.verifyIsLogged();
      this.setLoading(true);
      this.reactorForRequest();
    },

    methods: {
      ...mapActions({
        setLoading: 'setLoading',
      }),

      verifyIsLogged() {
        let session = LocalStoragePersistence.get('admin-session');

        if (!session) {
          this.$router.push({ path: 'admin-login' });
        }

        return;
      },

      configForListUserTv() {
        return {
          method: 'get',
          url: 'http://ec2-34-234-74-53.compute-1.amazonaws.com/ListResult',
          headers: {'Content-Type': 'application/json' },
          json: true
        };
      },

      onRequestListUserTvSuccess(res) {
        this.setLoading(false);
        this.verifyRedering();
        this.listUsers = res.data;
      },

      onRequestListUserTvError(error) {
        ValidationNotifications.showErrorMessage(this.$notify);
      },

      requestListUserTv() {
        let config = this.configForListUserTv();
        axios(config).then(
          res => this.onRequestListUserTvSuccess(res),
          error => this.onRequestListUserTvError(error)
        );
      },

      verifyRedering() {
        if (this.listUsers.length > 0) {
          this.showSlider = true;
        }
      },

      reactorForRequest() {
        setTimeout( res => {
          this.requestListUserTv();
          this.reactorForRequest();
        }, SYSTEM.TIME_FOR_REQUEST );
      },

    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
