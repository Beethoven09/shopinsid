import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SHA256 } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private connexionUrl = 'https://127.0.0.1:8000/login';
  private InscriptionUrl = 'https://127.0.0.1:8000/register';


  constructor(private http: HttpClient) { }

  //fonction pour s'authentifier
  login(email: string, password: string): Observable<any> {
    const hashedPassword = SHA256(password).toString(); // Chiffrement du mot de passe

    return this.http.post<any>(this.connexionUrl, { email, password: hashedPassword });
  }

  //fonction pour inscription
  inscrire(name: string, password: string, birthdate: Date, email: string, tel: Number, adresse: string, languePreferee: string): Observable<any> {
    const hashedPassword = SHA256(password).toString(); // Chiffrement du mot de passe

    return this.http.post<any>(this.InscriptionUrl, { name, password: hashedPassword, birthdate, email, tel ,adresse, languePreferee});
  }
}
