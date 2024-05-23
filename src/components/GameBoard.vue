<template>
   <div class="player-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="player1">Player 1: <span v-if="player1">{{ player1 }}</span></label>
        <input type="text" id="player1" v-model="player1" @keyup.enter="handleSubmit(1)" />
      </div>

      <div class="form-group">
        <label for="player2">Player 2: <span v-if="player2">{{ player2 }}</span></label>
        <input type="text" id="player2" v-model="player2" @keyup.enter="handleSubmit(2)" />
      </div>
    </form>

    <div v-if="player1 && player2">
      <ColorGrid :player1Color="player1Color" :player2Color="player2Color" @winner="handleWinner"/>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import ColorGrid from './ColorGrid.vue';
export default {
  name: 'PlayersForm',
  components: {
    ColorGrid
  },
  setup() {
    const player1 = ref('');
    const player2 = ref('');
    const player1Color = ref('red');
    const player2Color = ref('blue');
    const submitted = ref(false);

    const handleSubmit = async(witch) => {
      const response = await fetch('http://localhost:3000/player-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8080/'
        },
        body: JSON.stringify({
          name: witch === 1 ? player1.value : player2.value,
          color: 'red',
        }),
      });

      if (!response.ok) {
        console.log(response)
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      submitted.value = true;
    };

    const handleWinner = async(winner) => {
      const response = await fetch('http://localhost:3000/player-info', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8080/'
        },
        body: JSON.stringify({
          name: winner === 1 ? player1.value : player2.value,
        }),
      });

      if (!response.ok) {
        console.log(response)
        throw new Error('Network response was not ok');
      }

      alert(`The winner is: ${winner === 1 ? player1.value : player2.value}`);
    };

    return {
      player1,
      player2,
      player1Color,
      player2Color,
      submitted,
      handleSubmit,
      handleWinner,
    };
  }
};
</script>

<style scoped>
.player-form {
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

.clear-form {
  align-self: center;
}

form {
  display: flex;
  justify-content: space-around;
  gap: 150px;
}

label {
  display: block;
  font-size: x-large;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

p {
  margin: 0.5rem 0;
}
</style>
