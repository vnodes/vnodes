export function isDev() {
    return process.env.NODE_ENV?.match(/dev/i);
}

export function isProd() {
    return process.env.NODE_ENV?.match(/prod/i);
}
