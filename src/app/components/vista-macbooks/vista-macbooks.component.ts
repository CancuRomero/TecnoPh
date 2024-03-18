import { Component } from '@angular/core';
import { MacbookService } from '../../services/macbook.service';
import { Macbook } from '../../models/macbook';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-macbooks',
  standalone: true,
  imports: [CommonModule, FooterComponent, RouterModule, FormsModule],
  templateUrl: './vista-macbooks.component.html',
  styleUrl: './vista-macbooks.component.css'
})
export class VistaMacbooksComponent {
  macbooks: Macbook [] = [];
  search:String | undefined;

  constructor (private _macbookService: MacbookService) {}
  
  ngOnInit(): void {
    this.obtenerMacbooks();
  }

  obtenerMacbooks() {
    this._macbookService.getMacbooks()
      .subscribe(
        res => {
         this.macbooks = res; 
        },
        error => console.log(error)
      );
  }
  buscar(){
    if (this.search === "") {
      this.obtenerMacbooks();
    }else{
      this._macbookService.buscar(this.search).subscribe( 
        data => {
          this.macbooks = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
