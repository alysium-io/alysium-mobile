import { contractApiSlice } from '@flux/api/contract';
import { FindOneContractResponseDto } from '@flux/api/contract/dto/find-one-contract.dto';
import { ApiIdentifier } from '@types';

interface IUseArtistViewContractPage {
	contractData?: FindOneContractResponseDto;
	contractError: any;
	contractIsLoading: boolean;
}

const useArtistViewContractPage = (
	contractId: ApiIdentifier
): IUseArtistViewContractPage => {
	const {
		data: contractData,
		error: contractError,
		isLoading: contractIsLoading
	} = contractApiSlice.useFindOneQuery({
		params: { contract_id: contractId }
	});

	return {
		contractData,
		contractError,
		contractIsLoading
	};
};

export default useArtistViewContractPage;
