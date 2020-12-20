var tarefas = [
    {
        id: 1,
        titulo: 'tarefa1',
        estado: 0,
        dataReferencia: '2020-11-30T12:30:00',
    },
    {
        id: 2,
        titulo: 'tarefa2',
        estado: 1,
        dataReferencia: '2020-11-30T12:30:00',
    }, {
        id: 3,
        titulo: 'tarefa3',
        estado: 2,
        dataReferencia: '2020-11-30T12:30:00',
    }, {
        id: 4,
        titulo: 'tarefa4',
        estado: 2,
        dataReferencia: '2020-11-30T12:30:00',
    }, {
        id: 5,
        titulo: 'tarefa5',
        estado: 2,
        dataReferencia: '2020-11-30T12:30:00',
    },
];


document.addEventListener('DOMContentLoaded', function () {

    loadTarefas();
});

function loadTarefas() {
    tarefas.map(i => {
        let date = new Date(i.dataReferencia);
        let dateDefined = date.toString().substr(8, 2) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear().toString().substr(2, 2);
        let data = "<div class='tarefaLine' draggable=\"true\" ondragstart='drag(event)' ondblclick='edit(\""+i.id +"\")' id='tarefaID" + i.id + "'>(" + dateDefined + ") " + i.titulo + "</div>";

        if (i.estado == 2) {
            document.getElementById("completed").innerHTML += data;
        } else if (i.estado == 1) {
            document.getElementById("ongoing").innerHTML += data;
        } else if (i.estado == 0) {
            document.getElementById("waiting").innerHTML += data;
        }
    })

}

function drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
}

function drop0(ev){
    ev.preventDefault();
    Array.from(document.querySelectorAll("div[class='row tarefaContent']")).map(i => i.style.border = "0px")
    let data = ev.dataTransfer.getData("id")
    let elem = document.getElementById(data)
    elem.remove()
    ev.target.children[1].append(elem)
}
function drop1(ev){
    ev.preventDefault();
    Array.from(document.querySelectorAll("div[class='row tarefaContent']")).map(i => i.style.border = "0px");
    let data = ev.dataTransfer.getData("id")
    let elem = document.getElementById(data)
    elem.remove()
    ev.target.children[1].append(elem)

}
function drop2(ev){
    ev.preventDefault();
    Array.from(document.querySelectorAll("div[class='row tarefaContent']")).map(i => i.style.border = "0px");
        let data = ev.dataTransfer.getData("id")
    let elem = document.getElementById(data)
    elem.remove()
    ev.target.children[1].append(elem)
}

function allowDrop0(ev){
    ev.preventDefault();
    document.querySelectorAll("div[class='row tarefaContent']")[2].style.border = "1px dashed  black";
}
function allowDrop1(ev){
    ev.preventDefault();
    document.querySelectorAll("div[class='row tarefaContent']")[1].style.border = "1px dashed  black";
}
function allowDrop2(ev){
    ev.preventDefault();
    document.querySelectorAll("div[class='row tarefaContent']")[0].style.border = "1px dashed  black";
}
function leave0(ev){
    document.querySelectorAll("div[class='row tarefaContent']")[2].style.border = "0px";
}
function leave1(ev){
    document.querySelectorAll("div[class='row tarefaContent']")[1].style.border = "0px";
}
function leave2(ev){
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
    window.location.href = "http://localhost:5000/tarefas/"+id;
}

