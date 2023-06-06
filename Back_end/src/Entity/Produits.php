<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\Categories;
use App\Entity\Users;

/**
 * Produits
 *
 * @ORM\Table(name="produits", indexes={@ORM\Index(name="UsersID", columns={"UsersID"}), @ORM\Index(name="CategorieID", columns={"CategorieID"})})
 * @ORM\Entity
 */
class Produits
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
     * @ORM\Column(name="NomDuProduit", type="string", length=100, nullable=true)
     */
    private $nomDuProduit;

    /**
     * @var string|null
     *
     * @ORM\Column(name="Description", type="text", length=65535, nullable=true)
     */
    private $description;

    /**
     * @var string|null
     *
     * @ORM\Column(name="Prix", type="decimal", precision=10, scale=2, nullable=true)
     */
    private $prix;

    /**
     * @var string|null
     *
     * @ORM\Column(name="ImageUrl", type="text", length=65535, nullable=true)
     */
    private $imageUrl;

    /**
     * @var \App\Entity\Users
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Users")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="UsersID", referencedColumnName="ID")
     * })
     */
    private $usersId;

    /**
     * @var \App\Entity\Categories
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Categories")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="CategorieID", referencedColumnName="ID")
     * })
     */
    private $categorieId;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomDuProduit(): ?string
    {
        return $this->nomDuProduit;
    }

    public function setNomDuProduit(?string $nomDuProduit): self
    {
        $this->nomDuProduit = $nomDuProduit;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getPrix(): ?string
    {
        return $this->prix;
    }

    public function setPrix(?string $prix): self
    {
        $this->prix = $prix;
        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->imageUrl;
    }

    public function setImageUrl(?string $imageUrl): self
    {
        $this->imageUrl = $imageUrl;
        return $this;
    }

    public function getUsersId(): ?Users
    {
        return $this->usersId;
    }

    public function setUsersId(?Users $usersId): self
    {
        $this->usersId = $usersId;
        return $this;
    }

    public function getCategorieId(): ?Categories
    {
        return $this->categorieId;
    }

    public function setCategorieId(?Categories $categorieId): self
    {
        $this->categorieId = $categorieId;
        return $this;
    }
}
