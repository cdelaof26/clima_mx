import Head from "next/head";
import { promises as fs } from 'fs';

export default function Home({ estados: datos }) {
    return (
        <>
            <Head>
                <title>{"Clima MX"}</title>
            </Head>
            <main>
                {datos.map((estado) => (
                    <div> { estado.nombre } </div>
                ))}
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
