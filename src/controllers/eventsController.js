import { insertEvent, fetchEvents } from '../services/eventsService.js';
import { validateEventPayload } from '../services/validationService.js';

export async function ingestEvent (req, res, next) {
  try {
    const event = req.body;

    if (!event || Object.keys(event).length === 0) {
      return res.status(400).json({ error: 'Empty request body' });
    }

    const { valid, errors } = validateEventPayload(event);

    if (!valid) {
      return res.status(400).json({
        error: 'Invalid event format',
        details: errors
      });
    }

    const storedEvent = await insertEvent(event);

    return res.status(201).json({
      status: 'accepted',
      event_id: storedEvent.event_id,
      received_at: storedEvent.received_at
    });
  } catch (error) {
    return next(error);
  }
}

export async function queryEvents (req, res, next) {
  try {
    const { start, end, module_id: moduleId, asset_id: assetId, limit = 100 } = req.query;

    if (!start || !end) {
      return res.status(400).json({ error: 'start and end query params are required (ISO strings)' });
    }

    const events = await fetchEvents({ start, end, moduleId, assetId, limit: Number(limit) });

    return res.json({
      count: events.length,
      events
    });
  } catch (error) {
    return next(error);
  }
}
