// common.js

function serializeToJson(form) {
    var result = {};
    var f = form.serializeArray();
    f.forEach(function (item) {
        // 相当于result.email
        result[item.name] = item.value;
    });
    return result;
}