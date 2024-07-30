import React from "react";

import { Button, Link } from '@nextui-org/react';

const Home = () => {
    return (
        <>
        <section className="py-24 ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-14 text-center">
                    <h2 className="text-4xl text-center font-bold text-gray-900 dark:text-zinc-200 leading-[3.25rem] mb-6 max-w-max lg:max-w-3xl lg:mx-auto">
                        La mejor protección para tu auto, con la confianza de siempre
                    </h2>
                    <p className="text-base font-normal text-gray-500 dark:text-zinc-400 lg:max-w-2xl lg:mx-auto mb-8">
                        Asegura tu vehículo de forma rápida y fácil con nuestras soluciones personalizadas. Protege tu inversión con la mejor cobertura.
                    </p>  
                    <div className="flex flex-col justify-center md:flex-row gap-5 max-w-lg mx-auto md:max-w-2xl lg:max-w-full">   
                        <Button size="lg" as={Link} href="/quote-insurance" variant="shadow" radius="full" color="secondary">
                            Cotiza ahora
                        </Button>
                        <a href="javascript:;"  className="cursor-pointer bg-indigo-50 py-3 px-6 rounded-full flex items-center justify-center  text-sm font-semibold text-indigo-600 transition-all duration-500 focus:outline-none hover:bg-indigo-100">
                            Saber más
                        </a>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-lg mx-auto md:max-w-2xl lg:max-w-full">
                    <div className="relative w-full h-auto md:col-span-2">
                        <div className="bg-gray-800 rounded-2xl flex  justify-between flex-row flex-wrap">
                            <div className="p-5  xl:p-8 w-full md:w-1/2 ">
                                <div className="block">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 12.5V18.75M18.75 2.5L11.25 2.5M15 28.75C8.7868 28.75 3.75 23.7132 3.75 17.5C3.75 11.2868 8.7868 6.25 15 6.25C21.2132 6.25 26.25 11.2868 26.25 17.5C26.25 23.7132 21.2132 28.75 15 28.75Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>                                    
                                </div>
                                <h3 className="text-lg font-bold xl:text-xl text-white py-5 w-full xl:w-64">
                                    Protección rápida y sencilla en línea.
                                </h3>
                                <p className="text-xs font-normal text-gray-300 w-full mb-8 xl:w-64">
                                    Obtén tu cotización y cobertura en menos de 10 minutos, sin papeleo ni esperas.
                                </p>
                                <button className="py-2 px-5 border border-solid border-gray-300 rounded-full gap-2 text-xs text-white font-semibold flex items-center justify-between transition-all duration-500 hover:bg-white/5">
                                    Ver más
                                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                        
                                </button>
                            </div>
                            <div className="relative hidden h-auto md:w-1/2 md:block">
                                <img src="https://pagedone.io/asset/uploads/1695028873.png" alt="Header tailwind Section" className="h-full ml-auto"/>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full h-auto">
                        <div className="bg-indigo-500 rounded-2xl p-5  xl:p-8 h-full">
                            <div className="block">
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.6429 11.4286C24.6429 14.3872 20.2457 16.7857 14.8214 16.7857C9.3972 16.7857 5 14.3872 5 11.4286M24.6429 16.7857C24.6429 19.7444 20.2457 22.1429 14.8214 22.1429C9.3972 22.1429 5 19.7444 5 16.7857M24.6429 22.1429C24.6429 25.1015 20.2457 27.5 14.8214 27.5C9.3972 27.5 5 25.1015 5 22.1429M24.6429 6.96429C24.6429 9.42984 20.2457 11.4286 14.8214 11.4286C9.3972 11.4286 5 9.42984 5 6.96429C5 4.49873 9.3972 2.5 14.8214 2.5C20.2457 2.5 24.6429 4.49873 24.6429 6.96429Z" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                                    </svg>                                
                            </div>
                            <h3 className="py-5 text-white text-lg font-bold xl:text-xl">
                                Tecnología avanzada 
                            </h3>
                            <p className="text-xs font-normal text-white mb-8">
                                Hemos reemplazado los procesos antiguos con tecnología de última generación para ofrecerte más valor.
                            </p>
                            <button className="py-2 px-5 border border-solid border-gray-300 rounded-full gap-2 text-xs text-white font-semibold flex items-center justify-between transition-all duration-500 hover:bg-white/5">
                                Ver más
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                    
                            </button>
                        </div>
                    </div>
                    <div className="relative w-full h-auto">
                        <div className="bg-violet-500 rounded-2xl p-5 xl:p-8 h-full">
                            <div className="block">
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M26.7301 15.661C26.7301 22.1995 21.306 27.5 14.6151 27.5C7.9241 27.5 2.5 22.1995 2.5 15.661C2.5 9.1225 7.9241 3.822 14.6151 3.822M18.1313 10.1507L18.1313 4.85383C18.1313 3.22503 19.6455 2.00299 21.1519 2.70013C23.7608 3.90751 26.6177 6.25557 27.456 10.2563C27.7542 11.6798 26.4931 12.8563 25.0064 12.8368L20.7873 12.7814C19.3147 12.762 18.1313 11.5899 18.1313 10.1507Z" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                                    </svg>
                                                                    
                            </div>
                            <h3 className="py-5 text-white text-lg font-bold xl:text-xl">
                                Cobertura a nivel nacional
                            </h3>
                            <p className="text-xs font-normal text-white mb-8">
                                Nuestra póliza está diseñada para ofrecerte protección completa en todo el país. 
                            </p>
                            <button className="py-2 px-5 border border-solid border-gray-300 rounded-full gap-2 text-xs text-white font-semibold flex items-center justify-between transition-all duration-500 hover:bg-white/5">
                                Ver más
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                    
                            </button>
                        </div>
                    </div>
                
                </div>
            </div>
        </section>


        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 lg:mb-16 flex justify-center items-center flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between max-md:max-w-lg max-md:mx-auto">
                    <div className="relative w-full text-center lg:text-left lg:w-2/4">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-200 leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0">
                            Protege tu auto con los mejores beneficios
                        </h2>
                    </div>
                    <div className="relative w-full text-center lg:text-left lg:w-2/4">
                        <p className="text-lg font-normal text-gray-500 dark:text-gray-300 mb-5">
                            Ofrecemos seguros de autos con coberturas amplias y ventajas que simplifican tu vida.
                        </p>
                        <a href="#" className="flex flex-row items-center justify-center gap-2 text-base font-semibold text-indigo-600 lg:justify-start hover:text-indigo-700">
                            Más información
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
                    <div className="group relative w-full bg-gray-100 dark:bg-zinc-800 hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4">
                        <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.5 7.5H7.5C6.11929 7.5 5 8.61929 5 10V22.5C5 23.8807 6.11929 25 7.5 25H22.5C23.8807 25 25 23.8807 25 22.5V10C25 8.61929 23.8807 7.5 22.5 7.5ZM20 20H10V15H20V20ZM10 13H20V10H10V13Z" stroke="#4F46E5" stroke-width="2"></path>
                            </svg>
                        </div>
                        <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-300 mb-3 capitalize transition-all duration-500 group-hover:text-white">Cobertura Integral</h4>
                        <p className="text-sm font-normal text-gray-500 dark:text-zinc-400 transition-all duration-500 leading-5 group-hover:text-white">
                            Protege tu auto con una cobertura que se adapta a tus necesidades y garantiza seguridad en todo momento.
                        </p>
                    </div>
                    <div className="group relative w-full bg-gray-100 dark:bg-zinc-800 hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4">
                        <div class="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.0067 10V15.6652C15.0067 16.0358 15.1712 16.3873 15.4556 16.6248L18.75 19.375M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div>
                        <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-300 mb-3 capitalize transition-all duration-500 group-hover:text-white">Asistencia 24/7</h4>
                        <p className="text-sm font-normal text-gray-500 dark:text-zinc-400 transition-all duration-500 leading-5 group-hover:text-white">
                            Estamos disponibles las 24 horas del día para ofrecerte asistencia en cualquier situación de emergencia.
                        </p>
                    </div>
                    <div className="group relative w-full bg-gray-100 dark:bg-zinc-800 hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4">
                        <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 5V25M5 15H25" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div>
                        <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-300 mb-3 capitalize transition-all duration-500 group-hover:text-white">Fácil Proceso de Reclamo</h4>
                        <p className="text-sm font-normal text-gray-500 dark:text-zinc-400 transition-all duration-500 leading-5 group-hover:text-white">
                            Simplificamos el proceso de reclamo para que puedas resolver cualquier incidente de manera rápida y sencilla.
                        </p>
                    </div>
                    <div className="group relative w-full bg-gray-100 dark:bg-zinc-800 hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4">
                        <div class="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div>
                        <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-300 mb-3 capitalize transition-all duration-500 group-hover:text-white">Cobertura Nacional</h4>
                        <p className="text-sm font-normal text-gray-500 dark:text-zinc-400 transition-all duration-500 leading-5 group-hover:text-white">
                            Nuestra póliza ofrece protección en todo el país, asegurando tu tranquilidad sin importar dónde estés.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        </>                          
    );
}

export default Home;