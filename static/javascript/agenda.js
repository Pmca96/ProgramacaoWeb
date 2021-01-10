var myHeaders = new Headers();
var myHeadersJson = new Headers();


var agenda = [];
var tarefasList = [];
var contactosList = [];
var calendarEl;
var calendar;
var calendarEnds;
var calendarStart;
var tarefasnew;
var tarefas;
var contactosnew;
var contactos;
var propDataTimes = {
    closeButton: true,
    dateFormat: "dd-mm-YYYY",
    timeFormat: "HH:ii",
    viewMonths: true,
    viewDays: true
}

var EditDate1
var EditDate2

document.addEventListener('DOMContentLoaded', async function () {

    calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            right: 'timeGridWeek,dayGridMonth',
            left: 'prev,today,next',
            center: 'title',
        },
        views: {
            dayGrid: {
                titleFormat: {year: 'numeric', month: 'long'}
            },
            timeGrid: {
                titleFormat: {year: 'numeric', month: 'long'}
            }
        },
        allDaySlot: false,
        initialView: 'dayGridMonth',
        locale: 'pt',
        timeZone: 'Europe/London',
        buttonText: {
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
            list: 'Lista'
        },
        height: 850,
        weekText: 'Sem',
        allDayText: 'Todo o dia',
        moreLinkText: 'mais',
        noEventsText: 'Não há eventos para mostrar',
        windowResize: function (arg) {
            if (window.innerHeight > 975)
                calendar.setOption('height', 850);
            else
                calendar.setOption('height', 650);
        },
        editable: true,
        eventDrop: resaveCalendarEvent,
        eventResize: resaveCalendarEvent,
        eventClick: clickEventDetails,
        viewRender: rerender,
        dateClick: dayDetails,

    });

    calendar.render();
    calendarEnds = calendar.view.activeEnd;
    calendarStart = calendar.view.activeStart;
    await fetchCalendario(1)

    document.getElementsByClassName("fc-timeGridWeek-button")[0].addEventListener("click", rerender);
    document.getElementsByClassName("fc-dayGridMonth-button")[0].addEventListener("click", rerender);
    document.getElementsByClassName("fc-today-button")[0].addEventListener("click", rerender);
    document.getElementsByClassName("fc-prev-button")[0].addEventListener("click", rerender);
    document.getElementsByClassName("fc-next-button")[0].addEventListener("click", rerender);

    document.getElementById("adicionarAgenda").addEventListener("click", adicionarAgenda);

    tail.DateTime("#datainicionew", propDataTimes);
    tail.DateTime("#datafimnew", propDataTimes);

    editDate1 = tail.DateTime("#datainicio", propDataTimes);
    editDate2 = tail.DateTime("#datafim", propDataTimes);
});


async function rerender() {
    calendarEnds = calendar.view.activeEnd
    calendarStart = calendar.view.activeStart;

    let events = calendar.getEvents()
    events.map((i) => i.remove())

    fetchCalendario()
}

function addEvents() {
    agenda.filter(filteringByDate).map((i) => {
        //Personalizar conteudo no calendário
        let dateStart = new Date(i.start.substr(0, 10))
        let dateEnd;
        if (typeof i.end != 'undefined')
            dateEnd = new Date(i.end.substr(0, 10))

        i['id'] = i['idCalendario']
        if (dateStart > new Date()) { // Future
            i.backgroundColor = "#ffc107";
            i.textColor = "black";
        } else if (dateEnd > new Date() || (dateEnd == new Date() && typeof i.end != 'undefined')) { // Present
            i.backgroundColor = "#007bff";
            i.textColor = "white";
        } else { // Past
            i.backgroundColor = "#28a745";
            i.textColor = "white";
        }
        calendar.addEvent(i);
    })

}

