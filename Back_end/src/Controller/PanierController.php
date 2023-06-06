<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Produits;
use App\Entity\Panier;
use Doctrine\ORM\EntityManagerInterface;

class PanierController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/panier/ajouter", name="ajouter_produit_panier", methods={"POST"})
     */
    public function ajouterProduit(Request $request): JsonResponse
    {
        $produitId = $request->request->get('produit_id');
        $quantite = $request->request->get('quantite');

        // Convertir les entités en tableau
        $data = [];
        foreach ($items as $product) {
            $ProductInfo = $produitsRepository->findOneBy(['id' => $product->getProduitid()]);
            $data[] = [
                'id' => $ProductInfo->getId(),
                'name' => $ProductInfo->getNomduproduit(),
                'price' => $ProductInfo->getPrix(),
                'description' => $ProductInfo->getDescription(),
                'imageUrl' => $ProductInfo->getImageUrl(),
                'categorie' => $ProductInfo->getCategorieid(),
                'quantite' => $product->getQuantite(),
            ];
        }

        // Pour créer un nouvel objet Panier
        $panierItem = new Panier();
        $panierItem->setProduit($produit);
        $panierItem->setQuantite($quantite);

        // Pour enregistrer le panier dans la base de données
        $this->entityManager->persist($panierItem);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Produit ajouté au panier'], 200);
    }


    /**
     * @Route("/panier/add/", name="panier_add", methods={"POST"})
     */
    public function ajouterAuPanier(Request $request): Response
    {
        // Récupérer les données envoyées dans la requête
        $data = json_decode($request->getContent(), true);

        $produitId = $data['id'];
        $quantite = $data['quantite'];

        // Récupérer le produit depuis la base de données
        $produit = $this->entityManager->getRepository(Produits::class)->find($produitId);

        // Rechercher si le produit existe déjà dans le panier
        $panier = $this->entityManager->getRepository(Panier::class)->findOneBy(['produitid' => $produit->getId()]);

        if ($panier) {
            // Si le produit existe déjà dans le panier, ajouter la quantité spécifiée
            $panier->setQuantite($panier->getQuantite() + $quantite);
        } else {
            // Si le produit n'existe pas dans le panier, créer un nouvel enregistrement
            $panier = new Panier();
            $panier->setProduitid($produit);
            $panier->setQuantite($quantite);
            $panier->setPrixunitaire($produit->getPrix());

            // Sauvegarder le panier dans la base de données
            $this->entityManager->persist($panier);
        }

        $this->entityManager->flush();

        return $this->json(['success' => true, 'message' => 'produit ajouté au panier!'], 200);
    }

    /**
     * @Route("/panier/verifier", name="verifier_panier", methods={"GET"})
     */
    public function verifierPanier(): JsonResponse
    {
        $panierItems = $this->entityManager->getRepository(Panier::class)->findAll();

        $produits = [];
        foreach ($panierItems as $panierItem) {
            $produits[] = [
                'id' => $panierItem->getId(),
                'produit' => [
                    'id' => $panierItem->getProduit()->getId(),
                    'nomDuProduit' => $panierItem->getProduit()->getNomDuProduit(),
                    'description' => $panierItem->getProduit()->getDescription(),
                    'prix' => $panierItem->getProduit()->getPrix(),
                ],
                'quantite' => $panierItem->getQuantite(),
            ];
        }

        return new JsonResponse(['produits' => $produits], 200);
    }
}
