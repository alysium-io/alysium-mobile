// This comes from our attempt to create a domain object model that is class based.
// This was successfully implemented, but added so much complexity that we decided to
// go back to a more simple approach by just using hooks and functions to interpret our data models.
// I'll just leave this here as a proof-of-concept for now.

export class Model<T> {
	data: T;
	constructor(data: T) {
		this.data = data;
	}
}
