import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';
import { ProduitPanier } from '../models/produitPanier.model';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private apiUrl = 'https://127.0.0.1:8008'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  ajouterAuPanier(produit: Produit, quantite: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/panier/add`, {'id': produit.id, quantite});
  }

  supprimerDuPanier(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/panier/delete/${id}`);
  }
    
  getProduitsPanier(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/panier`);
  }
  

  
  
}
