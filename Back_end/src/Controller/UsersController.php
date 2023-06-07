<?php
namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UsersRepository;
use App\Entity\Users;
class UsersController extends AbstractController
{
    private $userRepository;
    public function __construct(UsersRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    /**
     * @Route("/register", name="register", methods={"POST"})
     */
    public function register(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $name = $data['name'];
        $password = $data['password'];
        $birthdate = $data['birthdate'];
        $email = $data['email'];
        $tel = $data['tel'];
        $adresse = $data['adresse'];
        $languePreferee = $data['languePreferee'];
        if (empty($name) || empty($password) || empty($birthdate) || empty($email)) {
            return $this->json(['message' => 'Informations manquantes'], 400);
        }
        $existingUser = $this->userRepository->findOneBy(['email' => $email]);
        if ($existingUser) {
            return $this->json(['message' => 'Adresse e-mail déjà utilisée'], 400);
        }
        // Créer un nouvel utilisateur
        $user = new Users();
        $user->setNom($name);
        $user->setMotdepasse($password);
        $user->setDatedenaissance(new \DateTime($birthdate));
        $user->setEmail($email);
        $user->setTel($tel);
        $user->setAdresse($adresse);
        $user->setLanguePreferee($languePreferee);
        $this->userRepository->save($user, true);
        return $this->json(['success' => true, 'message' => 'Inscription réussie'], 200);
    }
    /**
     * @Route("/login", name="login", methods={"POST"})
     */
    public function login(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'];
        $password = $data['password'];
        if (empty($email) || empty($password)) {
            return $this->json(['message' => 'Informations manquantes'], 400);
        }
        $user = $this->userRepository->findOneBy(['email' => $email]);
        if (!$user || $password !== $user->getMotdepasse()) {
            return $this->json(['success' => false, 'message' => 'Informations invalides'], 401);
        }
        return $this->json(['success' => true, 'message' => 'Login avec succès'], 200);
    }
}