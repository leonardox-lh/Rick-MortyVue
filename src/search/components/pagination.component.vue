<template>
  <div class="pagination">
    <button @click="emitPreviousPage" :disabled="currentPage === 1">Anterior</button>
    <span>Página {{ currentPage }}</span>
    <button @click="emitNextPage" :disabled="!hasNextPage">Siguiente</button>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    hasNextPage: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    emitNextPage() {
      this.$emit("next-page");
    },
    emitPreviousPage() {
      this.$emit("previous-page");
    },
  },
};
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 36px 0;
}
button{
  background-color: #143aa2;
  border: 1px solid black;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
}
</style>
