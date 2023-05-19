import { Component, OnInit } from '@angular/core';

/* ID du composant */
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})

/*Classe du composant */
export class ImageComponent implements OnInit{

  /*imageUrl est une variable qui prend un valeur de type string qui représente la référence de l'image */
  imageUrl !: string;

  ngOnInit(){
    /*here paste the link of the image*/
    this.imageUrl = "../../../../assets/smiley.jpg"
    /* change previous line to get link dynamically from a data base for example */
  }
}
