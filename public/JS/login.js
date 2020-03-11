function addUser( event ) {
            
    event.preventDefault();

    const signInEmail = $('#signInEmail').val();
    const singInPassword = $('#signInPassword').val();
    const inputFirstName = $('#inputFirstName').val();
    const inputLastName= $('#inputLastName').val();
    const inputMobile = $('#inputMobile').val();
    const inputCity = $('#inputCity').val();
    const inputCompany = $('#inputCompany').val();
    const inputEmail = $('#inputEmail').val();
    const inputPassword = $('#inputPassword').val();
    const confirmPassword = $('#inputPassword2').val();


    const newUser = {
        firstName: inputFirstName,
        lastName: inputLastName,
        mobile: inputMobile,
        city: inputCity,
        company: inputCompany,
        email: inputEmail,
        password: inputPassword,
    }

    if ( inputPassword !== confirmPassword ) {
        toastr.error( 'Passwords Do Not Match :(' )
    } else {
        console.log( 'new user: ', newUser );
        $('#signInEmail').val('');
        $('#signInPassword').val('');
        $('#inputFirstName').val('');
        $('#inputLastName').val('');
        $('#inputMobile').val('');
        $('#inputCity').val('');
        $('#inputCompany').val('');
        $('#inputEmail').val('');
        $('#inputPassword').val('');
        $('#inputPassword2').val('');
    }
};
$('#signUp-Btn').on('click', addUser );