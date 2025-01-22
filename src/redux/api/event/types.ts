/**
 * This exists as a column in the database.
 *
 * EventStatus key:
 * - draft: The user has created the event, and is still editing it.
 * - published: The event is public for anyone to see.
 * - canceled: The event was previously in the EventStatus.published state, but is now canceled.
 * - completed: The event was previously in the EventStatus.published state, but is now completed. This action is what places a historical event into the artists EPK history.
 */
export enum EventStatus {
	draft = 'draft',
	published = 'published',
	canceled = 'canceled',
	completed = 'completed'
}

/**
 * This combines the EventStatus with the event's start and end times to add the temporal context to the event.
 * This does not exist as a column in the database, and is used only for business logic.
 *
 * ComplexEventStatus key:
 * - draft: Same as EventStatus.draft
 * - canceled: Same as EventStatus.canceled
 * - completed: Same as EventStatus.completed
 *
 * - coming_up: The event is in the EventStatus.published state and the start time is in the future.
 * - live: The event is in the EventStatus.published state and the start time is in the past and the end time is in the future. Only exists if the event has both a start and end time.
 * - ended: The event is in the EventStatus.published state and the end time is in the past (or the start time, if the end time is not set).
 */
export enum ComplexEventStatus {
	draft = 'draft',
	canceled = 'canceled',
	coming_up = 'coming_up',
	live = 'live',
	ended = 'ended',
	completed = 'completed'
}
