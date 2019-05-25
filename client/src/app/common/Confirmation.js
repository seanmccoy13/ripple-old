import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default class Confirmation extends Component {
	constructor(props) {
		super(props);
		this.state = { modalOpen: false };
	}

	handleOpen = () => this.setState({ modalOpen: true });

	handleClose = (action = 'confirm') => {
		this.setState({ modalOpen: false });
		return action === 'confirm' ? this.props.handleSubmit() : this.props.handleCancel();
	};

	render() {
		return (
			<Modal
				trigger={<Button onClick={this.handleOpen}>Save</Button>}
				open={this.state.modalOpen}
				onClose={this.handleClose}
				basic
				size="fullscreen"
			>
				<Header icon="browser" content="Assign Survey " />
				<Modal.Content>
					<h3>Are you sure you want this survey to go live?</h3>
				</Modal.Content>
				<Modal.Actions>
					<Button.Group>
						<Button color="red" onClick={() => this.handleClose('cancel')} inverted>
							<Icon name="user cancel" /> Cancel
						</Button>
						<Button color="green" onClick={this.handleClose} inverted>
							<Icon name="checkmark" /> Confirm
						</Button>
					</Button.Group>
				</Modal.Actions>
			</Modal>
		);
	}
}
