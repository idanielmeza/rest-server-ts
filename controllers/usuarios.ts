import { Request,Response } from "express"
import Usuario from "../models/usuario"

export const getUsuarios = async(req: Request, res: Response)=>{

    const usuarios = await Usuario.findAll();

    res.json({usuarios});
}

export const getUsuario = async(req: Request, res: Response)=>{

    const {id} = req.params;

    const usuario = await Usuario.findByPk(id)

    if(usuario){
        res.json({usuario});
    }
    else{
        res.status(404).json({message: 'Usuario no encontrado'});
    }

}

export const postUsuario = async(req: Request, res: Response)=>{

    const {body} = req;

    try{

        const existe = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if(existe){
            return res.status(400).json({message: 'El correo ya esta en uso'});
        }

        const usuario = await Usuario.create(body);
        
        res.json({usuario});

    }catch(e:any){
        res.status(400).json({message: 'Hubo un error hable con el administrador'});
    }
}

export const putUsuario = async(req: Request, res: Response)=>{
    const {id} = req.params;
    const {body} = req;

    try{

        const usuario = await Usuario.findByPk(id);

        if(!usuario){
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        await usuario.update(body);

        res.json({usuario});

    }catch(e:any){
        res.status(400).json({message: 'Hubo un error hable con el administrador'});
    }
}

export const deleteUsuario = async(req: Request, res: Response)=>{

    const {id} = req.params;

    try{

        const usuario = await Usuario.findByPk(id);

        if(!usuario){
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        await usuario.update({
            estado: false
        });

        res.json({message: 'Usuario eliminado'});

    }catch(e:any){
        res.status(400).json({message: 'Hubo un error hable con el administrador'});
    }

}

