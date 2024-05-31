import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { contractApiSlice } from '@flux/api/contract';
import { FindAllArtistContractsResponseDto } from '@flux/api/contract/dto/find-all-artist-contracts.dto';

interface IUseContractManagerPage {
	contractsData?: FindAllArtistContractsResponseDto[];
	contractsError: any;
	contractsIsLoading: boolean;
}

const useContractManagerPage = (): IUseContractManagerPage => {
	const { artistData } = useArtistAppContext();
	const {
		data: contractsData,
		error: contractsError,
		isLoading: contractsIsLoading
	} = contractApiSlice.useFindAllArtistContractsQuery({
		query: { page: 1, limit: 10, artist_id: artistData.artist_id }
	});

	return {
		contractsData,
		contractsError,
		contractsIsLoading
	};
};

export default useContractManagerPage;
