import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import { Produit } from 'src/app/models/produit.model';
import { PanierService } from 'src/app/services/panier.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-all-produit',
  templateUrl: './all-produit.component.html',
  styleUrls: ['./all-produit.component.scss']
})
export class AllProduitComponent implements OnInit {
  id!: string;
  produits: Produit[] = [];
  recherche: string = '';
  produitTrouve: Produit | null = null;
  suggestions: Produit[] = [];
  tousLesProduits: Produit[] = [];
  
  categorieSelectionnee: number | null = null;
  produitsFiltres: any[] = []; // tableau pour stocker les produits filtrés

  constructor(private authService:AuthService, private router: Router, private produitService: ProduitService, private panierService: PanierService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['cate'];
    this.produitService.getProducts().subscribe(
      (data: Produit[]) => {
        this.produits = data;
        this.produitsFiltres = [...this.produits];
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  
  logout(): void {
    // Appeler la méthode de déconnexion dans le service d'authentification
    this.authService.logout();

    // Rediriger vers la page de connexion
    this.router.navigate(['/connexion']);
  }
  
  ouvrirPanier(pageName: string) {
    this.router.navigate([`/${pageName}`]);
  }

  //
  getNombreProduitsPanier(): number {
    return this.panierService.getNombreProduitsPanier();
  }
  prixPanier(): number {
    return this.panierService.prixPanier();
  }

  rechercherProduit(): void {
    this.produitTrouve = this.produits.find(produit => produit.name.toLowerCase() === this.recherche.toLowerCase()) || null;
    if (this.produitTrouve === null) {
      alert('Produit non disponible');
    }
  }

  filtrerProduits() {
    // Si aucune catégorie n'est sélectionnée, afficher tous les produits
    if (this.categorieSelectionnee === null) {
      this.produitsFiltres = [...this.produits];
    } else {
      // Filtrer les produits en fonction de la catégorie sélectionnée
      this.produitsFiltres = this.produits.filter(produit => produit.categorieID === this.categorieSelectionnee);
    }
  }
  
  

  //affcihe initialment tous les produits avant la recherche
  afficherTousProduits : boolean = true;
  rechercherBouton(): void {
    this.afficherTousProduits = false;
    this.produitTrouve = null;
  
    if (this.categorieSelectionnee !== null) {
      // Filtrer les produits par catégorie
      this.produitsFiltres = this.produits.filter(produit => produit.categorieID === this.categorieSelectionnee && produit.name.toLowerCase().includes(this.recherche.toLowerCase()));
    } else {
      this.produitsFiltres = this.produits.filter(produit => produit.name.toLowerCase().includes(this.recherche.toLowerCase()));
    }
    
    
  
    const produitsTrouves = this.produitsFiltres.filter(produit => produit.name.toLowerCase().includes(this.recherche.toLowerCase()));
    if (produitsTrouves.length > 0) {
      this.produitTrouve = produitsTrouves[0]; // Sélectionnez le premier produit trouvé
    } else {
      alert('Aucun produit trouvé');
      this.filtrerProduits(); // Filtre les produits de la catégorie sélectionnée
      this.recherche = ''; // Vide la barre de recherche
    }
    
  
    this.suggestions = []; // Réinitialise les suggestions après la recherche
  }
  

  afficherProduitTrouve(): void {
    const produitsTrouves = this.produits
      .filter(produit => produit.categorieID === this.categorieSelectionnee)
      .filter(produit => produit.name.toLowerCase().includes(this.recherche.toLowerCase()));
    if (produitsTrouves.length > 0) {
      this.produitTrouve = produitsTrouves[0]; // Sélectionnez le premier produit trouvé
    } else {
      alert('Aucun produit trouvé');
      this.recherche = ''; // Vide la barre de recherche
    }
  
    this.suggestions = []; // Réinitialise les suggestions après la recherche
  }
  
  

  
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
    if (this.categorieSelectionnee === null) {
      this.suggestions = this.produits.filter(produit =>
        produit.name.toLowerCase().startsWith(this.recherche.toLowerCase())
      );
    } else {
      this.suggestions = this.produits
        .filter(produit => produit.categorieID === this.categorieSelectionnee)
        .filter(produit =>
          produit.name.toLowerCase().startsWith(this.recherche.toLowerCase())
        );
    }
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
        this.tousLesProduits = data; // Met à jour la liste complète des produits
        this.produitsFiltres = this.produits; // Met à jour les produits filtrés avec tous les produits
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