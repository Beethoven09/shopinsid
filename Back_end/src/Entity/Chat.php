<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Users;

/**
 * Chat
 *
 * @ORM\Table(name="chat", indexes={@ORM\Index(name="UsersID", columns={"UsersID"})})
 * @ORM\Entity(repositoryClass="App\Repository\ChatRepository")
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
     * @var \Users
     *
     * @ORM\ManyToOne(targetEntity="Users")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="UsersID", referencedColumnName="ID")
     * })
     */
    private $usersid;

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

    public function getDatemessage(): ?\DateTimeInterface
    {
        return $this->datemessage;
    }

    public function setDatemessage(?\DateTimeInterface $datemessage): self
    {
        $this->datemessage = $datemessage;

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


}
