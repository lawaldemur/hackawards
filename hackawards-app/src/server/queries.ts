"server-only"
import { db } from "./db";


  
export async function getHackathons() {
  const hackathons = await db.query.hackathons.findMany();
  return hackathons;
}