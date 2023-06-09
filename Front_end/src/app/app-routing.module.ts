import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*Importer le chemin vers le component */
import { AllProduitComponent } from "./components/all-produit/all-produit.component";
import { ProduitDetailComponent} from "./components/produit-detail/produit-detail.component";
import { InscriptionComponent } from "./components/inscription/inscription.component";
import { ConnexionComponent } from "./components/connexion/connexion.component";
import { AccueilComponent } from './components/accueil/accueil.component';
import { PanierComponent } from './components/panier/panier.component';

const routes: Routes = [
  /* Lien vers un autre component destination
  /* path = nom de l'URL qui sera affiché dans la barre de recherche | Component = component source*/

  /* AU CHARGEMENT DU SITE RENVOI DIRECTEMENT A LA PAGE D ACCUEIL */
  {path: '', redirectTo: '/accueil', pathMatch: 'full' },
  /* PAGE D'ACCUEIL */
  {path: 'accueil', component: AccueilComponent},
  /* PAGE DES PRODUITS */
  {path: 'all-produit', component: AllProduitComponent},
  /*PAGE DES PRODUITS PAR CATEGORIE*/
  {path: 'all-produit/:cate', component: AllProduitComponent},
  /* PAGE D'UN PRODUIT EN PARTICULIER */
  {path: 'produit-detail/:iden', component: ProduitDetailComponent},
  /* PAGE POUR UNE INSCRIPTION AU SITE */
  {path: 'inscription', component: InscriptionComponent},
  /* PAGE POUR UNE CONNEXION AU SITE */
  {path: 'connexion', component: ConnexionComponent},
  /* PAGE POUR UNE ACCEDER AU PANIER */
  {path: 'panier', component: PanierComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }