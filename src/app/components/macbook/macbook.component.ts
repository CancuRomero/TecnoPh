import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MacbookService } from '../../services/macbook.service';
import { Macbook } from '../../models/macbook';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-macbook',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './macbook.component.html',
  styleUrl: './macbook.component.css'
})
export class MacbookComponent {
  listMacbooks: Macbook[] = [];

  constructor(private _macbookService: MacbookService ) {}

  ngOnInit(): void{
    this.obtenerMacbooks();
  }

  obtenerMacbooks(){
    this._macbookService.getMacbooks().subscribe(data => {
      this.listMacbooks = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarMacbook(id: any){
    this._macbookService.eliminarMacbook(id).subscribe(data => {
      Swal.fire({
        title: "iPhone eliminado correctamente",
        icon: "success"
      });
      this.obtenerMacbooks();
    }, error => {
      console.log(error);
    })
  }
}
