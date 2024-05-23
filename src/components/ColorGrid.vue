<template>
  <div class="tic-tac-toe">
    <table>
      <tbody>
        <tr v-for="(row, rowIndex) in grid" :key="rowIndex">
          <td
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            :style="getCellStyle(cell)"
            @click="makeMove(rowIndex, colIndex)"
          ></td>
        </tr>
      </tbody>
    </table>
    <div v-if="winner" class="winner">
      Winner: {{ winner === 1 ? 'Player 1' : 'Player 2' }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'TicTacToe',
  props: {
    player1Color: {
      type: String,
      required: true,
    },
    player2Color: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const grid = ref([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    const currentPlayer = ref(1);
    const winner = ref(null);

    const makeMove = (rowIndex, colIndex) => {
      if (grid.value[rowIndex][colIndex] === '' && !winner.value) {
        grid.value[rowIndex][colIndex] = currentPlayer.value;
        if (checkWinner()) {
          winner.value = currentPlayer.value;
          emit('winner', winner.value);
        } else {
          currentPlayer.value = currentPlayer.value === 1 ? 2 : 1;
        }
      }
    };

    const checkWinner = () => {
      const lines = [
        // Rows
        [grid.value[0][0], grid.value[0][1], grid.value[0][2]],
        [grid.value[1][0], grid.value[1][1], grid.value[1][2]],
        [grid.value[2][0], grid.value[2][1], grid.value[2][2]],
        // Columns
        [grid.value[0][0], grid.value[1][0], grid.value[2][0]],
        [grid.value[0][1], grid.value[1][1], grid.value[2][1]],
        [grid.value[0][2], grid.value[1][2], grid.value[2][2]],
        // Diagonals
        [grid.value[0][0], grid.value[1][1], grid.value[2][2]],
        [grid.value[0][2], grid.value[1][1], grid.value[2][0]],
      ];
      return lines.some(line => line.every(cell => cell === currentPlayer.value));
    };

    const getCellStyle = (cell) => {
      if (cell === 1) {
        return { backgroundColor: props.player1Color };
      } else if (cell === 2) {
        return { backgroundColor: props.player2Color };
      }
      return {};
    };

    return {
      grid,
      currentPlayer,
      winner,
      makeMove,
      getCellStyle,
    };
  },
};
</script>

<style scoped>
.tic-tac-toe {
  max-width: 300px;
  margin: 0 auto;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  width: 33%;
  height: 100px;
  border: 1px solid #ddd;
  cursor: pointer;
}

.winner {
  margin-top: 20px;
  font-size: 1.5em;
  color: green;
}
</style>
