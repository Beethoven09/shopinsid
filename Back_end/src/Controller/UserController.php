<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use App\Entity\User;

class UserController extends AbstractController
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/register", name="register", methods={"POST"})
     */
    public function register(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        $username = $data['username'];
        $password = $data['password'];
        $birthdate = $data['birthdate'];
        $email = $data['email'];
        $tel = $data['tel'];

        if (empty($username) || empty($password)  || empty($birthdate) || empty($email)) {
            return $this->json(['message' => 'Informations manquantes'], 400);
        }

        $existingUser = $this->userRepository->findOneBy(['username' => $username]);

        if ($existingUser) {
            return $this->json(['message' => 'Nom d\'utilisateur déjà utilisé'], 400);
        }

        // Créer un nouvel utilisateur
        $user = new User();
        $user->setUsername($username);
        $user->setPassword($password);
        $user->setBirthdate(new \DateTime($birthdate));
        $user->setMail($email);
        $user->setTel($tel);

        $this->userRepository->save($user, true);

        return $this->json(['success' => true, 'message' => 'Inscription réussie'], 200);
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
