<template>
  <div class="Single">
    <header class="Single__header">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="24" justify="center">
          <div class="Single__logo Single__logo--header">
            <img class="Single__logo__img" src="../../core/images/choose-the-force_versao-01_vazado.svg" alt="Logo Aws"/>
          </div>
        </el-col>
      </el-row>
    </header>

    <div class="Single__carrousel">
      <div class="Single__carrousel__item">
        <el-row v-if="userSingle" type="flex" class="row-bg" justify="center">
          <el-col :span="3"></el-col>
          <el-col :span="12">
            <h2>{{userSingle.username}}</h2>
            <img class="Single__carrousel__item__picture" :src="userSingle.picture">
          </el-col>
          <el-col :span="3"></el-col>
          <el-col :span="12">
            <h2>{{userSingle.character_name}}</h2>
            <img class="Single__carrousel__item__picture" :src="userSingle.character_picture">
          </el-col>
          <el-col :span="3"></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';

  export default {
    name: 'single',
    data() {
      return {
        userSingle: null
      }
    },

    mounted() {
      this.getQueryParameterOrderId();
    },

    methods: {
      configRequestListUserOrderId(orderId) {
        return {
          method: 'get',
          url: `http://ec2-34-234-74-53.compute-1.amazonaws.com/ListResult?id=${orderId}`,
          headers: {'Content-Type': 'application/json' },
          json: true
        };
      },

      onRequestListUserOrderIdSuccess(res) {
        this.userSingle = res.data;
      },

      onRequestListUserOrderIdError(error) {
        console.log(error);
      },

      requestListUserOrderId(orderId) {
        let config = this.configRequestListUserOrderId(orderId);
        axios(config).then(
          res => this.onRequestListUserOrderIdSuccess(res),
          error => this.onRequestListUserOrderIdError(error)
        );
      },

      getQueryParameterOrderId() {
        let orderId = this.$route.params.id;
        this.requestListUserOrderId(orderId);
      }
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
