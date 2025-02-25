import { SectionTitle } from "@/components/section-title";

export default function SectionLandingPage() {
  const partners = [
    { name: "VinUniversity", logo: "./images/units/Vin.webp" },
    { name: "VietCycle", logo: "./images/units/VietCycle.png" },
    { name: "Stick'Em", logo: "./images/units/Stick'Em.png" },
    { name: "Reactor", logo: "./images/units/ReactorSchool.png" },
    { name: "Next Challenge", logo: "./images/units/Next.png" },
    { name: "Partner 6", logo: "./images/units/SiliconValley.png" },
  ];

  const advisors = [
    {
      name: "Ung Kim Phuong",
      role: "Bio/Tech",
      experience: "5 years experience at biotechnology",
      image: "./images/members/Ms.Phuong.png",
    },
    {
      name: "Adam Huh Dam",
      role: "AI/ML expert",
      experience: "3 years experience at Data Analysis",
      image: "./images/members/Mr.Adam.png",
    },
    {
      name: "Nguyen Thai Binh",
      role: "Tech manager",
      experience: "4 years experience at Building AI/ML",
      image: "https://placehold.co/800x800",
    },
    {
      name: "Bui Van Hieu",
      role: "AI/ML expert",
      experience: "3 years at AI/ML",
      image: "./images/members/Mr.Hieu.png",
    },
    {
      name: "Do Bao Chau",
      role: "Medical specialist",
      experience: "Dermatology at VN Y School",
      image: "./images/members/Mr.Chau.png",
    },
    {
      name: "Pham Thanh Van",
      role: "Processing....",
      experience: "Processing....",
      image: "./images/members/Ms.Van.jpg",
    },
  ];

  const groupMembers = [
    {
      name: "Nguyen Hong Hai",
      role: "Product & CEO",
      image: "./images/members/Hai.jpg",
    },
    {
      name: "Duong Xuan Bach",
      role: "Lead AI/ML",
      image: "./images/members/Bach.png",
    },
    {
      name: "Phan Hoai Nam",
      role: "Lead Engineering",
      image: "./images/members/Nam.png",
    },
    {
      name: "Vu Trung Quan",
      role: "Lead Machine Design",
      image: "./images/members/Quan.png",
    },
    {
      name: "Dao Xuan Bac",
      role: "Lead of Event Coordinator",
      image: "./images/members/Bac.png",
    },
    {
      name: "Nguyen Thi Thanh Nga",
      role: "Marketing Lead",
      image: "./images/members/Nga.jpg",
    },
    {
      name: "Kim Nam Kyu",
      role: "Business Development",
      image: "https://placehold.co/800x800",
    },
    {
      name: "Nguyen Thi Thu Trang",
      role: "Process",
      image: "./images/members/Trang.png",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Products Section */}
      <section>
        <SectionTitle>Thành phẩm của mọi người!</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <img
              src="./images/finished-products/2.png"
              alt="Cardboard box craft"
              className="object-cover"
            />
          </div>
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <img
              src="./images/finished-products/3.png"
              alt="Green monster box"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
