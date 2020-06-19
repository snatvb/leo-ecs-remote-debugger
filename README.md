# LeoEcs Remote Debugger

Remote debugger for [LeoEcs](https://github.com/Leopotam/ecs).

## Screens
![main-screen][main-screen]
![settings-screen][settings-screen]

## RoadMap
Look at [trello desktop](https://trello.com/b/k6zqxMqC)

## How to use
Install [ecs-remotedebug](https://github.com/Leopotam/ecs-remotedebug) in your project.

#### Add in your game setup file

Field
```cs
class GameSetup {
  // ...
  #if DEBUG
      Leopotam.Ecs.RemoteDebug.RemoteDebugClient _debug;
  #endif;
  // ...
}
```
Initialization
```cs
void Start() {
  // ...
  #if UNITY_EDITOR
      _debug = new Leopotam.Ecs.RemoteDebug.RemoteDebugClient (_world);
  #endif
}
```
Call in update loop
```cs
void Update() {
  // ...
  #if DEBUG
  _debug?.Run();
  #endif
}
```

Run LeoECSRemoteDebugger and after run your game.

Default port is `1111`. For change look at [here](https://github.com/Leopotam/ecs-remotedebug#custom-connection). Port in app you can change in settings _(after click save and reload app)_.

Click by Entity in world will open modal window with more often updating.


[main-screen]: img/main-screen.png "World"
[settings-screen]: img/settings-screen.png "Settings"
