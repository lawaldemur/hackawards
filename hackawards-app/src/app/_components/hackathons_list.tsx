import { getHackathons } from "~/server/queries";

const hackathons = await getHackathons();

export default function HackathonsList () {
  return (
    <div>
      <h1>Hackathons</h1>
        {hackathons.map((hackathon) => (
          <div key={hackathon.id}>
            <h2>{hackathon.name}</h2>
            <p>{hackathon.description}</p>
            <p>Participants:</p>
            </div>))}
    </div>
  )
};