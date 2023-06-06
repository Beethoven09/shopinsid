<?php

namespace App\Controller;

use App\Entity\Users;
use App\Repository\UsersRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UsersController extends AbstractController
{
    private $usersRepository;

    public function __construct(UsersRepository $usersRepository)
    {
        $this->usersRepository = $usersRepository;
    }

    /**
     * @Route("/register", name="register", methods={"POST"})
     */
    public function register(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        $nom = $data['nom'];
        $prenom = $data['prenom'];
        $email = $data['email'];
        $motdepasse = $data['motdepasse'];
        $languepreferee = $data['languepreferee'];
        $adresse = $data['adresse'];
        $tel = $data['tel'];
        $datedenaissance = $data['datedenaissance'];

        if (empty($nom) || empty($email) || empty($motdepasse)) {
            return $this->json(['message' => 'Informations manquantes'], 400);
        }

        $existingUser = $this->usersRepository->findOneBy(['email' => $email]);

        if ($existingUser) {
            return $this->json(['message' => 'Email déjà utilisé'], 400);
        }

        // Créer un nouvel utilisateur
        $user = new Users();
        $user->setNom($nom);
        $user->setPrenom($prenom);
        $user->setEmail($email);
        $user->setMotdepasse($motdepasse);
        $user->setLanguepreferee($languepreferee);
        $user->setAdresse($adresse);
        $user->setTel($tel);
        $user->setDatedenaissance(new \DateTime($datedenaissance));

        $this->usersRepository->save($user, true);

        return $this->json(['success' => true, 'message' => 'Inscription réussie'], 200);
    }
}
