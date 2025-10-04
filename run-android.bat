@echo off
set ANDROID_HOME=C:\Users\marke\AppData\Local\Android\Sdk
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%PATH%;%ANDROID_HOME%\platform-tools;%JAVA_HOME%\bin

cd android
call gradlew.bat app:installDebug
cd ..
npm start
