import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PhoneService } from '../../services/phone.service';
import { Phone } from '../../models/phone';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-phone-usados',
  standalone: true,
  imports: [FormsModule, RouterModule, FooterComponent, CommonModule],
  templateUrl: './phone-usados.component.html',
  styleUrl: './phone-usados.component.css',
  
})
export class PhoneUsadosComponent implements OnInit{
  listaCelulares: Phone[] = [];
  search:String | undefined;
  

  
  
  constructor(private _phoneService: PhoneService) {   }

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


