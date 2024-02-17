import { EstimationOfPerson } from 'Estimations';
import { EstimationInput } from '../../../components/EstimationInput/EstimationInput';
import { EstimationsTable } from '../../../components/EstimationsTable/EstimationsTable';

export type RoomFragmentProps = {
    estimationsChanged: (estimations: string[]) => void ;
    usersAndEstimations: EstimationOfPerson[];
}

export const RoomFragment: React.FC<RoomFragmentProps> = ({
    estimationsChanged, usersAndEstimations
}) => (
    <>
        <EstimationInput onEstimationChange={estimationsChanged} />
        <h1>Estimations</h1>
        <div className="full-width">
            <EstimationsTable estimations={usersAndEstimations} />
        </div>
    </>
)