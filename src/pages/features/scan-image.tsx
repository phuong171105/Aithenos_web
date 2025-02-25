import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { NavHeader } from "../_components/nav-header";
import { useNavigate, useLocation } from "react-router-dom";

export default function ScanImage() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasShownToast = useRef(false);
  const [apiResult, setApiResult] = useState<any>(null); // Lưu dictionary từ API
  const [imageSrc, setImageSrc] = useState<string>(""); // Hiển thị ảnh gốc
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading

  useEffect(() => {
    const processImage = async () => {
      const imageFile = location.state?.imageFile as File;
      console.log("Tệp ảnh:", imageFile); // Kiểm tra file đầu vào

      if (!imageFile) {
        toast.error("Không nhận được tệp ảnh. Vui lòng tải lên một ảnh.");
        setLoading(false);
        return;
      }

      // Hiển thị ảnh gốc
      const imageUrl = URL.createObjectURL(imageFile);
      setImageSrc(imageUrl);

      try {
        // Tạo FormData để gửi file ảnh
        const formData = new FormData();
        formData.append("file", imageFile);

        // Gọi API với POST và FormData
        const response = await fetch("http://127.0.0.1:8000/det", {
          method: "POST",
          body: formData,
          headers: {
            "Accept": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Phản hồi lỗi từ API:", errorText);
          throw new Error(`Yêu cầu API thất bại: ${response.status}`);
        }

        const data = await response.json();
        console.log("Phản hồi API:", data); // Kiểm tra toàn bộ response
        setApiResult(data.data.result.dict); // Lưu dictionary từ API
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        toast.error("Không thể phân tích ảnh");
        setLoading(false);
      }

      if (!hasShownToast.current) {
        toast.success("Ảnh của bạn đã được tải lên và phân tích thành công.");
        hasShownToast.current = true;
      }
    };

    processImage();
  }, [location.state]);

  // Hiển thị trạng thái đang tải
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-blue-100 flex items-center justify-center">
        <span className="text-xl">Đang phân tích ảnh...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-blue-100">
      <NavHeader />
      <div className="max-w-5xl mx-auto py-7">
        <Button
          variant="default"
          className="bg-green-600 hover:bg-green-700"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-5 mt-6">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Cột bên trái - Ảnh */}
            <div className="space-y-4">
              <div className="border-2 border-blue-200 rounded-lg">
                <img
                  src={imageSrc || "https://placehold.co/400x600"}
                  alt="Chai đã tải lên"
                  className="w-full object-cover rounded"
                />
              </div>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => navigate("/upload-image")}
              >
                Chụp lại ảnh
              </Button>
            </div>

            {/* Cột bên phải - Kết quả */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Vật liệu được xác định
                </h2>
                <div className="space-y-3">
                  <p className="font-medium">Bạn có:</p>
                  {apiResult ? (
                    <div className="flex items-center gap-4 flex-wrap">
                      {Object.entries(apiResult).map(
                        ([itemName, quantity]: [string, number]) => (
                          <div
                            key={itemName}
                            className="flex items-center mb-2"
                          >
                            <span className="ml-2">
                              {itemName}: x{quantity}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p>Chưa có kết quả...</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">
                  Xác nhận số lượng
                </h3>
                <div className="space-y-2">
                  <Button
                    className="flex items-center bg-green-100 hover:bg-green-400 text-green-600 transition duration-300 ease-in-out cursor-pointer"
                    onClick={() => navigate("/discover", { state: { apiResult } })}
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6 mr-2 fill-current">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    Đúng
                  </Button>
                  <Button className="flex items-center bg-red-200 hover:bg-red-400 text-red-600 hover:text-red-700">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 mr-2 fill-current"
                    >
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                    </svg>
                    Sai
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Linh vật */}
        <div className="fixed bottom-4 right-4">
          <img
            src="src/assets/Product/logo.png"
            alt="Linh vật tái chế"
            className="h-32 animate-bounce"
          />
        </div>
      </div>
    </div>
  );
}