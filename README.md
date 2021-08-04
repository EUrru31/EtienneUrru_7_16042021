# Projet 7 GROUPOMANIA

7ème et dernier projet de la formation développeur web d'Openclassrooms. Créer un réseau social d'entreprise. La stack utilisée pour ce projet:

VueJs + vuex
NodeJs + express + axios
Mysql

# Front-end

Ouvrir le dossier Frontend dans le terminal de votre éditeur puis exécuter la commande: npm install
puis npm start

si le navigateur ne s'ouvre pas automatiquement allez à : http://localhost:8080/

# Back-end

Ouvrir le dossier Backend dans le terminal de votre éditeur puis exécuter la commande: npm install
puis : node serve

## Base de données

Se connecter au serveur MySql de votre choix. Vérifiez les identifiants dans le fichier config.json du dossier Backend puis importer le fichier groupomania.sql s'il vous a été fourni :

mysql -u root -p groupomania < groupomania.sql

### Utilisation

Pour s'inscrire sur le social network de Groupomania, il vous faut renseigner :

Un pseudo (entre 3 et 30 caractères)
Une adresse mail valide
Un mot de passe (de 8 à 20 caractères, lettres et chiffres acceptés uniquement, majuscules et minuscules, pas de symboles).
Une fois connecté vous pouvez voir les publications des utilisateurs et publier des posts.
