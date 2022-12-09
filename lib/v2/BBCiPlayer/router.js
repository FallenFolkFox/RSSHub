// Initiate a HTTP GET request
const response = await got({
    method: 'get',
    url: 'https://www.bbc.co.uk/programmes/genres/factual/crimeandjustice/player',
});

const data = response.data; // response.data is the entire HTML source of the target page, returned from the previous request

const $ = cheerio.load(data); // Load the HTML returned into cheerio
const list = $('div[data-pid]');
// use cheerio selector, select all 'div' elements with 'data-item_id' attribute, the result is an array of cheerio node objects
// use cheerio get() method to transform a cheerio node object array into a node array

// PS: every cheerio node is a HTML DOM
// PPS: cheerio selector is almost identical to jquery selector
// Refer to cheerio docs: https://cheerio.js.org/

ctx.state.data = {
    title: 'BBC Crime and Justice Available Programmes',
    link: 'https://www.bbc.co.uk/programmes/genres/factual/crimeandjustice/player',
    item:
        list &&
        list
            .map((index, item) => {
                item = $(".programme");
                itemPicUrl = item.find('img.image').attr('src');
                return {
                    title: item.find('.programme__title span'),
                    description: `channel：$item.find('programme__service p')<br>description：${item.find('.programme__synopsis span')}<br><img src="${itemPicUrl}">`,
                    link: item.find('.programme__titles a').attr('href'),
                };
            })
            .get(),
};

// the route is now done
