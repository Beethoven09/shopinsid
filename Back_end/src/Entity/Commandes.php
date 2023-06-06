<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\Users;

/**
 * Commandes
 *
 * @ORM\Table(name="commandes", indexes={@ORM\Index(name="UsersID", columns={"UsersID"})})
 * @ORM\Entity
 */
class Commandes
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
     * @var \DateTime|null
     *
     * @ORM\Column(name="DateCommande", type="datetime", nullable=true)
     */
    private $datecommande;

    /**
     * @var string|null
     *
     * @ORM\Column(name="Total", type="decimal", precision=10, scale=2, nullable=true)
     */
    private $total;

    /**
     * @var \Users|null
     *
     * @ORM\ManyToOne(targetEntity="Users")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="UsersID", referencedColumnName="ID")
     * })
     */
    private $users;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateCommande(): ?\DateTimeInterface
    {
        return $this->datecommande;
    }

    public function setDateCommande(?\DateTimeInterface $datecommande): self
    {
        $this->datecommande = $datecommande;
        return $this;
    }

    public function getTotal(): ?string
    {
        return $this->total;
    }

    public function setTotal(?string $total): self
    {
        $this->total = $total;
        return $this;
    }

    public function getUsers(): ?Users
    {
        return $this->users;
    }

    public function setUsers(?Users $users): self
    {
        $this->users = $users;
        return $this;
    }
}
