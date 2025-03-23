| METHOD | URI                            | HEADERS                                               | BODY                                                                                                                                               | RETOURNE                                                                                                 | DESCRIPTION                              |
|--------|--------------------------------|-------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|------------------------------------------|
| POST   | /register                      | Authorization: Basic base64(email:password)           | ```{ "pseudo":"string" }```                                                                                                                        | { user: { id:string, email:string } }                                                                    | Créer un utilisateur                     |
| POST   | /signin                        | Authorization: Basic base64(email ou pseudo:password) | /                                                                                                                                                  | { user: { id:string, email:string, token:string, refreshToken:string } }                                 | Se connecter                             |
| POST   | /refresh                       | Authorization: Bearer refresh-token                   | /                                                                                                                                                  | { user: { id:string, email:string, token:string, refreshToken:string } }                                 | Rafraîchir le token                      |
| GET    | /podcasts                      | /                                                     | /                                                                                                                                                  | { podcasts:[...] }                                                                                       | Récupérer les podcasts                   |
| GET    | /podcasts/:id                  | /                                                     | /                                                                                                                                                  | { podcast:{...} }                                                                                        | Récupérer un podcast                     |
| POST   | /podcasts                      | Authorization: Bearer token                           | ```{ "date":"string", "name":"string", "description":"string", "creatorId":"uuid", "fileImage":"fichier jpeg", "file":"fichier audio ou webm" }``` | { podcast:{...} }                                                                                        | Créer un podcast                         |
| PUT    | /podcasts/:id                  | Authorization: Bearer token                           | ```{ "date":"string", "name":"string", "description":"string", "creatorId":"uuid", "fileImage":"fichier jpeg", "file":"fichier audio ou webm" }``` | { podcast:{...} }                                                                                        | Modifier un podcast                      |
| DELETE | /podcasts/:id                  | Authorization: Bearer token                           | /                                                                                                                                                  | { podcast:{...} }                                                                                        | Supprimer un podcast                     |
| POST   | /podcasts/:id/avis             | Authorization: Bearer token                           | ```{ "title":"string", "content":"string", "userId":"uuid"}```                                                                                     | { avis:{...} }                                                                                           | Créer un avis sur un podcast             |
| GET    | /podcasts/:id/avis             | /                                                     | /                                                                                                                                                  | { avis:[...] }                                                                                           | Récupérer les avis d'un podcast          |
| GET    | /avis/:id                      | /                                                     | /                                                                                                                                                  | { avis:{...} }                                                                                           | Récupérer un avis par son ID             |
| PUT    | /avis/:id                      | Authorization: Bearer token                           | ```{ "title":"string", "content":"string", "userId":"uuid"}```                                                                                     | { avis:{...} }                                                                                           | Modifier un avis                         |
| DELETE | /avis/:id                      | Authorization: Bearer token                           | /                                                                                                                                                  | { avis:{...} }                                                                                           | Supprimer un avis                        |
| GET    | /playlists                     | /                                                     | /                                                                                                                                                  | { playlists:[...] }                                                                                      | Récupérer les playlists                  |
| GET    | /playlists/:id                 | /                                                     | /                                                                                                                                                  | { playlist:{...} }                                                                                       | Récupérer une playlist                   |
| POST   | /users/:id/playlists           | Authorization: Bearer token                           | ```{ "name":"string", "description":"string", "userId":"uuid"}```                                                                                  | { playlist:{...} }                                                                                       | Créer une playlist                       |
| PUT    | /playlists/:id                 | Authorization: Bearer token                           | ```{ "name":"string", "description":"string"}```                                                                                                   | { playlist:{...} }                                                                                       | Modifier une playlist                    |
| DELETE | /playlists/:id                 | Authorization: Bearer token                           | /                                                                                                                                                  | { message: "Playlist supprimée" }                                                                        | Supprimer une playlist                   |
| POST   | /playlists/:id/podcast         | Authorization: Bearer token                           | ```{ "podcastId":"uuid" }```                                                                                                                       | { playlist:{...} }                                                                                       | Ajouter un podcast à une playlist        |
| DELETE | /playlists/:id/podcast         | Authorization: Bearer token                           | ```{ "podcastId":"uuid" }```                                                                                                                       | { playlist:{...} }                                                                                       | Retirer un podcast d'une playlist        |
| GET    | /musics                        | Authorization: Bearer token                           | /                                                                                                                                                  | { musics:[...] }                                                                                         | Récupérer toutes les musiques            |
| GET    | /musics/:id                    | Authorization: Bearer token                           | /                                                                                                                                                  | { music:{...} }                                                                                          | Récupérer une musique par ID             |
| POST   | /musics                        | Authorization: Bearer token                           | ```{ "title":"string", "artist":"string", "album":"string", "file":"fichier audio"}```                                                             | { music:{...} }                                                                                          | Ajouter une musique                      |
| PUT    | /musics/:id                    | Authorization: Bearer token                           | ```{ "title":"string", "artist":"string", "album":"string", "file":"fichier audio"}```                                                             | { music:{...} }                                                                                          | Modifier une musique                     |
| DELETE | /musics/:id                    | Authorization: Bearer token                           | /                                                                                                                                                  | { message: "Musique supprimée" }                                                                         | Supprimer une musique                    |
| GET    | /users/:id/musics              | Authorization: Bearer token                           | /                                                                                                                                                  | { musics:[...] }                                                                                         | Récupérer les musiques d'un utilisateur  |
| GET    | /users                         | Authorization: Bearer token                           | /                                                                                                                                                  | { users:[...] }                                                                                          | Récupérer tous les utilisateurs          |
| GET    | /users/:id                     | Authorization: Bearer token                           | /                                                                                                                                                  | { user:{...} }                                                                                           | Récupérer un utilisateur                 |
| PATCH  | /users/:id                     | Authorization: Bearer token                           | ```{ "pseudo":"string", "email":"string" }```                                                                                                      | { user:{...} }                                                                                           | Modifier un utilisateur                  |
| PUT    | /users/:id/subscribers         | Authorization: Bearer token                           | /                                                                                                                                                  | { message: "Abonnement ajouté" }                                                                         | S'abonner à un utilisateur               |
| DELETE | /users/:id/subscribers         | Authorization: Bearer token                           | /                                                                                                                                                  | { message: "Abonnement supprimé" }                                                                       | Se désabonner d'un utilisateur           |
| PATCH  | /users/:id/upgrade             | Authorization: Bearer token                           | /                                                                                                                                                  | { message: "Utilisateur promu à Broadcaster" }                                                           | Passer un utilisateur en Broadcaster     |
| PATCH  | /users/:id/disupgrade          | Authorization: Bearer token                           | /                                                                                                                                                  | { message: "Utilisateur rétrogradé" }                                                                    | Rétrograder un utilisateur               |

