import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*Importer le chemin vers le component */
import { AllProduitComponent } from "./components/all-produit/all-produit.component";
import { ProduitDetailComponent} from "./components/produit-detail/produit-detail.component";
import { InscriptionComponent } from "./components/inscription/inscription.component";
import { ConnexionComponent } from "./components/connexion/connexion.component";
import { AccueilComponent } from './components/accueil/accueil.component';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

