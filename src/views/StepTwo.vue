<template>
  <div :class="darkMode ? 'dark-mode' : 'light-mode'" class="full-screen d-flex justify-content-center align-items-center" dir="rtl">
    <div class="container col-lg-4">
      <div class="progress" style="height: 10px;">
        <div class="progress-bar" role="progressbar" :style="{ width: '67%' }" aria-valuenow="67" aria-valuemin="0" aria-valuemax="100"></div>
      </div>

      <div class="card mt-4 shadow-lg">
        <div class="card-body">
          <h4 class="card-title text-center">معلومات إضافية</h4>
          <form @submit.prevent="goToStep3">
            <div class="mb-3">
              
              <label for="address" class="form-label">العنوان</label>
              <input
              type="text"
              class="form-control"
              id="address"
              v-model="form.address"
              :class="{'is-invalid': !form.address && form.submitted}"
              required
            />
              <div v-if="!form.address && form.submitted" class="invalid-feedback">يرجى إدخال العنوان.</div>
            </div>

            <div class="mb-3">
              <label for="preferences" class="form-label">التفضيلات</label>
              <textarea
                id="preferences"
                class="form-control"
                rows="3"
                v-model="form.preferences"
                :class="{'is-invalid': !form.preferences && form.submitted}"
                required
              ></textarea>
              <div v-if="!form.preferences && form.submitted" class="invalid-feedback">يرجى إدخال التفضيلات.</div>
            </div>
            
            <div v-if="form.role === 'developer'" class="mb-3">
              <label for="devTools" class="form-label">أدوات التطوير الخاصة بك</label>
              <input
                type="text"
                class="form-control"
                id="devTools"
                v-model="form.devTools"
                :class="{'is-invalid': !form.devTools && form.submitted}"
                required
              />
              <div v-if="!form.devTools && form.submitted" class="invalid-feedback">يرجى إدخال أدوات التطوير.</div>
            </div>

            <div class="d-flex justify-content-between">
              <router-link to="/step-1" class="btn btn-secondary">الرجوع</router-link>
              <button type="submit" class="btn btn-primary" :disabled="!isFormValid">التالي</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useFormStore } from '../stores'
import { useRouter } from 'vue-router'

const darkMode = ref(localStorage.getItem('darkMode') === 'true')
const form = useFormStore()
const router = useRouter()

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  localStorage.setItem('darkMode', darkMode.value)
}

const isFormValid = computed(() => {
  return (form.address || '').trim() && 
         (form.preferences || '').trim() && 
         (form.role !== 'developer' || (form.devTools || '').trim());
})




const getDataFromAPI = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const data = response.data[0];
    
    form.preferences = `Default preferences for ${data.name || ''}`; 
    
  } catch (error) {
    console.error('فشل في جلب البيانات:', error);
  }
}

  const goToStep3 = () => {
  form.submitted = true
  if (isFormValid.value) {
    form.saveStep2Data({ address: form.address, preferences: form.preferences, devTools: form.devTools })
    router.push('/step-3')
  } else {
    alert('يرجى تعبئة جميع الحقول بشكل صحيح.')
  }
}



onMounted(() => {
  getDataFromAPI()
  
  if (localStorage.getItem('darkMode') === 'true') {
    darkMode.value = true
  } else {
    darkMode.value = false
  }
})
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;600;700&display=swap');

body {
  font-family: "Tajawal", sans-serif;
  background-color: #f8f9fa;
  margin: 0;
}

.full-screen {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
}

.card {
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-family: "Tajawal", sans-serif;
}

.card-title {

  font-family: "Tajawal", sans-serif;
}

.progress {
  margin-bottom: 30px;
  height: 12px;
  background-color: #e9ecef;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  height: 100%;
  border-radius: 20px;
  background-image: linear-gradient(to right, #a8edea, #fed6e3); 
  transition: width 0.4s ease-in-out;
  box-shadow: 0 0 6px rgba(168, 237, 234, 0.6);
}


.btn-primary {
  background-image: linear-gradient(to right, #a8edea, #fed6e3);
  border: none;
  color: #333;
  font-weight: 600;
  font-family: "Tajawal", sans-serif;
  border-radius: 10px;
  padding: 10px 20px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 10px rgba(168, 237, 234, 0.3);
}

.btn-primary:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

.btn-primary:focus {
  color:white;
 }
.form-control:focus,
textarea.form-control:focus {
  border-color: #a8edea;
  box-shadow: 0 0 5px rgba(168, 237, 234, 0.6);
  outline: none;
}

.btn-primary:focus {
  box-shadow: 0 0 8px rgba(168, 237, 234, 0.6);
  outline: none;
}

.form-control:hover,
textarea.form-control:hover {
  border-color: #fed6e3;
  transition: border-color 0.2s ease-in-out;
}


.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  font-family: "Tajawal", sans-serif;
}

.form-label {
  font-weight: 600;
  font-family: "Tajawal", sans-serif;
}

.form-control {
  border-radius: 8px;
  padding: 10px;
}

.progress {
  margin-bottom: 30px;
  height: 10px;
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  font-size: 0.875rem;
  color: #dc3545;
}



body.dark-mode {
  background-color: #3a3a3a; 
  color: #e1e1e1; 
}

body.dark-mode .full-screen {
  background-image: linear-gradient(to right, #2c3b45, #37393c);
}

body.dark-mode .card {
  background-image: linear-gradient(to right, #2c3b45, #37393c);
  box-shadow: 0 4px 15px rgba(78, 74, 74, 0.2);
  color: #fff;

}

body.dark-mode .card-title {
  color: #e1e1e1;
}

body.dark-mode .progress {
  background-color: #757575;
}

body.dark-mode .progress-bar {
  background-image: linear-gradient(to right, #91a4b1, #384553);
}

body.dark-mode .btn-primary {
  background-image: linear-gradient(to right, #91a4b1, #384553);
  color: #b8b4b4;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

body.dark-mode .btn-primary:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

body.dark-mode .form-control {
  background-color: #fff;
  color: #000;
  border-color: #8f8f8f;
}

body.dark-mode .form-control:focus {
  border-color: #a0a0a0;
  box-shadow: 0 0 5px rgba(168, 237, 234, 0.4);
}

body.dark-mode .form-label {
  color: #e1e1e1;
}

body.dark-mode .invalid-feedback {
  color: #e74c3c;
}

</style>
