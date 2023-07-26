import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import { Produit } from 'src/app/models/produit.model';
import { PanierService } from 'src/app/services/panier.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  id!: string;
  produits: Produit[] = [];
  recherche: string = '';
  produitTrouve: Produit | null = null;
  suggestions: Produit[] = [];
  tousLesProduits: Produit[] = [];
  categorieSelectionnee: string | undefined = undefined;
  liste_cate!: any[];
  produitsFiltres: any[] = [];
  isLoggedIn: boolean = false; // Variable pour suivre l'état de connexion
  isAdmin: boolean = false; // Variable pour suivre le rôle de l'utilisateur (admin ou non)


  constructor(
    private authService: AuthService,
    private router: Router,
    private produitService: ProduitService,
    private panierService: PanierService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.produitService.getCategories().subscribe(
      (data: Produit[]) => {
        try {
          this.liste_cate = data; // Stocke la liste des catégories
        } catch (error) {
          console.error('Erreur lors de la récupération des catégories :', error);
        }
      }
    );

    this.categorieSelectionnee = this.route.snapshot.params['cate']; // Récupère l'ID de la catégorie dans l'URL

    if (this.categorieSelectionnee === undefined) {
      this.AllProducts(); // Affiche tous les produits si aucune catégorie n'est sélectionnée
    } else {
      this.filtrerCategorie(this.categorieSelectionnee); // Filtre les produits par catégorie
    }

    this.isLoggedIn = this.authService.isLoggedIn(); // Vérifie si l'utilisateur est connecté lors du chargement de l'application
    // Vérifier si l'utilisateur a le rôle "admin"
    this.isAdmin = this.authService.hasRole('admin');
  }

  redirectToPage(pageName: string) {
    this.router.navigateByUrl(pageName);
  }

  AllProducts() {
    try {
      this.produitService.getProducts().subscribe((data: Produit[]) => {
        this.produits = data;
        this.produitsFiltres = [...this.produits];
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error);
    }
  }

  filtrerCategorie(id: string) {
    try {
      this.produitService.getAllProduitOfCategorie(id).subscribe((data: Produit[]) => {
        this.produits = data;
      });
      this.router.navigateByUrl('all-produit/' + id + this.categorieSelectionnee);
    } catch (error) {
      console.error('Erreur lors de la récupération de tous les produits de la catégorie :', error);
    }
  }

  login(email: string, password: string, rememberMe: boolean): void {
    this.authService.login(email, password, rememberMe).subscribe(
      () => {
        console.log("Connexion réussie !");
        this.isLoggedIn = true; // Mettre à jour la variable isLoggedIn après la connexion réussie
        this.isAdmin = this.authService.hasRole('admin'); // Vérifier si l'utilisateur a le rôle "admin" après la connexion réussie
      },
      (error) => {
        console.error("Erreur lors de la connexion :", error);
      }
    );
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        console.log("Déconnexion réussie !");
        this.isLoggedIn = false; // Mettre à jour la variable isLoggedIn après la déconnexion réussie
        this.router.navigate(['/connexion']); // Rediriger vers la page de connexion ou une autre page appropriée
      },
      (error) => {
        console.error("Erreur lors de la déconnexion :", error);
      }
    );
  }

  ouvrirPanier(pageName: string) {
    this.router.navigate([`/${pageName}`]);
  }

  getNombreProduitsPanier(): number {
    return this.panierService.getNombreProduitsPanier();
  }

  prixPanier(): number {
    return this.panierService.prixPanier();
  }

  rechercherProduit(): void {
    this.produitTrouve =
      this.produits.find((produit) => produit.name.toLowerCase() === this.recherche.toLowerCase()) || null;
    if (this.produitTrouve === null) {
      alert('Produit non disponible');
    }
  }

  afficherTousProduits: boolean = true;

  rechercherBouton(): void {
    this.afficherTousProduits = false;
    this.produitTrouve = null;

    if (this.categorieSelectionnee !== null) {
      this.produitsFiltres = this.produits.filter(
        (produit) => produit.categorieID === this.categorieSelectionnee && produit.name.toLowerCase().includes(this.recherche.toLowerCase())
      );
    } else {
      this.produitsFiltres = this.produits.filter((produit) => produit.name.toLowerCase().includes(this.recherche.toLowerCase()));
    }

    const produitsTrouves = this.produitsFiltres.filter((produit) =>
      produit.name.toLowerCase().includes(this.recherche.toLowerCase())
    );
    if (produitsTrouves.length > 0) {
      this.produitTrouve = produitsTrouves[0];
    } else {
      alert('Aucun produit trouvé');
      this.recherche = '';
    }
    this.suggestions = [];
  }

  afficherProduitTrouve(): void {
    const produitsTrouves = this.produits
      .filter((produit) => produit.categorieID === this.categorieSelectionnee)
      .filter((produit) => produit.name.toLowerCase().includes(this.recherche.toLowerCase()));
    if (produitsTrouves.length > 0) {
      this.produitTrouve = produitsTrouves[0];
    } else {
      alert('Aucun produit trouvé');
      this.recherche = '';
    }

    this.suggestions = [];
  }

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
      this.navigSuggestion('up');
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.navigSuggestion('down');
    } else {
      this.updateSuggestions();
    }
  }

  updateSuggestions(): void {
    if (this.recherche.length >= 1) {
      if (this.categorieSelectionnee === null) {
        this.suggestions = this.produits.filter((produit) =>
          produit.name.toLowerCase().startsWith(this.recherche.toLowerCase())
        );
      } else {
        this.suggestions = this.produits
          .filter((produit) => produit.categorieID === this.categorieSelectionnee)
          .filter((produit) => produit.name.toLowerCase().startsWith(this.recherche.toLowerCase()));
      }
      if (this.suggestions.length === 1 && this.suggestions[0].name.toLowerCase() === this.recherche.toLowerCase()) {
        this.rechercherBouton();
      }
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: Produit): void {
    this.recherche = suggestion.name;
    this.suggestions = [];
    this.selectedSuggestionIndex = -1;
  }

  navigSuggestion(direction: 'up' | 'down'): void {
    if (this.suggestions.length === 0) {
      return;
    }

    if (direction === 'up') {
      if (this.selectedSuggestionIndex === -1) {
        this.selectedSuggestionIndex = this.suggestions.length - 1;
      } else {
        this.selectedSuggestionIndex = (this.selectedSuggestionIndex - 1 + this.suggestions.length) % this.suggestions.length;
      }
    } else {
      this.selectedSuggestionIndex = (this.selectedSuggestionIndex + 1) % this.suggestions.length;
    }

    this.recherche = this.suggestions[this.selectedSuggestionIndex].name;
  }

  //-------------toggle------------

  public afficherIcone: boolean = false;
  public afficherMenuIcone: boolean = false;

  public toggleReseau(): void {
    this.afficherIcone = !this.afficherIcone; //inverse la valeur
  }

  public toggleMenu(): void {
    this.afficherMenuIcone = !this.afficherMenuIcone;
  }

}
