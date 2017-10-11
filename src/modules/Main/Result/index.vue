<template>
  <div class="PageBox">
    <div class="PageBox__container">
      <header class="PageBox__header">
        <h2>{{ userClassification === 0 ? 'Lado da Luz!' : 'Lado Negro!'}} - {{ percentage }}</h2>
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
        <el-button class="PageBox__button--previous" type="primary" size="large">Voltar</el-button>
        <el-button class="PageBox__button--send-image" type="primary" size="large">TV</el-button>
        <el-button class="PageBox__button--send-image" type="primary" size="large">Facebook</el-button>
      </footer>
    </div>
  </div>
</template>
<script>
  import LocalStoragePersistence from '@core/utils/LocalStoragePersistence';

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
    mounted() {
      this.fillUserInformation();
    },
    methods: {
      clearUserInformation() {
        this.userClassification = null;
        this.userPicture = null;
        this.userName = null;
        this.characterPicture = null;
        this.characterName = null;
        this.percentage = null;
      },
      fillUserInformation() {
        this.userClassification = LocalStoragePersistence.get('compareResult').classification;
        this.userPicture = LocalStoragePersistence.get('compareResult').picture;
        this.userName = LocalStoragePersistence.get('FBData').username;
        this.characterPicture = LocalStoragePersistence.get('compareResult').character_picture;
        this.characterName = LocalStoragePersistence.get('compareResult').character_name;
        this.percentage = LocalStoragePersistence.get('compareResult').percentage;
      },
      onClickPrevious() {
        this.$router.push({ path: 'picture' });
      }
    },
    beforeDestroy() {
      this.clearUserInformation();
    },
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
