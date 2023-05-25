import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProduitService } from 'src/app/services/produit.service';
import { Produit } from 'src/app/models/produit.model';

@Component({
  selector: 'app-all-produit',
  templateUrl: './all-produit.component.html',
  styleUrls: ['./all-produit.component.scss']
})
export class AllProduitComponent implements OnInit {
  produits: Produit[] = [];

  constructor(private router: Router, private produitService: ProduitService) { }

  ngOnInit() {
    this.produitService.getProducts().subscribe(
      (data: Produit[]) => {
        this.produits = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}