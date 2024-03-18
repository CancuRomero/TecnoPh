import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MacbookService {
  readonly baseURL = 'https://api-tecnophones.vercel.app/api/';
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getMacbooks(): Observable<any>{
    const url = this.baseURL + "macbooks";
    return this.http.get(url);
  }

  eliminarMacbook(id: string): Observable<any> {
    const url = this.baseURL + "macbooks/";
    return this.http.delete(url + id);
  }

  guardarMacbook(modelo:string, caracteristicas:string, memoria:string, 
    almacenamiento:string,  precio:number, visible:boolean, imagenPrincipal: File, imagePaths:File[]): Observable<any> {
    const url = this.baseURL + "macbooks";
    const fd = new FormData();
    fd.append('modelo', modelo);
    fd.append('caracteristicas', caracteristicas);
    fd.append('memoria', memoria);
    fd.append('almacenamiento', almacenamiento);
    fd.append('precio', precio.toString());
    fd.append('visible', visible.toString());
    fd.append('imagenPrincipal', imagenPrincipal);
    imagePaths.forEach((imagen, index) => {
      fd.append(`imagePaths`, imagen, imagen.name);
    });
    return this.http.post(url, fd);
  }

  obtenerMacbook(id: string): Observable<any> {
    const url = this.baseURL + "macbooks/";
    return this.http.get(url + id);
  }

  editarMacbook(id: string, modelo:string, caracteristicas:string, memoria:string, 
    almacenamiento:string,  precio:number, visible:boolean, imagenPrincipal: File, imagePaths:File[]): Observable<any> {
    const url = this.baseURL + "macbooks/";
    const fd = new FormData();
    fd.append('modelo', modelo);
    fd.append('caracteristicas', caracteristicas);
    fd.append('memoria', memoria);
    fd.append('almacenamiento', almacenamiento);
    fd.append('precio', precio.toString());
    fd.append('visible', visible.toString());
    fd.append('imagenPrincipal', imagenPrincipal);
    imagePaths.forEach((imagen, index) => {
      fd.append(`imagePaths`, imagen, imagen.name);
    });
    console.log(fd);
    return this.http.put(url + id, fd);
  }

  buscar (texto_busqueda: any): Observable<any> {
    const url = this.baseURL + `macbooks/macbookSearch/${texto_busqueda}`;
    return this.http.get<any>(url);
  }
}
