import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
     const saltRounds = 10;
     const salt = bcrypt.genSaltSync(saltRounds);
     const hash = await bcrypt.hashSync(password, salt);
     return hash;
};


export const comparePassword = async (password, dbPassword) => {
    return await bcrypt.compare(password, dbPassword)
};