function clickEventDetails(calEvent, jsEvent, view) {
    document.getElementById("remover").style.display = "block";
    document.getElementById("gravar").style.display = "none";
    document.getElementById("editar").style.display = "block";
    document.getElementById("viewAgendamento").click();
    document.getElementById("viewDocumentos").parentElement.style.display = "block";

    document.getElementById("title").disabled = true
    document.getElementById("datainicio").disabled = true
    document.getElementById("datafim").disabled = true
    document.getElementById("descricao").disabled = true
    document.getElementById("localizacao").disabled = true

    tarefas.reset()
    contactos.reset();

    let agendamento = agenda.filter(i => i.idCalendario.toString() == calEvent.event.id.toString())
    let tarefasSelected = Array.from(document.querySelectorAll("#tarefas > div > div > div")).filter((i) => agendamento[0].tarefas.map(String).includes(i.attributes.getNamedItem("data-value").value))
    let contactosSelected = Array.from(document.querySelectorAll("#contactos > div > div > div")).filter((i) => agendamento[0].users.map(String).includes(i.attributes.getNamedItem("data-value").value))
    fetchDocumentos(agendamento[0].idCalendario)

    contactosSelected.map(i => {
        i.click();
        i.click();
    })
    tarefasSelected.map(i => {
        i.click();
        i.click();
    })


    document.getElementById("id").value = calEvent.event.id;

    document.getElementById("title").value = agendamento[0].title;
    let dateTemp = new Date(agendamento[0].start);
    document.getElementById("datainicio").value = dateTemp.toString().substr(8, 2) + "-" + dateTemp.getMonth().pad(2) + "-" + dateTemp.getFullYear() +
        " " + dateTemp.getHours().pad(2) + ":" + dateTemp.getMinutes().pad(2);
    editDate1.selectDate(dateTemp.getFullYear(), dateTemp.getMonth().pad(2), dateTemp.toString().substr(8, 2), dateTemp.getHours().pad(2), dateTemp.getMinutes().pad(2), 00);

    dateTemp = new Date(agendamento[0].end);
    document.getElementById("datafim").value = dateTemp.toString().substr(8, 2) + "-" + dateTemp.getMonth().pad(2) + "-" + dateTemp.getFullYear() +
        " " + dateTemp.getHours().pad(2) + ":" + dateTemp.getMinutes().pad(2);
    editDate2.selectDate(dateTemp.getFullYear(), dateTemp.getMonth().pad(2), dateTemp.toString().substr(8, 2), dateTemp.getHours().pad(2), dateTemp.getMinutes().pad(2), 00);

    document.getElementById("descricao").value = agendamento[0].descricao;
    document.getElementById("localizacao").value = agendamento[0].gps;


}

function editDetails() {
    document.getElementById("remover").style.display = "none";
    document.getElementById("gravar").style.display = "block";
    document.getElementById("editar").style.display = "none";

    document.getElementById("title").disabled = false
    document.getElementById("datainicio").disabled = false
    document.getElementById("datafim").disabled = false
    document.getElementById("descricao").disabled = false
    document.getElementById("localizacao").disabled = false
    document.getElementById("viewDocumentos").parentElement.style.display = "none";

}

