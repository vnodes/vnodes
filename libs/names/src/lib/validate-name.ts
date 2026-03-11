export function validateName(name: string) {
    if (!name.match(/[a-zA-Z]{1,}/)) {
        throw new Error(`name must contain only letters but found ${name}`);
    }

    if (name.match(/[A-Z]{2,}/) && name.match(/[a-z]/)) {
        throw new Error(
            `name must be in a single format not mixed but found uppercase and lowercase together, ${name}`,
        );
    }

    if (name.match(/[\s]{1,}/)) {
        throw new Error(`name must not contain a space but found ${name}`);
    }
}
