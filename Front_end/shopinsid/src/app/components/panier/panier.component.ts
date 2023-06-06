import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import { Produit } from 'src/app/models/produit.model';
import { PanierService } from 'src/app/services/panier.service';

interface PanierItem extends Produit {  // Ajout de l'extension du type Produit
  quantite: number;
}

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  panierItems: PanierItem[] = [];

  constructor(private panierService: PanierService) { }

  ngOnInit() {
    this.getPanierItems();
  }

  private getPanierItems() {
    this.panierService.getProduitsPanier().subscribe(items => {
      this.panierItems = items.map(item => ({ ...item, quantite: 1 })); // Ajout de la propriété quantite
    });
  }

  supprimerDuPanier(id: string) {
    const produit: Produit = {
      id: Number(id),
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      rechercheBarre: 0,
      categorie: '',
      quantite: 0
    };
    this.panierService.supprimerDuPanier(produit); // Appeler la méthode sans subscribe()
    this.getPanierItems();
    alert('Produit supprimé du panier avec succès');
  }
  
  
  

  commander() {
    // Logique de la commande
    alert('Commande passée avec succès');
  }
}
