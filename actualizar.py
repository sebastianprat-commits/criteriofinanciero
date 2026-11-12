"""
Reconstruye el sitio de CriterioFinanciero tras generar análisis nuevos.

Uso:
    python actualizar.py
    python actualizar.py --publicar     (además hace commit)

Hace, en orden:
  1. Páginas legales y de gracias
  2. Repositorio con precios recalculados
  3. Checkout
  4. (opcional) commit en git
"""

from __future__ import annotations

import subprocess
import sys
from datetime import datetime
from pathlib import Path

AQUI = Path(__file__).resolve().parent
PY = Path(r"C:\AI\Proyectos\AgenteDocumentos\.venv\Scripts\python.exe")

PASOS = [
    ("Páginas legales y gracias", "generar_paginas.py"),
    ("Repositorio de informes", "generar_repositorio.py"),
    ("Checkout", "generar_checkout.py"),
]


def ejecutar(script: str) -> bool:
    resultado = subprocess.run(
        [str(PY), str(AQUI / script)],
        capture_output=True, text=True, encoding="utf-8", errors="ignore",
    )
    salida = (resultado.stdout or "").strip()
    for linea in salida.splitlines()[-6:]:
        print(f"    {linea}")
    if resultado.returncode != 0:
        print(f"    ERROR: {(resultado.stderr or '').strip()[:300]}")
    return resultado.returncode == 0


def main() -> None:
    print(f"Actualizando el sitio · {datetime.now():%d/%m/%Y %H:%M}\n")
    for nombre, script in PASOS:
        print(f"  {nombre}")
        if not ejecutar(script):
            sys.exit(f"No se pudo completar: {script}")

    if "--publicar" in sys.argv:
        print("\n  Confirmando cambios en git")
        for comando in (["add", "-A"],
                        ["-c", "core.quotepath=false", "commit", "-q",
                         "-m", f"Actualización automática {datetime.now():%Y-%m-%d %H:%M}"]):
            subprocess.run(["git", *comando], cwd=AQUI, capture_output=True)
        log = subprocess.run(["git", "log", "--oneline", "-1"], cwd=AQUI,
                             capture_output=True, text=True, encoding="utf-8")
        print(f"    {log.stdout.strip()}")
        print("\n  Recuerda desplegar la carpeta en Netlify para publicarlo.")
    else:
        print("\n  Listo. Añade --publicar para confirmar los cambios en git.")


if __name__ == "__main__":
    main()
