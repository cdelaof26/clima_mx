import Head from "next/head";
import { promises as fs } from 'fs';

export default function Home({ estados: datos }) {
    return (
        <>
            <Head>
                <title>{"Clima MX"}</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            </Head>
            <main>

                <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Abrir menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>

                <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-base-100 shadow-xl" aria-label="Sidebar">
                    <div className="h-full px-3 py-4 overflow-y-auto bg-base-100">
                        <div className="flex justify-evenly ps-2.5 mb-5">
                            <i className="fa fa-cloud fa-2x "></i>
                            <span className="self-center text-xl font-semibold whitespace-nowrap">Clima MX</span>
                            <p></p>
                        </div>
                        <ul className="space-y-2 font-medium">
                            <li>
                                <button className="btn bg-base-100 w-56 flex justify-between">
                                    <i className="fa fas fa-map fa-2x"></i>
                                    <span className="ms-3">Estados</span>
                                </button>
                            </li>
                            <li>
                                <label htmlFor="underline_select" className="sr-only">Underline select</label>
                                <select id="underline_select" className="block py-2.5 px-0 w-44 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                    <option selected>Selecciona un estado</option>
                                    {datos.map((estado) => (
                                        <option value={estado.nombre}>{estado.nombre}</option>
                                    ))}
                                </select>
                            </li>
                            <li>
                                <button className="btn btn-ghost w-56 flex justify-between">
                                    <i className="fa fas fa-map-marker fa-2x"></i>
                                    <span className="ms-3">Municipios</span>
                                </button>
                            </li>
                            <li>
                                <label htmlFor="underline_select" className="sr-only">Underline select</label>
                                <select id="underline_select" className="block py-2.5 px-0 w-44 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                    <option selected>Selecciona un municipio</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className="p-4 h-screen sm:ml-64 bg-gradient-to-t from-cyan-500 to-blue-500">
                    <p className="text-white">
                        Aquí van los datos del clima
                    </p>
                </div>
            </main>
        </>
    )
}

export async function getStaticProps() {
    const datos = await fs.readFile(process.cwd() + '/datos/estados.json', 'utf8')
    const estados = JSON.parse(datos);

    return {
        props: {
            estados
        }
    }
}
