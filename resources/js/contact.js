window.onload = function(){
    const el1 = document.getElementById('ageRange');
    const el2 = document.getElementById('oceanview');
    if (el1) {
      el1.addEventListener("change", displayStayLength);
    }
    if (el2) {
      el2.addEventListener("change", changeStayLength);
    }


};


let stayLength;

// Amount of days allowed at the hotel is based on age, and if the user wants an oceanview
function displayStayLength() {
    if (document.getElementById('ageRange').value === '18-25') {
        stayLength = 45;
    } else if (document.getElementById('ageRange').value === '26-35') {
        stayLength = 40;
    } else if (document.getElementById('ageRange').value === '36-55') {
        stayLength = 40;
    } else if (document.getElementById('ageRange').value === '56-') {
        stayLength = 35;
    }

    if (document.getElementById("oceanview").checked === true) {
        stayLength -= 10;
    } 

    document.getElementById("stayLength").innerHTML = stayLength + " days before animal transformation";
}

function changeStayLength() {
    if (document.getElementById('ageRange').value != '--SELECT--') {
        if (document.getElementById("oceanview").checked) {
            stayLength -= 10;
        } else {
            stayLength += 10;
        }
      document.getElementById("stayLength").innerHTML = stayLength + " days before animal transformation";
    }
}