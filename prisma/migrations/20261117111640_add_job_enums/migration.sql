/*
  Warnings:

  - You are about to drop the column `location` on the `Job` table. All the data in the column will be lost.
  - Added the required column `experience` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workplace` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE');

-- CreateEnum
CREATE TYPE "WorkplaceType" AS ENUM ('ON_SITE', 'HYBRID', 'REMOTE');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('ENTRY_LEVEL', 'JUNIOR', 'MID_LEVEL', 'SENIOR', 'LEAD', 'EXECUTIVE');

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "location",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "experience" "ExperienceLevel" NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "workplace" "WorkplaceType" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "EmploymentType" NOT NULL;
