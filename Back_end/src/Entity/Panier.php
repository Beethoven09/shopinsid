<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\Produits;
use App\Entity\Users;

/**
 * Panier
 *
 * @ORM\Table(name="panier", indexes={@ORM\Index(name="UserID", columns={"UserID"}), @ORM\Index(name="ProduitID", columns={"ProduitID"})})
 * @ORM\Entity
 */
class Panier
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
     * @var int|null
     *
     * @ORM\Column(name="Quantite", type="integer", nullable=true)
     */
    private $quantite;

    /**
     * @var string|null
     *
     * @ORM\Column(name="PrixUnitaire", type="decimal", precision=10, scale=2, nullable=true)
     */
    private $prixUnitaire;

    /**
     * @var \App\Entity\Users
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Users")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="UserID", referencedColumnName="ID")
     * })
     */
    private $user;

    /**
     * @var \App\Entity\Produits
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Produits")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="ProduitID", referencedColumnName="ID")
     * })
     */
    private $produit;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantite(): ?int
    {
        return $this->quantite;
    }

    public function setQuantite(?int $quantite): self
    {
        $this->quantite = $quantite;

        return $this;
    }

    public function getPrixUnitaire(): ?string
    {
        return $this->prixUnitaire;
    }

    public function setPrixUnitaire(?string $prixUnitaire): self
    {
        $this->prixUnitaire = $prixUnitaire;

        return $this;
    }

    public function getUser(): ?Users
    {
        return $this->user;
    }

    public function setUser(?Users $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getProduit(): ?Produits
    {
        return $this->produit;
    }

    public function setProduit(?Produits $produit): self
    {
        $this->produit = $produit;

        return $this;
    }
}
