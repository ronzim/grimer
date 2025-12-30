<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  fileHandle: {
    type: Object,
    required: true
  },
  isActive: Boolean
})

const objectUrl = ref(null)
const isVideo = ref(false)
const error = ref(null)

const loadFile = async () => {
  try {
    error.value = null
    const file = await props.fileHandle.getFile()
    
    // Revoke previous URL if exists
    if (objectUrl.value) {
      URL.revokeObjectURL(objectUrl.value)
    }

    objectUrl.value = URL.createObjectURL(file)
    isVideo.value = file.type.startsWith('video/')
  } catch (err) {
    console.error('Error loading file:', err)
    error.value = 'Failed to load'
  }
}

watch(() => props.fileHandle, loadFile, { immediate: true })

onUnmounted(() => {
  if (objectUrl.value) {
    URL.revokeObjectURL(objectUrl.value)
  }
})
</script>

<template>
  <div class="media-card">
    <div v-if="error" class="error">{{ error }}</div>
    <template v-else-if="objectUrl">
      <video 
        v-if="isVideo" 
        :src="objectUrl" 
        controls 
        playsinline
        class="media-content"
      ></video>
      <img 
        v-else 
        :src="objectUrl" 
        :alt="fileHandle.name" 
        class="media-content"
        draggable="false"
      />
    </template>
    <div v-else class="loading">Loading...</div>
  </div>
</template>

<style scoped>
.media-card {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.media-content {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  pointer-events: none; /* Prevent drag conflicts with swipe */
}

video.media-content {
  pointer-events: auto; /* Allow video controls */
}

.error, .loading {
  color: #666;
}
</style>
