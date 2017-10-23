<template>
  <div class="PageBox About">
    <div class="About__text-container titles">
      <div class="titlecontent">
        <p style="text-align: center;">
          <span>Choose the Force</span>
        </p>
        <p>
         A Mandic Cloud Solutions e a AWS apresentam em primeira mão uma solução divertida que mostra seu lado da força, de acordo com arquitetura serverless desenvolvida em parceria com alunos daUniversidade Federal de Uberlândia.
        </p>

        <p>
          Fale com um Especialista para conhecer detalhes da arquitetura e como o uso de soluções AWS gerenciadas pode contribuir com resultados significativos para seus negócios.
        </p>
      </div>
    </div>
    <div class="About__buttons">
      <el-button @click="onClickPrevious" class="PageBox__button--previous-2" type="primary" size="large">Voltar</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'about',
    methods: {
      onClickPrevious() {
        this.$router.push({ path: 'home' });
      },
    }
  }
</script>
<style lang="scss" scoped src="./style.scss"></style>
