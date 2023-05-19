<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ProductController extends AbstractController
{
    private $products = [
        ['id'=>1,'name'=>'Produit 1','price' => 8.99],
        ['id'=>2,'name'=>'Produit 2','price' => 5.99]
    ];

    /**
     * @Route("/products", methods="GET")
     */
    public function getAllProducts(): Response
    {
       //Get all products
       return new JsonResponse($this->products);
    }

    /** 
     * @Route ("/Products/{id}", methods="GET") 
     */
    public function getProduct($id) : Response 
    {
        $SelectedProduct = null;
        foreach ($this->products as $product) {
            if ($product['id'] == $id) {
                $SelectedProduct = $product;
                break;
            } 
        }

        if ($SelectedProduct == null) {
            return new JsonResponse(['error'=> 'Produit non existant !'],404);
        }else {
            return new JsonResponse($SelectedProduct);
        }
    }

    /**
     * @Route("/products",methods="POST") : Response 
     */
    public function createNewProduct(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(),true);

        if(!isset($data['id']) || !isset($data['name']) || !isset($data['price'])){
            return new JsonResponse(['error'=> 'Format incorrect']);
        }else {
            $newProduct = [
                'id' => $data['id'],
                'name' => $data['name'],
                'price' => $data['price']
            ];
    
            // Add the new product to the products array
            $this->products[] = $newProduct;
    
            return new JsonResponse($newProduct, 201);
        }
    }
    /**
     * @Route("/products",methods="DELETE") : Response 
     */
    public function deleteProduct($id): JsonResponse
    {
        $SelectedProduct = null;
        foreach ($this->products as $product) {
            if ($product['id'] == $id) {
                $SelectedProduct = $product;
                break;
            } 
        }

        if ($SelectedProduct == null) {
            return new JsonResponse(['error'=> 'Produit non existant !'],404);
        }else {
            unset($this->products[$id]);
            return new JsonResponse(['Status'=>'Produit supprimé avec succès']);
        }
    }
    
    /**
     * @Route("/products/{id}", methods="PUT")
     */
    public function alterProduct($id, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $selectedProduct = null;
        foreach ($this->products as &$product) {
            if ($product['id'] == $id) {
                $selectedProduct = &$product;
                break;
            }
        }

        if ($selectedProduct == null) {
            return new JsonResponse(['error' => 'Produit non existant !'], 404);
        } else {
            if (isset($data['name'])) {
                $selectedProduct['name'] = $data['name'];
            }
            if (isset($data['price'])) {
                $selectedProduct['price'] = $data['price'];
            }

            return new JsonResponse(['status' => 'Produit modifié avec succès']);
        }
    }

}
