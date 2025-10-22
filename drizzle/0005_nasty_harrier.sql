ALTER TABLE "categories" DROP CONSTRAINT "categories_name_unique";--> statement-breakpoint
CREATE UNIQUE INDEX "user_category_unique" ON "categories" USING btree ("name","user_id");