import React from 'react'
import MessageType from '../../../@types/MessageType'
import Label from '../../../@types/Label'
import AppContext, { AppContextType } from '../../../AppContext'

type Props = {
  message: MessageType,
  isExpanded: boolean,
  onClick: () => void,
  updateMessage: (updatedMessage: MessageType) => void,
  labels: {
    [id: string]: Label
  }
}

type State = {
  attachments: {
    filename: string,
    mimeType: string,
    attachment: string
  }[]
  content?: any,
  displayMenu: boolean,
  labeled: boolean
}

class Message extends React.Component<Props, State> {
  static contextType = AppContext
  context!: AppContextType

  constructor (props: Props) {
    super(props)

    this.state = {
      displayMenu: false,
      attachments: [],
      labeled: true
    }

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  showDropdownMenu( event: any ) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
}

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

  
  componentWillUnmount () {
    this.context.timerContext.isTimerRunning(this.props.message.id) &&
    this.context.timerContext.removeTimer(this.props.message.id)
  }

  async componentDidUpdate (oldProps: Props) {

    // const content = part && atob(part.body.data) // atob decodes a Base64 string
    if (!this.props.isExpanded && oldProps.isExpanded) {
      if (this.context.timerContext.isTimerRunning(this.props.message.id)) {
        this.context.timerContext.removeTimer(this.props.message.id)
      }
    }

    if (this.props.isExpanded && !oldProps.isExpanded) {

      if (this.context.timerContext.isTimerRunning(this.props.message.id)) {
        this.context.timerContext.setTimerToTime(this.props.message.id, 60000)
      } else {
        this.context.timerContext.addTimer(this.props.message.id, () => alert('You\'ve been on that mail for a while'), 60000)
      }

      let part = this.props.message.payload.parts
        .find(part => part.mimeType === 'text/html' || part.mimeType === 'multipart/alternative')
      if (!part) return
      if (part.mimeType === 'multipart/alternative') {
        part = (part as any).parts.find((p: any) => p.mimeType === 'text/html')
      }
      const blob = part && part.body.data
        .split('-').join('+')
        .split('_').join('/')

      let content: string | undefined = ''
      content = blob && atob(blob)

      this.setState({
        content
      })

      // download attchments
      const parts = this.props.message.payload.parts;
      const attachments = this.state.attachments

      await Promise.all(parts.map(async part => {
        if (part.filename && part.filename.length > 0) {
          const attachId: string = part.body.attachmentId

          const gmail = (gapi.client as any).gmail
          return gmail
            .users
            .messages
            .attachments
            .get({
              'id': attachId,
              'messageId': this.props.message.id,
              'userId': 'me'
            })
            .then((response: any) => {
              attachments.push({
                mimeType: part.mimeType,
                filename: part.filename as string,
                attachment: response.result.data
                  .split('-').join('+')
                  .split('_').join('/')
              })
            })
        }
      }))
      this.setState({
        attachments
      })
    }
  }

  deleteMessage = (message : any) =>  {
    const request = (gapi.client as any).gmail.users.messages.trash({
      'userId': 'me',
      'id': message.id
    })
    request.execute((updatedMessage: MessageType) => {
      this.props.updateMessage && this.props.updateMessage(updatedMessage)
    })
  }

  render () {
    const from = this.props.message.payload.headers.find((header: any) => header.name === 'From')
    return this.props.message.payload.parts
      ? <div id={this.props.message.id} onClick={() => this.props.onClick()} className={`mailItem ${this.props.message.labelIds.includes('UNREAD') ? 'unread' : ''}`}>
        <div className="mailItemHeader">
          <span>{from && from.value}</span>
          <div className="droupDownMenu">
          <button className="material-icons" style={{ color: 'black', float: 'right' }} onClick={this.showDropdownMenu}>label</button>
          {
            this.state.displayMenu ? (
          <ul>
          {this.props.message.labelIds
            .filter(id => this.props.labels[id].type !== 'system')
            .map(id =>
              <li><input type="checkbox" checked={this.state.labeled}/>{this.props.labels[id].name}</li>
            )}
          </ul>
        ):
        (
          null
        )
        }
        </div>
          <button className="material-icons" style={{ color: 'black', float: 'right' }} onClick={() => this.deleteMessage(this.props.message)}>delete</button>
          <br/>
          <p className="snippet">{this.props.message.snippet}</p>
          {this.props.message.labelIds
            .filter(id => this.props.labels[id].type !== 'system')
            .map(id =>
              <span key={id} className="chip" style={this.props.labels[id].color ? {
                backgroundColor: this.props.labels[id].color!.backgroundColor,
                color: this.props.labels[id].color!.textColor
              } : undefined}>{this.props.labels[id].name}</span>
            )}
        </div>
        {this.props.isExpanded && (<div className="mailItemContent">
          { this.state.attachments.map(attachment => {
            return <div key={attachment.filename} style={{textAlign: 'center'}}>
              <a key={attachment.filename} download={attachment.filename} href={"data:" + attachment.mimeType + ';base64,' + attachment.attachment} onClick={e => e.stopPropagation()}>
                {attachment.filename}
              </a>
              &nbsp;
            </div>
          }) }
          <div className="iframeContainer">
            <iframe title={this.props.message.id} srcDoc={this.state.content} frameBorder="0" seamless onLoad={(frame: any) => frame.target.style.height = (frame.target.contentWindow.document.body.scrollHeight + 25) + 'px'}></iframe>
          </div>
        </div>)}
      </div>
      : null
  }
}

export default Message
