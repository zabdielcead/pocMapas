import { Injectable } from '@angular/core';
import { OfertaGeneral } from '../models/ofertagral.model';


@Injectable({
  providedIn: 'root'
})
export class OfertagralService {
  ofertasGral: OfertaGeneral[] = [];
  tituloOfertas = ['Renta Departamento', 'Café', 'Comida', 'Bar', 'Ropa'];
  descOfertas = ['Precio $500.00 mensuales', '2x1 en todos los cafés', 'Buffet todo el día', '2x1 mojitos', '3x2 en camisas'];
  telOfertas = ['5289559812', '5289219812', '5297559812', '5749559812', '5289559833'];
  imgOferta = ['./assets/img/departamento.jpg', './assets/img/cafe.jpg',
               './assets/img/comida.jpg', './assets/img/bar.jpg', './assets/img/ropa.jpg'];

  constructor() { }

  getOfertasGenerales() {
    this.tituloOfertas.forEach( (valor, index) => {
        let oferta = new OfertaGeneral(valor, this.descOfertas[index],
                                       this.telOfertas[index], this.imgOferta[index]);

        this.ofertasGral.push(oferta);
    });
    return this.ofertasGral;
  }

}
