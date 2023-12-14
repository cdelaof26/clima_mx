from urllib import request
from pathlib import Path
import utilidades
import re

# Este script hace web-scrapping y convierte un documento HTML (especifico) en un JSON
# con el objetivo de hacer el consumo del contenido más simple y práctico


def descargar_notas():
    if not notas_html.exists():
        direccion_url = "https://smn.conagua.gob.mx/tools/PHP/FindComunicados/index.php"
        lineas_html = request.urlopen(direccion_url).readlines()

        contenido = ""
        for _ in lineas_html:
            contenido += _.decode("utf-8")

        with open(notas_html, "w") as fichero:
            fichero.write(contenido)


cwd: Path = Path().cwd().joinpath("datos")
notas_html: Path = cwd.joinpath("notas.html")

if __name__ == "__main__":
    if not cwd.exists():
        cwd.mkdir()

    dia_de_consulta: str = utilidades.nombre_archivo_de_hoy(".smn")

    archivo_smn: Path = cwd.joinpath(dia_de_consulta)

    json_notas: Path = cwd.joinpath("notas.json")

    if not archivo_smn.exists():
        print("Descargando notas de prensa...", end=" ")
        utilidades.eliminar_archivo_por_extension(cwd, ".smn")
        descargar_notas()
        print("Hecho!")
    elif json_notas.exists():
        print("Ya han sido descargadas las notas de prensa, terminando...")
        exit(0)

    print("Procesando datos...", end=" ")
    with open(notas_html, "r") as archivo:
        datos_html = archivo.read()

    if not datos_html:
        exit(1)

    archivo_smn.touch()

    tabla_de_datos = re.findall(r"<table.*>[\w\W]+</table>", datos_html)
    if not tabla_de_datos:
        exit(1)

    datos: str = tabla_de_datos[0]
    datos = re.sub(r"<table.*>", "", datos)
    datos = re.sub(r"</table>", "", datos)
    datos = re.sub(r"<thead>[\w\W]+</thead>", "", datos)
    datos = re.sub(r"<tbody>", "", datos)
    datos = re.sub(r"</tbody>", "", datos)
    datos = re.sub(r"\n", "", datos)
    datos = re.sub(r" {2,}", "", datos)
    # datos = re.sub(r"[\w ]+-?[\w ]+\.pdf", "", datos)  # Para quitar la parte del comunicado
    datos = re.sub(r"<tr>", "", datos)
    datos = re.sub(r"<td>", "", datos)

    notas = datos.split("</td></tr>")

    """
        El archivo 'notas.json' tiene la forma:
        [
            {
                "titulo": "titulo_de_la_nota",
                "fecha": "YYYY-MM-DD HH:MM"
            }
            ...
        ]

        (es un arreglo de JSONs)
    """
    notas_lista_de_json = list()
    for i, nota in enumerate(notas):
        nota = re.sub(r"^\d+</td>", "", nota)
        nota = re.sub(r"</td>$", "", nota)
        if not nota:
            continue

        titulo, fecha, paper = nota.split("</td>")
        nota_json = "{" + f'"titulo": "{titulo.strip()}", "fecha": "{fecha.strip()}", "paper": "{paper.strip()}"' + "}"
        nota_json = nota_json.replace("'", '"')
        notas_lista_de_json.append(nota_json)
        if i == 7:
            break  # Solo se muestran las últimas 8 para evitar saturar la página de datos

    utilidades.guardar_archivo(json_notas, "[" + ", ".join(notas_lista_de_json) + "]")
    print("Hecho!")
