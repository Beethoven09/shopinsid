<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Produits;
use App\Entity\Commandes;

/**
 * Panier
 *
 * @ORM\Table(name="panier", indexes={@ORM\Index(name="CommandeID", columns={"CommandeID"}), @ORM\Index(name="ProduitID", columns={"ProduitID"})})
 * @ORM\Entity(repositoryClass="App\Repository\PanierRepository")
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
    private $prixunitaire;

    /**
     * @var \Produits
     *
     * @ORM\ManyToOne(targetEntity="Produits")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="ProduitID", referencedColumnName="ID")
     * })
     */
    private $produitid;

    /**
     * @var \Commandes
     *
     * @ORM\ManyToOne(targetEntity="Commandes")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="CommandeID", referencedColumnName="ID")
     * })
     */
    private $commandeid;

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

    public function getPrixunitaire(): ?string
    {
        return $this->prixunitaire;
    }

    public function setPrixunitaire(?string $prixunitaire): self
    {
        $this->prixunitaire = $prixunitaire;

        return $this;
    }

    public function getProduitid(): ?Produits
    {
        return $this->produitid;
    }

    public function setProduitid(?Produits $produitid): self
    {
        $this->produitid = $produitid;

        return $this;
    }

    public function getCommandeid(): ?Commandes
    {
        return $this->commandeid;
    }

    public function setCommandeid(?Commandes $commandeid): self
    {
        $this->commandeid = $commandeid;

        return $this;
    }


}
