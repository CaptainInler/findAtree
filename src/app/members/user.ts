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
    this.id = authData.uid;
    this.email    = authData.email;
    this.photoURL = authData.photoURL;
    this.displayName = authData.displayName;
    this.roles    = { user: true };
  }
}
