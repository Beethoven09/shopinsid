 import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import { Produit } from 'src/app/models/produit.model';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.scss']
})
export class ProduitDetailComponent implements OnInit {
  id!: number;
  produit!: any;
  produits: Produit[] = [];
  selectedQuantity: number = 1;

  constructor(private router: Router, private route: ActivatedRoute,private produitService: ProduitService,private panierService:PanierService) {}

  ngOnInit(){
    /* on récupère l'id du produit */
    this.id = +this.route.snapshot.params['iden'];
    
    this.produitService.getProducts().subscribe(
      (data: Produit[]) => {
        this.produits = data;
        this.produit = this.produits.find(item => item.id === this.id);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
    
  }

  redirectToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }


  ajouterAuPanier(produit: Produit, selectedQuantity: number) {
    this.panierService.ajouterAuPanier(produit, selectedQuantity);
  }
  
  supprimerDuPanier(produit: Produit) {
    this.panierService.supprimerDuPanier(produit);
  }

  produitDansPanier(produit: Produit): boolean {
    return this.panierService.produitDansPanier(produit);
  }
  
}