# Archivo para descargar los iconos de fontawesome
from pathlib import Path
from subprocess import call

cwd: Path = Path().cwd().joinpath("datos")

if __name__ == "__main__":
    iconos_zip = cwd.joinpath("fontawesome-free-5.15.4-web.zip")
    iconos = cwd.joinpath("fontawesome-free-5.15.4-web")

    if iconos_zip.exists() and iconos.exists():
        print("Ya han sido descargados los iconos, terminando...")
        exit(0)  # Si ya existen los iconos, el programa termina

    if not iconos_zip.exists():
        print("Descargando iconos...", end=" ")
        if call(f"wget https://use.fontawesome.com/releases/v5.15.4/fontawesome-free-5.15.4-web.zip -P datos", shell=True) == 0:
            print("Hecho!")
        else:
            print(" ERROR ")

    if not iconos.exists() and iconos_zip.exists():
        print("Descomprimiendo iconos...", end=" ")

        if call(f"unzip {str(iconos_zip)} -d datos", shell=True) == 0:
            print("Hecho!")
        else:
            print(" ERROR ")
