$(document).ready(function() {

    $(".phase1").click(function(){
        $("#effect").hide()
        $("#secondstage").show()
        $(".slide1").show()
        var countdownTime = 60;  // Set timer time in seconds
        var timerText = $('.timer-text');
        var timerCircle = $('.timer-circle circle:nth-child(2)');
        var radius = 45;
        var circumference = 2 * Math.PI * radius;

        timerCircle.css('stroke-dasharray', circumference);

        function startTimer() {
            var timeLeft = countdownTime;
            var interval = setInterval(function() {
                timeLeft--;
                var offset = circumference - (timeLeft / countdownTime) * circumference;
                timerCircle.css('stroke-dashoffset', offset);
                timerText.text(timeLeft);

                if (timeLeft <= 0) {
                    clearInterval(interval);
                    alert('Time is up! Submitting quiz...');
                    // Trigger quiz submission or show results here
                }
            }, 1000);
        }

        startTimer();

        $('.next').click(function() {
            var currentBox = $(this).closest('.box');  // Get the current box
            var nextBox = currentBox.next('.box');     // Get the next box
            
            if (nextBox.length) {  // If the next box exists
                currentBox.removeClass('active').hide();  // Hide current box
                nextBox.addClass('active').show();         // Show the next box
            }
        });
            // When the 'Back' button is clicked
            $('.back').click(function() {
                var currentBox = $(this).closest('.box');  // Get the current box
                var prevBox = currentBox.prev('.box');     // Get the previous box
                
                if (prevBox.length) {  // If the previous box exists
                    currentBox.removeClass('active').hide();  // Hide current box
                    prevBox.addClass('active').show();         // Show the previous box
                }
            });
        });
        $('.next').click(function() {
            let answers = [];
            $('input[type="radio"]:checked').each(function() {
                answers.push($(this).parent().text().trim());
            });
            let queryString = answers.map((answer, index) => `q${index + 1}=${encodeURIComponent(answer)}`).join('&');
            window.location.href = 'result.html?' + queryString;
        });
        const urlParams = new URLSearchParams(window.location.search);
        let resultsHtml = '';

        urlParams.forEach((value, key) => {
            resultsHtml += `<p>Answer to Question ${key.slice(1)}: ${value}</p>`;
        });

        $('#results').html(resultsHtml);
   
});