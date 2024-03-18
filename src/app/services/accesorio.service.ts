import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccesorioService {
  readonly baseURL = 'https://api-tecnophones.vercel.app/api/';

  nuevoAccesorio$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  getAcceosrios(): Observable<any>{
    const url = this.baseURL + "accesorios";
    return this.http.get(url);
  }

  eliminarAccesorio(id: string): Observable<any> {
    const url = this.baseURL + "accesorios/";
    return this.http.delete(url + id);
  }

  guardarAccesorio(nombre: string, descripcion: string, precio: number, imagenPrincipal: File, imagePaths: File[]): Observable<any> {
    const url = this.baseURL + "accesorios";
    const fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('descripcion', descripcion);
    fd.append('precio', precio.toString());
    fd.append('imagenPrincipal', imagenPrincipal);
    imagePaths.forEach((archivo) => {
        fd.append('imagePaths', archivo, archivo.name);
    });
    return this.http.post(url, fd);
  }



  obtenerAccesorio(id: string): Observable<any> {
    const url = this.baseURL + "accesorios/";
    return this.http.get(url + id);
  }

  editarAccesorio(id: string, descripcion: string, nombre: string, precio: number,imagenPrincipal: File, imagePaths: File[]): Observable<any> {
    const url = this.baseURL + "accesorios/";
    const fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('descripcion', descripcion);
    fd.append('precio', precio.toString());
    fd.append('imagenPrincipal', imagenPrincipal);
    imagePaths.forEach((imagen, index) => {
      fd.append(`imagePaths`, imagen, imagen.name);
    });
    return this.http.put(url + id, fd);
  }

  buscar (texto_busqueda: any): Observable<any> {
    const url = this.baseURL + `accesorios/accSearch/${texto_busqueda}`;
    return this.http.get<any>(url);
  }
}
