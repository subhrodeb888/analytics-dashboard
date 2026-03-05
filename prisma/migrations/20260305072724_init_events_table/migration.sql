-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "user_id" TEXT,
    "session_id" TEXT,
    "properties" JSONB NOT NULL DEFAULT '{}',
    "timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "events_timestamp_idx" ON "events"("timestamp" DESC);

-- CreateIndex
CREATE INDEX "events_event_type_timestamp_idx" ON "events"("event_type", "timestamp" DESC);

-- CreateIndex
CREATE INDEX "events_user_id_timestamp_idx" ON "events"("user_id", "timestamp" DESC);
