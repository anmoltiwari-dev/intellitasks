import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button variant="ghost" size={"sm"}>Test Button</Button>
          <Button variant="ghost" size={"sm"}>Test Button</Button>
        </div>
      </div>
    </div>
  );
};
