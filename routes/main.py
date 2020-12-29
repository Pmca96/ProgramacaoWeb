import requests
from flask import Blueprint, render_template, redirect, request, json, session, make_response

main = Blueprint('main', __name__, template_folder='templates')


@main.route('/')
def index():
    print("on index")
    returnRedirect = confirmCredentials(0)
    if returnRedirect != "":
        return redirect(returnRedirect)

    data = {"page": "login"}
    return render_template('login.html', data=data)


@main.route('/', methods=['POST'])
def login():
    returnRedirect = confirmCredentials(0)
    if returnRedirect != "":
        return redirect(returnRedirect)

    url = "http://localhost:5000//api/login"
    payload = {'email': request.form.get("email"),
               'password': request.form.get("password")}
    response = requests.request("POST", url, headers={}, data=payload)

    if response.status_code == 200:
        dataJson = response.json()
        resp = make_response(redirect('/agenda'))
        resp.set_cookie('access_token', dataJson['access_token'])
        resp.set_cookie('idUser', str(dataJson['idUser']))
        return resp
    else:
        data = {"page": "login", "erro": response.json()['msg']}
        return render_template('login.html', data=data)


@main.route('/logout')
def logout():
    returnRedirect = confirmCredentials(1)
    if returnRedirect != "":
        return redirect(returnRedirect)

    url = "http://localhost:5000//api/login"
    headers = {
        'Authorization': request.cookies.get('access_token')
    }

    response = requests.request("DELETE", url, headers=headers, data={})
    print(response.status_code)
    print(response.text)

    data = {"page": "login"}
    resp = make_response(redirect('/'))
    if request.cookies.get('access_token') is not None:
        resp.delete_cookie('access_token')
    if request.cookies.get('idUser') is not None:
        resp.delete_cookie('idUser')
    return resp


@main.route('/recuperar')
def recuperar():
    returnRedirect = confirmCredentials(0)
    if returnRedirect != "":
        return redirect(returnRedirect)

    data = {"page": "recuperar"}
    return render_template('recuperar.html', data=data)


@main.route('/registar')
def registar():
    returnRedirect = confirmCredentials(0)
    if returnRedirect != "":
        return redirect(returnRedirect)

    data = {"page": "registar"}
    return render_template('registar.html', data=data)

@main.route('/registar', methods = ['POST'])
def registarSend():
    returnRedirect = confirmCredentials(0)
    if returnRedirect != "":
        return redirect(returnRedirect)

    url = "http://localhost:5000//api/user"
    payload = {'email': request.form.get("email"),
               'name': request.form.get("name"),
               'password': request.form.get("password")}
    response = requests.request("POST", url, headers={}, data=payload)

    if response.status_code == 200:
        data = {"page": "registar", "success": response.json()['msg']}
        return render_template('registar.html', data=data)
    else:
        data = {"page": "registar", "erro": response.json()['msg']}
        return render_template('registar.html', data=data)

@main.route('/agenda')
def agenda():
    returnRedirect = confirmCredentials(1)
    if returnRedirect != "":
        return redirect(returnRedirect)

    data = {"page": "agenda"}
    return render_template('agenda.html', data=data)


@main.route('/contactos')
def contactos():
    data = {"page": "contactos"}
    return render_template('contactos.html', data=data)


@main.route('/tarefas')
def tarefas():
    data = {"page": "tarefas"}
    return render_template('tarefas.html', data=data)


@main.route('/tarefas/criar')
def tarefasCriar():
    data = {"page": "tarefas", "typer": 0}
    return render_template('tarefasRegisto.html', data=data)


@main.route('/tarefas/<int:tarefa>')
def tarefasEdit(tarefa):
    data = {"page": "tarefas", "typer": 0}
    return render_template('tarefasViewEdit.html', data=data)


@main.route('/upload', methods=['POST'])
def upload():
    print(request.files)
    return "aa"


def confirmCredentials(autenticated=0):
    print(autenticated)
    print(request.cookies.get('access_token'))

    # Encontra-se autenticado, validar se tem token associados para a pagina
    if autenticated == 1 and request.cookies.get('access_token') == None:
        print("/")
        return "/"
    elif autenticated == 0 and request.cookies.get('access_token') is not None:
        print("/agenda")
        return "/agenda"

    print("Empty")
    return ""
