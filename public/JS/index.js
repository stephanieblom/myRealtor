$(document).ready( function() {
    console.log( 'document ready!');
    
    const userCredentials = JSON.parse(localStorage.getItem('checkCredentials'));

    if ( !userCredentials ){
        console.log( 'logged out!' );
    } else {
        console.log( 'logged in!');

        $('#login-Btn').text('Log Out');
        $('#login-Btn').click( function() {
            console.log('you clicked the logout button');
            localStorage.removeItem( 'checkCredentials' );
        })
        const userName = createUserName( userCredentials.emailAddress );

let lists = [];
        $('#profile-Btn').removeAttr( 'href' );
        $('#profile-Btn').attr( 'href', `/user.html#${userName}`);

        $('#try-Btn').attr( 'style', 'opacity: 0;')



        function createUserName ( email ){
            const user = email;
            const iend = user.indexOf("@");
            const userName = user.substring(0 , iend);
            console.log( userName ); 
            return userName;
        }
    }
})

let lists = [];

function opennav() {
    document.getElementById('main').innerHTML = ``;
    document.getElementById('main').innerHTML = `
    <button onclick='closenav()'><i class="fas fa-arrow-circle-right fa-2x"></i></button>
    <ul id='sidebarList'>
      <li>
          <a class="nav-link" href="#" style="color: white;">Home</a>
      </li>
      <li>
          <a class="nav-link" href="#" style="color: white;">Search</a>
      </li>
      <li>
          <a class="nav-link" href="#" style="color: white;">View-List</a>
      </li>
      <li>
          <a class="nav-link" href="#" style="color: white;">Login</a>
      </li>
  </ul>`;
}
function closenav() {
    document.getElementById('main').innerHTML = `
    <nav class="navbar navbar-expand-sm  navbar-light">
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
                  <a class="nav-link" href="#" style="color: white;">Home</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#" style="color: white;">Search</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#" style="color: white;">View-List</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#" style="color: white;">Login</a>
              </li>
          </ul>
      </div>
  </nav>
    `;
}
var forSale = {
    "async": true,
    "crossDomain": true,
    "url": "https://realtor.p.rapidapi.com/properties/list-for-sale?sort=relevance&radius=10&city=New%20York%20City&offset=0&limit=200&state_code=NY",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "realtor.p.rapidapi.com",
        "x-rapidapi-key": "2c764843ddmshb324175d9a3ca0ap10afdcjsn487f67974fbf"
    }
}

$.ajax(forSale).done(async function (response) {
   let check = await response.listings[0].photo_count === 0;
    console.log(check);
    if (check === true){
    document.getElementById('card3').innerHTML = await `<div class="card border-dark mb-3" style="max-width: 18rem;">
    <div class="card-header" style="color: black;" id="cardHeader3">${response.listings[0].address}</div>
    <div class="card-body text-dark">
        <img class='img-fluid' src='https://www.dummyimage.com/600x400/6e6e6e/ffffff.jpg&text=NO-IMAGES+AVAILABLE' style='width:100%;height:auto;' alt="" id="plotImage">
        <h5 class="card-title" style="color: black;">Sale</h5>
        <ul style="list-style-type:none;text-align:left;">
        <li style='color:black;'><i class="fas fa-home" style='color:black;'></i>: ${response.listings[0].prop_type}<li>
        <li style='color:black;'><i class="fas fa-usd" style='color:black;'></i>: ${response.listings[0].price}<li>
        <li style='color:black;'><i class="fas fa-bed" style='color:black;'></i>: ${response.listings[0].beds}<li>
        <li style='color:black;'><i class="fas fa-bath" style='color:black;'></i>: ${response.listings[0].baths}<li>
        </ul>
    </div>
</div>`;}
else {
    document.getElementById('card3').innerHTML = await `<div class="card border-dark mb-3" style="max-width: 18rem;">
    <div class="card-header" style="color: black;" id="cardHeader3">${response.listings[0].address}</div>
    <div class="card-body text-dark">
        <img class='img-fluid' src='${response.listings[0].photo}' style='width:100%;height:auto;' alt="" id="plotImage">
        <h5 class="card-title" style="color: black;">Sale</h5>
        <ul style="list-style-type:none;text-align:left;">
        <li style='color:black;'><i class="fas fa-home" style='color:black;'></i>: ${response.listings[0].prop_type}<li>
        <li style='color:black;'><i class="fas fa-usd" style='color:black;'></i>: ${response.listings[0].price}<li>
        <li style='color:black;'><i class="fas fa-bed" style='color:black;'></i>: ${response.listings[0].beds}<li>
        <li style='color:black;'><i class="fas fa-bath" style='color:black;'></i>: ${response.listings[0].baths}<li>
        </ul>
    </div>
</div>`;
}
});
var forRent = {
    "async": true,
    "crossDomain": true,
    "url": "https://realtor.p.rapidapi.com/properties/list-for-rent?radius=10&sort=relevance&state_code=NY&limit=200&city=New%20York%20City&offset=0",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "realtor.p.rapidapi.com",
        "x-rapidapi-key": "2c764843ddmshb324175d9a3ca0ap10afdcjsn487f67974fbf"
    }
}

