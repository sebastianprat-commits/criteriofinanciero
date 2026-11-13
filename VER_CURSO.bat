@echo off
title Curso de valoracion - servidor local
cd /d "%~dp0"
echo.
echo  Abriendo el curso en el navegador...
echo  NO CIERRES ESTA VENTANA mientras lo uses.
echo  Para parar el servidor: Ctrl + C
echo.
start "" http://127.0.0.1:8000/curso/
"C:\AI\Proyectos\AgenteDocumentos\.venv\Scripts\python.exe" -m http.server 8000
