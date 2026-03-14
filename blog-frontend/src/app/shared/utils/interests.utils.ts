import { Interest } from '../models/Interest';
import {INTERESTS} from "../constants/Interest.constant";

/**
 * Find an Interest object by its label (case-insensitive).
 * e.g. getInterestByLabel('music') → { label: 'Music', icon: '🎵' }
 */
export function getInterestByLabel(label: string): Interest | undefined {
  return INTERESTS.find(
    (i) => i.label.toLowerCase() === label.toLowerCase()
  );
}

/**
 * Find multiple Interest objects from a list of labels.
 * Unmatched labels are silently skipped.
 * e.g. getInterestsByLabels(['Music', 'Travel']) → [{ label: 'Music', icon: '🎵' }, ...]
 */
export function getInterestsByLabels(labels: string[]): Interest[] {
  return labels
    .map((label) => getInterestByLabel(label))
    .filter((i): i is Interest => i !== undefined);
}

/**
 * Return all available interests.
 * Useful for populating a multi-select or checkbox list.
 */
export function getAllInterests(): Interest[] {
  return INTERESTS;
}
