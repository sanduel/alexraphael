import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const tours = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/tours" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    duration: z.string(),
    meetingPoint: z.string(),
    bookingUrl: z.string().url().optional(),
    status: z.enum(["upcoming", "sold-out", "past"]),
  }),
});

export const collections = { tours };
