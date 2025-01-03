<template>
  <div class="character-card">
    <img :src="character.image" :alt="character.name" />
    <h3>{{ character.name }}</h3>
    <p :class="character.status">{{ character.status }}</p>
    <button @click="$emit('show-details', character.id)" class="button-detail">Ver Detalles</button>
  </div>
</template>

<script>
export default {
  name: 'character-card',
  props: {
    character: null,
  },
};
</script>

<style>
.character-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  max-width: 200px;
}
.character-card img {
  width: 100%;
  border-radius: 8px;
}
.character-card .Alive {
  color: green;
}
.character-card .Dead {
  color: red;
}
.character-card .unknown {
  color: gray;
}
.button-detail{
  background-color: #4CAF50;
  border: 1px solid black;
  color: white;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
}
</style>
