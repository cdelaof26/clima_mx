
export default function ComponenteDePresentacion() {
    return <div className="h-screen bg-base-100">
        <div className="relative lg:h-full flex flex-col-reverse lg:py-32 ">
            <div className="inset-y-0 top-0 right-0 z-0 w-full px-4 max-w-xl mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
                <svg className="absolute left-0 hidden h-full text-white dark:text-[#1E2329] transform -translate-x-1/2 lg:block" viewBox="0 0 100 100" fill="currentColor" preserveAspectRatio="none slice">
                    <path d="M50 0H100L50 100H0L50 0Z"></path>
                </svg>
                <img className="object-cover w-full h-56 md:h-96 lg:h-full rounded shadow-lg lg:rounded-none lg:shadow-none" src="/angel.jpeg" alt="Ángel de la independencia en la CDMX"/>
            </div>
            <div className="relative flex flex-col items-start md:mx-56 lg:mx-36 xl:mx-56 lg:my-28 xl:my-24 p-5">
                <div className="lg:mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
                    <p className="mb-5 text-4xl lg:text-8xl font-bold tracking-tight sm:leading-none">
                        ClimaMX
                    </p>
                    <h2 className="mb-5 text-1xl lg:text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none">
                        El clima del todo el país en <p className="bg-gradient-to-r from-cyan-600 to-blue-500 inline-block text-transparent bg-clip-text">un solo lugar</p>
                    </h2>
                    <p className="pr-5 mb-5 text-base md:text-lg">
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
