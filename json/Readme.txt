How to use these json files???

/*****************************************************
Data.json
*****************************************************/
1. Contains key to image/audio/spritesheet/subtitle source mappings.
2. Has mapping of game assets used to keys.

/*****************************************************
Style.json
*****************************************************/
1. Contains text styles for text shown in experience. Refer to Phaser text documentation for details. (https://phaser.io/docs/2.6.2/Phaser.Text.html)
2. Direct Phaser text style properties are supported.
3. Additional modifications include lineSpacing and shadow(x, y, color, blur)

/*****************************************************
Scenes.json
*****************************************************/
1. Contains scenes and data, by default program will start with the scene name: 'startScene'.
2. StateTypes supported: 
	1. InteractState
	2. MovieState
	3. MenuState
	4. LocationState
	5. SwitchState
3. Name of scene object is the name we refer to when switching scenes.
4. Movies are buffered instead of loaded.

/*****************************************************
InteractState
*****************************************************/
Movie state with interaction moments.
Elements used:
1. videoFilter
2. movieSrcHD
3. movieSrcSD
4. stateType
5. sub
6. choiceMoments
7. nextScene
8. transition

/*****************************************************
MovieState
*****************************************************/
A simple movie scene that triggers next scene when it ends.
Elements used:
1. videoFilter
2. movieSrcHD
3. movieSrcSD
4. stateType
5. sub
7. nextScene
8. transition

/*****************************************************
LocationState
*****************************************************/
State where users can click buttons and explore.
Elements used:
1. draggable
2. movieSrcHD
3. movieSrcSD
4. stateType
5. bgImageKey
7. nextScene
8. transition
9. backgroundMusic
10. icons
11. linkedIcons

/*****************************************************
MenuState
*****************************************************/
State where users watch a looping video/image with buttons on top.
Elements used:
1. movieSrcHD
2. movieSrcSD
3. stateType
4. bgImageKey
5. transition
6. icons

/*****************************************************
SwitchState
*****************************************************/
Utility state that checks the scene requirements and forwards it to another state.
Elements used:
1. stateType
2. sceneReqs
3. sceneTargetNames

/*****************************************************
Element descriptions
*****************************************************/
videoFilter: Array of filter used when overlayed. Check out jsManipulate (https://github.com/JoelBesada/JSManipulate) for list of filters and parameters.

movieSrcHD: HD movie source
movieSrcSD: SD movie source

stateType: Type of state. (See Statetypes supported above)

sub: Subtitle key

choiceMoments: Interaction moments in scene. Has array of choice moments with timestamps, question, choices and position of boxes specified.

nextScene: Scene name that is changed to when movie ends.

transition: Specify fade in/out transitions (fade out currently not used)

draggable: For static image backgrounds, determine if image is draggable (currently unused)

icons: Specify how many icons is drawn, its type, and where to draw.

linkedIcons: Hidden icons that are usually revealed by displayed icons.

sceneReqs: Array of array of scenes player has to visit.

sceneTargetNames: By array index, goes to this scene if scene requirements are fulfilled.