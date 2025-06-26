import MusicSection from '@/app/sections/Music'; // Assuming Music.tsx is the main component for this page
                                                // Adjust path if sections is not directly under app
                                                // or if you have path aliases configured (e.g. @/sections/Music)

export default function MusicPage() {
  return (
    <div>
      <h1>Music Page</h1>
      <MusicSection />
      {/* Add other page-specific content or layout here */}
    </div>
  );
}