import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PhoneComponent } from './components/phone/phone.component';
import { HomeComponent } from './components/home/home.component';
import { AgregarPhoneComponent } from './components/agregar-phone/agregar-phone.component';
import { LoginComponent } from './components/login/login.component';
import { PhoneNuevosComponent } from './components/phone-nuevos/phone-nuevos.component';
import { PhoneUsadosComponent } from './components/phone-usados/phone-usados.component';
import { AccesorioComponent } from './components/accesorio/accesorio.component';
import { AgregarAccesorioComponent } from './components/agregar-accesorio/agregar-accesorio.component';
import { VistaAccesoriosComponent } from './components/vista-accesorios/vista-accesorios.component';
import { DetallesIphoneComponent } from './components/detalles-iphone/detalles-iphone.component';
import { LoginGuard } from './guards/login.guard';
import { LoginGuard2 } from './guards/login2.guard';
import { DetallesAccesorioComponent } from './components/detalles-accesorio/detalles-accesorio.component';
import { VistaMacbooksComponent } from './components/vista-macbooks/vista-macbooks.component';
import { AgregarMacbookComponent } from './components/agregar-macbook/agregar-macbook.component';
import { MacbookComponent } from './components/macbook/macbook.component';
import { DetallesMacbooksComponent } from './components/detalles-macbooks/detalles-macbooks.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'iPhoneNuevos', component: PhoneNuevosComponent, canActivate: [LoginGuard2]},
    {path: 'iPhoneUsados', component: PhoneUsadosComponent, canActivate: [LoginGuard2]},
    {path: 'list-MacBook', component: VistaMacbooksComponent, canActivate: [LoginGuard2]},
    {path: 'list-accesorios', component: VistaAccesoriosComponent, canActivate: [LoginGuard2]},
    {path: 'detalles-iphone/:id', component: DetallesIphoneComponent},
    {path: 'detalles-accesorio/:id', component: DetallesAccesorioComponent},
    {path: 'detalles-macbooks/:id', component: DetallesMacbooksComponent},
    {path: 'accesorio', component: AccesorioComponent, canActivate: [LoginGuard]},
    {path: 'agregar-accesorios', component: AgregarAccesorioComponent, canActivate: [LoginGuard]},
    {path: 'editar-accesorios/:id', component: AgregarAccesorioComponent, canActivate: [LoginGuard]},
    {path: 'agregar-macbook', component: AgregarMacbookComponent, canActivate: [LoginGuard]},
    {path: 'editar-macbook/:id', component: AgregarMacbookComponent, canActivate: [LoginGuard]},
    {path: 'phone', component: PhoneComponent, canActivate: [LoginGuard]},
    {path: 'macbook', component: MacbookComponent, canActivate: [LoginGuard]},
    {path: 'agregar-phone', component: AgregarPhoneComponent, canActivate: [LoginGuard]},
    {path: 'editar-phone/:id', component: AgregarPhoneComponent, canActivate: [LoginGuard]},
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];