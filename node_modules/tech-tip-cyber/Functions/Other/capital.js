function Capitalize(options = {}) {
    if(!options.Capital) throw new Error(`No Text Provided To Capitalize, Join https://discord.gg/2FMvpaUcWh For Help`);

    const capital = options.Capital.charAt(0).toUpperCase() + options.Capital.slice(1);

    return capital;
}

module.exports = Capitalize;