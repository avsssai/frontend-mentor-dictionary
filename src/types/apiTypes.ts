import { z } from "zod";

export const DictionaryAPITypes = z.array(
	z.object({
		word: z.string(),
		phonetic: z.string().optional(),
		phonetics: z.array(
			z.object({
				text: z.string().optional(),
				audio: z.string().optional(),
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
						example: z.string().optional(),
					})
				),
				synonyms: z.array(z.string()).optional(),
				antonyms: z.array(z.string()).optional(),
			})
		),
		license: z.object({
			name: z.string(),
			url: z.string(),
		}),
		sourceUrls: z.array(z.string()),
	})
);

export const PhoneticType = z.array(
	z.object({
		text: z.string().optional(),
		audio: z.string().optional(),
		sourceUrl: z.string().optional(),
		license: z
			.object({
				name: z.string(),
				url: z.string(),
			})
			.optional(),
	})
);

export type PhoneticRes = z.infer<typeof PhoneticType>;

export type DictionaryAPIRes = z.infer<typeof DictionaryAPITypes>;
