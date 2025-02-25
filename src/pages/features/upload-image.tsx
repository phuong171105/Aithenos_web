import { NavHeader } from "../_components/nav-header"
import { Upload } from 'lucide-react'
import { LoadingSpinner } from "@/components/loading-spinner"
import { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import PulsatingButton from "@/components/ui/pulsating-button";

export default function UploadImage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setIsLoading(true);
  
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Truyền file qua state của navigate
      navigate('/scan-image', { state: { imageFile: file } });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-blue-100">
      {isLoading && <LoadingSpinner />}
      <NavHeader />
      <img
        src="./images/upload_background.png"
        className="absolute top-20 left-0 w-full h-screen "
        alt=""
      />
      <main className="container mx-auto px-4 py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="space-y-2">
              <span className="block text-6xl md:text-8xl font-bold text-red-400 tracking-tight">
                AI tái chế
              </span>
              <span className="block text-4xl md:text-6xl font-bold text-red-300 tracking-tight">
                sản phẩm sinh thế
              </span>
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center space-y-6">
            <div 
              className="rounded-xl border-2 border-dashed border-gray-200 bg-white/50 p-12 mt-20 cursor-pointer"
              onClick={triggerFileInput}
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Uploaded" className="h-24 w-24 xl:h-48 xl:w-96 object-cover" />
              ) : (
                <Upload className="h-24 w-24 text-gray-400 xl:h-64 xl:w-96" />
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <PulsatingButton onClick={triggerFileInput}>Thêm ảnh</PulsatingButton>
          </div>
        </div>
      </main>
    </div>
  )
}

