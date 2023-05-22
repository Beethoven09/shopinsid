import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*Importer le chemin vers le component */
import { AllProduitComponent } from "./components/all-produit/all-produit.component";
import { ProduitCompactComponent} from "./components/produit-compact/produit-compact.component";
import { ProduitDetailComponent} from "./components/produit-detail/produit-detail.component";

const routes: Routes = [
  /* Lien vers un autre component destination */
  {path: 'components/all-produit', component: AllProduitComponent},
  {path: 'components/produit-compact', component: ProduitCompactComponent},
  {path: 'components/produit-detail/:iden', component: ProduitDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

