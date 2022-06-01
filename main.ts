import {Font,BinarySensor,NumericSensor,UI,TextAlign,id,COLOR_ON, Bitmap} from './lib';

// mock the fonts registered in esphome, use the variable name as id
const arial_11: Font = "11px Arial"
const arial_16: Font = "16px Arial"
const arial_24: Font = "24px Arial"
const arial_32: Font = "32px Arial"
const arial_48: Font = "48px Arial"

// mock the sensor values / variables  registered in esphome, use the variable name as id
// the label and default state are only used in the mock gui.

const battery = new NumericSensor("Battery %", 45);
const wifi = new NumericSensor("Wifi Rssi", -65);

const outside_temperature = new NumericSensor("Temperature", 22);
const outside_humidity = new NumericSensor("Humidity", 45);
const outside_rain = new NumericSensor("CO2", 390);
const outside_wind_speed = new NumericSensor("Windspeed", 3);
const outside_wind_direction = new NumericSensor("Wind Direction", 1);

const main_temperature = new NumericSensor("Temperature", 22);
const main_humidity = new NumericSensor("Humidity", 45);
const main_co2 = new NumericSensor("CO2", 390);

const bedroom_temperature = new NumericSensor("Temperature", 22);
const bedroom_humidity = new NumericSensor("Humidity", 45);
const bedroom_co2 = new NumericSensor("CO2", 390);

const bathroom_temperature = new NumericSensor("Temperature", 22);
const bathroom_humidity = new NumericSensor("Humidity", 45);

const time_to_work = new NumericSensor("Time to work", 7);

const plug1_pwr = new NumericSensor("Power", 12);
const plug_desktop_pwr = new NumericSensor("Power", 12);
const ender_pwr = new NumericSensor("Power", 12);

const plug1_switch = new BinarySensor("Plug 1", true);
const plug_desktop_switch = new BinarySensor("Desktop Plug", true);
const ender_switch = new BinarySensor("Ender Plug", false);

// initialize the gui, set the screen size
let ui = new UI(document.getElementById("root"), 960, 540 );

ui.registerSensor(battery);
ui.registerSensor(wifi);
ui.registerSensor(outside_temperature);
ui.registerSensor(outside_humidity);
ui.registerSensor(outside_rain);
ui.registerSensor(outside_wind_speed);
ui.registerSensor(outside_wind_direction);
ui.registerSensor(main_temperature);
ui.registerSensor(main_humidity);
ui.registerSensor(main_co2);
ui.registerSensor(bedroom_temperature);
ui.registerSensor(bedroom_humidity);
ui.registerSensor(bedroom_co2);
ui.registerSensor(bathroom_temperature);
ui.registerSensor(bathroom_humidity);
ui.registerSensor(time_to_work);
ui.registerSensor(plug1_pwr);
ui.registerSensor(plug_desktop_pwr);
ui.registerSensor(ender_pwr);
ui.registerSensor(plug1_switch);
ui.registerSensor(plug_desktop_switch);
ui.registerSensor(ender_switch);

// this is the render loop. Enter the code for the esphome display lambda function here.
ui.registerRenderLoop( it => {
    // custom code starts here

    it.clear();
    
    // auto time = id(sntp_time).now();
    
    it.print(it.get_width()/2,4,id(arial_11),TextAlign.CENTER,"Hello World!");
    if (id(plug1_switch).state) {
        it.filled_circle(it.get_width() / 2, it.get_height() / 2, 20);
    }
    // it.horizontal_line(6,it.get_height()/2,it.get_width()/2-30);
    // it.horizontal_line(it.get_width()/2+24,it.get_height()/2,it.get_width()/2-28);
    // it.rectangle(3,it.get_height()/2-30,it.get_width()-6,60,COLOR_ON);
    // it.printf(3, 110, id(arial_11),TextAlign.LEFT, "Temperature: %.1f°C, Humidity: %.1f%%", id(main_temperature).state, id(main_humidity).state);
   
    // battery state
    it.printf(it.get_width()-26,2,id(arial_11),TextAlign.RIGHT,"%d%%", id(battery).state);
    it.rectangle(it.get_width() - 22,  2, 19, 10, COLOR_ON);
    it.filled_rectangle(it.get_width() - 2,  4, 2, 6,COLOR_ON);
    it.filled_rectangle(it.get_width() - 20,  4, 16 * id(battery).state / 100, 6, COLOR_ON);

    // wifi
    // Note: Not all syntax is equivalent between C<->Typescript
    // replace the int with var in the loops and reverse
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 2 * (i + 1); j++) {
            if (id(wifi).state/-1.2 > i * 25 || j == 0) {
                it.draw_pixel_at(5 + 2 * i, 10 - j, COLOR_ON);
            }
        }
    }

    // Date time block
    it.printf(it.get_width() / 2, 48, id(arial_16),TextAlign.CENTER, "SATURDAY");
    it.printf(it.get_width() / 2, 76, id(arial_48),TextAlign.CENTER, "12:34");
    it.printf(it.get_width() / 2, 132, id(arial_16),TextAlign.CENTER, "12.12.2022");
    
    // Outside sensors block, rectangle to be replaced by graph component
    it.rectangle(48, 48, 40, 40);
    it.printf(48 + 40 + 12, 48, id(arial_24),TextAlign.LEFT, "Outside");
    it.printf(48 + 40 + 12, 48 + 24, id(arial_16),TextAlign.LEFY, "Terrace");
    it.printf(it.get_width() / 2 - 156, 48, id(arial_24),TextAlign.RIGHT, "20.0 °C");
    it.printf(it.get_width() / 2 - 156, 48 + 24, id(arial_16),TextAlign.RIGHT, "68 %");
    it.rectangle(48, 96, it.get_width() / 2 - 156 - 40, 48);
    
    // Time to work block
    
    it.printf(it.get_width() / 2 + 156, 48, id(arial_24),TextAlign.LEFT, "Travel time");
    it.printf(it.get_width() / 2 + 156, 48 + 24, id(arial_16),TextAlign.LEFT, "to work by car");
    it.printf(it.get_width() - 48, 48, id(arial_24),TextAlign.RIGHT, "7");
    it.printf(it.get_width() - 48, 48 + 24, id(arial_16),TextAlign.RIGHT, "minutes");
    it.rectangle(it.get_width() / 2 + 156, 96, it.get_width() / 2 - 156 - 40, 48);
});


// render the ui
ui.run();


