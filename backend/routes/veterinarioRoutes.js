import express  from "express";
import { registrar ,perfil,confirmar,autenticar,olvidePassword,comprobarToken,nuevoPassword} from "../controllers/veterinarioController.js";
import { checkAuth } from "../middleware/authMiddleware.js";
import { actualizarPerfil } from "../controllers/veterinarioController.js"; 
import { actualizarPassword } from "../controllers/veterinarioController.js";


const router = express.Router();

//Area publica

router.post('/', registrar)


router.get('/confirmar/:token', confirmar)

router.post('/login', autenticar)

router.post('/olvidepassword',olvidePassword)

router.get('/olvidepassword/:token',comprobarToken)

router.post('/olvidepassword/:token', nuevoPassword)

//Area privada

router.get('/perfil',checkAuth, perfil)
router.put('/perfil/:id',checkAuth, actualizarPerfil)
router.put('/actualizar-password',checkAuth, actualizarPassword)



export default router;