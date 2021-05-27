# Liste des evenements

Ce fichier liste les evenements possible

## Connexion

Un utilisateur lance l'application

## Join

Un utilisateur rejoint une partie => joinGame(username, gameId?, themeId?)
partie public => joinGame(username, themeId?)
partie privé => joinGame(username, gameId)

## Create

createGame(settings) => retourne le gameId

```typescript
type GameSetting {
    gameId? :  String,
    leader : String,
    themeId? : Number,
    name: String,
}
```

## Salon

startGame(gameId)

## Game

handleAnswer(username,gameId, correct) => augmente le nb de points de l'user s'il repond bien, question suivante , on retourne les stats de tout le monde

userHasBuzz(username,gameId) => stop music , launch timer , block all other users

userEliminated(username,gameId)

isGameEnded(gameId) => renvoie les stats de la partie

## License

[MIT](https://choosealicense.com/licenses/mit/)
