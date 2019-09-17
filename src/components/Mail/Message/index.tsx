import React from 'react'
import MessageType from '../../../@types/MessageType'

type Props = {
  message: MessageType,
  isExpanded: boolean,
  onClick: () => void
}

type State = {
  attachments: {
    filename: string,
    mimeType: string,
    attachment: string
  }[]
  content?: any
}

class Message extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props)

    this.state = {
      attachments: []
    }
  }

  async componentDidUpdate (oldProps: Props) {

    // const content = part && atob(part.body.data) // atob decodes a Base64 string

    if (this.props.isExpanded && !oldProps.isExpanded) {
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

  render () {
    const from = this.props.message.payload.headers.find((header: any) => header.name === 'From')


    return this.props.message.payload.parts
      ? <div id={this.props.message.id} onClick={() => this.props.onClick()} className={`mailItem ${this.props.message.labelIds.includes('UNREAD') ? 'unread' : ''}`}>
        <div className="mailItemHeader">
          <span>{from && from.value}</span>
          <br />
          <p className="snippet">{this.props.message.snippet}</p>
          {this.props.message.labelIds.map(label => (<span key={label} className="chip">{label}</span>))}
        </div>
        {this.props.isExpanded && (<div className="mailItemContent">
          { this.state.attachments.map(attachment => {
            return <div style={{textAlign: 'center'}}>
              <a key={attachment.filename} download={attachment.filename} href={"data:" + attachment.mimeType + ';base64,' + attachment.attachment} onClick={e => e.stopPropagation()}>
                {attachment.filename}
              </a>
              &nbsp;
            </div>
          }) }
          <iframe title={this.props.message.id} srcDoc={this.state.content} frameBorder="0" seamless></iframe>
        </div>)}
      </div>
      : null
  }
}

export default Message
