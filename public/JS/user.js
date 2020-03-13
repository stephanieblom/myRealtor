 async function render(){
   const userName = location.hash.substr(1);
   console.log( `[render] called userName(${userName})  `)
   const userData = await $.get(`/api/user/${userName}`)
   
   console.log( ` .. result: `, userData );
   
    let firstName = userData.firstName;
    let lastName = userData.lastName;
    let mobile = userData.mobile;
    let city = userData.city;
    let company = userData.company;
    let emailAddress = userData.emailAddress;
    let listings = userData.listings;

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


$(document).ready( function(){
    /*==================================================================
     [ Validate ]*/

    $('.validate-form').on('submit',function(){
    var name = $('.validate-input input[name="name"]');
    var email = $('.validate-input input[name="email"]');
    var subject = $('.validate-input input[name="subject"]');
    var message = $('.validate-input textarea[name="message"]');

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
    
    
    render();
});

var userCredentials = JSON.parse(localStorage.getItem('checkCredentials'));
console.log(userCredentials);

function opennav() {
    document.getElementById('main').innerHTML = ``;
    document.getElementById('main').innerHTML = `
    <button onclick='closenav()'><i class="fas fa-arrow-circle-right fa-2x" style="color: white; margin: 15px;"></i></button>
    <ul id='sidebarList'>
      <li>
          <a class="nav-link" href="index.html" style="color: white;">Home</a>
      </li>
      <li>
          <a class="nav-link" href="#" style="color: white;">Search</a>
      </li>
      <li>
          <a class="nav-link" href="login.html" style="color: white;">Login</a>
      </li>
  </ul>`;
}
function closenav() {
    document.getElementById('main').innerHTML = `
    <nav class="navbar navbar-expand-sm  navbar-light" style="color: white;">
      <h2>MyREALTOR</h2>
      <button class="navbar-toggler" type="button"
          style="color: white;" onclick="opennav()">
          <span>
              <i class="fa fa-bars" style="color:#fff; font-size: 25px; "></i>
          </span>
      </button>
      <div class="collapse navbar-collapse" id="navbar1">
          <ul class="nav navbar-nav">
              <li class="nav-item">
                  <a class="nav-link" href="index.html" style="color: white;">Home</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#" style="color: white;">Search</a>
              </li>
          </ul>
      </div>
  </nav>
    `;
}
    
