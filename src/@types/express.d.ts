// aqui declara qual lib vai fazer a mudanca
declare namespace Express {
  // aqui agrega ao objeto Request o objeto user
  export interface Request {
    user: {
      id: string;
    };
  }
}
