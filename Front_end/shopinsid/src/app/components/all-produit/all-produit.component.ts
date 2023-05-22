import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-produit',
  templateUrl: './all-produit.component.html',
  styleUrls: ['./all-produit.component.scss']
})

export class AllProduitComponent implements OnInit{
  produits!: any[];

  constructor(private router: Router,private http: HttpClient)
    { }
  
  ngOnInit(){
    this.http.get<any[]>('../../../assets/list-products.json').subscribe(
      (data: any[]) => {
        this.produits = data;
      },
      (error) => {
        console.error('Error fetching JSON file:', error);
      }
    )
  }
}