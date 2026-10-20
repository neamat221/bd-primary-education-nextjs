import playActivities from "./classplay";
import nurseryActivities from "./classNarchari";
import oneActivities from "./classOne";
import twoActivities from "./classTwo";
import threeActivities from "./classThree";

/* ============================================================
   Class levels
   The five primary class groups, each with its 20 sample
   learning activities. `order` is the display sequence from the
   youngest group upward; `accent` maps to a colour token used by
   the classes page.
   ============================================================ */

export const classLevels = [
  {
    key: "play",
    label: "Play Group",
    bengali: "প্লে গ্রুপ",
    level: "Pre-primary",
    ageRange: "3–4 years",
    accent: "rose",
    icon: "🧸",
    activities: playActivities,
  },
  {
    key: "nursery",
    label: "Nursery",
    bengali: "নার্সারি",
    level: "Pre-primary",
    ageRange: "4–5 years",
    accent: "orange",
    icon: "🌼",
    activities: nurseryActivities,
  },
  {
    key: "one",
    label: "Class One",
    bengali: "প্রথম শ্রেণি",
    level: "Primary",
    ageRange: "6–7 years",
    accent: "blue",
    icon: "1️⃣",
    activities: oneActivities,
  },
  {
    key: "two",
    label: "Class Two",
    bengali: "দ্বিতীয় শ্রেণি",
    level: "Primary",
    ageRange: "7–8 years",
    accent: "green",
    icon: "2️⃣",
    activities: twoActivities,
  },
  {
    key: "three",
    label: "Class Three",
    bengali: "তৃতীয় শ্রেণি",
    level: "Primary",
    ageRange: "8–9 years",
    accent: "purple",
    icon: "3️⃣",
    activities: threeActivities,
  },
];

export function getClassLevel(key) {
  return classLevels.find((c) => c.key === key) ?? classLevels[0];
}

/* Flatten every activity across all five classes, tagging each
   with its class key so callers can filter or group freely. */
export const allActivities = classLevels.flatMap((c) =>
  c.activities.map((activity) => ({
    ...activity,
    classKey: c.key,
    classLabel: c.label,
    accent: c.accent,
  })),
);

/* Distinct subject list across the whole curriculum, in a stable
   order based on first appearance. */
export const allSubjects = [...new Set(allActivities.map((a) => a.subject))];

export function activitiesBySubject(subject) {
  if (!subject || subject === "All subjects") return allActivities;
  return allActivities.filter((a) => a.subject === subject);
}

export {
  playActivities,
  nurseryActivities,
  oneActivities,
  twoActivities,
  threeActivities,
};
