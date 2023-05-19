import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-produit',
  templateUrl: './all-produit.component.html',
  styleUrls: ['./all-produit.component.scss']
})

export class AllProduitComponent {
  produits = [
    {
      nom: "1er produit",
      imageUrl: "../../../assets/smiley.jpg",
      prix: 6.00,
      description: "Voici le premier produit du site.",
      id: 1111
    }
  ];
  constructor(private router: Router)
    { }
  
}