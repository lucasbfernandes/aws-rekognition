<template>
  <div class="Admin">
    <header class="Admin__header">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="24" justify="center">
          <div class="Admin__logo Admin__logo--header">
            <img class="Admin__logo__img" src="../../core/images/logo-star-wars.svg" alt="Logo Aws"/>
          </div>
        </el-col>
      </el-row>
    </header>

    <div class="Admin__carrousel">
      <el-carousel indicator-position="none"  :interval="4000" height="650px">
        <el-carousel-item v-for="item in listUsers" :key="item.order_id" >
          <div class="Admin__carrousel__item">
            <el-row type="flex" class="row-bg" justify="center">
              <el-col :span="3"></el-col>
              <el-col :span="12">
                <h2>{{item.username}}</h2>
                <img class="Admin__carrousel__item__picture" :src="item.picture">
              </el-col>
              <el-col :span="3">
                <span class="Admin__carrousel__text">{{item.order_id}}</span>
              </el-col>
              <el-col :span="12">
                <h2>{{item.character_name}}</h2>
                <img class="Admin__carrousel__item__picture" :src="item.character_picture">
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

  export default {
    name: 'admin',

    data() {
      return {
        listUsers: null,
      }
    },

    mounted() {
      this.reactorForRequest();
    },

    methods: {
      ...mapActions({
        setLoading: 'setLoading',
      }),

      configForListUserTv() {
        return {
          method: 'get',
          url: 'http://ec2-34-229-73-88.compute-1.amazonaws.com/ListResult',
          headers: {'Content-Type': 'application/json' },
          json: true
        };
      },

      onRequestListUserTvSuccess(res) {
        this.listUsers = res.data;
      },

      onRequestListUserTvError(error) {
        console.log(error);
      },

      requestListUserTv() {
        let config = this.configForListUserTv();
        axios(config).then(
          res => this.onRequestListUserTvSuccess(res),
          error => this.onRequestListUserTvError(error)
        );
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
