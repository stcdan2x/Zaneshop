import bcryptjs from "bcryptjs"

const users = [
   {
      name: "Admin Access",
      email: "admin@test.com",
      password: bcryptjs.hashSync("1234", 10),
      isAdmin: true
   },
   {
      name: "Juan Tams",
      email: "juan@test.com",
      password: bcryptjs.hashSync("1234", 10),
   },
   {
      name: "Basha Tams",
      email: "basha@test.com",
      password: bcryptjs.hashSync("1234", 10),
   }
];

export default users;