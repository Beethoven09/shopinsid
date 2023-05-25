import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/models/produit.model';

@Component({
  selector: 'app-produit-compact',
  templateUrl: './produit-compact.component.html',
  styleUrls: ['./produit-compact.component.scss']
})
export class ProduitCompactComponent implements OnInit {
  @Input() produit!: Produit;

  constructor(private router: Router) {}

  ngOnInit() {}

  redirectToPage(pageName: string) {
    this.router.navigate([`${pageName}/${this.produit.id}`]);
  }
}