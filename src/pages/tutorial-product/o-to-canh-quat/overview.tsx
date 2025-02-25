'use client'

import { Button } from "@/components/ui/button";
import { NavHeader } from "@/pages/_components/nav-header";
import { ArrowLeft, Lock } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function OverviewOToCanhQuat() {
  const navigate = useNavigate();

  const materials = [
    "5 nắp chai",
    "2 vỏ chai",
    "3 xiên que",
    "1 dây chun",
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
            <h1 className="text-xl font-semibold">Sản phẩm: Ô Tô Cánh Quạt</h1>
            <p className="font-medium">Các bước thực hiện:</p>

            {/* Ảnh chính */}
            <div className="relative">
              <img
                src="src/assets/Product/6.png" // Thay placeholder bằng ảnh thực tế
                alt="Ô Tô Cánh Quạt"
                width={600}
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
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
                <span>Trung bình</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Thời gian dự kiến:</span>
                <span>10 phút</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}