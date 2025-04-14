<template>
  <div class="full-screen d-flex justify-content-center align-items-center" dir="rtl">
    <div class="container col-lg-4">
      <div class="progress" style="height: 10px;">
        <div class="progress-bar" role="progressbar" :style="{ width: progressWidth + '%' }" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"></div>
      </div>

      <div class="card mt-4 shadow-lg">
        <div class="card-body">
          <h4 class="card-title text-center">المعلومات الشخصية</h4>
          <form @submit.prevent="goToStep2">
            <div class="mb-3">
              <label for="name" class="form-label">الاسم</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="form.name"
                :class="{'is-invalid': !form.name && form.submitted}"
                required
              />
              <div v-if="!form.name && form.submitted" class="invalid-feedback">يرجى إدخال الاسم.</div>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">البريد الإلكتروني</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="form.email"
                :class="{'is-invalid': !isValidEmail && form.submitted}"
                required
              />
              <div v-if="!isValidEmail && form.submitted" class="invalid-feedback">البريد الإلكتروني غير صالح.</div>
            </div>

            <div class="mb-3">
              <label class="form-label">الدور</label>
              <select class="form-select" v-model="form.role" required>
                <option value="">اختر</option>
                <option value="customer">عميل</option>
                <option value="developer">مطور</option>
              </select>
            </div>

            <div class="d-flex justify-content-end">
              <button type="submit" class="btn btn-primary" :disabled="!isFormValid">التالي</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useFormStore } from '../stores';
import { useRouter } from 'vue-router';

const form = useFormStore();
const router = useRouter();

const isValidEmail = computed(() => /\S+@\S+\.\S+/.test(form.email));

const isFormValid = computed(() => {
  const nameValid = typeof form.name === 'string' && form.name.trim() !== '';
  const emailValid = isValidEmail.value;
  const roleValid = form.role !== '';
  return nameValid && emailValid && roleValid;
});


const progressWidth = 33;

const isDarkMode = ref(localStorage.getItem('isDarkMode') === 'true');

onMounted(() => {
  if (isDarkMode.value) {
    document.body.classList.add('dark-mode');
  }
});

function toggleMode() {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle('dark-mode', isDarkMode.value);
  localStorage.setItem('isDarkMode', isDarkMode.value); 
}

function goToStep2() {
  form.submitted = true;
  if (isFormValid.value) {
    form.saveStep1Data({ name: form.name, email: form.email, role: form.role });
    router.push('/step-2'); 
  } else {
    alert('يرجى تعبئة جميع الحقول بشكل صحيح.');
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;600;700&display=swap');

body {
  font-family: "Tajawal", sans-serif;
  margin: 0;
  background-color: #f8f9fa; 
  color: #333;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.full-screen {
  min-height: 100vh;
  background: linear-gradient(to bottom, #fefefe, #f2f4f7); 
  padding: 20px;
  transition: background 0.3s ease;
}

.card {
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: background-color 0.3s ease;
}

.progress {
  margin-bottom: 30px;
  height: 12px;
  background-color: #e9ecef;
  border-radius: 20px;
}

.progress-bar {
  height: 100%;
  border-radius: 20px;
  background-image: linear-gradient(to right, #a8edea, #fed6e3);
  transition: width 0.4s ease-in-out;
}

.btn-primary {
  background-image: linear-gradient(to right, #a8edea, #fed6e3);
  border: none;
  color: #333;
  font-weight: 600;
  border-radius: 10px;
  padding: 10px 20px;
  transition: all 0.3s ease-in-out;
}

.btn-primary:hover {
  opacity: 1.9;
  transform: scale(1.02);
}

.form-control {
  border-radius: 8px;
  padding: 10px;
}

.form-control:focus {
  border-color: #a8edea;
}

.form-select {
  direction: rtl;  
  text-align: right;
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
  color: #fff;

}

body.dark-mode .progress-bar {
  background-image: linear-gradient(to right, #91a4b1, #384553);
}

body.dark-mode .btn-primary {
  background-image: linear-gradient(to right, #91a4b1, #384553);
  color: #b8b4b4;
}

body.dark-mode .form-select,
body.dark-mode .form-control {
  background-color: #fff;
  color: #000;
  border-color: #8f8f8f;
}
</style>
