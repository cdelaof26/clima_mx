import { useState } from "react";

export default function NavBarVer(props) {
    const [municipios, setMunicipios] = useState([]);

    let cargarMunicipiosDeEstado = (event) => {
        let estado = event.target.value;
        if (estado === '')
            estado = "Ciudad de México";

        for (let i = 0; i < props.datos.length; i++) {
            if (props.datos[i].nombre === estado) {
                setMunicipios(props.datos[i].municipios);
                break;
            }
        }
    }

    return (
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-base-100 shadow-xl" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-base-100">
                <div className="flex justify-evenly ps-2.5 mb-5">
                    <i className="fa fa-cloud fa-2x"></i>
                    <span className="self-center text-xl font-semibold whitespace-nowrap">Clima MX</span>
                    <p></p>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Selecciona un estado</span>
                        <i className="fa fas fa-map"></i>
                    </label>
                    <select className="select select-bordered" defaultValue="Ciudad de México" onChange={cargarMunicipiosDeEstado}>
                        {props.datos.map((estado) => (
                            <option key={estado.nombre} value={estado.nombre}>{estado.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Selecciona un municipio</span>
                        <i className="fa fas fa-map-marker"></i>
                    </label>
                    <select className="select select-bordered">
                        {municipios.map((municipio) => (
                            <option key={municipio} value={municipio}>{municipio}</option>
                        ))}
                    </select>
                </div>
            </div>
        </aside>
    );
}
