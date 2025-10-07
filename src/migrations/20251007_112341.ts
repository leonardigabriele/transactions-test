import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_twos_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__twos_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__twos_v_published_locale" AS ENUM('en', 'it');
  CREATE TYPE "public"."enum_threes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__threes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__threes_v_published_locale" AS ENUM('en', 'it');
  CREATE TYPE "public"."enum_fours_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__fours_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__fours_v_published_locale" AS ENUM('en', 'it');
  ALTER TYPE "public"."enum_events_status" RENAME TO "enum_ones_status";
  ALTER TYPE "public"."enum__events_v_version_status" RENAME TO "enum__ones_v_version_status";
  ALTER TYPE "public"."enum__events_v_published_locale" RENAME TO "enum__ones_v_published_locale";
  CREATE TABLE "twos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_twos_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "twos_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_twos_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__twos_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__twos_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_twos_v_locales" (
  	"version_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "threes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_threes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "threes_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_threes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__threes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__threes_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_threes_v_locales" (
  	"version_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "fours" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_fours_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "fours_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "fours_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"ones_id" integer,
  	"twos_id" integer,
  	"threes_id" integer
  );
  
  CREATE TABLE "_fours_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__fours_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__fours_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_fours_v_locales" (
  	"version_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_fours_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"ones_id" integer,
  	"twos_id" integer,
  	"threes_id" integer
  );
  
  ALTER TABLE "events" RENAME TO "ones";
  ALTER TABLE "events_locales" RENAME TO "ones_locales";
  ALTER TABLE "_events_v" RENAME TO "_ones_v";
  ALTER TABLE "_events_v_locales" RENAME TO "_ones_v_locales";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "events_id" TO "ones_id";
  ALTER TABLE "ones_locales" DROP CONSTRAINT "events_locales_parent_id_fk";
  
  ALTER TABLE "_ones_v" DROP CONSTRAINT "_events_v_parent_id_events_id_fk";
  
  ALTER TABLE "_ones_v_locales" DROP CONSTRAINT "_events_v_locales_parent_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_events_fk";
  
  DROP INDEX "events_updated_at_idx";
  DROP INDEX "events_created_at_idx";
  DROP INDEX "events__status_idx";
  DROP INDEX "events_locales_locale_parent_id_unique";
  DROP INDEX "_events_v_parent_idx";
  DROP INDEX "_events_v_version_version_updated_at_idx";
  DROP INDEX "_events_v_version_version_created_at_idx";
  DROP INDEX "_events_v_version_version__status_idx";
  DROP INDEX "_events_v_created_at_idx";
  DROP INDEX "_events_v_updated_at_idx";
  DROP INDEX "_events_v_snapshot_idx";
  DROP INDEX "_events_v_published_locale_idx";
  DROP INDEX "_events_v_latest_idx";
  DROP INDEX "_events_v_locales_locale_parent_id_unique";
  DROP INDEX "payload_locked_documents_rels_events_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "twos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "threes_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "fours_id" integer;
  ALTER TABLE "twos_locales" ADD CONSTRAINT "twos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."twos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_twos_v" ADD CONSTRAINT "_twos_v_parent_id_twos_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."twos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_twos_v_locales" ADD CONSTRAINT "_twos_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_twos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "threes_locales" ADD CONSTRAINT "threes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."threes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_threes_v" ADD CONSTRAINT "_threes_v_parent_id_threes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."threes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_threes_v_locales" ADD CONSTRAINT "_threes_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_threes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fours_locales" ADD CONSTRAINT "fours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fours_rels" ADD CONSTRAINT "fours_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."fours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fours_rels" ADD CONSTRAINT "fours_rels_ones_fk" FOREIGN KEY ("ones_id") REFERENCES "public"."ones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fours_rels" ADD CONSTRAINT "fours_rels_twos_fk" FOREIGN KEY ("twos_id") REFERENCES "public"."twos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fours_rels" ADD CONSTRAINT "fours_rels_threes_fk" FOREIGN KEY ("threes_id") REFERENCES "public"."threes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fours_v" ADD CONSTRAINT "_fours_v_parent_id_fours_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."fours"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_fours_v_locales" ADD CONSTRAINT "_fours_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fours_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fours_v_rels" ADD CONSTRAINT "_fours_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_fours_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fours_v_rels" ADD CONSTRAINT "_fours_v_rels_ones_fk" FOREIGN KEY ("ones_id") REFERENCES "public"."ones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fours_v_rels" ADD CONSTRAINT "_fours_v_rels_twos_fk" FOREIGN KEY ("twos_id") REFERENCES "public"."twos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fours_v_rels" ADD CONSTRAINT "_fours_v_rels_threes_fk" FOREIGN KEY ("threes_id") REFERENCES "public"."threes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "twos_updated_at_idx" ON "twos" USING btree ("updated_at");
  CREATE INDEX "twos_created_at_idx" ON "twos" USING btree ("created_at");
  CREATE INDEX "twos__status_idx" ON "twos" USING btree ("_status");
  CREATE UNIQUE INDEX "twos_locales_locale_parent_id_unique" ON "twos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_twos_v_parent_idx" ON "_twos_v" USING btree ("parent_id");
  CREATE INDEX "_twos_v_version_version_updated_at_idx" ON "_twos_v" USING btree ("version_updated_at");
  CREATE INDEX "_twos_v_version_version_created_at_idx" ON "_twos_v" USING btree ("version_created_at");
  CREATE INDEX "_twos_v_version_version__status_idx" ON "_twos_v" USING btree ("version__status");
  CREATE INDEX "_twos_v_created_at_idx" ON "_twos_v" USING btree ("created_at");
  CREATE INDEX "_twos_v_updated_at_idx" ON "_twos_v" USING btree ("updated_at");
  CREATE INDEX "_twos_v_snapshot_idx" ON "_twos_v" USING btree ("snapshot");
  CREATE INDEX "_twos_v_published_locale_idx" ON "_twos_v" USING btree ("published_locale");
  CREATE INDEX "_twos_v_latest_idx" ON "_twos_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_twos_v_locales_locale_parent_id_unique" ON "_twos_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "threes_updated_at_idx" ON "threes" USING btree ("updated_at");
  CREATE INDEX "threes_created_at_idx" ON "threes" USING btree ("created_at");
  CREATE INDEX "threes__status_idx" ON "threes" USING btree ("_status");
  CREATE UNIQUE INDEX "threes_locales_locale_parent_id_unique" ON "threes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_threes_v_parent_idx" ON "_threes_v" USING btree ("parent_id");
  CREATE INDEX "_threes_v_version_version_updated_at_idx" ON "_threes_v" USING btree ("version_updated_at");
  CREATE INDEX "_threes_v_version_version_created_at_idx" ON "_threes_v" USING btree ("version_created_at");
  CREATE INDEX "_threes_v_version_version__status_idx" ON "_threes_v" USING btree ("version__status");
  CREATE INDEX "_threes_v_created_at_idx" ON "_threes_v" USING btree ("created_at");
  CREATE INDEX "_threes_v_updated_at_idx" ON "_threes_v" USING btree ("updated_at");
  CREATE INDEX "_threes_v_snapshot_idx" ON "_threes_v" USING btree ("snapshot");
  CREATE INDEX "_threes_v_published_locale_idx" ON "_threes_v" USING btree ("published_locale");
  CREATE INDEX "_threes_v_latest_idx" ON "_threes_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_threes_v_locales_locale_parent_id_unique" ON "_threes_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "fours_updated_at_idx" ON "fours" USING btree ("updated_at");
  CREATE INDEX "fours_created_at_idx" ON "fours" USING btree ("created_at");
  CREATE INDEX "fours__status_idx" ON "fours" USING btree ("_status");
  CREATE UNIQUE INDEX "fours_locales_locale_parent_id_unique" ON "fours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "fours_rels_order_idx" ON "fours_rels" USING btree ("order");
  CREATE INDEX "fours_rels_parent_idx" ON "fours_rels" USING btree ("parent_id");
  CREATE INDEX "fours_rels_path_idx" ON "fours_rels" USING btree ("path");
  CREATE INDEX "fours_rels_ones_id_idx" ON "fours_rels" USING btree ("ones_id");
  CREATE INDEX "fours_rels_twos_id_idx" ON "fours_rels" USING btree ("twos_id");
  CREATE INDEX "fours_rels_threes_id_idx" ON "fours_rels" USING btree ("threes_id");
  CREATE INDEX "_fours_v_parent_idx" ON "_fours_v" USING btree ("parent_id");
  CREATE INDEX "_fours_v_version_version_updated_at_idx" ON "_fours_v" USING btree ("version_updated_at");
  CREATE INDEX "_fours_v_version_version_created_at_idx" ON "_fours_v" USING btree ("version_created_at");
  CREATE INDEX "_fours_v_version_version__status_idx" ON "_fours_v" USING btree ("version__status");
  CREATE INDEX "_fours_v_created_at_idx" ON "_fours_v" USING btree ("created_at");
  CREATE INDEX "_fours_v_updated_at_idx" ON "_fours_v" USING btree ("updated_at");
  CREATE INDEX "_fours_v_snapshot_idx" ON "_fours_v" USING btree ("snapshot");
  CREATE INDEX "_fours_v_published_locale_idx" ON "_fours_v" USING btree ("published_locale");
  CREATE INDEX "_fours_v_latest_idx" ON "_fours_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_fours_v_locales_locale_parent_id_unique" ON "_fours_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_fours_v_rels_order_idx" ON "_fours_v_rels" USING btree ("order");
  CREATE INDEX "_fours_v_rels_parent_idx" ON "_fours_v_rels" USING btree ("parent_id");
  CREATE INDEX "_fours_v_rels_path_idx" ON "_fours_v_rels" USING btree ("path");
  CREATE INDEX "_fours_v_rels_ones_id_idx" ON "_fours_v_rels" USING btree ("ones_id");
  CREATE INDEX "_fours_v_rels_twos_id_idx" ON "_fours_v_rels" USING btree ("twos_id");
  CREATE INDEX "_fours_v_rels_threes_id_idx" ON "_fours_v_rels" USING btree ("threes_id");
  ALTER TABLE "ones_locales" ADD CONSTRAINT "ones_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ones_v" ADD CONSTRAINT "_ones_v_parent_id_ones_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ones"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ones_v_locales" ADD CONSTRAINT "_ones_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ones_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ones_fk" FOREIGN KEY ("ones_id") REFERENCES "public"."ones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_twos_fk" FOREIGN KEY ("twos_id") REFERENCES "public"."twos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_threes_fk" FOREIGN KEY ("threes_id") REFERENCES "public"."threes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_fours_fk" FOREIGN KEY ("fours_id") REFERENCES "public"."fours"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "ones_updated_at_idx" ON "ones" USING btree ("updated_at");
  CREATE INDEX "ones_created_at_idx" ON "ones" USING btree ("created_at");
  CREATE INDEX "ones__status_idx" ON "ones" USING btree ("_status");
  CREATE UNIQUE INDEX "ones_locales_locale_parent_id_unique" ON "ones_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ones_v_parent_idx" ON "_ones_v" USING btree ("parent_id");
  CREATE INDEX "_ones_v_version_version_updated_at_idx" ON "_ones_v" USING btree ("version_updated_at");
  CREATE INDEX "_ones_v_version_version_created_at_idx" ON "_ones_v" USING btree ("version_created_at");
  CREATE INDEX "_ones_v_version_version__status_idx" ON "_ones_v" USING btree ("version__status");
  CREATE INDEX "_ones_v_created_at_idx" ON "_ones_v" USING btree ("created_at");
  CREATE INDEX "_ones_v_updated_at_idx" ON "_ones_v" USING btree ("updated_at");
  CREATE INDEX "_ones_v_snapshot_idx" ON "_ones_v" USING btree ("snapshot");
  CREATE INDEX "_ones_v_published_locale_idx" ON "_ones_v" USING btree ("published_locale");
  CREATE INDEX "_ones_v_latest_idx" ON "_ones_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_ones_v_locales_locale_parent_id_unique" ON "_ones_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "payload_locked_documents_rels_ones_id_idx" ON "payload_locked_documents_rels" USING btree ("ones_id");
  CREATE INDEX "payload_locked_documents_rels_twos_id_idx" ON "payload_locked_documents_rels" USING btree ("twos_id");
  CREATE INDEX "payload_locked_documents_rels_threes_id_idx" ON "payload_locked_documents_rels" USING btree ("threes_id");
  CREATE INDEX "payload_locked_documents_rels_fours_id_idx" ON "payload_locked_documents_rels" USING btree ("fours_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_published_locale" AS ENUM('en', 'it');
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "events_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__events_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_events_v_locales" (
  	"version_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "ones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ones_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_ones_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_ones_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "twos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "twos_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_twos_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_twos_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "threes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "threes_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_threes_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_threes_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "fours" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "fours_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "fours_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_fours_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_fours_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_fours_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "ones" CASCADE;
  DROP TABLE "ones_locales" CASCADE;
  DROP TABLE "_ones_v" CASCADE;
  DROP TABLE "_ones_v_locales" CASCADE;
  DROP TABLE "twos" CASCADE;
  DROP TABLE "twos_locales" CASCADE;
  DROP TABLE "_twos_v" CASCADE;
  DROP TABLE "_twos_v_locales" CASCADE;
  DROP TABLE "threes" CASCADE;
  DROP TABLE "threes_locales" CASCADE;
  DROP TABLE "_threes_v" CASCADE;
  DROP TABLE "_threes_v_locales" CASCADE;
  DROP TABLE "fours" CASCADE;
  DROP TABLE "fours_locales" CASCADE;
  DROP TABLE "fours_rels" CASCADE;
  DROP TABLE "_fours_v" CASCADE;
  DROP TABLE "_fours_v_locales" CASCADE;
  DROP TABLE "_fours_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_ones_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_twos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_threes_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_fours_fk";
  
  DROP INDEX "payload_locked_documents_rels_ones_id_idx";
  DROP INDEX "payload_locked_documents_rels_twos_id_idx";
  DROP INDEX "payload_locked_documents_rels_threes_id_idx";
  DROP INDEX "payload_locked_documents_rels_fours_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_locales" ADD CONSTRAINT "_events_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_snapshot_idx" ON "_events_v" USING btree ("snapshot");
  CREATE INDEX "_events_v_published_locale_idx" ON "_events_v" USING btree ("published_locale");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_events_v_locales_locale_parent_id_unique" ON "_events_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "ones_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "twos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "threes_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "fours_id";
  DROP TYPE "public"."enum_ones_status";
  DROP TYPE "public"."enum__ones_v_version_status";
  DROP TYPE "public"."enum__ones_v_published_locale";
  DROP TYPE "public"."enum_twos_status";
  DROP TYPE "public"."enum__twos_v_version_status";
  DROP TYPE "public"."enum__twos_v_published_locale";
  DROP TYPE "public"."enum_threes_status";
  DROP TYPE "public"."enum__threes_v_version_status";
  DROP TYPE "public"."enum__threes_v_published_locale";
  DROP TYPE "public"."enum_fours_status";
  DROP TYPE "public"."enum__fours_v_version_status";
  DROP TYPE "public"."enum__fours_v_published_locale";`)
}
