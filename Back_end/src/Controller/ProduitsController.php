<?php

namespace App\Controller;

use App\Entity\Produits;
use App\Repository\ProduitsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ProduitsController extends AbstractController
{
    /**
     * @Route("/products", name="get_all_products", methods={"GET"})
     */
    public function getAllProducts(ProduitsRepository $produitsRepository): JsonResponse
    {
        $products = $produitsRepository->findAll();

        // Convertir les entités en tableau
        $data = [];
        foreach ($products as $product) {
            $data[] = [
                'id' => $product->getId(),
                'name' => $product->getNomduproduit(),
                'price' => $product->getPrix(),
                'description' => $product->getDescription(),
                'imageUrl' => $product->getImageUrl(),
                'categorieID' => $product->getCategorieid(),
            ];
        }
        return new JsonResponse($data);
    }

    /**
     * @Route("/products/{id}", methods="GET")
     */
    public function getProduct(Produits $produit): JsonResponse
    {
        $data = [
            'id' => $produit->getId(),
            'name' => $produit->getNomduproduit(),
            'price' => $produit->getPrix(),
            'description' => $produit->getDescription(),
            'imageUrl' => $produit->getImageUrl(),
            'categorieID' => $produit->getCategorieid(),
        ];

        return new JsonResponse($data);
    }

    /**
     * @Route("/products", methods="POST")
     */
    public function createNewProduct(Request $request, ProduitsRepository $produitsRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $newProduct = new Produits();
        $newProduct->setNomduproduit($data['name'] ?? null);
        $newProduct->setPrix($data['price'] ?? null);
        $newProduct->setDescription($data['description'] ?? null);
        $newProduct->setImageUrl($data['imageUrl'] ?? null);
        $newProduct->setCategorieid($data['categorieID'] ?? null);
    

        $produitsRepository->save($newProduct, true);

        return new JsonResponse($newProduct, 201);
    }

    /**
     * @Route("/products/{id}", methods="DELETE")
     */
    public function deleteProduct(Produits $produit, ProduitsRepository $produitsRepository): JsonResponse
    {
        $produitsRepository->remove($produit, true);

        return new JsonResponse(['Status' => 'Produit supprimé avec succès']);
    }

    /**
     * @Route("/products/{id}", methods="PUT")
     */
    public function alterProduct(Produits $produit, Request $request, ProduitsRepository $produitsRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $produit->setNomduproduit($data['name'] ?? $produit->getNomduproduit());
        $produit->setPrix($data['price'] ?? $produit->getPrix());
        $produit->setPrix($data['categorieID'] ?? $produit->getCategorieid());
        $produit->setPrix($data['description'] ?? $produit->getDescription());


        $produitsRepository->save($produit, true);

        return new JsonResponse(['status' => 'Produit modifié avec succès']);
    }
}
