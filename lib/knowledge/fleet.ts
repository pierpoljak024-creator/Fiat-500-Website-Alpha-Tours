/**
 * The fleet.
 *
 * Three cars were available on the date this file was written (2026-11-06).
 * Availability genuinely changes, so never promise a specific car until it has
 * been checked against the diary — the *choice* is a nice touch, an
 * *unavailable* car is a broken promise.
 */

import type { Vehicle } from "./types";

/** Capacity is set by the public FAQ: two guests in comfort, a second car for four. */
export const guestsPerCar = 2;

export const vehicles: Vehicle[] = [
  {
    id: "cream",
    label: "Cream white",
    colour: "Cream / white, ivory dash, tan leather",
    selectable: true,
    guestCapacity: { min: 1, max: guestsPerCar },
    notes: [
      "The most period-looking of the three; the interior matches the gallery caption 'Ivory dash, tan leather' in lib/content.ts.",
      "Photographs beautifully in low winter light against the ochre walls of the centre.",
    ],
  },
  {
    id: "orange",
    label: "Orange",
    colour: "Orange",
    selectable: true,
    guestCapacity: { min: 1, max: guestsPerCar },
    notes: [
      "The loudest of the three — the one that gets waved at in traffic.",
      "Good match for guests who want the car to be part of the photographs.",
    ],
  },
  {
    id: "dark-blue",
    label: "Dark blue",
    colour: "Dark blue",
    selectable: true,
    guestCapacity: { min: 1, max: guestsPerCar },
    notes: [
      "The quietest of the three; reads almost black in shadow and elegant in the evening.",
    ],
  },
];

/**
 * Offering the choice is cheap and memorable: it makes the reply feel personal
 * and gives the guest a reason to write back with something other than a date.
 *
 * Do not volunteer a favourite — the operator knows which car is the best
 * preserved. If pressed, answer with condition and comfort, not colour.
 */
export const vehicleSelectionNote =
  "Guests may pick a colour when more than one car is free. Confirm against the diary before naming any car as available.";
