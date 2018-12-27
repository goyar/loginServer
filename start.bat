
echo OFF
cls
COLOR 2
TITLE Main Server
echo Directory of current batch file: "%~dp0"
echo Changing directory to server folder
cd %~dp0
echo Current working directory: "%cd%"
start "Main Server" cmd /c node mainServer.js
timeout 2 > NUL
start "Login Server" cmd /c node loginServer.js
timeout 2 > NUL
start "Test Client" cmd /c node testClientTcp.js
PAUSE