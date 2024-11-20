import qa from "./qa.js";
import stylistic from "./stylistic.js";
import syntax from "./syntax.js";
import testing from "./testing.js";

export default [
	//
	...syntax,
	...stylistic,
	...qa,
	...testing,
];
