<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\Users;

/**
 * Chat
 *
 * @ORM\Table(name="chat", indexes={@ORM\Index(name="UsersID", columns={"UsersID"})})
 * @ORM\Entity
 */
class Chat
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
     * @ORM\Column(name="Message", type="text", length=65535, nullable=true)
     */
    private $message;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="DateMessage", type="datetime", nullable=true)
     */
    private $datemessage;

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

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(?string $message): self
    {
        $this->message = $message;
        return $this;
    }

    public function getDateMessage(): ?\DateTimeInterface
    {
        return $this->datemessage;
    }

    public function setDateMessage(?\DateTimeInterface $datemessage): self
    {
        $this->datemessage = $datemessage;
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
