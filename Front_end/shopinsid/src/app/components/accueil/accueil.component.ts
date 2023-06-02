import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit{
  /* données pour le menu déroulant */
  category_list = [
    { id: 1, name: "Jeux" },
    { id: 2, name: "Lecture" },
    { id: 3, name: "Cinéma"},
    {id: 4, name: "Electroménager"},
    {id: 5, name: "Jardinerie"},
    {id: 6, name: "Bricolage"},
  ];
  

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
