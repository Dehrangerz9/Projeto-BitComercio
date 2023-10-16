export class user {
    login;
    name;
    surname;
    password;
    balance = 5000;

    constructor(login,password){
        this.login = login;
        this.password = password
    }

    setName(name){
        this.name = name;
    }

    setSurname(name){
        this.surname = name;
    }
}

export const  defaultUser = new user("John","123")

export default user 