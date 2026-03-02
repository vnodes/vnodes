export function CreateDto(): ClassDecorator {
    return (...args) => {
        const properties = Object.getOwnPropertyNames(args[0]);
        console.table(properties);
        //
    };
}

export function UpdateDto(): ClassDecorator {
    return (...args) => {
        const properties = Object.getOwnPropertyNames(args[0]);
        console.table(properties);
    };
}

export function QueryDto(): ClassDecorator {
    return (...args) => {
        const properties = Object.getOwnPropertyNames(args[0]);
        console.table(properties);
    };
}

export function Dto(): ClassDecorator {
    return (...args) => {
        const properties = Object.getOwnPropertyNames(args[0]);
        console.table(properties);
        //
    };
}
