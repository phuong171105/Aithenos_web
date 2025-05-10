import { NavHeader } from "@/pages/_components/nav-header";
import { CoolMode } from "@/components/ui/cool-mode";
import { Button } from "@/components/ui/button";
import SectionLandingPage from "./section";
// import Footer from "./_components/footer";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-blue-100">
      <NavHeader />
      <img
        src="./images/background.png"
        className="absolute top-20 left-0 w-full "
        alt=""
      />
      <main className="container mx-auto px-4 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-12">
            <h1 className="text-8xl font-bold text-red-600 tracking-tight pl-20">
              Tresure Reborn
            </h1>
            <div className="space-y-2">
              <p className="text-xl text-gray-600 pl-20">
                Một <span className="font-black">ứng dụng AI</span> giúp gợi ý
                cách <span className="font-black">tái chế</span>{" "}
              </p>
              <p className="text-5xl font-bold text-blue-600 pl-20 pb-10">
                RÁC THÀNH VẬT DỤNG
              </p>
              <CoolMode>
                <Button
                  className="bg-blue-400 text-black py-4 px-8 text-lg ml-24 p-7 rounded-2xl hover:bg-blue-500"
                  onClick={() => navigate("/discover")}
                >
                  Khám phá ngay
                </Button>
              </CoolMode>
            </div>
          </div>
        </div>
      </main>

      <SectionLandingPage />
      {/* <Footer /> */}
    </div>
  );
}