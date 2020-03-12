async function addUser( event ) {
            
    event.preventDefault();


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
        const sendInfo = await $.post( '/api/createUser', newUser );
        toastr.success( `User Created: ${newUser.firstName} ${newUser.lastName}` );
        clearValues();
    }
};
async function signIn() {
    const signInEmail = $('#signInEmail').val();
    const signInPassword = $('#signInPassword').val();

    const userCredentials = {
        email: signInEmail,
        password: signInPassword
    }
    console.log( 'User Credentials: ', userCredentials );
    const checkCredentials = await $.post( '/api/checkCredentials', userCredentials );
    console.log( checkCredentials );
    if ( signInPassword !== checkCredentials.userPassword ){
        toastr.error('WRONG PASSWORD!!!!!');
    } else {
        toastr.success( 'It worked :) '); };

}
$('#signUp-Btn').on('click', addUser );
$('.login-Btn').on('click', signIn );

function clearValues() {
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