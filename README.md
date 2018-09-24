# weathernode
A command line application that accepts a location as an argument and returns the current temperature for that location. This is done by communicating with the Places API from the Google Cloud Platform and retrieving the latitude and longitude of the provided location. Those values are then passed to the Darksky weather API and the current temperature is returned.

To run the application, follow this example:
node app-promises.js -a "your location here"

Replace the text within quotes to a country, city, zipcode/postal code, or street address.
