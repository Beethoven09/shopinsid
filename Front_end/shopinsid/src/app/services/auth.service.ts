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
  login(username: string, password: string): Observable<any> {
    const hashedPassword = SHA256(password).toString(); // Chiffrement du mot de passe

    return this.http.post<any>(this.connexionUrl, { username, password: hashedPassword });
  }

  //fonction pour inscription
  inscrire(username: string, password: string, birthdate: string, email: string, tel: string): Observable<any> {
    const hashedPassword = SHA256(password).toString(); // Chiffrement du mot de passe

    return this.http.post<any>(this.InscriptionUrl, { username, password: hashedPassword, birthdate, email, tel });
  }
}
