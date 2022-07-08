# Drustcraft

![Drustcraft Banner](https://raw.githubusercontent.com/Drustcraft/.github/main/img/vareal.jpg)

[![Pull Requests Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)
[![first-timers-only Friendly](https://img.shields.io/badge/first--timers--only-friendly-blue.svg)](http://www.firsttimersonly.com/)
[![Discord](https://img.shields.io/discord/782787130334248973.svg?color=%237289da&label=discord)](http://drustcraft.gg/discord)
[![Issues Open](https://img.shields.io/github/issues/drustcraft/mythicmobs?color=008080)](https://github.com/Drustcraft/mythicmobs/issues)
[![GitHub Good First Issues](https://img.shields.io/github/issues/drustcraft/mythicmobs/good%20first%20issue?label=Good%20First%20issues)](https://github.com/drustcraft/mythicmobs/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)
[![GitHub Help Wanted issues](https://img.shields.io/github/issues/drustcraft/mythicmobs/help%20wanted?label=%22Help%20Wanted%22%20issues)](https://github.com/drustcraft/mythicmobs/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)

[Drustcraft](https://www.drustcraft.com.au) is a [Minecraft](https://www.minecraft.net) community that not only enables players to play in a large open MMORPG, but also gives the tools to create their own towns, quests, shops, NPCs, participate in world events, dungeons and raids through story-telling, design and coding.

The ultimate goal of this project is to create a free-play, safe and open world for players to explore and expand on, directing the storyline towards their work. There is even options for organisations to join in and create their own townships, quests and engagements!

## What is this Repository for?

This repository contains the source code for the Drustcraft Discord bot

## Contributing to this Repository

The Drustcraft community is possible thanks to kind volunteers like you! If you want to contribute your time and expertise, we would be excited to welcome you aboard.

Please take a minute and [review our Contributing](/Drustcraft/.github/blob/main/CONTRIBUTING.md) guidelines.

Visit the [Step by Step Guide in Contributing to Drustcraft](https://github.com/Drustcraft/denizen/wiki/Contributing), if you have never used [VSCode](http://code.visualstudio.com) and performed a Pull Request before.

## Requirements

- [Node.JS v18.4.0](https://nodejs.org)

Other versions may not work correctly (or even compile)

## Support

You may find the following guides helpful:

- [Drustcraft Discord](https://drustcraft.gg/discord) - Official Drustcraft Discord using the `#development` channel

## Installation

Once you have installed Node.JS (*and by extension npm*), rename config.secret.base.ts inside of the src folder to config.secret.ts and fill in the variables. Then run this in the console:

```sh
npm run coldStartStage1 && npm run coldStartStage2
```

After running these commands, the bot can be started by simply doing:

```sh
npm run start
```

If you are upgrading, you need to do the first script again.

## API Documentation

### /ingame: PUT

Body:

```json
{
 "message": "the message that the player sent",
 "playerUuid": "the uuid of the player that sent the message"
}
```

### /region_create: POST

Body:

```json
{
 "name": "the name of the region/workshop",
 "type": "workshop" // This must be set to workshop for the workshop to be created on the guild.
}
```

### /region_delete: DELETE

Body:

```json
{
 "name": "the name of the region/workshop",
 "type": "workshop" // This must be set to workshop for the workshop to be deleted.
}
```
