async function getCurrentWeather() {
    var url =

    var response = await fetch(url):

    var result = await response.json();

    return result;
}