import BillingChart from '../BillingChart';

export default function BillingChartExample() {
  return (
    <div className="p-6 bg-background">
      <div className="max-w-2xl">
        <BillingChart
          onDownloadReport={() => console.log('Downloading report')}
          onViewDetails={() => console.log('Viewing details')}
        />
      </div>
    </div>
  );
}