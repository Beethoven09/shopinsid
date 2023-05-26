import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit{
  /* Informations à l'inscription */
  registerData = {
    username: '',
    password: '',
    confirm: '',
    birthdate: '',
    mail: '',
    tel: ''
  };

  constructor(private router: Router, private authService: AuthService){}

  /*Fonction qui renvoie vers une autre page */
  redirectToPage(pageName : string) {
    /*Ce qu'il faut écrire dans pageName se trouve dans les paths de app-routing.module*/
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(){}

  register() {
    /* verif est une variable qui vérifie si les données sont valides avant d'envoyer la requête, par défaut elle est init à true */
    let verif = true;
    /* On regarde si les champs obligatoires ne sont pas vides */
    if (this.registerData.username === '' || this.registerData.password === '' || 
        this.registerData.confirm ==='' || this.registerData.birthdate ==='' || this.registerData.mail ===''){
      verif = false;
      console.log("vide");
    }
    /* On regarde si le mot de passe à au moins 8 caractères */
    else if (this.registerData.password.length < 7){
      verif = false;
      console.log("mot de passe trop court");
    }
    /* On regarde si la confirmation de mot de passe est correcte*/
    else if(this.registerData.password !== this.registerData.confirm){
      verif = false;
      console.log("mdp différents");
    }
    /* On vérifie si la date est correcte */
    else if (isNaN(new Date(this.registerData.birthdate).getTime())){
      verif = false;
      console.log("date invalide");
    }
    /* On vérifie si l'email est correct */
    else if((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(this.registerData.mail)==false){
      verif = false;
      console.log("email invalide");
    }


    if (verif === true){
        console.log("tests passed");    
        this.authService.register(this.registerData.username, this.registerData.password, this.registerData.birthdate,
          this.registerData.mail, this.registerData.tel).subscribe(
          (response) => {
            if (response.success) {
              // Rediriger l'utilisateur vers la page d'accueil ou une autre page appropriée
              console.log("Inscription réussie")
              this.router.navigate(['accueil']);
          }
        },
        (error) => {
          // Gérer les erreurs de la requête HTTP
          console.log('Erreur lors de la requête de login', error);
        }
        );
    }
  }
}