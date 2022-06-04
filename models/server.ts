import express,{Application} from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors';
import db from '../db/connection';

class Server{

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios : '/api/usuarios'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        //Inicializando
        this.middlewares();
        this.routes();
        this.dbConnection();
    }

    async dbConnection(){
        try{
            await db.authenticate();
            console.log('DB connected');
        } catch(e: any){
            console.log(e);
            throw new Error( e );
            
        }

    }

    middlewares(){
        //CORS
        this.app.use(cors());
        // LECTURA DEL BODY
        this.app.use(express.json());
        // CARPETA PUBLICA
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port: ' + this.port);
        });
    }

}

export default Server;