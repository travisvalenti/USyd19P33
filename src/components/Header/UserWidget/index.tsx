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
        let userProfile : any;
        if(this.props.isSignedIn) {
            userProfile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
            console.log(userProfile);
        }
        return (
            <div className="UserWidget">
                {this.props.isSignedIn
                    ? <div className="userButton"><Button className="userSign" onClick={() => gapi.auth2.getAuthInstance().signOut()}>Sign Out</Button></div>
                    : <div className="userButton"><Button className="userSign" onClick={() => gapi.auth2.getAuthInstance().signIn()}>Sign In</Button></div>
                }
                {this.props.isSignedIn &&
                    <div className="userProfile">
                        <div className="userName"><p>{userProfile.ig}</p></div>
                        <div className="userPhoto"><img src={userProfile.Paa} alt="User"/></div>
                    </div>
                }
            </div>
        )
    }
}

export default UserWidget