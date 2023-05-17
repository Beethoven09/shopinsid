import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bouton-detail',
  templateUrl: './bouton-detail.component.html',
  styleUrls: ['./bouton-detail.component.scss']
})
export class BoutonDetailComponent implements OnInit{
  /* Variable contenant le texte écrit sur le bouton*/
  button_text !: string;

  /* Ajouter ici une fonction callback lorsque l'on clique sur le bouton*/

  ngOnInit(){
    this.button_text = "Détails";
  }
}
