import { Toaster as SonnerToaster } from "sonner";
import { CheckCircle2 } from "lucide-react";

export const Toaster = () => {
  return (
    <SonnerToaster
      position="bottom-right"
      style={{
        bottom: "17px",
        right: "18px",
      }}
      icons={{
        success: <CheckCircle2 className="h-5 w-5 fill-[#16a34a] text-white" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-center gap-2 px-4 !h-[52px] w-full lg:w-[336px] bg-white border border-base rounded-lg shadow-[0px_4px_12px_-1px_rgba(0,0,0,0.1)]",
          title: "font-sans text-sm leading-5 font-medium text-foreground",
        },
      }}
    />
  );
};
