from pathlib import Path
from urllib import request
import utilidades
import gzip
import json
import re


# Este script descarga y procesa los datos del clima del API del SMN,
# estos datos son descompuestos en JSON más pequeños para su visualización
# posterior de forma más eficiente y practica


class Estado:
    def __init__(self, nombre: str):
        self.nombre = nombre
        self._municipios = list()
        self.datos_municipios = list()

    def __iter__(self):
        self.indice = 0
        self.indice_datos = 0
        return self

    def __next__(self):
        if self.indice == len(self._municipios):
            raise StopIteration

        obj1, obj2 = self._municipios[self.indice], [self.datos_municipios[self.indice_datos + j] for j in range(4)]

        self.indice += 1
        self.indice_datos += 4
        return obj1, obj2

    def agregar_municipio(self, municipio: str):
        if municipio not in self._municipios:
            self._municipios.append(municipio)

    def get_municipios(self):
        return self._municipios


def filtrar_duplicados(elementos) -> list:
    _elementos = list()

    for elemento in elementos:
        if elemento not in _elementos:
            _elementos.append(elemento)

    return _elementos


def eliminar_carpeta(ruta: Path):
    if not ruta.exists():
        return

    directorios = [ruta]
    directorios_explorados = []
    while directorios:
        dir0 = directorios.pop(0)
        for elemento in dir0.iterdir():
            if elemento.is_dir():
                directorios.append(elemento)
                continue

            elemento.unlink()

        directorios_explorados.insert(0, dir0)

    for _ in directorios_explorados:
        _.rmdir()


def descargar_y_desempaquetar_clima() -> bool:
    url = "https://smn.conagua.gob.mx/tools/GUI/webservices/index.php?method=1"
    if json_daily_gz.exists():
        json_daily_gz.unlink()

    if json_daily.exists():
        json_daily.unlink()

    request.urlretrieve(url, json_daily_gz)

    if json_daily_gz.exists():
        with gzip.open(json_daily_gz, "rb") as fichero:
            with open(json_daily, "w") as fichero_json:
                fichero_json.write(str(fichero.read().decode('utf-8')))

    return json_daily_gz.exists()


cwd: Path = Path().cwd().joinpath("datos")
json_daily: Path = cwd.joinpath("DailyForecast_MX")
json_daily_gz = cwd.joinpath("DailyForecast_MX.gz")

if __name__ == "__main__":
    if not cwd.exists():
        cwd.mkdir()

    dia_de_consulta: str = utilidades.nombre_archivo_de_hoy(".ddc")

    archivo_ddc: Path = cwd.joinpath(dia_de_consulta)
    directorio_ddc: Path = cwd.joinpath("estados")

    json_estados: Path = cwd.joinpath("estados.json")

    if not archivo_ddc.exists():
        print("Descargando clima...", end=" ")
        eliminar_carpeta(directorio_ddc)
        utilidades.eliminar_archivo_por_extension(cwd, ".ddc")
        descargar_y_desempaquetar_clima()
        print("Hecho!")
    elif json_estados.exists():
        print("Ya ha sido descargado el clima, terminando...")
        exit(0)  # Si ya existen los json, el programa termina

    print("Procesando datos...", end=" ")
    with open(json_daily, "r") as archivo:
        datos_json_str = archivo.read()

    if not datos_json_str:
        exit(1)

    archivo_ddc.touch()
    if not directorio_ddc.exists():
        directorio_ddc.mkdir()

    # Quitamos lo que no nos sirva
    # id estado
    datos_json_str = re.sub(r"\"ides\": \".*?\",", "", datos_json_str)
    # id municipio
    datos_json_str = re.sub(r"\"idmun\": \".*?\",", "", datos_json_str)
    # latitud
    datos_json_str = re.sub(r"\"lat\": \".*?\",", "", datos_json_str)
    # longitud
    datos_json_str = re.sub(r"\"lon\": \".*?\",", "", datos_json_str)
    # Diferencia respecto a hora UTC
    datos_json_str = re.sub(r"\"dh\": \".*?\",", "", datos_json_str)

    clima_json = json.loads(datos_json_str)  # Nos devuelve una lista de diccionarios

    estados = list()
    estados_directorios = list()

    for clima in clima_json:
        # nombre_de_estado = clima.pop("nes")
        nombre_de_estado = clima.pop("nes")
        if not estados:
            estados.append(Estado(nombre_de_estado))

        indice = -1
        for i, estado in enumerate(estados):
            if nombre_de_estado == estado.nombre:
                indice = i
                estados[i].agregar_municipio(clima.pop("nmun"))
                estados[i].datos_municipios.append(clima)
                break

        if indice == -1:
            estados.append(Estado(nombre_de_estado))
            estados[-1].agregar_municipio(clima.pop("nmun"))
            estados[-1].datos_municipios.append(clima)

        estado_dir = directorio_ddc.joinpath(nombre_de_estado)
        if estado_dir not in estados_directorios:
            estados_directorios.append(estado_dir)

        if not estado_dir.exists():
            estado_dir.mkdir()

    """
        El archivo 'estados.json' tiene la forma:
        [
            {
                "nombre": "nombre_de_estado",
                "municipios": [ ... ]
            }
            ...
        ]
        
        (es un arreglo de JSONs)
    """
    estados_lista_de_json = list()
    for estado, directorio in zip(estados, estados_directorios):
        nuevo_estado_json = "{" + f'"nombre": "{estado.nombre}", "municipios": {estado.get_municipios()}' + "}"
        nuevo_estado_json = nuevo_estado_json.replace("'", '"')
        estados_lista_de_json.append(nuevo_estado_json)

        for nombre_de_municipio, datos in estado:
            municipio_json = directorio.joinpath(nombre_de_municipio + ".json")
            utilidades.guardar_archivo(municipio_json, str(datos).replace("'", '"'))

    utilidades.guardar_archivo(json_estados, "[" + ", ".join(estados_lista_de_json) + "]")
    print("Hecho!")
