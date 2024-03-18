import { Component, OnInit } from '@angular/core';
import { Accesorio } from '../../models/accesorio';
import { AccesorioService } from '../../services/accesorio.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accesorio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './accesorio.component.html',
  styleUrl: './accesorio.component.css'
})
export class AccesorioComponent implements OnInit{
  listAccesorios: Accesorio [] = [];
  
  constructor (private _accesorioService: AccesorioService) {}

  ngOnInit(): void {
    this.obtenerAccesorios();
  }

  obtenerAccesorios(){
    this._accesorioService.getAcceosrios().subscribe(data => {
      this.listAccesorios = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarAccesorio(id: any){
    this._accesorioService.eliminarAccesorio(id).subscribe(data => {
      Swal.fire({
        title: "Accesorio eliminado correctamente",
        icon: "success"
      });
      this.obtenerAccesorios();
    }, error => {
      console.log(error);
    })
  }
  
}
