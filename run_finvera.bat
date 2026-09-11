@echo off
title FINVERA - Financial Literacy Platform
echo ==================================================
echo Starting FINVERA on http://localhost:3000 ...
echo ==================================================
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"
start http://localhost:3000
call npm.cmd start
pause
