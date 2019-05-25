import React from "react";
import { Query } from "react-apollo";
import { GET_RESULTS, GET_EMPLOYEES } from "../../../../graphql/queries";
import DisplayErrors from "../../../common/DisplayErrors";
import Loading from "../../../common/Loading";
import ResultsContent from "./ResultsContent";

const AdminResultsPage = ({
  location: { pathname },
  company: { companyName }
}) => {
  return (
    <Query
      query={GET_RESULTS}
      variables={{ companyName }}
      pollInterval={300000}
      fetchPolicy={"network-only"}
    >
      {({ loading, error, data: { getResults } }) => {
        const message = {
          header: "fetching results",
          content: "please wait while we retrieve your data"
        };
        if (loading) {
          return <Loading message={message} />;
        }
        if (error) {
          return (
            <div>
              <p>{`${error}`}</p>
            </div>
          );
        }
        const { results, errors } = getResults;
        if (errors) {
          return <DisplayErrors errors={errors} />;
        }
        return (
          <Query query={GET_EMPLOYEES} variables={{ companyName }}>
            {({ loading, error, data: { getEmployees } }) => {
              if (loading) {
                return <Loading />;
              }
              if (error) {
                return (
                  <div>
                    <p>{`${error}`}</p>
                  </div>
                );
              }
              if (getEmployees.errors) {
                return <DisplayErrors errors={getEmployees.errors} />;
              }
              const { employees } = getEmployees;
              return (
                <ResultsContent
                  companyName={companyName}
                  pathname={pathname}
                  results={results}
                  users={employees}
                />
              );
            }}
          </Query>
        );
      }}
    </Query>
  );
};

export default AdminResultsPage;
