import React from 'react'
import MessageType from '../../../@types/MessageType'
import Button from '../../ui/Button'

type Props = {
  message: MessageType,
  isExpanded: boolean,
  onClick: () => void
}

const Message: React.FC<Props> = (props: Props) => {
  const from = props.message.payload.headers.find((header: any) => header.name === 'From')

  // const content = part && atob(part.body.data) // atob decodes a Base64 string
  let content: string | undefined = ''
  if (props.isExpanded) {
    const part = props.message.payload.parts
      .find(part => part.mimeType === 'text/html')
    const blob = part && part.body.data
      .split('-').join('+')
      .split('_').join('/')
    content = blob && atob(blob)
  }

  const downloadAttachments = (message : any) => {
    const parts = message.payload.parts;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (part.filename && part.filename.length > 0) {
        const attachId = part.body.attachmentId;
        const request = (gapi.client as any).gmail.users.messages.attachments.get({
          'id': attachId,
          'messageId': message.id,
          'userId': 'me'
        });
        request.execute(function(attachment : any){});
      }
    }
  }

  return props.message.payload.parts
    ? <div id={props.message.id} onClick={() => props.onClick()} className={`mailItem ${props.message.labelIds.includes('UNREAD') ? 'unread' : ''}`}>
      <div className="mailItemHeader">
        <span>{from && from.value}</span>
        <br />
        <p className="snippet">{props.message.snippet}</p>
        {props.message.labelIds.map(label => (<span key={label} className="chip">{label}</span>))}
      </div>
      {props.isExpanded && (<div className="mailItemContent">
        <Button onClick={downloadAttachments(props.message)} className="download" disabled={false} children="Download Attachments"/>
        <iframe title={props.message.id} srcDoc={content} frameBorder="0" seamless></iframe>
      </div>)}
    </div>
    : null
}

export default Message
