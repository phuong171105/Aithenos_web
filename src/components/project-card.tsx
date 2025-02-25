import { Card, CardContent } from "@/components/ui/card";

interface ProjectCardProps {
  image: string;
  name: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  materials: string[];
  backgroundColor: string;
  onClick?: () => void;
}

export function ProjectCard({
  image,
  name,
  difficulty,
  materials,
  backgroundColor,
  onClick,
}: ProjectCardProps) {
  return (
    <Card className="overflow-hidden h-full" onClick={onClick}>
      <CardContent className={`p-0 ${backgroundColor} flex flex-col h-full`}>
        <div className="relative w-full" style={{ height: "300px" }}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Sản phẩm:</span>
              <span>{name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Vật liệu cần thiết:</span>
            </div>
            <ul className="list-disc pl-5">
              {materials.map((material, index) => (
                <li key={index} className="text-gray-700">
                  {material}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Độ khó:</span>
            <span>{difficulty}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}