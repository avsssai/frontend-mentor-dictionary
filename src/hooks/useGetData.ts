import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { ZodError } from "zod";
import { DictionaryAPIRes, DictionaryAPITypes } from "../types/apiTypes";

const URL_BASE = `https://api.dictionaryapi.dev/api/v2/entries/en`;
async function getResult(word: string): Promise<AxiosResponse<DictionaryAPIRes>> {
	try {
		const word_url = `${URL_BASE}/${word}`;
		const res = await axios.get(word_url);
		DictionaryAPITypes.parse(res.data);
		return res.data;
	} catch (error: any) {
		if (error instanceof ZodError) {
			console.log(error.issues);
		}
		return error.message;
	}
}

export default function useGetData(word: string) {
	return useQuery({ queryKey: ["word", word], queryFn: () => getResult(word) });
}
