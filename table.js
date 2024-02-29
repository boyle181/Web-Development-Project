self.setInterval(getCurrentTime, 1000)
let hasBeenEdited = false;

function deleteRow(button, contactId) {
    console.log("deleted contactId: ", contactId);
    
    fetch(`http://localhost:4131/api/contact/`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"id": contactId})
    })
    .then(data => console.log("data in deleteRow: ", data.response))
    .then(response => {
        button.parentNode.parentNode.remove();
    })
}

function setSale(event) {
    event.preventDefault(); 
    let sale = document.getElementById("sale").value;
    console.log("sale set: ", sale)


    fetch(`http://localhost:4131/api/sale`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"message": sale })
    })
    .then(response => {
        if (!response.ok) { 
            throw new Error('Network response broken');
        }
        return response;
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deleteSale(event) {
    event.preventDefault(); 
    fetch(`http://localhost:4131/api/sale`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

function getCurrentTime() {
    const table = document.getElementById('contactLog');
    
    if (table) {
        let rowCount = document.getElementById('contactLog').getElementsByTagName('tr').length;
        for(let i = 1; i < rowCount; i++) {
            let cell;
            if (hasBeenEdited === true) {
                let split = document.getElementById('contactLog').rows[i].cells[2].innerHTML.split('-');
                cell = split[0] + '-' + split[1] + '-' + split[2];
            } else { 
                cell = document.getElementById('contactLog').rows[i].cells[2].innerHTML;
            }
            let appointmentDate = new Date(cell);
            let difference = appointmentDate - Date.now();
            if (difference <= 0) {
                document.getElementById('contactLog').rows[i].cells[2].innerHTML = cell + " - PAST ";
            } else {
                let days = Math.floor(difference / (1000 * 3600 * 24));
                let hours = Math.floor((difference - (1000 * 3600 * 24 * days)) / (1000 * 3600)) ;
                let minutes = Math.floor((difference - (1000 * 3600 * 24 * days) - (1000 * 3600 * hours)) / (1000 * 60)) ;
                let seconds = Math.floor((difference - (1000 * 3600 * 24 * days) - (1000 * 3600 * hours) - (1000 * 60 * minutes)) / 1000);

                if (days > 0) {
                    document.getElementById('contactLog').rows[i].cells[2].innerHTML = cell + " - " + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds left";
                } else if (hours > 0) {
                    document.getElementById('contactLog').rows[i].cells[2].innerHTML = cell + " - " + hours + " hours, "  + minutes + " minutes, " + seconds + " seconds left";
                } else if (minutes > 0){
                    document.getElementById('contactLog').rows[i].cells[2].innerHTML = cell + " - "  + minutes + " minutes, " + seconds + " seconds left";
                } else {
                    document.getElementById('contactLog').rows[i].cells[2].innerHTML = cell + " - "  + minutes + " minutes, " + seconds + " seconds left";
                }
            }
            

        }
    }
    hasBeenEdited = true;
}