import { Component, OnInit } from '@angular/core';
import { AccesorioService } from '../../services/accesorio.service';
import { Accesorio } from '../../models/accesorio';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-vista-accesorios',
  standalone: true,
  imports: [CommonModule, FooterComponent, RouterModule, FormsModule],
  templateUrl: './vista-accesorios.component.html',
  styleUrl: './vista-accesorios.component.css'
})
export class VistaAccesoriosComponent implements OnInit{
  accesorios: Accesorio [] = [];
  
  search:String | undefined;

  constructor (private _accesorioService: AccesorioService) {}
  
  ngOnInit(): void {
    this.obtenerAccesorios();
    
  }

  obtenerAccesorios() {
    this._accesorioService.getAcceosrios()
      .subscribe(
        res => {
         this.accesorios = res; 
        },
        error => console.log(error)
      );
  }
  buscar(){
    if (this.search === "") {
      this.obtenerAccesorios();
    }else{
      this._accesorioService.buscar(this.search).subscribe( 
        data => {
          console.log("Hola");
          this.accesorios = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
