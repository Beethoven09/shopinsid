<?php

namespace App\Controller;

use App\Entity\Panier;
use App\Entity\Produit;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class PanierController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route("/panier", name: "panier_index", methods: ["GET"])]
    public function index(Request $request): JsonResponse
    {
        // Récupérer les données JSON envoyées dans la requête
        $data = json_decode($request->getContent(), true);

        // Code pour récupérer le contenu du panier depuis la base de données en utilisant les données de la requête

        // Exemple de contenu de panier
        $contenuPanier = [
            'produit1' => 'nomProduit1',
            'produit2' => 'nomProduit2',
        ];

        // Retourner une réponse JSON avec le contenu du panier
        return new JsonResponse($contenuPanier);
    }

    #[Route("/panier/ajouter/{produitId}", name: "panier_ajouter", methods: ["POST"])]
    public function ajouterProduit(Request $request, int $produitId): JsonResponse
    {
        // Récupérer les données JSON envoyées dans la requête
        $data = json_decode($request->getContent(), true);

        // Récupérer le produit à partir de l'ID
        $produit = $this->entityManager->getRepository(Produit::class)->find($produitId);

        // Vérifier si le produit existe
        if (!$produit) {
            return new JsonResponse(['message' => 'Produit non trouvé'], 404);
        }

        // Ajouter le produit au panier
        $panier = new Panier();
        $panier->setProduit($produit);
        $panier->setQuantite(1);

        // Enregistrer le panier dans la base de données
        $this->entityManager->persist($panier);
        $this->entityManager->flush();

        // Retourner une réponse JSON avec le message d'ajout
        return new JsonResponse(['message' => 'Produit ajouté au panier']);
    }

    #[Route("/panier/supprimer/{panierId}", name: "panier_supprimer", methods: ["DELETE"])]
    public function supprimerProduit(Request $request, int $panierId): JsonResponse
    {
        // Récupérer les données JSON envoyées dans la requête
        $data = json_decode($request->getContent(), true);

        // Récupérer le panier à partir de l'ID
        $panier = $this->entityManager->getRepository(Panier::class)->find($panierId);

        // Vérifier si le panier existe
        if (!$panier) {
            return new JsonResponse(['message' => 'Panier non trouvé'], 404);
        }

        // Supprimer le panier de la base de données
        $this->entityManager->remove($panier);
        $this->entityManager->flush();

        // Retourner une réponse JSON avec le message de suppression
        return new JsonResponse(['message' => 'Produit supprimé du panier']);
    }
}
