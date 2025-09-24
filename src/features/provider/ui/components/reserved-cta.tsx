import { Button } from "@/components/ui/button";

export const ReservedCTA = () => {
  return (
    <div className="flex justify-between mt-10">
      <Button className="bg-red-500 h-10 text-white font-bold">Cancel</Button>
      <Button className="bg-green-500 h-10 text-white font-bold">Accept</Button>
    </div>
  );
};