function saveDetails() {

    let formData = document.detailsAgendaForm;
    agenda.map((i, k) => {
        if (i.idCalendario == formData.id.value) {
            let arr = formData.datainicio.value.trim().split(" ");
            let arrData = arr[0].split("-");
            let dataStartFormat = arrData[2] + "-" + arrData[1] + "-" + arrData[0] + "T" + arr[1] + ":00";
            arr = formData.datafim.value.trim().split(" ");
            arrData = arr[0].split("-");
            let dataEndFormat = arrData[2] + "-" + arrData[1] + "-" + arrData[0] + "T" + arr[1] + ":00";

            var raw = JSON.stringify({
                "title": formData.titulo.value,
                "start": dataStartFormat,
                "end": dataEndFormat,
                "users": contactos.value(),
                "tarefas": tarefas.value(),
                "gps": formData.localizacao.value,
                "descricao": formData.descricao.value
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeadersJson,
                body: raw,
                redirect: 'follow'
            };
            fetch("http://localhost:5000//api/calendario/" + i.idCalendario, requestOptions)
                .then(response => response.json())
                .then(result => {
                    document.getElementById("viewAgendamentoClose").click()
                    rerender();
                })
                .catch(error => console.log('error', error));


        }
    })
}

function resaveCalendarEvent(calEvent) {
    agenda.map((i, k) => {
        if (i.idCalendario == calEvent.event.id) {
            let startEvent = new Date(calEvent.event.start);
            i.start = startEvent.getFullYear().pad(4) + "-" + (startEvent.getMonth() + 1).pad(2) + "-" + startEvent.toString().substr(8, 2) +
                "T" + startEvent.getHours().pad(2) + ":" + startEvent.getMinutes().pad(2) + ":00";
            let endEvent = calEvent.event.end;
            if (endEvent == null)
                i.end = i.start
            else
                i.end = endEvent.getFullYear().pad(4) + "-" + (endEvent.getMonth() + 1).pad(2) + "-" + endEvent.toString().substr(8, 2) +
                    "T" + endEvent.getHours().pad(2) + ":" + endEvent.getMinutes().pad(2) + ":00";

            var raw = JSON.stringify({
                "start": i.start,
                "end": i.end
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeadersJson,
                body: raw,
                redirect: 'follow'
            };
            fetch("http://localhost:5000//api/calendario/" + i.idCalendario, requestOptions)
                .then(response => response.json())
                .then(result => {
                    rerender();
                })
                .catch(error => console.log('error', error));
        }
    })
}

function dayDetails(infoDay) {
}

function filteringByDate(i) {
    let dateStart = new Date(i.start.substr(0, 10))
    let dateEnd = null
    if (typeof i.end != 'undefined')
        dateEnd = new Date(i.end.substr(0, 10))
    return (dateStart.getTime() > calendarStart.getTime() && dateStart.getTime() < calendarEnds.getTime()) ||
        (dateEnd != null && dateEnd.getTime() > calendarStart.getTime() && dateStart.getTime() < calendarStart.getTime())
}

async function adicionarAgenda() {
    let formData = document.adicionarAgendaForm;
    if (formData.descricaonew.innerText || formData.datainicionew.value == "" || formData.datafimnew.value == "" || formData.titulonew.value == "")
        return;

    let arr = formData.datainicionew.value.trim().split(" ");
    let arrData = arr[0].split("-");
    let dataStartFormat = arrData[2] + "-" + arrData[1] + "-" + arrData[0] + "T" + arr[1] + ":00";
    arr = formData.datafimnew.value.trim().split(" ");
    arrData = arr[0].split("-");
    let dataEndFormat = arrData[2] + "-" + arrData[1] + "-" + arrData[0] + "T" + arr[1] + ":00";

    let dateStart = new Date(dataStartFormat)
    let dateEnd = new Date(dataEndFormat)


    var raw = JSON.stringify({
        "title": formData.titulonew.value,
        "start": dataStartFormat,
        "end": dataEndFormat,
        "users": contactosnew.value(),
        "tarefas": tarefasnew.value(),
        "gps": formData.localizacaonew.value,
        "descricao": formData.descricaonew.value
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeadersJson,
        body: raw,
        redirect: 'follow'
    };
    let addData = []
    await fetch("http://localhost:5000//api/calendario", requestOptions)
        .then(response => response.json())
        .then(result => {
            addData = result

            if (dateStart > new Date()) { // Future
                addData.backgroundColor = "#ffc107";
                addData.textColor = "black";
            } else if (dateEnd > new Date() || (dateEnd == new Date() && typeof addData.end != 'undefined')) { // Present
                addData.backgroundColor = "#007bff";
                addData.textColor = "white";
            } else { // Past
                addData.backgroundColor = "#28a745";
                addData.textColor = "white";
            }

            addData['id'] = addData['idCalendario']
            agenda.push(addData);
            calendar.addEvent(addData);

            formData.titulonew.value = "";
            formData.datafimnew.value = "";
            formData.datainicionew.value = "";
            formData.localizacaonew.value = "";
            formData.descricaonew.value = "";
            tarefasnew.reset();
            contactosnew.reset();
            document.getElementById("agendamentoClose").click();
        })
        .catch(error => console.log('error', error));


}

function removerAgendamento() {
    if (confirm("Deseja apagar o agendamento?")) {
        agenda.map((i, k) => {
            if (i.idCalendario == document.getElementById("id").value) {


                var requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders,
                    redirect: 'follow'
                };
                fetch("http://localhost:5000//api/calendario/" + i.idCalendario, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        delete agenda[k];
                        rerender();
                        document.getElementById("viewAgendamentoClose").click();
                    })
                    .catch(error => console.log('error', error));
            }
        })
    }
}


Number.prototype.pad = function (size) {
    var sign = Math.sign(this) === -1 ? '-' : '';
    return sign + new Array(size).concat([Math.abs(this)]).join('0').slice(-size);
}

async function fetchCalendario(loadPrimary = 0) {
    myHeaders.append("Authorization", await getCookie("access_token"));
    myHeadersJson.append("Authorization", await getCookie("access_token"));
    myHeadersJson.append("Content-Type", "application/json");

    let month = prependZero(parseInt(calendar.getDate().getMonth()) + 1)
    await fetch('http://localhost:5000//api/calendario?month=' + calendar.getDate().getFullYear() + '-' + month, {
        method: 'GET', // or 'PUT'
        headers: myHeaders,
    })
        .then(response => response.json())
        .then(result => {
            agenda = result
            addEvents()
            calendar.render()
        })
        .then(() => {
                if (loadPrimary == 1) {
                    fetchTarefas()
                    fetchContactos()
                }
            }
        )
        .catch(error => console.log('error', error));
}

async function fetchTarefas() {
    await fetch('http://localhost:5000//api/tarefa', {
        method: 'GET', // or 'PUT'
        headers: myHeaders,
    })
        .then(response => response.json())
        .then(result => {
            tarefasList = []
            if (!result['msg'])
            result.map((i, k) => {
                j = []
                j['value'] = i.idTarefa
                j['label'] = i.name
                tarefasList.push(j);
            })
            tarefasnew = new SelectPure("#tarefasnew", {
                options: tarefasList,
                multiple: true,
                autocomplete: true,
                icon: "fa fa-times",
                classNames: {
                    select: "select-pure__select",
                    dropdownShown: "select-pure__select--opened",
                    multiselect: "select-pure__select--multiple",
                    label: "select-pure__label",
                    placeholder: "select-pure__placeholder",
                    dropdown: "select-pure__options",
                    option: "select-pure__option",
                    autocompleteInput: "select-pure__autocomplete",
                    selectedLabel: "select-pure__selected-label",
                    selectedOption: "select-pure__option--selected",
                    placeholderHidden: "select-pure__placeholder--hidden",
                    optionHidden: "select-pure__option--hidden",
                }
            });
            tarefas = new SelectPure("#tarefas", {
                options: tarefasList,
                multiple: true,
                autocomplete: true,
                icon: "fa fa-times",
                disabled: true,
                classNames: {
                    select: "select-pure__select",
                    dropdownShown: "select-pure__select--opened",
                    multiselect: "select-pure__select--multiple",
                    label: "select-pure__label",
                    placeholder: "select-pure__placeholder",
                    dropdown: "select-pure__options",
                    option: "select-pure__option",
                    autocompleteInput: "select-pure__autocomplete",
                    selectedLabel: "select-pure__selected-label",
                    selectedOption: "select-pure__option--selected",
                    placeholderHidden: "select-pure__placeholder--hidden",
                    optionHidden: "select-pure__option--hidden",
                }
            });

        })
        .catch(error => console.log('error', error));
}

async function fetchContactos() {
    await fetch('http://localhost:5000//api/user?search=', {
        method: 'GET', // or 'PUT'
        headers: myHeaders,
    })
        .then(response => response.json())
        .then(result => {
            contactosList = []
            if (!result['msg'])
            result.map((i, k) => {
                j = []
                j['value'] = i.idUser
                j['label'] = i.name
                contactosList.push(j);

            })

            contactosnew = new SelectPure("#contactosnew", {
                options: contactosList,
                multiple: true,
                autocomplete: true,
                icon: "fa fa-times",
                classNames: {
                    select: "select-pure__select",
                    dropdownShown: "select-pure__select--opened",
                    multiselect: "select-pure__select--multiple",
                    label: "select-pure__label",
                    placeholder: "select-pure__placeholder",
                    dropdown: "select-pure__options",
                    option: "select-pure__option",
                    autocompleteInput: "select-pure__autocomplete",
                    selectedLabel: "select-pure__selected-label",
                    selectedOption: "select-pure__option--selected",
                    placeholderHidden: "select-pure__placeholder--hidden",
                    optionHidden: "select-pure__option--hidden",
                }
            });
            contactos = new SelectPure("#contactos", {
                options: contactosList,
                multiple: true,
                autocomplete: true,
                disabled: true,
                icon: "fa fa-times",
                classNames: {
                    select: "select-pure__select",
                    dropdownShown: "select-pure__select--opened",
                    multiselect: "select-pure__select--multiple",
                    label: "select-pure__label",
                    placeholder: "select-pure__placeholder",
                    dropdown: "select-pure__options",
                    option: "select-pure__option",
                    autocompleteInput: "select-pure__autocomplete",
                    selectedLabel: "select-pure__selected-label",
                    selectedOption: "select-pure__option--selected",
                    placeholderHidden: "select-pure__placeholder--hidden",
                    optionHidden: "select-pure__option--hidden",
                }
            });
        })
        .catch(error => console.log('error', error));
}

async function fetchDocumentos(idAgenda) {
    await fetch('http://localhost:5000//api/documentoAgenda/'+idAgenda, {
        method: 'GET', // or 'PUT'
        headers: myHeaders,
    })
        .then(response => response.json())
        .then(result => {
            let dataDoc = ""
            result.map(i => {
                i.map( j => {
                    let link ="{{ url_for('static', filename='filenameGoesHere') | safe}}"
                    dataDoc += '<div class="documentInfo" alt="'+j.idDocumento+'" >'+
                        '<a href="/static/'+j.localizacao+'" download >'+
                           '<i class="fa fa-file-text-o fa-2x" aria-hidden="true"></i>'+
                            '<div title="" class="imageName" style="width:120px;" >'+j.nome+'</div>'+
                        '</a>'+
                    '</div>'
                })

            })

           document.getElementById("viewDocumentos").innerHTML = dataDoc;

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


function prependZero(number) {
    if (number <= 9)
        return "0" + number;
    else
        return number;

}

