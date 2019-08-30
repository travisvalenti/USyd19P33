import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import './index.css'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={Dashboard} />
        <Route path="/mail" component={Mail} />
      </div>
    </Router>
  );
}

function Header() {
  return (
    <div className="header">
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/mail">Mail</Link>
        </li>
      </ul>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">
      <div className = "picture">
        <div className="icon">
          <a href="http://www.google.com">
            <img src='data:image/png;base64,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' alt=""  width="131"/>
          </a>
        </div>
        <span className="label">Search</span>
    </div>

      <div className = "picture">
        <div className="icon">

          <a href="https://docs.google.com">
            <img src='https://images.idgesg.net/images/article/2019/05/google-docs-logo-100796136-large.jpg' alt=""  width="131"/>
          </a>
        </div>
        <span className="label">Docs</span>
      </div>

      <div className = "picture">
        <div className="icon">
            <a href="https://drive.google.com/drive/my-drive">
              <img src='https://sites.google.com/a/bhuhsd.net/jessica-rapetti-u-s-government-economics-eportfolio-bhhs2014/_/rsrc/1421979558598/s6-unit-2-the-goals-and-the-origins-of-our-government-1/home/google%20drive.png?height=200&width=200' alt="" width="100"/>
            </a>
        </div>
        <span className="label">Drive</span>
      </div>
      <div className = "picture">
      <div>
        <div className="icon">
          <a href="https://www.youtube.com">
            <img src='https://img.etimg.com/thumb/msid-69533333,width-643,imgsize-35861,resizemode-4/youtube-on-android-may-get-bigger-better-video-streaming-giant-tests-enlarged-play-cancel-buttons.jpg' alt="" width="130"/>
          </a>
        </div>
        <span className="label">YouTube</span>
      </div>
      </div>

    </div>
  );
}

type Props = {}
type State = {
  messages: {
    [key: string]: {
      id: string,
      threadId: string,
      snippet?: string,
      labelIds: string[],
      payload: {
        body: any,
        headers: {
          name: string,
          value: string,
        }[],
        parts: {
          mimeType: string,
          partId: string,
          body: {
            data: string,
            size: number,
          },
          headers: {
            name: string,
            value: string,
          }[]
        }[]
      }
    },
  },
  isSignedIn: boolean,
  isLoading: boolean
  gapi?: any,
  expandedMessageId?: string,
  errorMessage?: string
}

class Mail extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props)

    this.state = {
      isSignedIn: false,
      messages: {},
      isLoading: true
    }
  }

  // This function is called after the component is first added to the DOM
  componentDidMount () {
    const gapi = (window as any).gapi
    gapi.load('client:auth2', () => {
      // Client ID and API key from the Developer Console
      var CLIENT_ID = '89646939632-bgln4kl1okrjeefebjhq3nao3k1o7nd0.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyBpdgjg3vJYGKcFn4DcxVbi2AEBMeE_KX4';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      })
        .then(() => {
          this.setState({ gapi, isLoading: false })
          gapi.auth2.getAuthInstance().isSignedIn
            .listen((isSignedIn: boolean) => this.setState({ isSignedIn }))

          this.setState({ isSignedIn: gapi.auth2.getAuthInstance().isSignedIn.get() })
        })
        .catch((error: Error) => {
          console.error(error)
          this.setState({
            isLoading: false,
            errorMessage: error.message
          })
        })
    })
  }

  loadMessages = () => {
    this.setState({
      isLoading: true
    })
    this.state.gapi.client
      .gmail
      .users
      .messages
      .list({
        userId: 'me'
      })
      .then((response: { body: string }) => {
        const messages = JSON.parse(response.body).messages
          .reduce((acc: any, cur: any) => {
            return { ...acc, [cur.id]: cur }
          }, {})
        const gapiBatch = this.state.gapi.client.newBatch()
        Object.values(messages).forEach((message: any) => {
          const request = this.state.gapi.client.gmail.users.messages.get({
            'userId': 'me',
            'id': message.id
          })
          gapiBatch.add(request)
        })
        gapiBatch.then((batchResponse: any) => {
          Object.values(batchResponse.result).forEach((requestResponse: any) => {
            const mail = JSON.parse(requestResponse.body)
            messages[mail.id] = mail
          })
          this.setState({ messages, isLoading: false })
        })

      })
      .catch((error: Error) => {
        console.error(error)
        this.setState({
          isLoading: false,
          errorMessage: error.message || JSON.parse((error as any).body).error.message
        })
      })
  }

  setExpanded = (messageId: string) => {
    this.setState({
      expandedMessageId: messageId === this.state.expandedMessageId ? undefined : messageId
    })
    setTimeout(() => {
      const element = document.getElementById(messageId)
      if (!element) return
      element.scrollIntoView()
    }, 10)
  }

  // This function is called whenever the props change or this.setState is called
  render () {
    return (<div className="Mail">
      { this.state.isSignedIn
        ? <button className="authButton" onClick={ () => this.state.gapi.auth2.getAuthInstance().signOut() } disabled={this.state.isLoading}>Sign Out</button>
        : <button className="authButton" onClick={ () => this.state.gapi.auth2.getAuthInstance().signIn() } disabled={this.state.isLoading}>Sign In</button>
      }
      <button onClick={this.loadMessages} disabled={this.state.isLoading}>Load Messages</button>
      { this.state.errorMessage && <p style={{color: 'red', textAlign: 'center'}}>{ this.state.errorMessage }</p>}
      {this.state.isLoading && <div className="loadingBar"><div></div></div>}
      { this.state.gapi && <>
        { this.state.isSignedIn && (<>
          <div className="mailGroup">
            { Object.values(this.state.messages).map(message => {
              const from = message.payload.headers.find(header => header.name === 'From')

              // const content = part && atob(part.body.data) // atob decodes a Base64 string
              let content: string | undefined = ''
              if (this.state.expandedMessageId === message.id) {
                const part = message.payload.parts
                .find(part => part.mimeType === 'text/html')
                const blob = part && part.body.data
                  .split('-').join('+')
                  .split('_').join('/')
                content = blob && atob(blob)
              }
              return (<div key={ message.id } id={message.id} onClick={() => this.setExpanded(message.id)} className={`mailItem ${message.labelIds.includes('UNREAD') ? 'unread' : ''}`}>
                <div className="mailItemHeader">
                  <span>{ from && from.value }</span>
                  <br />
                  <p className="snippet">{ message.snippet }</p>
                  { message.labelIds.map(label => (<span key={label} className="chip">{label}</span>)) }
                </div>
                { this.state.expandedMessageId === message.id && (<div className="mailItemContent">
                  <iframe title={message.id} srcDoc={content} frameBorder="0" seamless></iframe>
                </div>)}
              </div>)
            }) }
          </div>
          { Object.values(this.state.messages).length !== 0 && <p style={{textAlign: 'center'}}>There are more messages, but we haven't made a way to load them yet, sorry.</p> }
        </>)}

      </>}
    </div>)
  }
}

export default App
