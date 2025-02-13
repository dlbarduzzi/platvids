dev:
	npm run dev

lint:
	npm run lint

db/up:
	docker compose up -d

db/down:
	docker compose down

db/open:
	npx drizzle-kit studio

db/migrate:
	DB_MIGRATING=true npx drizzle-kit migrate

db/generate:
	npx drizzle-kit generate
