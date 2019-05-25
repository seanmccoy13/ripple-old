import React from 'react';
import ReminderButton from './ReminderButton';
import { List } from 'semantic-ui-react';

const ListOwed = ({ list }) => {
  return (
    <List divided relaxed>
      {list.map(user => {
        const lastSMS = user.surveyOwed ? 'survey overdue' : 'up to date';
        return (
          <List.Item key={user.email} size="mini">
            <List.Icon name="mobile" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>{`${user.firstName} ${user.lastName} - ${
                user.email
              }`}</List.Header>
              <List.Description>{lastSMS}</List.Description>
              <List.Description>
                {`m: ${user.mobile}`}{' '}
                <ReminderButton
                  mobile={user.mobile}
                  firstTime={user.firstTime}
                  companyName={user.companyName}
                />
              </List.Description>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};

export default ListOwed;
