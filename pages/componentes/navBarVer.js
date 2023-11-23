import Link from "next/link";
import {useState} from "react";
const  NavBarVer = ({datos}) => {
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');

    const toggleEstado = () =>{
        if (estadoSeleccionado !== ''){
            const linkClimaEstado = estadoSeleccionado;
        }
    }
    const opcionEstado = (event) =>{
        setEstadoSeleccionado(event.target.value);
    }

    return (
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-base-100 shadow-xl" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-base-100">
                <div className="flex justify-evenly ps-2.5 mb-5">
                    <i className="fa fa-cloud fa-2x "></i>
                    <span className="self-center text-xl font-semibold whitespace-nowrap">Clima MX</span>
                    <p></p>
                </div>
                <ul className="space-y-2 font-medium">
                    <li>
                        <button className="btn bg-base-100 w-56 flex justify-between" onClick={toggleEstado}>
                            <i className="fa fas fa-map fa-2x"></i>
                            <span className="ms-3">Estados</span>
                        </button>
                    </li>
                    <li>
                        <label htmlFor="underline_select" className="sr-only">Underline select</label>
                        <select id="underline_select" onChange={opcionEstado} className="block py-2.5 px-0 w-44 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                            <option defaultValue={"Selecciona un estado"}>Selecciona un estado</option>
                            {datos.map((estado) => (
                                <option key={estado.nombre} value={estado.nombre}>{estado.nombre}</option>
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
                            <option defaultValue={"Selecciona un municipio"}>Selecciona un municipio</option>
                        </select>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default NavBarVer;