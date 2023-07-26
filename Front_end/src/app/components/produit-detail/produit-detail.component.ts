import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import { Produit } from 'src/app/models/produit.model';
import { PanierService } from 'src/app/services/panier.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.scss'],
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(-20%)' })),
      transition(':entier', [
        style({ transform: 'translate(0)' }),
        animate(500)
      ])
    ])
  ]
})

export class ProduitDetailComponent implements OnInit {

  id!: number;
  produit: Produit | undefined;
  produits: Produit[] = [];
  selectedQuantity: number = 1;
  imgState: 'left' | 'right' = 'right';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private panierService: PanierService
  ) { }

  ngOnInit() {
    // on récupère l'id du produit
    this.id = +this.route.snapshot.params['iden'];

    this.produitService.getProducts().subscribe(
      (data: Produit[]) => {
        this.produits = data;
        this.produit = this.produits.find((item) => item.id === this.id);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  redirectToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  ajouterAuPanier() {
    if (this.produit) {
      this.panierService.ajouterAuPanier(this.produit, this.selectedQuantity).subscribe(
        () => {
          alert('Produit ajouté au panier avec succès');
        },
        (error) => {
          console.error('Erreur lors de l\'ajout au panier :', error);
        }
      );
    }
  }

  changePrixQuantite(): number {
    if (this.produit) {
      let prix = this.produit.price * this.selectedQuantity;
      return parseFloat(prix.toFixed(2));
    }
    return 0;
  }

  getImagePath(imageUrl: string): string {
    return '../assets/img/' + imageUrl;
  }

  //------------------toggle---------

  public btopen: boolean = false;
  public galerie: boolean = false;
  public video: boolean = false;
  public socialNetwork: boolean = false;
  public sendComment: boolean = false;

  public close(): void {
    this.btopen = false;
    this.galerie = false;
    this.video = false;
    this.sendComment = false;
    this.socialNetwork = false;
  }

  public toggleGalerie(): void {
    this.btopen = true;
    this.galerie = !this.galerie;
  }

  public toggleVideo(): void {
    this.btopen = true;
    this.video = !this.video;
  }

  public toggleSocial(): void {
    this.btopen = true;
    this.socialNetwork = !this.socialNetwork;
  }

  public toggleComment(): void {
    this.btopen = true;
    this.sendComment = !this.sendComment;
  }

  //------------------popup----------------

  leftSlide() {

    this.imgState = 'left';

  }

  rightSlide() {
    this.imgState = 'right';

  }

}
