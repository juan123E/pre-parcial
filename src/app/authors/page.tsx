'use client';

import { fetchAuthors, Author } from "@/services/authorsService";
import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import customImageLoader from '@/utils/imageLoader';
import { useRouter } from "next/navigation";

export default function AuthorsPage() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const getAuthors = async () => {
            try {
                const data = await fetchAuthors();
                setAuthors(data);
            } catch (e) {
                setError("Ocurrió un error al cargar los datos.");
            } finally {
                setIsLoading(false);
            }
        };
        getAuthors();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar a este autor?")) {
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error("Failed to delete the author.");
            }

            setAuthors(authors.filter((author) => author.id.toString() !== id));
            alert("Autor eliminado con éxito.");
        } catch (error) {
            console.error(error);
            alert("Ocurrió un error al eliminar el autor.");
        }
    };

    if (isLoading) {
        return <div className="min-h-screen p-8 text-center">Cargando autores...</div>;
    }

    if (error) {
        return <div className="min-h-screen p-8 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
                Nuestros Autores Destacados
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {authors.map((author) => (
                    <div
                        key={author.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                    >
                        {author.image && (
                            <div className="relative h-64 w-full bg-gray-200">
                                <Image
                                    loader={customImageLoader}
                                    src={author.image}
                                    alt={author.name}
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-t-lg"
                                />
                            </div>
                        )}

                        <div className="p-6 flex flex-col flex-grow">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{author.name}</h2>
                            <p className="text-gray-600 text-sm mb-4">
                                Nacimiento: {author.birthDate}
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3 flex-grow">
                                {author.description}
                            </p>
                            
                            {author.books && author.books.length > 0 && (
                                <div className="mt-6 border-t pt-4">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Libros:</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {author.books.map((book) => (
                                            <div key={book.id} className="bg-gray-50 p-3 rounded-md shadow-sm">
                                                {book.image && (
                                                    <div className="relative w-full h-32 mb-2">
                                                        <Image
                                                            loader={customImageLoader}
                                                            src={book.image}
                                                            alt={book.name}
                                                            layout="fill"
                                                            objectFit="contain"
                                                            className="rounded-md"
                                                        />
                                                    </div>
                                                )}
                                                <p className="font-medium text-gray-800 leading-tight">
                                                    <Link href={`/books/${book.id}`} className="hover:text-blue-600 transition-colors">
                                                        {book.name}
                                                    </Link>
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {book.editorial.name} ({book.publishingDate})
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 pt-4 border-t flex justify-end gap-4">
                                <Link
                                    href={`/authors/${author.id}/edit`}
                                    className="text-blue-600 font-semibold hover:underline"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(author.id.toString())}
                                    className="text-red-600 font-semibold hover:underline"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}