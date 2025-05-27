import createInstance from "./instance";

// Satu logger untuk semua
const logger = createInstance("GlobalLog");

export default logger;
export { createInstance as createLogger };
