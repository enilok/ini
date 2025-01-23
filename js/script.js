$(document).ready(function () {
    let results = 0
    $(".phase1").click(function () {
        $("#effect").hide()
        $("#secondstage").show()
        $(".slide1").show()
        let countdownTime = 120; // Timer time in seconds
        let timerText = $('.timer-text');
        let timerCircle = $('.timer-circle circle:nth-child(2)');
        let radius = 45;
        let circumference = 2 * Math.PI * radius;
        let interval; // Declare the interval globally for access

        timerCircle.css('stroke-dasharray', circumference);



        // Function to handle showing results


        function startTimer() {
            let timeLeft = countdownTime;//let timeLeft = countdownTime;
// This sets the starting value of the timer (timeLeft) to the value of countdownTime. This is the total time allotted for the quiz.
            interval = setInterval(function () {
                timeLeft--;//timeLeft--;
                // //  Every second, timeLeft is decremented by 1, reducing the countdown.
                let offset = circumference - (timeLeft / countdownTime) * circumference;//let offset = circumference - (timeLeft / countdownTime) * circumference;
//This calculates the offset for a circular progress bar to show the remaining time.
                //circumference is the total length of the circle's outline.
        //As time decreases, the offset changes, causing the circle to gradually "empty out."
                timerCircle.css('stroke-dashoffset', offset);//timerCircle.css('stroke-dashoffset', offset);
// This applies the calculated offset to the CSS property stroke-dashoffset of an SVG circle (which is assumed to be your progress circle).
                //The stroke-dashoffset controls how much of the circle's outline is visible, and by modifying it, the circle "fills" or "empties" as time passes.
                timerText.text(timeLeft);//timerText.text(timeLeft);
//  This updates the text inside an element (likely a <span> or <div>) with the remaining timeLeft.
               // It shows the countdown timer numerically (e.g., 60, 59, 58, etc.).

                if (timeLeft <= 0) { //if (timeLeft <= 0) {...}
 // Once timeLeft reaches 0 or less, the following actions occur:
                    
                   // clearInterval(interval);:
                    
                   // Stops the timer by clearing the interval that was running.
                   // alert('Time is up! Submitting quiz...');:
                    
                   // Shows an alert to the user, notifying them that the time is up.
                   
                   // showResults();:
                    
                   // Calls a function (showResults()) to submit the quiz and show the results automatically. This function should handle displaying the final score, results, and other necessary actions.
                    
                    clearInterval(interval);
                    alert('Time is up! Submitting quiz...');
                    showResults(); // Automatically submit and show results
                }
            }, 1000);//interval = setInterval(function () {...}, 1000);

          //  setInterval starts a repeating function every 1 second (1000ms).
           // The function inside setInterval runs every second and updates the timer and progress bar.
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
                $('#winVideo').show().get(0).play();//.get(0)retrieves the native DOM elemnet,which supports the .play()method 
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

    
//$('input[type="radio"]').on('click', function () {...});Adds a click event listener to all <input> elements of type radio.
// When a user clicks on any radio button, the code inside the function runs.

//$('.option').removeClass('highlight');Before applying any new highlighting, the script removes the highlight class from all elements with the class .option.
//This ensures that only one option is highlighted at any given time.

//if ($(this).data('correct')) { ... }
//The condition checks if the data-correct attribute of the clicked radio button is set to true.
//$(this) refers to the clicked radio button.
//.data('correct') fetches the value of the data-correct attribute (e.g., true or false).

//$(this).parent().addClass('highlight');
//If the clicked radio button is marked as correct (data-correct="true"), this line highlights its parent element (usually a <p> or <div> wrapping the radio button).
//.addClass('highlight') applies a CSS class named highlight to the parent element, which is likely styled to visually indicate the correct answer.

//results++;
//This increments the results variable, which likely tracks the user's score.
//Every time the user selects a correct answer, their score is updated.

    $('input[type="radio"]').on('click', function () {
        // Remove highlighting from all options
        $('.option').removeClass('highlight');

        // Check if the selected option is correct
        if ($(this).data('correct')) {
            // Highlight the correct container
            $(this).parent().addClass('highlight');
            results++
            console.log(results);

        }
    });
    //$('input[type="radio"]'):This selects all <input> elements of type radio in the DOM

    //.on('click', function () {...}):
    //This attaches a click event listener to each of those radio buttons.When a radio button is clicked, the anonymous function inside the handler is executed.
    
    //if (!$(this).is(':disabled')) { ... }:
    // The condition checks if the clicked radio button (this) is not already disabled (:disabled is a jQuery pseudo-class for disabled elements).
    // If it's not disabled, the following logic is executed.

    //const name = $(this).attr('name');:
    // Retrieves the name attribute of the clicked radio button. Radio buttons are grouped by their name attribute, so this helps identify which group the clicked button belongs to.

    //$(`input[name="${name}"]`).prop('disabled', true);:
    // Disables all radio buttons in the same group by targeting all <input> elements with the same name attribute as the clicked button..prop('disabled', true) sets the disabled property to true, preventing further interaction with any radio button in that group.

    $('input[type="radio"]').on('click', function () {
        if (!$(this).is(':disabled')) {
            // Disable the radio button group for the current question
            const name = $(this).attr('name');
            $(`input[name="${name}"]`).prop('disabled', true);
        }

    });

});