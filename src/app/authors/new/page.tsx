"use client";

import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import AuthorForm from "@/components/authorForm";
import { AuthorFormData } from "@/authors/validation/authorSchema";

export default function CreateAuthorPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleCreateAuthor: SubmitHandler<AuthorFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error!");
      }

      alert("Autor creado con éxito!");
      router.push("/authors"); // Redirige a la lista de autores
    } catch (error) {
      console.error("Failed to create author:", error);
      alert("Ocurrió un error al crear el autor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
        Crear Nuevo Autor
      </h1>
      <AuthorForm
        onSubmit={handleCreateAuthor}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}