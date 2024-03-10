import bcrypt from 'bcrypt';

export const hashPassword =  (password) => {
     const saltRounds = 10;
     const hashedPassword =  bcrypt.hash(password, saltRounds);
     return hashPassword;
};


export const comparePassword = (password, dbPassword) => {
    return  bcrypt.compare(password, dbPassword)
};

