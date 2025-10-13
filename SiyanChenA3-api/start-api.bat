@echo off
REM ---------------------------------------------
REM 启动 Charity Events API 服务 
REM ---------------------------------------------

cd /d %~dp0

if not exist node_modules (
  echo Installing dependencies...
  npm install
)

if exist .env (
  for /f "usebackq tokens=1,2 delims==" %%a in (.env) do set %%a=%%b
)

echo Starting API server on port %PORT%
node src\server.js
pause
