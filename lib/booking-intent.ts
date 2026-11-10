/**
 * Tiny client-side bridge so a "Book this tour" button can preselect the
 * matching option in the booking form further down the page.
 */
type Listener = (tourId: string) => void;

let listeners: Listener[] = [];
let current: string | null = null;

export function setTourIntent(tourId: string) {
  current = tourId;
  listeners.forEach((listener) => listener(tourId));
}

export function getTourIntent() {
  return current;
}

export function onTourIntent(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

/**
 * useSyncExternalStore-compatible subscription: fires whenever the intent
 * changes, with getTourIntent() supplying the snapshot.
 */
export function subscribeTourIntent(onStoreChange: () => void) {
  return onTourIntent(() => onStoreChange());
}
