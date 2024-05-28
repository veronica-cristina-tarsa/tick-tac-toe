const sortedPlayers = computed(() => {
  return [...players.value].sort((a, b) => b.score - a.score);
});

const clearBTn = `
<div class="clear-form">
  <button type="button" @click="clearValues">Clear all</button>
</div>`

const 