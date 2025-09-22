import React from "react"
import Image from "next/image"

interface cardProps{
    title: string;
    description: string;
    imageUrl: string
}
const Card = ({title, description, imageUrl}: cardProps) => 
    {
        return (
            <div className="border rounded-lg shadow-lg overflow-hidden max-w-sm">
            {/* 3. We use props to render dynamic content. */}
            <Image
                src={imageUrl}
                alt={`Imagen para ${title}`}
                width={500} // Usamos dimensiones genéricas para el layout
                height={300}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-700">{description}</p>
            </div>
            </div>
        );
    }
export default Card; 