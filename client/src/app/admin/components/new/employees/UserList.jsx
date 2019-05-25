import React, { Fragment } from "react";
import { List } from "semantic-ui-react";
import { Query } from "react-apollo";
import SetPassword from "./SetPassword";
import UserAddToList from "./UserAddtoList";
import { GET_EMPLOYEES } from "../../../../../graphql/queries";
import Loading from "../../../../common/Loading";
import RemoveEmployee from "../../employees/management/RemoveEmployee";

const UserList = ({ companyName, user }) => (
  <Query query={GET_EMPLOYEES} variables={{ companyName }} pollInterval={1000}>
    {({ data: { getEmployees }, loading, error }) => {
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
      if (getEmployees && getEmployees.employees) {
        return (
          <Fragment>
            <List divided relaxed>
              {getEmployees.employees.map((user, i) => {
                if (!user.email) {
                  return null;
                }
                if (user.dashboardAccess) {
                  return (
                    <List.Item
                      key={user.email + i}
                      style={{ listStyleType: "none" }}
                    >
                      <List.Content>
                        <List.Header>
                          <RemoveEmployee id={user._id} />
                          {`${user.firstName} ${user.lastName}`}
                        </List.Header>
                        <List.Description>{`e:${user.email} m:${
                          user.mobile
                        }`}</List.Description>
                        <List.Description>
                          <SetPassword email={user.email} id={user._id} />
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  );
                }
                return (
                  <List.Item
                    key={user.email + i}
                    style={{ listStyleType: "none" }}
                  >
                    <List.Content>
                      <List.Header>
                        <RemoveEmployee id={user._id} />
                        {`${user.firstName} ${user.lastName}`}
                      </List.Header>
                      <List.Description>{`e:${user.email} m:${
                        user.mobile
                      }`}</List.Description>
                      <List.Description>
                        dashboard access: {`${user.dashboardAccess}`}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
          </Fragment>
        );
      }
      return (
        <Fragment>
          <UserAddToList user={user} companyName={companyName} />
          <List divided relaxed>
            <List.Item style={{ listStyleType: "none" }}>
              <List.Content>
                <List.Header>No User to Display</List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Fragment>
      );
    }}
  </Query>
);

export default UserList;
