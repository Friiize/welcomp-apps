import { Component, OnInit } from '@angular/core';
import {FactureService} from '../services/facture.service';

@Component({
  selector: 'app-facture-unarchived',
  templateUrl: './facture-unarchived.component.html',
  styleUrls: ['./facture-unarchived.component.scss'],
})
export class FactureUnarchivedComponent implements OnInit {

  constructor(private readonly factureService: FactureService) { }

  ngOnInit() {
    this.factureService.listUnarchived().subscribe(console.log);
  }

}
