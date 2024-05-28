const html = `
<div>
  <div class="form-group">
    <label for="player2">Player 2: <span v-if="submitted">{{ player2 }}</span></label>
    <input type="text" id="player2" v-model="player2"/>
  </div>

  <div class="color-group" v-for="color in colors2" :key="color">
    <input type="radio" :value="color" v-model="player2Color" :id="'player2-' + color" required />
    <label class="color-label" :for="'player2-' + color" :style="{ color: color }">{{ color }}</label>
  </div>
</div>`

const gridProp = `:player2Color="player2Color"`

// script
const player2 = ref('');
const player2Color = ref('pink');
const colors2 = ['pink', 'aqua', 'olive', 'gold', 'coral', 'plum'];
const payload = {
  name: player2.value,
  color: player2Color.value,
}

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
  player1.value = '';
  player2.value = '';
  player1Color.value = '';
  player2Color.value = '';
  submitted.value = false;
};

const return = `
player2,
player2Color,
colors2,`