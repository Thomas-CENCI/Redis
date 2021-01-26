# Redis
Vous venez d’être recruté pour faire une mission auprès d’une startup qui propose ses données sous la forme d’un Software as a Service.

La startup commence à être victime de son succès avec une utilisation de plus en plus soutenue de ses services. 
Il est nécessaire de remédier à ça en limitant le nombre d’appels aux services de l’entreprise (et en monétisant pour une utilisation plus intensive). Vous allez pour cela devoir consigner le nombre d’appels par utilisateur enregistré et connecté.

La startup considère qu’il est possible de requêter leurs services à raison de 10 appels par fenêtre de 10 minutes.

Les outils à utiliser sont Node.js (pour le serveur REST), MongoDB (pour la gestion des utilisateurs), et Redis (pour la gestion du nombre d’appels par utilisateurs).
