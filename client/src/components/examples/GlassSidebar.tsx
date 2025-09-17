import GlassSidebar from '../GlassSidebar';

export default function GlassSidebarExample() {
  return (
    <div className="h-screen bg-background">
      <GlassSidebar
        onItemSelect={(itemId) => console.log('Selected:', itemId)}
        activeItem="dashboard"
      />
    </div>
  );
}