import { DashboardNav } from '@/app/components/DashboardNav'; // Import the new DashboardNav


export default function DashboardPage() {
  return (
    <div>
            <DashboardNav /> {/* Add the navbar at the top */}

      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      {/* Add dashboard components and content here */}
    </div>
  );
}