<script setup>
</script>

<template>
  <div class="error-modal">
    <div class="card">
      <h2>Not Supported</h2>
      <p>
        Your browser does not support the <strong>File System Access API</strong> required to delete files.
      </p>
      <div class="alert">
        <p><strong>Supported:</strong> Chrome (Desktop/Android), Edge.</p>
        <p><strong>Not Supported:</strong> iOS Safari, Firefox.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
}

.card {
  background: var(--color-surface);
  padding: 2rem;
  border-radius: var(--radius-lg);
  max-width: 400px;
  text-align: center;
}

.alert {
  margin-top: 1.5rem;
  background: rgba(255, 68, 68, 0.1);
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-danger);
  text-align: left;
}

.alert p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
}
</style>
