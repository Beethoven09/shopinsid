import { Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.scss']
})
export class ProduitDetailComponent {
  nom!: string;
  imageUrl!: string;
  prix!: number;
  description!: string;
  id !: number;

  constructor(private router: Router)
    {}

  /*Fonction qui renvoie vers une autre page */
  redirectToPage(pageName : string) {
    /*Préciser le chemin vers le component destination dans le constructeur*/
    this.router.navigate([`${pageName}`]);
  }
}
