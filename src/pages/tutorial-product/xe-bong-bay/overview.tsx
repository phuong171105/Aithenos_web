'use client'

import { Button } from "@/components/ui/button";
import { NavHeader } from "@/pages/_components/nav-header";
import { ArrowLeft} from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function OverviewXeBongBay() {
  const navigate = useNavigate();

  const materials = [
    "4 nắp chai",
    "1 vỏ chai",
    "2 ống hút",
    "1 quả bóng bay",
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavHeader />
      <div className="max-w-6xl mx-auto pt-6">
        <Button
          variant="default"
          className="bg-green-600 hover:bg-green-700 mb-4"
          onClick={() => navigate("/menu")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>

        <div className="grid md:grid-cols-2 gap-28">
          {/* Bên trái - Các bước hướng dẫn */}
          <div className="space-y-4">
            <h1 className="text-xl font-semibold">Sản phẩm: Xe Bóng Bay</h1>
            <p className="font-medium">Các bước thực hiện:</p>
            <div className="relative">
              <img
                src="/src/assets/Product_core/2.png"
                alt="Xe Bóng Bay"
                width={600}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Bên phải - Vật liệu & Thông tin */}
          <div className="space-y-5">
            <div className="space-y-2">
              <h2 className="font-medium">Vật liệu cần thiết:</h2>
              <ul className="list-disc pl-5 space-y-2">
                {materials.map((material, index) => (
                  <li key={index} className="text-gray-700">
                    {material}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Độ khó:</span>
                <span>Khó</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Thời gian dự kiến:</span>
                <span>15 phút</span> {/* Giả định thời gian */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}