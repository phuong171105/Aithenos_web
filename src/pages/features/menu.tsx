import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { NavHeader } from "../_components/nav-header";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  const projects = [
    {
      image: "src/assets/Product/1.png",
      name: "Ống Heo Tiết Kiệm",
      difficulty: "Dễ" as "Dễ",
      materials: ["1 nắp chai", "1 vỏ chai", "1 giấy màu"],
      backgroundColor: "bg-pink-100",
    },
    {
      image: "src/assets/Product/2.png",
      name: "Xe Bóng Bay",
      difficulty: "Khó" as "Khó",
      materials: ["4 nắp chai", "1 vỏ chai", "2 ống hút", "1 quả bóng bay"],
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
        "1 vỏ chai",
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
        "1 vỏ chai",
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
      materials: ["5 nắp chai", "2 vỏ chai", "3 xiên que", "1 dây chun"],
      backgroundColor: "bg-green-100",
    },
  ];

  // Hàm chuẩn hóa tên sản phẩm thành kebab-case
  const toKebabCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch ngang
      .normalize("NFD") // Chuẩn hóa ký tự Unicode
      .replace(/[\u0300-\u036f]/g, ""); // Xóa dấu tiếng Việt
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavHeader />
      <div className="max-w-6xl mx-auto space-y-4 pt-10">
        <div className="flex gap-4 justify-between">
          <Button
            variant="default"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => navigate("/scan-image")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
          {projects.map((project, index) => (
            <div className="h-full" key={index}>
              <ProjectCard
                {...project}
                onClick={() =>
                  navigate(
                    `/product/${toKebabCase(project.name)}/overview`
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}