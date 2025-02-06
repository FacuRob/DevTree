import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import slug from 'slug'
import User from "../models/User"
import { checkPassword, hastPassword } from '../utils/auth'

export const createAccount = async (req: Request, res: Response) => {

    const { email, password } = req.body

    const userExists = await User.findOne({email})
    if(userExists) {
        const error = new Error('Email ya en uso')
        return res.status(409).json({error : error.message})
    }

    const handle = slug(req.body.handle, '')
    const handleExist = await User.findOne({handle})
    if(handleExist) {
        const error = new Error('Nombre de usuario no disponible')
        return res.status(409).json({error : error.message})
    }

    const user = new User(req.body)
    user.password = await hastPassword(password)
    user.handle = handle

    await user.save()
    res.status(201).send('Registro creado correctamente')
}

export const login = async (req: Request, res: Response) => {
    
    //Manejar Errores
    let errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { email, password } = req.body

    //Revisar si el usuario esta registrado
    const user = await User.findOne({email})
    if(!user) {
        const error = new Error('El usuario no existe')
        return res.status(404).json({error : error.message})
    }

    //Comprobar el password 
    const isPasswordCorrect = await checkPassword(password, user.password)
    if(!isPasswordCorrect) {
        const error = new Error('La contraseña es incorrecta')
        return res.status(401).json({error : error.message})
    }

    res.send('Autenticado...')
}