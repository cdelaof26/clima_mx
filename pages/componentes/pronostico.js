import { useEffect, useState } from 'react';

/**
 * Recorta el decimal de una cadena
 *
 * @param valor
 * @param terminacion es una cadena que se agrega al final, pensado para poner 'º' o '%'
 * @returns {string}
 */
function formatearDecimal(valor, terminacion) {
    valor = valor.toString();
    return valor.substring(0, valor.indexOf(".")) + terminacion;
}

/**
 * Transforma la fecha sin formato a una cadena de la forma YYYY-MM-DD
 *
 * @param fechaSinFormato
 * @returns {string}
 */
function transformarFecha(fechaSinFormato){
    const anio = fechaSinFormato.slice(0, 4);
    const mes = fechaSinFormato.slice(4, 6);
    const dia = fechaSinFormato.slice(6, 8);

    return (`${anio}-${mes}-${dia}`)
}

/**
 * Obtiene un icono de FontAwesome dependiendo de la cobertura de nubes y la probabilidad de la lluvia
 *
 * @param coberturaDeNubes
 * @param probabilidadDeLluvia
 * @returns {string}
 */
function obtenerIconoDeClima(coberturaDeNubes, probabilidadDeLluvia) {
    let fCoberturaDeNubes = parseFloat(coberturaDeNubes);
    let fProbabilidadDeLluvia = parseFloat(probabilidadDeLluvia);

    if (fProbabilidadDeLluvia > 40 && fProbabilidadDeLluvia < 70)
        return "fa fa-cloud-rain";
    if (fProbabilidadDeLluvia > 69)
        return "fa fa-cloud-showers-heavy";

    if (fCoberturaDeNubes > 40)
        return "fa fa-cloud";

    let tiempoAhora = Date.now();
    let fecha = new Date;
    fecha.setTime(tiempoAhora);
    let hora = fecha.getHours();

    if (hora > 6 && hora < 18)
        return "fa fa-sun";

    return "fa fa-moon";
}

/**
 * Componente Tarjeta
 *
 * @param props objeto de datos: cc, probprec, dloc, tmax, tmin
 * @returns {JSX.Element}
 * @constructor
 */
function TarjetaPronostico(props) {
    return (
        <div className="w-max h-92 mt-4 mb-4 bg-base-100 shadow-xl rounded-3xl">
            <div className="rounded-lg p-6" id="stats" role="tabpanel" aria-labelledby="stats-tab">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight dark:text-white">Pronóstico para el día {props.datos.ndia}</h5>
                <dl className="grid gap-6 xl:grid-cols-3 md:grid-cols-2 xl:p-12 lg:p-9 md:p-6 mx-auto text-gray-900 dark:text-white">
                    <div className="flex flex-col items-center justify-center">
                        <i className={obtenerIconoDeClima(props.datos.cc, props.datos.probprec) + " dark:fa-inverse fa-3x" + " fa-2x"}></i>
                        <dd className="text-gray-500 dark:text-gray-400">{transformarFecha(props.datos.dloc)}</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">{formatearDecimal(props.datos.tmax, "º")}</dt>
                        <dd className="text-gray-500 dark:text-gray-400">Temperatura máxima</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">{formatearDecimal(props.datos.tmin, "º")}</dt>
                        <dd className="text-gray-500 dark:text-gray-400">Temperatura mínima</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">{formatearDecimal(props.datos.probprec, "%")}</dt>
                        <dd className="text-gray-500 dark:text-gray-400">Probabilidad de lluvía</dd>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">{formatearDecimal(props.datos.cc, "%")}</dt>
                        <dd className="text-gray-500 dark:text-gray-400">Cobertura de nubes</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}

/**
 * Componente Pronostico, este componente contiene 4 componentes TarjetaPronostico
 *
 * @param props objeto de datos: estado, municipio, fecha, arregloDeDatos: [cc, probprec, dloc, tmax, tmin]
 * @returns {JSX.Element}
 * @constructor
 */
export default function Pronostico(props) {
    if (props.pronosticos === undefined)
        return <></>;

    const [bg1, setBG1] = useState("from-black");
    const [bg2, setBG2] = useState("to-black");
    const [bg3, setBG3] = useState("");

    const cambiarBG = () => {
        let tiempoAhora = Date.now();
        let fecha = new Date;
        fecha.setTime(tiempoAhora);
        let hora = fecha.getHours();
        hora += fecha.getMinutes() / 60;

        if (hora >= 0 && hora < 1.5) {
            setBG1("from-[#2C499C] from-1%"); // bottom
            setBG2("to-[#070024]"); // top
        }

        if (hora >= 1.5 && hora < 3 || hora >= 22.5 && hora < 24) {
            setBG1("from-[#2C499C] from-20%"); // bottom
            setBG2("to-[#070024]"); // top
        }

        if (hora >= 3 && hora < 4.5 || hora >= 21 && hora < 22.5) {
            setBG1("from-[#887B72] from-1%"); // bottom
            setBG2("to-[#1B2240]"); // top
            setBG3("via-[#042174] via-15%"); // middle
        }

        if (hora >= 4.5 && hora < 6 || hora >= 19.5 && hora < 21) {
            setBG1("from-[#C1843B]"); // bottom
            setBG2("to-[#27283E]"); // top
            setBG3("via-[#3D3D59] via-25%"); // middle
        }

        if (hora >= 6 && hora < 7.5 || hora >= 18 && hora < 19.5) {
            setBG1("from-[#DE6B2E]"); // bottom
            setBG2("to-[#3C2E31]"); // top
            setBG3("via-[#5E4540]"); // middle
        }

        if (hora >= 7.5 && hora < 9 || hora >= 16.5 && hora < 18) {
            setBG1("from-[#EBA841]"); // bottom
            setBG2("to-[#373C66]"); // top
            setBG3("via-[#545782] via-30%"); // middle
        }

        if (hora >= 9 && hora < 10.5 || hora >= 15 && hora < 16.5) {
            setBG1("from-[#F2C880]"); // bottom
            setBG2("to-[#344898]"); // top
            setBG3("via-[#5167C2] via-20%"); // middle
        }

        if (hora >= 10.5 && hora < 12 || hora >= 13.5 && hora < 15) {
            setBG1("from-[#E4D7C7]"); // bottom
            setBG2("to-[#4361C9]"); // top
            setBG3("via-[#5274EE] via-10%"); // middle
        }

        if (hora >= 12 && hora < 13.5) {
            setBG1("from-[#A6B5ED]"); // bottom
            setBG2("to-[#4A79F9]"); // top
            setBG3("via-[#5274EE] via-10%"); // middle
        }
    }

    useEffect(()=>{
        setInterval(() => {
            cambiarBG();
        }, 1500);
    },[])

    return (
        <div className={`p-4 min-h-screen h-max w-full bg-gradient-to-t ${bg1} ${bg3} ${bg2}`}>
            <h1 className="mb-2 text-4xl font-semibold text-white">Pronóstico del clima en {props.municipio}, {props.estado}</h1>
            <h4 className="mb-2 font-semibold text-white">Datos recopilados el día {props.fecha}</h4>
            <div className="grid gap-2 justify-items-center lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
                {props.pronosticos.map((pronostico) => (
                    <TarjetaPronostico key={pronostico.ndia} datos={pronostico}/>
                ))}
            </div>
            <div></div>
        </div>
    );
}
