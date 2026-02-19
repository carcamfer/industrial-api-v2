import 'dotenv/config';
import fetch from 'node-fetch';

const API_BASE = process.env.API_BASE_URL || 'http://localhost:3000/api/v1/events';
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error('Set API_KEY env var to stream events');
  process.exit(1);
}

const MODULES = ['vision', 'maintenance', 'quality'];
const ASSETS = ['robot-01', 'robot-02', 'press-01'];

function randomItem (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function sendEvent () {
  const payload = {
    event_id: `stream-${Date.now()}`,
    timestamp: new Date().toISOString(),
    platform_version: '2.0.0',
    module: {
      id: randomItem(MODULES),
      version: '1.0.0'
    },
    asset: {
      asset_id: randomItem(ASSETS),
      plant_id: 'PLT-01'
    },
    event: {
      type: 'INFO',
      severity: 'LOW'
    },
    data: {
      value: Math.random() * 100
    }
  };

  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      console.error('Failed to send event', await res.text());
    } else {
      console.log('Event sent');
    }
  } catch (error) {
    console.error('Stream error', error.message);
  }
}

const interval = Number(process.env.STREAM_INTERVAL_MS || 5000);
console.log(`Streaming events every ${interval}ms to ${API_BASE}`);
setInterval(sendEvent, interval);
