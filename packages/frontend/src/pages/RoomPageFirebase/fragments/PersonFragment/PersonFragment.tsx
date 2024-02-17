import { InputWithButton } from "../../../../components/InputWithButton"

export type PersonFragmentProps = {
    setPerson: (name: string) => void | Promise<void>;
    ifUserNotExists: (userName: string) => boolean | Promise<boolean>;
}

export const PersonFragment: React.FC<PersonFragmentProps> = ({
    ifUserNotExists,setPerson
}) => {

    return (
        <InputWithButton
            label="Choose a name"
            placeholder="Your name here"
            textButton="Go to the room with this name"
            onClickButton={setPerson}
            validate={ifUserNotExists}
            required={true}
            validationErrorMessage="User already exists"
        />
    )
}