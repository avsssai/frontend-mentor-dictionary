import { Play } from "react-feather";
import { PhoneticRes } from "../../types/apiTypes";
import useSound from "use-sound";
export default function Phonetics({ phonetics }: { phonetics: PhoneticRes }) {
	const phoneticsWithSound = phonetics.filter(
		(phonetic) => phonetic.audio?.length !== 0 && phonetic.text?.length !== 0
	);
	const audioUrl = phoneticsWithSound[0]?.audio ? phoneticsWithSound[0]?.audio : "";
	const [play, { stop }] = useSound(audioUrl);
	return (
		<button onClick={() => play()} className='relative rounded-full p-10 bg-purple-200 justify-center'>
			<Play size={48} color='#c77dff' className='absolute top-4 left-5' />
		</button>
	);
}
