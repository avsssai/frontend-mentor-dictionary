import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { ZodError } from "zod";
import { DictionaryAPIRes, DictionaryAPITypes } from "../types/apiTypes";

const URL_BASE = `https://api.dictionaryapi.dev/api/v2/entries/en`;
async function getResult(word: string): Promise<AxiosResponse<DictionaryAPIRes>> {
	try {
		const word_url = `${URL_BASE}/${word}`;
		const res = await axios.get(word_url);
		DictionaryAPITypes.parse(res.data);
		return res;
	} catch (error) {
		if (error instanceof ZodError) {
			console.log(error.issues);
		}
		const err = error as AxiosError;
		if (err?.response?.status === 404) {
			throw new Error("Whoops! we can't find the word.");
		}
		console.log(error);
		throw new Error("something went wrong, it might be due to a word being entered wrong." as any);
	}
}

export default function useGetData(word: string) {
	return useQuery({ queryKey: ["word", word], queryFn: () => getResult(word) });
}
