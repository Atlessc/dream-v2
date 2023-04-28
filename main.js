import './style.css';

const form = document.querySelector('form');

// 1. Listen for the form to be submitted and prevent it from being sent
form.addEventListener('submit', async (e) => {
  e.preventDefault();
    showSpinner();

  // 2. Take the text the user entered into the form field
  const data = new FormData(form);

  // 3. Send that text to our API server
  const response = await fetch('http://localhost:8080/dream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt'),
    }),
  });

  // 4. Convert the response to JSON
  const { image } = await response.json();

  // 5. Display the image on the page the area marked #result with the src being ${image}
  const result = document.querySelector('#result');
  result.innerHTML = `<img src="${image}" width="100%"/>`;

  // 6. Hide the spinner
  hideSpinner();
});

function showSpinner() {
    console.log('Spinner');
    const button = document.querySelector('button');
    button.disabled = true;
    button.innerHTML = `dreaming... <span class="spinner">🦄</span>`;
}

function hideSpinner() {
    console.log('Hide Spinner');
    const button = document.querySelector('button');
    button.disabled = false;
    button.innerHTML = 'Submit';
}