import React from 'react'

import './index.css'

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
  gapi?: any,
  expandedMessageId?: string
}

class App extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props)

    this.state = {
      isSignedIn: false,
      messages: {}
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
          this.setState({ gapi })
          gapi.auth2.getAuthInstance().isSignedIn
            .listen((isSignedIn: boolean) => this.setState({ isSignedIn }))
  
          this.setState({ isSignedIn: gapi.auth2.getAuthInstance().isSignedIn.get() })
        })
        .catch(console.error)
    })
  }

  loadMessages = () => {
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
          this.setState({ messages })
        })
        
      })
      .catch((error: Error) => console.error(error))
  }

  setExpanded = (messageId: string) => {
    this.setState({
      expandedMessageId: messageId === this.state.expandedMessageId ? undefined : messageId
    })
  }

  // This function is called whenever the props change or this.setState is called
  render () {
    return (<div className="App">
      { this.state.gapi && <>
        { this.state.isSignedIn
          ? <button onClick={ () => this.state.gapi.auth2.getAuthInstance().signOut() }>Sign Out</button>
          : <button onClick={ () => this.state.gapi.auth2.getAuthInstance().signIn() }>Sign In</button>
        }
        <button onClick={this.loadMessages}>Load Messages</button>
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
              return (<div key={ message.id } onClick={() => this.setExpanded(message.id)} className={`mailItem ${message.labelIds.includes('UNREAD') ? 'unread' : ''}`}>
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
        </>)}

      </>}
    </div>)
  }
}

export default App
