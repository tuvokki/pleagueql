const models = {};

export default function addModelsToContext(context) {
    const newContext = Object.assign({}, context);
    Object.keys(models).forEach((key) => {
        newContext[key] = new models[key](newContext);
    });
    return newContext;
}

//
import User from './User';
models.User = User;

import Player from './Player';
models.Player = Player;

import Team from './Team';
models.Team = Team;

import Game from './Game';
models.Game = Game;
