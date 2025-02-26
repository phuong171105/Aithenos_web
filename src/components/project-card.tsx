import React from "react";

interface ProjectCardProps {
  image: string;
  name: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  materials: string[];
  missingMaterials?: string[];
  backgroundColor: string;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  name,
  difficulty,
  materials,
  missingMaterials = [],
  backgroundColor,
  onClick,
}) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md ${backgroundColor} min-h-[400px] flex flex-col transition-transform hover:scale-105 cursor-pointer`}
      onClick={onClick}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-600 mb-2">Độ khó: {difficulty}</p>
      <div className="flex-1">
        <p className="font-medium text-gray-700">Nguyên liệu cần:</p>
        <ul className="list-disc ml-5 text-gray-600 text-sm">
          {materials.map((material, index) => (
            <li key={index}>{material}</li>
          ))}
        </ul>
      </div>
      {missingMaterials.length > 0 && (
        <div className="mt-2">
          <p className="font-medium text-red-600">Còn thiếu:</p>
          <ul className="list-disc ml-5 text-red-600 text-sm">
            {missingMaterials.map((material, index) => (
              <li key={index}>{material}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};