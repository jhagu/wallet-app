export class User {

  public name: string;
  public email: string;
  public uid: string;

  constructor(userDTO: UserDTO) {
    this.name = userDTO && userDTO.name || null;
    this.email = userDTO && userDTO.email || null;
    this.uid = userDTO && userDTO.uid || null;
  }
}

interface UserDTO {
  uid: string;
  email: string;
  name: string;
}
