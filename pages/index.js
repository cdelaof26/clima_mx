import { promises as fs } from 'fs';
import NavBarVer from './componentes/navBarVer';
import Pronostico from './componentesEstado/Pronostico';


export default function Home({ fechaDeRecopilacion: fechaDeRecopilacion, estados: datos, climaEscuela: dias }) {
    // console.log(datos)
    // console.log(dias);
    return (
        <main>
            <NavBarVer datos={datos}/>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Abrir menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <Pronostico fecha={fechaDeRecopilacion} estado="Ciudad de México" municipio="Gustavo A. Madero" pronosticos={dias}/>
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
