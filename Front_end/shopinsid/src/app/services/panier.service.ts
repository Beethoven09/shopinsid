import { Injectable } from '@angular/core';
import { Produit } from '../models/produit.model';
import { ProduitPanier } from '../models/produitPanier.model';


@Injectable({
  providedIn: 'root'
})
export class PanierService {
  panierItems: ProduitPanier[] = [];

  constructor() {}

  ajouterAuPanier(produit: Produit, quantite: number) {
    const produitExistant = this.panierItems.find(item => item.produit.id === produit.id);

    if (produitExistant) {
      produitExistant.quantite += quantite;
    } else {
      const produitAvecQuantite: ProduitPanier = { produit, quantite };
      this.panierItems.push(produitAvecQuantite);
    }
  }

  supprimerDuPanier(produit: Produit) {
    const index = this.panierItems.findIndex(item => item.produit.id === produit.id);

    if (index !== -1) {
      this.panierItems.splice(index, 1);
    }
  }

  getProduitsPanier(): ProduitPanier[] {
    return this.panierItems;
  }

  produitDansPanier(produit: Produit): boolean {
    return this.panierItems.some(item => item.produit.id === produit.id);
  }

  getNombreProduitsPanier(): number {
    return this.panierItems.length;
  }

  prixPanier(): number {
    let total = 0;

    for (const item of this.panierItems) {
      total += item.produit.price * item.quantite;
    }

    return parseFloat(total.toFixed(2));
  }
}
