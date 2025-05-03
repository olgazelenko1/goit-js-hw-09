const formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

form.addEventListener('input', handleInput);

form.addEventListener('submit', handleSubmit);

populateForm();

function handleInput(event) {
  const { name, value } = event.target;

  if (name in formData) {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
}

function handleSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form submitted with data:', formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();

  formData.email = '';
  formData.message = '';
}

function populateForm() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  const data = JSON.parse(saved);

  if (data.email) {
    emailInput.value = data.email;
    formData.email = data.email;
  }

  if (data.message) {
    messageInput.value = data.message;
    formData.message = data.message;
  }
}
