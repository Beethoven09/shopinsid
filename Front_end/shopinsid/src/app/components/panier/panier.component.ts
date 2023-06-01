import { Component, OnInit } from '@angular/core';
import { PanierService } from 'src/app/services/panier.service';
import { ProduitPanier } from 'src/app/models/produitPanier.model';
import { Produit } from 'src/app/models/produit.model';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  panierItems: ProduitPanier[] = [];

  constructor(private panierService: PanierService) { }

  ngOnInit() {
    this.panierItems = this.panierService.getProduitsPanier();
  }

  supprimerDuPanier(produit: Produit) {
    this.panierService.supprimerDuPanier(produit);
    this.panierItems = this.panierService.getProduitsPanier();
    alert("Produit supprimé au panier avec succés");
  }

  calculerTotal(): number {
    return this.panierService.prixPanier();
  }

  commander(){
    alert("Commande passée avec succés")
  }
}
