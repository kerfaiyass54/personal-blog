import { Nationality } from '../models/Nationality';
import {COUNTRIES} from "../constants/countries.constant";


/**
 * Find a Nationality object by its adjective label (case-insensitive).
 * e.g. getNationalityByLabel('tunisian') → { code: 'TN', label: 'Tunisian', flag: '🇹🇳' }
 */
export function getNationalityByLabel(label: string): Nationality | undefined {
  return COUNTRIES.find(
    (n) => n.label.toLowerCase() === label.toLowerCase()
  );
}

/**
 * Find a Nationality object by its ISO 3166-1 alpha-2 code (case-insensitive).
 * e.g. getNationalityByCode('tn') → { code: 'TN', label: 'Tunisian', flag: '🇹🇳' }
 */
export function getNationalityByCode(code: string): Nationality | undefined {
  return COUNTRIES.find(
    (n) => n.code.toLowerCase() === code.toLowerCase()
  );
}

/**
 * Return all available nationalities.
 * Useful for populating a <select> or autocomplete dropdown.
 */
export function getAllNationalities(): Nationality[] {
  return COUNTRIES;
}
