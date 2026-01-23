-- CreateTable
CREATE TABLE "Usage" (
    "key" TEXT NOT NULL,
    "points" TEXT NOT NULL,
    "expire" TIMESTAMP(3),

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("key")
);
