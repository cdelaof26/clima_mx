import { Html, Head, Main, NextScript } from 'next/document';
import Header from './componentes/header';

export default function Document() {
  return (
    <Html lang="es">
        <Head>
            <Header/>
        </Head>
        <body>
        <Main />
        <NextScript />

        </body>
    </Html>
  )
}
