//Attempt to solve the bonus

// import axios from 'axios';
// import * as cheerio from 'cheerio';

// const tab4uCrawler = async () => {
//     try {
//         // Fetch the page content
//         const { data } = await axios.get('https://www.tab4u.com/');

//         // Load the HTML into Cheerio
//         const $ = cheerio.load(data);

//         // Extract the required data
//         const songs = [];
//         $('selector-for-songs').each((index, element) => {
//             const songName = $(element).find('div.inSoNa').text();
//             const songArtist = $(element).find('div.inArtNa').text();
//             // const songImage = $(element).find('div.inArtNa').text();
//             // const songchords = $(element).find('div.inArtNa').text(); //TODO
//             songs.push({ songName, songArtist });
//         });
//         console.log(songs.length);
//         return songs;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//     }
// };
// export default tab4uCrawler;