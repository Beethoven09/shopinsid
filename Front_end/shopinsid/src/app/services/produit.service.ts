import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';

@Injectable({
    providedIn: 'root'
})
export class ProduitService {
    private apiUrl = 'https://127.0.0.1:8002/products';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Produit[]> {
        return this.http.get<Produit[]>(this.apiUrl);
    }
      
}
