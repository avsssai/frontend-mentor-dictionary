import { z } from "zod";

export const DictionaryAPITypes = z.array(
	z.object({
		word: z.string(),
		phonetic: z.string(),
		phonetics: z.array(
			z.object({
				text: z.string(),
				audio: z.string(),
				sourceUrl: z.string().optional(),
				license: z
					.object({
						name: z.string(),
						url: z.string(),
					})
					.optional(),
			})
		),
		meanings: z.array(
			z.object({
				partOfSpeech: z.string(),
				definitions: z.array(
					z.object({
						definition: z.string(),
						synonyms: z.array(z.string()),
						antonyms: z.array(z.string()),
					})
				),
			})
		),
		license: z.object({
			name: z.string(),
			url: z.string(),
		}),
		sourceUrls: z.array(z.string()),
	})
);

export type DictionaryAPIRes = z.infer<typeof DictionaryAPITypes>;
