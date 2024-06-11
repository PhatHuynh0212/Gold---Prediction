document.getElementById('prediction-form').addEventListener('submit', function (event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const data = Object.fromEntries(formData.entries())

  // Log dữ liệu trước khi gửi
  console.log('Sending data:', data)

  // Show loading animation and disable button
  const button = event.target.querySelector('button')
  button.classList.add('loading-active')
  button.disabled = true

  fetch('http://127.0.0.1:5000/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.error || 'Network response was not ok')
        })
      }
      return response.json()
    })
    .then((result) => {
      if (result && result.price !== undefined) {
        document.getElementById('result').innerText = `Predicted Gold Price: $${result.price}`
      } else {
        document.getElementById('result').innerText = 'Error: Invalid response from server'
      }
    })
    .catch((error) => {
      console.error('Error:', error)
      document.getElementById('result').innerText = `Error: ${error.message}`
    })
    .finally(() => {
      // Hide loading animation and enable button
      button.classList.remove('loading-active')
      button.disabled = false
    })
})
