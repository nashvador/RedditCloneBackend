require("dotenv").config();

export const PORT: number = parseInt(<string>process.env.PORT,10) || 3001


