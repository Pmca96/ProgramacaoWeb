var myHeaders = new Headers();
var myHeadersJson = new Headers();

var tarefas = [];


document.addEventListener('DOMContentLoaded', function () {
    loadTarefas();
});

async function loadTarefas() {
    myHeaders.append("Authorization", await getCookie("access_token"));
    myHeadersJson.append("Authorization", await getCookie("access_token"));
    myHeadersJson.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeadersJson,
        redirect: 'follow'
    };

    fetch("http://localhost:5000//api/tarefa", requestOptions)
        .then(response => response.json())
        .then(result => {
            tarefas = result
            if (!tarefas["msg"])
            tarefas.map(i => {
                let data = "<div class='tarefaLine' draggable=\"true\" ondragstart='drag(event)' ondblclick='edit(\"" + i.idTarefa + "\")' id='tarefaID" + i.idTarefa + "'> " + i.name + "</div>";
                if (i.estado == 2) {
                    document.getElementById("completed").innerHTML += data;
                } else if (i.estado == 1) {
                    document.getElementById("ongoing").innerHTML += data;
                } else if (i.estado == 0) {
                    document.getElementById("waiting").innerHTML += data;
                }
            })
        })
        .catch(error => console.log('error', error));
}

function drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
}

function drop0(ev) {
    ev.preventDefault();
    Array.from(document.querySelectorAll("div[class='row tarefaContent']")).map(i => i.style.border = "0px")
    let data = ev.dataTransfer.getData("id")
    let elem = document.getElementById(data)

    changeEstado("0", ev, elem)
}

function drop1(ev) {
    ev.preventDefault();
    Array.from(document.querySelectorAll("div[class='row tarefaContent']")).map(i => i.style.border = "0px");
    let data = ev.dataTransfer.getData("id")
    let elem = document.getElementById(data)

    changeEstado("1", ev, elem)
}

function drop2(ev) {
    ev.preventDefault();
    Array.from(document.querySelectorAll("div[class='row tarefaContent']")).map(i => i.style.border = "0px");
    let data = ev.dataTransfer.getData("id")
    let elem = document.getElementById(data)

    changeEstado("2", ev, elem)
}

function allowDrop0(ev) {
    ev.preventDefault();
    document.querySelectorAll("div[class='row tarefaContent']")[2].style.border = "1px dashed  black";
}

function allowDrop1(ev) {
    ev.preventDefault();
    document.querySelectorAll("div[class='row tarefaContent']")[1].style.border = "1px dashed  black";
}

function allowDrop2(ev) {
    ev.preventDefault();
    document.querySelectorAll("div[class='row tarefaContent']")[0].style.border = "1px dashed  black";
}

function leave0(ev) {
    document.querySelectorAll("div[class='row tarefaContent']")[2].style.border = "0px";
}

function leave1(ev) {
    document.querySelectorAll("div[class='row tarefaContent']")[1].style.border = "0px";
}

function leave2(ev) {
    document.querySelectorAll("div[class='row tarefaContent']")[0].style.border = "0px";
}

function search() {
    let search = document.getElementById("pesquisar").value;
    Array.from(document.querySelectorAll("div[class='tarefaLine']")).map(i => {
        if (i.innerHTML.includes(search))
            i.style.display = "block";
        else
            i.style.display = "none";
    });
}

function edit(id) {
    window.location.href = "http://localhost:5000/tarefas/" + id;
}


function changeEstado(estado, ev, elem) {
    var formdata = new FormData();
    formdata.append("estado", estado);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://localhost:5000//api/tarefa/" + elem.id.substr(8), requestOptions)
        .then(response => {
            if (response.status == 200 || response.status == 201)
                elem.remove()
            if (typeof ev.target.children[1] == "undefined")
                ev.target.parentElement.append(elem)
            else
                ev.target.children[1].append(elem)

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