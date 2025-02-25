import { Button } from "@/components/ui/button"
import { Youtube, Instagram, Facebook } from "lucide-react"

export default function SubmitView() {
  const socialIcons = [
    { icon: Youtube, color: "text-red-500", bg: "bg-red-100" },
    { icon: Instagram, color: "text-pink-500", bg: "bg-pink-100" },
    { icon: Facebook, color: "text-blue-500", bg: "bg-blue-100" },
  ]

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header with Icon and Title */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src="/placeholder.svg?height=32&width=32"
              alt="Product icon"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <h1 className="text-lg font-medium">Product: Propeller car</h1>
        </div>

        {/* Main Product img */}
        <div className="relative aspect-video w-full">
          <img
            src="/placeholder.svg?height=300&width=400"
            alt="Propeller car"
            className="object-cover rounded-lg"
          />
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4">
          {socialIcons.map((social, index) => {
            const Icon = social.icon
            return (
              <button
                key={index}
                className={`p-2 rounded-full ${social.bg} ${social.color} transition-transform hover:scale-110`}
              >
                <Icon className="w-6 h-6" />
              </button>
            )
          })}
        </div>

        {/* Submit Button */}
        <Button 
          className="w-full bg-green-600 hover:bg-green-700"
        >
          SUBMIT
        </Button>
      </div>
    </div>
  )
}

