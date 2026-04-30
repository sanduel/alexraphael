import { describe, it, expect } from "vitest";
import { selectUpcomingTours } from "./tours";

type Status = "upcoming" | "sold-out" | "past";

function makeTour(status: Status, isoDate: string) {
  return {
    data: {
      status,
      date: new Date(isoDate),
      title: `tour-${isoDate}`,
      duration: "2 hours",
      meetingPoint: "Washington Square Arch",
    },
  };
}

describe("selectUpcomingTours", () => {
  it("returns only upcoming tours, dropping sold-out and past entries", () => {
    const tours = [
      makeTour("upcoming", "2026-06-01"),
      makeTour("past", "2026-03-01"),
      makeTour("sold-out", "2026-05-20"),
      makeTour("upcoming", "2026-05-17"),
    ];

    const result = selectUpcomingTours(tours);

    expect(result).toHaveLength(2);
    expect(result.every((t) => t.data.status === "upcoming")).toBe(true);
  });

  it("sorts upcoming tours ascending by date (earliest first)", () => {
    const may17 = makeTour("upcoming", "2026-05-17");
    const jun01 = makeTour("upcoming", "2026-06-01");
    const may30 = makeTour("upcoming", "2026-05-30");

    const result = selectUpcomingTours([jun01, may17, may30]);

    expect(result[0]).toBe(may17);
    expect(result[1]).toBe(may30);
    expect(result[2]).toBe(jun01);
  });

  it("returns an empty array when given no tours", () => {
    expect(selectUpcomingTours([])).toEqual([]);
  });

  it("returns an empty array when no tours are upcoming", () => {
    const tours = [
      makeTour("past", "2026-01-01"),
      makeTour("sold-out", "2026-02-01"),
    ];

    expect(selectUpcomingTours(tours)).toEqual([]);
  });
});
