<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Categories;
use App\Entity\Users;

/**
 * Produits
 *
 * @ORM\Table(name="produits", indexes={@ORM\Index(name="UsersID", columns={"UsersID"}), @ORM\Index(name="CategorieID", columns={"CategorieID"})})
 * @ORM\Entity(repositoryClass="App\Repository\ProduitsRepository")
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
    private $nomduproduit;

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
     * @var \Categories
     *
     * @ORM\ManyToOne(targetEntity="Categories")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="CategorieID", referencedColumnName="ID")
     * })
     */
    private $categorieid;

    /**
     * @var \Users
     *
     * @ORM\ManyToOne(targetEntity="Users")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="UsersID", referencedColumnName="ID")
     * })
     */
    private $usersid;

    /**
     * @var string|null
     *
     * @ORM\Column(name="ImageUrl", type="text", length=65535, nullable=true)
     */
    private $imageurl;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomduproduit(): ?string
    {
        return $this->nomduproduit;
    }

    public function setNomduproduit(?string $nomduproduit): self
    {
        $this->nomduproduit = $nomduproduit;

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

    public function getCategorieid(): ?Categories
    {
        return $this->categorieid;
    }

    public function setCategorieid(?Categories $categorieid): self
    {
        $this->categorieid = $categorieid;

        return $this;
    }

    public function getUsersid(): ?Users
    {
        return $this->usersid;
    }

    public function setUsersid(?Users $usersid): self
    {
        $this->usersid = $usersid;

        return $this;
    }
    public function getImageUrl(): ?String
    {
        return $this->imageurl;
    }

    public function setImageUrl(?String $imageURl): self
    {
        $this->imageurl = $imageURl;

        return $this;
    }
}
