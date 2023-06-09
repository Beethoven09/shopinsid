import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SHA256 } from 'crypto-js';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUserId: number | null = null; 

  private connexionUrl = 'http://127.0.0.1:8000/login';
  private InscriptionUrl = 'http://127.0.0.1:8000/register';
  private logoutUrl = 'https://127.0.0.1:8000/logout';

  constructor(private http: HttpClient) { }
   //fonction pour inscription
   inscrire(name: string, password: string, birthdate: Date, email: string, tel: Number, adresse: string, languePreferee: string): Observable<any> {
    const hashedPassword = SHA256(password).toString(); // Chiffrement du mot de passe

    return this.http.post<any>(this.InscriptionUrl, { name, password: hashedPassword, birthdate, email, tel ,adresse, languePreferee});
  }

  //fonction pour s'authentifier
  login(email: string, password: string): Observable<any> {
  const hashedPassword = SHA256(password).toString(); // Chiffrement du mot de passe

  return this.http.post<any>(this.connexionUrl, { email, password: hashedPassword }).pipe(
    tap((response) => {
      // Enregistrer l'ID de l'utilisateur connecté après une connexion réussie
      this.loggedInUserId = response.userId;
    })
  );
  }

  logout(): void {
    // Envoyer une demande de déconnexion au backend avec l'ID de l'utilisateur connecté
    if (this.loggedInUserId) {
      this.http.post<any>(this.logoutUrl, { userId: this.loggedInUserId }).subscribe(
        () => {
          alert("vous venez de vous deconnecter!");
        },
        (error) => {
          console.error('Erreur lors de la déconnexion:', error);
        }
      );
    }

    // Réinitialiser l'ID de l'utilisateur connecté après la déconnexion
    this.loggedInUserId = null;
  }
}