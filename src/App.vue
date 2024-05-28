<template>
  <h1>Colors Tic Tac Toe</h1>
  <div class="top">
    <section class="game">
      <GameBoard />
    </section>
    <section class="ranking">
      <RankingList />
    </section>
  </div>
</template>

<script>
import GameBoard from "./components/GameBoard.vue"
import RankingList from "./components/RankingList.vue"

export default {
  name: 'App',
  components: {
    GameBoard,
    RankingList
  }
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 30px;;
}

.top {
  display: flex;
}
.game {
  flex-grow: 1;
}
.ranking {

}
.form {

}
</style>
