import {promises as fs} from "fs";
import NavBarVer from './componentes/navBarVer';


export default function Home({ estados: datos, climaEscuela: dias}) {
    console.log(datos)
    console.log(dias);
    function transformarFecha(fechaSinFormato){

        const anio = fechaSinFormato.slice(0, 4);
        const mes = fechaSinFormato.slice(4, 6);
        const dia = fechaSinFormato.slice(6, 8);

        return (`${anio}/${mes}/${dia}T00:00:00Z`)
    }
    return (
        <main>
            <NavBarVer datos={datos}/>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Abrir menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <div className="p-4 h-screen sm:ml-64 bg-gradient-to-t from-cyan-500 to-blue-500">
                <h1 className="mb-2 text-lg font-semibold text-white">
                    Ciudad de México
                </h1>
                <h2 className="mb-2 text-lg font-semibold text-white">
                    Datos del clima de la delegacion Gustavo A. Madero
                </h2>
                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                    {dias.map((dia) => (
                        <li className="pb-3 sm:pb-4" key={dia.ndia}>
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-white">
                                        Dia: {dia.ndia}
                                    </p>
                                    <p className="text-sm text-gray-100 truncate dark:text-white-400">
                                        Dia local: {transformarFecha(dia.dloc)}
                                    </p>
                                    <p className="text-sm text-gray-100 truncate dark:text-white-400">
                                        Cobertura de nubes: {dia.cc} %
                                    </p>
                                    <p className="text-sm text-gray-100 truncate dark:text-white-400">
                                        Temperatura Máxima: {dia.tmax} C°
                                    </p>
                                    <p className="text-sm text-gray-100 truncate dark:text-white-400">
                                        Temperatura Mínima: {dia.tmin} C°
                                    </p>
                                    <p className="text-sm text-gray-100 truncate dark:text-white-400">
                                        Probabilidad de precipitación: {dia.probprec} %
                                    </p>
                                </div>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}

export async function getStaticProps() {
    const datos =  await fs.readFile(process.cwd() + '/datos/estados.json', 'utf8')
    const estados = JSON.parse(datos);
    const datosEscuela =  await fs.readFile(process.cwd() + '/datos/estados/Ciudad de México/Gustavo A. Madero.json', "utf8");
    const climaEscuela = JSON.parse(datosEscuela);

    return {
        props: {
            estados,climaEscuela
        }
    }
}
