import React from 'react'

import './styles.css'

import Button from '../../ui/Button'

type Props = {
    isSignedIn : boolean
}

type State = {

}

class UserWidget extends React.Component<Props, State> {

    // componentDidMount() {
    //     const client = gapi.client as any;
    //     client.directory.users.get({})
    //         .then((response: any) => {
    //             console.log("response:" + response);
    //         });
    // }

    render() {
        return (
            <div className="UserWidget">
            {this.props.isSignedIn 
                ? <Button className="UserSign" onClick={() => gapi.auth2.getAuthInstance().signOut()}>Sign Out</Button>
                : <Button className="UserSign" onClick={() => gapi.auth2.getAuthInstance().signIn()}>Sign In</Button>
            }
            </div>
        )
    }
}

export default UserWidget