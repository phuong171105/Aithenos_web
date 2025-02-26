import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload } from "lucide-react";
import { NavHeader } from "../_components/nav-header";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Discover() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sortedProjects, setSortedProjects] = useState<any[]>([]);

  // Danh sách dự án ban đầu
  const initialProjects = [
    {
      image: "src/assets/Product/1.png",
      name: "Ống Heo Tiết Kiệm",
      difficulty: "Dễ" as "Dễ",
      materials: ["1 nắp chai", "1 chai nhựa", "1 giấy màu"],
      backgroundColor: "bg-pink-100",
    },
    {
      image: "src/assets/Product/2.png",
      name: "Xe Bóng Bay",
      difficulty: "Khó" as "Khó",
      materials: ["4 nắp chai", "1 chai nhựa", "2 ống hút", "1 quả bóng bay"],
      backgroundColor: "bg-red-100",
    },
    {
      image: "src/assets/Product/3.png",
      name: "Thùng Rác",
      difficulty: "Trung bình" as "Trung bình",
      materials: ["Bìa cát tông"],
      backgroundColor: "bg-green-100",
    },
    {
      image: "src/assets/Product/4.png",
      name: "Quạt Cầm Tay",
      difficulty: "Trung bình" as "Trung bình",
      materials: [
        "1 nắp chai",
        "1 chai nhựa",
        "1 chiếc đũa",
        "2 cây đè lưỡi",
        "1 cái dây chun",
      ],
      backgroundColor: "bg-green-100",
    },
    {
      image: "src/assets/Product/5.png",
      name: "Thuyền Tự Chèo",
      difficulty: "Trung bình" as "Trung bình",
      materials: [
        "1 nắp chai",
        "1 chai nhựa",
        "2 chiếc đũa",
        "1 cây đè lưỡi",
        "3 cái dây chun",
      ],
      backgroundColor: "bg-green-100",
    },
    {
      image: "src/assets/Product/6.png",
      name: "Ô Tô Cánh Quạt",
      difficulty: "Trung bình" as "Trung bình",
      materials: ["5 nắp chai", "2 chai nhựa", "3 xiên que", "1 dây chun"],
      backgroundColor: "bg-green-100",
    },
  ];

  // Hàm tính điểm cho mỗi dự án dựa trên API result (giữ nguyên để tham khảo)
  const calculateScore = (project: any, apiResult: Record<string, number>) => {
    let score = 0;
    project.materials.forEach((material: string) => {
      const materialName = material.split(" ").slice(1).join(" ");
      const materialCountMatch = material.match(/^(\d+)/);
      const materialCount = materialCountMatch ? parseInt(materialCountMatch[1]) : 1;

      for (const [apiMaterial, count] of Object.entries(apiResult)) {
        if (materialName.toLowerCase() === apiMaterial.toLowerCase()) {
          score += Math.min(materialCount, count);
        }
      }
    });
    return score;
  };

  // Hàm tính nguyên liệu còn thiếu
  const calculateMissingMaterials = (project: any, apiResult: Record<string, number>) => {
    const missingMaterials: string[] = [];
    project.materials.forEach((material: string) => {
      const materialName = material.split(" ").slice(1).join(" ");
      const materialCountMatch = material.match(/^(\d+)/);
      const materialCount = materialCountMatch ? parseInt(materialCountMatch[1]) : 1;

      const apiCount = Object.entries(apiResult).reduce((acc, [apiMaterial, count]) => {
        return materialName.toLowerCase() === apiMaterial.toLowerCase() ? count : acc;
      }, 0);

      const missingCount = materialCount - apiCount;
      if (missingCount > 0) {
        missingMaterials.push(`${missingCount} ${materialName}`);
      }
    });
    return missingMaterials;
  };

  // Hàm chuẩn hóa tên sản phẩm thành kebab-case
  const toKebabCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    const apiResult = location.state?.apiResult || {};
    console.log("API Result:", apiResult);

    const sorted = [...initialProjects]
      .map((project) => ({
        ...project,
        missingMaterials: calculateMissingMaterials(project, apiResult),
      }))
      .sort((a, b) => {
        // Sắp xếp theo số lượng nguyên liệu còn thiếu (ít nhất lên đầu)
        const missingCountA = a.missingMaterials.length;
        const missingCountB = b.missingMaterials.length;
        return missingCountA - missingCountB;
      });

    setSortedProjects(sorted);
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />
      <div className="max-w-7xl mx-auto space-y-6 pt-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Button
            variant="default"
            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            onClick={() => navigate("/upload-image")}
          >
            <Upload className="w-4 h-4 mr-2" />
            Tải ảnh lên
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {sortedProjects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              onClick={() => navigate(`/product/${toKebabCase(project.name)}/overview`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}