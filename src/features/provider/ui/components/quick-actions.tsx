import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddNewService } from "./add-new-service";
import { ManageServices } from "./add-category";
import { UpdateAvailability } from "./update-availability";

export const QuickActions = () => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <AddNewService className="bg-transparent hover:bg-brand-accent/10" />
          <UpdateAvailability />
          <ManageServices />
        </div>
      </CardContent>
    </Card>
  );
};
