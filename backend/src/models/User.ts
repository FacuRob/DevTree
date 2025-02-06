import mongoose, { Schema } from "mongoose";

export interface IUser {
    handle: string
    name: string
    email: string
    password: string
}

const userScrema = new Schema({
    handle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
        required: true, //valor que obliga a que el valor sea requerido
        trim: true //valor que si tiene un espacio el blanco lo borra automaticamente
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, // hace que el valor sea unico
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
})

const User = mongoose.model<IUser>('User', userScrema)
export default User