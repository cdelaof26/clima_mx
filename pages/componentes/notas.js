/**
 * Componente de notas de prensa
 * Require de las notas de prensa recuperadas
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Noticias(props) {
    if (props.noticias === undefined)
        return <></>;

    let columnas = []
    let elementosPorColumna = 2;
    for (let i = 0, j = 0; i < props.noticias.length; i += elementosPorColumna, j++) {
        columnas[j] = props.noticias.slice(i, i + elementosPorColumna)
        columnas[j].idKey = i;
    }

    return <div className="p-10 bg-base-300/100">
        <h2 className="mb-5 text-2xl lg:text-4xl font-bold tracking-tight sm:leading-none">
            Últimas notas de prensa del SMN
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {columnas.map((columna) => (
                <div key={columna.idKey} className="grid gap-4">
                    {columna.map((noticia) => (
                        <div key={columna.idKey + noticia.fecha} className="card bg-base-100 shadow-xl md:h-56 lg:h-72 xl:h-56">
                            <div className="card-body">
                                <h2 className="card-title text-justify">
                                    {noticia.titulo}
                                </h2>
                                <p></p>
                                <div className="card-actions justify-between">
                                    <a href={"https://smn.conagua.gob.mx/files/pdfs/comunicados-de-prensa/" + noticia.paper} className="btn btn-primary btn-xs">Link</a>
                                    <div>
                                        <div className="badge badge-outline">{noticia.fecha.split(" ")[0]}</div>
                                        <div className="badge badge-outline">{noticia.fecha.split(" ")[1] + " hrs"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
}
