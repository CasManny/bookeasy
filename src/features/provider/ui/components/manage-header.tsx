import { AddNewService } from "./add-new-service";

export const ManageHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-brand-blue text-2xl font-bold md:text-4xl">
        Manage services
      </h1>
      <AddNewService className="w-fit bg-brand-blue hover:bg-brand-blue text-white" />
    </div>
  );
};
