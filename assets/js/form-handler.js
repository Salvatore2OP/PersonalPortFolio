const form = document.querySelector('[data-form]');
const formBtn = document.querySelector('[data-form-btn]');
const formData = new FormData();
const responseMsg = document.querySelector('[data-response-msg]'); // Add a container to display the response message

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the form data
  const fullname = document.querySelector('[name="fullname"]').value;
  const email = document.querySelector('[name="email"]').value;
  const message = document.querySelector('[name="message"]').value;

  // Add the form data to the FormData object
  formData.append('fullname', fullname);
  formData.append('email', email);
  formData.append('message', message);

  // Send the form data to a server or email service
  fetch('/contact', {
    method: 'POST',
    body: formData,
  })
 .then((response) => response.json())
 .then((data) => {
    // Display a success message
    responseMsg.innerHTML = 'Thank you for contacting me! I will get back to you soon.';
    responseMsg.classList.add('success');
  })
 .catch((error) => {
    // Display an error message
    responseMsg.innerHTML = 'Error sending message. Please try again later.';
    responseMsg.classList.add('error');
  });
});