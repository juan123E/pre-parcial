"use client";

import { useState, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import AuthorForm from "@/components/authorForm";
import { AuthorFormData } from "@/authors/validation/authorSchema";

export default function EditAuthorPage({ params }: { params: { id: string } }) {
  const [authorData, setAuthorData] = useState<AuthorFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors/${params.id}`);
        if (!response.ok) {
          throw new Error("Author not found");
        }
        const data = await response.json();
        setAuthorData(data);
      } catch (error) {
        console.error("Failed to fetch author:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuthor();
  }, [params.id]);

  const handleUpdateAuthor: SubmitHandler<AuthorFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors/${params.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update the author.");
      }
      alert("Autor actualizado con éxito!");
      router.push("/authors");
    } catch (error) {
      console.error("Failed to update author:", error);
      alert("Ocurrió un error al actualizar el autor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen p-8 text-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
        Editar Autor
      </h1>
      <AuthorForm
        onSubmit={handleUpdateAuthor}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}