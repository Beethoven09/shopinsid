import { Component, Input, OnInit} from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-produit-compact',
  templateUrl: './produit-compact.component.html',
  styleUrls: ['./produit-compact.component.scss']
})
export class ProduitCompactComponent implements OnInit{
  @Input() nom!: string;
  @Input() imageUrl!: string;
  @Input() id!: number;

  constructor(private router: Router)
    { }

  /*Fonction qui renvoie vers une autre page */
  redirectToPage(pageName : string) {
    /*Ce qu'il faut écrire dans pageName se trouve dans les paths de app-routing.module*/
    this.router.navigate([`${pageName}/${this.id}`]);
  }
  ngOnInit(){}

}
