import { useState } from "react";

/**
 * Componente NavBar
 *
 * props es un arreglo de objetos, donde cada objeto es:
 *  {
 *      nombre: "nombreDelEstado",
 *      municipios: [
 *          "municipio1", "municipio2", ..., "municipioN"
 *      ]
 *  }
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function NavBarVer(props) {
    let cargarMunicipiosDefecto = () =>{
        let ciudad = "Ciudad de México";
        for (let i = 0; i < props.datos.length; i++)
            if (props.datos[i].nombre === ciudad)
                return props.datos[i].municipios;

        return [];
    }

    // municipios es un arreglo de cadenas
    const [municipios, setMunicipios] = useState(cargarMunicipiosDefecto());

    // estadoAsync es una cadena
    const [estadoAsync, setEstado] = useState("Ciudad de México");
    let estado = "";
    let i = 0;

    async function cargarDatosDeMunicipio(municipio, usarEstadoAsync) {
        if (municipio === '')
            return

        console.log("Build with: " + (usarEstadoAsync ? estadoAsync : estado) + " and " + municipio)

        try {
            const response = await fetch('/api/climaMunicipio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "estado": usarEstadoAsync ? estadoAsync : estado,
                        "municipio": municipio
                    }
                ),
            })

            let datos = await response.json();
            enviarDatosIndex(datos, (usarEstadoAsync ? estadoAsync : estado), municipio)
            console.log(datos);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    function cargarMunicipiosDeEstado(event) {
        estado = event.target.value;
        if (estado === '')
            estado = "Ciudad de México";

        for (i = 0; i < props.datos.length; i++) {
            if (props.datos[i].nombre === estado) {
                setMunicipios(props.datos[i].municipios);
                break;
            }
        }

        // Básicamente por la naturaleza asincrona de useState, estadoAsync no se actualiza de forma inmediata,
        // pero es necesario que sea inmediatamente para cargar los municipios.
        //
        // Si se declara estado como una variable con let, la variable queda fuera del alcance de cargarDatosDeMunicipio
        // si se llama de forma externa (en el onChange), por lo que se requiere que la variable sea un atributo
        // (que es básicamente usar useState).
        //
        // Por esa razón existe estado y estadoAsync
        //
        setEstado(estado);

        // Se usa props.datos[i].municipios[0] en lugar de municipios[0] por lo mismo de la asincronicidad, municipios
        // no se actualiza lo suficientemente rápido como para poder usarlo inmediatamente.
        cargarDatosDeMunicipio(props.datos[i].municipios[0], false);
    }
    //funcion que envia datos al index
    const enviarDatosIndex = (res, estado, municipio)=>{
        props.obtenerDatos(res);
        props.obtenerEstado(estado);
        props.obtenerMunicipio(municipio);
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
                    <select className="select select-bordered" onChange={(e) => cargarDatosDeMunicipio(e.target.value, true)} defaultValue="Gustavo A. Madero">
                        {municipios.map((municipio) => (
                            <option key={municipio} value={municipio}>{municipio}</option>
                        ))}
                    </select>
                </div>
            </div>
        </aside>
    );
}
