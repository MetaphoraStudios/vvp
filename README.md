# Volumetric Video Player

> A simpler player for my custom simple volumetric video format.

A simple implementation of a volumetric video player, in Babylon JS, for a custom format.  

## Video Format

The format is a folder (compressed or raw) with keyframes for both the colour and depth channels.  
The files are named after their time since the start, in milliseconds and all frames come in pairs for the camera and depth.  

__File name format:__  
Camera keyframe at 102 milliseconds: `camera.102.png` (RGB)  
Depth keyframe at 102 milliseconds: `depth.102.png` (Gray scale)  