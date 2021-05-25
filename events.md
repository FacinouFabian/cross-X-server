# Liste des evenements

Ce fichier liste les evenements possible

## Connexion

Un utilisateur lance l'application

## Join

Un utilisateur rejoint une partie => joinParty(username, gameId?, themeId?)
partie public => joinParty(username, themeId?)
partie privé => joinParty(username, gameId)

## Create

createParty(settings) => retourne le gameId

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

## Party

handleAnswer(username,gameId, correct) => augmente le nb de points de l'user s'il repond bien, question suivante , on retourne les stats de tout le monde

userHasBuzz(username,gameId) => stop music , launch timer , block all other users

userEliminated(username,gameId)

isPartyEnded(gameId) => renvoie les stats de la partie

## License

[MIT](https://choosealicense.com/licenses/mit/)
