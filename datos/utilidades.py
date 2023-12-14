from pathlib import Path
from datetime import datetime

# Este archivo contiene utilidades para los archivos de para webscrapping y consumo de APIs


def agregar_punto_a_extension(extension: str) -> str:
    if not extension.startswith("."):
        extension = "." + extension
    return extension


def eliminar_archivo_por_extension(ruta: Path, extension: str):
    extension = agregar_punto_a_extension(extension)

    for elemento in ruta.iterdir():
        if elemento.suffix == extension:
            elemento.unlink()


def nombre_archivo_de_hoy(extension: str) -> str:
    extension = agregar_punto_a_extension(extension)
    return datetime.now().strftime("%Y_%m_%d") + extension


def guardar_archivo(ruta: Path, datos_archivo: str):
    with open(ruta, "w") as fichero:
        fichero.write(datos_archivo)
