let emailAddress;
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
    emailAddress = userData.emailAddress;
    let listings = userData.listings;
    console.log(`# listings: ${listings}`)

    $('#userName').append(`${firstName} ${lastName}`);
    $('#userCompany').append(`${company}`);
    $('#userLocation').append(`${city}`);
    $('#userMobile').append(`${mobile}`);

    $('#studio').append(`
    <div class="row mb-2">
        <div class="col-md-6 col-12">
            <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
                <h3 class="mb-0">${firstName}</h3>
                <div class="mb-1 text-muted">Listed: Nov 12</div>
                <a style="text-align:left;"><i class="fa fa-bed"></i>: 2</a>
                <a style="text-align:left;"><i class="fa fa-bath"></i>: 2</a>
                <a style="text-align:left;"><i class="fa fa-map-marker"></i>: Toronto</a>
                <a style="text-align:left;"><i class="fa fa-usd"></i>: 350,000</a>
                <br>
                <p class="card-text mb-auto">Beautiful 2 bedroom, 2 bathroom apt right in the heart of Toronto.</p>
                <br>
                <a style="text-align:left;" href="#" class="stretched-link">Learn More</a>
            </div>
            <div class="col-12">
                <img src="https://www.narcity.com/uploads/265664_0a377ae85d7c781f5b778f9eb647bf83982cf3b2.jpg_facebook.jpg" class="thumbnail-size img-fluid" preserveAspectRatio="xMidYMid slice" />
            </div>
            </div>
        </div>
        <div class="col-md-6 col-12">
            <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                <h3 class="mb-0">2 Bedroom Apartment, Entertainment District</h3>
                <div class="mb-1 text-muted">Listed: Nov 12</div>
                    <a style="text-align:left;"><i class="fa fa-bed"></i>: 2</a>
                    <a style="text-align:left;"><i class="fa fa-bath"></i>: 2</a>
                    <a style="text-align:left;"><i class="fa fa-map-marker"></i>: Toronto</a>
                    <a style="text-align:left;"><i class="fa fa-usd"></i>: 450,000</a>
                    <br>
                    <p class="card-text mb-auto">Beautiful 2 bedroom, 2 bathroom apt right in the heart of Toronto.</p>
                    <br>
                    <a style="text-align:left;" href="#" class="stretched-link">Learn More</a>
                </div>
                <div class="col-12">
                    <img src="https://g5-assets-cld-res.cloudinary.com/image/upload/q_auto,f_auto,fl_lossy/v1546721532/g5/g5-c-5cpnmi9wp-quadreal/g5-cl-1hj4qag6gj-bretton-place/uploads/Bretton_Place_Kitchen_Dining_staged_110618_hrf09r.jpg" class="thumbnail-size img-fluid" preserveAspectRatio="xMidYMid slice" />
                </div>
            </div>
        </div>
    </div>`)

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
    
