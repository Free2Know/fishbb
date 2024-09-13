export function leapyear(number) {
    const numberStr = typeof number === 'number' ? number.toString() : number;
    if (typeof numberStr !== 'string' || !/^[0-9]+$/.test(numberStr)) {
        throw new Error('数据格式不正确，number 字段必须是数字字符串');
    }
    return (BigInt(numberStr) % BigInt(4n) === BigInt(0n)) && (BigInt(numberStr) % BigInt(100n) !== BigInt(0n) || BigInt(numberStr) % BigInt(400n) === BigInt(0n));
};