$.ajax(forRent).done(async function (response) {
    console.log(response);
    let check1 = await response.listings[1].photo_count === 0;
    let check2 = await response.listings[3].photo_count === 0;
    console.log(check1,check2);
    if(check1 === true){
    document.getElementById('card2').innerHTML = await `<div class="card border-dark mb-3" style="max-width: 18rem;">
    <div class="card-header" style="color: black;" id="cardHeader3">${response.listings[1].address}</div>
    <div class="card-body text-dark">
        <img class='img-fluid' src='https://www.dummyimage.com/600x400/6e6e6e/ffffff.jpg&text=NO-IMAGES+AVAILABLE' style='width:100%;height:auto;background-color:black;' alt="" id="plotImage">
        <h5 class="card-title" style="color: black;">Rent</h5>
        <ul style="list-style-type:none;text-align:left;">
        <li style='color:black;'><i class="fas fa-home" style='color:black;'></i>: ${response.listings[1].prop_type}<li>
        <li style='color:black;'><i class="fas fa-usd" style='color:black;'></i>: ${response.listings[1].price}<li>
        <li style='color:black;'><i class="fas fa-bed" style='color:black;'></i>: ${response.listings[1].beds}<li>
        <li style='color:black;'><i class="fas fa-bath" style='color:black;'></i>: ${response.listings[1].baths}<li>
        </ul>
    </div>
</div>`;
    }
    else{
        document.getElementById('card2').innerHTML = await `<div class="card border-dark mb-3" style="max-width: 18rem;">
        <div class="card-header" style="color: black;" id="cardHeader3">${response.listings[1].address}</div>
        <div class="card-body text-dark">
            <img class='img-fluid' src='${response.listings[1].photo}' style='width:100%;height:auto;background-color:black;' alt="" id="plotImage">
            <h5 class="card-title" style="color: black;">Rent</h5>
            <ul style="list-style-type:none;text-align:left;">
            <li style='color:black;'><i class="fas fa-home" style='color:black;'></i>: ${response.listings[1].prop_type}<li>
            <li style='color:black;'><i class="fas fa-usd" style='color:black;'></i>: ${response.listings[1].price}<li>
            <li style='color:black;'><i class="fas fa-bed" style='color:black;'></i>: ${response.listings[1].beds}<li>
            <li style='color:black;'><i class="fas fa-bath" style='color:black;'></i>: ${response.listings[1].baths}<li>
            </ul>
        </div>
    </div>`;
    }

});
var forRent2 = {
    "async": true,
    "crossDomain": true,
    "url": "https://realtor.p.rapidapi.com/properties/list-for-rent?radius=10&sort=relevance&state_code=NY&limit=200&city=New%20York%20City&offset=0",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "realtor.p.rapidapi.com",
        "x-rapidapi-key": "2c764843ddmshb324175d9a3ca0ap10afdcjsn487f67974fbf"
    }
}

