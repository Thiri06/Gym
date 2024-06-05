
// For Gallery page with filtered button of images
$(document).ready(function () {
    // Select all elements with the class 'filter-button'
    const $buttons = $('.filter-button');
    // Select all elements with the class 'filter'
    const $images = $('.filter');

    // Add a click event listener to each button
    $buttons.on('click', function () {
        // Get the data-filter attribute of the clicked button
        const filter = $(this).data('filter');

        // Remove 'active' class from all buttons
        $buttons.removeClass('active');
        // Add 'active' class to the clicked button
        $(this).addClass('active');

        // Show or hide images based on the filter
        $images.each(function () {
            if (filter === 'all' || $(this).hasClass(filter)) {
                $(this).parent().show();
            } else {
                $(this).parent().hide();
            }
        });
    });

    // Trigger the "All" button click by default to show all images
    $('[data-filter="all"]').trigger('click');
});

// For Homepage animated text typing
$(document).ready(function () {
    const text = "Contact us today for more information about our martial arts classes!!!";
    const $typingText = $('#typing-text');
    let index = 0;
    let isDeleting = false;
    const speed = 50; // Speed of typing
    const deleteSpeed = 50; // Speed of deleting
    const stopDeletingIndex = 1; // The position to stop deleting (keeping "C")

    function typeWriter() {
        if (!isDeleting && index < text.length) {
            $typingText.append(text.charAt(index));
            index++;
            setTimeout(typeWriter, speed);
        } else if (isDeleting && index > stopDeletingIndex) {
            $typingText.html(text.substring(0, index - 1));
            index--;
            setTimeout(typeWriter, deleteSpeed);
        } else if (index === text.length) {
            setTimeout(() => isDeleting = true, 1000); // Pause before starting to delete
            setTimeout(typeWriter, 1000); // Start deleting after a pause
        } else if (index === stopDeletingIndex) {
            isDeleting = false;
            setTimeout(typeWriter, 100); // Pause before starting to type again
        }
    }

    typeWriter();
});

// For contact page form validation
$(document).ready(function () {
    // Regular expressions for validation
    var nameRegex = /^[a-zA-Z\s]+$/; // Only alphabets and spaces
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format
    var phoneRegex = /^\d{10}$/; // 10 digit phone number

    // Function to validate input and display message
    function validateInput(inputField, regex) {
        var inputValue = $(inputField).val();
        if (regex.test(inputValue)) {
            $(inputField).next('.validation-message').text('Looks Good').css('color', 'green');
        } else {
            $(inputField).next('.validation-message').text('Invalid input').css('color', 'red');
        }
    }
    // Function to check if all fields are valid
    function validateForm() {
        var isValid = true;
        $('.form-control').each(function () {
            if ($(this).val() === '' || $(this).next('.validation-message').text() !== 'Looks Good') {
                isValid = false;
                return false; // Exit loop early if any field is invalid
            }
        });
        return isValid;
    }
    // Validate name input
    $('#inputName').on('input', function () {
        validateInput(this, nameRegex);
    });
    // Validate email input
    $('#inputEmail').on('input', function () {
        validateInput(this, emailRegex);
    });
    // Validate phone number input
    $('#inputPhone').on('input', function () {
        validateInput(this, phoneRegex);
    });
    // Validate message textarea
    $('#message').on('input', function () {
        var inputValue = $(this).val();
        if (inputValue.trim() !== '') {
            $(this).next('.validation-message').text('Looks Good').css('color', 'green');
        } else {
            $(this).next('.validation-message').text('Please enter a message').css('color', 'red');
        }
    });
    // Validate form on submit
    $('form').submit(function (event) {
        event.preventDefault(); // Prevent default form submission
        // Check if all fields are valid
        if (validateForm()) {
            // Display loading icon
            $('#sendIcon').hide();
            $('#loadingIcon').show();
            // Simulate form submission delay (replace with actual form submission logic)
            setTimeout(function () {
                // Display success message
                $('#loadingIcon').hide();
                $('#sendIcon').show();
                $('#success-message').html('<img src="Images/check.png" alt="Success" width="20px"> Your submission is successful and we will contact you soon. ')
                .css('color', 'green');

                // Clear all validation messages
                $('.validation-message').text('');

                // Reset the submit button
                $('#sendButton').prop('disabled', false); // Re-enable the button
                
                $('#sendIcon').show(); // Show the "Send" text
                
                $('#loadingIcon').hide(); // Hide the loading icon
            }, 3000); // Change the delay time as needed
        } else {
            // Display error message
            $('#success-message').text('Please fill in all fields correctly').css('color', 'red');
        }
    });
});

