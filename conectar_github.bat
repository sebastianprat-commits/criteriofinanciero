@echo off
echo.
echo  Conectar criteriofinanciero con GitHub
echo  ======================================
echo.
echo  Antes: crea el repositorio en GitHub (sin README, sin licencia).
echo  Copia la URL, por ejemplo: https://github.com/USUARIO/criteriofinanciero.git
echo.
set /p URL="Pega la URL del repositorio: "
if "%URL%"=="" goto fin
cd /d %~dp0
git remote remove origin 2>nul
git remote add origin %URL%
git push -u origin master
if errorlevel 1 git push -u origin main
echo.
echo  Hecho. Ahora en Netlify:
echo   Site configuration ^> Build and deploy ^> Link repository
echo   Repositorio, rama, comando de build vacio, directorio de publicacion: /
echo.
pause
:fin
