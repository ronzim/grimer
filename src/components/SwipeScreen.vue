<script setup>
import { ref, computed } from 'vue'
import MediaCard from './MediaCard.vue'

const props = defineProps({
  files: Array,
  onMarkDelete: Function,
  onKeep: Function,
  onFinish: Function
})

const currentIndex = ref(0)
const currentFile = computed(() => props.files[currentIndex.value])
const xOffset = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const screenWidth = window.innerWidth

// Swipe thresholds
const SWIPE_THRESHOLD = 100

const onTouchStart = (e) => {
  startX.value = e.touches[0].clientX
  isDragging.value = true
}

const onTouchMove = (e) => {
  if (!isDragging.value) return
  const currentX = e.touches[0].clientX
  xOffset.value = currentX - startX.value
}

const onTouchEnd = () => {
  isDragging.value = false
  
  if (xOffset.value > SWIPE_THRESHOLD) {
    // Swiped Right -> Delete
    handleDelete()
    // Animation/Transition handled by next tick?
    // Using simple reset for now, refined later
  } else if (xOffset.value < -SWIPE_THRESHOLD) {
    // Swiped Left -> Keep
    handleKeep()
  }
  
  // Reset
  xOffset.value = 0
}

const handleDelete = () => {
  if (props.onMarkDelete) props.onMarkDelete(currentFile.value)
  nextFile()
}

const handleKeep = () => {
  if (props.onKeep) props.onKeep(currentFile.value)
  nextFile()
}

const nextFile = () => {
  if (currentIndex.value < props.files.length - 1) {
    currentIndex.value++
  } else {
    if (props.onFinish) props.onFinish()
  }
}

// Mouse Handlers for Desktop testing
const onMouseDown = (e) => {
  startX.value = e.clientX
  isDragging.value = true
}
const onMouseMove = (e) => {
  if (!isDragging.value) return
  xOffset.value = e.clientX - startX.value
}
const onMouseUp = () => {
  if (!isDragging.value) return
  isDragging.value = false
  if (xOffset.value > SWIPE_THRESHOLD) handleDelete()
  else if (xOffset.value < -SWIPE_THRESHOLD) handleKeep()
  xOffset.value = 0
}
</script>

<template>
  <div 
    class="swipe-container"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseleave="onMouseUp"
  >
    <div v-if="currentFile" class="card-wrapper" :style="{ transform: `translateX(${xOffset}px) rotate(${xOffset * 0.05}deg)` }">
      <MediaCard :fileHandle="currentFile" :isActive="true" />
      
      <!-- Overlay Labels -->
      <div v-if="xOffset > 50" class="overlay delete">DELETE</div>
      <div v-if="xOffset < -50" class="overlay keep">KEEP</div>
    </div>
    <div v-else class="empty-state">
      <h2>All Done!</h2>
      <button @click="onFinish">Review Deletions</button>
    </div>

    <!-- Controls for non-touch -->
    <div class="controls">
      <button class="btn-keep" @click="handleKeep">Keep (Left)</button>
      <button class="btn-del" @click="handleDelete">Delete (Right)</button>
    </div>
  </div>
</template>

<style scoped>
.swipe-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  touch-action: none; /* Crucial for custom gestures */
}

.card-wrapper {
  width: 90%;
  height: 70%;
  transition: transform 0.1s linear; /* Smooth drag */
  position: relative;
  z-index: 2;
}

.card-wrapper:not(:active) {
  transition: transform 0.3s ease-out; /* Snap back */
}

.overlay {
  position: absolute;
  top: 20px;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 2rem;
  z-index: 10;
  border: 4px solid;
}

.overlay.delete {
  left: 20px;
  color: var(--color-danger);
  border-color: var(--color-danger);
  transform: rotate(-15deg);
}

.overlay.keep {
  right: 20px;
  color: var(--color-success);
  border-color: var(--color-success);
  transform: rotate(15deg);
}

.controls {
  position: absolute;
  bottom: 20px;
  display: flex;
  gap: 20px;
  z-index: 5;
}

.btn-del {
  background-color: rgba(255, 68, 68, 0.2);
  color: var(--color-danger);
  border: 1px solid var(--color-danger);
}

.btn-keep {
  background-color: rgba(68, 221, 68, 0.2);
  color: var(--color-success);
  border: 1px solid var(--color-success);
}
</style>
