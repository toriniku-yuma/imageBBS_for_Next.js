-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL,
    "image" TEXT,
    "name" TEXT NOT NULL DEFAULT '名無しさん',
    "parentId" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'tosiaki',
    "email" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
