import GlassNavbar from '../GlassNavbar';

export default function GlassNavbarExample() {
  return (
    <div className="bg-background min-h-screen">
      <GlassNavbar
        onMenuToggle={() => console.log('Menu toggled')}
        onSearch={(query) => console.log('Search:', query)}
        user={{
          name: "Sarah Chen",
          email: "sarah.chen@company.com",
          avatar: undefined
        }}
      />
    </div>
  );
}