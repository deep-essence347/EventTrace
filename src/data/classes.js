import { Timestamp } from "firebase/firestore";
import moment from "moment";

// ------------------DateTime
export class DateTime {
	static today = ({ inMoment, inTimestamp }) => {
		if (inMoment) return moment();
		if (inTimestamp) return Timestamp.now();
		else return this.toStringDate(moment());
	};

	static timestampToMoment = (date, endOf = false) => {
		let transformedDate = moment(date.seconds * 1000);
		if (endOf) return transformedDate.endOf("day");
		else return transformedDate.startOf("day");
	};

	static formattedDate = (date) => {
		return this.timestampToMoment(date).format("dddd, MMMM DD, YYYY");
	};

	static timestampDate = (date) => {
		return Timestamp.fromDate(new Date(date));
	};

	static toStringDate = (date) => {
		return this.timestampToMoment(date).format("D MMM, YYYY");
	};

	static difference = (beforeDate, afterDate) => {
		return (
			this.timestampToMoment(afterDate).dayOfYear() -
			this.timestampToMoment(beforeDate).dayOfYear() +
			1
		);
	};

	static toStringTime = (time) => {
		return time.format("HH:mm");
	};

	static toMomentDate = (date) => {
		return this.timestampToMoment(date);
	};

	static toMomentTime = (time) => {
		return moment(moment().format("YYYY-MM-DD") + " " + time);
	};

	/**
	 *
	 * @param {String} date Date to be checked
	 * @param {String} pivot checkpoint - Defaults to today
	 * @returns Boolean
	 */
	static isBefore = (date, pivot = this.today({ inTimestamp: true })) => {
		return this.timestampToMoment(date, true).isBefore(
			this.timestampToMoment(pivot)
		);
	};
	/**
	 *
	 * @param {String} date Date to be checked
	 * @param {String} pivot checkpoint - Defaults to today
	 * @returns Boolean
	 */
	static isAfter = (date, pivot = this.today({ inTimestamp: true })) => {
		return this.timestampToMoment(date).isAfter(
			this.timestampToMoment(pivot, true)
		);
	};

	static isSame = (date1, date2) => {
		return this.timestampToMoment(date1).isSame(this.timestampToMoment(date2));
	};

	static isBetween = (
		date1,
		date2,
		pivot = this.today({ inTimestamp: true })
	) => {
		return this.timestampToMoment(pivot).isBetween(
			this.timestampToMoment(date1),
			this.timestampToMoment(date2, true)
		);
	};

	static disabledDate(current) {
		return current && current < moment().endOf("day");
	}
}

// ------------------Filters and Sorters
export class Filter {
	static filterText = (optionText, key, arr) => {
		const filtered = [];
		arr.map((a) => {
			if (a[key].toLowerCase().includes(optionText.toLowerCase()))
				filtered.push(a);
			return undefined;
		});

		return filtered;
	};

	static filterRadio = (optionRadioValue, key, arr) => {
		const filtered = [];

		arr.map((a) => {
			if (
				a[key].includes(optionRadioValue) &&
				a[key].length === optionRadioValue.length
			)
				filtered.push(a);
			return undefined;
		});

		return filtered;
	};

	static filterArray = (optionArray, key, arr) => {
		const filtered = [];

		arr.map((a) => {
			let contains = false;

			a[key].map((c) => {
				if (optionArray.includes(c)) contains = true;
				return undefined;
			});

			if (contains) filtered.push(a);
			return undefined;
		});

		return filtered;
	};

	static filterDate = (optionDates, keys, arr) => {
		const filtered = [];
		arr.map((a) => {
			if (
				DateTime.isBetween(
					DateTime.timestampDate(optionDates[0]),
					DateTime.timestampDate(optionDates[1]),
					a[keys[0]][keys[1]]
				) ||
				DateTime.isSame(
					DateTime.timestampDate(optionDates[0]),
					a[keys[0]][keys[1]]
				) ||
				DateTime.isSame(
					DateTime.timestampDate(optionDates[1]),
					a[keys[0]][keys[1]]
				)
			)
				filtered.push(a);
			return undefined;
		});
		return filtered;
	};

	static sortByString = (key, arr) => {
		return arr.sort((a, b) => a[key].localeCompare(b[key]));
	};

	static sortByNumber = (key, arr) => {
		return arr.sort((a, b) => a[key] - b[key]);
	};

	static sortByDate = (keys, arr) => {
		if (keys.length === 1)
			return arr.sort((a, b) => {
				return (
					DateTime.timestampToMoment(a[keys[0]]) -
					DateTime.timestampToMoment(b[keys[0]])
				);
			});
		if (keys.length === 2)
			return arr.sort((a, b) => {
				return (
					DateTime.timestampToMoment(a[keys[0]][keys[1]]) -
					DateTime.timestampToMoment(b[keys[0]][keys[1]])
				);
			});
	};
}
