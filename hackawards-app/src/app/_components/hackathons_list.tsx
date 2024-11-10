import { getHackathons } from "~/server/queries";

const hackathons = await getHackathons();

export default function HackathonsList () {
  return (
    <div>
      <h2 className="text-3xl font-bold self-start">Your Hackathons</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6"> 
        {hackathons.map((hackathon) => (
          <div key={hackathon.id}>
            <h2>{hackathon.name}</h2>
            <p>{hackathon.description}</p>
            <p>Started on: {hackathon.start_date.toLocaleDateString()}</p>
            </div>))}
            </div>
    </div>
  )
};