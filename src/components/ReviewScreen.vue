<script setup>
import { computed } from 'vue'
import MediaCard from './MediaCard.vue'

const props = defineProps({
  markedFiles: Set,
  onUnmark: Function,
  onConfirmDelete: Function,
  onBack: Function
})

const markedArray = computed(() => Array.from(props.markedFiles))

</script>

<template>
  <div class="review-screen">
    <header>
      <button @click="onBack">← Back to Swipe</button>
      <h2>Review Deletions</h2>
    </header>
    
    <div v-if="markedArray.length === 0" class="empty">
      <p>No files marked for deletion.</p>
    </div>

    <div v-else class="grid">
      <div 
        v-for="fileHandle in markedArray" 
        :key="fileHandle.name" 
        class="grid-item"
      >
        <MediaCard :fileHandle="fileHandle" :isActive="true" />
        <button class="unmark-btn" @click="onUnmark(fileHandle)">Restore</button>
      </div>
    </div>

    <footer v-if="markedArray.length > 0">
      <p>{{ markedArray.length }} items selected</p>
      <button class="delete-btn" @click="onConfirmDelete">
        DELETE FOREVER
      </button>
    </footer>
  </div>
</template>

<style scoped>
.review-screen {
  height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--color-surface);
}

.grid {
  flex: 1;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  padding: 10px;
}

.grid-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.unmark-btn {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  background: rgba(0,0,0,0.7);
  color: white;
  border: 1px solid white;
}

footer {
  padding: 1rem;
  background: var(--color-surface);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-btn {
  background: var(--color-danger);
  color: white;
  font-weight: bold;
}
</style>
