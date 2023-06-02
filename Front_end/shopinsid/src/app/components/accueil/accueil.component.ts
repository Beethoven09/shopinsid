import { Produit } from './../../models/produit.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit{


    constructor(private router: Router)
      { }
    /*Fonction qui renvoie vers une autre page */
    redirectToPage(pageName : string) {
      /*Ce qu'il faut écrire dans pageName se trouve dans les paths de app-routing.module*/
      this.router.navigate([`${pageName}`]);
    }
  
    ngOnInit(){    
    }
    ngOptions = [3,6,1,4,2,10,7,5,9,8]
    ngDropdown = this.ngOptions[1];

     
}
 
  
