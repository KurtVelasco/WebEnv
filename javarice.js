function searchOperator(event) {
    event.preventDefault();
  
    const inputString = document.getElementById('search-bar').value;
    alert(inputString);
    fetch('/process-input', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputString }),
    })
      .then((response) => response.text())
      .then((output) => {
        console.log(output);
        // Do something with the output
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }