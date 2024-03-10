import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
     const saltRounds = 10;
     const hashedPassword = await  bcrypt.hash(password, saltRounds);
     return hashedPassword;
};


export const comparePassword = async (password, dbPassword) => {
    return  await bcrypt.compare(password, dbPassword)
};

