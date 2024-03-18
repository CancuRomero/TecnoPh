import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PhoneService } from '../../services/phone.service';
import { Phone } from '../../models/phone';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-detalles-iphone',
  standalone: true,
  imports: [CommonModule, FooterComponent, RouterModule],
  templateUrl: './detalles-iphone.component.html',
  styleUrl: './detalles-iphone.component.css'
})
export class DetallesIphoneComponent implements OnInit{
  id: string;
  phone: Phone | undefined;
  selectedImage: string | null = null; // Inicializado como null

  constructor(private aRouter: ActivatedRoute, private _phoneService: PhoneService) {
    const idParam = this.aRouter.snapshot.paramMap.get('id');
    if (idParam === null) {
      throw new Error('ID de teléfono no proporcionado en la ruta');
    } else {
      this.id = idParam;
    }
  }

  ngOnInit(): void {
    this._phoneService.obtenerPhone(this.id).subscribe(
      data => {
        this.phone = data;
        // Establece la imagen principal como la imagen seleccionada por defecto
        this.selectedImage = `https://backtecnophones-production.up.railway.app/${data.imagenPrincipal}`;
      },
      error => {
        console.log(error);
      }
    );
  }
  
  selectImage(imagePath: string | File): void {
    this.selectedImage = `https://backtecnophones-production.up.railway.app${imagePath}`;
  }
  
}