type TourLike = { data: { status: "upcoming" | "sold-out" | "past"; date: Date } };

export function selectUpcomingTours<T extends TourLike>(tours: T[]): T[] {
  return tours
    .filter((t) => t.data.status === "upcoming")
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
}
