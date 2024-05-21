$(document).ready(function(){
    $('#contactForm').submit(function(event) {
        event.preventDefault();
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var message = $('#message').val().trim();
        
        if (name === '' || email === '' || message === '') {
            alert('Please fill in all required fields.');
            return;
        }
        
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Message:", message);
        
        alert('Form submitted successfully!');
    });
});