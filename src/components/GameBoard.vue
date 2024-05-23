<template>
   <div class="player-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-body">
        <div>
          <div class="form-group">
            <label for="player1">Player 1: <span v-if="submitted">{{ player1 }}</span></label>
            <input type="text" id="player1" v-model="player1" />
          </div>
          <div class="color-group" v-for="color in colors1" :key="color">
            <input type="radio" :value="color" v-model="player1Color" :id="'player2-' + color" required />
            <label :for="'player2-' + color" :style="{ color: color }">{{ color }}</label>
          </div>
        </div>

        <div>
          <div class="form-group">
            <label for="player2">Player 2: <span v-if="submitted">{{ player2 }}</span></label>
            <input type="text" id="player2" v-model="player2" @keyup.enter="handleSubmit(2)" @blur="handleSubmit(2)"/>
          </div>

          <div class="color-group" v-for="color in colors2" :key="color">
            <input type="radio" :value="color" v-model="player2Color" :id="'player2-' + color" required />
            <label :for="'player2-' + color" :style="{ color: color }">{{ color }}</label>
          </div>
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>

    <div v-if="submitted">
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
    const player2Color = ref('pink');
    const submitted = ref(false);

    const colors1 = ['red', 'blue', 'green', 'khaki', 'orange', 'purple'];
    const colors2 = ['pink', 'aqua', 'olive', 'gold', 'coral', 'plum'];

    const handleSubmit = async() => {
      const response = await fetch('http://localhost:3000/player-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8080/'
        },
        body: JSON.stringify([{
          name: player1.value,
          color: player1Color.value,
        }, {
          name: player2.value,
          color: player2Color.value,
        }]),
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
      colors1,
      colors2,
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

.form-body {
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
