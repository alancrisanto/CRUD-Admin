import axios from "axios";


URL = process.env.REACT_APP_API

const obt_personal = async () => {
    try {
        const {data} = await axios.get(`${URL}users`)
        console.table(data.data)
        return data.data
    } catch (error) {
        throw error
    }
}

const agregar_personal = async (nuevo_personal) => {
    try {
        const headers = {
            "Content-Type": "application/json"
        }
        const {data} = await axios.post(
            `${URL}users`,nuevo_personal,{headers})
        return data
    } catch (error) {
        throw error
    }
}

const delete_personal = async (id) => {
    try {
        await axios.delete(`${URL}user/${id}`)
        return "Personal Eliminado"
    } catch (error) {
        console.log(error)
    }
}

const obt_persona_id = async (id) => {
    try {
        const {data} = await axios.get(`${URL}user/${id}`)
        return data.data
    } catch (error) {
        console.log(error)
    }
}

const update_personal = async (id, mod_personal) => {
    try {
        const headers = {
            "Content-Type": "application/json"
        }
        await axios.put(`${URL}user/${id}`, mod_personal, {headers})
        return
    } catch (error) {
        console.log(error)
    }
}


export {obt_personal, agregar_personal, delete_personal, update_personal, obt_persona_id}