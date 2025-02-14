# Documentation API Jingle

| METHOD | URI       | HEADERS                                               | BODY                        | RETOURNE                                                                                                     | DESCRIPTION            |
|--------|-----------|-------------------------------------------------------|-----------------------------|--------------------------------------------------------------------------------------------------------------|------------------------|
| POST   | /register | Authorization: Basic base64(email:password)           | ```{ "pseudo":"string" }``` | {<br/> user: {<br/> id:string,<br/> email:string <br/>}<br/>}                                                | Créer un utilisateur   |
| POST   | /signin   | Authorization: Basic base64(email ou pseudo:password) | /                           | {<br/> user: {<br/> id:string,<br/> email:string, <br/> token:string,<br/> refreshToken:string<br/>}<br/>}   | Se connecter           |
| POST   | /refresh  | Authorization: Bearer token                           | /                           | {<br/> user: {<br/> id:string,<br/> email:string, <br/> token:string,<br/> refreshToken:string<br/>}<br/>}   | Rafraichir le token    |
| GET    | /podcasts | /                                                     | /                           | {<br/> podcasts:[<br/>...<br/>] <br/>}                                                                       | Récupérer les podcasts |

