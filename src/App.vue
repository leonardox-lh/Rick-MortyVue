<script>

import {RickAndMortyApiService} from "@/search/services/rickandmorty-api.service.js";
import CharacterCard from "@/search/components/character-card.component.vue";
import CharacterModal from "@/search/components/character-modal.component.vue";
import Pagination from "@/search/components/pagination.component.vue";


export default {
  name: 'App',
  components: {CharacterCard, Pagination, CharacterModal},
  data(){
    return{
      characters: [],
      search: "",
      currentPage: 1,
      hasNextPage: true,
      isModalVisible: false,
      selectedCharacter: null,
      errors:[],
      searchApi:new RickAndMortyApiService()
    }
  },
  created() {
    this.getCharacters();
  },

  methods:{
    getCharacters() {
      this.searchApi.getCharacter({
        page: this.currentPage,
        name: this.search,
      })
          .then(response => {
            this.characters = response.data.results;
            this.hasNextPage = !!response.data.info.next;
          })
          .catch(e => {
            this.errors.push(e);
          });
    },
    nextPage() {
      if (this.hasNextPage) {
        this.currentPage++;
        this.getCharacters();
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getCharacters();
      }
    },
    showCharacterDetails(characterId) {
      this.searchApi.getCharacterById(characterId)
          .then(response => {
            this.selectedCharacter = response.data;
            this.isModalVisible = true;
          })
          .catch(error => {
            console.error(error);
          });
    },
    closeModal() {
      this.isModalVisible = false;
      this.selectedCharacter = null;
    },
    searchCharacters() {
      this.currentPage = 1;
      this.getCharacters();
    },
  }
}


</script>

<template>
  <div>
    <input
      class="search-box"
      type="text"
      v-model="search"
      placeholder="Buscar personaje"
      @keyup.enter="searchCharacters"
    />
    <div v-if="characters.length">
      <div class="character-list">
        <character-card
            v-for="character in characters"
            :key="character.id"
            :character="character"
            @show-details="showCharacterDetails"
        ></character-card>
      </div>
    </div>
    <pagination
      :currentPage="currentPage"
      :hasNextPage="hasNextPage"
      @next-page="nextPage"
      @previous-page="previousPage"
    ></pagination>
    <CharacterModal
        :isVisible="isModalVisible"
        :character="selectedCharacter"
        @close="closeModal"
    >
    </CharacterModal>
  </div>

</template>

<style>
.search-box {
  display: flex;
  margin: 20px auto;
  padding: 8px;
  width: 80%;
  max-width: 400px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 20px;
}
.character-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}
</style>
