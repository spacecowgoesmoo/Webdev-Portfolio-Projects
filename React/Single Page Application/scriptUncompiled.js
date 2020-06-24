// React-Router initializations
const BrowserRouter = window.ReactRouterDOM.BrowserRouter
const Route = window.ReactRouterDOM.Route
const Link = window.ReactRouterDOM.Link
const Prompt = window.ReactRouterDOM.Prompt
const Switch = window.ReactRouterDOM.Switch
const Redirect = window.ReactRouterDOM.Redirect
const NavLink = window.ReactRouterDOM.NavLink
const url = '/portfolio/subpages/reactSPA'

function cheapID() {
	return Math.random().toString(36).substr(2, 5);
}








// Main page controller
class Main extends React.Component {
	constructor() {
		super()
		this.state = {
			items: [
				{ id: '1', text1: 'Eget', text2: 'Mauris ut maximus velit. Fusce ut sem convallis, rutrum leo eu, aliquet leo. Integer ligula sapien, fermentum et nunc non, faucibus sagittis purus. Aliquam ut dignissim leo, nec lobortis velit.' },
				{ id: '2', text1: 'nulla', text2: 'Vivamus maximus sem dignissim tellus sodales viverra. In cursus leo ac sapien tempus pulvinar. Sed consectetur felis ut tristique ultrices. Pellentesque sollicitudin augue sed nunc consectetur suscipit.' },
				{ id: '3', text1: 'Orci', text2: 'aenean et ultricies velit. curabitur fringilla egestas ipsum a vulputate. sed quis nibh eu justo mattis malesuada. vivamus consequat mattis nisi vitae fermentum. quisque vulputate consequat maximus. nam quis mi luctus massa aliquam dictum ut et nisl.' },
				{ id: '4', text1: 'Leo', text2: 'Aliquam in velit rutrum, condimentum urna a, malesuada lectus.' },
				{ id: '5', text1: 'dui', text2: 'Morbi dapibus at tortor quis mattis. In porttitor, ante a auctor dapibus, magna ante venenatis mauris, vitae convallis mauris dui at velit. Nulla ac sem sed nibh porta commodo. Donec cursus convallis justo. Cras interdum laoreet nisi sed eleifend.' },
				{ id: '6', text1: 'ARcU', text2: 'Suspendisse pellentesque libero ut lorem laoreet faucibus.' },
				{ id: '7', text1: 'elit', text2: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce quis tristique massa.' },
				{ id: '8', text1: 'Nec', text2: 'etiam venenatis velit. curabitur pharetra sapien sed ante cursus, vitae fringilla orci posuere.' },
				{ id: '9', text1: 'Sed', text2: 'Sed in maximus diam, sed eleifend justo. Praesent vel faucibus nibh. Maecenas dapibus, lacus a accumsan molestie, nibh tellus ultricies ante, in commodo magna neque nec justo. Curabitur ac lorem ac libero dictum ornare. Vivamus et dapibus libero.' },
				{ id: '10', text1: 'Cras', text2: 'fringilla' },
				{ id: '11', text1: 'vitae', text2: 'Etiam non nibh feugiat, dignissim nulla vel, efficitur metus. Integer finibus massa metus, a pretium odio accumsan id. Phasellus a nulla elit. Sed tellus enim, venenatis nec lorem ut, faucibus finibus libero.' },
				{ id: '12', text1: 'QUIS', text2: 'fusce viverra, felis quis viverra viverra, ligula nibh suscipit turpis, ac luctus urna leo et urna. nullam nunc quam, mollis lacinia magna non, suscipit pretium lectus. donec sed pulvinar erat.' },
				{ id: '13', text1: 'nIBh', text2: 'Fusce nec vestibulum nisi. Integer suscipit, odio a ullamcorper ultrices, orci orci porttitor ex, vitae pellentesque augue nisl ut risus. Proin maximus lobortis justo vitae molestie. Morbi placerat accumsan eros vitae sodales.' },
				{ id: '14', text1: 'id', text2: 'Praesent euismod luctus sapien vitae aliquet. Nullam scelerisque felis ac felis tincidunt, non malesuada neque hendrerit. Etiam congue, lectus eu blandit blandit, diam massa scelerisque enim, sed fermentum massa libero sit amet ex.' },
				{ id: '15', text1: 'sit', text2: 'Vestibulum tellus nunc, interdum nec aliquet sit amet, eleifend mollis risus. Donec a nunc vitae risus facilisis fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
				{ id: '16', text1: 'ODIO', text2: 'praesent euismod' },
				{ id: '17', text1: 'Nec', text2: 'Quisque lacinia lacus nec tempus facilisis. Nulla facilisi.' },
				{ id: '18', text1: 'Arcu', text2: 'Aenean elementum sodales ex et euismod. Fusce nec vestibulum nisi. Integer suscipit, odio a ullamcorper ultrices, orci orci porttitor ex, vitae pellentesque augue nisl ut risus.' },
				{ id: '19', text1: 'mi', text2: 'Cras viverra nulla non consectetur volutpat. Phasellus vitae magna in urna pretium ullamcorper in at diam. Vivamus venenatis erat id augue sollicitudin rutrum.' },
				{ id: '20', text1: 'Non', text2: 'Nam quis mi luctus massa aliquam dictum ut et nisl. Sed in nisi et sem laoreet porttitor at a augue. Integer consequat, risus vel vulputate luctus, velit nibh convallis ipsum, eget ultrices velit ipsum vel neque.' }
			]
		}
	}
	
	render() {
		return (
			<div>
				<HeaderBar />
				<div className='mainContent'>
					<Switch>
						<Route
							path={url+"/socialFeed"}
							render={ () => <SocialFeed passedState={this.state} setState={zzz=>{this.setState(zzz)}} /> }
						/>
						<Route
							path={url+"/userList"}
							render={ () => <UserList passedState={this.state} /> }
						/>
						<Route
							path={url+"/basicTextPage"}
							render={ () => <BasicTextPage passedState={this.state} /> }
						/>
						// Displays a default component onLoad
						<Route path="*" render={ () => <SocialFeed passedState={this.state} setState={zzz=>{this.setState(zzz)}} /> } />
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
				<span><Link to={url+"/socialFeed"}>Social Feed</Link></span>
				<span><Link to={url+"/userList"}>User List</Link></span>
				<span><Link to={url+"/basicTextPage"}>Basic Text Page</Link></span>
			</div>
		)
	}
}








// Content pages
class SocialFeed extends React.Component {
	render() {
		return (
			<div>
				<NewTweetTextarea passedState={this.props.passedState} setState={zzz=>{this.setState(zzz)}}/>
				{this.props.passedState.items.map(q =>
					<WideCard 
						text1={'@'+q.text1}
						text2={q.text2}
						key={q.id}
					/>
				)}
			</div>
		)
	}
}

class NewTweetTextarea extends React.Component {
	componentDidMount() {
		cowTextarea.addEventListener( "keypress", this.submitOnEnter.bind(this) )
	}

	submitOnEnter(event){
	    if( event.which == 13 && !event.shiftKey ){
			// Adds the tweet to the state of the master component
			var q = this.props.passedState.items.unshift( { id: uuidv4(), text1: cheapID(), text2: cowTextarea.value } )
			this.props.setState({q})	// the master setState is passed down to here as a prop

	        event.preventDefault() // Prevents the addition of a new line in the text field (not needed in a lot of cases)
			cowTextarea.value = ''
	    }
	}

	render() {
		return (
			<textarea
				id='cowTextarea'
				maxLength='280'
				spellCheck='false'
				placeholder='New Tweet..'
			/>
		)
	}
}








class UserList extends React.Component {
	render() {
		return (
			<div>
				{this.props.passedState.items.map(q =>
					<SquareIcon 
						text1={q.text1}
						text2={q.text2}
						key={q.id}
					/>
				)}
			</div>
		)
	}
}


class BasicTextPage extends React.Component {
	render() {
		return (
			<div className='basicTextPage'>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id leo convallis, posuere nisi vitae, pretium neque. Nullam mauris velit, pellentesque ac ante non, porta tempor orci. Sed semper ligula non volutpat interdum. Ut cursus diam volutpat, posuere mauris vel, malesuada enim. Integer volutpat eget tortor non rutrum. Mauris mauris est, dictum at venenatis in, placerat in ex. Etiam a velit nunc. Nunc ac mollis mauris. Aliquam sed metus efficitur, lacinia sem at, mattis ligula. Sed varius sit amet justo sit amet sagittis. Phasellus vel pellentesque leo. Curabitur id magna et enim blandit semper.</p>
				<p>Nunc dictum sed enim nec ultrices. Etiam ut tellus a velit lacinia euismod quis non ex. Curabitur eu dignissim sem, ut varius velit. Cras consectetur risus eu nisi vestibulum maximus. Duis non maximus velit, eu semper elit. Sed vel velit pellentesque, maximus ex eu, molestie tortor. Cras convallis sem ac quam pulvinar ultricies. Fusce vitae mauris id leo porta blandit. Suspendisse ultricies consectetur dapibus. Vestibulum scelerisque velit ac finibus iaculis. Vivamus leo turpis, finibus non ipsum vel, fermentum posuere ipsum. Duis posuere molestie felis, at molestie quam venenatis semper. Sed venenatis egestas velit. Aenean sodales sit amet arcu quis dignissim. Integer scelerisque at eros et egestas.</p>
			<p>Suspendisse ultricies eu sapien ac tincidunt. Ut maximus ligula et tempor varius. Ut non turpis tempor, volutpat urna eu, fermentum justo. Proin commodo luctus nisl, at feugiat elit efficitur at. In hac habitasse platea dictumst. Nullam est dui, cursus vitae ligula eget, cursus ultrices sapien. Donec lacinia consectetur mollis.</p>
			<p>Aliquam semper metus nec orci vulputate pretium. Donec tristique massa arcu, sit amet varius dui congue vel. Nam pulvinar ut metus vel convallis. Aenean ac dolor massa. Nulla vitae mi diam. Nunc ut massa ipsum. Vivamus vel lacus ligula. Aenean neque felis, maximus in enim et, porttitor feugiat enim. In id dignissim turpis, hendrerit aliquet libero.</p>
			<p>Nunc vitae mattis orci. Nulla tincidunt viverra ornare. Nulla finibus, tortor ut ullamcorper blandit, magna elit iaculis nunc, vitae suscipit quam leo quis sem. Phasellus fringilla varius mi ut pretium. Sed volutpat eros eu est efficitur, non posuere orci vulputate. Vivamus dictum turpis sapien, eget pharetra quam iaculis eget. Integer iaculis rhoncus dolor, semper tempor arcu luctus sit amet. Sed ut pulvinar erat, a accumsan justo. Nunc ullamcorper ornare nulla, in venenatis odio blandit a. Quisque enim elit, rhoncus dictum auctor vitae, mollis a nulla. Donec pellentesque ut nisl sed dictum. Fusce in iaculis ligula, vel laoreet sapien. Vivamus elit orci, vulputate pretium nulla vitae, imperdiet finibus quam. Morbi sit amet quam vestibulum, elementum ligula a, convallis metus. Sed elementum ante a facilisis vestibulum.</p>
			</div>
		)
	}
}








// Components
function WideCard(props) {
	return (
		<span className='wideCard'>
			<span className='text1'>{props.text1}</span>
			<span className='text2'>{props.text2}</span>
		</span>
	)
}


function SquareIcon(props) {
	return (
		<span className='squareIcon'>
			<span className='text1'>{props.text1}</span>
		</span>
	)
}








// ==============================================================

// Renderer
ReactDOM.render((
	<BrowserRouter>
		<Main />
	</BrowserRouter>
), reactRootDiv );