import { Component } from '@angular/core';
import { OfertagralService } from '../../services/ofertagral.service';
import { OfertaGeneral } from 'src/app/models/ofertagral.model';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  ofertasGenerales: OfertaGeneral[] = [];
  constructor(private ofertagralService: OfertagralService) {}

  ngOnInit() {
    this.ofertasGenerales = this.ofertagralService.getOfertasGenerales();
  }

}
