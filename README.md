![open_class_rooms](https://img.shields.io/badge/OpenClassRooms-Project06-limegreen?labelColor=blueviolet&style=plastic)
![built_by](https://img.shields.io/badge/Built%20by-Developers%20%3Cgeoffrey_ll%3E-black?labelColor=orange&style=plastic)


![made_with_python](https://img.shields.io/badge/Made%20With-Python_3.6.5-darkgreen?logo=python&labelColor=red&style=plastic)
![ide_use_pycharm](https://img.shields.io/badge/IDE%20use-PyCharm-darkgreen?logo=pycharm&labelColor=red&style=plastic)
![ide_use_pycharm](https://img.shields.io/badge/IDE%20use-VSCode-0078b9?logo=pycharm&labelColor=red&style=plastic)
![os_use_windowns](https://img.shields.io/badge/OS%20use-Windows-blue?labelColor=red&style=plastic&logo=windows)


![Mozilla](https://img.shields.io/badge/MozillaFirefox-94.0.2-limegreen?labelColor=ff3945&style=plastic)
![Mozilla](https://img.shields.io/badge/GoogleChromeDev-98.0.4758.9-limegreen?labelColor=4285f4&style=plastic)
![Mozilla](https://img.shields.io/badge/MicrosoftEdge-96.0.1054.57-limegreen?labelColor=118edb&style=plastic)


![open_source](https://img.shields.io/badge/licence-libre-darkkhaki?labelColor=red&style=plastic)


 
# L'application web JustStreamIt #

1.  [Description](#description)
2.  [Installation](#installation)
3.  [Utilisation](#utilisation)
    1.  [Front-end](#front-end)
    2.  [Back-end](#back-end)
4.  [À propos](#a-propos)
    1.  [Bugs connus](#bugs-connus)
    2.  [Améliorations futures](#améliorations-futures)


 
## 1. Description <a name="description"></a> ##

    Ce script à été réalisé dans le cadre d'un projet du parcours
    'Développeur d'application - Python' d'OpenClassROoms.


\
Permet à ses utilisateurs de visualiser en direct les 7 meilleurs films, pour quelques genres cinématographiques.

Les classements sont basés sur les critères décroissants suivants : score IMDB, puis nombre de votants

\
Cette application fonctionne grâce à l'API local d'OpenClassrooms liée à ce projet. Elle n'est pas présente dans ce dépôt (vous la trouverez à cette adresse : [API d'OC](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)).


 
## 2. Installation <a name="installation"></a> ##

1. Cloner ce dépôt à l'aide de la commande `$ git clone https://github.com/geoffrey-ll/P06_GL_JustStreamIt` ou téléchargez-le [ici](https://github.com/geoffrey-ll/P06_GL_JustStreamIt/archive/refs/heads/master.zip).
2. Si vous ne l'avez pas, récupérez l'API d'OpenClassrooms [API d'OC](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR) et suivez les instructions du README pour la première exécution.
3. Depuis un terminal, déplacez-vous à la racine de l'API.
4. Démarrez le serveur avec `$ python manage.py runserver` ([commande avec pipenv](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR#installation-et-ex%C3%A9cution-de-lapplication-avec-pipenv))
5. Ouvrez le fichier index.html dans le navigateur de votre choix 
    \
    (fonctionnement vérifié pour : Mozilla Firefox 94.0.2 ; Google Chrome dev 98.0.4758.9 ; Microsoft Edge 96.0.1054.57). 

\
Les étapes 1 et 2 ne sont nécessaires que pour la première utilisation.


 
## 3. Utilisation <a name="utilisation"></a> ##

###### FRONT-END <a name="front-end"></a> ######
- Des flèches de navigations permettent de se déplacer parmis les 7 films d'une catégorie.
- Un clique sur l'affichage d'un film permet l'ouverture de la fenêtre modal affichant les informations sur le film.
- Trois façons de fermer la fenêtre modal :
    - Le bouton de fermeture.
    - Cliquer en dehors de la fenêtre modal.
    - La touche Echap.

###### BACK-END <a name="back-end"></a> ######

- Modifier les genres cinématographiques affichés :
    \
    Ouvrir le fichier static/js/main.js dans un éditeur de texte.
    \
    !["Changer les catégories"](readme_png/function_choosingCategories.png)
    \
        - Pour que soit affichés le classement pour tout les genres cinématographiques : 
        \
        ligne 5 : remplacez `$ "no"` par `$ "yes"`
        - Pour afficher le classement que pour certains genres cinématographiques :
        \
        ligne 11 : entrez le nom des genres entre guillements et séparez les d'une virgule. Sur l'image ci-dessus, ce sont les catégories biographie, science-fiction et aventure qui seront affichés.
        \
        `$ ""` correspond au classement tous genres confondus.


- Vous trouverez la liste exhaustive des genres disponibles au sein de la fonction translateNameCategory du fichier static\js\main.js :
    \
    !["Liste des genres disponibles"](readme_png/function_translateNameCategory.png)

 
## 4. À propos <a name="a-propos"></a> ###
 
### i. Bugs connus <a name="bugs-connus"></a> ###

- Certains genres de films contiennent moins de 7 films. Le déplacement du carrousel et l'opacité des flèches pour y naviguer, sont basés sur ce chiffre.
Ainsi, pour les catégories concernées, le carrousel pourra être entièrement vidé de poster, car peuvent tout de même se décaller de 7 positions.
- Écrire deux fois le même genre de film, dans la liste des genres (static.js.main.js ligne 11) : la 1er itération s'affichera correctement, la 2ème sera vide (seul les flèches de navigations seront visibles)

 
### ii. Amélioration futures <a name="améliorations-futures"></a> ###

- Mettre une animation lors du déplacement du carrousel.
- Rendre le nombre de films par classement (actuellement 7) facilement modifiable en back-end (à l'instar du choix des catégories).
- Input (liste déroulante) pour laisser l'utilisateur choisir les catégories à afficher ??
