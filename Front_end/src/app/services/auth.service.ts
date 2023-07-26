import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InscriptionData } from 'src/app/models/inscription.model';
import { CookieService } from 'ngx-cookie-service'; // Importer CookieService

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private connexionUrl = 'http://127.0.0.1:8000/login';
  private inscriptionUrl = 'http://127.0.0.1:8000/register';
  private logoutUrl = 'http://127.0.0.1:8000/logout';

  private readonly TOKEN_KEY = 'userToken'; // Clé pour stocker le token

  // Injecter CookieService dans le constructeur
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  // Méthode d'inscription avec validation de la longueur minimale du mot de passe
  inscrire(registerData: InscriptionData): Observable<any> {
    // Validation de la longueur minimale du mot de passe
    if (!this.validatePasswordLength(registerData.password)) {
      return throwError("Le mot de passe doit avoir au moins 8 caractères.");
    }

    // Envoi de la demande d'inscription
    return this.http.post<any>(this.inscriptionUrl, registerData);
  }

  // Méthode de connexion
  login(email: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.post<any>(this.connexionUrl, { email, password }).pipe(
      tap((response) => {
        if (response.token) {
          // Stocker le token dans un cookie si "Se souvenir de moi" est coché, sinon le stocker dans le sessionStorage
          if (rememberMe) {
            this.cookieService.set(this.TOKEN_KEY, response.token, 30); // Le token expirera après 30 jours
          } else {
            sessionStorage.setItem(this.TOKEN_KEY, response.token);
          }

          // Ajoutez ces lignes pour afficher le token et les rôles dans la console
          console.log("Token JWT:", response.token);
          const decodedToken = this.decodeToken(response.token);
          console.log("Rôles de l'utilisateur dans le token:", decodedToken.role);
          // Ajoutez cette ligne pour afficher les rôles de l'utilisateur dans la console
          console.log("Rôles de l'utilisateur dans le token :", this.decodeToken(response.token).role);
        }
      })
    );
  }

  // Méthode de déconnexion
  logout(): Observable<any> {
    const token = this.getToken();
    const decodedToken = this.decodeToken(token);
    if (decodedToken) {
      const userId = decodedToken.userId;
      const headers = { 'Authorization': 'Bearer ' + token };
      return this.http.post<any>(this.logoutUrl, { userId }, { headers }).pipe(
        tap(() => {
          // Supprimer le token du cookie et du sessionStorage
          this.cookieService.delete(this.TOKEN_KEY);
          sessionStorage.removeItem(this.TOKEN_KEY);
          alert("Vous venez de vous déconnecter !");
        })
      );
    } else {
      // Gérer le cas où le token n'est pas décodable
      // Vous pouvez par exemple retourner un Observable qui émet une erreur
      return throwError('Token invalide ou manquant');
    }
  }

  // Méthode pour obtenir le token
  getToken(): string {
    // Essayer de récupérer le token du cookie, sinon essayer de le récupérer du sessionStorage
    const token = this.cookieService.get(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
    if (token) {
      return token;
    } else {
      return "";
    }
  }

  // Méthode pour vérifier si l'utilisateur a le rôle "admin"
  hasRole(role: string): boolean {
    const decodedToken = this.decodeToken(this.getToken());

    if (decodedToken && decodedToken.role) {
      const roles: string[] = decodedToken.role;
      return roles.includes(role); // Chercher le rôle "admin" dans les rôles de l'utilisateur
    }

    return false;
  }

  // Méthode privée pour décoder le token JWT
  private decodeToken(token: string | null): any {
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log("Payload du token décodé:", decodedToken);
        return decodedToken;
      } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
        return null;
      }
    } else {
      return null;
    }
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    const isLoggedIn = this.getToken() !== "" && this.getToken() !== null;
    console.log("isLoggedIn():", isLoggedIn); // Ajoutez cette ligne pour afficher le résultat
    return isLoggedIn;
  }

  // Méthode privée pour valider la longueur minimale du mot de passe
  private validatePasswordLength(password: string): boolean {
    return password.length >= 8;
  }
}
