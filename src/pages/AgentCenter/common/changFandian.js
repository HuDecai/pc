export function changeFandian(rebate) {
    return 1960-(100-rebate)*10;
}
//显示小数点
export function changeFandianFlot(rebate) {
    return 8.0-(100-rebate)/2;
}