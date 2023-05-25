<?php
namespace App\Controller;

use App\Entity\Produit;
use App\Repository\ProduitRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class ProductController extends AbstractController
{
   /**
     * @Route("/products", name="get_all_products", methods={"GET"})
     */
    public function getAllProducts(ProduitRepository $produitRepository): JsonResponse
    {
        $products = $produitRepository->findAll();

        // Convertir les entités en tableau
        $data = [];
        foreach ($products as $product) {
            $data[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'price' => $product->getPrice(),
                'description' => $product->getDescription(),
                'imageUrl' => $product->getImageUrl()
            ];
        }
        return new JsonResponse($data);
    }



    /**
     * @Route("/products/{id}", methods="GET")
     */
    public function getProduct(Produit $produit): JsonResponse
    {
        return new JsonResponse($produit);
    }

    /**
     * @Route("/products", methods="POST")
     */
    public function createNewProduct(Request $request, ProduitRepository $produitRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $newProduct = new Produit();
        $newProduct->setName($data['name'] ?? null);
        $newProduct->setPrice($data['price'] ?? null);
        $newProduct->setDescription($data['description'] ?? null);
        $newProduct->setImageUrl($data['imageUrl'] ?? null);

        $produitRepository->save($newProduct, true);

        return new JsonResponse($newProduct, 201);
    }

    /**
     * @Route("/products/{id}", methods="DELETE")
     */
    public function deleteProduct(Produit $produit, ProduitRepository $produitRepository): JsonResponse
    {
        $produitRepository->remove($produit, true);

        return new JsonResponse(['Status' => 'Produit supprimé avec succès']);
    }

    /**
     * @Route("/products/{id}", methods="PUT")
     */
    public function alterProduct(Produit $produit, Request $request, ProduitRepository $produitRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $produit->setName($data['name'] ?? $produit->getName());
        $produit->setPrice($data['price'] ?? $produit->getPrice());
        $produitRepository->save($produit, true);

        return new JsonResponse(['status' => 'Produit modifié avec succès']);
    }
}

