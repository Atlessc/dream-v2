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
  hideSpinner();
  downloadBtn();
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
function fetchFile(url) {
  fetch(url).then(res => res.blob()).then(file => {
      let tempUrl = URL.createObjectURL(file);
      const aTag = document.createElement("a");
      aTag.href = tempUrl;
      aTag.download = url.replace(/^.*[\\\/]/, '');
      document.body.appendChild(aTag);
      aTag.click();
      downloadBtn.innerText = "Download File";
      URL.revokeObjectURL(tempUrl);
      aTag.remove();
  }).catch(() => {
      alert("Failed to download file!");
      downloadBtn.innerText = "Download File";
  });
}

downloadBtn.addEventListener("click", e => {
  e.preventDefault();
  downloadBtn.innerText = "Downloading file...";
  fetchFile(image.value);
});
// create a button to download the image and the button will be disabled until the image is loaded and load the link from the image const
function downloadBtn() {
    const downloadBtn = document.createElement('button');
    downloadBtn.innerHTML = 'Download';
    downloadBtn.addEventListener('click', () => {
        // create an if statement to check if theres already a download button
        if (document.querySelector('#download')) {
          document.querySelector('#download').remove();
      }
        const image = document.querySelector('img');
        const link = document.createElement('a');
        link.setAttribute('href', image.src);
        link.setAttribute('download', 'dream.png');
        link.setAttribute('target', '_blank')
        link.click();

    });
    document.body.appendChild(downloadBtn);
}
