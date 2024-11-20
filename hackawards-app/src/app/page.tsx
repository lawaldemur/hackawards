import BadgeSection from "./_components/badgeSection";
import HackathonsList from "./_components/hackathons_list";
import Hero from "./_components/hero";
import MintButton from "./_components/mintButton";


export default function HomePage() {
  return (
    <main>
      
      <Hero />
      <BadgeSection />
      <MintButton />
      
      <HackathonsList />
      
    </main>
  );
}
