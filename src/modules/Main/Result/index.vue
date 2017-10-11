<template>
  <div class="PageBox">
    <div class="PageBox__container">
      <header class="PageBox__header">
        <h2>Lado Negro!</h2>
      </header>
      <main>
		<el-row type="flex" class="row-bg" justify="center">
		  <el-col :span="7">
		    <el-card :body-style="{ padding: '0px' }">
		      <img src="https://vignette3.wikia.nocookie.net/starwars/images/1/15/Luke_Skywalker_Ep_7_SWCT.png/revision/latest?cb=20161230081329" class="image">
		      <div class="Result__name">
		        <span>Luke Skywalker</span>
		      </div>
		    </el-card>
		  </el-col>
		  <el-col :span="7" :offset="2">
		    <el-card :body-style="{ padding: '0px' }">
		      <img src="https://vignette3.wikia.nocookie.net/starwars/images/1/15/Luke_Skywalker_Ep_7_SWCT.png/revision/latest?cb=20161230081329" class="image">
		      <div class="Result__name">
		        <span>Luke Skywalker</span>
		      </div>
		    </el-card>
		  </el-col>
		</el-row>
      </main>
      <footer class="PageBox__footer">
        <el-button class="PageBox__button--previous" type="primary" size="large">Voltar</el-button>
        <el-button class="PageBox__button--send-image" type="primary" size="large">Enviar para a TV</el-button>
        <el-button class="PageBox__button--send-image" type="primary" size="large">Compartilhar no Facebook</el-button>
      </footer>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'result',
    methods: {
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
