async function render(){

    const userName = location.hash.substr(1);
    const userData = await $.get(`/api/user/${userName}`)

    let firstName = userData.firstName;
    let lastName = userData.lastName;
    let mobile = userData.mobile;
    let city = userData.city;
    let company = userData.company;
    let emailAddress = userData.emailAddress;

    $('#userName').append(`${firstName} ${lastName}`);
    $('#userCompany').append(`${company}`);
    $('#userLocation').append(`${city}`);
    $('#userMobile').append(`${mobile}`);

}



function scrollToContactForm(){
    $('html,body').animate({
        scrollTop: $("#contact-form").offset().top- $(window).height()/7},
        'slow');
}
function scrollToTop(){
    $('html,body').animate({
        scrollTop: $("#main").offset().top},
        'slow');
}

async function sendEmail(){
    event.preventDefault();

    const msg = {
        to: emailAddress,
        from: $("#senderEmail").val(),
        subject: $("#emailSubject").val(),
        text: $("#emailBody").val(),
        html: $("#emailBody").val(),
      };

      console.log(`Sending email to: ${msg.to}`)
    
    const apiResult = await $.post( '/api/email', msg );
    
    if( apiResult.message ){
        console.log( `Successfully sent email!`);
    
        // clear form.
        $('#senderName').val( "" );
        $('#senderEmail').val( "" );
        $('#emailSubject').val( "" );
        $('#emailBody').val( "" );
    
    }
}

$("#contact").on('click', scrollToContactForm);
$(".contact1-form-btn").on('click', scrollToTop);
$(".contact1-form-btn").on('click', sendEmail);


(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var name = $('.validate-input input[name="name"]');
    var email = $('.validate-input input[name="email"]');
    var subject = $('.validate-input input[name="subject"]');
    var message = $('.validate-input textarea[name="message"]');


    $('.validate-form').on('submit',function(){
        var check = true;

        if($(name).val().trim() == ''){
            showValidate(name);
            check=false;
        }

        if($(subject).val().trim() == ''){
            showValidate(subject);
            check=false;
        }


        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;
        }

        if($(message).val().trim() == ''){
            showValidate(message);
            check=false;
        }

        return check;
    });


    $('.validate-form .input1').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);

$(document).ready( function(){
    render();
});
