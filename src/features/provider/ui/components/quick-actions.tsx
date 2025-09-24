import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddNewService } from "./add-new-service";
import { ManageServices } from "./manage-services";
import { UpdateAvailability } from "./update-availability";

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <AddNewService />
          <UpdateAvailability />
          <ManageServices />
        </div>
      </CardContent>
    </Card>
  );
};
