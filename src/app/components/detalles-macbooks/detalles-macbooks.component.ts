import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Macbook } from '../../models/macbook';
import { MacbookService } from '../../services/macbook.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-detalles-macbooks',
  standalone: true,
  imports: [CommonModule, FooterComponent, RouterModule],
  templateUrl: './detalles-macbooks.component.html',
  styleUrl: './detalles-macbooks.component.css'
})
export class DetallesMacbooksComponent {
  id: string;
  macbook: Macbook | undefined;
  selectedImage: string | null = null; // Inicializado como null

  constructor(private aRouter: ActivatedRoute, private _mackbookService: MacbookService) {
    const idParam = this.aRouter.snapshot.paramMap.get('id');
    if (idParam === null) {
      throw new Error('ID de macbook no proporcionado en la ruta');
    } else {
      this.id = idParam;
    }
  }

  ngOnInit(): void {
    this._mackbookService.obtenerMacbook(this.id).subscribe(
      data => {
        this.macbook = data;
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
