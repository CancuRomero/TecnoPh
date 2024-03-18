export class Accesorio {
    _id?:string;
    nombre:string;
    descripcion:string;
    precio:number;
    imagenPrincipal:File;
    imagePaths: File[];

    constructor (nombre:string, descripcion: string, precio: number,imagenPrincipal: File, imagePaths: File[]){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagenPrincipal = imagenPrincipal;
        this.imagePaths = imagePaths;
    }
}

