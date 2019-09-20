export default {
  gapi: {
    init: {
      clientId: '89646939632-a5i06tvc4np3vj82m0h1nlept16prom8.apps.googleusercontent.com',
      apiKey: 'AIzaSyBpdgjg3vJYGKcFn4DcxVbi2AEBMeE_KX4',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
      // discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest', 'https://content.googleapis.com/discovery/v1/apis/admin/directory_v1/rest'],
      scope: 'https://www.googleapis.com/auth/gmail.readonly',
      // scope: 'https://www.googleapis.com/auth/gmail.readonly  https://www.googleapis.com/auth/admin.directory.user.readonly',
    }
  }
}
