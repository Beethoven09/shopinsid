<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\Commandes;

/**
 * Reglement
 *
 * @ORM\Table(name="reglement", indexes={@ORM\Index(name="CommandeID", columns={"CommandeID"})})
 * @ORM\Entity
 */
class Reglement
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
     * @ORM\Column(name="Montant", type="decimal", precision=10, scale=2, nullable=true)
     */
    private $montant;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="DateReglement", type="datetime", nullable=true)
     */
    private $dateReglement;

    /**
     * @var \App\Entity\Commandes|null
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Commandes")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="CommandeID", referencedColumnName="ID")
     * })
     */
    private $commande;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMontant(): ?string
    {
        return $this->montant;
    }

    public function setMontant(?string $montant): self
    {
        $this->montant = $montant;
        return $this;
    }

    public function getDateReglement(): ?\DateTimeInterface
    {
        return $this->dateReglement;
    }

    public function setDateReglement(?\DateTimeInterface $dateReglement): self
    {
        $this->dateReglement = $dateReglement;
        return $this;
    }

    public function getCommande(): ?Commandes
    {
        return $this->commande;
    }

    public function setCommande(?Commandes $commande): self
    {
        $this->commande = $commande;
        return $this;
    }
}
