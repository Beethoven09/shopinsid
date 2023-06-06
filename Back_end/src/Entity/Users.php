<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Users
 *
 * @ORM\Table(name="users", uniqueConstraints={@ORM\UniqueConstraint(name="Email", columns={"Email"})})
 * @ORM\Entity
 */
class Users
{
    /**
     * @var int
     *
     * @ORM\Column(name="ID", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string|null
     *
     * @ORM\Column(name="Nom", type="string", length=100, nullable=true)
     */
    private $nom;

    /**
     * @var string|null
     *
     * @ORM\Column(name="Prenom", type="string", length=100, nullable=true)
     */
    private $prenom;

    /**
     * @var string|null
     *
     * @ORM\Column(name="Email", type="string", length=100, nullable=true)
     */
    private $email;

    /**
     * @var string|null
     *
     * @ORM\Column(name="MotDePasse", type="string", length=100, nullable=true)
     */
    private $motdepasse;

    /**
     * @var string|null
     *
     * @ORM\Column(name="LanguePreferee", type="string", length=50, nullable=true)
     */
    private $languepreferee;

    /**
     * @var string|null
     *
     * @ORM\Column(name="Adresse", type="string", length=200, nullable=true)
     */
    private $adresse;

    /**
     * @var int|null
     *
     * @ORM\Column(name="Tel", type="integer", nullable=true)
     */
    private $tel;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="DateDeNaissance", type="datetime", nullable=true)
     */
    private $datedenaissance;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(?string $nom): self
    {
        $this->nom = $nom;
        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(?string $prenom): self
    {
        $this->prenom = $prenom;
        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getMotDePasse(): ?string
    {
        return $this->motdepasse;
    }

    public function setMotDePasse(?string $motdepasse): self
    {
        $this->motdepasse = $motdepasse;
        return $this;
    }

    public function getLanguePreferee(): ?string
    {
        return $this->languepreferee;
    }

    public function setLanguePreferee(?string $languepreferee): self
    {
        $this->languepreferee = $languepreferee;
        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(?string $adresse): self
    {
        $this->adresse = $adresse;
        return $this;
    }

    public function getTel(): ?int
    {
        return $this->tel;
    }

    public function setTel(?int $tel): self
    {
        $this->tel = $tel;
        return $this;
    }

    public function getDateDeNaissance(): ?\DateTime
    {
        return $this->datedenaissance;
    }

    public function setDateDeNaissance(?\DateTime $datedenaissance): self
    {
        $this->datedenaissance = $datedenaissance;
        return $this;
    }
}
