var id = 5;
var agenda = [
    {
        id: '1',
        title: 'event1',
        start: '2020-11-30T12:30:00',
        end: '2020-12-02T12:30:00',
        allDay: false,
        contactos: [1, 3, 4, 6],
        tarefas: [1, 2],
        gps: 'https://www.google.pt/maps/place/Portim%C3%A3o/@37.3637832,-8.5983077,10z/data=!4m5!3m4!1s0xd1b28eca9242961:0x93fcc923718014e1!8m2!3d37.136235!4d-8.5377502',
        descricao: 'exemplo123'
    },
    {
        id: '2',
        title: 'event2',
        start: '2020-11-05T12:30:00',
        end: '2020-11-07T12:30:00',
        allDay: false,
        contactos: [1, 3, 4, 6],
        tarefas: [1, 2],
        gps: 'https://www.google.pt/maps/place/Portim%C3%A3o/@37.3637832,-8.5983077,10z/data=!4m5!3m4!1s0xd1b28eca9242961:0x93fcc923718014e1!8m2!3d37.136235!4d-8.5377502',
        descricao: 'exemplo123'
    },
    {
        id: '3',
        title: 'event3',
        start: '2020-11-05T12:30:00',
        end: '2020-11-30T12:30:00',
        allDay: false,
        contactos: [1, 3, 4, 6],
        tarefas: [1, 2],
        gps: 'https://www.google.pt/maps/place/Portim%C3%A3o/@37.3637832,-8.5983077,10z/data=!4m5!3m4!1s0xd1b28eca9242961:0x93fcc923718014e1!8m2!3d37.136235!4d-8.5377502',
        descricao: 'exemplo123'
    },
    {
        id: '4',
        title: 'event4',
        start: '2020-12-19T12:30:00',
        end: '2020-12-19T19:00:00',
        allDay: false, // will make the time show
        contactos: [1, 3, 4, 6],
        tarefas: [1, 2],
        gps: 'https://www.google.pt/maps/place/Portim%C3%A3o/@37.3637832,-8.5983077,10z/data=!4m5!3m4!1s0xd1b28eca9242961:0x93fcc923718014e1!8m2!3d37.136235!4d-8.5377502',
        descricao: 'exemplo123'
    }
];
var tarefasList = [
    {
        label: "Barbina",
        value: "ba",
    },
    {
        label: "Bigoli",
        value: "bg",
    },
    {
        label: "Bucatini",
        value: "bu",
    },
    {
        label: "Busiate",
        value: "bus",
    },
    {
        label: "Capellini",
        value: "cp",
    },
    {
        label: "Fedelini",
        value: "fe",
    },
    {
        label: "Maccheroni",
        value: "ma",
    },
    {
        label: "Spaghetti",
        value: "sp",
    },
];
var contactosList = [
    {
        label: "Barbina",
        value: "ba",
    },
    {
        label: "Bigoli",
        value: "bg",
    },
    {
        label: "Bucatini",
        value: "bu",
    },
    {
        label: "Busiate",
        value: "bus",
    },
    {
        label: "Capellini",
        value: "cp",
    },
    {
        label: "Fedelini",
        value: "fe",
    },
    {
        label: "Maccheroni",
        value: "ma",
    },
    {
        label: "Spaghetti",
        value: "sp",
    },
];
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

