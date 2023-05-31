<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;

class UserController extends AbstractController
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/login", name="login", methods={"POST"})
     */
    public function login(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        
        $username = $data['username'];
        $password = $data['password'];

        if (empty($username) || empty($password)) {
            return $this->json(['message' => 'Informations manquantes'], 400);
        }

        $user = $this->userRepository->findOneBy(['username' => $username]);

        if (!$user || $password !== $user->getPassword()) {
            return $this->json(['success' => false, 'message' => 'Informations invalides'], 401);
        }

        return $this->json(['success' => true, 'message' => 'Login avec succès'], 200);
    }


}
