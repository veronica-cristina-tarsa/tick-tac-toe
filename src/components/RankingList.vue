<template>
  <div class="score-table">
    <h1>Ranking</h1>
    <table v-if="players.length > 0">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in players" :key="player.name">
          <td>{{ player.name }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Waiting for winners...</p>

      
    <div class="clear-form">
      <button type="button" @click="fetchScores">Refresh</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'ScoreTable',
  setup() {
    const players = ref([]);

    const fetchScores = async () => {
      try {
        const response = await fetch('http://localhost:3000/player-info');
        const data = await response.json();

        players.value = data;
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    onMounted(() => {
      fetchScores();
    });


    const clearValues = async() => {
      const response = await fetch('http://localhost:3000/clear-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8080/'
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      players.value = data;
      console.log('Success clear', data);
    };

    return {
      players,
      fetchScores,
      clearValues
    };
  },
};
</script>

<style scoped>
.score-table {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 1px solid #ddd;
  padding: 0.5rem;
}

th {
  background-color: #f4f4f4;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
