export class Macbook {
    _id?:string;
    modelo:string;
    caracteristicas:string;
    memoria:string;
    almacenamiento:string;
    precio:number;
    visible:boolean;
    imagenPrincipal: File;
    imagePaths: File[];

    constructor (modelo:string, caracteristicas:string, memoria:string, almacenamiento:string, precio:number, visible:boolean,imagenPrincipal:File, imagePaths:File[]) {
        this.modelo = modelo;
        this.caracteristicas = caracteristicas;
        this.memoria = memoria;
        this.almacenamiento = almacenamiento;
        this.precio = precio;
        this.visible = visible;
        this.imagenPrincipal = imagenPrincipal;
        this.imagePaths = imagePaths;
    }
}
