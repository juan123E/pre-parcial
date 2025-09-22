import { z } from "zod";

export const bookSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "El nombre del libro no puede estar vacío." }),
  image: z
    .string()
    .url({ message: "La URL de la imagen del libro no es válida." })
    .optional(),
  publishingDate: z.string(),
  editorial: z.object({
    name: z.string(),
  }),
});

export const authorSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, { message: "El nombre del autor debe tener al menos 3 caracteres." }),
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres." }),
  image: z
    .string()
    .url({ message: "La URL de la imagen no es válida." })
    .optional(),
  
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "La fecha debe tener el formato YYYY-MM-DD.",
    }),
  
  books: z.array(bookSchema).optional(),
});

export type AuthorFormData = z.infer<typeof authorSchema>;
export type BookFormData = z.infer<typeof bookSchema>;