/*import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import { Produit } from 'src/app/models/produit.model';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-all-produit',
  templateUrl: './all-produit.component.html',
  styleUrls: ['./all-produit.component.scss']
})
export class AllProduitComponent implements OnInit {
  id!: string;
  produits: Produit[] = [];

  constructor(private router: Router, private produitService: ProduitService, private panierService: PanierService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['cate'];
    this.produitService.getProducts().subscribe(
      (data: Produit[]) => {
        this.produits = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  ouvrirPanier(pageName: string) {
    this.router.navigate([`/${pageName}`]);
  }

}*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import { Produit } from 'src/app/models/produit.model';
import { PanierService } from 'src/app/services/panier.service';


@Component({
  selector: 'app-all-produit',
  templateUrl: './all-produit.component.html',
  styleUrls: ['./all-produit.component.scss']
})
export class AllProduitComponent implements OnInit {
  produits: Produit[] = [];
  recherche: string = '';
  produitTrouve: Produit | null = null;
  suggestions: Produit[] = [];
  tousLesProduits: Produit[] = [];
  
  categorieSelectionnee: string = '';


  constructor(private router: Router, private produitService: ProduitService, private panierService: PanierService) { }

  ngOnInit() {
    this.produitService.getProducts().subscribe(
      (data: Produit[]) => {
        this.produits = data;
        console.log(this.produits);
        this.tousLesProduits = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getNombreProduitsPanier(): number {
    return this.panierService.getNombreProduitsPanier();
  }
  prixPanier(): number {
    return this.panierService.prixPanier();
  }

  rechercherProduit(): void {
    this.produitTrouve = this.produits.find(produit => produit.name === this.recherche) || null;
  }

  //affcihe initialment tous les produits avant la recherche
  afficherTousProduits : boolean = true;
  rechercherBouton(): void {
    this.afficherTousProduits = true;
    this.produitTrouve = null;
  
    if (this.categorieSelectionnee !== '') {
      // Filtrer les produits par catégorie
      this.produits = this.produits.filter(produit => produit.categorie === this.categorieSelectionnee);
    }
  
    const produitsTrouves = this.tousLesProduits.filter(produit => produit.name.toLowerCase().startsWith(this.recherche.toLowerCase()));
    if (produitsTrouves.length > 0) {
      this.produits = produitsTrouves;
    } else {
      this.produits = this.tousLesProduits; // Restaure tous les produits
      alert('Aucun produit trouvé');
      this.recherche = ''; // Vide la barre de recherche
    }
  
    this.suggestions = []; // Réinitialise les suggestions après la recherche
  }
  /*rechercherBouton(): void {
    this.afficherTousProduits = true;
    this.produitTrouve = null;
  
    if (this.categorieSelectionnee !== '') {
      // Filtrer les produits par catégorie
      this.produits = this.tousLesProduits.filter(produit => produit.categorie === this.categorieSelectionnee);
    }
  
    const produitsTrouves = this.produits.filter(produit => produit.name.toLowerCase().startsWith(this.recherche.toLowerCase()));
    if (produitsTrouves.length > 0) {
      this.produits = produitsTrouves;
    } else {
      this.produits = this.tousLesProduits; // Restaure tous les produits
      alert('Aucun produit trouvé');
      this.recherche = ''; // Vide la barre de recherche
    }
  
    this.suggestions = []; // Réinitialise les suggestions après la recherche
  }*/
  
  
  
  

  //pour pouvoir confirmer une recherche en appuyant sur 'entrée'
  selectedSuggestionIndex: number = -1;
  onKeyDown(event: any): void {
    if (event.key === 'Enter') {
      if (this.selectedSuggestionIndex !== -1) {
        this.selectSuggestion(this.suggestions[this.selectedSuggestionIndex]);
      } else {
        this.rechercherBouton();
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.navigSuggestion
      ('up');
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.navigSuggestion
      ('down');
    } else {
      this.updateSuggestions();
    }
  }

  
  
  
  //appelée lorsqu'il y a une modification dans le champ de recherche 
  updateSuggestions(): void {
    if (this.recherche.length >= 1) {
      this.suggestions = this.tousLesProduits.filter(produit =>
        produit.name.toLowerCase().includes(this.recherche.toLowerCase())
      );
      if (this.suggestions.length === 1 && this.suggestions[0].name.toLowerCase() === this.recherche.toLowerCase()) {
        this.rechercherBouton();
      }
    } else {
      this.suggestions = [];
    }
  }
  

  

  //appelée lorsque l'utilisateur clique sur l'une des suggestions affichées dans la liste 
  selectSuggestion(suggestion: Produit): void {
    this.recherche = suggestion.name;
    this.suggestions = []; // réinitialise les suggestions quand que l'utilisateur a fait une sélection
    this.selectedSuggestionIndex = -1;

  }


  //pour rechercher des produits en fonction de la valeur saisie dans le champ de recherche 
  search(): void {
    if (this.recherche.length > 0) {
      this.suggestions = this.produits.filter(produit =>
        produit.name.toLowerCase().startsWith(this.recherche.toLowerCase())
      );
    } else {
      this.suggestions = [];
    }
  }
  


  //Pour afficher la liste de tous les produits
afficheTousProduits(): void {
  this.afficherTousProduits = true;
  this.produitTrouve = null;
  this.recherche = ''; // Réinitialise le champ de recherche

  // Recharge la liste de tous les produits
  this.produitService.getProducts().subscribe(
    (data: Produit[]) => {
      this.produits = data;
    },
    (error) => {
      console.error('Error fetching products:', error);
    }
  );
}



  //met à jour de l'index de la suggestion sélectionnée lors de la navigation avec les touches de direction
  navigSuggestion(direction: 'up' | 'down'): void {
    const suggestionsLength = this.suggestions.length;
    if (suggestionsLength === 0) return;
  
    if (direction === 'up') {
      this.selectedSuggestionIndex = (this.selectedSuggestionIndex - 1 + suggestionsLength) % suggestionsLength;
    } else {
      this.selectedSuggestionIndex = (this.selectedSuggestionIndex + 1) % suggestionsLength;
    }
  }
  


}