import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* IMPORT DES COMPONENTS */
import { ProduitDetailComponent } from './components/produit-detail/produit-detail.component';
import { ProduitCompactComponent } from './components/produit-compact/produit-compact.component';
import { AllProduitComponent } from './components/all-produit/all-produit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProduitDetailComponent,
    ProduitCompactComponent,
    AllProduitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
