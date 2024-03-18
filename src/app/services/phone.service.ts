import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap} from 'rxjs';
import { Phone } from '../models/phone';


@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  readonly baseURL = 'https://api-tecnophones.vercel.app/api/';
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$.asObservable();
  }
  
  getPhones(): Observable<any>{
    const url = this.baseURL + "phones";
    return this.http.get(url);

  }

  eliminarPhone(id: string): Observable<any> {
    const url = this.baseURL + "phones/" + id;
    return this.http.delete(url);
  }

  guardarPhone(modelo:string, estado:string, bateria:number, 
    capacidad:number, observaciones:string, valor:number,visible:boolean, imagenPrincipal: File, imagePaths:File[]): Observable<any> {
    const url = this.baseURL + "phones";
    const fd = new FormData();
    fd.append('modelo', modelo);
    fd.append('estado', estado);
    fd.append('bateria', bateria.toString());
    fd.append('capacidad', capacidad.toString());
    fd.append('observaciones', observaciones);
    fd.append('valor', valor.toString());
    fd.append('visible', visible.toString());
    fd.append('imagenPrincipal', imagenPrincipal);
    imagePaths.forEach((imagen, index) => {
      fd.append(`imagePaths`, imagen, imagen.name);
    });
    return this.http.post(url, fd);
  }

  obtenerPhone(id: string): Observable<any> {
    const url = this.baseURL + "phones/";
    return this.http.get(url + id);
  }

  editarPhone(id: string, modelo:string, estado:string, bateria:number, 
    capacidad:number, observaciones:string, valor:number,visible:boolean, imagenPrincipal: File, imagePaths:File[]): Observable<any> {
    const url = this.baseURL + "phones/";
    const fd = new FormData();
    fd.append('modelo', modelo);
    fd.append('estado', estado);
    fd.append('bateria', bateria.toString());
    fd.append('capacidad', capacidad.toString());
    fd.append('observaciones', observaciones);
    fd.append('valor', valor.toString());
    fd.append('visible', visible.toString());
    fd.append('imagenPrincipal', imagenPrincipal);
    imagePaths.forEach((imagen, index) => {
      fd.append(`imagePaths`, imagen, imagen.name);
    });
    return this.http.put(url + id, fd);
  }

  buscar (texto_busqueda: any): Observable<any> {
    const url = this.baseURL + `phones/iphoneSearch/${texto_busqueda}`;
    return this.http.get<any>(url);
  }
}
