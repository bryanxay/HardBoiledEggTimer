
// Simple countdown timer: start / stop / reset
(() => {
    let timerInterval = null; // holds interval id

    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const mm = minutes < 10 ? "0" + minutes : minutes;
        const ss = seconds < 10 ? "0" + seconds : seconds;
        return mm + ":" + ss;
    }
    
    function startCountdown(durationSeconds, display) {
        // Prevent multiple intervals
        if (timerInterval) clearInterval(timerInterval);

        let remaining = durationSeconds;
        display.textContent = formatTime(remaining);

        timerInterval = setInterval(() => {
            remaining -= 1;
            if (remaining < 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                display.textContent = formatTime(0);
                // Simple notification; can be replaced with sound.
                alert("Time's up! Your eggs should be ready.");
                return;
            }

            display.textContent = formatTime(remaining);
        }, 1000);
    }

    function stopCountdown() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    window.addEventListener('load', () => {
        const display = document.querySelector('#time');
        const startBtn = document.querySelector('#startBtn');
        const stopBtn = document.querySelector('#stopBtn');
        const resetBtn = document.querySelector('#resetBtn');

        // Default to 6 minutes for runny yolk
        const sixMinutes = 60 * 6;
        display.textContent = formatTime(sixMinutes);

        startBtn.addEventListener('click', () => startCountdown(sixMinutes, display));
        stopBtn.addEventListener('click', () => stopCountdown());
        resetBtn.addEventListener('click', () => {
            stopCountdown();
            display.textContent = formatTime(sixMinutes);
        });
    });
})();