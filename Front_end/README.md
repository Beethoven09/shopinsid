# **FRONT_END**

## **DOCUMENTATION**

> **``@Component``** décorateur définissant les caractéristiques du composant.

> **``selector``** nom de la balise HTML qui représente le composant.

> **``templateUrl``** fichier HTML associé au composant.

> **``styleUrls``** fichier SCSS associé au composant.

> **``ngOnInit()``** fonction angular qui est appelée à la construction d'une instance de classe.

> **``@Input()``** token angular qui permet d'utiliser des variables d'un component parent à ses components enfants.

> **``*ngFor``** fonction angular (utilisée dans le html) qui parcourt les éléments d'une liste.

> **``router.navigate()``** fonction qui redirige vers une autre page passée en argument. Cet argument doit être un path dans *app-routing.module*.

<br />

## **FONCTIONNALITÉS**

> **Composant : All-produit** <br/>
Composant contenant la liste des produits et appelle ``app-produit-compact`` pour afficher chaque produit et mode compact.

> **Composant : Produit-compact** <br />
Composant affichant les résumés du produit et ajoute un bouton cliquable "Détails" qui redirige vers une page ``produit-detail``.

> **Composant : Produit-detail** <br />
Composant affichant pour l'instant qu'un bouton cliquable "Retour" pour revenir à la page des produits.

<br /><br />

## **PROBLEMES DETECTES**

    . Les mêmes produits apparaissent 2 fois lorsque l'on revient sur la page des produits.

## **PROBLEMES RESOLUS**

    .


<br />

## **SE DIRIGER DANS LE PROJET**


    . Shopinsid                 #racine du projet
        .src                    #dossier contenant les sources du site.
            .app                #dossier contenant tous les blocs de codes (TS et HTML)
                .components     #dossier contenant tous les composants

                    *À chaque composant est associé trois fichiers*
                    . HTML      #pour l'aperçu
                    . TS        #pour le code
                    . SCSS      #pour le style

            .assets             #dossier contenant les images

            .index.html         #fichier qui gère l'aperçu général du site.

