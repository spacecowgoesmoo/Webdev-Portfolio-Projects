// SVG UI elements
// https://www.svgrepo.com/
class SVGrewind extends React.Component {
	render() {
		return (
			<svg 
				xmlns='http://www.w3.org/2000/svg' 
				onClick={ () => console.log('Previous track') }
				className="svgRewind" 
				viewBox="0 0 394.941 394.941" 
				fill="#FFF"
				>
				<path d="M209.449,183.311V73.718L0,197.465l209.449,123.759V211.618l185.492,109.605V73.718L209.449,183.311"/>
			</svg>
		)
	}
}

class SVGplay extends React.Component {
	render() {
		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				onClick={ () => console.log('Play') }
				className="svgPlay" 
				viewBox="0 0 32 32" 
				fill="#FFF"
				>
			    <polygon points="4,0 28,16 4,32"/>
			</svg>
		)
	}
}

class SVGpause extends React.Component {
	render() {
		return (
			<svg 
				xmlns='http://www.w3.org/2000/svg'
				onClick={ () => console.log('Pause') }
				className="svgPause"
				viewBox="0 0 353.562 353.562" 
				fill="#FFF"
				>
 	    		<path d="M41.064,353.562h109.014V0H41.064V353.562"/>
 	   	 		<path d="M203.482,0v353.562h109.017V0H203.482"/>
			</svg>
		)
	}
}

class SVGfastForward extends React.Component {
	render() {
		return (
			<svg 
				xmlns='http://www.w3.org/2000/svg'
				onClick={ () => console.log('Next track') }
				className="svgFastForward"
				viewBox="0 0 394.941 394.941" 
				fill="#FFF"
				>
				<path d="M185.492,211.636v109.588l209.449-123.747L185.492,73.718v109.611L0,73.718v247.506L185.492,211.636"/>
			</svg>
		)
	}
}




class PlayPauseButton extends React.Component {
	constructor( props ) {
		super( props )
		this.state = {
			playOrPause: 'play',
		}
	}

	togglePlayPauseButton() {
		if ( this.state.playOrPause == 'play' ) 		{ this.setState({ playOrPause: 'pause' }) }
		else if ( this.state.playOrPause == 'pause' )	{ this.setState({ playOrPause: 'play' }) }
	}

	render() {
		switch ( this.state.playOrPause ) {
			case 'play':
				return (
					<div onClick={ () => this.togglePlayPauseButton() } className='playPauseButtonDiv'>
 						<SVGplay />
					</div>
				)
				break

			case 'pause':
				return (
					<div onClick={ () => this.togglePlayPauseButton() } className='playPauseButtonDiv'>
 						<SVGpause />
					</div>
				)
				break

			default: break
		}
	}
}








class PinkAudioPlayer extends React.Component {
	render() {
		return (
			<div className='boomboxContainer'>


				<div className='textFields'>
					<div className='bandAlbumTitle'>{this.props.artist} - {this.props.album}</div>
					<div className='songTitle'>{this.props.trackName}</div>
					<div className='playtime'>1:57</div>
				</div>


				<progress max='100' value='64'></progress>


				<div className='controlButtons'>
					<input id={uuidv4()} className='volumeSlider' type='range' min='0' max='100' defaultValue='64'/>
					<SVGrewind />
					<PlayPauseButton />
					<SVGfastForward />
				</div>
			</div>
		)
	}
}








// ==============================================================

class Main extends React.Component {
	componentDidMount() {
		sliders()
	}
	
	render() {
		return (
			<div>
				<PinkAudioPlayer artist={'Rush'} album={'Signals'} trackName={'Subdivisions'}/>
				<PinkAudioPlayer artist={'Rush'} album={'Signals'} trackName={'The Analog Kid'}/>
				<PinkAudioPlayer artist={'Rush'} album={'Signals'} trackName={'Chemistry'}/>
				<PinkAudioPlayer artist={'Rush'} album={'Signals'} trackName={'Digital Man'}/>
				<PinkAudioPlayer artist={'Rush'} album={'Signals'} trackName={'The Weapon'}/>
				<PinkAudioPlayer artist={'Rush'} album={'Signals'} trackName={'New World Man'}/>
				<PinkAudioPlayer artist={'Rush'} album={'Signals'} trackName={'Losing It'}/>
				<PinkAudioPlayer artist={'Rush'} album={'Signals'} trackName={'Countdown'}/>
			</div>
		)
	}
}

// Renderer
ReactDOM.render((
	<Main/>
), reactRootDiv );