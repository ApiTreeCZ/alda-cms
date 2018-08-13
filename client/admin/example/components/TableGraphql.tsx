import * as React from 'react';
import {Query as ApolloQuery} from 'react-apollo';
import {Example} from '@graphql-model';
import gql from 'graphql-tag';
import {Button, LinearProgress} from '@material-ui/core';

class AllExamplesQuery extends ApolloQuery<Response> {}

const query = gql`
    query FindAllExamples {
        findAllExamples {
            id
            firstName
            lastName
            role
        }
    }
`;

interface Response {
    findAllExamples: Required<Example[]>;
}

// tslint:disable-next-line
export class TableGraphql extends React.Component {
    handleOnClickRefresh = (refetch: () => void) => () => {
        refetch();
    };

    render() {
        return (
            <div>
                <AllExamplesQuery query={query} notifyOnNetworkStatusChange fetchPolicy="cache-and-network">
                    {({loading, data, refetch}) => {
                        if (loading || !data || !data.findAllExamples) {
                            return <LinearProgress />;
                        }
                        return (
                            <>
                                <Button onClick={this.handleOnClickRefresh(refetch)}>Refresh</Button>
                                <ul>
                                    {data.findAllExamples.map((row) => (
                                        <li key={row.id}>{row.firstName}</li>
                                    ))}
                                </ul>
                            </>
                        );
                    }}
                </AllExamplesQuery>
            </div>
        );
    }
}
