#!/bin/bash


#LINUX
/home/jaco/Downloads/unity-editor-5.1.0f3/Editor/Unity -batchMode -quit -projectPath /home/jaco/src/sneakymon -buildLinuxUniversalPlayer /home/jaco/src/sneakymon/Build/lin/run.x86

#WINDOWS
/home/jaco/Downloads/unity-editor-5.1.0f3/Editor/Unity -batchMode -quit -projectPath /home/jaco/src/sneakymon -buildWindowsPlayer /home/jaco/src/sneakymon/Build/win/run.exe

#OSX
/home/jaco/Downloads/unity-editor-5.1.0f3/Editor/Unity -batchMode -quit -projectPath /home/jaco/src/sneakymon -buildOSXUniversalPlayer /home/jaco/src/sneakymon/Build/osx/run.app

#WEB
#/home/jaco/Downloads/unity-editor-5.1.0f3/Editor/Unity -batchMode -quit -projectPath /home/jaco/src/sneakymon -buildWebPlayer /home/jaco/src/sneakymon/Build/web/index.unity