$.ajax(forRent2).done(async function (response) {
    console.log(response);

    let check2 = await response.listings[3].photo_count === 0;
    console.log(check2);
    if(check2 === true){
    document.getElementById('card1').innerHTML =  await `<div class="card border-dark mb-3" style="max-width: 18rem;">
    <div class="card-header" style="color: black;" id="cardHeader3">${response.listings[3].address}</div>
    <div class="card-body text-dark">
        <img class='img-fluid' src='https://www.dummyimage.com/600x400/6e6e6e/ffffff.jpg&text=NO-IMAGES+AVAILABLE' style='width:100%;height:auto;background-color:black;' alt="" id="plotImage">
        <h5 class="card-title" style="color: black;">Rent</h5>
        <ul style="list-style-type:none;text-align:left;">
        <li style='color:black;'><i class="fas fa-home" style='color:black;'></i>: ${response.listings[3].prop_type}<li>
        <li style='color:black;'><i class="fas fa-usd" style='color:black;'></i>: ${response.listings[3].price}<li>
        <li style='color:black;'><i class="fas fa-bed" style='color:black;'></i>: ${response.listings[3].beds}<li>
        <li style='color:black;'><i class="fas fa-bath" style='color:black;'></i>: ${response.listings[3].baths}<li>
        </ul>
    </div>
</div>`;}
else{
    document.getElementById('card1').innerHTML =  await `<div class="card border-dark mb-3" style="max-width: 18rem;">
        <div class="card-header" style="color: black;" id="cardHeader3">${response.listings[3].address}</div>
        <div class="card-body text-dark">
            <img class='img-fluid' src='${response.listings[3].photo}' style='width:100%;height:auto;background-color:black;' alt="" id="plotImage">
            <h5 class="card-title" style="color: black;">Rent</h5>
            <ul style="list-style-type:none;text-align:left;">
            <li style='color:black;'><i class="fas fa-home" style='color:black;'></i>: ${response.listings[3].prop_type}<li>
            <li style='color:black;'><i class="fas fa-usd" style='color:black;'></i>: ${response.listings[3].price}<li>
            <li style='color:black;'><i class="fas fa-bed" style='color:black;'></i>: ${response.listings[3].beds}<li>
            <li style='color:black;'><i class="fas fa-bath" style='color:black;'></i>: ${response.listings[3].baths}<li>
            </ul>
        </div>
    </div>`;

}
});

