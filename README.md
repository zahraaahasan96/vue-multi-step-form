# Vue Multi-Step Form

A clean and accessible multi-step form built using Vue 3, Vue Router, Pinia, and Bootstrap 5.  
This form demonstrates best practices in routing, state management, validation, theming, testing, and accessibility.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/zahraaahasan96/vue-multi-step-form.git
cd vue-multi-step-form
npm install
npm run dev 
```


## 🧾 Documentation

### 📁 Architecture Overview

The project consists of three form steps located in the views folder. Each step is a separate route managed by Vue Router.  
Form state is managed globally with Pinia, and stored in localStorage for persistence between refreshes.

---

### ⚙️ Why Pinia?

I chose Pinia because it's the official and recommended state management solution for Vue 3.  
It’s easy to use, lightweight, and works well for sharing state between steps without passing props or emitting events.

---

### ✨ Extra Features

- ✅ Dark / Light Mode toggle
- ✅ Form validation using Bootstrap classes and custom rules
- ✅ Automatic localStorage persistence
- ✅ Unit testing using Vitest
- ✅ Step 2 fetches data from a fake API (e.g., JSONPlaceholder)

---

## 🧪 Running Tests

bash

npm run test
