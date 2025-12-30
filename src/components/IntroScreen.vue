<script setup>
defineProps({
  onSelectFolder: Function
})
</script>

<template>
  <div class="intro-screen">
    <h1>Deleter</h1>
    <p>Select a folder to start cleaning.</p>
    <button @click="onSelectFolder">Open Folder</button>
  </div>
</template>

<style scoped>
.intro-screen {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  height: 100%;
}

h1 {
  font-size: 3rem;
  margin: 0;
  background: linear-gradient(135deg, #646cff 0%, #a464ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  font-size: 1.2rem;
  color: #888;
}

button {
  font-size: 1.2rem;
  padding: 1rem 2rem;
  border-radius: var(--radius-lg);
  background: var(--color-primary);
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(100, 108, 255, 0.3);
}
</style>
