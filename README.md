## Slack-clone Test

This is a clone of slack based on minimal material ui kit, strapi backend and faye server.

### Quickstart

#### Dependencies

The architecture is containerized so that dependency is minimal. Still you will still need to have docker engine installed on your computer. Go [here](https://docs.docker.com/engine/install/) to install docker engine for your computer.

#### Ports

You need to have the following ports free on your computer as they will be needed by the app :

- 3000
- 1337
- 18080
- 5432

#### Permission

You need to give the correct permission to the file `cleandb.sql` if permission is not `777` yet :

```console
cd slack-clone
sudo chmod 777 cleandb.sql
```

#### Launch the app

Just spawn the app like this while being located in the root of the repository :

```console
cd slack-clone
docker-compose up -d
```

#### Browse the app

You can now head to [http://localhost:3000](http://localhost:3000) on your browser.
Start by registering a new user. Then login. You can use the username or the email.

You can open another browser session (another chrome user for ex), and register another user (**another email AND another name**). Then you can login with the new user.

You can now create channels, start chatting.

#### Features

- Auth: login/logout
- Messages between users
- Messages in a channel
- Realtime messaging
- Versionning (github)
- Connexion status (who is connected or not ?)
- Typescript for frontend and realtime server
- Stack : Postgresql / React / Graphql / Strapi / Faye
