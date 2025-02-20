ALTER TABLE "tokens" DROP CONSTRAINT "tokens_email_users_email_fk";
--> statement-breakpoint
CREATE UNIQUE INDEX "email_token_index" ON "tokens" USING btree (lower("email"),"token");--> statement-breakpoint
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_token_unique" UNIQUE("token");