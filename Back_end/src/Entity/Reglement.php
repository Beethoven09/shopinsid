<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Commandes;

/**
 * Reglement
 *
 * @ORM\Table(name="reglement", indexes={@ORM\Index(name="CommandeID", columns={"CommandeID"})})
 * @ORM\Entity(repositoryClass="App\Repository\ReglementRepository")
 * 
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
    private $datereglement;

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

    public function getMontant(): ?string
    {
        return $this->montant;
    }

    public function setMontant(?string $montant): self
    {
        $this->montant = $montant;

        return $this;
    }

    public function getDatereglement(): ?\DateTimeInterface
    {
        return $this->datereglement;
    }

    public function setDatereglement(?\DateTimeInterface $datereglement): self
    {
        $this->datereglement = $datereglement;

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
