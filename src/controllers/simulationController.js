import { insertEvent } from '../services/eventsService.js';

const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const MODULES = ['vision', 'maintenance', 'quality', 'energy', 'safety', 'environment'];

const ASSETS = {
  vision:      ['robot-01', 'robot-02', 'conveyor-01'],
  maintenance: ['robot-01', 'robot-02', 'press-01', 'conveyor-01', 'hvac-01'],
  quality:     ['press-01', 'conveyor-01', 'robot-01'],
  energy:      ['hvac-01', 'press-01', 'robot-01', 'robot-02'],
  safety:      ['robot-01', 'robot-02', 'press-01', 'conveyor-01'],
  environment: ['sensor-env-01', 'hvac-01'],
};

function generateEvent () {
  const module = pick(MODULES);
  const asset = pick(ASSETS[module]);
  let severity, data;

  switch (module) {
    case 'vision': {
      const temp = parseFloat(rand(20, 120).toFixed(1));
      const defect_rate = parseFloat(rand(0, 15).toFixed(2));
      severity = temp > 110 ? 'CRITICAL' : temp > 90 ? 'HIGH' : temp > 70 ? 'MEDIUM' : 'LOW';
      data = { value: temp, defect_rate, unit: 'celsius' };
      break;
    }
    case 'quality': {
      const score = parseFloat(rand(0, 100).toFixed(1));
      const reject_count = randInt(0, 30);
      severity = score < 40 || reject_count > 20 ? 'CRITICAL' : score < 60 || reject_count > 10 ? 'HIGH' : score < 75 || reject_count > 5 ? 'MEDIUM' : 'LOW';
      data = { value: score, reject_count, batch_id: `BATCH-${Date.now()}` };
      break;
    }
    case 'maintenance': {
      const vibration = parseFloat(rand(0, 10).toFixed(2));
      const hours_since_maintenance = randInt(0, 5000);
      const oil_pressure = parseFloat(rand(0, 100).toFixed(1));
      severity = vibration > 8.5 || hours_since_maintenance > 4500 || oil_pressure < 15 ? 'CRITICAL'
        : vibration > 6.5 || hours_since_maintenance > 3500 || oil_pressure < 30 ? 'HIGH'
        : vibration > 4.0 || hours_since_maintenance > 2000 || oil_pressure < 50 ? 'MEDIUM' : 'LOW';
      data = { value: vibration, hours_since_maintenance, oil_pressure };
      break;
    }
    case 'energy': {
      const kwh = parseFloat(rand(0, 500).toFixed(2));
      const power_factor = parseFloat(rand(0.5, 1.0).toFixed(3));
      const peak_demand = Math.random() > 0.7;
      severity = kwh > 450 || power_factor < 0.6 ? 'CRITICAL' : kwh > 380 || (peak_demand && kwh > 300) ? 'HIGH' : kwh > 280 || power_factor < 0.75 ? 'MEDIUM' : 'LOW';
      data = { value: kwh, power_factor, peak_demand };
      break;
    }
    case 'safety': {
      const risk_score = parseFloat(rand(0, 100).toFixed(1));
      severity = risk_score > 85 ? 'CRITICAL' : risk_score > 65 ? 'HIGH' : risk_score > 40 ? 'MEDIUM' : 'LOW';
      data = { value: risk_score, incident_type: pick(['slip_fall', 'equipment_contact', 'chemical_exposure', 'fire_risk']), zone: pick(['Zone-A', 'Zone-B', 'Zone-C', 'Assembly-Floor']) };
      break;
    }
    case 'environment': {
      const co2 = parseFloat(rand(300, 2000).toFixed(1));
      const temperature = parseFloat(rand(15, 40).toFixed(1));
      const humidity = parseFloat(rand(20, 90).toFixed(1));
      severity = co2 > 1800 || temperature > 37 || humidity > 85 ? 'CRITICAL' : co2 > 1400 || temperature > 33 || humidity > 75 ? 'HIGH' : co2 > 1000 || temperature > 28 || humidity > 65 ? 'MEDIUM' : 'LOW';
      data = { value: co2, temperature, humidity, unit: 'ppm_CO2' };
      break;
    }
    default:
      severity = 'LOW';
      data = { value: Math.random() * 100 };
  }

  const event_type = severity === 'CRITICAL' || severity === 'HIGH' ? 'ALARM' : severity === 'MEDIUM' ? 'WARNING' : 'INFO';

  return {
    event_id: `sim-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    platform_version: '2.0.0',
    module: { id: module, version: '1.0.0' },
    asset: { asset_id: asset, plant_id: 'PLT-01' },
    event: { type: event_type, severity },
    data,
  };
}

export async function simulateOne (req, res, next) {
  try {
    const payload = generateEvent();
    const stored = await insertEvent(payload);
    return res.status(201).json({
      module: payload.module.id,
      asset: payload.asset.asset_id,
      severity: payload.event.severity,
      event_type: payload.event.type,
      event_id: stored.event_id,
    });
  } catch (error) {
    return next(error);
  }
}
