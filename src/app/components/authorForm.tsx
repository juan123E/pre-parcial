"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  authorSchema,
  AuthorFormData,
} from "@/authors/validation/authorSchema";

interface AuthorFormProps {
  onSubmit: SubmitHandler<AuthorFormData>;
  defaultValues?: Partial<AuthorFormData>;
  isSubmitting: boolean;
}

export default function AuthorForm({
  onSubmit,
  defaultValues,
  isSubmitting,
}: AuthorFormProps) {
  const preparedDefaultValues = defaultValues
    ? {
        ...defaultValues,
        birthDate: defaultValues.birthDate
          ? new Date(defaultValues.birthDate).toISOString().split("T")[0]
          : undefined,
      }
    : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues: preparedDefaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto"
    >
      <div>
        <label htmlFor="name" className="block font-medium text-gray-900">
          Nombre del Autor
        </label>
        <input
          id="name"
          {...register("name")}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm text-black"
          placeholder="e.g., Gabriel García Márquez"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block font-medium text-gray-900">
          Descripción
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows={4}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm text-black"
          placeholder="Una breve biografía del autor..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="birthDate" className="block font-medium text-gray-900">
          Fecha de Nacimiento
        </label>
        <input
          id="birthDate"
          type="date"
          {...register("birthDate")}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm text-black"
        />
        {errors.birthDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.birthDate.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="image" className="block font-medium text-gray-900">
          URL de la Imagen
        </label>
        <input
          id="image"
          type="url"
          {...register("image")}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
          placeholder="https://example.com/author-photo.jpg"
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-900 disabled:bg-gray-400 text-black"
      >
        {isSubmitting ? "Guardando..." : "Guardar Autor"}
      </button>
    </form>
  );
}