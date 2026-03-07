// lib/db-utils.ts

import { prisma } from "./prisma";

type ChunkInfo = {
  chunk_name: string;
  range_start: Date;
  range_end: Date;
  total_bytes: bigint;
};

type HypertableSize = {
  table_bytes: bigint;
  index_bytes: bigint;
  total_bytes: bigint;
};

// Returns info about all chunks for the events hypertable
export async function getChunkInfo(): Promise<ChunkInfo[]> {
  return prisma.$queryRaw<ChunkInfo[]>`
    SELECT
      c.chunk_name,
      c.range_start,
      c.range_end,
      cs.total_bytes
    FROM timescaledb_information.chunks c
    JOIN timescaledb_information.chunk_detailed_size cs
      ON c.chunk_name = cs.chunk_name
    WHERE c.hypertable_name = 'events'
    ORDER BY c.range_start DESC;
  `;
}

// Returns the total size of the events hypertable
export async function getHypertableSize(): Promise<HypertableSize> {
  const result = await prisma.$queryRaw<HypertableSize[]>`
    SELECT
      table_bytes,
      index_bytes,
      total_bytes
    FROM hypertable_detailed_size('events');
  `;
  return result[0];
}
