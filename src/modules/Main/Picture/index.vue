<template>
  <div class="Picture">
    <el-row type="flex" class="row-bg" justify="center">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog v-model="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-button>Comparar</el-button>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'picture',
    data() {
        return {
          dialogImageUrl: '',
          dialogVisible: false
        };
      },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
