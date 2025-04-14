<template>
  <div class="full-screen d-flex justify-content-center align-items-center " dir="rtl">
    <div class="container col-lg-5">
      <div class="progress" style="height: 10px;">
        <div class="progress-bar" role="progressbar" :style="{ width: '100%' }" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
      </div>

      <div class="card mt-4 shadow-lg">
        <div class="card-body">
          <h4 class="card-title text-center">الخطوة 3 - تأكيد البيانات</h4>
          <div class="confirmation-section">
            <h4>الاسم:</h4>
            <p>{{ form.name }}</p>

            <h4>البريد الإلكتروني:</h4>
            <p>{{ form.email }}</p>

            <h4>العنوان:</h4>
            <p>{{ form.address }}</p>

            <h4 >التفضيلات:</h4>
            <p >{{ form.preferences }}</p>

            <div v-if="form.role === 'developer'">
              <h4>أدواتك الخاصة بالتطوير:</h4>
              <p>{{ form.devTools }}</p>
            </div>
          </div>

          <div class="d-flex justify-content-between mt-4">
            <router-link to="/step-2" class="btn btn-secondary">الرجوع</router-link>
            <button type="submit" class="btn btn-primary" @click="submitForm">التالي</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useFormStore } from '../stores'
import { useRouter } from 'vue-router'

const darkMode = ref(localStorage.getItem('darkMode') === 'true')
const form = useFormStore()
const router = useRouter()

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  localStorage.setItem('darkMode', darkMode.value)
}
function submitForm() {
  alert('تم إرسال البيانات بنجاح!')
  router.push('/success')
}
onMounted(() => {
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
  padding: 30px 15px;
}

.card {
  border-radius: 12px;
  padding: 25px;
  background-color: #fff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
  font-family: "Tajawal", sans-serif !important;

}

.card-title {
  text-align: center;
  margin-bottom: 25px;
  font-family: "Tajawal", sans-serif;

}

.confirmation-section h4 {
  font-size: 0.95rem;
  font-weight: 600;
  color: #555;
  margin-top: 12px;
  margin-bottom: 4px;
  font-family: "Tajawal", sans-serif;

}

.confirmation-section p {
  font-size: 0.9rem;
  margin-bottom: 12px;
  color: #333;
  padding: 8px 12px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ececec;
  font-family: "Tajawal", sans-serif;

}

.progress {
  margin-bottom: 25px;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 30px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 30px;
  background-image: linear-gradient(to right, #a8edea, #fed6e3);
  transition: width 0.4s ease-in-out;
}

.btn-primary {
  background-image: linear-gradient(to right, #a8edea, #fed6e3);
  border: none;
  color: #333;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 8px;
  padding: 8px 18px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 3px 10px rgba(168, 237, 234, 0.3);
  font-family: "Tajawal", sans-serif;

}

.btn-primary:hover {
  opacity: 0.95;
  transform: scale(1.02);
}

.btn-primary:active {
  color:black;
 }

.btn-secondary {
  background-color: #6c757d;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  border-radius: 8px;
  padding: 8px 18px;
  transition: all 0.3s ease-in-out;
  font-family: "Tajawal", sans-serif;

}

.btn-secondary:hover {
  opacity: 0.9;
  transform: scale(1.02);
  
}



body.dark-mode {
  background-color: #3a3a3a; 
  color: #fff;
}

body.dark-mode .full-screen {
  background-image: linear-gradient(to right, #2c3b45, #37393c);
}

body.dark-mode .card {
  background-image: linear-gradient(to right, #2c3b45, #37393c);
  box-shadow: 0 4px 15px rgba(78, 74, 74, 0.2);
  color: #fff !important;

}

body.dark-mode .card-title {
  color: #fff;
}

body.dark-mode h4 {
  color: #fff;
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
  background-color: #757575;
  color: #fff;
  border-color: #8f8f8f;
}

body.dark-mode .form-control:focus {
  border-color: #a0a0a0;
  box-shadow: 0 0 5px rgba(168, 237, 234, 0.4);
}

body.dark-mode .form-label {
  color: #fff;
}

body.dark-mode .invalid-feedback {
  color: #e74c3c;
}


</style>
