import idcard from 'idcard-tool';// 假设 idcard-tool 提供了浏览器兼容的版本

export function CheckIdCard(number) {
    const numberStr = typeof number === 'number' ? number.toString() : number;
    if (typeof numberStr !== 'string' || !/^(?:[0-9]{18}|[JZ][0-9]{16}[0-9Xx])$/i.test(numberStr)) {
        throw new Error('数据格式不正确，number 字段必须是有效的身份证号码字符串');
    }
    return idcard(numberStr.toUpperCase());
};
