
var contactos = [
    {
        id:1,
        nome:"Joana est",
        email: "joanaest@gmail.com",
        telemovel: "000000000",
    },
    {
        id:2,
        nome:"Joana est1",
        email: "joanaest1@gmail.com",
        telemovel: "000000000",
    },
    {
        id:3,
        nome:"Joana est2",
        email: "joanaest2@gmail.com",
        telemovel: "000000000",
    },
        {
        id:4,
        nome:"Joana est2",
        email: "joanaest2@gmail.com",
        telemovel: "000000000",
    },
        {
        id:5,
        nome:"Joana est2",
        email: "joanaest2@gmail.com",
        telemovel: "000000000",
    },
    ];


var contactos1 = [
    {
        id:6,
        nome:"Joana est",
        email: "joanaest@gmail.com",
        telemovel: "000000000",
    },
    {
        id:7,
        nome:"Joana est1",
        email: "joanaest1@gmail.com",
        telemovel: "000000000",
    },
    {
        id:8,
        nome:"Joana est2",
        email: "joanaest2@gmail.com",
        telemovel: "000000000",
    },
        {
        id:9,
        nome:"Joana est2",
        email: "joanaest2@gmail.com",
        telemovel: "000000000",
    },
        {
        id:10,
        nome:"Joana est2",
        email: "joanaest2@gmail.com",
        telemovel: "000000000",
    },
    ];


document.addEventListener('DOMContentLoaded', function () {

    loadDataContent();

    Array.from(document.querySelectorAll(".contactoDelete>a")).map(i => i.addEventListener("click",removeContacto));
    Array.from(document.querySelectorAll("a[id^=adicionarContacto]")).map(i => i.addEventListener("click",adicionarContacto));

});


function loadDataContent() {
    let content = document.getElementById("contactsContent");
    let contentPesquisa = document.getElementById("pesquisaDeContactos");
    content.innerHTML = "";
    contentPesquisa.innerHTML = "";
    contactos.map(i => {
        let data = "<div class='contacto'><div class='contactoHeader'>" + i.nome + "</div>" +
            "<div class='contactoBody'>Email: " + i.email + "<br>Telemovel:" + i.telemovel + "</div>" +
            "<div class='contactoDelete'>" +
            "<a class='btn btn-danger' id='deleteContacto" + i.id + "'>" +
            "<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-trash-fill\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "  <path fill-rule=\"evenodd\" d=\"M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z\"/>\n" +
            "</svg>" +
            "</a></div></div>"
        content.innerHTML += data;
    });
 contactos1.map(i => {
        data = "<div class='contactoShow'>"+i.nome+
            "<a  id='adicionarContacto"+i.id+"'>" +
            "<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-plus-square-fill\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "  <path fill-rule=\"evenodd\" d=\"M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z\"/>\n" +
            "</svg>" +
            "</a></div>";

        contentPesquisa.innerHTML +=data;

    });
}

function removeContacto() {
    if (confirm("Deseja remover este contacto da sua lista?"))
    {
        let id = this.id.substr(14);
        this.parentElement.parentElement.remove();
        contactos.map((i, k) => {
            if (i.id == id)
                delete contactos[k];

        })
    }
}

function adicionarContacto(data) {
    let id = this.id.substr(17);
    this.parentElement.remove();
    contactos1.map((i, k) => {
        if (i.id == id) {
            delete contactos1[k];
            contactos.push(i);
            let data = "<div class='contacto'><div class='contactoHeader'>" + i.nome + "</div>" +
                "<div class='contactoBody'>Email: " + i.email + "<br>Telemovel:" + i.telemovel + "</div>" +
                "<div class='contactoDelete'>" +
                "<a class='btn btn-danger' id='deleteContacto" + i.id + "'>" +
                "<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-trash-fill\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                "  <path fill-rule=\"evenodd\" d=\"M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z\"/>\n" +
                "</svg>" +
                "</a></div></div>"
            document.getElementById("contactsContent").innerHTML += data;
            Array.from(document.querySelectorAll(".contactoDelete>a")).map(i => i.addEventListener("click",removeContacto));
        }
    })
}

function search(){
    let value = document.getElementById("pesquisar").value;
    contactos.map(i=> {
        if (i.email.includes(value) || i.nome.includes(value) || i.telemovel.includes(value))
            document.getElementById("deleteContacto"+i.id).parentElement.parentElement.style.display = "block";
        else
            document.getElementById("deleteContacto"+i.id).parentElement.parentElement.style.display = "none";
    })
}

function searchContactos() {
    let value = document.getElementById("searchContactos").value;
    contactos.map(i=> {
        if (i.email.includes(value) || i.nome.includes(value) || i.telemovel.includes(value))
            document.getElementById("contactoAdd"+i.id).parentElement.parentElement.style.display = "block";
        else
            document.getElementById("contactoAdd"+i.id).parentElement.parentElement.style.display = "none";
    })
}

