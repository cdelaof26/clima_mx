import { promises as fs } from 'fs';
import NavBarVer from './componentes/navBarVer';
import ComponenteDePresentacion from './componentes/presentacion';
import Noticias from './componentes/notas';
import Pronostico from './componentes/pronostico';
import { useState } from "react";


export default function Home({ fechaDeRecopilacion: fechaDeRecopilacion, estados: datos, jsonClimaGustavoAMadero: dias, noticias: notas }) {
    const[estado, setEstado]  = useState("Ciudad de México");
    const[municipio, setMunicipio] = useState("Gustavo A. Madero");
    const[diasDatos, setDiasDatos] = useState(dias);

    const[etiquetaDeErrorVisible, setEtiquetaDeErrorVisible] = useState(false);

    const recibirDatos = (res) => {
        setDiasDatos(res);
    }

    const recibirEstado = (estadoRecibido) => {
        setEstado(estadoRecibido)
    }

    const recibirMunicipio = (municipioRecibido) => {
        setMunicipio(municipioRecibido)
    }

    const mostrarEtiquetaDeError = () => {
        setEtiquetaDeErrorVisible(true)
    }

    return (
        <main>
            <ComponenteDePresentacion></ComponenteDePresentacion>
            <Noticias noticias={notas}></Noticias>
            <div id="clima" className="md:flex">
                <NavBarVer datos={datos} obtenerDatos={recibirDatos} obtenerEstado={recibirEstado} obtenerMunicipio={recibirMunicipio} mostrarEtiquetaDeError={mostrarEtiquetaDeError}/>
                <div className={"toast toast-end " + (etiquetaDeErrorVisible ? "": "hidden")} onClick={() => (setEtiquetaDeErrorVisible(false))}>
                    <div className="alert alert-error justify-between">
                        <i className="fa fa-exclamation-triangle fa-2x"></i>
                        <span>Ocurrió un error al cargar los datos del clima.<br></br>Intenta de nuevo</span>
                    </div>
                </div>
                <Pronostico fecha={fechaDeRecopilacion} estado={estado} municipio={municipio} pronosticos={diasDatos}/>
            </div>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p>Copyright © 2023 - cdelaof26 y ZeroMaru001</p>
                </aside>
            </footer>
        </main>
    )
}

export async function getStaticProps() {
    // Este for busca por el archivo .ddc en la ruta /cwd()/datos/ que es creado por Python al momento de la ejecución
    // esto para obtener la fecha de creación de los datos
    const datosDir = await fs.readdir(process.cwd() + '/datos/')
    let fechaDeRecopilacion;
    for (const filename of datosDir)
        if (filename.toString().endsWith(".ddc")) {
            fechaDeRecopilacion = filename.toString().replaceAll("_", "-").replace(".ddc", "");
            break;
        }

    const estadosJson =  await fs.readFile(process.cwd() + '/datos/estados.json', 'utf8')
    const estados = JSON.parse(estadosJson);
    const datosDeClimaEnGustavoAMadero =  await fs.readFile(process.cwd() + '/datos/estados/Ciudad de México/Gustavo A. Madero.json', "utf8");
    const jsonClimaGustavoAMadero = JSON.parse(datosDeClimaEnGustavoAMadero);

    const datosDeNoticias =  await fs.readFile(process.cwd() + '/datos/notas.json', "utf8");
    const noticias = JSON.parse(datosDeNoticias);

    return {
        props: {
            fechaDeRecopilacion, estados, jsonClimaGustavoAMadero, noticias
        }
    }
}
