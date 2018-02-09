export interface Roles {
  user: boolean;
  superuser?: boolean;
  admin?:  boolean;
}
export class User {
  id: string;
  email:    string;
  photoURL: string;
  displayName: string;
  roles:    Roles;
  constructor(authData) {
    if (authData.uid) {
      this.id = authData.uid;
    }else{
      this.id = authData.id;
    }
    this.email    = authData.email;
    this.photoURL = authData.photoURL;
    this.displayName = authData.displayName;
    this.roles    = { user: true };
  }
}
