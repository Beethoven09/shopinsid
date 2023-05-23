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
}
