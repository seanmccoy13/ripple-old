import React, { Component, Fragment } from 'react';
import { Dropdown, Menu, Button } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { FILTER_RESULTS } from '../../../../graphql/local/mutations';
import { NoPrint } from './styles';
import SearchComponent from './SearchComponent';
const mutation = FILTER_RESULTS;

class SelectionMenu extends Component {
  state = {
    disabled: true,
    user: '',
    username: '',
    users: [],
    manager: '',
    managers: [],
    managerName: '',
  };

  componentDidMount = () => {
    const managerEmails = new Set(
      this.props.users.reduce(
        (arr, user) => (user.manager ? [...arr, user.manager] : arr),
        []
      )
    );
    const filter = this.props.users.filter(user =>
      managerEmails.has(user.email)
    );

    if (filter.length > 0) {
      const managers = filter.map(user => {
        const options = {
          key: user._id,
          text: `${user.firstName} ${user.lastName}`,
          value: user.email,
        };
        return (
          <Dropdown.Item
            key={options.key}
            {...options}
            onClick={this.onClickManager}
          />
        );
      });

      this.setState({ managers });
    }
  };
  onClickManager = (event, data) => {
    event.preventDefault();
    const participants = this.props.users.reduce((users, user) => {
      if (user.manager === data.value) {
        const options = {
          key: user._id,
          text: `${user.firstName} ${user.lastName}`,
          value: user.email,
        };
        return [
          ...users,
          <Dropdown.Item
            key={options.key}
            {...options}
            onClick={this.onClickUser}
          />,
        ];
      }
      return users;
    }, []);
    this.setState({
      username: '',
      user: '',
      manager: data.value,
      managerName: data.text,
      disabled: false,
      users: participants,
    });
  };

  onClickUser = (event, { value }) => {
    event.preventDefault();
    const choosenOne = this.props.users.find(e => e.email === value);
    this.setState({
      username: `${choosenOne.firstName} ${choosenOne.lastName}`,
      user: value,
    });
    this.props.mutate({
      variables: {
        username: `${choosenOne.firstName} ${choosenOne.lastName}`,
        participant: value,
        manager: this.state.manager,
      },
    });
  };
  onSelectFiltered = (event, { value }) => {
    event.preventDefault();
    const choosenOne = this.props.users.find(e => e.email === value);
    this.setState({
      manager: choosenOne.manager,
      username: `${choosenOne.firstName} ${choosenOne.lastName}`,
      user: value,
    });
    this.props.mutate({
      variables: {
        username: `${choosenOne.firstName} ${choosenOne.lastName}`,
        participant: value,
        manager: choosenOne.manager,
      },
    });
  };

  render() {
    const { disabled, manager, managers, user, users } = this.state;

    return (
      <NoPrint>
        <Fragment>
          <Menu.Item>
            <Button.Group color={'teal'}>
              <Dropdown
                text={manager ? manager : 'Select Manager'}
                icon={'add user'}
                floating
                labeled
                button
                className="icon"
              >
                <Dropdown.Menu>
                  <Dropdown.Header content={'Managers'} />
                  {managers}
                </Dropdown.Menu>
              </Dropdown>
            </Button.Group>
          </Menu.Item>
          <Menu.Item>
            <Button.Group color={'teal'}>
              <Dropdown
                text={user ? user : 'Select Participant'}
                icon="add user"
                floating
                labeled
                button
                className="icon"
                disabled={disabled}
              >
                <Dropdown.Menu>
                  <Dropdown.Header content="Staff Particpants" />
                  {users}
                </Dropdown.Menu>
              </Dropdown>
            </Button.Group>
          </Menu.Item>
        </Fragment>
        <SearchComponent
          select={this.onSelectFiltered}
          users={this.props.users}
        />
      </NoPrint>
    );
  }
}

export default graphql(mutation)(SelectionMenu);
