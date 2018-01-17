import React, { Component } from "react";
import Title from "./Title"

class MasterHeader extends Component {
	render() {
		const { title } = this.props;

		return (
			<header>
				<Title title={ title }></Title>
			</header>
		);
	}
}

export default MasterHeader;
