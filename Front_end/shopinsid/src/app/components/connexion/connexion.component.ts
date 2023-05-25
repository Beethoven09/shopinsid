import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit{

  constructor(private router: Router){}

  /*Fonction qui renvoie vers une autre page */
  redirectToPage(pageName : string) {
    /*Ce qu'il faut écrire dans pageName se trouve dans les paths de app-routing.module*/
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(){}
}
