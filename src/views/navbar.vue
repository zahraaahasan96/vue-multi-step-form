<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid d-flex justify-content-between">
      <button class="btn btn-outline-light" @click="toggleMode">
        <span v-if="isDarkMode">🌙</span> <span v-else>☀️</span>
      </button>

      <div class="navbar-text navbar-center">
        ابدأ بتسجيل بياناتك
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false)

function toggleMode() {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('dark-mode', isDarkMode.value) 
  localStorage.setItem('darkMode', isDarkMode.value) 
}

onMounted(() => {
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode !== null) {
    isDarkMode.value = JSON.parse(savedMode)
    document.body.classList.toggle('dark-mode', isDarkMode.value)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;600;700&display=swap');

.navbar {
  background: linear-gradient(to right, #77c9d4, #e6b7b3); 
  direction: rtl; 
  padding: 12px 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.navbar-text {
  font-family: 'Tajawal', sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  color: black;
}

.navbar-center {
  text-align: center;
  flex: 1;
}

.dark-mode {
  background-color: #222; 
  color: #fff;
}

.btn-outline-light {
  background: linear-gradient(to right, #77c9d4, #e6b7b3);
  border: none;
  color: #fff; 
  font-weight: 600;
  font-family: "Tajawal", sans-serif;
  border-radius: 10px;
  padding: 10px 20px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 10px rgba(168, 237, 234, 0.3);
}

.btn-outline-light:hover {
  opacity: 0.9;
  transform: scale(1.05);
}

body.dark-mode .navbar {
  background: linear-gradient(to right, #3a4f56, #5b6a70); 
  color: #fff;

}

body.dark-mode .btn-outline-light {
  background: linear-gradient(to right, #4a656f, #6f7b87); 
}

body.dark-mode .navbar-text {
  color: #fff;

}
</style>
