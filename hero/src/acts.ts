/** The story, as data. Durations are per-act because the acts are not equally
 *  busy: typing code needs time, a rocket leaving does not. */

export type ActId =
  | "idea"
  | "blueprint"
  | "code"
  | "test"
  | "launch"
  | "orbit"
  | "users"
  | "growth";

export interface Act {
  id: ActId;
  label: string;
  /** Shown under the label — the point of the act, in plain language. */
  caption: string;
  /** Seconds on screen. */
  duration: number;
}

export const ACTS: readonly Act[] = [
  { id: "idea", label: "IDEA", caption: "A problem worth solving", duration: 2.2 },
  { id: "blueprint", label: "BLUEPRINT", caption: "Architecture before code", duration: 2.4 },
  { id: "code", label: "CODE", caption: "Typed, reviewed, versioned", duration: 3.4 },
  { id: "test", label: "TEST", caption: "Nothing ships unproven", duration: 2.8 },
  { id: "launch", label: "LAUNCH", caption: "Deploy, health-check, roll back", duration: 2.8 },
  { id: "orbit", label: "ORBIT", caption: "Monitored around the clock", duration: 2.6 },
  { id: "users", label: "REAL USERS", caption: "Traffic from actual people", duration: 2.6 },
  { id: "growth", label: "GROWTH", caption: "Impact you can measure", duration: 2.8 },
] as const;

export const TOTAL_DURATION = ACTS.reduce((sum, act) => sum + act.duration, 0);
