import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Link } from "@nextui-org/react";

const PageNotFound = () => {
    return (
        <section class="bg-white dark:bg-zinc-900 ">
            <div class="container flex items-center justify-center min-h-screen px-6 py-12 mx-auto">
                <div class="w-full ">
                    <div class="flex flex-col items-center max-w-lg mx-auto text-center">
                        <p class="text-sm font-medium text-blue-500 dark:text-blue-400">
                            ERROR 404
                        </p>
                        <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
                            No encontramos esta página
                        </h1>
                        <p class="mt-4 text-gray-500 dark:text-gray-400">
                            Buscamos por todas partes, pero no pudimos encontrar lo que buscas. Busquemos un lugar mejor para que vayas.
                        </p>

                        <div class="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                            <Button variant="shadow" as={Link} href="/home" startContent={<FontAwesomeIcon icon={faArrowLeft}/>}>
                                Regresar
                            </Button>
                            <Button variant="shadow" color="primary" as={Link} href="/home" startContent={<FontAwesomeIcon icon={faHome}/>}>
                                Ir a Inicio
                            </Button>
                        </div>
                    </div>

                    <div class="grid w-full max-w-6xl grid-cols-1 gap-8 mx-auto mt-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div class="p-6 rounded-lg bg-blue-50 dark:bg-zinc-800">
                            <span class="text-gray-500 dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </span>
                            
                            <h3 class="mt-6 font-medium text-gray-700 dark:text-gray-200 ">
                                Seguros
                            </h3>

                            <p class="mt-2 text-gray-500 dark:text-gray-400 ">
                                Descubre nuestros seguros y protege lo que más quieres.
                            </p>

                            <Link isBlock showAnchorIcon href="/home" color="primary" className="mt-5">
                                Ver seguros
                            </Link>
                        </div>

                        <div class="p-6 rounded-lg bg-blue-50 dark:bg-zinc-800">
                            <span class="text-gray-500 dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                </svg>
                            </span>
                            
                            <h3 class="mt-6 font-medium text-gray-700 dark:text-gray-200 ">
                                Servicios
                            </h3>

                            <p class="mt-2 text-gray-500 dark:text-gray-400 ">
                                Descubre nuestros servicios y disfruta de la mejor experiencia.
                            </p>

                            <Link isBlock showAnchorIcon href="/home" color="primary" className="mt-5">
                                Ver servicios
                            </Link>
                        </div>

                        <div class="p-6 rounded-lg bg-blue-50 dark:bg-zinc-800">
                            <span class="text-gray-500 dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                                </svg>
                            </span>
                            
                            <h3 class="mt-6 font-medium text-gray-700 dark:text-gray-200 ">
                                Ayuda
                            </h3>

                            <p class="mt-2 text-gray-500 dark:text-gray-400 ">
                                ¿Necesitas ayuda? Nuestro equipo está aquí para ayudarte.
                            </p>

                            <Link isBlock showAnchorIcon href="/home" color="primary" className="mt-5">
                                Contactar soporte
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PageNotFound;