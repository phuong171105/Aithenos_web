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

  // Danh sách dự án ban đầu (điều chỉnh tên nguyên liệu cho khớp với API)
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

  // Hàm tính điểm cho mỗi dự án dựa trên API result
  const calculateScore = (project: any, apiResult: Record<string, number>) => {
    let score = 0;
    project.materials.forEach((material: string) => {
      const materialName = material.split(" ").slice(1).join(" "); // Lấy tên nguyên liệu (bỏ số lượng)
      const materialCountMatch = material.match(/^(\d+)/); // Lấy số lượng từ chuỗi
      const materialCount = materialCountMatch ? parseInt(materialCountMatch[1]) : 1;

      // So sánh với API result
      for (const [apiMaterial, count] of Object.entries(apiResult)) {
        if (materialName.toLowerCase() === apiMaterial.toLowerCase()) {
          score += Math.min(materialCount, count); // Tăng điểm dựa trên số lượng khớp
        }
      }
    });
    return score;
  };

  useEffect(() => {
    const apiResult = location.state?.apiResult || {}; // Lấy kết quả API từ state
    console.log("API Result:", apiResult);

    // Sắp xếp dự án dựa trên điểm số
    const sorted = [...initialProjects].sort((a, b) => {
      const scoreA = calculateScore(a, apiResult);
      const scoreB = calculateScore(b, apiResult);
      return scoreB - scoreA; // Sắp xếp giảm dần theo điểm
    });

    setSortedProjects(sorted);
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavHeader />
      <div className="max-w-6xl mx-auto space-y-4 pt-10">
        <div className="flex gap-4 justify-between">
          <Button
            variant="default"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <Button
            variant="default"
            className="bg-blue-500 hover:bg-blue-700"
            onClick={() => navigate("/upload-image")}
          >
            <Upload className="w-4 h-4 mr-2" />
            Tải ảnh lên
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
          {sortedProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}