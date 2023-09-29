// ? REVISAR COMO SOLUCIONAR LA PARTE DE PETICIONES, HAY Q FILTRAR LAS PETICIONES QUE YA ESTAN CARGADAS EN COMICS,
// ? PORQUE SI NO SE HACE, SE CARGAN DE NUEVO Y SE DUPLICAN
// ? HAY QUE REVISAR PARA VER COMO HACER LAS PETICIONES, SI ES NECESARIO USAR EL ALLSETTLED O SE PUEDE USAR ALGUN OTRO DERIVADO QUE ME PERMITA HACER PETICIONES EN PARALELO SIN CANCELAR A LAS DEMAS

import { useEffect, useState } from "react";
import { getComicByRequest } from "../services/ComicService";

export default function useComics({ listComics }: any) {
    const [comics, setComics] = useState<any>([]);

    useEffect(() => {
        if (listComics != null) {
            const comicPromises = listComics.map((comic: any) =>
                getComicByRequest(comic.resourceURI)
            );

            // Utiliza una función de filtro para evitar duplicados
            Promise.allSettled(comicPromises)
                .then((responses) => {
                    // Filtrar las respuestas exitosas
                    const successfulResponses = responses
                        .filter((result) => result.status === "fulfilled")
                        .map((result: any) => result.value);

                    // Utiliza una función de filtro para evitar duplicados
                    setComics((existingComics: any) => {
                        const newComics = successfulResponses.filter(
                            (newComic) =>
                                !existingComics.some(
                                    (existingComic: any) => existingComic.id === newComic.id
                                )
                        )
                        return [...existingComics, ...newComics];
                    });
                })
                .catch((error) => {
                    console.error("Error al obtener los cómics:", error);
                });
        }
    }, [listComics]);

    return { comics };
}
