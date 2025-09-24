import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";

export const ManageServices = () => {
  return (
    <Button variant={'cta'}>
      <PackagePlus className="shrink-0 size-6" /> <span>Add New Service</span>
    </Button>
  );
};
