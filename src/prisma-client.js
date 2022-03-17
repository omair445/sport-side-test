const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function main() {
  const salt = 'this is a salt';
  const hashPassword = crypto.pbkdf2Sync('testPassword', salt, 1000, 64, `sha512`).toString(`hex`);
  console.log(`Hashed Password:- ${hashPassword}`);

  // await prisma.user.create({
  //   data: {
  //     name: 'Alice',
  //     email: 'omair12677@tre.io',
  //     password: hashPassword,
  //   },
  // });
  const allUsers = await prisma.user.findUnique({
    where: {
      id: 6,
    },
  });

  const reqPassword = crypto.pbkdf2Sync('testPassword', salt, 1000, 64, `sha512`).toString(`hex`);
  console.log(reqPassword === allUsers.password);
  console.log(allUsers);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
