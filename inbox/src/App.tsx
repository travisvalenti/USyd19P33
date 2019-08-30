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
  return <h2>Dashboard</h2>;
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
