"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NavHeader } from "@/pages/_components/nav-header";
import ReactPlayer from "react-player";
export default function Step1OtoCanhQuat() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavHeader />
      <div className="max-w-6xl mx-auto space-y-4 pt-6">
        <Button
          variant="default"
          className="bg-green-600 hover:bg-green-700"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Column - Product Image */}
          <Card className="p-6 h-[500px]">
            <h2 className="text-xl font-semibold mb-4">
              Sản phẩm: Ô tô cánh quạt
            </h2>
            <ReactPlayer
              width={"100%"}
              url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              controls
            />
          </Card>

          {/* Right Column - Tutorial Steps */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Bước 1</h2>

            {/* Materials */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">1. Nguyên liệu cần</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full mr-2"></div>
                  <span>x4 Dây nịt</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full mr-2"></div>
                  <span>x1 Nắp chai</span>
                </li>
                <li className="flex items-center">
                  <div className="w-4 h-4 bg-amber-700 mr-2"></div>
                  <span>x1 Que gỗ</span>
                </li>
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="font-medium mb-4">2. Cách làm</h3>
              <div className="space-y-4">
                <div>
                  <p className="mb-2">2.1 Đục một lỗ ở giữa nắp chai</p>
                  <ReactPlayer
                    width={"70%"}
                    height={200}
                    url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    controls
                  />
                </div>
                <div>
                  <p className="mb-2">
                    2.2 Cho que gỗ vào gỗ của nắp trai và cố định nó bằng dây
                    chun hoặc keo nến
                  </p>
                  <ReactPlayer
                    width={"70%"}
                    height={200}
                    url="https://www.youtube.com/watch?v=vMxNIcVl-Hg&list=RDvMxNIcVl-Hg&start_radio=1"
                  />
                </div>
                <div>
                  <p className="mb-2">
                    2.3 Buộc một sợi dây chun vào phần còn lại của que
                  </p>
                  <ReactPlayer
                    width={"70%"}
                    height={200}
                    url="https://www.youtube.com/watch?v=vMxNIcVl-Hg&list=RDvMxNIcVl-Hg&start_radio=1"
                  />
                </div>
              </div>
            </div>

            {/* Complete Button */}
            <Button className="mt-8 bg-green-600 hover:bg-green-700 text-white w-full">
              Hoàn thành
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
