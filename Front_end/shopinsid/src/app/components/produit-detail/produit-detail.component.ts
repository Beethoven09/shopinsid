import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.scss']
})
export class ProduitDetailComponent implements OnInit{

  produits!: any[];
  produit!: any;
  id !:number;
  
  constructor(private router: Router,private http: HttpClient, private route: ActivatedRoute)
  { }
  

ngOnInit(){
  /* on récupère l'id du produit */
  this.id = +this.route.snapshot.params['iden'];
  /* on récupère la liste du produit et on filtre pour avoir uniquement le produit intéressant */
  this.http.get<any[]>('../../../assets/list-products.json').subscribe(
    (data: any[]) => {
      this.produits = data;
      this.produit = this.produits.find(item => item.id === this.id);
    },
    (error) => {
      console.error('Error fetching JSON file:', error);
    }
  )
}

  /*Fonction qui renvoie vers une autre page */
  redirectToPage(pageName : string) {
    /*Préciser le chemin vers le component destination dans le constructeur*/
    this.router.navigate([`${pageName}`]);
  }
}
