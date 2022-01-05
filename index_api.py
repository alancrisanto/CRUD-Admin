# hacer una api en la cual se almacenen todos los usuarios de una compañia, se debe guardar el nombre, apellido, area y fecha_inicio, DNI
# vamos a tener un registro y un despido para eliminar el usuario (usar el metodo DELETE) ademas se puede actualizar el usuario con uno de sus campos (si yo quiero solamente puedo actualizar o el nombre o el apellido, etc)
# ademas tener un endpoint para devolver el usuario PERO segun su DNI http://127.0.0.1:5000/usuario/12345678

# implementar un front para este backend

from re import M
from flask import Flask, request, jsonify
from flask_cors import CORS
from data import personal

app = Flask(__name__)
CORS(app=app)


@app.route("/users", methods=["POST"])
def crear_usuario():
    print(request.get_json())
    nuevo_usuario = request.get_json()
    #otro método de agregar json a la lista
    # nuevo_usuario = {
    #     "id": request.json["id"],
    #     "nombre": request.json["nombre"],
    #     "apellido": request.json["apellido"],
    #     "dni": request.json["dni"],
    #     "area": request.json["area"],
    #     "fecha_ingreso": request.json["fecha_ingreso"]
    #}

    personal.append(nuevo_usuario)
    return {
        "data": personal,
        "message": "received",
        "ok": True,
    }

@app.route("/users", methods=["GET"])
def obtener_usuarios():
    return jsonify({
        "data": personal,
        "ok": True,
        "message":"recibido"

    })

@app.route("/user/<int:id>", methods=["GET"])
def obt_usuario(id):
    if id < len(personal):
        return {
            "data": personal[id],
            "message": "Producto Recibido",
            "ok": True
        }
    else:
        return "Personal no encontrado "

@app.route("/user/<int:id>", methods=["PUT"])
def actualizar_usuario(id):
    persona = request.get_json()

    if id < len(personal):
        personal[id] = persona
        return {
            "data": personal,
            "ok": True,
            "message": "Persona actualizada correctamente"
        }
    else:

        return {
            "ok": False,
            "data": None,
            "message": f"La persona con el id {id} no existe"
        }

@app.route("/user/<int:id>", methods=["DELETE"])
def eliminar_usuario(id):
    if id < len(personal):
        personal.pop(id)
        return {
        "data": personal,
        "message": "Usuario Eliminado",
        "ok": True
        }
    else:
        return {
            "ok": False,
            "data": None,
            "message": f"Usuario con id {id} no existe"
        }

if __name__ == "__main__":
    app.run(debug=True)