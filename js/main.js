$(document).ready(function () {
    $('.slider-list').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        speed: 700,
        infinite: true,
        autoplaySpeed: 6000,
        autoplay: true
    });

    window.slide = new SlideNav();
});


document.addEventListener("DOMContentLoaded", function() {
    // Close the navbar when clicking outside of it
    document.addEventListener("click", function(event) {
      const navbar = document.querySelector(".navbar-collapse");
      const navbarToggler = document.querySelector(".navbar-toggler");

      if (!navbar.contains(event.target) && !navbarToggler.contains(event.target) && window.getComputedStyle(navbar).display !== "none") {
        navbar.classList.remove("show");
      }
    });
  });


emailjs.init('F0Zii942ZUiPbioL5');

document.getElementById('email-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
   
  let userName = document.getElementById('user-name').value.trim();
  let userEmail = document.getElementById('user-email').value.trim();
  let userPhone = document.getElementById('user-phone').value.trim();
  let message = document.getElementById('message').value.trim();
  let errorMessage = document.getElementById('error-message');
  let successMessage = document.getElementById('success-message');

  // Reset messages
  errorMessage.style.display = 'none';
  successMessage.style.display = 'none';

  if (!userName || !userEmail || !message) {
    errorMessage.textContent = 'All fields are required.';
    errorMessage.style.display = 'block';
    return;
  }

  if (!validateEmail(userEmail)) {
    errorMessage.textContent = 'Please enter a valid email address.';
    errorMessage.style.display = 'block';
    return;
  }

  if (userPhone && !validatePhone(userPhone)) {
    errorMessage.textContent = 'Please enter a valid phone number.';
    errorMessage.style.display = 'block';
    return;
  }

  
    // Send the email
    emailjs.send('service_no8ocz9', 'template_mnx6cht', {
      from_name: userName,
      from_email: userEmail,
      from_phone: userPhone,
      message: message
    }).then(function(response) {
        console.log('Email sent!', response);
        successMessage.textContent = 'Thank you! Your response has been submitted.';
        successMessage.style.display = 'block';
        // Optionally, perform other actions upon successful sending
      }).catch(function(error) {
        console.error('Error sending email:', error);
        errorMessage.textContent = 'Error sending email. Please try again later.';
        errorMessage.style.display = 'block';
        // Optionally, display an error message or handle the error
      });
    });
  
  // Function to validate email format
    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    
    // Function to validate phone number format
    function validatePhone(phone) {
        // Basic pattern matching for phone number (modify as needed for your format)
        const re = /^\d{10}$/; // Change this regex according to your phone number format
        return re.test(phone);
    }