function displayRentals() {
    let inputcity = document.getElementById('inputCity');
    let inputState = document.getElementById('inputState');
    let inputCountry = document.getElementById('inputCountry');
    let inputZip = document.getElementById('inputZip');
    let inpMinPrice = document.getElementById('inputMinPrice');
    let inpMaxPrice = document.getElementById('inputMaxPrice');
    let inputBeds = document.getElementById('inputBeds');
    let inputBaths = document.getElementById('inputBath');
    console.log(inputcity.value);
    var listwithContent = {
        "async": true,
        "crossDomain": true,
        "url": `https://realtor.p.rapidapi.com/properties/list-for-rent?price_min=${inpMinPrice.value}&postal_code=${inputZip.value}&price_max=${inpMaxPrice.value}&beds_min=${inputBeds.value}&sort=relevance&baths_min=${inputBaths.value}&state_code=${inputState.value}&country=${inputCountry.value}&city=${inputcity.value}&limit=15&offset=0`,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "realtor.p.rapidapi.com",
            "x-rapidapi-key": "2c764843ddmshb324175d9a3ca0ap10afdcjsn487f67974fbf"
        }
    }
    inputcity.value = '';
    inputState.value = '';
    inputCountry.value = '';
    inputZip.value = '';
    inpMinPrice.value = '';
    inpMaxPrice.value = '';
    inputBeds.value = '';
    inputBaths.value = '';

    $.ajax(listwithContent).done(async function (response3) {
        console.log('going into this function');
        console.log(response3);
        document.getElementById('displaySample').innerHTML = '';
        document.getElementById('displaySample').innerHTML = `
    <div class="card-header" style="color: black;">Latest Listing of Rentals</div>
    <div class="card-body" id='lists'>
    <div class='row' id='rentals' style='display:flex;justify-content:space-around;'>
    </div>
    </div>`;

        for (let i = 0; i < response3.listings.length; i++) {
            let check = await response3.listings[i].photo_count === 0;
            if(check === true){
            document.getElementById('rentals').innerHTML += `
            <div class="col-sm-6 col-md-3 col-lg-3 card" id=h${i} style='margin:6px;'>
            <h5 class="text-uppercase title" id='title${i}' style='color:black;'>${response3.listings[i].address}</h5>
            <img src="https://www.dummyimage.com/600x400/6e6e6e/ffffff.jpg&text=NO-IMAGES+AVAILABLE" id='photo${i}' class="img-fluid" >
            <ul style="list-style-type:none;text-align:left;">
                <li style='color:black;' id='type${i}'><i class="fas fa-home" style='color:black;'></i> ${response3.listings[i].prop_type}<li>
                <li style='color:black;' id='price${i}'><i class="fas fa-usd" style='color:black;'></i> ${response3.listings[i].price}<li>
                <li style='color:black;' id='bed${i}'><i class="fas fa-bed" style='color:black;'></i> ${response3.listings[i].beds}<li>
                <li style='color:black;' id='bath${i}'><i class="fas fa-bath" style='color:black;'></i> ${response3.listings[i].baths}<li>
            </ul>
            <button class='btn btn-light' style='text-align:right;' onclick='saveListing(${i})' id='${i}'><i class="far fa-bookmark" style='color:black;'></i></button>
        </div> 
    
    `;}
    else{
        document.getElementById('rentals').innerHTML += `
        <div class="col-sm-6 col-md-3 col-lg-3 card" id=h${i} style='margin:6px;'>
        <h5 class="text-uppercase title" id='title${i}' style='color:black;'>${response3.listings[i].address}</h5>
        <img src="${response3.listings[i].photo}" id='photo${i}' class="img-fluid" >
        <ul style="list-style-type:none;text-align:left;">
            <li style='color:black;' id='type${i}'><i class="fas fa-home" style='color:black;'></i> ${response3.listings[i].prop_type}<li>
            <li style='color:black;' id='price${i}'><i class="fas fa-usd" style='color:black;'></i> ${response3.listings[i].price}<li>
            <li style='color:black;' id='bed${i}'><i class="fas fa-bed" style='color:black;'></i> ${response3.listings[i].beds}<li>
            <li style='color:black;' id='bath${i}'><i class="fas fa-bath" style='color:black;'></i> ${response3.listings[i].baths}<li>
        </ul>
        <button class='btn btn-light' style='text-align:right;' onclick='saveListing(${i})' id='${i}'><i class="far fa-bookmark" style='color:black;'></i></button>
    </div> 

`; 
    }
        }
    });
}
function displaySales(){
    let inputcity = document.getElementById('inputCity2');
    let inputState = document.getElementById('inputState2');
    let inputCountry = document.getElementById('inputCountry2');
    let inputZip = document.getElementById('inputZip2');
    let inpMinPrice = document.getElementById('inputMinPrice2');
    let inpMaxPrice = document.getElementById('inputMaxPrice2');
    let inputBeds = document.getElementById('inputBeds2');
    let inputBaths = document.getElementById('inputBath2');
    console.log(inputcity.value);
    var listwithContent = {
        "async": true,
        "crossDomain": true,
        "url": `https://realtor.p.rapidapi.com/properties/list-for-sale?sort=relevance&baths_min=${inputBaths.value}&beds_min=${inputBeds.value}&city=${inputcity.value}&offset=0&limit=15&state_code=${inputState.value}`,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "realtor.p.rapidapi.com",
            "x-rapidapi-key": "2c764843ddmshb324175d9a3ca0ap10afdcjsn487f67974fbf"
        }
    }
    inputcity.value = '';
    inputState.value = '';
    inputCountry.value = '';
    inputZip.value = '';
    inpMinPrice.value = '';
    inpMaxPrice.value = '';
    inputBeds.value = '';
    inputBaths.value = '';

    $.ajax(listwithContent).done(async function (response3) {
        console.log('going into this function');
        console.log(response3);
        document.getElementById('displaySample').innerHTML = '';
        document.getElementById('displaySample').innerHTML = `
         <button class='btn btn-light'>Done</button>
        <div class="card-header" style="color: black;">Latest Listing of sales</div>
        <div class="card-body" id='lists'>
        <div class='row' id='sales' style='display:flex;justify-content:space-around;'>
        </div>
        </div>`;

        for (let i = 0; i < response3.listings.length; i++) {
            let check = await response3.listings[i].photo_count === 0;
            if(check === true){
            document.getElementById('sales').innerHTML += `
            <div class="col-sm-6 col-md-3 col-lg-3 card" id=h${i} style='margin:6px;'>
                <h5 class="text-uppercase title" id='title${i}' style='color:black;'>${response3.listings[i].address}</h5>
                <img src="https://www.dummyimage.com/600x400/6e6e6e/ffffff.jpg&text=NO-IMAGES+AVAILABLE" id='photo${i}' class="img-fluid" >
                <ul style="list-style-type:none;text-align:left;">
                    <li style='color:black;' id='type${i}'><i class="fas fa-home" style='color:black;'></i> ${response3.listings[i].prop_type}<li>
                    <li style='color:black;' id='price${i}'><i class="fas fa-usd" style='color:black;'></i> ${response3.listings[i].price}<li>
                    <li style='color:black;' id='bed${i}'><i class="fas fa-bed" style='color:black;'></i> ${response3.listings[i].beds}<li>
                    <li style='color:black;' id='bath${i}'><i class="fas fa-bath" style='color:black;'></i> ${response3.listings[i].baths}<li>
                </ul>
                <button class='btn btn-light' style='text-align:right;' onclick='saveListing(${i})' id='${i}'><i class="far fa-bookmark" style='color:black;'></i></button>
            </div> 
    `;}
    else{
        document.getElementById('sales').innerHTML += `
            <div class="col-sm-6 col-md-3 col-lg-3 card" id=h${i} style='margin:6px;'>
                <h5 class="text-uppercase title" id='title${i}' style='color:black;'>${response3.listings[i].address}</h5>
                <img src="${response3.listings[i].photo}" id='photo${i}' class="img-fluid" >
                <ul style="list-style-type:none;text-align:left;">
                    <li style='color:black;' id='type${i}'><i class="fas fa-home" style='color:black;'></i> ${response3.listings[i].prop_type}<li>
                    <li style='color:black;' id='price${i}'><i class="fas fa-usd" style='color:black;'></i> ${response3.listings[i].price}<li>
                    <li style='color:black;' id='bed${i}'><i class="fas fa-bed" style='color:black;'></i> ${response3.listings[i].beds}<li>
                    <li style='color:black;' id='bath${i}'><i class="fas fa-bath" style='color:black;'></i> ${response3.listings[i].baths}<li>
                </ul>
                <button class='btn btn-light' style='text-align:right;' onclick='saveListing(${i})' id='${i}'><i class="far fa-bookmark" style='color:black;'></i></button>
            </div> 
    `;
    }
        }
    });

}


async function saveListing(id){
    document.getElementById(`${id}`).innerHTML = `<i class="fas fa-bookmark" style='color:black;'></i>`;
    let title =document.getElementById(`title${id}`);
    let photo = document.getElementById(`photo${id}`);
    let type = document.getElementById(`type${id}`);
    let price = document.getElementById(`price${id}`);
    let beds = document.getElementById(`bed${id}`);
    let baths= document.getElementById(`bath${id}`);
    
    const listData = {
        address : title.innerHTML,
        photo : photo.getAttribute('src'),
        propType : type.innerText,
        price : price.innerText,
        beds : beds.innerText,
        baths : baths.innerText
    }
    console.log( 'new List: ', listData );
        const sendInfo = await $.post( '/api/createList', listData );
        console.log(" [send Info id] ", sendInfo._id);

        var userCredentials = JSON.parse(localStorage.getItem('checkCredentials'));
        console.log( '[User Credential id]', userCredentials._id);
        console.log( '[ListData]', listData);

        const userList = {
        userId : userCredentials._id,
        listId : sendInfo._id
        };
        try{
        const pushList = await $.post('api/updateUserList', userList);
         console.log(`success`,pushList)

        }
        catch(err){
            console.log(err);
        }
       
    }


