import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
}) 

export class ConnexionComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  redirectToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.success) {  
          // Rediriger l'utilisateur vers la page d'accueil ou une autre page appropriée
          console.log("Connexion réussie")
          this.router.navigate(['accueil']);
        } else {
          // Afficher un message d'erreur pour indiquer que les informations d'identification sont incorrectes
          console.log('Identifiants incorrects');
        }
      },
      (error) => {
        // Gérer les erreurs de la requête HTTP
        console.log('Erreur lors de la requête de login', error);
      }
    );
  }
}

