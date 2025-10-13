@echo off
title CharityEvents - Client Site
echo ===============================================
echo 🌐 Starting CharityEvents Client (Port: 3001)
echo ===============================================

cd /d "%~dp0"

if not exist node_modules (
  echo  Installing dependencies...
  npm install
)

echo  Launching client web server...
cmd /k "npx http-server -p 3001"
