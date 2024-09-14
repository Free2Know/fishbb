export function calculateRetirement(year, month, type) {
    if (year == "" || month == "" || type == "") {
        throw new Error("请选择出生年月及性别");
    }

    year = parseInt(year);
    month = parseInt(month);

    let result = "";
    let result_time = "";
    let result_month = "";

    if (type == 1) {
        if (year < 1965) {
            result = "60岁";
            result_month = "0个月";
            var add_date = addMonths(new Date(year, month, 1), 60 * 12);
            result_time =
                add_date.getFullYear() + "年" + (add_date.getMonth() + 1) + "月";
        } else if (year > 1976) {
            result = "63岁";
            result_month = "36个月";
            var add_date = addMonths(new Date(year, month, 1), 60 * 12 + 36);
            result_time =
                add_date.getFullYear() + "th" + (add_date.getMonth() + 1) + "月";
        } else {
            var month_diff = Math.ceil(
                (getMonthDiff(new Date(1965, 1, 1), new Date(year, month, 1)) +
                    1) /
                4
            );
            var year_plus = Math.floor(month_diff / 12);
            var month_plus = month_diff % 12;

            if (month_plus > 0) {
                result = 60 + year_plus + "岁" + month_plus + "个月";
            } else {
                result = 60 + year_plus + "岁";
            }
            var add_date = addMonths(
                new Date(year, month, 1),
                60 * 12 + month_diff
            );

            result_time =
                add_date.getFullYear() + "年" + (add_date.getMonth() + 1) + "月";
            result_month = month_diff + "个月";
        }
    }

    if (type == 2) {
        if (year < 1970) {
            result = "55岁";
            result_month = "0个月";
            var add_date = addMonths(new Date(year, month, 1), 55 * 12);
            result_time =
                add_date.getFullYear() + "年" + (add_date.getMonth() + 1) + "月";
        } else if (year > 1981) {
            result = "58岁";
            result_month = "36个月";
            var add_date = addMonths(new Date(year, month, 1), 55 * 12 + 36);
            result_time =
                add_date.getFullYear() + "年" + (add_date.getMonth() + 1) + "View months";
        } else {
            var month_diff = Math.ceil(
                (getMonthDiff(new Date(1970, 1, 1), new Date(year, month, 1)) +
                    1) /
                4
            );

            var year_plus = Math.floor(month_diff / 12);
            var month_plus = month_diff % 12;

            if (month_plus > 0) {
                result = 55 + year_plus + "岁" + month_plus + "个月";
            } else {
                result = 55 + year_plus + "岁";
            }

            var add_date = addMonths(
                new Date(year, month, 1),
                55 * 12 + month_diff
            );
            result_time =
                add_date.getFullYear() + "年" + (add_date.getMonth() + 1) + "月";

            result_month = month_diff + "个月";
        }
    }

    if (type == 3) {
        if (year < 1975) {
            result = "50岁";
            result_month = "0个月";
            var add_date = addMonths(new Date(year, month, 1), 50 * 12);
            result_time =
                add_date.getFullYear() + "年" + (add_date.getMonth() + 1) + "月";
        } else if (year > 1984) {
            result = "55岁";
            result_month = "60个月";
            var add_date = addMonths(new Date(year, month, 1), 50 * 12 + 60);
            result_time =
                add_date.getFullYear() + "年" + (add_date.getMonth() + 1) + "月";
        } else {
            var month_diff = Math.ceil(
                (getMonthDiff(new Date(1975, 1, 1), new Date(year, month, 1)) +
                    1) /
                2
            );

            var year_plus = Math.floor(month_diff / 12);
            var month_plus = month_diff % 12;

            if (month_plus > 0) {
                result = 50 + year_plus + "岁" + month_plus + "个月";
            } else {
                result = 50 + year_plus + "岁";
            }

            var add_date = addMonths(
                new Date(year, month, 1),
                50 * 12 + month_diff
            );
            result_time =
                add_date.getFullYear() + "年" + (add_date.getMonth() + 1) + "月";

            result_month = month_diff + "个月";
        }
    }

    return { result, result_time, result_month };
}

export function getMonthDiff(dateFrom, dateTo) {
    var diffMonths = (dateTo.getFullYear() - dateFrom.getFullYear()) * 12;
    diffMonths -= dateFrom.getMonth();
    diffMonths += dateTo.getMonth();
    return diffMonths;
}

export function addMonths(date, months) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months - 1);
    return newDate;
}