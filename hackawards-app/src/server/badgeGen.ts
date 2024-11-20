import OpenAI from "openai";
import { env } from "~/env";

export default async function generateBadge({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: "OPENAI_API_KEY",
  });
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Generate a badge for a hacker that has been participating at a hackathon event that I am currently hosting. The name of the hackathon is
    ${name}. I need you to generate a badge for the atendees of my event, and the badges will be awarded for certain achievements. this specific badge that
    I am asking you to generate is for the following reason: ${description}`,
    n: 1,
    size: "1024x1024",
  });
  const badge_url = response.data[0]?.url;
  return badge_url;
}


  