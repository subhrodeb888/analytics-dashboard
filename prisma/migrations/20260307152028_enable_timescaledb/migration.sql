CREATE EXTENSION IF NOT EXISTS timescaledb;

SELECT create_hypertable(
  'events',
  by_range('timestamp'),
  if_not_exists => TRUE
);

SELECT set_chunk_time_interval(
  'events',
  INTERVAL '7 days'
);