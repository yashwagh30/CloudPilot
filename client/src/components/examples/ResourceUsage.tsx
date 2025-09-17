import ResourceUsage from '../ResourceUsage';

export default function ResourceUsageExample() {
  return (
    <div className="p-6 bg-background">
      <div className="max-w-4xl">
        <ResourceUsage
          onRefresh={() => console.log('Refreshing metrics')}
          onViewAlert={(alertId) => console.log('Viewing alert:', alertId)}
        />
      </div>
    </div>
  );
}