/**
 * The primary (i.e. uppermost) navigation on desktop. Renders all sections and
 * the home-, website- and signout buttons.
 */

import React from 'react';
import { Container } from '../../../elemental';
import PrimaryNavItem from './NavItem';

var PrimaryNavigation = React.createClass({
	displayName: 'PrimaryNavigation',
	propTypes: {
		brand: React.PropTypes.string,
		currentSectionKey: React.PropTypes.string,
		sections: React.PropTypes.array.isRequired,
		signoutUrl: React.PropTypes.string,
	},
	getInitialState () {
		return {};
	},
	// Handle resizing, hide this navigation on mobile (i.e. < 768px) screens
	componentDidMount () {
		this.handleResize();
		window.addEventListener('resize', this.handleResize);
	},
	componentWillUnmount () {
		window.removeEventListener('resize', this.handleResize);
	},
	handleResize () {
		this.setState({
			navIsVisible: window.innerWidth >= 768,
		});
	},
	// Render the sign out button
	renderSignout () {
		if (!this.props.signoutUrl) return null;

		return (
			<PrimaryNavItem
		label="glyphicon glyphicon-log"
		href={this.props.signoutUrl}
		title="Sign Out"
			>
			Sign Out
		</PrimaryNavItem>
	);
	},
	// Render the back button
	renderBackButton () {
		if (!Keystone.backUrl) return null;

		return (
			<PrimaryNavItem
		label="octicon-globe"
		href={Keystone.backUrl}
		title={'Front page - ' + this.props.brand}
			>
			<span className="octicon octicon-globe" />
			</PrimaryNavItem>
	);
	},
	// Render the link to the webpage
	renderFrontLink () {
		return (
			<ul className="app-nav app-nav--primary app-nav--right">
			{/*this.renderBackButton()*/}
		{this.renderSignout()}
	</ul>
	);
	},
	renderBrand () {
		// TODO: support navbarLogo from keystone config
		if (!Keystone.backUrl) return null;
Keystone.backUrl = Keystone.backUrl + 'secure'
		const { brand, currentSectionKey } = this.props;
		const className = currentSectionKey === 'dashboard' ? 'primary-navbar__brand primary-navbar__item--active' : 'primary-navbar__brand';
		return (
			<PrimaryNavItem
		className={className}
		href={Keystone.backUrl}
		label="octicon-home"
		title={'Front page - ' + this.props.brand}
			>
			Home
			</PrimaryNavItem>
	);
	},
	// Render the navigation
	renderNavigation () {
		if (!this.props.sections || !this.props.sections.length) return null;

		let array =  this.props.sections.map((section) => {
			// Get the link and the class name
			const href = section.lists[0].external ? section.lists[0].path : `${Keystone.adminPath}/${section.lists[0].path}`;
			const isActive = this.props.currentSectionKey && this.props.currentSectionKey === section.key;
			const className = isActive ? 'primary-navbar__item--active' : null;
			return (
				<PrimaryNavItem
			active={isActive}
			key={section.key}
			label={section.label}
			className={className}
			to={href}
				>
				{section.label}
		</PrimaryNavItem>
		);
		});

		array.push(<li className="primary-navbar__item">
			<a className='primary-navbar__link' href="http://18.188.246.13" target='_self'> Reports and Receipts </a>
		</li>)

		return array
	},
	render () {
		if (!this.state.navIsVisible) return null;

		return (
			<nav className="primary-navbar">
			<ul className="app-nav app-nav--primary app-nav--left">
			{this.renderBrand()}
		{this.renderNavigation()}
	</ul>
		{this.renderFrontLink()}
	</nav>
	);
	},
});

module.exports = PrimaryNavigation;
