import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';
import { map } from 'rxjs/operators'; //Ajouter avec //

@Injectable({
    providedIn: 'root'
})
export class ProduitService {
    private apiUrl = 'http://127.0.0.1:8000/products';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Produit[]> {
        return this.http.get<Produit[]>(this.apiUrl);
    }

    //
    rechercheProduit(produitUtilisateur : string, listeProduit : Produit[]) : Produit | null{
        let produitTrouver = listeProduit.find(produit => produit.name === produitUtilisateur);
        return produitTrouver || null;

    }

    getProductsFromDatabase(): Observable<Produit[]> {
        return this.http.get<Produit[]>(this.apiUrl).pipe(
          map((products: Produit[]) => {
            /*for (const product of products) {
              product.rechercheBarre = 0;
            }*/
            return products;
          })
        );
      }

      getProductsByCategory(categoryId: number): Observable<Produit[]> {
        const url = `${this.apiUrl}?categorieID=${categoryId}`;
        return this.http.get<Produit[]>(url);
      }
      
      
}
