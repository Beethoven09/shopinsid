<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Avis
 *
 * @ORM\Table(name="avis", indexes={@ORM\Index(name="UsersID", columns={"UsersID"}), @ORM\Index(name="ProduitID", columns={"ProduitID"})})
 * @ORM\Entity
 */
class Avis
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
     * @ORM\Column(name="Note", type="integer", nullable=true)
     */
    private $note;

    /**
     * @var string|null
     *
     * @ORM\Column(name="Commentaire", type="text", length=65535, nullable=true)
     */
    private $commentaire;

    /**
     * @var Users|null
     *
     * @ORM\ManyToOne(targetEntity="Users")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="UsersID", referencedColumnName="ID")
     * })
     */
    private $usersid;

    /**
     * @var Produits|null
     *
     * @ORM\ManyToOne(targetEntity="Produits")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="ProduitID", referencedColumnName="ID")
     * })
     */
    private $produitid;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNote(): ?int
    {
        return $this->note;
    }

    public function setNote(?int $note): self
    {
        $this->note = $note;
        return $this;
    }

    public function getCommentaire(): ?string
    {
        return $this->commentaire;
    }

    public function setCommentaire(?string $commentaire): self
    {
        $this->commentaire = $commentaire;
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

    public function getProduitid(): ?Produits
    {
        return $this->produitid;
    }

    public function setProduitid(?Produits $produitid): self
    {
        $this->produitid = $produitid;
        return $this;
    }
}
