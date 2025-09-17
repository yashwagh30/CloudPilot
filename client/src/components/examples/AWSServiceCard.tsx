import AWSServiceCard from '../AWSServiceCard';

import { Server } from "lucide-react";

// TODO: remove mock functionality
const mockService = {
  id: "i-1234567890",
  name: "Web Server",
  type: "EC2" as const,
  status: "running" as const,
  region: "us-east-1",
  cost: 45.67,
  usage: 67,
  icon: Server
};

export default function AWSServiceCardExample() {
  return (
    <div className="p-6 bg-background">
      <div className="max-w-sm">
        <AWSServiceCard
          service={mockService}
          onAction={(serviceId, action) => console.log(`Action ${action} on service ${serviceId}`)}
        />
      </div>
    </div>
  );
}