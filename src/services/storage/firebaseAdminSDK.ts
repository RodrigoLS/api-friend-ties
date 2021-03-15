import * as firebase from 'firebase-admin';
import * as serviceAccount from '../../../friend-ties-5be8e4a33af6.json';

class FirebaseAdminSDK {
  private params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
  }

  public initializeService() {
    console.log('initialize')
    firebase.initializeApp({
      credential: firebase.credential.cert(this.params),
    })
  }
}

export default FirebaseAdminSDK;