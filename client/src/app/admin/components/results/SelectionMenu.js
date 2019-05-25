import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu, Button } from 'semantic-ui-react';
import { NoPrint } from './styles';

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
    const { users, companyName } = this.props;
    const managerEmails = new Set(
      users.reduce(
        (arr, user) =>
          user.manager && user.companyName === companyName
            ? [...arr, user.manager]
            : arr,
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

    this.props.filterResults({
      username: `${choosenOne.firstName} ${choosenOne.lastName}`,
      participant: value,
      manager: this.state.manager,
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
  };

  render() {
    const { disabled, manager, managers, user, users } = this.state;

    return (
      <NoPrint>
        <Fragment>
          <Menu.Item>
            <Button.Group>
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
            <Button.Group>
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
      </NoPrint>
    );
  }
}

SelectionMenu.propTypes = {
  companyName: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  filterResults: PropTypes.func.isRequired,
};

export default SelectionMenu;
