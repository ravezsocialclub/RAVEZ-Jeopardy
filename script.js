document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.square');
    const modal = document.getElementById('question-modal');
    const questionText = document.getElementById('question-text');
    const answerText = document.getElementById('answer-text');
    const showAnswerButton = document.getElementById('show-answer-button');
    const closeButton = document.querySelector('.close-button');
    const audio = document.getElementById('question-audio');

    squares.forEach(square => {
        square.addEventListener('click', () => {
            const question = square.getAttribute('data-question');
            const answer = square.getAttribute('data-answer');

            questionText.textContent = question;
            answerText.textContent = answer;

            // Reset answer display
            answerText.style.display = 'none';
            showAnswerButton.style.display = 'inline-block';

            // Visually distinguish the selected square
            square.classList.add('selected');

            // Play audio when square is selected
            audio.currentTime = 0; // Reset audio to start
            audio.play();

            modal.style.display = 'block';
        });
    });

    showAnswerButton.addEventListener('click', () => {
        answerText.style.display = 'block';
        showAnswerButton.style.display = 'none';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        audio.pause(); // Stop audio when modal is closed
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            audio.pause(); // Stop audio when clicking outside the modal
        }
    });
    
    

    // Handle arrow key navigation
    document.addEventListener('keydown', (event) => {
        let currentIndex = Array.from(squares).findIndex(square => square === document.activeElement);
        if (currentIndex >= 0) {
            let newIndex;
            switch (event.key) {
                case 'ArrowUp':
                    newIndex = currentIndex - 5;
                    break;
                case 'ArrowDown':
                    newIndex = currentIndex + 5;
                    break;
                case 'ArrowLeft':
                    newIndex = currentIndex - 1;
                    break;
                case 'ArrowRight':
                    newIndex = currentIndex + 1;
                    break;
            }
            if (newIndex >= 0 && newIndex < squares.length) {
                squares[newIndex].focus();
            }
        }
    });
});
