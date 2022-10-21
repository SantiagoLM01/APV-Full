import jwt from 'jsonwebtoken'

const generarJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { //No almacenar informacion sensible en los JWT
        expiresIn: "30d",

    })
}

export {
    generarJWT
}