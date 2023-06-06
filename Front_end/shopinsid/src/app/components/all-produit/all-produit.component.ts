import { Component, OnInit } from '@angular/core';
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

}