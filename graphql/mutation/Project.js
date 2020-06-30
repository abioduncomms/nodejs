import { gql } from 'apollo-boost';

export const ADD_FEEDBACK = gql`
    mutation AddNewFeedBack(
        $message: String
        $photo: String
        $projectId: ID
        $lgaId: ID
    ){
        addNewFeedback(
            newFeedbackPayload:{
                message: $message
                photo: $photo
                projectId: $projectId
                lgaId: $lgaId
            }
        ){
            message
            status
        }
    }
`;