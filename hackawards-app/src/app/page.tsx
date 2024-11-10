import HackathonsList from "./_components/hackathons_list";
import Hero from "./_components/hero";
import MintHelper from "./_components/mintHelper";


export default function HomePage() {
  return (
    <main>
      <MintHelper />
      <Hero />
      <HackathonsList />
      
    </main>
  );
}
