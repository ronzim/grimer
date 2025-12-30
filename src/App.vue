<script setup>
import { ref, onMounted, reactive } from 'vue'
import IntroScreen from './components/IntroScreen.vue'
import ErrorModal from './components/ErrorModal.vue'
import SwipeScreen from './components/SwipeScreen.vue'
import ReviewScreen from './components/ReviewScreen.vue'
import { scanDirectory } from './utils/fileScanner'

const isSupported = ref(true)
const currentView = ref('intro') // intro, swiping, review
const files = ref([])
const markedFiles = reactive(new Set())
const isLoading = ref(false)

onMounted(() => {
  if (!('showDirectoryPicker' in window)) {
    isSupported.value = false
  }
})

const handleSelectFolder = async () => {
  try {
    const handle = await window.showDirectoryPicker({ mode: 'readwrite' })
    isLoading.value = true
    files.value = await scanDirectory(handle)
    isLoading.value = false
    
    if (files.value.length === 0) {
      alert('No scanable media found in this folder!')
      return
    }
    
    markedFiles.clear()
    currentView.value = 'swiping'
  } catch (err) {
    isLoading.value = false
    if (err.name !== 'AbortError') {
      console.error('Error selecting folder:', err)
      alert('Failed to access folder.')
    }
  }
}

const handleMarkDelete = (fileHandle) => {
  markedFiles.add(fileHandle)
}

const handleKeep = (fileHandle) => {
  // Opt: remove from marked if backtracking, but for now simple flow
}

const handleFinish = () => {
  currentView.value = 'review'
}

const handleUnmark = (fileHandle) => {
  markedFiles.delete(fileHandle)
}

const handleConfirmDelete = async () => {
  if (!confirm(`Are you sure you want to delete ${markedFiles.size} items? This cannot be undone.`)) return
  
  let successCount = 0
  let failCount = 0
  
  for (const fileHandle of markedFiles) {
    try {
      await fileHandle.remove()
      successCount++
    } catch (err) {
      console.error('Failed to delete:', fileHandle.name, err)
      failCount++
    }
  }
  
  alert(`Deleted ${successCount} files.${failCount > 0 ? ` Failed: ${failCount}` : ''}`)
  // Reset
  currentView.value = 'intro'
  files.value = []
  markedFiles.clear()
}
</script>

<template>
  <div class="app-container">
    <!-- Intro -->
    <IntroScreen 
      v-if="isSupported && currentView === 'intro' && !isLoading" 
      :onSelectFolder="handleSelectFolder" 
    />
    <div v-if="isLoading" class="loading">Scanning folder...</div>
    
    <!-- Error -->
    <ErrorModal v-if="!isSupported" />

    <!-- Swiping -->
    <SwipeScreen 
      v-if="currentView === 'swiping'"
      :files="files"
      :onMarkDelete="handleMarkDelete"
      :onKeep="handleKeep"
      :onFinish="handleFinish"
    />

    <!-- Review -->
    <ReviewScreen
      v-if="currentView === 'review'"
      :markedFiles="markedFiles"
      :onUnmark="handleUnmark"
      :onConfirmDelete="handleConfirmDelete"
      :onBack="() => currentView = 'swiping'"
    />
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: var(--color-primary);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
</style>
