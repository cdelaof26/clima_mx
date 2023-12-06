import fs from 'fs';

/**
 * Endpoint para leer datos dado un estado y un municipio, la petición debe ser POST
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' });
        return;
    }

    const estado = req.body["estado"];
    const municipio = req.body["municipio"];

    console.log("leer; estado: " + estado + ", municipio: " + municipio);

    if (estado.includes('"') || estado.includes('/') || estado.includes("'") || municipio.includes("\\")) {
        res.status(400).send({ message: "Illegal Request Body"});
        return;
    }

    if (municipio.includes('"') || municipio.includes('/') || municipio.includes("'") || municipio.includes("\\")) {
        res.status(400).send({ message: "Illegal Request Body"});
        return;
    }

    try {
        const datosDeArchivo = fs.readFileSync(process.cwd() + '/datos/estados/' + estado + '/' + municipio + '.json', 'utf8');
        res.status(200).send(JSON.parse(datosDeArchivo));
    } catch (error) {
        console.error('Error al leer el archivo file:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}