var myHeaders = new Headers();
var myHeadersJson = new Headers();


var contactos = [];


var contactos1 = [];

document.addEventListener('DOMContentLoaded', function () {
    fetchContactos();
});


function loadDataContent() {
    let content = document.getElementById("contactsContent");
    content.innerHTML = "";
    contactos.map(i => {
        let data = "<div class='contacto'><div class='contactoHeader'>" + i.name + "</div>" +
            "<div class='contactoBody'>" + i.email + "</div>" +
            "<div class='contactoDelete'>" +
            "<a class='btn btn-danger' id='deleteContacto" + i.idUser + "'>" +
            "<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-trash-fill\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "  <path fill-rule=\"evenodd\" d=\"M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z\"/>\n" +
            "</svg>" +
            "</a></div></div>"
        content.innerHTML += data;
    });

}

function removeContacto() {
    if (confirm("Deseja remover este contacto da sua lista?")) {
        let id = this.id.substr(14);
        this.parentElement.parentElement.remove();
        contactos.map((i, k) => {
            if (i.idUser == id)
                delete contactos[k];
        })
        fetch('http://localhost:5000//api/contacto/'+id, {
            method: 'DELETE', // or 'PUT'
            headers: myHeaders,
        }).catch(error => console.log('error', error));
    }
}

function adicionarContacto(data) {
    let id = this.id.substr(17);
    this.parentElement.remove();

    contactos1.map((i, k) => {
        if (i.idUser == id) {
            fetch('http://localhost:5000//api/contacto/'+i.idUser, {
                method: 'POST', // or 'PUT'
                headers: myHeaders,
            }).then(fetchContactos()).catch(error => console.log('error', error));
        }
    })


}

function search() {
    let value = document.getElementById("pesquisar").value;
    contactos.map(i => {
        if (i.email.includes(value) || i.name.includes(value))
            document.getElementById("deleteContacto" + i.idUser).parentElement.parentElement.style.display = "block";
        else
            document.getElementById("deleteContacto" + i.idUser).parentElement.parentElement.style.display = "none";
    })
}

function searchContactos() {
    let value = document.getElementById("searchContactos").value;
    fetch('http://localhost:5000//api/user?searchToAdd=' + value, {
        method: 'GET', // or 'PUT'
        headers: myHeaders,
    })
        .then(response => response.json())
        .then(result => {
            contactos1 = result
            buildContactosToAdd()
        })
        .catch(error => console.log('error', error));
}

function buildContactosToAdd() {

    let contentPesquisa = document.getElementById("pesquisaDeContactos");
    contentPesquisa.innerHTML = "";
    contactos1.map(i => {
        data = "<div class='contactoShow'>" + i.name +
            "<a  id='adicionarContacto" + i.idUser + "'>" +
            "<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-plus-square-fill\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "  <path fill-rule=\"evenodd\" d=\"M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z\"/>\n" +
            "</svg>" +
            "</a></div>";
        contentPesquisa.innerHTML += data;

    });

    Array.from(document.querySelectorAll("a[id^=adicionarContacto]")).map(i => i.addEventListener("click", adicionarContacto));

}


async function fetchContactos() {
    myHeaders.append("Authorization", await getCookie("access_token"));
    myHeadersJson.append("Authorization", await getCookie("access_token"));
    myHeadersJson.append("Content-Type", "application/json");

    await fetch('http://localhost:5000//api/user?search=', {
        method: 'GET', // or 'PUT'
        headers: myHeaders,
    })
        .then(response => response.json())
        .then(result => {
            contactos = result
            loadDataContent();
            Array.from(document.querySelectorAll(".contactoDelete>a")).map(i => i.addEventListener("click", removeContacto));
            searchContactos();
        })
        .catch(error => console.log('error', error));
}

async function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length + 1, c.length - 1);
        }
    }
    return "";
}



