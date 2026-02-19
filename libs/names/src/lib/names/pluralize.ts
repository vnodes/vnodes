/** biome-ignore-all lint/complexity/noStaticOnlyClass: just for this*/
import { normalizeName } from './normalize-name.js';

/**
 * Comprehensive English Pluralizer Engine
 */
class AdvancedPluralizer {
    // 1. UNCOUNTABLE NOUNS: Words that never change form regardless of quantity.
    private static readonly UNCOUNTABLES = new Set([
        // General
        'advice',
        'aircraft',
        'art',
        'baggage',
        'butter',
        'clothing',
        'coal',
        'cotton',
        'corn',
        'currency',
        'education',
        'equipment',
        'evidence',
        'experience',
        'feedback',
        'fish',
        'flour',
        'food',
        'furniture',
        'gas',
        'gold',
        'grammar',
        'guilt',
        'hair',
        'happiness',
        'help',
        'homework',
        'ice',
        'impatience',
        'information',
        'jeans',
        'knowledge',
        'leather',
        'love',
        'luggage',
        'meat',
        'milk',
        'money',
        'music',
        'news',
        'oil',
        'patience',
        'police',
        'polish',
        'progress',
        'pollution',
        'rain',
        'rice',
        'sand',
        'series',
        'sheep',
        'shrimp',
        'silver',
        'snow',
        'space',
        'species',
        'sugar',
        'swine',
        'talent',
        'tea',
        'toothpaste',
        'traffic',
        'understanding',
        'water',
        'weather',
        'wheat',
        'wood',
        'wool',
        // Academic Subjects / Diseases
        'mathematics',
        'physics',
        'economics',
        'statistics',
        'politics',
        'athletics',
        'gymnastics',
        'mumps',
        'measles',
        'diabetes',
    ]);

    // 2. IRREGULAR MAPPINGS: Words that follow no standard phonetic rule.
    private static readonly IRREGULARS: Record<string, string> = {
        // People & Animals
        person: 'people',
        child: 'children',
        ox: 'oxen',
        goose: 'geese',
        tooth: 'teeth',
        foot: 'feet',
        mouse: 'mice',
        louse: 'lice',
        leaf: 'leaves',
        // Latin/Greek/Scientific
        cactus: 'cacti',
        nucleus: 'nuclei',
        focus: 'foci',
        radius: 'radii',
        fungus: 'fungi',
        alumnus: 'alumni',
        syllabus: 'syllabi',
        appendix: 'appendices',
        index: 'indices',
        matrix: 'matrices',
        vertex: 'vertices',
        vortex: 'vortices',
        criterion: 'criteria',
        phenomenon: 'phenomena',
        automaton: 'automata',
        bacterium: 'bacteria',
        datum: 'data',
        medium: 'media',
        stratum: 'strata',
        curriculum: 'curricula',
        corpus: 'corpora',
        genus: 'genera',
    };

    // 3. REGEX RULES: Structural patterns for common English suffixes.
    private static readonly RULES: [RegExp, string][] = [
        [/(ax|test|cris|bas|diagnos|the)is$/i, '$1es'], // crisis -> crises
        [/(octop|vir)us$/i, '$1i'], // octopus -> octopi
        [/(alias|status|walrus|canvas)$/i, '$1es'], // status -> statuses
        [/(bu)s$/i, '$1ses'], // bus -> buses
        [/(buffal|tomat|potat|her|ech)o$/i, '$1oes'], // hero -> heroes
        [/(psalm|quiz)$/i, '$1zes'], // quiz -> quizes
        [/(?:([^f])fe|([lr])f)$/i, '$1$2ves'], // wolf -> wolves, wife -> wives
        [/([^aeiouy]|qu)y$/i, '$1ies'], // fly -> flies
        [/(x|ch|ss|sh)$/i, '$1es'], // church -> churches
        [/(m)an$/i, '$1en'], // woman -> women
        [/s$/i, 's'], // Already plural
        [/$/i, 's'], // Default
    ];

    public static pluralize(word: string): string {
        // Check Uncountables
        if (AdvancedPluralizer.UNCOUNTABLES.has(word)) return word;

        // Check Irregulars
        if (AdvancedPluralizer.IRREGULARS[word]) {
            return AdvancedPluralizer.IRREGULARS[word];
        }

        // Apply Regex Rules
        for (const [rule, replacement] of AdvancedPluralizer.RULES) {
            if (rule.test(word)) {
                return word.replace(rule, replacement);
            }
        }

        return word;
    }
}

// Exported Helper
export const pluralize = (word: string) => {
    word = normalizeName(word);
    return AdvancedPluralizer.pluralize(word);
};
