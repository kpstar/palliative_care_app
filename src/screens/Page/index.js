import React, { Component } from 'react';
import { View, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import Styles from './styles';
import Text from '@text';
import Button from '@button';
import { htmlStyles, Images } from '@theme';
import { getApiData } from '@apiNew';
import HTMLView from 'react-native-htmlview';

export default class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageContent: ''
		};
	}

	async componentDidMount() {
		const { pageName } = this.props.navigation.state.params;
		console.log('page name');
		console.log(pageName);
		const content = await getApiData(pageName);
		this.setState({ pageContent: content[0] });
	}

	render() {
		return (
			<ImageBackground source={Images.bg_navigation} resizeMode="stretch" style={Styles.container}>
				<ScrollView contentContainerStyle={Styles.scroll}>
					<View style={Styles.titleView}>
						{console.log('state')}
						{console.log(this.state)}
						<Text large style={Styles.title}>
							{this.state.pageContent.title}
						</Text>
					</View>

					<View style={[ Styles.itemView ]}>
						<HTMLView value={this.state.pageContent.body} stylesheet={htmlStyles} />
					</View>
				</ScrollView>
				<View style={Styles.buttonBar}>
					<Button bold light onPress={() => this.props.navigation.navigate('Home')}>
						Go back
					</Button>
				</View>
			</ImageBackground>
		);
	}
}
