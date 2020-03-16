


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
    let bio = userData.bio
    emailAddress = userData.emailAddress;
    let listings = userData.listings;
    console.log(`# listings: ${listings}`)

    $('#userName').append(`${firstName} ${lastName}`);
    $('#userCompany').append(`${company}`);
    $('#userLocation').append(`${city}`);
    $('#userMobile').append(`${mobile}`);
    $('#bio').append( bio )

    if ( !listings.length) {
        console.log( 'empty array!')
        $('#studio').append( '<h1 style="color: grey;">No Listings</h1>')
    } 
    listings.forEach( function( listing ){
        console.log(typeof(listing._id))

        let description; 
            if( !listing.description ) {
                console.log('no description');
                description = ''
            } else { description = listing.description };

        $('#studio').append(`
        <div class="col-lg-4 col-md-6 col-12" >
            <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
                <h3 class="mb-0"></i>${listing.price}</h3>
                <div class="mb-1 text-muted">Listed: Nov 12</div>
                <hr>
                <a ><i class="fa fa-bed"></i>: ${listing.beds}</a>
                <a ><i class="fa fa-bath"></i>: ${listing.baths}</a>
                <a ><i class="fa fa-map-marker"></i>: ${listing.address}</a>
                <i style="display: none;" id="${listing._id}" onclick="editDescription('${listing._id}', '${description}')" class="fa fa-sm fa-edit"></i>
                <p class="card-text mb-auto" id="description${listing._id}" style="height: 50px;">${description}</p>
                <input type="text" class="form-control" id="editDescription${listing._id}" style="display : none" ></input>
                <br>
            </div>
            <div class="col-12">
                <img src="${listing.photo}" class="thumbnail-size img-fluid" preserveAspectRatio="xMidYMid slice" />
            </div>
        </div>
        `)

    })
    
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
        toastr.success('Email sent!') ;
    
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


$(document).ready( async function(){

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
    
    
    await render();

//TO CHANGE PAGE BASED ON WHETHER THEY ARE LOGGIN IN OR NOT
    function checkLoginStatus () {
        const userCredentials = JSON.parse(localStorage.getItem('checkCredentials'));

        if ( !userCredentials ){
            console.log( 'logged out!' );
        } else {
            console.log( 'logged in!');
            $('#login-Btn').text('Log Out');
            $('#login-Btn').click( function() {
                console.log( 'you clicked the logout button' );
                localStorage.removeItem( 'checkCredentials' );
            });

            const userNameURL = location.hash.substr(1);
            const userNameLocalStorage = createUserName( userCredentials.emailAddress );

            function createUserName ( email ){

                const user = email;
                const iend = user.indexOf("@");
                const userName = user.substring(0 , iend);

                return userName; }

                if ( userNameURL === userNameLocalStorage ){
                    // $('#editInfoIcon').removeAttr('style','display : none');
                    $('.fa-edit').removeAttr('style','display : none');
                } 

            } 
        }
        checkLoginStatus();

});
// JASON CODE FOR EDITING PAGE BEGINS!!!
async function editPage(){
    console.log( 'Editing Page!')
    document.getElementById("editForm").style.display = "block";
    $('.name').attr('style','display: none;');
    $('.description').attr('style','display: none;');
    $('.edit-Btn').attr('style','display: none;');
    
//Getting user data and appending into form
    const userName = location.hash.substr(1);
    console.log( `[render] called userName(${userName})  `)
    const userData = await $.get(`/api/user/${userName}`)
 
    
    console.log( ` .. form result: `, userData );
    
     let firstName = userData.firstName;
     let lastName = userData.lastName;
     let mobile = userData.mobile;
     let city = userData.city;
     let company = userData.company;
     let bio = userData.bio

     $( '#editFirstName' ).val( firstName );
     $( '#editLastName' ).val( lastName );
     $( '#editMobile' ).val( mobile );
     $( '#editCity' ).val( city );
     $( '#editCompany' ).val( company );
     $( '#editBio' ).val( bio );
}

  
  async function saveForm( ) {

    const inputFirstName = $('#editFirstName').val();
    const inputLastName= $('#editLastName').val();
    const inputMobile = $('#editMobile').val();
    const inputCity = $('#editCity').val();
    const inputCompany = $('#editCompany').val();
    const inputBio = $('#editBio').val();
    const localStorageInfo = JSON.parse(localStorage.getItem( 'checkCredentials') );
    const emailAddress = localStorageInfo.emailAddress;
    console.log( 'Email: ', emailAddress );


    const userInfo = {
        firstName: inputFirstName,
        lastName: inputLastName,
        mobile: inputMobile,
        city: inputCity,
        company: inputCompany,
        bio : inputBio,
        emailAddress : emailAddress,
    }
    console.log( 'User info values: ', userInfo);
    const sendInfo = await $.post( '/api/updateUser', userInfo);
    toastr.success( `User Updated: ${userInfo.firstName} ${userInfo.lastName}` );
    setTimeout( function() {
        location.reload();
    }, 1500 );

  }
  function cancelForm() {
    document.getElementById("editForm").style.display = "none";
    $('.name').removeAttr('style','display: none;');
    $('.description').removeAttr('style','display: none;');
    $('.edit-Btn').removeAttr('style','display: none;');
  }
  async function editDescription( id, val){
    console.log('val: ', val )
    await $(`#editDescription${id}`).val( val );

      console.log(`pressed edit description${id}` );
      $(`#${id}`).removeAttr('class', 'fa-edit');
      $(`#${id}`).attr('class', 'fa-save fa');
      $(`#description${id}`).hide();

      $(`#editDescription${id}`).removeAttr('style','display: none');

      
      $(`#${id}`).removeAttr('onclick');
      $(`#${id}`).attr('onclick', `updateList( '${id}' )`);

  }
  async function updateList( id ) {
    const newDescription = $(`#editDescription${id}`).val();
      console.log('updating list', id );
      console.log('description: ', newDescription);

      const obj = {
          id : id,
          description : newDescription
      }
      const sendDescription = await $.post( '/api/listDescription', obj );
      toastr.success('Listing description saved!');
      setTimeout( function() {
        location.reload();
    }, 1500 );
  }
  //JASON FUNCTIONS FOR EDITING PAGE ENDS!!!!!

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
          <a class="nav-link" href="index.html" style="color: white;">Search</a>
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
                <a class="nav-link" href="index.html" style="color: white;">Home </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" style="color: white;"><i class="fa fa-search" aria-hidden="true"></i> Search for Agent</a>
            </li> 
        </ul>
        <a class="btn btn-outline-light nav-link" href="login.html" role="button" style="color: white;">Login</a>
    </div>
</nav>
    `;
}
    

let searchvalue = document.getElementById('searchbar');
console.log(searchvalue.value);