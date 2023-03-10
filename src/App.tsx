import { useState } from "react";
import ThemeSwitcher from "./components/ThemeSwitcher";
import useGetData, { mountSynonym } from "./hooks/useGetData";
import { Book, Search, ExternalLink, AlertCircle } from "react-feather";
import useStickyState from "./hooks/useStickyState";
import Phonetics from "./components/Phonetics";
import { PhoneticRes } from "./types/apiTypes";

function App() {
	const [input, setInput] = useStickyState("input", "keyboard");
	const [searchTerm, setSearchTerm] = useStickyState("searchTerm", "keyboard");
	const { data, error, isError, isLoading } = useGetData(searchTerm);
	const [font, setFont] = useStickyState("font", "sans");
	const res = data?.data[0];

	const getWord = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (!input) return;
		setSearchTerm(input);
	};

	function updateSearch(syn: string) {
		setSearchTerm(syn);
		setInput(syn);
	}
	const Loader = () => (
		<div className=' flex justify-center items-center'>
			<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-gray-200'></div>
		</div>
	);

	return (
		<div className={`App min-h-screen bg:white dark:bg-gray-800 text-black font-${font} dark:text-white`}>
			<div className='max-w-3xl mx-auto'>
				<div className='header flex justify-between items-center p-4 mb-8'>
					<div className='icon text'>
						<Book color='#adb5bd' size={36} />
					</div>
					<div className='flex items-center justify-center gap-4'>
						<select
							name='font-select'
							id='font-select'
							value={font}
							onChange={(e) => setFont(e.target.value)}
							className='appearance-none rounded-xl bg-white dark:bg-gray-800 p-3 shadow-xl'>
							<option value='sans' selected={font === "sans"}>
								Sans
							</option>
							<option value='serif' selected={font === "serif"}>
								Serif
							</option>
							<option value='mono' selected={font === "mono"}>
								Mono
							</option>
						</select>

						<ThemeSwitcher moonColor='#adb5bd' sunColor='#f5cb5c' />
					</div>
				</div>

				<div className='app p-4'>
					<form onSubmit={getWord} className='relative mb-16'>
						<input
							type='text'
							onChange={(e) => setInput(e.target.value)}
							className='px-5 py-3 w-full text-lg rounded-3xl font-black bg-gray-200  dark:bg-slate-700'
							placeholder='Search for a word...'
							value={input}
						/>

						<Search className='absolute right-6 top-4 text-purple-500' />
					</form>
					{/* <div className='word'>{data?.data}</div> */}
					{isLoading ? (
						<Loader />
					) : isError ? (
						<div className='error text-red-500 flex justify-center items-center text-3xl gap-3'>
							<AlertCircle color='red' /> {(error as any).message}
						</div>
					) : (
						<>
							<div className='text-4xl md:text-6xl font-bold mb-2 md:mb-6 flex justify-between items-center'>
								{res?.word}
								<div>
									<Phonetics phonetics={res?.phonetics as PhoneticRes} />
								</div>
							</div>
							<div className='pronunciation text-purple-500 mb-8 md:text-2xl'>{res?.phonetic}</div>

							<div className='meanings md:text-xl mb-8'>
								{res?.meanings.map((meaning, index) => (
									<div className='meaningWrapper mb-8' key={`${meaning.partOfSpeech}-${index}`}>
										<div className='pos text-xl md:text-2xl font-bold italic mb-8'>
											{meaning.partOfSpeech}
										</div>
										<div className='meaning text-gray-600 dark:text-gray-400 mb-4'>Meaning</div>
										<ul className='meanings list list-disc list-outside px-4 list marker:text-purple-500'>
											{meaning.definitions.map((definition) => (
												<li className='definition mb-8 px-8' key={definition.definition}>
													{definition.definition}
													{definition.example ? (
														<div className='example text-gray-600 dark:text-gray-400 mt-2'>
															"{definition.example}""
														</div>
													) : (
														""
													)}
												</li>
											))}
										</ul>
										{meaning.synonyms?.length ? (
											<div className='synonyms'>
												<span className='text-gray-600 dark:text-gray-400'> Synonyms </span>
												{meaning.synonyms.map((syn) => (
													<span key={syn} className='ml-8 text-purple-500 font-black'>
														<span
															className='cursor-pointer'
															onClick={() => updateSearch(syn)}>
															{syn}
														</span>
													</span>
												))}
											</div>
										) : (
											""
										)}
									</div>
								))}
							</div>
							<div className='text-gray-600 dark:text-gray-400 mb-4 flex gap-2 flex-col'>
								Source
								<a
									href={res?.sourceUrls[0]}
									className=' text-gray-800 dark:text-gray-200 flex items-center gap-2'>
									{res?.sourceUrls[0]}
									<ExternalLink size={12} />
								</a>
							</div>
						</>
					)}
				</div>
				{/* <pre>{JSON.stringify(res, null, 2)}</pre> */}
			</div>
		</div>
	);
}

export default App;
