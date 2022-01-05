import { Offcanvas, Button, Form, Table } from "react-bootstrap"
import {useEffect, useState} from "react"
import Swal from "sweetalert2"

import { obt_personal, agregar_personal, delete_personal, update_personal, obt_persona_id } from "../services/obt_data";

export default function Principal() {

    // This handle to open and close the acordeon
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // const for the form
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [dni, setDni] = useState("");
    const [area, setArea] = useState("");
    const [fechaIngreso, setFechaIngreso] = useState("");

    // States to fill and manage data from API
    const [users, setUsers] = useState([]);
    const [tabla, setTabla] = useState([])
    const[busqueda, setBusqueda] = useState("")

    // This allow to edit the information of an specific id
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState("")

    const nvo_personal = {
        nombre,
        apellido,
        dni,
        area,
        fechaIngreso,
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (edit === false ){
            await agregar_personal(nvo_personal);
            await get_personal();
        }else {
            await update_personal(id, nvo_personal )
            await get_personal();
            handleClose(true)
            setEdit(false);
            setId("");
        }
        setNombre("")
        setApellido("")
        setDni("")
        setArea("")
        setFechaIngreso("")
        
    }

    const handleChange = (e) => {
        buscar(e.target.value);
        setBusqueda(e.target.value);
    }

    const buscar = (elementoDeBusqueda) => {
        const resultado_busqueda = tabla.filter((elemento) => {
            if (elemento.dni.toString().includes(elementoDeBusqueda) ||
            elemento.apellido.toString().toLowerCase().includes(elementoDeBusqueda.toLowerCase()) || elemento.nombre.toString().toLowerCase().includes(elementoDeBusqueda.toLowerCase())
            ){
                return elemento
            }
        });
        setUsers(resultado_busqueda)

    }

    const limpiar_campos = () => {
        setNombre("")
        setApellido("")
        setDni("")
        setArea("")
        setFechaIngreso("")
    }

    const get_personal = async () => {
        try {
            const lista_personal = await obt_personal();
            setUsers(lista_personal);
            setTabla(lista_personal);
        } catch (error) {
            console.log(error);
        }
    }

    const borrar_personal = async (id) => {
        const respuesta = await Swal.fire({
            title: "Seguro que quiere eliminar a esta persona?",
            text: "Este proceso no se puede revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar!',
        })
        if (respuesta.isConfirmed){
            try {
                await delete_personal(id);
                await get_personal();
                Swal.fire({
                    icon: "success",
                    title:'Personal ha sio borrado',
                    timer: 1500
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    const editar_personal = async (id) => {

        handleShow(true)

        const data = await obt_persona_id(id)
        setEdit(true)
        setId(id)
        setNombre(data.nombre)
        setApellido(data.apellido)
        setDni(data.dni)
        setArea(data.area)
        setFechaIngreso(data.fechaIngreso)

        await get_personal();
    }

    useEffect(()=> {
        get_personal()
    }, [])

    return (
        <div>
            <h1>Bienvenido</h1>
            <div className="busqueda_agregar mb-3">
            <Button className="btn-agregar" variant="primary" onClick={handleShow}>
                Agregar Personal
            </Button>
                <div className="containerInput col-7">
                    <input
                    className="form-control inputBuscar" 
                    value={busqueda}
                    placeholder="Búsqueda por Nombre, Apellido o DNI"
                    onChange={handleChange}
                    />
                    <button className="btn btn-success">
                    <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Ingresar Datos</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombres</label>
                            <input 
                                type="text" 
                                className="form-control"
                                id="nombre"
                                placeholder="Ej. Juan Carlos"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                autoFocus
                                />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="apellidos" className="form-label">Apellidos</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="apellido"
                                placeholder="Ej. Perez Moncada"
                                value={apellido}
                                onChange={e => setApellido(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="dni" className="form-label">DNI</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                id="dni"
                                placeholder="Ej. 12345678"
                                value={dni}
                                onChange={e => setDni(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="area" className="form-label">Area</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="area"
                                placeholder="Ej. Compras"
                                value={area}
                                onChange={e => setArea(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="fechaIngreso" className="form-label">Fecha de Ingreso</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="fechaIngreso"
                                placeholder="Ej. 12/02/2005"
                                value={fechaIngreso}
                                onChange={e => setFechaIngreso(e.target.value)} />
                        </div>
                        <div className="mt-5">
                            <button type="submit" className="btn btn-success">{edit ? "Editar" : "Agregar"}</button>
                            <button type="reset" className="btn btn-danger mx-3" onClick={limpiar_campos}>Limpiar</button>
                        </div>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>

            <Table striped bordered hover variant="light" className="table" responsive="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellidos </th>
                    <th>Dni</th>
                    <th>Area</th>
                    <th>Fecha de Ingreso</th>
                    <th colSpan={2}>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => (
                        <tr key={i}>
                            <td>{i +1}</td>
                            <td>{user.nombre}</td>
                            <td>{user.apellido}</td>
                            <td>{user.dni}</td>
                            <td>{user.area}</td>
                            <td>{user.fechaIngreso}</td>
                            <td><Button variant="success" onClick={(e) => editar_personal(i)}>Editar</Button></td>
                            <td><Button variant="danger" onClick={(e) => borrar_personal(i)}>Eliminar</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
