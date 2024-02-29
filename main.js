
addedPreviously = false;

document.addEventListener("DOMContentLoaded", function() {
    let mode;
    if (localStorage.getItem("Mode") === 'light') {
        mode = 'light';
    } else {
        mode = localStorage.getItem("Mode");
    }
    let cssSheet = document.getElementsByTagName('link')[0]; 

    if (mode === 'light') { 
        cssSheet.setAttribute('href', 'http://localhost:4131/css/main.css'); 
        mode = 'light';
    } else { 
        cssSheet.setAttribute('href', 'http://localhost:4131/css/main.dark.css'); 
        mode = 'dark';
    } 
    localStorage.setItem("Mode", mode);

    let saleCardElement = document.querySelector('.saleCard');
    let confirmationElement = document.querySelector('.saleConfCard');
    let deleteConfCard = document.querySelector('.deleteConfCard');
    if (saleCardElement) {
        toggleSaleCard(false);
    } if (confirmationElement) {
        toggleSaleConfCard(false);
    } if (deleteConfCard) {
        toggleDeleteConfCard(false);
    }


    self.setInterval(getBanner, 1000);
});

function getBanner(){
    fetch(`http://localhost:4131/api/sale`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let saleCardElement = document.querySelector('.saleCard');
        let confirmationElement = document.querySelector('.saleConfCard');
        let deleteConfCard = document.querySelector('.deleteConfCard');
        if (saleCardElement) {
            if (data["active"] != "false") {
                saleCardElement.innerHTML = data["message"];
                toggleSaleCard(true)
            } else {
                saleCardElement.innerHTML = '';
            }
        }
        if (confirmationElement) {
            if (data["active"] != "false") {
                confirmationElement.innerHTML = "Sale Added";
                toggleSaleConfCard(true);
                addedPreviously = true;
            } else {
                confirmationElement.innerHTML = '';
                toggleSaleConfCard(false)
            }
        }
        if (deleteConfCard) {
            if (data["active"] === "false") {
                deleteConfCard.innerHTML = "Sale Deleted";
                toggleDeleteConfCard(true);
            } else {
                deleteConfCard.innerHTML = '';
                toggleDeleteConfCard(false)
            };
        }

    })
};

function toggle_style() {
    var cssSheet = document.getElementsByTagName('link')[0]; 
    mode = localStorage.getItem("Mode");
    if (mode === 'light') { 
        cssSheet.setAttribute('href', 'http://localhost:4131/css/main.dark.css'); 
        mode = 'dark';
    } else { 
        cssSheet.setAttribute('href', 'http://localhost:4131/css/main.css'); 
        mode = 'light';
    } 
    localStorage.setItem("Mode", mode);
}

function toggleSaleConfCard(onBool) {
    const saleConfCard = document.querySelector('.saleConfCard');
    if (onBool) {
        saleConfCard.style.display = 'block';
    } else {
        saleConfCard.style.display = 'none';
    }
}

function toggleDeleteConfCard(onBool) {
    const deleteConfCard = document.querySelector('.deleteConfCard');
    if (onBool && addedPreviously) {
        deleteConfCard.style.display = 'block';
    } else {
        deleteConfCard.style.display = 'none';
    }
}

function toggleSaleCard(onBool) {
    const saleCard = document.querySelector('.saleCard');
    if (onBool) {
        saleCard.style.display = 'block';
    } else {
        saleCard.style.display = 'none';
    }
}