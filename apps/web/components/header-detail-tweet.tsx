// src/components/HeaderWithBackButton.tsx
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HeaderWithBackButton: React.FC = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center space-x-4 p-4 shadow-md">
      <button
        className="rounded-full p-2 hover:bg-gray-900"
        onClick={() => router.push("/home")}
      >
        <ArrowLeft className="size-6" />
      </button>
      <h3 className="text-xl font-semibold">Posts</h3>
    </div>
  );
};

export default HeaderWithBackButton;
