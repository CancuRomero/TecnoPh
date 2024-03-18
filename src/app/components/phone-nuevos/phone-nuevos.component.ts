import { Component, OnInit } from '@angular/core';
import { PhoneService } from '../../services/phone.service';
import { Phone } from '../../models/phone';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-phone-nuevos',
  standalone: true,
  imports: [CommonModule, RouterLink,FooterComponent, FormsModule],
  templateUrl: './phone-nuevos.component.html',
  styleUrl: './phone-nuevos.component.css'
})
export class PhoneNuevosComponent implements OnInit{
  listaCelulares: Phone[] = [];
  search:String | undefined;
  
  constructor(private _phoneService: PhoneService) {
    this.search = '';
   }

  ngOnInit(): void {
    this.obtenerPhones();
  }

  obtenerPhones() {
    this._phoneService.getPhones().subscribe(
      data => {
        this.listaCelulares = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  buscar(){
    if (this.search === "") {
      this.obtenerPhones();
    }else{
      this._phoneService.buscar(this.search).subscribe( 
        data => {
          console.log("Hola");
          this.listaCelulares = data;
          console.log(this.listaCelulares);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}