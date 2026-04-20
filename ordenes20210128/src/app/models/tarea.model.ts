import{TareaItem} from './tarea-item.model'


export class Tarea{
    id: number;
    titulo: string;
    fechaAlta: Date;
    fechaTerminadaEn: Date;
    completada: boolean;

    items: TareaItem[];

    constructor(titulo: string){
        this.titulo= titulo;
        this.fechaAlta = new Date();
        this.completada = false;
        this.items = [];
        this.id= new Date().getTime();
    }


}