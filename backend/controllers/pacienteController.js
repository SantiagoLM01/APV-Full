import { Paciente } from "../models/Pacientes.js"
const agregarPaciente = async (req, res) => {

    const paciente = new Paciente(req.body)
    console.log(paciente)
    try {
        const pacienteGuardado = await paciente.save();
        res.json(pacienteGuardado)
    } catch (error) {
        console.log(error)
    }

}


const obtenerPacientes = async (req, res) => {

    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);

    res.json(pacientes)

}

const obtenerPaciente = async (req, res) => {

    const { id } = req.params;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const paciente = await Paciente.findById(id)

        console.log(paciente)
        if (!paciente) {
            return res.status(404).json({ msg: 'No Encontrado' })

        }
        if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) { //Se utiliza toString ya que se retorn un objectId y para compararlos y leerlos bien hay que usarlo
            return res.json({ msg: 'Accion no valida' })
        }
        if (paciente) {
            res.json(paciente)
        }
    } else {
        return res.status(404).json({ msg: 'Id no Valido o no encontrado' })
    }

}
const actualizarPaciente = async (req, res) => {

    const { id } = req.params;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const paciente = await Paciente.findById(id)

        console.log(paciente)
        if (!paciente) {
            return res.status(404).json({ msg: 'No Encontrado' })

        }
        if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) { //Se utiliza toString ya que se retorn un objectId y para compararlos y leerlos bien hay que usarlo
            return res.json({ msg: 'Accion no valida' })
        }
        if (paciente) {
            //Actualizar Paciente
            paciente.nombre = req.body.nombre || paciente.nombre; //Se actualiza los datos pero si no se edita un campo se usa || para que se inserte el valor anterior ya que son required
            paciente.propietario = req.body.propietario || paciente.propietario;
            paciente.email = req.body.email || paciente.email;
            paciente.fecha = req.body.fecha || paciente.fecha;
            paciente.sintomas = req.body.sintomas || paciente.sintomas;
            try {
                const pacienteActualizado = await paciente.save();
                res.json(pacienteActualizado)
            } catch (error) {
                console.log(error)
            }

        }
    } else {
        return res.status(404).json({ msg: 'Id no Valido o no encontrado' })
    }

}
const eliminarPaciente = async (req, res) => {

    const { id } = req.params;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const paciente = await Paciente.findById(id)
        if (!paciente) {
            return res.status(404).json({ msg: 'No Encontrado' })

        }
        if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) { //Se utiliza toString ya que se retorn un objectId y para compararlos y leerlos bien hay que usarlo
            return res.json({ msg: 'Accion no valida' })
        }


        try {
            const pacienteEliminado = await paciente.deleteOne();
            res.json({ msg: `El paciente ${pacienteEliminado} ha sido Eliminado` })
        } catch (error) {
            console.log(error)
        }


    } else {
        return res.status(404).json({ msg: 'Id no Valido o no encontrado' })
    }


}
export {
    obtenerPacientes,
    agregarPaciente,
    actualizarPaciente,
    obtenerPaciente,
    eliminarPaciente
}