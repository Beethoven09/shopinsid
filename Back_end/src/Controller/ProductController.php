<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ProductController extends AbstractController
{
    private $productsFile = __DIR__ . "/products.json";
    private function getProducts(): array
    {
        $fileContent = file_get_contents($this->productsFile);
        return json_decode($fileContent, true) ?: [];
    }

    private function saveProducts(array $products): void
    {
        $fileContent = json_encode($products);
        file_put_contents($this->productsFile, $fileContent);
    }

    /**
     * @Route("/products", methods="GET")
     */
    public function getAllProducts(): Response
    {
        $products = $this->getProducts();
        return new JsonResponse($products);
    }

    /** 
     * @Route ("/products/{id}", methods="GET") 
     */
    public function getProduct($id): Response
    {
        $products = $this->getProducts();
        $selectedProduct = null;
        foreach ($products as $product) {
            if ($product['id'] == $id) {
                $selectedProduct = $product;
                break;
            }
        }

        if ($selectedProduct == null) {
            return new JsonResponse(['error' => 'Produit non existant !'], 404);
        } else {
            return new JsonResponse($selectedProduct);
        }
    }

    /**
     * @Route("/products", methods="POST")
     */
    public function createNewProduct(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['id']) || !isset($data['name']) || !isset($data['price'])) {
            return new JsonResponse(['error' => 'Format incorrect']);
        } else {
            $newProduct = [
                'id' => $data['id'],
                'name' => $data['name'],
                'price' => $data['price']
            ];

            $products = $this->getProducts();
            $products[] = $newProduct;
            $this->saveProducts($products);

            return new JsonResponse($newProduct, 201);
        }
    }

    /**
     * @Route("/products/{id}", methods="DELETE")
     */
    public function deleteProduct($id): JsonResponse
    {
        $products = $this->getProducts();
        $selectedProductIndex = null;
        foreach ($products as $index => $product) {
            if ($product['id'] == $id) {
                $selectedProductIndex = $index;
                break;
            }
        }

        if ($selectedProductIndex === null) {
            return new JsonResponse(['error' => 'Produit non existant !'], 404);
        } else {
            unset($products[$selectedProductIndex]);
            $this->saveProducts(array_values($products));
            return new JsonResponse(['Status' => 'Produit supprimé avec succès']);
        }
    }

    /**
     * @Route("/products/{id}", methods="PUT")
     */
    public function alterProduct($id, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $products = $this->getProducts();
        $selectedProductIndex = null;
        foreach ($products as $index => &$product) {
            if ($product['id'] == $id) {
                $selectedProductIndex = $index;
                break;
            }
        }

        if ($selectedProductIndex === null) {
            return new JsonResponse(['error' => 'Produit non existant !'], 404);
        } else {
            if (isset($data['name'])) {
                $products[$selectedProductIndex]['name'] = $data['name'];
            }
            if (isset($data['price'])) {
                $products[$selectedProductIndex]['price'] = $data['price'];
            }

            $this->saveProducts($products);

            return new JsonResponse(['status' => 'Produit modifié avec succès']);
        }
    }
}
