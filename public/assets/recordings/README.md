# Recordings

Place here folders of recordings.  

## Folder structure

Each recording folder is named after the recording date in the format `YYYYMMDDHHMMSS` (e.g. `20220211202818`).  

The folder contains keyframes for both the colour and depth channels.  
The keyframe files are named after their time since the start, in milliseconds and all frames come in pairs for the camera and depth.  

__Keyframe example:__  
Camera keyframe at 102 milliseconds: `camera.102.png` (RGB)  
Depth keyframe at 102 milliseconds: `depth.102.png` (Gray scale)  