export class User {
  username: string;
  email: string;
  read: number;
  bookedNow: number;

  constructor(email: string, username: string, read: number, bookedNow: number) {
    this.username = username;
    this.email = email;
    this.read = read;
    this.bookedNow = bookedNow;
  }
}
