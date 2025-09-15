DROP TABLE Membre;
DROP TABLE Compte;

CREATE TABLE Compte(
	login VARCHAR(20),
	mdp VARCHAR(50),
	statut CHAR,
	mail VARCHAR(100),
	CONSTRAINT pk_Compte PRIMARY KEY (login)
	CONSTRAINT ck_mail_compte CHECK (mail REGEXP '^.+@.+\..+$')
	);
	
CREATE TABLE Membre(
	idMembre INT AUTO_INCREMENT,
	nom VARCHAR(50),
	prenom VARCHAR(50),
	telephone VARCHAR(30),
	mail VARCHAR(100),
	CONSTRAINT pk_Membre PRIMARY KEY (idMembre),
	CONSTRAINT ck_mail_membre CHECK (mail REGEXP '.+@.+\..+'),
	CONSTRAINT ck_telephone_membre CHECK (telephone REGEXP '^\+[0-9 ]+$')
	);

	

