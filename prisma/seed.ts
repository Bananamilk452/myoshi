import { PrismaClient } from "@prisma/client";
import argon2 from "@node-rs/argon2";

const prisma = new PrismaClient();

async function main() {
  const email = "test@test.com";
  const username = "TestAccount";
  // defualt avatar
  const avatarUrl = "https://i.imgur.com/hepj9ZS.png";

  // 이미 있는 데이터 제거
  await prisma.user.delete({ where: { email } }).catch(() => {});

  const hashedPassword = await argon2.hash("password");

  await prisma.user.create({
    data: {
      email,
      username,
      avatar: {
        create: {
          url: avatarUrl,
        },
      },
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  console.log("🌱 데이터베이스 시드 완료");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
