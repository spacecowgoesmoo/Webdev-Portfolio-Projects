// Main page controller
class Main extends React.Component {
	constructor() {
		super()
		this.state = {
			allColors: []
		}
	}

	componentDidMount() {
		this.rerollColors()
	}

	cowClick = () => {
		this.rerollColors()
	}
		
	rerollColors() {
		const red = randomColor({ count: 8, hue: 'red' })
		const orange = randomColor({ count: 10, hue: 'orange' })
		const yellow = randomColor({ count: 10, hue: 'yellow' })
		const green = randomColor({ count: 10, hue: 'green' })
		const blue = randomColor({ count: 10, hue: 'blue' })
		const purple = randomColor({ count: 10, hue: 'purple' })
		const pink = randomColor({ count: 10, hue: 'pink' })
		
		this.setState({
			allColors: red.concat( orange, yellow, green, blue, purple, pink )
		})
	}

	render() {
		return (
			<div id='mainContent'>
				<TextSquare 
					cowClick={this.cowClick}
					textContent='Randomize!'
				/>
				{this.state.allColors.map(q =>
					<ColorSquare 
						bgColor={q}
						key={uuidv1()}
					/>
				)}
				<h6>Powered by <a target="_blank" href='https://randomcolor.lllllllllllllllll.com/'>randomColor.js</a></h6>
			</div>
		)
	}
}








// Page header
class TextSquare extends React.Component {	
	render() {
		return (
			<div 
				className={'TextSquare ' + this.props.cowClass }
				onClick={this.props.cowClick}
			>
				{this.props.textContent}
			</div>
		)
	}
}








// Components
class ColorSquare extends React.Component {
	constructor() {
		super()
		this.state = {
			bgColor: "",
			textContent: "",
			textColor: ""
		}
	}
	
	componentDidMount() {
		const zzz = invertCssColor(this.props.bgColor)
		this.setState({ 
			bgColor: this.props.bgColor,
			textContent: this.props.bgColor,
			textColor: zzz
		})
	}
	
	copyHexcode = () => {
		copyTextToClipboard( this.props.bgColor );
		this.setState({ textContent: 'Copied!' })
	}
	
	resetTextToBGColor = () => {
		this.setState({ textContent: this.state.bgColor })
	}
	
	render() {
		const cowStyle = {
			background: this.state.bgColor,
			color: this.state.textColor,
		}
		
		return (
			<div 
				className='ColorSquare' 
				style={cowStyle}
				onClick={ this.copyHexcode }
				onMouseOut={ this.resetTextToBGColor }
				>
				{ this.state.textContent }
			</div>
		)
	}
}








// ==============================================================

// Renderer
ReactDOM.render((
	<Main />
), reactRootDiv );