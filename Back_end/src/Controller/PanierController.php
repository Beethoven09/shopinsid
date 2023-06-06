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

        // Pour récupérer le produit depuis la base de données
        $produit = $this->entityManager->getRepository(Produits::class)->find($produitId);
        // Si le produit n'existe pas message d'erreur 
        if (!$produit) {
            return new JsonResponse(['message' => 'Produit non trouvé'], 404);
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
     * @Route("/panier/supprimer", name="supprimer_produit_panier", methods={"POST"})
     */
    public function supprimerProduit(Request $request): JsonResponse
    {
        $panierId = $request->request->get('panier_id');

        // Pour récupérer le panier depuis la base de données
        $panierItem = $this->entityManager->getRepository(Panier::class)->find($panierId);

        if (!$panierItem) {
            return new JsonResponse(['message' => 'Produit du panier non trouvé'], 404);
        }

        // Pour supprimer le panier de la base de données
        $this->entityManager->remove($panierItem);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Produit supprimé du panier'], 200);
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
