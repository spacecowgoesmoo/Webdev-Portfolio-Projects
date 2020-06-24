// React-Router initializations
const BrowserRouter = window.ReactRouterDOM.BrowserRouter
const Route = window.ReactRouterDOM.Route
const Link = window.ReactRouterDOM.Link
const Prompt = window.ReactRouterDOM.Prompt
const Switch = window.ReactRouterDOM.Switch
const Redirect = window.ReactRouterDOM.Redirect
const NavLink = window.ReactRouterDOM.NavLink
const url = '/portfolio/subpages/movieDB'








// Main page controller
class Main extends React.Component {
	constructor() {
		super()
		const parentThis = this	// Part of the setState function used later
		this.state = {
			selectedMovie: 0,
			APIkey: 'af5f703a01558c668641ad32f7825152',
			currentPage: 1,
			itemsPerPage: 6,
			APIresults: [
				{ q: '1', r: 'placeholder text 1' },
				{ q: '2', r: 'placeholder text 2' }
			],
			setState : function(obj) { parentThis.setState(obj) }	// Allows state from this component to be accessed globally
		}
	}

	// Load the API data
	componentDidMount() {
		var APIurl = 'https://api.themoviedb.org/3/movie/popular?api_key=' + this.state.APIkey + '&language=en-US&page=1'
		var httpRequest = new XMLHttpRequest()
		
		httpRequest.onload = function (data) {
			var q = JSON.parse( httpRequest.response ).results
			this.setState({ APIresults: q })
		}.bind(this)
	
		httpRequest.onerror = function() {
		  	alert( 'Unable to load API data' )
		}
	
		httpRequest.open( 'GET', APIurl )
		httpRequest.send()
	}

	render() {
		return (
			<div>
				<HeaderBar />
				<div className='mainContent'>
					<Switch>
						<Route
							path={url+"/movieHomepage"}
							render={ () => <MovieHomepage passedState={this.state} /> }
						/>
						<Route
							path={url+"/movieDetails"}
							render={ () => <MovieDetails passedState={this.state} /> }
						/>
						// Displays a default component onLoad
						<Route path="*" render={ () => <MovieHomepage passedState={this.state} /> } />
					</Switch>
				</div>
			</div>
		)
	}
}








// Page header
class HeaderBar extends React.Component {
	render() {
		return (
			<div className='headerBar'>
				<span><Link to={url+"/movieHomepage"}>Home</Link></span>
			</div>
		)
	}
}








// Content pages
// Pagination - http://codepen.io/PiotrBerebecki/pen/pEYPbY
class MovieHomepage extends React.Component {
	constructor() {
		super()
		this.changePage = this.changePage.bind(this)
	}

	changePage(event) {
		if (event.target.id != this.props.passedState.currentPage) {
			this.props.passedState.setState({ currentPage: Number(event.target.id) })
			window.scrollTo(0,0)
		}
	}

	render() {
		// Logic for displaying items
    	const indexOfLastItem = this.props.passedState.currentPage * this.props.passedState.itemsPerPage;
    	const indexOfFirstItem = indexOfLastItem - this.props.passedState.itemsPerPage;
    	const currentItems = this.props.passedState.APIresults.slice(indexOfFirstItem, indexOfLastItem);

    	const renderItems = currentItems.map((q, index) => {
    		return (
    	  		<Link to={url+"/movieDetails?title="+q.title}>
					<MovieCard 
						movieTitle={q.title}
						imagePath={q.poster_path}
						movieID={index + ((this.props.passedState.currentPage - 1) * this.props.passedState.itemsPerPage) }
						key={q.id}
						passedState={this.props.passedState}
					/>
				</Link>
			)
    	})

		// Logic for displaying page numbers
		const pageNumbers = []
		for (let i = 1; i <= Math.ceil(this.props.passedState.APIresults.length / this.props.passedState.itemsPerPage); i++) {
			pageNumbers.push(i)
		}
		
		const renderPageNumbers = pageNumbers.map(number => {
			// Special CSS for the current page
			if (number == this.props.passedState.currentPage) {
				var dynamicClass = 'currentPageNumber'
			} else var dynamicClass = ''

		   	return (
		       	<span
		       		className = {dynamicClass}
		       		key={number}
		       		id={number}
		       		onClick={this.changePage}
		       	>
		       		{number}
		    	</span>
		   	)
    	})

		// Render everything!
		return (
			<div>
				{renderItems}
				<div className='pageNumberContainer'>{renderPageNumbers}</div>
			</div>
		)
	}
}








class MovieDetails extends React.Component {
	render() {
		var q = this.props.passedState.APIresults[this.props.passedState.selectedMovie]
		
		return (
			<div className='movieDetailsPage'>
				<img className='movieCardImage' src={'https://image.tmdb.org/t/p/w500' + q.poster_path} alt={this.props.movieTitle}/> 
				<div> { q.title } </div>
				<div> Release date: { q.release_date } </div>
				<div> Rating: { q.vote_average } / 10 </div>
				<div> { q.overview } </div>
			</div>
		)
	}
}








// Components
class MovieCard extends React.Component {
	selectMovie = () => {
		this.props.passedState.setState({ selectedMovie: this.props.movieID })
		window.scrollTo(0,0)
	}

	render() {
		return (
			<span className='MovieCard' onClick={ this.selectMovie }>
				<img className='movieCardImage' src={'https://image.tmdb.org/t/p/w300' + this.props.imagePath} alt={this.props.movieTitle}/> 
				<span className='movieTitle'>{this.props.movieTitle}</span>
			</span>
		)
	}
}








// ==============================================================

// Renderer
ReactDOM.render((
	<BrowserRouter>
		<Main />
	</BrowserRouter>
), reactRootDiv );