document.addEventListener('DOMContentLoaded', function () {

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
    addEvents();

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


function rerender() {
    calendarEnds = calendar.view.activeEnd
    calendarStart = calendar.view.activeStart;

    let events = calendar.getEvents()
    events.map((i) => i.remove())
    addEvents()
    calendar.render()
}

function addEvents() {
    agenda.filter(filteringByDate).map((i) => {
        //Personalizar conteudo no calendário
        let dateStart = new Date(i.start.substr(0, 10))
        let dateEnd;
        if (typeof i.end != 'undefined')
            dateEnd = new Date(i.end.substr(0, 10))

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

    document.getElementById("title").disabeld = true
    document.getElementById("datainicio").disabled = true
    document.getElementById("datafim").disabled = true
    document.getElementById("descricao").disabled = true
    document.getElementById("localizacao").disabled = true

    tarefas.reset()
    contactos.reset();

    let agendamento = agenda.filter(i => i.id == calEvent.event.id)
    let tarefasSelected = Array.from(document.querySelectorAll("#tarefas > div > div > div")).filter((i) => agendamento[0].tarefas.includes(i.attributes.getNamedItem("data-value").value))
    let contactosSelected = Array.from(document.querySelectorAll("#contactos > div > div > div")).filter((i) => agendamento[0].contactos.includes(i.attributes.getNamedItem("data-value").value))

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
    document.getElementById("datainicio").value = dateTemp.toString().substr(8, 2)+ "-" + dateTemp.getMonth().pad(2) + "-" + dateTemp.getFullYear() +
        " " + dateTemp.getHours().pad(2) + ":" + dateTemp.getMinutes().pad(2);
    editDate1.selectDate(dateTemp.getFullYear(), dateTemp.getMonth().pad(2), dateTemp.toString().substr(8, 2), dateTemp.getHours().pad(2), dateTemp.getMinutes().pad(2), 00);

    dateTemp = new Date(agendamento[0].end);
    document.getElementById("datafim").value = dateTemp.toString().substr(8, 2) + "-" + dateTemp.getMonth().pad(2) + "-" + dateTemp.getFullYear() +
        " " + dateTemp.getHours().pad(2) + ":" + dateTemp.getMinutes().pad(2);
    editDate2.selectDate(dateTemp.getFullYear(), dateTemp.getMonth().pad(2),  dateTemp.toString().substr(8, 2), dateTemp.getHours().pad(2), dateTemp.getMinutes().pad(2), 00);

    document.getElementById("descricao").value = agendamento[0].title;
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
        if (i.id == formData.id.value) {
            let arr = formData.datainicio.value.trim().split(" ");
            let arrData = arr[0].split("-");
            let dataStartFormat = arrData[2] + "-" + arrData[1] + "-" + arrData[0] + "T" + arr[1] + ":00";
            arr = formData.datafim.value.trim().split(" ");
            arrData = arr[0].split("-");
            let dataEndFormat = arrData[2] + "-" + arrData[1] + "-" + arrData[0] + "T" + arr[1] + ":00";

            i.start = dataStartFormat
            i.end = dataEndFormat
            i.title = formData.titulo.value
            i.contactos = contactos.value()
            i.tarefas = tarefas.value()
            i.gps = formData.localizacao.value
            i.descricao = formData.descricao.value
            rerender();
        }
    })
}

function resaveCalendarEvent(calEvent) {
    agenda.map((i, k) => {
        if (i.id == calEvent.event.id) {
            let startEvent = new Date(calEvent.event.start);
            i.start = startEvent.getFullYear().pad(4) + "-" + (startEvent.getMonth() + 1).pad(2) + "-" + startEvent.toString().substr(8, 2) +
                "T" + startEvent.getHours().pad(2) + ":" + startEvent.getMinutes().pad(2) + ":00";
            let endEvent = calEvent.event.end;
            i.end = endEvent.getFullYear().pad(4) + "-" + (endEvent.getMonth() + 1).pad(2) + "-" + endEvent.toString().substr(8, 2) +
                "T" + endEvent.getHours().pad(2) + ":" + endEvent.getMinutes().pad(2) + ":00";
            rerender();
        }
    })
}

function dayDetails(infoDay) {
    console.log(infoDay);
}

function filteringByDate(i) {
    let dateStart = new Date(i.start.substr(0, 10))
    let dateEnd = null
    if (typeof i.end != 'undefined')
        dateEnd = new Date(i.end.substr(0, 10))
    return (dateStart.getTime() > calendarStart.getTime() && dateStart.getTime() < calendarEnds.getTime()) ||
        (dateEnd != null && dateEnd.getTime() > calendarStart.getTime() && dateStart.getTime() < calendarStart.getTime())
}

function adicionarAgenda() {
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

    let addData = {
        id: id,
        title: formData.titulonew.value,
        start: dataStartFormat,
        end: dataEndFormat,
        allDay: false,
        contactos: contactosnew.value(),
        tarefas: tarefasnew.value(),
        gps: formData.localizacaonew.value,
        descricao: formData.descricaonew.value
    }

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
    id++;
    agenda.push(addData);
    calendar.addEvent(addData);

    formData.titulonew.value = "";
    formData.datafimnew.value = "";
    formData.datainicionew.value = "";
    formData.localizacaonew.value = "";
    formData.descricaonew.value = "";
    console.log(tarefasnew.value())
    tarefasnew.reset();
    contactosnew.reset();
    document.getElementById("agendamentoClose").click();
}

function removerAgendamento() {
    if (confirm("Deseja apagar o agendamento?")) {
        agenda.map((i, k) => {
            if (i.id == document.getElementById("id").value) {
                delete agenda[k];
                rerender();
                document.getElementById("viewAgendamentoClose").click();
            }
        })
    }
}


Number.prototype.pad = function (size) {
    var sign = Math.sign(this) === -1 ? '-' : '';
    return sign + new Array(size).concat([Math.abs(this)]).join('0').slice(-size);
}


