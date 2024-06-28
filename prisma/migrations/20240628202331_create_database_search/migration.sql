-- AlterTable
ALTER TABLE "SearchHistory" ALTER COLUMN "queryTerms" SET NOT NULL,
ALTER COLUMN "queryTerms" SET DATA TYPE TEXT;
