import React from 'react'

import MessageType from '../../@types/MessageType'

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
}

class Mail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      messages: {},
      isLoading: false,
      showRead: false,
      importantOnly: false
    }
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

  // This function is called whenever the props change or this.setState is called
  render() {
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
      { gapi && <>
        {this.props.isSignedIn && (<>
          {Object.values(this.state.messages)
            .filter(message => !message.labelIds.includes('CATEGORY_PROMOTIONS'))
            .length > 0 && 
          <div className="mailGroup">
            {Object.values(this.state.messages)
              .filter(message => !message.labelIds.includes('CATEGORY_PROMOTIONS'))
              .map(message =>
              (message.labelIds.includes('UNREAD') || this.state.showRead) &&
              (!this.state.importantOnly || message.labelIds.includes('IMPORTANT')) &&
              <Message key={message.id} message={message} isExpanded={this.state.expandedMessageId === message.id} onClick={() => this.setExpanded(message.id)}/>
            )}
          </div>
          }
          <div className="mailGroup">
            <div className="categoryLabel">Promotions</div>
            {Object.values(this.state.messages)
              .filter(message => message.labelIds.includes('CATEGORY_PROMOTIONS'))
              .map(message =>
                (message.labelIds.includes('UNREAD') || this.state.showRead) &&
                (!this.state.importantOnly || message.labelIds.includes('IMPORTANT')) &&
                <Message key={message.id} message={message} isExpanded={this.state.expandedMessageId === message.id} onClick={() => this.setExpanded(message.id)} />
              )}
          </div>
          {Object.values(this.state.messages).length !== 0 && <p style={{ textAlign: 'center' }}>There are more messages, but we haven't made a way to load them yet, sorry.</p>}
        </>)}

      </>}
    </div>)
  }
}

export default Mail
