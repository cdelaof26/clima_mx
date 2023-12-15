/**
 * Componente de presentación, no requiere parámetros
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function ComponenteDePresentacion() {
    return <div className="lg:min-h-screen pb-10 lg:pb-0 bg-base-100">
        <div className="relative lg:min-h-screen h-max flex flex-col-reverse lg:grid lg:grid-cols-2">
            <div className="inset-y-0 top-0 right-0 z-0 w-full px-4 max-w-xl mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
                <svg className="absolute left-0 hidden h-full text-white dark:text-[#1E2329] transform -translate-x-1/2 lg:block" viewBox="0 0 100 100" fill="currentColor" preserveAspectRatio="none slice">
                    <path d="M50 0H100L50 100H0L50 0Z"></path>
                </svg>
                <img className="object-cover w-full h-56 md:h-96 lg:h-full rounded shadow-lg lg:rounded-none lg:shadow-none" src="/angel.jpeg" alt="Ángel de la independencia en la CDMX"/>
            </div>
            <div className="relative flex items-center justify-center">
                <div className="w-max lg:max-w-lg p-5">
                    <p className="mb-5 text-4xl lg:text-8xl font-bold tracking-tight sm:leading-none">
                        ClimaMX
                    </p>
                    <h2 className="mb-5 text-2xl lg:text-4xl font-bold tracking-tight sm:leading-none">
                        El clima del todo el país en <p className="bg-gradient-to-r from-cyan-600 to-blue-500 inline-block text-transparent bg-clip-text">un solo lugar</p>
                    </h2>
                    <p className="pr-5 mb-5 text-base md:text-lg text-justify">
                        Con nuestra aplicación web puede explorar el clima de toda la república mexicana con tan solo unos pocos clicks
                    </p>
                    <div className="flex justify-center">
                        <a href="#clima" className="btn btn-outline btn-wide btn-lg">Ir al App</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
