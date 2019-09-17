import React from 'react'

import MessageType from '../../@types/MessageType'
import Label from '../../@types/Label'

import './styles.css'

import LoadingBar from '../ui/LoadingBar'
import Button from '../ui/Button'
import Message from './Message'

type Props = {
  isSignedIn: boolean
}

type State = {
  messages: {
    [key: string]: MessageType,
  },
  isLoading: boolean,
  expandedMessageId?: string,
  errorMessage?: string,
  showRead: boolean,
  importantOnly: boolean
  promotionsExpanded: boolean,
  labels?: {
    [id: string]: Label
  }
}

class Mail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      messages: {},
      isLoading: false,
      showRead: false,
      importantOnly: false,
      promotionsExpanded: false
    }
  }

  componentDidMount () {
    this.loadLabels()
    this.loadMessages()
  }

  loadLabels = () => {
    const client = gapi.client as any
    client
      .gmail
      .users
      .labels
      .list({
        userId: 'me'
      })
      .then((response: {body: string}) => {
        const labels = Object.fromEntries(
          JSON.parse(response.body).labels
          .map((label: Label) => ([label.id, label]))
        )

        this.setState({ labels })
      })
  }

  loadMessages = () => {
    this.setState({
      isLoading: true
    })
    const client = gapi.client as any
    client
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
        const gapiBatch = gapi.client.newBatch()
        Object.values(messages).forEach((message: any) => {
          const request = (gapi.client as any).gmail.users.messages.get({
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

  oneUpdateMessage = (updatedMessage: MessageType) => {
    const messages = { ...this.state.messages }
    if (!messages || !messages[updatedMessage.id]) return

    const request = (gapi.client as any).gmail.users.messages.get({
      'userId': 'me',
      'id': updatedMessage.id
    })

    request.execute((fetchedMessage: MessageType) => {
      messages[updatedMessage.id] = fetchedMessage
      console.log(messages)
      console.log(updatedMessage)
      this.setState({ messages })
    })
  }

  // This function is called whenever the props change or this.setState is called
  render() {
    const promotions = Object.values(this.state.messages)
      .filter(message => message.labelIds.includes('CATEGORY_PROMOTIONS'))
    return (<div className="Mail">
      {this.props.isSignedIn
        ? <Button className="authButton" onClick={() => gapi.auth2.getAuthInstance().signOut()} disabled={this.state.isLoading}>Sign Out</Button>
        : <Button className="authButton" onClick={() => gapi.auth2.getAuthInstance().signIn()} disabled={this.state.isLoading}>Sign In</Button>
      }
      <Button onClick={this.loadMessages} disabled={this.state.isLoading || !this.props.isSignedIn}>Load Messages</Button>
      {this.state.errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{this.state.errorMessage}</p>}
      { Object.keys(this.state.messages).length > 0 && <>
        <div><input type="checkbox" checked={this.state.showRead} onChange={(event) => this.setState({ showRead: event.target.checked })} /> Show Read</div>
        <div><input type="checkbox" checked={this.state.importantOnly} onChange={(event) => this.setState({ importantOnly: event.target.checked })} /> Only Important</div>
      </> }
      { (this.state.isLoading) && <LoadingBar /> }
      { !!gapi && !!this.state.messages && !!this.state.labels && <>
        {this.props.isSignedIn && (<>
          <div className="mailGroup">
            {Object.values(this.state.messages)
              .filter(message => !message.labelIds.includes('CATEGORY_PROMOTIONS'))
              .map(message =>
              (message.labelIds.includes('UNREAD') || this.state.showRead) &&
              (!this.state.importantOnly || message.labelIds.includes('IMPORTANT')) &&
              <Message key={message.id} message={message} updateMessage={this.oneUpdateMessage} labels={this.state.labels!} isExpanded={this.state.expandedMessageId === message.id} onClick={() => this.setExpanded(message.id)}/>
            )}
          </div>
          {promotions
            .length > 0 && 
            <div className="mailGroup">
            <div className="categoryLabel">
              <h3>Promotions ({promotions.length})</h3>
              <span style={{ color: '#57a5af'}} onClick={() => this.setState({ promotionsExpanded: !this.state.promotionsExpanded})}>
                { this.state.promotionsExpanded ? 'Minimise Promotions' : 'Expand promotions' }
              </span>
            </div>
            { this.state.promotionsExpanded && promotions
                .map(message =>
                  (message.labelIds.includes('UNREAD') || this.state.showRead) &&
                  (!this.state.importantOnly || message.labelIds.includes('IMPORTANT')) &&
                  <Message key={message.id} updateMessage={this.oneUpdateMessage} message={message} labels={this.state.labels!} isExpanded={this.state.expandedMessageId === message.id} onClick={() => this.setExpanded(message.id)} />
                )}
            </div>
          }
          {/* {Object.values(this.state.messages).length !== 0 && <p style={{ textAlign: 'center' }}>There are more messages, but we haven't made a way to load them yet, sorry.</p>} */}
        </>)}

      </>}
    </div>)
  }
}

export default Mail
