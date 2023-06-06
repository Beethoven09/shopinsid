<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230606091551 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE produit');
        $this->addSql('DROP TABLE user');
        $this->addSql('ALTER TABLE panier DROP FOREIGN KEY panier_ibfk_1');
        $this->addSql('DROP INDEX CommandeID ON panier');
        $this->addSql('ALTER TABLE panier CHANGE CommandeID UserID INT DEFAULT NULL');
        $this->addSql('ALTER TABLE panier ADD CONSTRAINT FK_24CC0DF258746832 FOREIGN KEY (UserID) REFERENCES users (ID)');
        $this->addSql('CREATE INDEX UserID ON panier (UserID)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE produit (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, price DOUBLE PRECISION NOT NULL, description VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, image_url VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, password VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, mail VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, tel INT NOT NULL, birthdate DATE NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE panier DROP FOREIGN KEY FK_24CC0DF258746832');
        $this->addSql('DROP INDEX UserID ON panier');
        $this->addSql('ALTER TABLE panier CHANGE UserID CommandeID INT DEFAULT NULL');
        $this->addSql('ALTER TABLE panier ADD CONSTRAINT panier_ibfk_1 FOREIGN KEY (CommandeID) REFERENCES commandes (ID)');
        $this->addSql('CREATE INDEX CommandeID ON panier (CommandeID)');
    }
}
