@echo off
title CharityEvents - API Server
echo ===============================================
echo 🚀 Starting CharityEvents API (Port: 3000)
echo ===============================================

cd /d "%~dp0"

if not exist node_modules (
  echo  Installing dependencies...
  npm install
)

echo  Launching backend server...
cmd /k "npm run dev"
