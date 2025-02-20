// Check if the browser supports the Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    alert("Your browser does not support speech recognition. Please use Chrome or another supported browser.");
} else {
    const recognition = new SpeechRecognition();
    recognition.continuous = false; // Stop after one sentence
    recognition.interimResults = false; // Only final results
    recognition.lang = 'en-US'; // Set language

    const micIcon = document.getElementById('mic-icon');
    const searchInput = document.querySelector('input[name="q"]');

    micIcon.addEventListener('click', () => {
        recognition.start(); // Start voice recognition
        micIcon.classList.add('active'); // Add active class for visual feedback
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript; // Get the recognized text
        searchInput.value = transcript; // Insert the text into the search input
        micIcon.classList.remove('active'); // Reset mic color
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        micIcon.classList.remove('active'); // Reset mic color
    };

    recognition.onspeechend = () => {
        recognition.stop(); // Stop recognition when the user stops speaking
        micIcon.classList.remove('active'); // Reset mic color
    };
}

micIcon.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    recognition.abort(); // Stop any ongoing recognition
    recognition.start(); // Start fresh
    micIcon.classList.add('active'); // Add active class for visual feedback
});

