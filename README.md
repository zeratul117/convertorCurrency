# Getting Started

This app allows you to convert the amount you want into the different available currencies of the following API:
https://freecurrencyapi.net/

It has a free version of it, so there are some limitations.

The idea is that no matter what value you place into the input section, it converts it into the proper INT to make the calculation.

Lastly, I collect the images from Wise.com API for these flags. The problem with this is that if the images are not available, the console places a 404 NOT FOUND per image. The call to their API takes the currency ID as value:
"https://wise.com/public-resources/assets/flags/rectangle/${YOUR_CURRENCY_ID}.png"
