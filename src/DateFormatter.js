import { format, parse } from "date-fns";

export default function Formatter() {
	const dateFormat = "EEE, MMM do";
	const toInputValue = (value) => {
		const date = parse(value, dateFormat, new Date());
		return format(date, "yyyy-MM-dd");
	};

	const fromInputValue = (value) => {
		return format(new Date(value), dateFormat);
	};

	const now = () => {
		return format(new Date(), dateFormat);
	};

	return { toInputValue, fromInputValue, now };
}
