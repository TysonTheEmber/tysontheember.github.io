document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('typing-text');
    const phrases = ["I am a Developer", "I am a Gamer", "I am a Designer", "I am a Programmer"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentPhrase = phrases[phraseIndex];
        const words = currentPhrase.split(' '); // Split phrase into words
        const lastWord = words[words.length - 1]; // Get the last word

        let displayedText = lastWord.substring(0, charIndex);

        if (isDeleting) {
            // Deleting text
            displayedText = lastWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing text
            charIndex++;
        }

        // Append zero-width space to maintain spacing
        displayedText += '\u200B';

        // Replace last word in the phrase with the typed/deleted text
        words[words.length - 1] = displayedText;
        textElement.textContent = words.join(' '); // Join words back into a phrase

        if (!isDeleting && charIndex > lastWord.length) {
            // Finished typing current word, start deleting
            isDeleting = true;
            setTimeout(typeText, 1000);
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to the next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeText, 500);
        } else {
            // Continue typing or deleting
            setTimeout(typeText, isDeleting ? 50 : 150);
        }
    }

    // Start typing animation
    typeText();
});
