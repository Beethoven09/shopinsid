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

> **``*ngIf``** fonction angular (utilisée dans le html) qui vérifie si la condition est vraie.

> **``<balise class="nom_de_la_classe">``** associe un style défini dans la classe passée en argument écrite dans le fichier scss.

> **``http.get(json.file).subscribe()``** fonction qui permet de récupérer les données depuis un fichier json passé en argument. Nécessité d'importer **``httpClient``** !

> **``<form>``** est une balise HTML qui permet de créer des formulaires interactifs.

> **``<input>``** est une balise HTML qui créer un champs de saisie, on peut préciser le type de champs (text, password, email, date, number, file, submit, reset, ...).

> **``<label>``** est une balise HTML qui permet d'étiquetter un élément d'un formulaire.

<br />

## **FONCTIONNALITÉS**

> **Composant : All-produit** <br/>
Composant contenant la liste des produits et appelle ``app-produit-compact`` pour afficher chaque produit et mode compact. Affiche uniquement en colonne et pas en ligne.

> **Composant : Produit-compact** <br />
Composant affichant les résumés du produit et ajoute un bouton cliquable "Détails" qui redirige vers une page ``produit-detail`` avec un identifiant.

> **Composant : Produit-detail** <br />
Composant affichant, selon l'identifiant reçu, le bon produit en détails (nom, image, prix, description). Possibilité de retour en arrière avec le bouton cliquable "Retour".

> **Assets : list-product.json** <br />
Fichier json servant de Base de données pour la liste des produits.

> **Composant : Accueil** <br />
Composant affichant la page d'accueil lorsque l'on arrive sur le site. Possibilité de cliquer sur les boutons ``s'inscrire`` et de ``se connecter`` qui redirigent vers la page d'inscription ou de connexion.

> **Composant : Inscription** <br />
Composant servant à recruter des informations de l'utilisateur pour y inscrire un nouveau compte sur le site. Les champs de saisies fonctionnent mais la requête n'est pour l'instant **pas réceptionnée.**

> **Composant : Connexion** <br />
Composant servant à se connecter à un compte déjà existant. **La requête n'est cependant pas vérifiée dans la base de données. De plus, les identifiants et le mot de passe sont clairement visibles dans l'URL**.

<br /><br />

## **PROBLEMES DETECTES**

    . Les données lors d'une connexion ne sont pas chiffrées dans l'URL de la page.

## **PROBLEMES RESOLUS**

    . Les mêmes produits apparaissent 2 fois lorsque l'on revient sur la page des produits. (Suppression de la balise <app-all-produit> dans le fichier "app.component.html").


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

            .assets                     #dossier contenant les images
                . list-product.json     #fichier json servant de Base de données

            .index.html         #fichier qui gère l'aperçu général du site.

