$(document).ready(function () {
    let results = 0
    $(".phase1").click(function () {
        $("#effect").hide()
        $("#secondstage").show()
        $(".slide1").show()
        var countdownTime = 60; // Timer time in seconds
        var timerText = $('.timer-text');
        var timerCircle = $('.timer-circle circle:nth-child(2)');
        var radius = 45;
        var circumference = 2 * Math.PI * radius;
        var interval; // Declare the interval globally for access

        timerCircle.css('stroke-dasharray', circumference);



        // Function to handle showing results


        function startTimer() {
            var timeLeft = countdownTime;
            interval = setInterval(function () {
                timeLeft--;
                var offset = circumference - (timeLeft / countdownTime) * circumference;
                timerCircle.css('stroke-dashoffset', offset);
                timerText.text(timeLeft);

                if (timeLeft <= 0) {
                    clearInterval(interval);
                    alert('Time is up! Submitting quiz...');
                    showResults(); // Automatically submit and show results
                }
            }, 1000);
        }

        function stopTimer() {
            clearInterval(interval); // Clear the timer interval
        }

        // Function to handle showing results
        function showResults() {
            stopTimer(); // Stop the timer if it's still running
            alert('Quiz submitted! Displaying results...');
            // Add your logic to display quiz results
            // $('#results').html('<p>Your results will appear here.</p>'); // Example results display
            $('section.question').hide(); // Hide the quiz
            $('#submit').show(); // Show the results section
            let totalQuestions = 14; // Total number of correct answers
            let correctAnswers = $('input[data-correct]:checked').length; // User's correct answers


            setTimeout(function () {
                // $('#results').html(`<p>You got ${correctAnswers} out of ${totalQuestions} correct!</p>`);

                // Play the appropriate video

            }, 3000); // 3-second delay


            // Hide quiz section and show results
            $('section.question').hide();
            $('#submit').show();

            // Decide if the user wins or loses
            if (correctAnswers === totalQuestions) {
                // User wins
                $('#winVideo').show().get(0).play(); 
                $('#loseVideo').hide()// Show and play winning video
            } else {
                // User loses
                $('#loseVideo').show().get(0).play(); 
                $('#winVideo').hide()// Show and play losing video
            }
        }

        // Start the timer when the quiz begins
        startTimer();


        // Stop the timer when the user clicks the "Results" button
        $('.results').click(function () {
            showResults();
        });

        $('.next').click(function () {
            var currentBox = $(this).closest('.box');  // Get the current box
            var nextBox = currentBox.next('.box');     // Get the next box

            if (nextBox.length) {  // If the next box exists
                currentBox.removeClass('active').hide();  // Hide current box
                nextBox.addClass('active').show();         // Show the next box
            }
        });
        // When the 'Back' button is clicked
        $('.back').click(function () {
            var currentBox = $(this).closest('.box');  // Get the current box
            var prevBox = currentBox.prev('.box');     // Get the previous box

            if (prevBox.length) {  // If the previous box exists
                currentBox.removeClass('active').hide();  // Hide current box
                prevBox.addClass('active').show();         // Show the previous box
            }
        });
    });

    $('.results').click(function () {
        $(".question").hide()
        $("#submit").show()

    });
    const urlParams = new URLSearchParams(window.location.search);
    let resultsHtml = '';

    urlParams.forEach((value, key) => {
        resultsHtml += `<p>Answer to Question ${key.slice(1)}: ${value}</p>`;
    });


    $('input[type="radio"]').on('click', function () {
        // Remove highlighting from all options
        $('.option').removeClass('highlight');

        // Check if the selected option is correct
        if ($(this).data('correct')) {
            // Highlight the correct container
            $(this).parent().addClass('highlight');
            results++
            console.log(re);

        }
    });
    $('input[type="radio"]').on('click', function () {
        if (!$(this).is(':disabled')) {
            // Disable the radio button group for the current question
            const name = $(this).attr('name');
            $(`input[name="${name}"]`).prop('disabled', true);
        }

    });

});