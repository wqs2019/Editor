export function getArg(step, name, isLiteral = true) {
    if (step.data && step.data[name]) {
        return step.data[name];
    }
    return {
        isLiteral,
        value: '',
    };
}

export function setArg(step, name, value, isLiteral = true) {
    if (step.data && step.data[name]) {
        step.data[name].value = value;
        if (arguments.length > 3) {
            step.data[name].isLiteral = isLiteral;
        }
    } else {
        step.data[name] = {
            isLiteral,
            value:value,
        };
    }
    return step;
}
