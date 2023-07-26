import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            // Vérifier si l'utilisateur a le rôle "admin"
            if (this.authService.hasRole('admin')) {
                return true; // Laisser passer les utilisateurs avec le rôle "admin" vers la page vendeur
            } else {
                // Pour les autres pages qui nécessitent simplement une connexion,
                // nous n'effectuons pas de vérification du rôle.
                return true;
            }
        } else {
            this.router.navigate(['connexion']);
            return false;
        }
    }
}
