import { promises as fs } from 'fs';
import NavBarVer from './componentes/navBarVer';
import ComponenteDePresentacion from './componentes/presentacion';
import Pronostico from './componentesEstado/Pronostico';
import { useState } from "react";


export default function Home({ fechaDeRecopilacion: fechaDeRecopilacion, estados: datos, climaEscuela: dias }) {
    const[estado, setEstado]  = useState("Ciudad de México");
    const[municipio, setMunicipio] = useState("Gustavo A. Madero");
    const[diasDatos, setDiasDatos] = useState(dias);

    const recibirDatos = (res) => {
        setDiasDatos(res);
    }

    const recibirEstado = (estadoRecibido) => {
        setEstado(estadoRecibido)
    }

    const recibirMunicipio = (municipioRecibido) => {
        setMunicipio(municipioRecibido)
    }

    return (
        <main>
            <ComponenteDePresentacion></ComponenteDePresentacion>
            <div id="clima" className="md:flex">
                <NavBarVer datos={datos} obtenerDatos={recibirDatos} obtenerEstado={recibirEstado} obtenerMunicipio={recibirMunicipio}/>
                <Pronostico fecha={fechaDeRecopilacion} estado={estado} municipio={municipio} pronosticos={diasDatos}/>
            </div>
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

    const datos =  await fs.readFile(process.cwd() + '/datos/estados.json', 'utf8')
    const estados = JSON.parse(datos);
    const datosEscuela =  await fs.readFile(process.cwd() + '/datos/estados/Ciudad de México/Gustavo A. Madero.json', "utf8");
    const climaEscuela = JSON.parse(datosEscuela);

    return {
        props: {
            fechaDeRecopilacion, estados, climaEscuela
        }
    }
}
