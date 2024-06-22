autowatch = 1;
inlets = 1;
outlets = 2;

var R = 0.556; // Radius in meters
var alpha = 0.33; // EMA alpha
var limit_cnt = 3; // Limit number of predictions

// Variables to store previous values and state
var prec_ecart_x = 0;
var prec_ecart_y = 0;
var cnt = 0;
var prev_x = null;
var prev_y = null;
var ema_x = null;
var ema_y = null;

function list() {
    var a = arrayfromargs(arguments);
    var x = a[0];
    var y = a[1];
    //post("RAW - X: " + x + " Y: " + y + "\n");

    // Exclusive radius logic
    if (prev_x !== null && prev_y !== null) {
        var distance = Math.sqrt(Math.pow(x - prev_x, 2) + Math.pow(y - prev_y, 2));

        if (distance <= R || cnt >= limit_cnt) {
            cnt = 0;
            prec_ecart_x = x - prev_x;
            prec_ecart_y = y - prev_y;
        } else if (distance > R && cnt < limit_cnt+1) {
            x = prev_x + prec_ecart_x;
            y = prev_y + prec_ecart_y;
            cnt++;
        }
    }

    // Update previous values
    prev_x = x;
    prev_y = y;

    // Exponential moving average calculation
    if (ema_x == null) {
        ema_x = x;
    } else {
        ema_x = alpha * x + (1 - alpha) * ema_x;
    }

    if (ema_y == null) {
        ema_y = y;
    } else {
        ema_y = alpha * y + (1 - alpha) * ema_y;
    }

    //post("FILTERED - X: " + ema_x + " Y: " + ema_y + "\n");

    // Output the filtered values
    outlet(0, ema_x);
    outlet(1, ema_y);
}
