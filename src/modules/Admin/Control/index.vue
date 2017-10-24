<template>
  <div class="Control">
    <el-table
      v-if="listUsers"
      :data="listUsers"
      border
      style="width: 100%">
      <el-table-column
        label="Foto"
        width="180">
        <template scope="scope">
          <img :src="scope.row.picture" style="margin-left: 10px; width: 100%;">
        </template>
      </el-table-column>
      <el-table-column
        label="Username"
        >
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="gender"
        >
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.gender }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Operations">
        <template scope="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleBan(scope.$index, scope.row.user_id)">Banir</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleExclude(scope.$index, scope.row.id)">Excluir foto</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  import axios from 'axios';
  import SYSTEM from '@core/constants/system';
  import ValidationNotifications from '@core/utils/ValidationNotifications';

  export default {
    name: 'control',

    data() {
      return {
        listUsers: []
      }
    },

    mounted() {
      this.requestListUserTv();
    },

    methods: {
      ...mapActions({
        setLoading: 'setLoading',
      }),

      configForListUserTv() {
        return {
          method: 'get',
          url: 'http://ec2-52-91-50-100.compute-1.amazonaws.com/ListResult',
          headers: {'Content-Type': 'application/json' },
          json: true
        };
      },

      onRequestListUserTvSuccess(res) {
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

      fillPayloadRequestExcludeUser(id) {
        return {
          id: id,
          allow_share: false
        };
      },

      configRequestExcludeUser(id) {
        return {
          method: 'post',
          url: 'http://http://ec2-52-91-50-100.compute-1.amazonaws.com/AllowShareTv',
          data: this.fillPayloadRequestExcludeUser(id),
          headers: {'Content-Type': 'application/json' },
          json: true
        };
      },

      onRequestExcludeUserSuccess() {
        ValidationNotifications.showErrorMessage(this.$notify);
        this.requestListUserTv();
      },

      onRequestExcludeUserError() {
        ValidationNotifications.showErrorMessage(this.$notify);
      },


      requestExcludeUser(id) {
        let config = this.configRequestExcludeUser(id);
        this.setLoading(true);
        axios(config).then(
          res => this.onRequestExcludeUserSuccess(res),
          error => this.onRequestExcludeUserError(error)
        );
      },

      handleExclude(index, id) {
        this.requestExcludeUser(id);
      },      

      handleBan(index, row) {
        console.log(index);
        console.log(row);
      }
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>