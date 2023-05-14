const form = document.getElementById('shortest-path-form')
const resultContainer = document.getElementById('result-display')
const startInput = form.elements['start']
const endInput = form.elements['end']
const resultDisplay = document.getElementById('result-container')
const loadingAnimation = document.getElementById('loading-animation');


/* const setDelay = function delayLoad() {
    document.body.style.visibility = 'visible'
}
setTimeout(delayLoad, 2000) */


form.addEventListener('submit', (event) => {
    event.preventDefault()

    const start = startInput.value
    const end = endInput.value

    if (!start || !end) {
        resultDisplay.textContent = 'Please enter a starting and ending node.'
        return
    }

    resultDisplay.textContent = ''

    // Show the loading animation
    loadingAnimation.style.display = 'block'

    setTimeout(() => {
        fetch(`http:localhost:5500/shortest-path/${start}/${end}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    resultDisplay.textContent = data.error
                } else {
                    const path = data.path.join(' --> ')
                    const length = data.length
                    resultDisplay.textContent = `Shortest path: ${path}`
                }
            })
            .catch(error => {
                resultDisplay.textContent = `Error: ${error.message}`
            })
            .finally(() => {
                // Hide the loading animation after the callback executes
                loadingAnimation.style.display = 'none'
            })
    }, 1300) // Show the animation for 1.3 seconds
})


startInput.addEventListener('input', () => {
    resultDisplay.textContent = ''
})

endInput.addEventListener('input', () => {
    resultDisplay.textContent = ''
})
